import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const ADI_SYSTEM_PROMPT = `You are Adi Sensei, the AI scholarship advisor for "Japan With Adi" — the world's leading Japan scholarship discovery platform. You are friendly, knowledgeable, and deeply specialized in Japanese scholarships, universities, and study abroad programs.

Your expertise covers:
- MEXT (Ministry of Education) Scholarships — Embassy and University recommendation routes
- JASSO (Japan Student Services Organization) scholarships
- KOSEN (National Institute of Technology) programs
- Specialized Training Colleges (STC)
- Private foundation scholarships (Rotary, Sony, etc.)
- University-specific scholarships (UTokyo, Kyoto, Osaka, etc.)
- Exchange programs and Japanese language programs
- JLPT requirements and exam preparation
- Japanese student visa process
- SOP and application essay guidance
- Interview preparation for Japanese scholarships
- Japanese university admission process
- Living in Japan as an international student

Personality:
- Warm, encouraging, and professional
- Use occasional Japanese words/phrases (with translations)
- Cite specific scholarship amounts, deadlines, and requirements
- Give actionable, step-by-step advice
- Reference success rates and student stories when helpful
- Always mention the official sources

Response format:
- Use markdown formatting for clarity
- Break down complex topics into clear steps
- Use emojis sparingly for friendliness
- Always end with a follow-up question or next step suggestion

IMPORTANT: You have access to scholarship database context. When recommending scholarships, always match to the user's specific profile (nationality, education level, Japanese proficiency, field of study, age).`

export interface StreamOptions {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>
  scholarshipContext?: string
  userProfile?: {
    nationality?: string
    education_level?: string
    japanese_level?: string
    field?: string
    age?: number
  }
}

export async function streamAdiResponse(options: StreamOptions): Promise<ReadableStream> {
  const { messages, scholarshipContext, userProfile } = options

  let systemPrompt = ADI_SYSTEM_PROMPT

  if (userProfile) {
    systemPrompt += `\n\nCurrent user profile:\n- Nationality: ${userProfile.nationality || 'Unknown'}\n- Education: ${userProfile.education_level || 'Unknown'}\n- Japanese Level: ${userProfile.japanese_level || 'None'}\n- Field: ${userProfile.field || 'Undecided'}`
  }

  if (scholarshipContext) {
    systemPrompt += `\n\nRelevant scholarship database context:\n${scholarshipContext}`
  }

  const stream = await anthropic.messages.stream({
    model: 'claude-opus-4-5',
    max_tokens: 1500,
    system: systemPrompt,
    messages: messages.map(m => ({
      role: m.role,
      content: m.content,
    })),
  })

  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
          ) {
            controller.enqueue(new TextEncoder().encode(chunk.delta.text))
          }
        }
        controller.close()
      } catch (error) {
        controller.error(error)
      }
    },
  })
}

export async function extractScholarshipFromPDF(pdfText: string): Promise<Record<string, unknown>> {
  const response = await anthropic.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: `Extract scholarship information from this PDF text and return ONLY a valid JSON object with no markdown, no preamble, just raw JSON.

PDF Text:
${pdfText.substring(0, 8000)}

Extract these fields (use null if not found):
{
  "scholarship_name": "string",
  "provider": "string",
  "category": "mext|jasso|kosen|stc|university|foundation|exchange|language",
  "level": ["undergraduate"|"masters"|"phd"|"kosen"|"stc"],
  "funding_type": "fully_funded|partial|tuition_only|stipend_only",
  "stipend": "string (e.g. ¥117,000/month)",
  "stipend_amount": number,
  "tuition_covered": boolean,
  "age_limit_min": number|null,
  "age_limit_max": number|null,
  "eligibility": "string",
  "nationality": ["country"]|"all",
  "japanese_requirement": "none|n5|n4|n3|n2|n1",
  "english_requirement": "string|null",
  "application_deadline": "YYYY-MM-DD",
  "exam_subjects": ["string"],
  "interview_required": boolean,
  "duration": "string",
  "university": ["string"],
  "field_of_study": ["string"],
  "application_route": "embassy|university|direct|organization",
  "official_link": "string|null",
  "description": "string",
  "benefits": ["string"],
  "documents_required": ["string"]
}`,
      },
    ],
  })

  const content = response.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type')

  try {
    return JSON.parse(content.text.replace(/```json\n?|\n?```/g, '').trim())
  } catch {
    throw new Error('Failed to parse AI extraction response')
  }
}

export async function generateScholarshipDescription(scholarship: {
  name: string
  provider: string
  stipend?: string
  level: string[]
}): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    max_tokens: 300,
    messages: [
      {
        role: 'system',
        content: 'You write compelling, accurate scholarship descriptions for a Japan study abroad platform. Be informative, encouraging, and SEO-friendly. 2-3 sentences.',
      },
      {
        role: 'user',
        content: `Write a description for: ${scholarship.name} by ${scholarship.provider}. Stipend: ${scholarship.stipend}. Level: ${scholarship.level.join(', ')}`,
      },
    ],
  })

  return response.choices[0].message.content || ''
}

export async function getPersonalizedRecommendations(
  userProfile: {
    nationality?: string
    education_level?: string
    japanese_level?: string
    field?: string
    age?: number
  },
  availableScholarships: Array<{ id: string; scholarship_name: string; category: string; level: string[] }>
): Promise<string[]> {
  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 500,
    messages: [
      {
        role: 'user',
        content: `Given this student profile:
${JSON.stringify(userProfile, null, 2)}

From these scholarships:
${JSON.stringify(availableScholarships.map(s => ({ id: s.id, name: s.scholarship_name, category: s.category, level: s.level })), null, 2)}

Return ONLY a JSON array of the top 5 scholarship IDs that best match this student, ordered by best match first. Example: ["id1","id2","id3","id4","id5"]`,
      },
    ],
  })

  const content = response.content[0]
  if (content.type !== 'text') return []

  try {
    return JSON.parse(content.text.replace(/```json\n?|\n?```/g, '').trim())
  } catch {
    return []
  }
}
