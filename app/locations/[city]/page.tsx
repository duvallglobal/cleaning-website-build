import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ServiceCard } from '@/components/service-card'
import { SITE_NAME, SITE_PHONE, SITE_EMAIL, SITE_ADDRESS, SERVICE_AREAS, RESIDENTIAL_SERVICES } from '@/lib/constants'
import { BreadcrumbJsonLd } from '@/components/breadcrumb-schema'
import { MapPin, Phone, CheckCircle } from 'lucide-react'

interface Props { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  return SERVICE_AREAS.map(a => ({ city: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params
  const area = SERVICE_AREAS.find(a => a.slug === slug)
  if (!area) return {}
  return {
    title: `Cleaning Services in ${area.city}, ${area.state}`,
    description: `${SITE_NAME} provides professional residential and commercial cleaning in ${area.city}, ${area.state}. Insured, background-checked cleaners. Call ${SITE_PHONE} for a free quote.`,
    alternates: { canonical: `https://rainwatershine.com/locations/${slug}` },
  }
}

function buildSchema(area: typeof SERVICE_AREAS[0]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1409 4th Ave',
      addressLocality: 'West Point',
      addressRegion: 'GA',
      postalCode: '31833',
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: area.lat, longitude: area.lng },
    url: `https://rainwatershine.com/locations/${area.slug}`,
    areaServed: SERVICE_AREAS.map(a => ({ '@type': 'City', name: `${a.city}, ${a.state}` })),
    priceRange: '$$',
    openingHours: 'Mo-Su 07:00-21:00',
    description: `Professional cleaning services in ${area.city}, ${area.state}. Residential and commercial.`,
  }
}

export default async function LocationPage({ params }: Props) {
  const { city: slug } = await params
  const area = SERVICE_AREAS.find(a => a.slug === slug)
  if (!area) notFound()

  const schema = buildSchema(area)

  const citySpecific: Record<string, { headline: string; blurb: string }> = {
    'west-point-ga': {
      headline: `Top-Rated Cleaning Services in West Point, GA`,
      blurb: `West Point families and businesses trust Rainwater & Shine for reliable, professional cleaning. From Shawmut to downtown, we know your neighborhood.`,
    },
    'lagrange-ga': {
      headline: `Professional House Cleaning in LaGrange, GA`,
      blurb: `LaGrange homeowners love coming home to a sparkling clean space. Our experienced team serves all LaGrange neighborhoods and surrounding areas.`,
    },
    'franklin-ga': {
      headline: `Trusted Cleaning Services in Franklin, GA`,
      blurb: `Small-town friendliness with big-city cleaning standards. Rainwater & Shine is Franklin's go-to cleaning company.`,
    },
    'columbus-ga': {
      headline: `Expert Cleaning Services in Columbus, GA`,
      blurb: `Columbus is Georgia's second-largest city — and its homes and offices deserve the best. Our Columbus team delivers consistent, detail-oriented cleaning.`,
    },
    'opelika-al': {
      headline: `Professional Cleaning Services in Opelika, AL`,
      blurb: `Opelika homeowners and business owners count on Rainwater & Shine for thorough, dependable cleaning services throughout the city.`,
    },
    'auburn-al': {
      headline: `Top Cleaning Services in Auburn, AL`,
      blurb: `From student rentals to family homes near Auburn University, we provide flexible, professional cleaning for all of Auburn's diverse housing needs.`,
    },
  }

  const copy = citySpecific[slug] ?? {
    headline: `Professional Cleaning Services in ${area.city}, ${area.state}`,
    blurb: `Rainwater & Shine provides top-rated residential and commercial cleaning services in ${area.city}, ${area.state}.`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Locations', href: '/locations' },
        { name: `${area.city}, ${area.state}` },
      ]} />
      <Header />
      <main>
        <section className="bg-secondary py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <span>Locations</span>
              <span>/</span>
              <span className="text-foreground font-medium">{area.city}, {area.state}</span>
            </div>
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="w-7 h-7 text-primary mt-1 shrink-0" />
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground text-balance">
                {copy.headline}
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">{copy.blurb}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary text-white font-bold rounded-full px-7">
                <Link href="/quote/residential">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary font-bold rounded-full px-7">
                <a href={`tel:${SITE_PHONE.replace(/\D/g,'')}`}>
                  <Phone className="w-4 h-4 mr-2" />{SITE_PHONE}
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Why us in this city */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-foreground mb-6">
              Why {area.city} Chooses Rainwater &amp; Shine
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Local, family-owned business you can trust',
                'Fully insured and bonded for your protection',
                'Background-checked professional cleaners',
                '100% satisfaction guarantee on every visit',
                'Eco-friendly, pet-safe cleaning products',
                'Flexible scheduling including weekends',
              ].map(b => (
                <div key={b} className="flex items-center gap-3 bg-secondary rounded-xl px-4 py-3">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-medium text-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-foreground mb-8 text-center">
              Our Services in {area.city}, {area.state}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {RESIDENTIAL_SERVICES.map(s => <ServiceCard key={s.slug} {...s} />)}
            </div>
          </div>
        </section>

        {/* Other areas */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl font-extrabold text-foreground mb-6">Also Serving Nearby Areas</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {SERVICE_AREAS.filter(a => a.slug !== slug).map(a => (
                <Link
                  key={a.slug}
                  href={`/locations/${a.slug}`}
                  className="bg-secondary hover:bg-primary hover:text-white text-foreground text-sm font-semibold rounded-full px-5 py-2 transition-colors"
                >
                  {a.city}, {a.state}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-primary">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-white text-xl font-bold mb-2">
              Ready for a spotless home in {area.city}?
            </p>
            <p className="text-white/80 text-sm mb-6">Get your free instant quote in under 2 minutes.</p>
            <Button asChild className="bg-white text-primary font-bold rounded-full px-8">
              <Link href="/quote/residential">Book Your Cleaning Today</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
