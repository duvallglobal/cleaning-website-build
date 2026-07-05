import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { SITE_NAME, RESIDENTIAL_SERVICES } from '@/lib/constants'
import { BreadcrumbJsonLd } from '@/components/breadcrumb-schema'
import { CheckCircle } from 'lucide-react'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return RESIDENTIAL_SERVICES.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const svc = RESIDENTIAL_SERVICES.find(s => s.slug === slug)
  if (!svc) return {}
  return {
    title: `${svc.name} | ${SITE_NAME}`,
    description: `${svc.description} Serving West Point GA, LaGrange GA, Columbus GA, Opelika AL, and Auburn AL. Starting at $${svc.base}.`,
  }
}

const SERVICE_DETAILS: Record<string, { bullets: string[]; whatExpect: string }> = {
  'standard-cleaning': {
    bullets: ['Vacuum all carpets and rugs', 'Mop hard floors', 'Wipe counters and appliances', 'Clean bathrooms top to bottom', 'Dust furniture and ceiling fans', 'Empty trash bins'],
    whatExpect: 'Our standard clean is ideal for homes that need regular upkeep. Perfect for bi-weekly or monthly maintenance.',
  },
  'deep-cleaning': {
    bullets: ['Everything in standard clean', 'Scrub inside oven and microwave', 'Clean inside refrigerator', 'Detail baseboards and trim', 'Scrub grout and tile', 'Clean light fixtures and vents', 'Wipe down cabinet interiors'],
    whatExpect: 'Our deep clean is a comprehensive top-to-bottom service — perfect for first visits, seasonal refreshes, or before a big event.',
  },
  'move-in-out': {
    bullets: ['Complete deep clean of all rooms', 'Inside cabinets and closets', 'Inside oven, fridge, and dishwasher', 'Clean all windows (interior)', 'Wipe down walls and light switches', 'Garage sweep if applicable'],
    whatExpect: 'Move with confidence. We leave your old place spotless for inspection or help you arrive to a fresh, clean start in your new home.',
  },
  'recurring-cleaning': {
    bullets: ['Customizable frequency (weekly, bi-weekly, monthly)', 'Same trusted team every visit', 'Discounted recurring rate', 'Service checklist tailored to your home', 'Easy rescheduling online or by phone'],
    whatExpect: 'Save time and money with a recurring plan. The more often we clean, the lower your rate — and you never have to worry about it again.',
  },
  'special-event': {
    bullets: ['Pre-event deep tidy', 'Post-event full clean', 'Trash removal', 'Kitchen and bathroom reset', 'Floor sweep, mop, and vacuum', 'Quick turnaround available'],
    whatExpect: 'Hosting a party, wedding, or holiday gathering? Let us handle the before and after so you can focus on your guests.',
  },
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const svc = RESIDENTIAL_SERVICES.find(s => s.slug === slug)
  if (!svc) notFound()

  const details = SERVICE_DETAILS[slug] ?? { bullets: [], whatExpect: svc.description }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: svc.name,
    provider: { '@type': 'LocalBusiness', name: SITE_NAME },
    areaServed: ['West Point, GA', 'LaGrange, GA', 'Columbus, GA', 'Auburn, AL', 'Opelika, AL'],
    description: svc.description,
    offers: { '@type': 'Offer', price: svc.base.toString(), priceCurrency: 'USD' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services/residential' },
        { name: svc.name },
      ]} />
      <Header />
      <main>
        <section className="bg-secondary py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <Link href="/services/residential" className="text-sm text-primary hover:underline mb-3 inline-block">
              &larr; All Residential Services
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 text-balance">
              {svc.name}
            </h1>
            <p className="text-lg text-muted-foreground">{svc.description}</p>
            <p className="mt-3 text-primary font-bold text-xl">Starting at ${svc.base}</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl font-extrabold text-foreground mb-5">What&apos;s Included</h2>
                <ul className="space-y-3">
                  {details.bullets.map(b => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-foreground mb-5">What to Expect</h2>
                <p className="text-muted-foreground leading-relaxed">{details.whatExpect}</p>
                <div className="mt-8 bg-secondary rounded-2xl p-6">
                  <p className="text-sm font-semibold text-foreground mb-1">Ready to book?</p>
                  <p className="text-sm text-muted-foreground mb-4">Get an instant quote for your home in under 2 minutes.</p>
                  <Button asChild className="bg-primary text-white font-bold rounded-full w-full">
                    <Link href="/quote/residential">Get My Free Quote</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
