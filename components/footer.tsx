import Link from 'next/link'
import { Mail, Sparkles } from 'lucide-react'
import { SITE_NAME, CONTACT_EMAIL, SERVICE_AREAS, RESIDENTIAL_SERVICES } from '@/lib/constants'

export function Footer() {
  
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4" aria-label={`${SITE_NAME} — Home`}>
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-base font-bold tracking-tight">
                  Rainwater <span className="text-primary">&amp;</span> Shine
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-ink-foreground/50 font-medium mt-0.5">
                  Cleaning Co.
                </span>
              </span>
            </Link>
            <p className="text-sm text-ink-foreground/60 leading-relaxed">
              Residential &amp; commercial cleaning serving West Georgia and East Alabama.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 mt-4 text-sm text-ink-foreground/70 hover:text-ink-foreground transition-colors"
            >
              <Mail className="w-4 h-4 text-primary" aria-hidden="true" />
              {CONTACT_EMAIL}
            </a>
          </div>

          {/* Services */}
          <nav aria-label="Footer services">
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink-foreground/40 mb-4">Services</h3>
            <ul className="flex flex-col gap-2.5">
              {RESIDENTIAL_SERVICES.map(s => (
                <li key={s.slug}>
                  <Link href={`/services/residential/${s.slug}`} className="text-sm text-ink-foreground/70 hover:text-ink-foreground transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services/commercial" className="text-sm text-ink-foreground/70 hover:text-ink-foreground transition-colors">
                  Commercial Cleaning
                </Link>
              </li>
            </ul>
          </nav>

          {/* Service Areas */}
          <nav aria-label="Footer service areas">
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink-foreground/40 mb-4">Service Areas</h3>
            <ul className="flex flex-col gap-2.5">
              {SERVICE_AREAS.map(a => (
                <li key={a.slug}>
                  <Link href={`/locations/${a.slug}`} className="text-sm text-ink-foreground/70 hover:text-ink-foreground transition-colors">
                    {a.city}, {a.state}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Links */}
          <nav aria-label="Footer quick links">
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink-foreground/40 mb-4">Get Started</h3>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/quote/residential" className="text-sm text-ink-foreground/70 hover:text-ink-foreground transition-colors">Get a Free Quote</Link></li>
              <li><Link href="/book" className="text-sm text-ink-foreground/70 hover:text-ink-foreground transition-colors">Book a Cleaning</Link></li>
              <li><Link href="/contact" className="text-sm text-ink-foreground/70 hover:text-ink-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="/locations" className="text-sm text-ink-foreground/70 hover:text-ink-foreground transition-colors">All Locations</Link></li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-ink-foreground/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-foreground/40">
            &copy; 2026 {SITE_NAME} All rights reserved.
          </p>
          <p className="text-xs text-ink-foreground/40">
            Proudly serving West GA &amp; East AL
          </p>
        </div>
      </div>
    </footer>
  )
}
