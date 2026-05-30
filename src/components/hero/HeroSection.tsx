'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Play } from 'lucide-react'

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number; y: number; vx: number; vy: number
      size: number; opacity: number; color: string
    }> = []

    const colors = ['rgba(255,0,47,', 'rgba(255,80,80,', 'rgba(200,0,30,']

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + p.opacity + ')'
        ctx.fill()
      })

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255,0,47,${0.04 * (1 - dist / 100)})`
            ctx.stroke()
          }
        })
      })

      animId = requestAnimationFrame(animate)
    }
    animate()

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-brand-red/[0.07] blur-[120px] animate-float" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-brand-red/[0.04] blur-[100px] animate-float [animation-delay:-3s]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-black/80" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {mounted && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/[0.04] border border-brand-red/30 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-blink shadow-[0_0_6px_#ff002f]" />
              <span className="text-xs font-mono text-white/50 tracking-[2px] uppercase">
                AI-Powered Japan Scholarship Intelligence
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-jp text-sm text-white/25 tracking-[6px] mb-4"
            >
              日本留学奨学金プラットフォーム
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-5xl md:text-7xl lg:text-[88px] font-extrabold leading-[1.03] tracking-[-3px] mb-6"
            >
              Your Gateway To
              <br />
              <span className="text-brand-red" style={{ textShadow: '0 0 60px rgba(255,0,47,0.4)' }}>
                Study In Japan
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg text-white/45 leading-relaxed max-w-2xl mx-auto mb-10"
            >
              Discover MEXT, JASSO, KOSEN and 500+ scholarships. Let Adi Sensei AI build your
              personalized roadmap to Japan — from eligibility check to acceptance letter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link
                href="/scholarships"
                className="group flex items-center gap-2.5 px-8 py-4 bg-brand-red text-white font-bold text-[15px] rounded-xl shadow-[0_0_30px_rgba(255,0,47,0.4)] hover:shadow-[0_0_50px_rgba(255,0,47,0.6)] hover:-translate-y-0.5 transition-all"
              >
                Explore Scholarships
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/ai"
                className="flex items-center gap-2.5 px-8 py-4 bg-white/[0.04] text-white font-semibold text-[15px] rounded-xl border border-white/[0.09] hover:border-brand-red/40 hover:bg-white/[0.07] hover:-translate-y-0.5 transition-all"
              >
                <Sparkles className="w-4 h-4 text-brand-red" />
                Chat with Adi Sensei
              </Link>
              <button className="flex items-center gap-2 text-white/40 hover:text-white text-sm font-medium transition-colors">
                <div className="w-9 h-9 rounded-full border border-white/[0.1] flex items-center justify-center hover:border-brand-red/40 transition-colors">
                  <Play className="w-3.5 h-3.5 ml-0.5" />
                </div>
                Watch Demo
              </button>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap items-center justify-center gap-8 md:gap-14"
            >
              {[
                { num: '500+', label: 'Scholarships' },
                { num: '85K', label: 'Students Helped' },
                { num: '98%', label: 'Success Rate' },
                { num: '150+', label: 'Universities' },
                { num: '160+', label: 'Countries' },
              ].map(({ num, label }) => (
                <div key={label} className="text-center">
                  <div className="text-3xl font-extrabold tabular-nums">
                    {num.replace(/[^0-9]/g, '') && (
                      <span className="text-brand-red">{num.replace(/[0-9]+/, '')}</span>
                    )}
                    {num}
                  </div>
                  <div className="text-xs text-white/30 uppercase tracking-[1.5px] mt-1">{label}</div>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
        <span className="text-[10px] uppercase tracking-[3px] font-mono">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
