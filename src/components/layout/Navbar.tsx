'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bell, Menu, X, ChevronDown, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/scholarships', label: 'Scholarships' },
  { href: '/ai', label: 'Adi Sensei AI' },
  { href: '/blog', label: 'Blog' },
  { href: '/webinars', label: 'Webinars' },
  { href: '/community', label: 'Community' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-brand-black/90 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 bg-brand-red rounded-lg flex items-center justify-center font-black text-sm shadow-[0_0_20px_rgba(255,0,47,0.4)] group-hover:shadow-[0_0_30px_rgba(255,0,47,0.6)] transition-shadow">
            A
            <span className="absolute inset-[-3px] rounded-[11px] border border-brand-red/30 animate-pulse" />
          </div>
          <span className="font-bold text-[15px] tracking-wide">
            Japan With <span className="text-brand-red">Adi</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'text-white bg-white/5'
                  : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
              )}
            >
              {link.label === 'Adi Sensei AI' ? (
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-red" />
                  {link.label}
                </span>
              ) : (
                link.label
              )}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/scholarships"
            className="hidden md:flex items-center gap-2 text-white/40 hover:text-white transition-colors"
          >
            <Search className="w-4 h-4" />
          </Link>

          <button className="hidden md:flex relative items-center gap-2 text-white/40 hover:text-white transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-brand-red rounded-full shadow-[0_0_6px_rgba(255,0,47,0.8)]" />
          </button>

          <Link
            href="/auth/login"
            className="hidden md:block px-4 py-2 text-sm font-semibold text-white/50 hover:text-white border border-white/[0.08] hover:border-white/20 rounded-lg transition-all"
          >
            Sign In
          </Link>

          <Link
            href="/auth/register"
            className="hidden md:block px-4 py-2 text-sm font-semibold text-white bg-brand-red rounded-lg shadow-[0_0_20px_rgba(255,0,47,0.35)] hover:shadow-[0_0_30px_rgba(255,0,47,0.5)] hover:-translate-y-0.5 transition-all"
          >
            Get Started
          </Link>

          <button
            className="lg:hidden text-white/60 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-black/95 border-b border-white/[0.06] backdrop-blur-xl"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-white bg-white/5'
                      : 'text-white/50 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 mt-3 pt-3 border-t border-white/[0.06]">
                <Link href="/auth/login" className="flex-1 py-2.5 text-sm font-semibold text-center text-white/60 border border-white/[0.08] rounded-lg">Sign In</Link>
                <Link href="/auth/register" className="flex-1 py-2.5 text-sm font-semibold text-center text-white bg-brand-red rounded-lg">Get Started</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
