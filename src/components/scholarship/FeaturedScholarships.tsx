'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, GitCompare, Clock, ArrowRight } from 'lucide-react'
import { cn, getCategoryColor, getCategoryLabel, daysUntilDeadline } from '@/lib/utils'

const FEATURED = [
  { id: '1', slug: 'mext-embassy-2025', scholarship_name: 'MEXT Embassy Scholarship 2025', provider: 'Ministry of Education, Japan', category: 'mext', funding_type: 'fully_funded', stipend: '¥117,000/month', application_deadline: '2025-05-31', level: ['undergraduate'], field_of_study: ['All Fields'], interview_required: true, tuition_covered: true, featured: true },
  { id: '2', slug: 'mext-university-2025', scholarship_name: 'MEXT University Recommendation 2025', provider: 'Ministry of Education, Japan', category: 'mext', funding_type: 'fully_funded', stipend: '¥117,000/month', application_deadline: '2025-06-15', level: ['masters', 'phd'], field_of_study: ['STEM', 'Humanities'], interview_required: true, tuition_covered: true, featured: true },
  { id: '3', slug: 'jasso-exchange-2025', scholarship_name: 'JASSO Student Exchange Support 2025', provider: 'Japan Student Services Organization', category: 'jasso', funding_type: 'partial', stipend: '¥80,000/month', application_deadline: '2025-06-30', level: ['undergraduate', 'masters'], field_of_study: ['All Fields'], interview_required: false, tuition_covered: false, featured: true },
  { id: '4', slug: 'kosen-international-2025', scholarship_name: 'KOSEN International Exchange Program', provider: 'National Institute of Technology', category: 'kosen', funding_type: 'fully_funded', stipend: '¥117,000/month', application_deadline: '2025-03-15', level: ['kosen'], field_of_study: ['Engineering', 'Technology'], interview_required: true, tuition_covered: true, featured: true },
  { id: '5', slug: 'utokyo-foe-2025', scholarship_name: 'UTokyo Global Leaders Program', provider: 'University of Tokyo', category: 'university', funding_type: 'fully_funded', stipend: '¥150,000/month', application_deadline: '2025-07-01', level: ['masters', 'phd'], field_of_study: ['Research', 'Science'], interview_required: true, tuition_covered: true, featured: true },
  { id: '6', slug: 'rotary-japan-2025', scholarship_name: 'Rotary Foundation Study Grant', provider: 'Rotary International', category: 'foundation', funding_type: 'fully_funded', stipend: 'Variable', application_deadline: '2025-07-31', level: ['masters'], field_of_study: ['Vocational', 'Leadership'], interview_required: true, tuition_covered: true, featured: true },
]

export function FeaturedScholarships() {
  return (
    <section className="py-24 px-6 bg-[#07040a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="eyebrow mb-4">Top Picks</div>
            <h2 className="text-4xl font-extrabold tracking-tight">
              Featured <span className="text-brand-red">Scholarships</span>
            </h2>
          </div>
          <Link href="/scholarships" className="text-sm text-white/40 hover:text-brand-red transition-colors flex items-center gap-1">
            Browse all 500+ scholarships <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED.map((s, i) => {
            const days = daysUntilDeadline(s.application_deadline)
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link href={`/scholarships/${s.slug}`} className="scholarship-card-hover relative block glass-card rounded-2xl p-6 border border-white/[0.07] hover:border-brand-red/30 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 group">
                  {/* Category tag */}
                  <div className={cn('inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border mb-3', getCategoryColor(s.category))}>
                    {getCategoryLabel(s.category)}
                    {s.funding_type === 'fully_funded' && <span className="text-emerald-400">· Fully Funded</span>}
                  </div>

                  <h3 className="text-[15px] font-bold text-white leading-snug mb-1.5 group-hover:text-brand-red/90 transition-colors">{s.scholarship_name}</h3>
                  <p className="text-xs text-white/40 mb-4">{s.provider}</p>

                  <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
                    <div className="text-xs text-white/50"><span className="text-brand-red font-semibold text-sm">{s.stipend}</span></div>
                    <div className="text-xs text-white/40">{s.level.map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(' / ')}</div>
                    {s.tuition_covered && <div className="text-xs text-emerald-400/70">Tuition covered</div>}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                    <div className={cn('flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border', days <= 14 ? 'bg-brand-red/10 border-brand-red/30 text-red-400' : days <= 30 ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-white/[0.04] border-white/[0.07] text-white/40')}>
                      <Clock className="w-3 h-3" />
                      {days < 0 ? 'Closed' : days === 0 ? 'Today!' : `${days}d left`}
                    </div>
                    <div className="flex gap-1.5">
                      <button onClick={e => e.preventDefault()} className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-brand-red hover:border-brand-red/30 transition-all">
                        <Heart className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={e => e.preventDefault()} className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white/70 hover:border-white/20 transition-all">
                        <GitCompare className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
