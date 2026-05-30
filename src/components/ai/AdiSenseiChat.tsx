'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, RefreshCw, Copy, ThumbsUp, ThumbsDown, BookOpen, Map, FileText, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  streaming?: boolean
}

const QUICK_PROMPTS = [
  { icon: '🎌', text: 'How do I apply for MEXT 2025?', label: 'MEXT Guide' },
  { icon: '📋', text: 'What documents do I need for MEXT Embassy route?', label: 'Documents' },
  { icon: '📚', text: 'Create a 30-day MEXT exam study plan for me', label: 'Study Plan' },
  { icon: '🏫', text: 'Best Japanese universities for engineering PhDs?', label: 'Universities' },
  { icon: '🗣️', text: 'How do I prepare for the MEXT interview?', label: 'Interview Prep' },
  { icon: '✍️', text: 'Help me write my MEXT study plan / SOP', label: 'SOP Help' },
  { icon: '🔍', text: 'What scholarships require no Japanese language?', label: 'No Japanese' },
  { icon: '⚙️', text: 'Tell me about KOSEN exchange programs', label: 'KOSEN Info' },
]

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: `こんにちは！ I'm **Adi Sensei** 🎌 — your AI guide to studying in Japan!

I'm trained on thousands of Japanese scholarship records, MEXT/JASSO guidelines, and student success stories. I can help you:

- 🎯 Find scholarships that match **your exact profile**
- 📋 Check your **eligibility** for MEXT, JASSO, KOSEN
- 🗺️ Build a **step-by-step application roadmap**
- 📝 Write your **SOP and personal statement**
- 🎤 Prepare for your **embassy interview**
- 🏫 Choose the **right Japanese university**

Tell me about yourself — your country, education level, field of study — and I'll find your perfect Japan scholarship! What's your dream?`,
  timestamp: new Date(),
}

