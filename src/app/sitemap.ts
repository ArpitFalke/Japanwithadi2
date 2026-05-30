import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://japanwithadi.com'
  const slugs = ['mext-embassy-2025','mext-university-2025','jasso-exchange-2025','kosen-international-2025','utokyo-global-leaders','rotary-japan-2025']
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/scholarships`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/ai`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/webinars`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/community`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    ...slugs.map(s => ({ url: `${base}/scholarships/${s}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 })),
  ]
}
