import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScholarshipDetail } from '@/components/scholarship/ScholarshipDetail'

const SCHOLARSHIPS: Record<string, {
  id: string; slug: string; scholarship_name: string; provider: string;
  category: string; funding_type: string; stipend: string; stipend_amount: number;
  application_deadline: string; level: string[]; field_of_study: string[];
  japanese_requirement: string; nationality: string; description: string;
  tuition_covered: boolean; interview_required: boolean; duration: string;
  age_limit_min: number; age_limit_max: number; application_route: string;
  official_link: string; exam_subjects: string[]; benefits: string[];
  documents_required: string[]; tags: string[];
}> = {
  'mext-embassy-2025': {
    id: '1', slug: 'mext-embassy-2025',
    scholarship_name: 'MEXT Embassy Scholarship 2025',
    provider: 'Ministry of Education, Culture, Sports, Science and Technology (MEXT)',
    category: 'mext', funding_type: 'fully_funded',
    stipend: '¥117,000/month', stipend_amount: 117000,
    application_deadline: '2025-05-31',
    level: ['undergraduate'],
    field_of_study: ['All Fields'],
    japanese_requirement: 'none',
    nationality: 'all',
    tuition_covered: true,
    interview_required: true,
    duration: '4–5 years (including 1-year Japanese language training)',
    age_limit_min: 17,
    age_limit_max: 24,
    application_route: 'embassy',
    official_link: 'https://www.mext.go.jp',
    exam_subjects: ['Mathematics', 'Physics / Chemistry / Biology', 'English', 'Japanese (optional)'],
    benefits: [
      'Full tuition fee waiver at any national Japanese university',
      '¥117,000 monthly stipend (undergraduate level)',
      'Round-trip economy class airfare Japan ↔ home country',
      '1 year Japanese language preparatory training',
      'No bond or service obligation after graduation',
      'Travel allowance for field research',
    ],
    documents_required: [
      'MEXT Application Form (from Embassy)',
      'Academic transcript (Grade 10, 11, 12)',
      'School graduation certificate / diploma',
      '2 academic recommendation letters',
      'Medical certificate (Embassy-specified format)',
      'Passport copy (valid 2+ years)',
      '6 recent passport-size photographs',
      'Personal statement (Study plan in Japan)',
    ],
    tags: ['MEXT', 'Fully Funded', 'Embassy Route', 'Government', 'Undergraduate'],
    description: 'The MEXT Embassy Scholarship is Japan\'s most prestigious government-funded scholarship for international undergraduate students. Administered through Japanese embassies worldwide, it covers full tuition, provides a generous monthly stipend, and includes round-trip airfare. Recipients undergo one year of Japanese language training before enrolling in their chosen university. This scholarship requires no repayment and has produced thousands of Japan\'s most influential international alumni.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const s = SCHOLARSHIPS[slug]
  if (!s) return { title: 'Scholarship Not Found' }
  return {
    title: `${s.scholarship_name} — Japan With Adi`,
    description: s.description.slice(0, 160),
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const scholarship = SCHOLARSHIPS[slug]
  if (!scholarship) notFound()
  return (
    <>
      <Navbar />
      <ScholarshipDetail scholarship={scholarship} />
      <Footer />
    </>
  )
}
