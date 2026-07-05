import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ServiceCard } from '@/components/service-card'
import { SITE_NAME, RESIDENTIAL_SERVICES } from '@/lib/constants'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Residential Cleaning Services in West Point GA & Auburn AL | Rainwater & Shine',
  description: `${SITE_NAME} offers professional residential cleaning including deep cleaning, move-in/out, recurring, special event, and standard cleaning in West Point GA, LaGrange GA, Columbus GA, Opelika AL, and Auburn AL.`,
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Residential Cleaning',
  provider: { '@type': 'LocalBusiness', name: SITE_NAME },
  areaServed: [
    { '@type': 'City', name: 'West Point, GA' },
    { '@type': 'City', name: 'LaGrange, GA' },
    { '@type': 'City', name: 'Columbus, GA' },
    { '@type': 'City', name: 'Auburn, AL' },
  ],
  description: 'Professional residential cleaning including deep cleaning, move-in/out, recurring, and standard cleaning.',
}

export default function ResidentialPage() {
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
              Residential
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 text-balance">
              Residential Cleaning Services
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From weekly maintenance to one-time deep cleans, our professional team keeps your home spotless — so you can focus on what matters.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {RESIDENTIAL_SERVICES.map(s => (
                <ServiceCard key={s.slug} {...s} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild size="lg" className="bg-primary text-white font-bold rounded-full px-8">
                <Link href="/quote/residential">Get a Free Quote</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-extrabold text-foreground mb-6 text-balance text-center">
              The Rainwater &amp; Shine Difference
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ['Fully Insured & Bonded', 'Your home and belongings are protected on every visit.'],
                ['Background-Checked Cleaners', 'Every team member passes a thorough background check.'],
                ['Eco-Friendly Products', 'We use safe, non-toxic products that are kind to your family and pets.'],
                ['Satisfaction Guarantee', 'Not happy? We\'ll return within 48 hours to make it right — at no extra charge.'],
              ].map(([title, desc]) => (
                <div key={title} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
