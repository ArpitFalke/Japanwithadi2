'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Rahul Sharma',
    country: '🇮🇳 India',
    scholarship: 'MEXT Embassy 2024',
    university: 'University of Tokyo',
    text: 'Japan With Adi helped me crack MEXT on my first try. Adi Sensei gave me a complete roadmap, exam tips, and even reviewed my SOP. I got into UTokyo for my Masters in Robotics!',
    rating: 5,
    avatar: 'RS',
  },
  {
    name: 'Fatima Al-Hassan',
    country: '🇳🇬 Nigeria',
    scholarship: 'JASSO Exchange 2024',
    university: 'Osaka University',
    text: 'The scholarship search engine found opportunities I never knew existed. The AI filtered 200+ scholarships to just 8 that matched my profile perfectly. I am now studying at Osaka!',
    rating: 5,
    avatar: 'FA',
  },
  {
    name: 'Carlos Mendez',
    country: '🇧🇷 Brazil',
    scholarship: 'KOSEN Program 2023',
    university: 'NIT Nagoya',
    text: 'As a technical student from Brazil, I thought Japan was impossible. Adi Sensei showed me KOSEN and guided me through every step. Now I am living my dream in Nagoya!',
    rating: 5,
    avatar: 'CM',
  },
  {
    name: 'Amara Diallo',
    country: '🇸🇳 Senegal',
    scholarship: 'MEXT University 2024',
    university: 'Kyoto University',
    text: 'The deadline tracker saved my application — I was 3 days from missing MEXT. The platform reminded me just in time. Adi Sensei also helped me prepare for my interview at the embassy.',
    rating: 5,
    avatar: 'AD',
  },
  {
    name: 'Priya Nair',
    country: '🇮🇳 India',
    scholarship: 'Rotary Foundation 2024',
    university: 'Waseda University',
    text: 'I did not know about private foundation scholarships until Japan With Adi. The AI recommended Rotary based on my profile, and now I have a fully funded year at Waseda. Incredible platform!',
    rating: 5,
    avatar: 'PN',
  },
  {
    name: 'Liu Wei',
    country: '🇲🇾 Malaysia',
    scholarship: 'JASSO Short-Term 2024',
    university: 'Tohoku University',
    text: 'Japan With Adi is the most comprehensive scholarship resource I found. The blog guides, the AI chat, and the application tracker all in one place. My go-to platform for everything Japan study!',
    rating: 5,
    avatar: 'LW',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#07040a]" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="eyebrow justify-center mb-4">Success Stories</div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            Students Who Made It to <span className="text-brand-red">Japan</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Real students, real scholarships, real results. Join 85,000+ students who found their path to Japan.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 border border-white/[0.07] hover:border-brand-red/20 transition-colors group"
            >
              <Quote className="w-6 h-6 text-brand-red/40 mb-4" />
              <p className="text-sm text-white/55 leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-red/20 border border-brand-red/30 flex items-center justify-center text-xs font-bold text-brand-red">
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/35">{t.country} · {t.university}</div>
                </div>
                <div className="flex-shrink-0">
                  <div className="text-[10px] text-brand-red/70 font-semibold text-right">{t.scholarship}</div>
                  <div className="flex gap-0.5 justify-end mt-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
