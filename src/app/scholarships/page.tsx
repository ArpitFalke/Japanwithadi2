import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScholarshipsPage } from '@/components/scholarship/ScholarshipsPage'

export const metadata: Metadata = {
  title: 'Japan Scholarships — Search 500+ MEXT, JASSO, KOSEN Programs',
  description: 'Search and filter 500+ Japan scholarships including MEXT, JASSO, KOSEN, and university grants. AI-powered matching for international students.',
}

export default function Page() {
  return (
    <>
      <Navbar />
      <ScholarshipsPage />
      <Footer />
    </>
  )
}
