import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase.from('webinars').select('*').order('date', { ascending: true }).limit(10)
    if (error) throw error
    return NextResponse.json({ success: true, data }, { headers: { 'Cache-Control': 'public, s-maxage=300' } })
  } catch {
    return NextResponse.json({ success: false, data: [] })
  }
}