export function AdiSenseiChat() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({ nationality: '', education: '', japanese: '', field: '' })
  const [showProfile, setShowProfile] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = useCallback(async (text?: string) => {
    const content = text || input.trim()
    if (!content || loading) return
    setInput('')

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content, timestamp: new Date() }
    const assistantId = (Date.now() + 1).toString()
    const assistantMsg: Message = { id: assistantId, role: 'assistant', content: '', timestamp: new Date(), streaming: true }

    setMessages(prev => [...prev, userMsg, assistantMsg])
    setLoading(true)

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].filter(m => m.id !== 'welcome').map(m => ({ role: m.role, content: m.content })),
          userProfile: profile,
        }),
      })

      if (!res.ok || !res.body) throw new Error('Stream failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: accumulated } : m))
      }

      setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, streaming: false } : m))
    } catch {
      setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: 'Sorry, I encountered an error. Please try again.', streaming: false } : m))
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages, profile])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => setMessages([WELCOME_MESSAGE])

  return (
    <main className="pt-[68px] h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="hidden lg:flex w-[280px] flex-col border-r border-white/[0.06] bg-brand-black/50 backdrop-blur-xl">
          {/* Orb */}
          <div className="p-6 border-b border-white/[0.06]">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-red/90 via-red-700/70 to-red-950/50 flex items-center justify-center text-2xl font-black shadow-[0_0_40px_rgba(255,0,47,0.5)] animate-orb-pulse">A</div>
                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-brand-black shadow-[0_0_8px_#34d399]" />
                <div className="absolute inset-[-6px] rounded-full border border-brand-red/20 animate-ping opacity-30" />
              </div>
              <h2 className="font-bold text-base">Adi Sensei</h2>
              <p className="text-xs text-white/35 mt-1">AI Japan Scholarship Advisor</p>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Online · Powered by Claude AI
              </div>
            </div>
          </div>

          {/* Profile */}
          <div className="p-4 border-b border-white/[0.06]">
            <button onClick={() => setShowProfile(!showProfile)} className="w-full flex items-center justify-between text-xs text-white/40 hover:text-white mb-2 transition-colors">
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />My Profile (helps AI)</span>
              <span>{showProfile ? '▲' : '▼'}</span>
            </button>
            <AnimatePresence>
              {showProfile && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-2">
                  {[
                    { key: 'nationality', placeholder: 'Country (e.g. India)' },
                    { key: 'education', placeholder: 'Level (e.g. Undergraduate)' },
                    { key: 'japanese', placeholder: 'Japanese (e.g. None / N5)' },
                    { key: 'field', placeholder: 'Field (e.g. Engineering)' },
                  ].map(({ key, placeholder }) => (
                    <input
                      key={key}
                      value={profile[key as keyof typeof profile]}
                      onChange={e => setProfile(prev => ({ ...prev, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full text-xs bg-white/[0.04] border border-white/[0.07] rounded-lg px-3 py-2 text-white/70 placeholder:text-white/20 outline-none focus:border-brand-red/40"
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick prompts */}
          <div className="flex-1 overflow-y-auto p-4">
            <p className="text-[10px] text-white/25 uppercase tracking-[2px] mb-3">Quick Ask</p>
            <div className="space-y-1.5">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => sendMessage(p.text)}
                  className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs text-white/50 hover:text-white hover:bg-white/[0.05] transition-all border border-transparent hover:border-white/[0.07]"
                >
                  <span>{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-white/[0.06]">
            <button onClick={clearChat} className="w-full flex items-center justify-center gap-2 py-2.5 text-xs text-white/30 hover:text-white border border-white/[0.07] hover:border-white/20 rounded-xl transition-all">
              <RefreshCw className="w-3.5 h-3.5" />
              New Conversation
            </button>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn('flex gap-3 max-w-4xl', msg.role === 'user' ? 'ml-auto flex-row-reverse' : '')}
              >
                {/* Avatar */}
                <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1', msg.role === 'assistant' ? 'bg-brand-red shadow-[0_0_12px_rgba(255,0,47,0.4)]' : 'bg-white/10')}>
                  {msg.role === 'assistant' ? 'A' : 'U'}
                </div>

                {/* Bubble */}
                <div className={cn('rounded-2xl px-5 py-4 text-sm leading-relaxed max-w-[85%]', msg.role === 'assistant' ? 'chat-bubble-ai' : 'chat-bubble-user')}>
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-invert prose-sm max-w-none prose-p:text-white/70 prose-headings:text-white prose-strong:text-white prose-li:text-white/65 prose-code:text-brand-red">
                      <ReactMarkdown>{msg.content || (msg.streaming ? '' : '...')}</ReactMarkdown>
                      {msg.streaming && (
                        <span className="inline-flex gap-1 ml-1">
                          {[0, 1, 2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/30 animate-typing" style={{ animationDelay: `${i * 0.2}s` }} />)}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-white/85">{msg.content}</span>
                  )}
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/[0.06] bg-brand-black/60 backdrop-blur-xl px-4 md:px-8 py-5">
            {/* Mobile quick prompts */}
            <div className="flex gap-2 overflow-x-auto pb-3 lg:hidden scrollbar-hide">
              {QUICK_PROMPTS.slice(0, 4).map(p => (
                <button key={p.label} onClick={() => sendMessage(p.text)} className="flex-shrink-0 text-[11px] text-white/50 border border-white/[0.08] rounded-full px-3 py-1.5 hover:border-brand-red/30 hover:text-white transition-all">
                  {p.icon} {p.label}
                </button>
              ))}
            </div>
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Adi Sensei about MEXT, JASSO, KOSEN, universities, SOP..."
                  rows={1}
                  className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-brand-red/50 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/25 outline-none resize-none transition-colors"
                  style={{ minHeight: '52px', maxHeight: '160px' }}
                />
              </div>
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,0,47,0.35)] hover:shadow-[0_0_30px_rgba(255,0,47,0.55)] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-white/15 mt-2 text-center">Adi Sensei is AI-powered and may make mistakes. Always verify with official scholarship sources.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
