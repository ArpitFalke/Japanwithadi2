'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GraduationCap, Users, MessageSquare, TrendingUp, Upload, Plus, Edit, Eye, Trash2, CheckCircle, AlertCircle } from 'lucide-react'

const STATS = [
  { label: 'Total Scholarships', value: '547', trend: '+12 this month', icon: GraduationCap, color: 'text-brand-red' },
  { label: 'Registered Students', value: '85,231', trend: '+1,420 this week', icon: Users, color: 'text-blue-400' },
  { label: 'AI Chat Sessions', value: '24,891', trend: '+340 today', icon: MessageSquare, color: 'text-purple-400' },
  { label: 'Applications Tracked', value: '12,847', trend: '+180 today', icon: TrendingUp, color: 'text-emerald-400' },
]

const RECENT_SCHOLARSHIPS = [
  { name: 'MEXT Embassy Scholarship 2025', category: 'mext', status: 'active', deadline: 'May 31, 2025', views: 12840 },
  { name: 'JASSO Student Exchange Support', category: 'jasso', status: 'active', deadline: 'Jun 30, 2025', views: 8921 },
  { name: 'UTokyo Global Leaders Program', category: 'university', status: 'active', deadline: 'Jul 1, 2025', views: 5430 },
  { name: 'Sony Foundation Scholarship', category: 'foundation', status: 'draft', deadline: 'Sep 1, 2025', views: 0 },
  { name: 'KOSEN International Exchange', category: 'kosen', status: 'active', deadline: 'Mar 15, 2025', views: 3210 },
]

const RECENT_USERS = [
  { name: 'Rahul Sharma', country: '🇮🇳 India', joined: '2 min ago', scholarships: 3 },
  { name: 'Fatima Hassan', country: '🇳🇬 Nigeria', joined: '15 min ago', scholarships: 1 },
  { name: 'Carlos Mendez', country: '🇧🇷 Brazil', joined: '1 hr ago', scholarships: 4 },
  { name: 'Amara Diallo', country: '🇸🇳 Senegal', joined: '2 hr ago', scholarships: 2 },
]

const CATEGORY_COLORS: Record<string, string> = {
  mext: 'text-red-400 bg-red-400/10 border-red-400/20',
  jasso: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  university: 'text-green-400 bg-green-400/10 border-green-400/20',
  foundation: 'text-pink-400 bg-pink-400/10 border-pink-400/20',
  kosen: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
}

export function AdminOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1">Platform Overview</h1>
          <p className="text-sm text-white/40">Japan With Adi · Real-time dashboard</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/pdf-parser" className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-white/[0.08] rounded-xl text-white/50 hover:text-white hover:border-white/20 transition-all">
            <Upload className="w-4 h-4" /> Import PDF
          </Link>
          <Link href="/admin/scholarships/new" className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-brand-red text-white rounded-xl shadow-[0_0_20px_rgba(255,0,47,0.3)] hover:shadow-[0_0_30px_rgba(255,0,47,0.5)] transition-all">
            <Plus className="w-4 h-4" /> Add Scholarship
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="glass-card rounded-2xl p-5 border border-white/[0.07]">
            <s.icon className={`w-5 h-5 mb-3 ${s.color}`} />
            <div className={`text-3xl font-extrabold mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-xs font-semibold text-white mb-1">{s.label}</div>
            <div className="text-[11px] text-emerald-400">↑ {s.trend}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Add Scholarship', href: '/admin/scholarships/new', icon: Plus, color: 'bg-brand-red/15 border-brand-red/25 text-brand-red' },
          { label: 'Parse PDF', href: '/admin/pdf-parser', icon: Upload, color: 'bg-purple-500/10 border-purple-500/20 text-purple-400' },
          { label: 'Write Blog', href: '/admin/blog/new', icon: Edit, color: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
          { label: 'View Analytics', href: '/admin/analytics', icon: TrendingUp, color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' },
        ].map(({ label, href, icon: Icon, color }) => (
          <Link key={label} href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold transition-all hover:-translate-y-0.5 ${color}`}>
            <Icon className="w-4 h-4" />{label}
          </Link>
        ))}
      </div>

      {/* Tables */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Scholarships */}
        <div className="glass-card rounded-2xl border border-white/[0.07] overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h3 className="text-sm font-bold">Recent Scholarships</h3>
            <Link href="/admin/scholarships" className="text-xs text-brand-red hover:text-red-400">View all →</Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {RECENT_SCHOLARSHIPS.map((s) => (
              <div key={s.name} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors group">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{s.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[s.category] || 'text-white/40 bg-white/5 border-white/10'}`}>{s.category}</span>
                    <span className="text-[11px] text-white/30">· {s.deadline}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-white/30 font-mono">{s.views.toLocaleString()}</span>
                  {s.status === 'active'
                    ? <CheckCircle className="w-4 h-4 text-emerald-400" />
                    : <AlertCircle className="w-4 h-4 text-amber-400" />}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-6 h-6 rounded-lg bg-white/[0.05] flex items-center justify-center text-white/40 hover:text-white"><Eye className="w-3 h-3" /></button>
                    <button className="w-6 h-6 rounded-lg bg-white/[0.05] flex items-center justify-center text-white/40 hover:text-white"><Edit className="w-3 h-3" /></button>
                    <button className="w-6 h-6 rounded-lg bg-white/[0.05] flex items-center justify-center text-white/40 hover:text-red-400"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="glass-card rounded-2xl border border-white/[0.07] overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h3 className="text-sm font-bold">Recent Registrations</h3>
            <Link href="/admin/users" className="text-xs text-brand-red hover:text-red-400">View all →</Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {RECENT_USERS.map((u) => (
              <div key={u.name} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                <div className="w-9 h-9 rounded-full bg-brand-red/15 border border-brand-red/25 flex items-center justify-center text-sm font-bold text-brand-red flex-shrink-0">
                  {u.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white">{u.name}</div>
                  <div className="text-xs text-white/35">{u.country} · joined {u.joined}</div>
                </div>
                <div className="text-xs text-white/30 font-mono flex-shrink-0">{u.scholarships} saved</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
