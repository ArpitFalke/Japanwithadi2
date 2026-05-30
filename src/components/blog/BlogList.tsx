'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

const POSTS = [
  { slug: 'mext-complete-guide-2025', title: "MEXT Scholarship 2025: The Ultimate Complete Guide", excerpt: 'Everything you need to know about applying for MEXT Embassy and University Recommendation routes — eligibility, exams, timeline, and insider tips.', category: 'MEXT', readTime: '12 min', date: 'May 10, 2025', thumbnail: '🏛️' },
  { slug: 'jasso-guide', title: "JASSO Scholarships Explained: Types, Eligibility & Application", excerpt: 'JASSO offers multiple scholarship types for exchange students. Learn which one matches your profile and how to apply through your university.', category: 'JASSO', readTime: '8 min', date: 'May 5, 2025', thumbnail: '🎓' },
  { slug: 'kosen-guide', title: "KOSEN Programs: Japan's Technical Education Gem", excerpt: 'KOSEN institutes are world-renowned for producing elite engineers. Discover how international students can join and what to expect.', category: 'KOSEN', readTime: '10 min', date: 'Apr 28, 2025', thumbnail: '⚙️' },
  { slug: 'jlpt-prep', title: "JLPT N5 to N1: Complete Study Strategy for 2025", excerpt: 'A structured 6-month study plan for each JLPT level, with recommended resources, study hours, and practice test strategies.', category: 'Language', readTime: '15 min', date: 'Apr 20, 2025', thumbnail: '🗣️' },
  { slug: 'japan-student-visa', title: "Japan Student Visa: Step-by-Step Application Guide", excerpt: 'How to obtain a Japanese student visa — from CoE to embassy interview. Everything international students need in one place.', category: 'Visa', readTime: '9 min', date: 'Apr 15, 2025', thumbnail: '✈️' },
  { slug: 'tokyo-vs-kyoto', title: "Tokyo vs Kyoto for International Students: Which University City?", excerpt: "Comparing Japan's two academic powerhouses — cost of living, university options, job prospects, and quality of student life.", category: 'Universities', readTime: '11 min', date: 'Apr 8, 2025', thumbnail: '🗼' },
]

const CAT_COLORS: Record<string, string> = {
  MEXT: 'text-red-400 bg-red-400/10 border-red-400/20',
  JASSO: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  KOSEN: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Language: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  Visa: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  Universities: 'text-green-400 bg-green-400/10 border-green-400/20',
}

export function BlogList() {
  return (
    <main className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="eyebrow mb-4">Knowledge Base</div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">Japan Study <span className="text-brand-red">Blog</span></h1>
        <p className="text-white/40 mb-12 max-w-xl">In-depth guides, MEXT tips, visa walkthroughs, and everything you need to study in Japan.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Link href={`/blog/${post.slug}`} className="group block glass-card rounded-2xl overflow-hidden border border-white/[0.07] hover:border-brand-red/25 hover:-translate-y-1 transition-all duration-300">
                <div className="h-36 bg-gradient-to-br from-brand-red/[0.08] to-transparent flex items-center justify-center text-6xl border-b border-white/[0.05]">
                  {post.thumbnail}
                </div>
                <div className="p-5">
                  <span className={`inline-block text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border mb-3 ${CAT_COLORS[post.category] || 'text-white/40 bg-white/5 border-white/10'}`}>{post.category}</span>
                  <h3 className="text-sm font-bold text-white leading-snug mb-2 group-hover:text-brand-red/90 transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-[11px] text-white/30">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} read</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
