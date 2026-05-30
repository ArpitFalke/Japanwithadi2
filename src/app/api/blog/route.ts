import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const supabase = createServiceClient()
    const from = (page - 1) * 9
    const { data, error, count } = await supabase.from('blog_posts').select('id,title,slug,excerpt,thumbnail,tags,created_at,views', { count: 'exact' }).eq('published', true).order('created_at', { ascending: false }).range(from, from + 8)
    if (error) throw error
    return NextResponse.json({ success: true, data, total: count })
  } catch {
    return NextResponse.json({ success: false, data: [] })
  }
}
