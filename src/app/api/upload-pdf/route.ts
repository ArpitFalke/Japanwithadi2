import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createServiceClient } from '@/lib/supabase'
import { slugify } from '@/lib/utils'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const EXTRACTION_PROMPT = `You are a scholarship data extraction specialist. Extract structured scholarship information from the provided PDF text.

Return ONLY valid JSON (no markdown, no explanation) with this exact structure:
{
  "scholarship_name": "string",
  "provider": "string",
  "category": "mext|jasso|kosen|stc|university|foundation|exchange|language",
  "level": ["undergraduate"|"masters"|"phd"|"kosen"|"stc"],
  "scholarship_type": "string",
  "funding_type": "fully_funded|partial|tuition_only|stipend_only",
  "stipend": "string (e.g. ¥117,000/month or null)",
  "stipend_amount": number_or_null,
  "tuition_covered": boolean,
  "age_limit_min": number_or_null,
  "age_limit_max": number_or_null,
  "eligibility": "string",
  "nationality": "all" or ["country1","country2"],
  "japanese_requirement": "none|n5|n4|n3|n2|n1|null",
  "english_requirement": "string_or_null",
  "application_deadline": "YYYY-MM-DD_or_null",
  "notification_date": "YYYY-MM-DD_or_null",
  "exam_subjects": ["string"],
  "interview_required": boolean,
  "duration": "string",
  "university": ["string"] or null,
  "field_of_study": ["string"],
  "application_route": "embassy|university|direct|organization",
  "official_link": "url_or_null",
  "description": "2-3 sentence description",
  "benefits": ["string"],
  "documents_required": ["string"],
  "tags": ["string"]
}`

export async function POST(req: NextRequest) {
  try {
    // Auth check
    const authHeader = req.headers.get('authorization')
    if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const action = formData.get('action') as string | null

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    // Read file as base64 for Claude
    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')

    let pdfText = ''

    // Try to extract text via Claude vision
    const visionResponse = await anthropic.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'document',
            source: { type: 'base64', media_type: 'application/pdf', data: base64 },
          },
          { type: 'text', text: 'Extract all text content from this scholarship PDF document. Return the full text.' },
        ],
      }],
    })

    pdfText = visionResponse.content[0].type === 'text' ? visionResponse.content[0].text : ''

    // Extract structured data
    const extractionResponse = await anthropic.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: `${EXTRACTION_PROMPT}\n\nPDF Content:\n${pdfText.substring(0, 6000)}`,
      }],
    })

    const extractedText = extractionResponse.content[0].type === 'text' ? extractionResponse.content[0].text : '{}'
    const extracted = JSON.parse(extractedText.replace(/```json\n?|\n?```/g, '').trim())

    // Auto-generate slug
    extracted.slug = slugify(extracted.scholarship_name || 'scholarship-' + Date.now())
    extracted.active = false // Draft until admin reviews
    extracted.featured = false
    extracted.views = 0
    extracted.saves = 0

    if (action === 'save') {
      const supabase = createServiceClient()
      const { data, error } = await supabase
        .from('scholarships')
        .insert(extracted)
        .select()
        .single()

      if (error) throw error
      return NextResponse.json({ success: true, data, message: 'Scholarship saved as draft' })
    }

    return NextResponse.json({ success: true, extracted, rawText: pdfText.substring(0, 500) })
  } catch (error) {
    console.error('PDF extraction error:', error)
    return NextResponse.json({ success: false, error: 'PDF extraction failed' }, { status: 500 })
  }
}
