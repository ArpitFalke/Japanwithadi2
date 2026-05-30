'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bell, BookOpen, Clock, Heart, Search, Sparkles, TrendingUp, Target, Calendar, FileText, ChevronRight, Award } from 'lucide-react'
import { cn, getStatusColor } from '@/lib/utils'

const APPLICATIONS = [
  { id: '1', name: 'MEXT Embassy 2025', provider: 'Ministry of Education', status: 'applied', deadline: '2025-05-31', icon: '🏛️' },
  { id: '2', name: 'JASSO Exchange Support', provider: 'Japan Student Services', status: 'preparing', deadline: '2025-06-30', icon: '🎓' },
  { id: '3', name: 'UTokyo Global Leaders', provider: 'University of Tokyo', status: 'saved', deadline: '2025-07-01', icon: '🗼' },
  { id: '4', name: 'KOSEN Exchange Program', provider: 'Nat. Inst. of Technology', status: 'saved', deadline: '2025-03-15', icon: '⚙️' },
]

const DEADLINES = [
  { name: 'MEXT Embassy Application', days: 12, level: 'urgent' as const },
  { name: 'JASSO Exchange Scholarship', days: 28, level: 'soon' as const },
  { name: 'UTokyo GLP Scholarship', days: 45, level: 'normal' as const },
  { name: 'Rotary Foundation Grant', days: 60, level: 'normal' as const },
]

const MATCH_SCORES = [
  { name: 'Academic Performance', score: 92 },
  { name: 'MEXT Eligibility', score: 87 },
  { name: 'JASSO Match', score: 78 },
  { name: 'Profile Complete', score: 65 },
]

const STATUS_LABELS: Record<string, string> = {
  saved: 'Saved',
  preparing: 'Preparing',
  applied: 'Applied',
  interview: 'Interview',
  accepted: 'Accepted',
  rejected: 'Rejected',
}

const tabs = ['Overview', 'Applications', 'Saved', 'Documents', 'Progress']

