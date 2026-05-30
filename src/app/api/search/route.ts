import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.trim()

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] })
  }

  try {
    const supabase = createServiceClient()
    const { data } = await supabase
      .from('scholarships')
      .select('id, scholarship_name, provider, category, slug, stipend, application_deadline, funding_type')
      .eq('active', true)
      .or(`scholarship_name.ilike.%${q}%,provider.ilike.%${q}%,tags.cs.{${q}}`)
      .limit(8)
      .order('views', { ascending: false })

    return NextResponse.json({
      results: data || [],
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=30' },
    })
  } catch {
    return NextResponse.json({ results: [] }, { status: 500 })
  }
}
