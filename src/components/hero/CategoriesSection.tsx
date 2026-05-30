'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const categories = [
  { id: 'mext', icon: '🏛️', label: 'MEXT', jp: '文部科学省', count: 48, desc: 'Japan Govt. flagship scholarship', color: 'hover:border-red-500/40' },
  { id: 'jasso', icon: '🎓', label: 'JASSO', jp: '日本学生支援機構', count: 32, desc: 'Student exchange & support', color: 'hover:border-blue-500/40' },
  { id: 'kosen', icon: '⚙️', label: 'KOSEN', jp: '高等専門学校', count: 24, desc: 'Technical college programs', color: 'hover:border-amber-500/40' },
  { id: 'stc', icon: '🏫', label: 'STC Programs', jp: '専修学校', count: 28, desc: 'Specialized training colleges', color: 'hover:border-purple-500/40' },
  { id: 'university', icon: '🗼', label: 'University Grants', jp: '大学独自奨学金', count: 156, desc: 'Direct university scholarships', color: 'hover:border-green-500/40' },
  { id: 'foundation', icon: '🏢', label: 'Private Foundation', jp: '民間財団奨学金', count: 89, desc: 'Rotary, Sony, Honda & more', color: 'hover:border-pink-500/40' },
  { id: 'exchange', icon: '🌐', label: 'Exchange Programs', jp: '交換留学', count: 67, desc: 'Short-term study exchanges', color: 'hover:border-cyan-500/40' },
  { id: 'language', icon: '🗣️', label: 'Language Programs', jp: '日本語教育', count: 43, desc: 'Japanese language immersion', color: 'hover:border-orange-500/40' },
]

export function CategoriesSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="eyebrow mb-4">Scholarship Programs</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-4xl font-extrabold tracking-tight">
              Explore by <span className="text-brand-red">Category</span>
            </h2>
            <Link href="/scholarships" className="text-sm text-white/40 hover:text-brand-red transition-colors">
              View all 500+ scholarships →
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link
                href={`/scholarships?category=${cat.id}`}
                className={`group block glass-card rounded-2xl p-6 text-center transition-all duration-300 border border-white/[0.07] ${cat.color} hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)]`}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <div className="text-sm font-bold text-white mb-1">{cat.label}</div>
                <div className="font-jp text-[10px] text-white/25 tracking-[2px] mb-2">{cat.jp}</div>
                <div className="text-xs text-white/35 mb-3">{cat.desc}</div>
                <div className="inline-block text-[11px] font-semibold text-brand-red/80 bg-brand-red/[0.08] border border-brand-red/20 rounded-full px-3 py-1">
                  {cat.count} available
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
