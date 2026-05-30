'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, Save, Trash2, Eye, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExtractedData {
  scholarship_name: string
  provider: string
  category: string
  funding_type: string
  stipend: string
  stipend_amount: number
  tuition_covered: boolean
  age_limit_min: number | null
  age_limit_max: number | null
  eligibility: string
  nationality: string[] | string
  japanese_requirement: string
  application_deadline: string
  exam_subjects: string[]
  interview_required: boolean
  duration: string
  field_of_study: string[]
  application_route: string
  official_link: string
  description: string
  benefits: string[]
  documents_required: string[]
  level: string[]
}

type Step = 'idle' | 'uploading' | 'extracting' | 'review' | 'saving' | 'saved' | 'error'

export function AdminPdfParser() {
  const [step, setStep] = useState<Step>('idle')
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [extracted, setExtracted] = useState<Partial<ExtractedData> | null>(null)
  const [edited, setEdited] = useState<Partial<ExtractedData> | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback(async (f: File) => {
    if (!f.type.includes('pdf')) {
      setErrorMsg('Only PDF files are supported.')
      setStep('error')
      return
    }
    setFile(f)
    setStep('uploading')

    await new Promise(r => setTimeout(r, 800))
    setStep('extracting')

    // Simulate AI extraction (replace with real fetch in production)
    await new Promise(r => setTimeout(r, 2200))

    const mock: ExtractedData = {
      scholarship_name: 'JASSO Student Exchange Support Program 2025',
      provider: 'Japan Student Services Organization (JASSO)',
      category: 'jasso',
      funding_type: 'partial',
      stipend: '¥80,000/month',
      stipend_amount: 80000,
      tuition_covered: false,
      age_limit_min: null,
      age_limit_max: 29,
      eligibility: 'Students enrolled at JASSO partner universities. GPA 2.8+ recommended. Currently studying Japanese language or enrolled in Japanese Studies.',
      nationality: 'all',
      japanese_requirement: 'none',
      application_deadline: '2025-06-30',
      exam_subjects: [],
      interview_required: false,
      duration: '6–12 months',
      field_of_study: ['All Fields'],
      application_route: 'university',
      official_link: 'https://www.jasso.or.jp',
      description: 'The JASSO Student Exchange Support Program provides monthly stipends to exchange students at Japanese partner universities. Students apply through their home institution.',
      benefits: ['¥80,000 monthly stipend', 'Travel allowance (one-time)', 'Accident and sickness insurance support'],
      documents_required: ['Application form', 'Academic transcript', 'Enrollment certificate', 'Recommendation letter', 'Study plan'],
      level: ['undergraduate', 'masters'],
    }

    setExtracted(mock)
    setEdited(mock)
    setStep('review')
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) processFile(f)
  }, [processFile])

  const handleSave = async () => {
    setStep('saving')
    await new Promise(r => setTimeout(r, 1200))
    setStep('saved')
  }

  const reset = () => { setStep('idle'); setFile(null); setExtracted(null); setEdited(null); setErrorMsg('') }

  const updateField = (key: keyof ExtractedData, value: string) => {
    setEdited(prev => prev ? { ...prev, [key]: value } : prev)
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-1">AI PDF Parser</h1>
        <p className="text-sm text-white/40">Upload scholarship PDFs — Claude AI auto-extracts all structured data</p>
      </div>

      {/* How it works */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { num: '01', title: 'Upload PDF', desc: 'Drag & drop any scholarship PDF — official notices, brochures, announcements' },
          { num: '02', title: 'AI Extracts', desc: 'Claude AI reads the document and extracts all scholarship fields automatically' },
          { num: '03', title: 'Review & Save', desc: 'Verify the extracted data, make edits, then save to the live scholarship database' },
        ].map(s => (
          <div key={s.num} className="glass-card rounded-xl p-5 border border-white/[0.07]">
            <div className="text-2xl font-black text-brand-red/30 font-mono mb-3">{s.num}</div>
            <div className="text-sm font-bold mb-1.5">{s.title}</div>
            <div className="text-xs text-white/35 leading-relaxed">{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Drop zone */}
      <AnimatePresence mode="wait">
        {step === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={cn(
                'border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all',
                dragging ? 'border-brand-red bg-brand-red/[0.07] scale-[1.01]' : 'border-white/[0.1] hover:border-brand-red/40 hover:bg-white/[0.02]'
              )}
            >
              <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all', dragging ? 'bg-brand-red/20 scale-110' : 'bg-white/[0.04]')}>
                <Upload className={cn('w-8 h-8 transition-colors', dragging ? 'text-brand-red' : 'text-white/30')} />
              </div>
              <h3 className="text-lg font-bold mb-2">{dragging ? 'Drop it here!' : 'Drop a Scholarship PDF'}</h3>
              <p className="text-sm text-white/35 mb-5">or click to browse · PDF files only · max 10MB</p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red text-white text-sm font-semibold rounded-xl shadow-[0_0_20px_rgba(255,0,47,0.3)]">
                <Sparkles className="w-4 h-4" /> Select PDF File
              </div>
            </div>
            <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={e => e.target.files?.[0] && processFile(e.target.files[0])} />
          </motion.div>
        )}

        {(step === 'uploading' || step === 'extracting') && (
          <motion.div key="loading" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="glass-card rounded-2xl p-14 border border-white/[0.07] text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="w-20 h-20 rounded-full border-2 border-brand-red/20 border-t-brand-red animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-brand-red animate-pulse" />
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2">
              {step === 'uploading' ? 'Uploading PDF...' : 'Claude AI Extracting Data...'}
            </h3>
            <p className="text-sm text-white/40">
              {step === 'uploading' ? `Processing ${file?.name}` : 'Reading scholarship fields, stipend, deadlines, eligibility...'}
            </p>
            {step === 'extracting' && (
              <div className="mt-6 space-y-2 max-w-xs mx-auto">
                {['Scholarship name & provider', 'Stipend & funding type', 'Deadlines & eligibility', 'Application requirements'].map((item, i) => (
                  <motion.div key={item} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.4 }}
                    className="flex items-center gap-2 text-xs text-white/40 justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    {item}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {step === 'review' && edited && (
          <motion.div key="review" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            {/* Status bar */}
            <div className="flex items-center gap-3 px-5 py-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-white">AI Extraction Successful</div>
                <div className="text-xs text-white/40">Extracted from <span className="text-white/60">{file?.name}</span> · Review all fields before saving</div>
              </div>
              <div className="ml-auto flex gap-2">
                <button onClick={reset} className="text-xs text-white/40 hover:text-white border border-white/[0.08] rounded-lg px-3 py-1.5 transition-colors">
                  Parse Another
                </button>
              </div>
            </div>

            {/* Extracted fields */}
            <div className="glass-card rounded-2xl border border-white/[0.07] overflow-hidden">
              <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
                <h3 className="text-sm font-bold flex items-center gap-2"><Eye className="w-4 h-4 text-brand-red" />Extracted Data — Review & Edit</h3>
                <span className="text-xs text-white/30 font-mono">All fields editable</span>
              </div>

              <div className="p-6 grid md:grid-cols-2 gap-5">
                {([
                  ['Scholarship Name', 'scholarship_name', 'text'],
                  ['Provider / Organization', 'provider', 'text'],
                  ['Stipend', 'stipend', 'text'],
                  ['Application Deadline', 'application_deadline', 'text'],
                  ['Duration', 'duration', 'text'],
                  ['Application Route', 'application_route', 'text'],
                  ['Official Link', 'official_link', 'text'],
                  ['Japanese Requirement', 'japanese_requirement', 'text'],
                ] as [string, keyof ExtractedData, string][]).map(([label, key, type]) => (
                  <div key={key}>
                    <label className="block text-xs text-white/35 uppercase tracking-wider mb-1.5">{label}</label>
                    <input
                      type={type}
                      value={String(edited[key] ?? '')}
                      onChange={e => updateField(key, e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-brand-red/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors"
                    />
                  </div>
                ))}

                <div className="md:col-span-2">
                  <label className="block text-xs text-white/35 uppercase tracking-wider mb-1.5">Description</label>
                  <textarea
                    value={edited.description ?? ''}
                    onChange={e => updateField('description', e.target.value)}
                    rows={3}
                    className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-brand-red/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs text-white/35 uppercase tracking-wider mb-1.5">Eligibility</label>
                  <textarea
                    value={edited.eligibility ?? ''}
                    onChange={e => updateField('eligibility', e.target.value)}
                    rows={2}
                    className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-brand-red/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors resize-none"
                  />
                </div>

                {/* Category and funding selects */}
                <div>
                  <label className="block text-xs text-white/35 uppercase tracking-wider mb-1.5">Category</label>
                  <select value={edited.category ?? ''} onChange={e => updateField('category', e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-brand-red/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none appearance-none">
                    {['mext','jasso','kosen','stc','university','foundation','exchange','language'].map(c => (
                      <option key={c} value={c} className="bg-[#111]">{c.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/35 uppercase tracking-wider mb-1.5">Funding Type</label>
                  <select value={edited.funding_type ?? ''} onChange={e => updateField('funding_type', e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-brand-red/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none appearance-none">
                    {['fully_funded','partial','tuition_only','stipend_only'].map(f => (
                      <option key={f} value={f} className="bg-[#111]">{f.replace(/_/g,' ')}</option>
                    ))}
                  </select>
                </div>

                {/* Array fields */}
                {(['benefits', 'documents_required'] as (keyof ExtractedData)[]).map(key => (
                  <div key={String(key)} className="md:col-span-2">
                    <label className="block text-xs text-white/35 uppercase tracking-wider mb-1.5">
                      {String(key).replace(/_/g, ' ')} (one per line)
                    </label>
                    <textarea
                      value={Array.isArray(edited[key]) ? (edited[key] as string[]).join('\n') : ''}
                      onChange={e => setEdited(prev => prev ? { ...prev, [key]: e.target.value.split('\n').filter(Boolean) } : prev)}
                      rows={3}
                      className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-brand-red/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors resize-none font-mono text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button onClick={handleSave}
                className="flex items-center gap-2 px-7 py-3 bg-brand-red text-white text-sm font-bold rounded-xl shadow-[0_0_20px_rgba(255,0,47,0.35)] hover:shadow-[0_0_35px_rgba(255,0,47,0.5)] transition-all">
                <Save className="w-4 h-4" /> Save to Database
              </button>
              <button className="flex items-center gap-2 px-5 py-3 border border-white/[0.09] text-white/50 text-sm font-medium rounded-xl hover:text-white hover:border-white/20 transition-all">
                Save as Draft
              </button>
              <button onClick={reset}
                className="flex items-center gap-2 px-5 py-3 border border-white/[0.09] text-white/50 text-sm font-medium rounded-xl hover:text-red-400 hover:border-red-400/20 transition-all ml-auto">
                <Trash2 className="w-4 h-4" /> Discard
              </button>
            </div>
          </motion.div>
        )}

        {step === 'saving' && (
          <motion.div key="saving" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="glass-card rounded-2xl p-14 border border-white/[0.07] text-center">
            <Loader2 className="w-12 h-12 text-brand-red animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-bold">Saving to Database...</h3>
          </motion.div>
        )}

        {step === 'saved' && (
          <motion.div key="saved" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-14 border border-emerald-500/20 bg-emerald-500/[0.04] text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-5" />
            <h3 className="text-2xl font-extrabold mb-2">Scholarship Saved!</h3>
            <p className="text-white/40 mb-8">Successfully added to the database as a draft. Activate it from Scholarships manager.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={reset} className="px-6 py-3 bg-brand-red text-white text-sm font-bold rounded-xl shadow-[0_0_20px_rgba(255,0,47,0.3)]">
                Parse Another PDF
              </button>
            </div>
          </motion.div>
        )}

        {step === 'error' && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="glass-card rounded-2xl p-14 border border-red-500/20 bg-red-500/[0.04] text-center">
            <AlertCircle className="w-14 h-14 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Extraction Failed</h3>
            <p className="text-white/40 mb-6">{errorMsg || 'Something went wrong. Please try again.'}</p>
            <button onClick={reset} className="px-6 py-3 bg-brand-red text-white text-sm font-bold rounded-xl">Try Again</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
