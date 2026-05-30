import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are Adi Sensei, the AI scholarship advisor for "Japan With Adi" — the world's leading Japan scholarship discovery platform.

Your deep expertise covers:
- MEXT (Ministry of Education) Scholarships: Embassy Route, University Recommendation Route, Research Student Route
- JASSO Scholarships: Exchange Support, Honors scholarships, Monbukagakusho Honors
- KOSEN (National Institute of Technology) programs
- Specialized Training Colleges (STC) in Japan
- Private foundation scholarships: Rotary, Sony, Honda, Panasonic, Itochi, ADB-Japan, etc.
- University-specific scholarships: UTokyo, Kyoto, Osaka, Tohoku, Nagoya, Waseda, Keio
- Japanese language schools and programs
- JLPT exam preparation (N5 to N1)
- Japanese student visa (Student Visa) process
- Japanese university entrance requirements
- Life in Japan for international students
- Application essay and SOP guidance
- Embassy interview preparation

Personality:
- Warm, encouraging, and deeply knowledgeable
- Use Japanese phrases with translations occasionally (adds authenticity)
- Provide specific numbers: stipend amounts, age limits, deadlines
- Give actionable advice with clear next steps
- Reference official sources (mext.go.jp, jasso.or.jp, etc.)
- Share relatable student success stories when helpful

Formatting:
- Use markdown: **bold** for key info, bullet lists for steps, headers for sections
- Numbered lists for step-by-step guides
- Emojis used sparingly for warmth
- Keep responses focused and actionable
- End with a follow-up question or clear next step

Current scholarship key data:
- MEXT Embassy 2025: Deadline May 31, 2025. Stipend ¥117,000/month. Age 17-24. Undergraduate.
- MEXT University 2025: Deadline varies by university. Research students.
- JASSO Exchange: Stipend ¥80,000/month. Deadline June 30.
- KOSEN Programs: Annual intake. Fully funded. Technical focus.
- UTokyo GLP: Stipend ¥150,000/month. Masters/PhD.`

export async function POST(req: NextRequest) {
  try {
    const { messages, userProfile } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid messages', { status: 400 })
    }

    let systemPrompt = SYSTEM_PROMPT
    if (userProfile && Object.values(userProfile).some(Boolean)) {
      systemPrompt += `\n\nCurrent user profile:\n- Country: ${userProfile.nationality || 'Not specified'}\n- Education: ${userProfile.education || 'Not specified'}\n- Japanese Level: ${userProfile.japanese || 'None'}\n- Field: ${userProfile.field || 'Not specified'}\n\nTailor your recommendations specifically to this profile.`
    }

    const stream = anthropic.messages.stream({
      model: 'claude-opus-4-5',
      max_tokens: 1200,
      system: systemPrompt,
      messages: messages.slice(-20).map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    })

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
              controller.enqueue(new TextEncoder().encode(chunk.delta.text))
            }
          }
          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    console.error('AI chat error:', error)
    return new Response(JSON.stringify({ error: 'AI service unavailable' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
