'use client'

import { useState, useCallback, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Search, SlidersHorizontal, X, Heart, GitCompare, Clock, Sparkles, ChevronDown } from 'lucide-react'
import { cn, getCategoryColor, getCategoryLabel, daysUntilDeadline } from '@/lib/utils'

const SCHOLARSHIPS = [
  { id: '1', slug: 'mext-embassy-2025', scholarship_name: 'MEXT Embassy Scholarship 2025', provider: 'Ministry of Education, Japan', category: 'mext', funding_type: 'fully_funded', stipend: '¥117,000/month', stipend_amount: 117000, application_deadline: '2025-05-31', level: ['undergraduate'], field_of_study: ['All Fields'], japanese_requirement: 'none', nationality: 'all', description: 'Japan\'s flagship government scholarship covering full tuition, monthly stipend, and round-trip airfare for undergraduate students worldwide.' },
  { id: '2', slug: 'mext-university-2025', scholarship_name: 'MEXT University Recommendation 2025', provider: 'Ministry of Education, Japan', category: 'mext', funding_type: 'fully_funded', stipend: '¥117,000/month', stipend_amount: 117000, application_deadline: '2025-06-15', level: ['masters', 'phd'], field_of_study: ['STEM', 'Humanities'], japanese_requirement: 'none', nationality: 'all', description: 'MEXT scholarship via university recommendation for graduate students. Apply through Japanese universities directly.' },
  { id: '3', slug: 'jasso-exchange-2025', scholarship_name: 'JASSO Student Exchange Support 2025', provider: 'Japan Student Services Organization', category: 'jasso', funding_type: 'partial', stipend: '¥80,000/month', stipend_amount: 80000, application_deadline: '2025-06-30', level: ['undergraduate', 'masters'], field_of_study: ['All Fields'], japanese_requirement: 'none', nationality: 'all', description: 'Monthly stipend support for exchange students at Japanese partner universities.' },
  { id: '4', slug: 'kosen-international-2025', scholarship_name: 'KOSEN International Exchange Program', provider: 'National Institute of Technology', category: 'kosen', funding_type: 'fully_funded', stipend: '¥117,000/month', stipend_amount: 117000, application_deadline: '2025-03-15', level: ['kosen'], field_of_study: ['Engineering', 'Technology'], japanese_requirement: 'none', nationality: 'all', description: 'Fully funded technical education at Japan\'s National Institutes of Technology (KOSEN).' },
  { id: '5', slug: 'utokyo-global-leaders', scholarship_name: 'UTokyo Global Leaders Program', provider: 'University of Tokyo', category: 'university', funding_type: 'fully_funded', stipend: '¥150,000/month', stipend_amount: 150000, application_deadline: '2025-07-01', level: ['masters', 'phd'], field_of_study: ['Research', 'Science', 'Engineering'], japanese_requirement: 'none', nationality: 'all', description: 'Prestigious UTokyo scholarship for outstanding international researchers and graduate students.' },
  { id: '6', slug: 'rotary-japan-2025', scholarship_name: 'Rotary Foundation Study Grant', provider: 'Rotary International', category: 'foundation', funding_type: 'fully_funded', stipend: 'Variable', stipend_amount: 100000, application_deadline: '2025-07-31', level: ['masters'], field_of_study: ['Vocational', 'Leadership'], japanese_requirement: 'none', nationality: 'all', description: 'Rotary Foundation vocational training grant for community leaders studying in Japan.' },
  { id: '7', slug: 'osaka-university-igs', scholarship_name: 'Osaka University IGS Scholarship', provider: 'Osaka University', category: 'university', funding_type: 'fully_funded', stipend: '¥120,000/month', stipend_amount: 120000, application_deadline: '2025-08-15', level: ['masters', 'phd'], field_of_study: ['All Fields'], japanese_requirement: 'none', nationality: 'all', description: 'International Graduate School scholarship for exceptional international students at Osaka University.' },
  { id: '8', slug: 'sony-scholarship-2025', scholarship_name: 'Sony Foundation Scholarship', provider: 'Sony Corporation', category: 'foundation', funding_type: 'fully_funded', stipend: '¥200,000/month', stipend_amount: 200000, application_deadline: '2025-09-01', level: ['masters', 'phd'], field_of_study: ['Engineering', 'Technology', 'Arts'], japanese_requirement: 'n3', nationality: 'all', description: 'Prestigious Sony Foundation scholarship for future innovators in technology and creative arts.' },
  { id: '9', slug: 'jasso-honors-scholarship', scholarship_name: 'JASSO Honors Scholarship', provider: 'Japan Student Services Organization', category: 'jasso', funding_type: 'stipend_only', stipend: '¥48,000/month', stipend_amount: 48000, application_deadline: '2025-10-01', level: ['undergraduate'], field_of_study: ['All Fields'], japanese_requirement: 'n4', nationality: 'all', description: 'Monthly stipend for high-achieving international students enrolled at Japanese universities.' },
]

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'mext', label: 'MEXT' },
  { value: 'jasso', label: 'JASSO' },
  { value: 'kosen', label: 'KOSEN' },
  { value: 'stc', label: 'STC' },
  { value: 'university', label: 'University' },
  { value: 'foundation', label: 'Foundation' },
  { value: 'exchange', label: 'Exchange' },
  { value: 'language', label: 'Language' },
]

