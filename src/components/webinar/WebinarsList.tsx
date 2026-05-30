'use client'
import { motion } from 'framer-motion'
import { Calendar, Users, Play, Clock } from 'lucide-react'

const WEBINARS = [
  { title: 'MEXT Embassy 2025: Complete Application Masterclass', speaker: 'Adi & MEXT Alumni Panel', date: 'June 14, 2025', time: '7:00 PM IST', attendees: 1240, duration: '90 min', topics: ['Embassy Route', 'Exam Strategy', 'Interview Tips', 'Documents'], live: true },
  { title: 'JASSO Scholarship Deep Dive: All Types Explained', speaker: 'Japan With Adi Team', date: 'June 21, 2025', time: '6:00 PM IST', attendees: 890, duration: '75 min', topics: ['JASSO Types', 'Eligibility', 'Application'], live: false },
  { title: 'KOSEN & STC: Hidden Gems for Technical Students', speaker: 'KOSEN Alumni Panel', date: 'June 28, 2025', time: '5:00 PM IST', attendees: 670, duration: '60 min', topics: ['KOSEN Life', 'Application Path'], live: false },
  { title: 'Writing a Winning MEXT Study Plan / SOP', speaker: 'Dr. Yamamoto, UTokyo', date: 'July 5, 2025', time: '7:30 PM IST', attendees: 520, duration: '60 min', topics: ['SOP Tips', 'Research Plan', 'Word Limits'], live: false },
]

export function WebinarsList() {
  return (
    <main className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="eyebrow mb-4">Live Events</div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">Japan Scholarship <span className="text-brand-red">Webinars</span></h1>
        <p className="text-white/40 mb-12">Free live sessions with scholars, alumni, and Japan study experts.</p>
        <div className="grid md:grid-cols-2 gap-5">
          {WEBINARS.map((w, i) => (
            <motion.div key={w.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 border border-white/[0.07] hover:border-brand-red/20 transition-all group">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex gap-2 flex-wrap">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2.5 py-0.5 uppercase">Free</span>
                  {w.live && <span className="text-[10px] font-bold text-brand-red bg-brand-red/10 border border-brand-red/20 rounded-full px-2.5 py-0.5 uppercase flex items-center gap-1"><span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />Next Up</span>}
                </div>
                <span className="text-xs text-white/30 flex items-center gap-1 flex-shrink-0"><Clock className="w-3 h-3" />{w.duration}</span>
              </div>
              <h3 className="text-base font-bold text-white leading-snug mb-2 group-hover:text-brand-red/90 transition-colors">{w.title}</h3>
              <p className="text-xs text-white/40 mb-4">Speaker: {w.speaker}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {w.topics.map(t => <span key={t} className="text-[10px] text-white/35 bg-white/[0.04] border border-white/[0.06] rounded-full px-2.5 py-0.5">{t}</span>)}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-white/35 space-y-1">
                  <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{w.date} · {w.time}</div>
                  <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{w.attendees.toLocaleString()} registered</div>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-red text-white text-xs font-bold rounded-xl shadow-[0_0_15px_rgba(255,0,47,0.3)] hover:shadow-[0_0_25px_rgba(255,0,47,0.5)] transition-all">
                  <Play className="w-3.5 h-3.5" />Register Free
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
