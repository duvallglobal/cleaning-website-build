import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { SITE_NAME } from '@/lib/constants'
import { CheckCircle, Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Commercial Cleaning Columbus GA & West Point GA | Rainwater & Shine',
  description: `${SITE_NAME} provides professional commercial janitorial and cleaning services for offices, retail spaces, and businesses in West Point GA, LaGrange GA, Columbus GA, Opelika AL, and Auburn AL.`,
}

const INCLUDED = [
  'Vacuuming, sweeping, and mopping all floor surfaces',
  'Restroom sanitation and restocking',
  'Trash removal and liner replacement',
  'Breakroom and kitchen cleaning',
  'Desk and surface dusting',
  'Glass and window cleaning (interior)',
  'Common area tidying and furniture wipe-down',
  'Periodic deep cleaning schedules available',
]

const DIFFERENCE = [
  { title: 'Flexible Scheduling', desc: 'Early morning, evening, and weekend cleaning so we never disrupt your business hours.' },
  { title: 'Consistent Crew', desc: 'The same background-checked team every visit so you always know who\'s in your space.' },
  { title: 'Custom Checklists', desc: 'We work with you to create a cleaning plan specific to your facility\'s needs.' },
  { title: 'Fully Insured', desc: 'Comprehensive liability and workers\' comp coverage for total peace of mind.' },
  { title: 'Green Cleaning Options', desc: 'Eco-certified products available for businesses with sustainability goals.' },
  { title: 'Responsive Management', desc: 'Direct contact with a manager — not a call center — for any questions or adjustments.' },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Commercial Cleaning & Janitorial Services',
  provider: { '@type': 'LocalBusiness', name: SITE_NAME },
  areaServed: [
    { '@type': 'City', name: 'West Point, GA' },
    { '@type': 'City', name: 'LaGrange, GA' },
    { '@type': 'City', name: 'Columbus, GA' },
    { '@type': 'City', name: 'Auburn, AL' },
  ],
  description: 'Professional commercial janitorial and cleaning services for offices, retail spaces, and businesses.',
}

export default function CommercialPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />
      <main>
        <section className="bg-secondary py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-1.5 mb-4">
              Commercial
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 text-balance">
              Commercial Cleaning &amp; Janitorial Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A clean workspace boosts productivity and impresses clients. We handle the cleaning so you can handle business.
            </p>
            <Button asChild size="lg" className="mt-8 bg-primary text-white font-bold rounded-full px-8">
              <Link href="/contact">Request a Commercial Quote</Link>
            </Button>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-extrabold text-foreground mb-8 text-center text-balance">
              Who We Serve
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {['Offices', 'Medical Offices', 'Retail Stores', 'Restaurants', 'Gyms & Fitness', 'Churches', 'Schools', 'Warehouses'].map(t => (
                <div key={t} className="flex items-center gap-2 bg-secondary rounded-xl px-4 py-3">
                  <Building2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-medium text-foreground">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-extrabold text-foreground mb-8 text-center text-balance">
              What&apos;s Included
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INCLUDED.map(item => (
                <li key={item} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* The Difference */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-extrabold text-foreground mb-8 text-center text-balance">
              The Rainwater &amp; Shine Difference
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {DIFFERENCE.map(d => (
                <div key={d.title} className="bg-secondary rounded-2xl p-6">
                  <h3 className="font-bold text-foreground mb-2">{d.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button asChild size="lg" className="bg-primary text-white font-bold rounded-full px-8">
                <Link href="/contact">Get a Commercial Quote</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
