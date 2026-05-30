import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { z } from 'zod'

const querySchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  level: z.string().optional(),
  funding_type: z.string().optional(),
  no_japanese: z.coerce.boolean().optional(),
  page: z.coerce.number().min(1).default(1),
  per_page: z.coerce.number().min(1).max(50).default(12),
  sort: z.enum(['recent', 'deadline', 'stipend', 'popular']).default('recent'),
  featured: z.coerce.boolean().optional(),
})

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const params = querySchema.parse(Object.fromEntries(searchParams))

    const supabase = createServiceClient()
    let query = supabase
      .from('scholarships')
      .select('*', { count: 'exact' })
      .eq('active', true)

    if (params.q) {
      query = query.or(
        `scholarship_name.ilike.%${params.q}%,description.ilike.%${params.q}%,provider.ilike.%${params.q}%`
      )
    }
    if (params.category) query = query.eq('category', params.category)
    if (params.funding_type) query = query.eq('funding_type', params.funding_type)
    if (params.featured) query = query.eq('featured', true)
    if (params.no_japanese) {
      query = query.or('japanese_requirement.is.null,japanese_requirement.eq.none')
    }

    if (params.sort === 'deadline') query = query.order('application_deadline', { ascending: true })
    else if (params.sort === 'stipend') query = query.order('stipend_amount', { ascending: false })
    else if (params.sort === 'popular') query = query.order('views', { ascending: false })
    else query = query.order('created_at', { ascending: false })

    const from = (params.page - 1) * params.per_page
    query = query.range(from, from + params.per_page - 1)

    const { data, error, count } = await query
    if (error) throw error

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        total: count || 0,
        page: params.page,
        per_page: params.per_page,
        total_pages: Math.ceil((count || 0) / params.per_page),
      },
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (error) {
    console.error('Scholarships API error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch scholarships' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const supabase = createServiceClient()

    // Basic auth check - in production use proper middleware
    const authHeader = req.headers.get('authorization')
    if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase
      .from('scholarships')
      .insert(body)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create scholarship' }, { status: 500 })
  }
}
