import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { QuoteWizard } from '@/components/quote-wizard'

export const metadata: Metadata = {
  title: 'Free Residential Cleaning Quote',
  description: 'Get an instant residential cleaning quote from Rainwater & Shine Cleaning Co. Tell us about your home and receive an estimate in seconds.',
  robots: { index: false },
}

export default function QuotePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-secondary py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-1.5 mb-3">
              Free &amp; Instant
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2 text-balance">
              Get Your Free Quote
            </h1>
            <p className="text-muted-foreground">
              Answer a few quick questions and we&apos;ll calculate your estimate on the spot.
            </p>
          </div>
          <QuoteWizard />
        </div>
      </main>
      <Footer />
    </>
  )
}
