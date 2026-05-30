'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, GraduationCap, Users, FileText, Video, BarChart3, Upload, Settings, Bell, ChevronRight, LogOut, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/scholarships', label: 'Scholarships', icon: GraduationCap, badge: '547' },
  { href: '/admin/users', label: 'Users', icon: Users, badge: '85K' },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/webinars', label: 'Webinars', icon: Video },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/pdf-parser', label: 'PDF Parser', icon: Upload },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-brand-black overflow-hidden">
      {/* Sidebar */}
      <aside className={cn('flex flex-col border-r border-white/[0.06] bg-[#070707] transition-all duration-300 flex-shrink-0', collapsed ? 'w-[60px]' : 'w-[220px]')}>
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-4 border-b border-white/[0.06]">
          <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0 shadow-[0_0_15px_rgba(255,0,47,0.3)]">A</div>
          {!collapsed && <span className="font-bold text-sm">Admin Panel</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon, badge }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href}
                className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group', active ? 'bg-brand-red/15 text-white border border-brand-red/25' : 'text-white/40 hover:text-white hover:bg-white/[0.04]')}>
                <Icon className={cn('w-4 h-4 flex-shrink-0', active && 'text-brand-red')} />
                {!collapsed && (
                  <>
                    <span className="flex-1">{label}</span>
                    {badge && <span className="text-[10px] text-white/30 font-mono">{badge}</span>}
                  </>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/[0.06] space-y-1">
          <div className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl', collapsed ? 'justify-center' : '')}>
            <div className="w-7 h-7 rounded-full bg-brand-red/20 border border-brand-red/30 flex items-center justify-center text-xs font-bold text-brand-red flex-shrink-0">A</div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white truncate">Admin</div>
                <div className="text-[10px] text-white/30">Super Admin</div>
              </div>
            )}
          </div>
          <button onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs text-white/25 hover:text-white/50 transition-colors">
            <ChevronRight className={cn('w-3.5 h-3.5 transition-transform', collapsed && 'rotate-180')} />
            {!collapsed && 'Collapse'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/[0.06] bg-brand-black/80 backdrop-blur-xl flex-shrink-0">
          <div className="flex items-center gap-2 text-sm text-white/40">
            <Shield className="w-4 h-4 text-brand-red" />
            <span className="font-mono text-xs">ADMIN PORTAL</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/40 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-red rounded-full" />
            </button>
            <Link href="/" className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white border border-white/[0.07] rounded-xl px-3 py-2 transition-colors">
              <LogOut className="w-3.5 h-3.5" />
              Exit Admin
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
