'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, GitCompare, ExternalLink, Sparkles, CheckCircle2, Clock, BookOpen, FileText, Users, MapPin, Calendar } from 'lucide-react'
import { cn, getCategoryColor, getCategoryLabel, daysUntilDeadline } from '@/lib/utils'
import { useState } from 'react'

interface Props {
  scholarship: {
    id: string; slug: string; scholarship_name: string; provider: string;
    category: string; funding_type: string; stipend: string;
    application_deadline: string; level: string[]; field_of_study: string[];
    japanese_requirement: string; nationality: string; description: string;
    tuition_covered: boolean; interview_required: boolean; duration: string;
    age_limit_min: number; age_limit_max: number; application_route: string;
    official_link: string; exam_subjects: string[]; benefits: string[];
    documents_required: string[]; tags: string[];
  }
}

const roadmapSteps = [
  { num: '01', title: 'Get Application Form', desc: 'Contact your nearest Japanese Embassy (April). Download or collect the official MEXT application form.', month: 'April' },
  { num: '02', title: 'Submit Documents', desc: 'Gather transcripts, recommendations, medical certificate, and personal statement. Submit to Embassy by the deadline.', month: 'May' },
  { num: '03', title: 'Written Examination', desc: 'Take written tests in Math, Sciences, and English at the Embassy. Aim for 70%+ in each subject.', month: 'June' },
  { num: '04', title: 'Embassy Interview', desc: 'Shortlisted candidates attend a personal interview. Demonstrate academic motivation and interest in Japan.', month: 'Aug–Sep' },
  { num: '05', title: 'MEXT Final Selection', desc: 'Embassy nominates candidates to MEXT Tokyo. Final results announced and placement confirmed.', month: 'Nov–Jan' },
  { num: '06', title: 'Depart for Japan', desc: 'Begin 1-year Japanese language training at a preparatory school. University enrollment starts October.', month: 'April' },
]

