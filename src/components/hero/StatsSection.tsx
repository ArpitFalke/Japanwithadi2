'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Users, Award, BookOpen, Globe, Clock } from 'lucide-react'

const stats = [
  { icon: BookOpen, value: 547, suffix: '', label: 'Active Scholarships', desc: 'Constantly updated database' },
  { icon: Users, value: 85000, suffix: '+', label: 'Students Guided', desc: 'From 160+ countries worldwide' },
  { icon: Award, value: 98, suffix: '%', label: 'Satisfaction Rate', desc: 'AI-powered matching accuracy' },
  { icon: Globe, value: 150, suffix: '+', label: 'Partner Universities', desc: 'Top Japanese institutions' },
  { icon: TrendingUp, value: 72, suffix: '%', label: 'Acceptance Rate', desc: 'For fully prepared applicants' },
  { icon: Clock, value: 24, suffix: '/7', label: 'AI Support', desc: 'Adi Sensei always available' },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const step = Math.ceil(target / (duration / 16))
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + step, target)
      setCount(current)
      if (current >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count >= 1000 ? `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}K` : count}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-[#080306] to-brand-black" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="eyebrow justify-center mb-4">Platform Impact</div>
          <h2 className="text-4xl font-extrabold tracking-tight">
            Numbers That <span className="text-brand-red">Speak</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card-hover rounded-2xl p-6 group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(255,0,47,0.2)] transition-shadow">
                <stat.icon className="w-5 h-5 text-brand-red" />
              </div>
              <div className="text-4xl font-extrabold mb-1 tabular-nums text-white">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-semibold text-white mb-1">{stat.label}</div>
              <div className="text-xs text-white/30">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
