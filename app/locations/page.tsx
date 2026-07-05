import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SITE_NAME, SERVICE_AREAS } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Service Areas | ${SITE_NAME}`,
  description: `We proudly serve West Point, LaGrange, Franklin, Columbus GA and Opelika, Auburn AL. Find your city and book a cleaning today.`,
}

export default function LocationsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-secondary py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-1.5 mb-4">
              Service Areas
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 text-balance">
              Cleaning services near you
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're a local company — not a franchise. Find your city below for area-specific details and booking.
            </p>
          </div>
        </section>

        {/* Location grid */}
        <section className="py-16 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICE_AREAS.map(area => (
                <Link
                  key={area.slug}
                  href={`/locations/${area.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-border bg-background px-5 py-5 hover:border-primary/40 hover:bg-secondary hover:shadow-md transition-all duration-200"
                >
                  <span className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0" />
                    <span>
                      <span className="block font-semibold text-foreground">{area.city}</span>
                      <span className="block text-xs text-muted-foreground">{area.state}</span>
                    </span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
              Don't see your city?
            </h2>
            <p className="text-muted-foreground mb-8">
              We're always expanding. Reach out and we'll let you know if we can help.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-primary text-white font-bold rounded-full px-8 py-3 hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
