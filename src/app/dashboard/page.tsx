import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { DashboardClient } from '@/components/dashboard/DashboardClient'

export const metadata: Metadata = {
  title: 'Student Dashboard — Japan With Adi',
  description: 'Track your Japan scholarship applications, saved scholarships, AI match scores, and upcoming deadlines.',
}

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <DashboardClient />
    </>
  )
}
