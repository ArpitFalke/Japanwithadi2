import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/hero/HeroSection'
import { StatsSection } from '@/components/hero/StatsSection'
import { CategoriesSection } from '@/components/hero/CategoriesSection'
import { FeaturedScholarships } from '@/components/scholarship/FeaturedScholarships'
import { AiSection } from '@/components/hero/AiSection'
import { WebinarsSection } from '@/components/hero/WebinarsSection'
import { TestimonialsSection } from '@/components/hero/TestimonialsSection'
import { CtaSection } from '@/components/hero/CtaSection'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <CategoriesSection />
        <FeaturedScholarships />
        <AiSection />
        <WebinarsSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