const levels = [
  { value: '', label: 'All Levels' },
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'masters', label: 'Masters' },
  { value: 'phd', label: 'PhD' },
  { value: 'kosen', label: 'KOSEN' },
  { value: 'stc', label: 'STC' },
]

const fundingTypes = [
  { value: '', label: 'Any Funding' },
  { value: 'fully_funded', label: 'Fully Funded' },
  { value: 'partial', label: 'Partial' },
  { value: 'stipend_only', label: 'Stipend Only' },
]

const sortOptions = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'deadline', label: 'Closest Deadline' },
  { value: 'stipend', label: 'Highest Stipend' },
  { value: 'popular', label: 'Most Popular' },
]

export function ScholarshipsPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [level, setLevel] = useState('')
  const [funding, setFunding] = useState('')
  const [noJapanese, setNoJapanese] = useState(false)
  const [sort, setSort] = useState('recent')
  const [showFilters, setShowFilters] = useState(false)
  const [saved, setSaved] = useState<Set<string>>(new Set())

  const filtered = SCHOLARSHIPS.filter(s => {
    if (query && !s.scholarship_name.toLowerCase().includes(query.toLowerCase()) &&
      !s.provider.toLowerCase().includes(query.toLowerCase()) &&
      !s.description.toLowerCase().includes(query.toLowerCase())) return false
    if (category && s.category !== category) return false
    if (level && !s.level.includes(level)) return false
    if (funding && s.funding_type !== funding) return false
    if (noJapanese && s.japanese_requirement && s.japanese_requirement !== 'none') return false
    return true
  }).sort((a, b) => {
    if (sort === 'deadline') return new Date(a.application_deadline).getTime() - new Date(b.application_deadline).getTime()
    if (sort === 'stipend') return b.stipend_amount - a.stipend_amount
    return 0
  })

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    setSaved(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <main className="pt-20 min-h-screen">
      {/* Page header */}
      <div className="border-b border-white/[0.06] bg-brand-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="eyebrow mb-3">Scholarship Database</div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Find Your <span className="text-brand-red">Japan Scholarship</span>
          </h1>
          <p className="text-white/40 text-sm">Search through {SCHOLARSHIPS.length}+ scholarships — MEXT, JASSO, KOSEN, universities, and private foundations</p>

          {/* Search bar */}
          <div className="flex gap-3 mt-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search MEXT, JASSO, universities, stipend amount..."
                className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-brand-red/50 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn('flex items-center gap-2 px-5 border rounded-xl text-sm font-medium transition-all', showFilters ? 'bg-brand-red/10 border-brand-red/40 text-brand-red' : 'bg-white/[0.04] border-white/[0.08] text-white/50 hover:text-white')}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            <Link href="/ai" className="flex items-center gap-2 px-5 bg-brand-red/90 hover:bg-brand-red text-white rounded-xl text-sm font-semibold transition-colors shadow-[0_0_20px_rgba(255,0,47,0.3)]">
              <Sparkles className="w-4 h-4" />
              AI Match
            </Link>
          </div>

          {/* Filter bar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
                  {[
                    { value: category, setter: setCategory, options: categories, label: 'Category' },
                    { value: level, setter: setLevel, options: levels, label: 'Level' },
                    { value: funding, setter: setFunding, options: fundingTypes, label: 'Funding' },
                    { value: sort, setter: setSort, options: sortOptions, label: 'Sort by' },
                  ].map(({ value, setter, options, label }) => (
                    <div key={label} className="relative">
                      <select
                        value={value}
                        onChange={e => setter(e.target.value)}
                        className="w-full appearance-none bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white/70 outline-none cursor-pointer"
                      >
                        {options.map(o => <option key={o.value} value={o.value} className="bg-[#111]">{o.label}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" />
                    </div>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={noJapanese} onChange={e => setNoJapanese(e.target.checked)} className="accent-brand-red w-4 h-4" />
                    <span className="text-sm text-white/50">No Japanese Required</span>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-white/40">
            Showing <span className="text-white font-semibold">{filtered.length}</span> scholarships
            {query && <span> for "<span className="text-brand-red">{query}</span>"</span>}
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s, i) => {
            const days = daysUntilDeadline(s.application_deadline)
            const isSaved = saved.has(s.id)
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link href={`/scholarships/${s.slug}`} className="scholarship-card-hover relative block glass-card rounded-2xl p-6 border border-white/[0.07] hover:border-brand-red/30 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 group">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className={cn('inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border', getCategoryColor(s.category))}>
                      {getCategoryLabel(s.category)}
                    </span>
                    {s.funding_type === 'fully_funded' && (
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2 py-0.5">Fully Funded</span>
                    )}
                  </div>

                  <h3 className="text-[15px] font-bold text-white leading-snug mb-1.5 group-hover:text-brand-red/90 transition-colors line-clamp-2">{s.scholarship_name}</h3>
                  <p className="text-xs text-white/35 mb-3">{s.provider}</p>
                  <p className="text-xs text-white/40 leading-relaxed mb-4 line-clamp-2">{s.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs text-brand-red font-semibold">{s.stipend}</span>
                    <span className="text-xs text-white/35">·</span>
                    <span className="text-xs text-white/40">{s.level.map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(' / ')}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                    <div className={cn('flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border', days <= 14 ? 'bg-brand-red/10 border-brand-red/30 text-red-400' : days <= 30 ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-white/[0.04] border-white/[0.07] text-white/40')}>
                      <Clock className="w-3 h-3" />
                      {days < 0 ? 'Closed' : days === 0 ? 'Today!' : `${days}d left`}
                    </div>
                    <div className="flex gap-1.5">
                      <button onClick={e => toggleSave(s.id, e)} className={cn('w-7 h-7 rounded-lg border flex items-center justify-center transition-all', isSaved ? 'bg-brand-red/20 border-brand-red/40 text-brand-red' : 'bg-white/[0.04] border-white/[0.06] text-white/30 hover:text-brand-red hover:border-brand-red/30')}>
                        <Heart className={cn('w-3.5 h-3.5', isSaved && 'fill-current')} />
                      </button>
                      <button onClick={e => e.preventDefault()} className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white/70 transition-all">
                        <GitCompare className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="text-5xl mb-5">🔍</div>
            <h3 className="text-xl font-bold mb-2">No scholarships found</h3>
            <p className="text-white/40 mb-6">Try adjusting your filters or ask Adi Sensei for personalized recommendations.</p>
            <Link href="/ai" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white font-semibold rounded-xl">
              <Sparkles className="w-4 h-4" />
              Ask Adi Sensei
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
