import { createServiceClient } from './supabase'
import type { Scholarship, SearchFilters, PaginatedResponse } from '@/types'

export async function getScholarships(
  filters: SearchFilters = {}
): Promise<PaginatedResponse<Scholarship>> {
  const supabase = createServiceClient()
  const {
    query,
    category,
    level,
    funding_type,
    japanese_required,
    nationality,
    field,
    page = 1,
    per_page = 12,
    sort = 'recent',
  } = filters

  let q = supabase
    .from('scholarships')
    .select('*', { count: 'exact' })
    .eq('active', true)

  if (query) {
    q = q.or(`scholarship_name.ilike.%${query}%,description.ilike.%${query}%,provider.ilike.%${query}%,tags.cs.{${query}}`)
  }

  if (category) q = q.eq('category', category)
  if (funding_type) q = q.eq('funding_type', funding_type)
  if (japanese_required === false) {
    q = q.or('japanese_requirement.is.null,japanese_requirement.eq.none')
  }

  if (sort === 'deadline') q = q.order('application_deadline', { ascending: true })
  else if (sort === 'stipend') q = q.order('stipend_amount', { ascending: false })
  else if (sort === 'popular') q = q.order('views', { ascending: false })
  else q = q.order('created_at', { ascending: false })

  const from = (page - 1) * per_page
  q = q.range(from, from + per_page - 1)

  const { data, error, count } = await q

  if (error) throw error

  return {
  data: data as Scholarship[],
  total: count || 0,
  page,
  limit: per_page,
  hasMore: (count || 0) > page * per_page,
}
}

export async function getScholarshipBySlug(slug: string): Promise<Scholarship | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('scholarships')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (error || !data) return null

  // Increment views
  await supabase.rpc('increment_scholarship_views', { scholarship_id: data.id })

  return data as Scholarship
}

export async function getFeaturedScholarships(): Promise<Scholarship[]> {
  const supabase = createServiceClient()
  const { data } = await supabase
    .from('scholarships')
    .select('*')
    .eq('active', true)
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(6)

  return (data || []) as Scholarship[]
}

export async function getRelatedScholarships(
  scholarshipId: string,
  category: string
): Promise<Scholarship[]> {
  const supabase = createServiceClient()
  const { data } = await supabase
    .from('scholarships')
    .select('*')
    .eq('active', true)
    .eq('category', category)
    .neq('id', scholarshipId)
    .limit(4)

  return (data || []) as Scholarship[]
}

export async function searchScholarships(query: string): Promise<Scholarship[]> {
  const supabase = createServiceClient()
  const { data } = await supabase
    .from('scholarships')
    .select('id, scholarship_name, provider, category, slug, stipend, application_deadline')
    .eq('active', true)
    .or(`scholarship_name.ilike.%${query}%,provider.ilike.%${query}%`)
    .limit(8)

  return (data || []) as Scholarship[]
}

export async function getUserSavedScholarships(userId: string): Promise<Scholarship[]> {
  const supabase = createServiceClient()
  const { data } = await supabase
    .from('saved_scholarships')
    .select('scholarships(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return (data?.map((d: { scholarships: unknown }) => d.scholarships).filter(Boolean) || []) as Scholarship[]
}

export async function toggleSaveScholarship(
  userId: string,
  scholarshipId: string
): Promise<boolean> {
  const supabase = createServiceClient()

  const { data: existing } = await supabase
    .from('saved_scholarships')
    .select('id')
    .eq('user_id', userId)
    .eq('scholarship_id', scholarshipId)
    .single()

  if (existing) {
    await supabase
      .from('saved_scholarships')
      .delete()
      .eq('user_id', userId)
      .eq('scholarship_id', scholarshipId)
    return false
  } else {
    await supabase
      .from('saved_scholarships')
      .insert({ user_id: userId, scholarship_id: scholarshipId })
    return true
  }
}

export async function getScholarshipStats() {
  const supabase = createServiceClient()
  const [{ count: total }, { count: mext }, { count: jasso }] = await Promise.all([
    supabase.from('scholarships').select('*', { count: 'exact', head: true }).eq('active', true),
    supabase.from('scholarships').select('*', { count: 'exact', head: true }).eq('category', 'mext').eq('active', true),
    supabase.from('scholarships').select('*', { count: 'exact', head: true }).eq('category', 'jasso').eq('active', true),
  ])

  return {
    total: total || 0,
    mext: mext || 0,
    jasso: jasso || 0,
  }
}
