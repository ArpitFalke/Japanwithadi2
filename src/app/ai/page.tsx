import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { AdiSenseiChat } from '@/components/ai/AdiSenseiChat'

export const metadata: Metadata = {
  title: 'Adi Sensei — AI Japan Scholarship Advisor',
  description: 'Chat with Adi Sensei, the AI-powered Japan scholarship advisor. Get personalized MEXT, JASSO, and KOSEN guidance, eligibility checks, and application roadmaps.',
}

export default function AiPage() {
  return (
    <>
      <Navbar />
      <AdiSenseiChat />
    </>
  )
}