export function DashboardClient() {
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <main className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <div className="eyebrow mb-3">Student Portal</div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              Welcome back, <span className="text-brand-red">Rahul</span> 👋
            </h1>
            <p className="text-white/40 text-sm">Your MEXT application deadline is in <span className="text-brand-red font-semibold">12 days</span>. Stay on track!</p>
          </div>
          <div className="flex gap-3">
            <Link href="/scholarships" className="hidden md:flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white/50 border border-white/[0.08] rounded-xl hover:text-white hover:border-white/20 transition-all">
              <Search className="w-4 h-4" />
              Find Scholarships
            </Link>
            <Link href="/ai" className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-brand-red rounded-xl shadow-[0_0_20px_rgba(255,0,47,0.35)] hover:shadow-[0_0_30px_rgba(255,0,47,0.5)] transition-all">
              <Sparkles className="w-4 h-4" />
              Ask AI
            </Link>
          </div>
        </div>

        {/* Top metric cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BookOpen, label: 'Scholarships Saved', value: '4', change: '+1 this week', color: 'text-brand-red' },
            { icon: FileText, label: 'Applications Active', value: '2', change: '1 applied, 1 preparing', color: 'text-blue-400' },
            { icon: Target, label: 'AI Match Score', value: '87%', change: 'High match profile', color: 'text-emerald-400' },
            { icon: Clock, label: 'Days to Deadline', value: '12', change: 'MEXT Embassy 2025', color: 'text-amber-400' },
          ].map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="glass-card rounded-2xl p-5 border border-white/[0.07]">
              <card.icon className={cn('w-5 h-5 mb-3', card.color)} />
              <div className={cn('text-3xl font-extrabold mb-1 tabular-nums', card.color)}>{card.value}</div>
              <div className="text-xs font-medium text-white mb-0.5">{card.label}</div>
              <div className="text-[11px] text-white/30">{card.change}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1 w-fit">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={cn('px-4 py-2 rounded-lg text-sm font-semibold transition-all', activeTab === tab ? 'bg-brand-red text-white shadow-[0_0_15px_rgba(255,0,47,0.3)]' : 'text-white/40 hover:text-white')}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Applications tracker */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 border border-white/[0.07]">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider">Application Tracker</h3>
                  <Link href="/dashboard?tab=applications" className="text-xs text-brand-red hover:text-red-400 transition-colors">View All →</Link>
                </div>
                <div className="space-y-1">
                  {APPLICATIONS.map((app) => (
                    <div key={app.id} className="flex items-center gap-4 py-3.5 border-b border-white/[0.05] last:border-0 group">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-xl flex-shrink-0">
                        {app.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{app.name}</div>
                        <div className="text-xs text-white/35">{app.provider}</div>
                      </div>
                      <span className={cn('text-[11px] font-semibold px-2.5 py-1 rounded-full border', getStatusColor(app.status))}>
                        {STATUS_LABELS[app.status]}
                      </span>
                      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* AI insight card */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="glass-card rounded-2xl p-6 border border-brand-red/20 bg-brand-red/[0.03]">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-brand-red" />
                  <h3 className="text-sm font-bold">Adi Sensei AI Insight</h3>
                </div>
                <p className="text-sm text-white/55 leading-relaxed mb-4">
                  Based on your profile, you have a <strong className="text-white">high chance</strong> at MEXT Embassy 2025.
                  Your academic score is excellent (92%), but your Japanese language section is incomplete.
                  Adding JLPT N5 certification could boost your profile score by <span className="text-brand-red font-semibold">+12%</span>.
                </p>
                <div className="flex gap-3">
                  <Link href="/ai" className="text-sm font-semibold text-white bg-brand-red px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(255,0,47,0.3)]">
                    Get Full Analysis
                  </Link>
                  <Link href="/scholarships" className="text-sm font-medium text-white/50 border border-white/[0.09] px-4 py-2 rounded-xl hover:text-white transition-colors">
                    Find More
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right column */}
            <div className="space-y-5">
              {/* Match score */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="glass-card rounded-2xl p-6 border border-white/[0.07]">
                <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-5">Profile Match Score</h3>
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-28 h-28">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#ff002f" strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 42}`}
                        strokeDashoffset={`${2 * Math.PI * 42 * (1 - 0.87)}`}
                        strokeLinecap="round"
                        style={{ filter: 'drop-shadow(0 0 6px rgba(255,0,47,0.5))' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold text-white">87</span>
                      <span className="text-[10px] text-white/30 uppercase tracking-wider">Match</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {MATCH_SCORES.map(({ name, score }) => (
                    <div key={name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-white/40">{name}</span>
                        <span className="text-xs font-bold text-brand-red">{score}%</span>
                      </div>
                      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-brand-red to-red-400 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Deadlines */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="glass-card rounded-2xl p-6 border border-white/[0.07]">
                <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-5">Upcoming Deadlines</h3>
                <div className="space-y-3">
                  {DEADLINES.map(({ name, days, level }) => (
                    <div key={name} className="flex items-center gap-4 p-3 bg-white/[0.02] rounded-xl border border-white/[0.05]">
                      <div className={cn('text-2xl font-extrabold tabular-nums min-w-[42px] text-center', level === 'urgent' ? 'text-brand-red' : level === 'soon' ? 'text-amber-400' : 'text-emerald-400')}>
                        {days}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white leading-tight">{name}</div>
                        <div className="text-[10px] text-white/30 mt-0.5">days remaining</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab !== 'Overview' && (
          <div className="glass-card rounded-2xl p-10 border border-white/[0.07] text-center">
            <div className="text-4xl mb-4">🚧</div>
            <h3 className="text-xl font-bold mb-2">{activeTab} — Coming Soon</h3>
            <p className="text-white/40 text-sm">This section is under development. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  )
}
