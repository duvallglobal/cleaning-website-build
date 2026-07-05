import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BadgeCheck, Leaf, CalendarCheck, ThumbsUp, ArrowRight, Sparkles, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ServiceCard } from '@/components/service-card'
import { SITE_NAME, SITE_URL, SITE_PHONE, CONTACT_EMAIL, RESIDENTIAL_SERVICES, SERVICE_AREAS, VALUE_PROPS } from '@/lib/constants'

export const metadata: Metadata = {
  title: `${SITE_NAME} | House & Commercial Cleaning in West GA & East AL`,
  description: `Professional residential and commercial cleaning in West Point, LaGrange, Columbus GA and Opelika, Auburn AL. Get an instant online quote in under 2 minutes. Call ${SITE_PHONE}.`,
}

const VALUE_ICONS: Record<string, React.ElementType> = { BadgeCheck, Leaf, CalendarCheck, ThumbsUp }

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HouseCleaningService',
  name: SITE_NAME,
  email: CONTACT_EMAIL,
  telephone: SITE_PHONE,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.png`,
  areaServed: SERVICE_AREAS.map(a => ({ '@type': 'City', name: `${a.city}, ${a.state}` })),
  priceRange: '$$',
  openingHours: 'Mo-Su 07:00-21:00',
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-blush">
          <div className="absolute inset-0 bg-dots" aria-hidden="true" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-background text-primary text-xs font-semibold rounded-full px-4 py-2 mb-6 shadow-sm">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  Serving West GA &amp; East AL
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-foreground leading-[1.08] tracking-tight text-balance mb-6">
                  A cleaner home,
                  <br />
                  <span className="text-primary">without the hassle.</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md text-pretty">
                  Get an instant online estimate, pick a time that works, and come home to a space that shines. Residential and commercial cleaning done right.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-primary text-primary-foreground font-semibold rounded-full px-7 shadow-lg shadow-primary/25 hover:bg-primary/90">
                    <Link href="/quote/residential">
                      Get My Instant Quote
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-background border-border font-semibold rounded-full px-7 text-foreground hover:bg-secondary">
                    <Link href="/book">Schedule a Cleaning</Link>
                  </Button>
                </div>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 mt-8">
                  {['Instant online pricing', 'No phone call required', 'Satisfaction guarantee'].map(item => (
                    <li key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <BadgeCheck className="w-4 h-4 text-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 aspect-[4/3.4]">
                  <Image
                    src="/images/hero-cleaning.png"
                    alt="Professional cleaner from Rainwater & Shine Cleaning Co. in a sparkling kitchen"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Floating estimate chip */}
                <div className="absolute -bottom-4 left-6 bg-background rounded-2xl shadow-xl px-5 py-3.5 flex items-center gap-3 border border-border">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary text-primary">
                    <Sparkles className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Instant estimates</p>
                    <p className="text-sm font-bold text-foreground">Quotes in under 2 min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Value props strip ── */}
        <section className="border-b border-border bg-background" aria-label="Why choose us">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {VALUE_PROPS.map(b => {
                const Icon = VALUE_ICONS[b.icon] ?? BadgeCheck
                return (
                  <li key={b.label} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary text-primary shrink-0">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </span>
                    {b.label}
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {/* ── Services ── */}
        <section id="services" className="py-20 md:py-24 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mb-12">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">What we do</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight text-balance mb-4">
                Cleaning services for every need
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                From weekly upkeep to deep cleans, move-outs, and commercial janitorial — every service comes with transparent flat pricing.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {RESIDENTIAL_SERVICES.map(s => (
                <ServiceCard key={s.slug} {...s} />
              ))}
              <ServiceCard
                name="Commercial Cleaning"
                description="Offices, retail spaces, and more — professional janitorial services tailored to your business."
                icon="Building2"
                href="/services/commercial"
              />
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-20 md:py-24 bg-blush">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-14">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">How it works</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight text-balance">
                Three steps to a spotless space
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: '1', title: 'Get your quote', desc: 'Answer a few quick questions about your space and see your price instantly — no phone call needed.' },
                { step: '2', title: 'Pick your time', desc: 'Choose a date and arrival window that fits your schedule. We work around you, not the other way around.' },
                { step: '3', title: 'Come home to clean', desc: 'Our team arrives on time with everything needed and leaves your space gleaming. Guaranteed.' },
              ].map(s => (
                <div key={s.step} className="bg-background rounded-2xl p-7 border border-border/60 shadow-sm">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground text-lg font-bold mb-5">
                    {s.step}
                  </span>
                  <h3 className="font-bold text-lg text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-primary text-primary-foreground font-semibold rounded-full px-8 shadow-lg shadow-primary/25 hover:bg-primary/90">
                <Link href="/quote/residential">
                  Start My Quote
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── Service Areas ── */}
        <section id="locations" className="py-20 md:py-24 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mb-12">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Where we clean</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight text-balance mb-4">
                Local teams across West GA &amp; East AL
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We&apos;re a local company — not a franchise. Find your city below for area-specific details.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {SERVICE_AREAS.map(a => (
                <Link
                  key={a.slug}
                  href={`/locations/${a.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-border bg-background px-5 py-4 hover:border-primary/40 hover:bg-secondary transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                    <span className="text-sm font-semibold text-foreground">{a.city}, {a.state}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-20 md:py-24 bg-ink">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-ink-foreground tracking-tight text-balance mb-4">
              Ready to see your price?
            </h2>
            <p className="text-ink-foreground/60 mb-9 text-lg text-pretty">
              Your instant estimate takes less than two minutes — and a copy lands straight in your inbox.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground font-semibold rounded-full px-8 shadow-lg shadow-primary/30 hover:bg-primary/90">
                <Link href="/quote/residential">
                  Get My Free Quote
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-ink-foreground/25 bg-transparent text-ink-foreground font-semibold rounded-full px-8 hover:bg-ink-foreground/10">
                <Link href="/contact">Ask a Question</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
