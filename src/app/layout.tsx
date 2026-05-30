import type { Metadata, Viewport } from 'next'
import { Syne, Space_Mono, Noto_Sans_JP } from 'next/font/google'
import '@/styles/globals.css'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  display: 'swap',
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-jp',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://japanwithadi.com'),
  title: {
    default: 'Japan With Adi — Your Gateway To Study In Japan',
    template: '%s | Japan With Adi',
  },
  description:
    'Discover MEXT, JASSO, KOSEN, and 500+ Japan scholarships. AI-powered scholarship recommendations, eligibility analysis, and complete application roadmaps for international students.',
  keywords: [
    'Japan scholarship',
    'MEXT scholarship',
    'JASSO scholarship',
    'study in Japan',
    'Japanese university',
    'KOSEN',
    'international student Japan',
    'Japan scholarship 2025',
    'fully funded Japan',
  ],
  authors: [{ name: 'Japan With Adi' }],
  creator: 'Japan With Adi',
  publisher: 'Japan With Adi',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Japan With Adi',
    title: 'Japan With Adi — Your Gateway To Study In Japan',
    description:
      'Discover 500+ Japan scholarships. AI-powered recommendations. Complete application roadmaps.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Japan With Adi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Japan With Adi — Your Gateway To Study In Japan',
    description: 'Discover 500+ Japan scholarships. AI-powered recommendations.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${spaceMono.variable} ${notoSansJP.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-brand-black text-brand-white font-sans antialiased">
        {children}
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#f5f5f5',
            },
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
