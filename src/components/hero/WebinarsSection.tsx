'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Users, ArrowRight, Play } from 'lucide-react'

const webinars = [
  {
    title: 'MEXT Embassy 2025: Complete Application Masterclass',
    speaker: 'Adi & Guest MEXT Scholar',
    date: 'June 14, 2025',
    time: '7:00 PM IST',
    attendees: 1240,
    free: true,
    topics: ['Embassy Route', 'Exam Strategy', 'Interview Tips'],
  },
  {
    title: 'From Zero to Japan: JASSO Scholarship Deep Dive',
    speaker: 'Japan With Adi Team',
    date: 'June 21, 2025',
    time: '6:00 PM IST',
    attendees: 890,
    free: true,
    topics: ['JASSO Types', 'Eligibility', 'Document Prep'],
  },
  {
    title: 'KOSEN & STC Programs: The Hidden Gems',
    speaker: 'KOSEN Alumni Panel',
    date: 'June 28, 2025',
    time: '5:00 PM IST',
    attendees: 670,
    free: true,
    topics: ['KOSEN Life', 'Technical Fields', 'Application Path'],
  },
]

export function WebinarsSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="eyebrow mb-4">Live Events</div>
            <h2 className="text-4xl font-extrabold tracking-tight">
              Upcoming <span className="text-brand-red">Webinars</span>
            </h2>
          </div>
          <Link href="/webinars" className="text-sm text-white/40 hover:text-brand-red transition-colors">
            View all webinars →
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {webinars.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 border border-white/[0.07] hover:border-brand-red/25 transition-all group"
            >
              {w.free && (
                <span className="inline-block text-[10px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2.5 py-0.5 mb-4 uppercase tracking-wide">Free</span>
              )}
              <h3 className="text-sm font-bold text-white leading-snug mb-3">{w.title}</h3>
              <p className="text-xs text-white/40 mb-4">{w.speaker}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {w.topics.map((t) => (
                  <span key={t} className="text-[10px] text-white/40 bg-white/[0.04] border border-white/[0.06] rounded-full px-2.5 py-0.5">{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-white/35 mb-4">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{w.date} · {w.time}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{w.attendees.toLocaleString()}</span>
              </div>
              <button className="w-full py-2.5 text-sm font-semibold text-white bg-brand-red/90 hover:bg-brand-red rounded-lg transition-colors flex items-center justify-center gap-2">
                <Play className="w-3.5 h-3.5" />
                Register Free
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CtaSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass-card rounded-3xl p-12 text-center border border-white/[0.07] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-red/[0.08] via-transparent to-transparent" />
          <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] rounded-full bg-brand-red/[0.07] blur-[80px]" />
          <div className="relative z-10">
            <div className="font-jp text-xs text-white/20 tracking-[4px] mb-4">一緒に始めましょう</div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
              Start Your Japan
              <br />
              <span className="text-brand-red">Scholarship Journey</span> Today
            </h2>
            <p className="text-white/40 max-w-xl mx-auto mb-10">
              Join 85,000+ students using Japan With Adi to discover scholarships, build roadmaps,
              and get accepted into Japanese universities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="group flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-red text-white font-bold text-[15px] rounded-xl shadow-[0_0_30px_rgba(255,0,47,0.4)] hover:shadow-[0_0_50px_rgba(255,0,47,0.6)] hover:-translate-y-0.5 transition-all"
              >
                Create Free Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/scholarships"
                className="flex items-center justify-center gap-2.5 px-8 py-4 border border-white/[0.1] text-white font-semibold text-[15px] rounded-xl hover:border-brand-red/30 hover:bg-white/[0.04] transition-all"
              >
                Browse Scholarships
              </Link>
            </div>
            <p className="text-xs text-white/20 mt-6">Free forever · No credit card · Used by students in 160+ countries</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
