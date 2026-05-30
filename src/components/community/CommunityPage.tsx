'use client'
import { motion } from 'framer-motion'
import { MessageSquare, Users, ThumbsUp, Award, Pin } from 'lucide-react'

const POSTS = [
  { author: 'Rahul S.', country: '🇮🇳', badge: 'MEXT Scholar', title: 'I got MEXT 2024! Here's everything that worked for me', likes: 847, replies: 124, pinned: true, time: '2 days ago' },
  { author: 'Fatima A.', country: '🇳🇬', badge: 'JASSO Scholar', title: 'JASSO vs MEXT - Which should I apply for? Complete comparison', likes: 432, replies: 89, pinned: false, time: '4 days ago' },
  { author: 'Carlos M.', country: '🇧🇷', badge: 'KOSEN Student', title: 'KOSEN life in Nagoya - honest review after 1 year', likes: 391, replies: 67, pinned: false, time: '1 week ago' },
  { author: 'Priya N.', country: '🇮🇳', badge: 'Applicant', title: 'My MEXT embassy interview experience - Q&A inside!', likes: 284, replies: 56, pinned: false, time: '1 week ago' },
  { author: 'Liu W.', country: '🇲🇾', badge: 'UTokyo Student', title: 'Cost of living in Tokyo in 2025 - breakdown for students', likes: 215, replies: 44, pinned: false, time: '2 weeks ago' },
]

export function CommunityPage() {
  return (
    <main className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="eyebrow mb-4">Community</div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">Student <span className="text-brand-red">Community</span></h1>
        <p className="text-white/40 mb-10">Connect with MEXT scholars, KOSEN students, and Japan dream-chasers from 160+ countries.</p>
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[{ label: 'Members', value: '85,231', icon: Users },{ label: 'Discussions', value: '12,840', icon: MessageSquare },{ label: 'Scholarships Won', value: '3,421', icon: Award }].map(s => (
            <div key={s.label} className="glass-card rounded-xl p-4 border border-white/[0.07] text-center">
              <s.icon className="w-5 h-5 text-brand-red mx-auto mb-2" />
              <div className="text-2xl font-extrabold text-white">{s.value}</div>
              <div className="text-xs text-white/35 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {POSTS.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="glass-card rounded-xl p-5 border border-white/[0.07] hover:border-brand-red/20 cursor-pointer transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-red/15 border border-brand-red/25 flex items-center justify-center text-sm font-bold text-brand-red flex-shrink-0">{p.author.split(' ')[0][0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {p.pinned && <Pin className="w-3 h-3 text-brand-red flex-shrink-0" />}
                    <span className="text-xs font-semibold text-white">{p.author} {p.country}</span>
                    <span className="text-[10px] text-brand-red bg-brand-red/10 border border-brand-red/20 rounded-full px-2 py-0.5">{p.badge}</span>
                    <span className="text-[11px] text-white/25">{p.time}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors line-clamp-1">{p.title}</h3>
                </div>
                <div className="flex gap-4 text-xs text-white/30 flex-shrink-0">
                  <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" />{p.likes}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />{p.replies}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
