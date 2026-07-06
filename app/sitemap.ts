import type { MetadataRoute } from 'next'
import { SERVICE_AREAS, RESIDENTIAL_SERVICES } from '@/lib/constants'

const BASE = 'https://rainwatershine.com'
const LAST_MOD = new Date('2026-07-05')

export default function sitemap(): MetadataRoute.Sitemap {
  const core = [
    { url: BASE, lastModified: LAST_MOD, changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${BASE}/services/residential`, lastModified: LAST_MOD, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE}/services/commercial`, lastModified: LAST_MOD, changeFrequency: 'monthly' as const, priority: 0.9 },
        { url: `${BASE}/about`, lastModified: LAST_MOD, changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${BASE}/faq`, lastModified: LAST_MOD, changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${BASE}/contact`, lastModified: LAST_MOD, changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${BASE}/privacy`, lastModified: LAST_MOD, changeFrequency: 'yearly' as const, priority: 0.3 },
        { url: `${BASE}/terms`, lastModified: LAST_MOD, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const services = RESIDENTIAL_SERVICES.map(s => ({
    url: `${BASE}/services/residential/${s.slug}`,
    lastModified: LAST_MOD,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const locations = SERVICE_AREAS.map(a => ({
    url: `${BASE}/locations/${a.slug}`,
    lastModified: LAST_MOD,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...core, ...services, ...locations]
}
