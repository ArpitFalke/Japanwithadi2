'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'

const features = [
  'Personalized scholarship matching by profile',
  'MEXT, JASSO, KOSEN eligibility analysis',
  'Step-by-step application roadmaps',
  'SOP writing & interview preparation',
  'University recommendation engine',
  'Real-time deadline tracking & alerts',
]

const chatDemo = [
  { role: 'user', text: "I'm from India, studying engineering. Can I apply for MEXT?" },
  { role: 'ai', text: "Great profile! 🎌 As an Indian engineering student, you're eligible for MEXT Embassy 2025. Your estimated match score is 87%. The deadline is May 31st — that's 12 days away. Want me to generate your complete roadmap?" },
  { role: 'user', text: 'Yes! What exams do I need to prepare?' },
  { role: 'ai', text: "For MEXT Embassy you need: Math, Physics/Chemistry, English, and optionally Japanese. I'd recommend starting with past papers from mext.go.jp. Shall I create a 30-day study plan? 📚" },
]

export function AiSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-red/[0.04] rounded-full blur-[100px]" />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="eyebrow mb-5">AI Scholarship Advisor</div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-5">
              Meet <span className="text-brand-red">Adi Sensei</span>
              <br />
              Your AI Guide to Japan
            </h2>
            <p className="text-white/45 leading-relaxed mb-8">
              Powered by Claude AI, Adi Sensei is trained on thousands of scholarship records, success stories,
              and official MEXT/JASSO guidelines. Get instant, personalized guidance — anytime, anywhere.
            </p>
            <ul className="space-y-3 mb-10">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-white/60">
                  <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/ai"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-brand-red text-white font-bold rounded-xl shadow-[0_0_25px_rgba(255,0,47,0.4)] hover:shadow-[0_0_40px_rgba(255,0,47,0.6)] hover:-translate-y-0.5 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Start Chatting Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right - Chat demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-card rounded-3xl overflow-hidden border border-white/[0.07]"
          >
            {/* Chat header */}
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-red/90 to-red-900/60 flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(255,0,47,0.4)] animate-orb-pulse">
                  A
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-brand-black shadow-[0_0_6px_#34d399]" />
              </div>
              <div>
                <div className="text-sm font-bold">Adi Sensei</div>
                <div className="text-xs text-white/35 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Online · Powered by Claude AI
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-5 space-y-4 min-h-[280px]">
              {chatDemo.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.2 }}
                  className={`flex gap-2.5 items-start ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${msg.role === 'ai' ? 'bg-brand-red shadow-[0_0_10px_rgba(255,0,47,0.4)]' : 'bg-white/10'}`}>
                    {msg.role === 'ai' ? 'A' : 'U'}
                  </div>
                  <div className={`text-sm leading-relaxed px-4 py-2.5 max-w-[80%] ${msg.role === 'ai' ? 'chat-bubble-ai' : 'chat-bubble-user'}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="px-5 pb-5">
              <div className="flex gap-2 bg-white/[0.03] border border-white/[0.07] rounded-xl p-2 pl-4">
                <span className="flex-1 text-sm text-white/25">Ask about any Japan scholarship...</span>
                <Link href="/ai" className="px-4 py-2 bg-brand-red text-white text-xs font-bold rounded-lg shadow-[0_0_10px_rgba(255,0,47,0.3)]">
                  Ask →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
