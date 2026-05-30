import Link from 'next/link'
import { ExternalLink, Youtube, Twitter, Instagram } from 'lucide-react'

const footerLinks = {
  Scholarships: [
    { label: 'MEXT Scholarships', href: '/scholarships?category=mext' },
    { label: 'JASSO Scholarships', href: '/scholarships?category=jasso' },
    { label: 'KOSEN Programs', href: '/scholarships?category=kosen' },
    { label: 'University Grants', href: '/scholarships?category=university' },
    { label: 'Private Foundations', href: '/scholarships?category=foundation' },
    { label: 'Exchange Programs', href: '/scholarships?category=exchange' },
  ],
  Resources: [
    { label: 'MEXT Application Guide', href: '/blog/mext-guide' },
    { label: 'JLPT Preparation', href: '/blog/jlpt-guide' },
    { label: 'Japanese Visa Guide', href: '/blog/visa-guide' },
    { label: 'University Rankings', href: '/blog/universities' },
    { label: 'Interview Prep', href: '/blog/interview-prep' },
    { label: 'SOP Templates', href: '/blog/sop-guide' },
  ],
  Platform: [
    { label: 'Adi Sensei AI', href: '/ai' },
    { label: 'Student Dashboard', href: '/dashboard' },
    { label: 'Webinars', href: '/webinars' },
    { label: 'Community', href: '/community' },
    { label: 'Blog', href: '/blog' },
    { label: 'Success Stories', href: '/stories' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Sitemap', href: '/sitemap.xml' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-brand-black/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-brand-red rounded-lg flex items-center justify-center font-black text-sm shadow-[0_0_15px_rgba(255,0,47,0.3)]">A</div>
              <span className="font-bold text-[15px]">Japan With <span className="text-brand-red">Adi</span></span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-5">
              The world's most comprehensive Japan scholarship discovery platform. AI-powered. Student-first.
            </p>
            <p className="font-jp text-xs text-white/20 tracking-[3px]">日本留学奨学金</p>
            <div className="flex gap-3 mt-5">
              {[Youtube, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/40 hover:text-white hover:border-brand-red/40 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[2px] text-white/30 mb-4">{heading}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/25">
            © {new Date().getFullYear()} Japan With Adi. All rights reserved.
          </p>
          <p className="text-xs text-white/20 font-mono">
            Helping students reach Japan since 2024
          </p>
        </div>
      </div>
    </footer>
  )
}