export function ScholarshipDetail({ scholarship: s }: Props) {
  const [saved, setSaved] = useState(false)
  const days = daysUntilDeadline(s.application_deadline)

  return (
    <main className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Link href="/scholarships" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Scholarships
        </Link>

        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-8 border border-white/[0.07] mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-red/[0.06] rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
          <div className="relative z-10">
            <div className="flex flex-wrap items-start gap-3 mb-5">
              <span className={cn('text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border', getCategoryColor(s.category))}>
                {getCategoryLabel(s.category)}
              </span>
              {s.funding_type === 'fully_funded' && (
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-3 py-1.5">Fully Funded</span>
              )}
              <div className={cn('flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border', days <= 14 ? 'bg-brand-red/10 border-brand-red/30 text-red-400' : 'bg-white/[0.04] border-white/[0.07] text-white/40')}>
                <Clock className="w-3 h-3" />
                {days < 0 ? 'Applications Closed' : days === 0 ? 'Deadline Today!' : `${days} days remaining`}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 leading-tight">{s.scholarship_name}</h1>
            <p className="text-white/50 mb-8">{s.provider}</p>

            {/* Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Monthly Stipend', value: s.stipend, icon: '¥' },
                { label: 'Duration', value: s.duration.split(' ')[0] + ' ' + s.duration.split(' ')[1], icon: '📅' },
                { label: 'Tuition', value: s.tuition_covered ? 'Fully Covered' : 'Not covered', icon: '🎓' },
                { label: 'Route', value: s.application_route.charAt(0).toUpperCase() + s.application_route.slice(1), icon: '🗺️' },
              ].map((h) => (
                <div key={h.label} className="glass-card rounded-xl p-4 border border-white/[0.06] text-center">
                  <div className="text-2xl mb-1">{h.icon}</div>
                  <div className="text-base font-bold text-brand-red">{h.value}</div>
                  <div className="text-xs text-white/35 mt-0.5">{h.label}</div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSaved(!saved)}
                className={cn('flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all', saved ? 'bg-brand-red text-white border-brand-red shadow-[0_0_20px_rgba(255,0,47,0.35)]' : 'bg-white/[0.04] border-white/[0.08] text-white/60 hover:border-brand-red/40 hover:text-white')}
              >
                <Heart className={cn('w-4 h-4', saved && 'fill-current')} />
                {saved ? 'Saved' : 'Save Scholarship'}
              </button>
              <Link href="/ai" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-brand-red/30 text-brand-red hover:bg-brand-red/10 transition-colors">
                <Sparkles className="w-4 h-4" />
                Ask Adi Sensei
              </Link>
              <a href={s.official_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/[0.08] text-white/50 hover:text-white hover:border-white/20 transition-colors">
                <ExternalLink className="w-4 h-4" />
                Official Website
              </a>
            </div>
          </div>
        </motion.div>

        {/* Body */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Left */}
          <div className="space-y-6">
            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-7 border border-white/[0.07]">
              <h2 className="text-base font-bold text-brand-red mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4" />Overview</h2>
              <p className="text-sm text-white/55 leading-relaxed">{s.description}</p>
            </motion.div>

            {/* Benefits */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card rounded-2xl p-7 border border-white/[0.07]">
              <h2 className="text-base font-bold text-brand-red mb-5 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />Benefits & Coverage</h2>
              <ul className="space-y-3">
                {s.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red mt-2 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Exam subjects */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-7 border border-white/[0.07]">
              <h2 className="text-base font-bold text-brand-red mb-5 flex items-center gap-2"><FileText className="w-4 h-4" />Exam Subjects</h2>
              <div className="flex flex-wrap gap-2">
                {s.exam_subjects.map((sub) => (
                  <span key={sub} className="text-sm text-white/60 bg-white/[0.04] border border-white/[0.07] rounded-lg px-4 py-2">{sub}</span>
                ))}
              </div>
            </motion.div>

            {/* Documents */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card rounded-2xl p-7 border border-white/[0.07]">
              <h2 className="text-base font-bold text-brand-red mb-5 flex items-center gap-2"><FileText className="w-4 h-4" />Required Documents</h2>
              <ul className="space-y-2.5">
                {s.documents_required.map((doc, i) => (
                  <li key={doc} className="flex items-center gap-3 text-sm text-white/55">
                    <span className="w-5 h-5 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Roadmap */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-7 border border-white/[0.07]">
              <h2 className="text-base font-bold text-brand-red mb-7 flex items-center gap-2"><MapPin className="w-4 h-4" />Application Roadmap</h2>
              <div className="space-y-0">
                {roadmapSteps.map((step, i) => (
                  <div key={step.num} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-brand-red text-white text-xs font-black flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(255,0,47,0.4)] z-10">
                        {step.num}
                      </div>
                      {i < roadmapSteps.length - 1 && <div className="w-px flex-1 bg-brand-red/20 mt-1 mb-1 min-h-[32px]" />}
                    </div>
                    <div className="pb-8 pt-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <h4 className="text-sm font-bold text-white">{step.title}</h4>
                        <span className="text-[10px] text-brand-red/70 bg-brand-red/10 border border-brand-red/20 rounded px-2 py-0.5 font-mono">{step.month}</span>
                      </div>
                      <p className="text-xs text-white/45 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-5 border border-white/[0.07]">
              <h3 className="text-xs font-semibold text-white/30 uppercase tracking-[2px] mb-4">Quick Facts</h3>
              {[
                ['Level', s.level.map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(', ')],
                ['Age Limit', `${s.age_limit_min}–${s.age_limit_max} years`],
                ['Nationality', s.nationality === 'all' ? '160+ countries' : s.nationality],
                ['Japanese', s.japanese_requirement === 'none' ? 'Not required' : s.japanese_requirement.toUpperCase()],
                ['Interview', s.interview_required ? 'Required' : 'Not required'],
                ['Duration', s.duration],
                ['Route', s.application_route.charAt(0).toUpperCase() + s.application_route.slice(1)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-start py-2.5 border-b border-white/[0.05] last:border-0">
                  <span className="text-xs text-white/35">{label}</span>
                  <span className="text-xs font-semibold text-white text-right max-w-[55%]">{value}</span>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="glass-card rounded-2xl p-5 border border-white/[0.07]">
              <h3 className="text-xs font-semibold text-white/30 uppercase tracking-[2px] mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {s.tags.map(tag => (
                  <span key={tag} className="text-[11px] text-white/40 bg-white/[0.04] border border-white/[0.07] rounded-full px-2.5 py-1">{tag}</span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-5 border border-brand-red/20 bg-brand-red/[0.04]">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-brand-red" />
                <h3 className="text-sm font-bold text-white">Get AI Guidance</h3>
              </div>
              <p className="text-xs text-white/40 leading-relaxed mb-4">Ask Adi Sensei to check your eligibility, build a study plan, and review your SOP for this scholarship.</p>
              <Link href="/ai" className="block w-full py-2.5 text-center text-sm font-semibold text-white bg-brand-red rounded-xl shadow-[0_0_15px_rgba(255,0,47,0.3)] hover:shadow-[0_0_25px_rgba(255,0,47,0.5)] transition-shadow">
                Ask Adi Sensei →
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
