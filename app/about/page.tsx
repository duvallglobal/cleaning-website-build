import type { Metadata } from 'next'
import { PageLayout } from '@/components/page-layout'
import { SITE_NAME, SITE_EMAIL, SITE_PHONE, SITE_ADDRESS, SERVICE_AREAS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about ${SITE_NAME}, a locally owned cleaning company serving West Georgia and East Alabama with reliable, thorough, and affordable residential and commercial cleaning.`,
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { name: 'Home', href: '/' },
        { name: 'About Us' },
      ]}
    >
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About {SITE_NAME}
            </h1>
            <p className="text-lg text-muted-foreground">
              Locally owned. Thoroughly trained. Proudly serving West Georgia and East Alabama.
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {SITE_NAME} was founded with a simple mission: deliver spotless results every time, treat every home and business like our own, and build lasting trust with our neighbors across West Georgia and East Alabama.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We are a locally owned and operated cleaning company based in West Point, Georgia. We live in the communities we serve, and we take pride in keeping them clean — one home and one business at a time.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">What We Do</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We offer residential and commercial cleaning services tailored to your needs:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2 mb-4">
                <li><strong>Standard Cleaning</strong> — Recurring upkeep that keeps your home consistently fresh.</li>
                <li><strong>Deep Cleaning</strong> — Top-to-bottom detail for spaces that need extra attention.</li>
                <li><strong>Move-In / Move-Out Cleaning</strong> — Start fresh in your new space, or leave your old one spotless.</li>
                <li><strong>Recurring Cleaning</strong> — Weekly, biweekly, or monthly visits on your schedule.</li>
                <li><strong>Special Event Cleaning</strong> — Pre- or post-event cleaning for gatherings of any size.</li>
                <li><strong>Commercial Cleaning</strong> — Offices, retail spaces, and small businesses kept professional and welcoming.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Service Area</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We proudly serve the following communities across West Georgia and East Alabama:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2">
                {SERVICE_AREAS.map(area => (
                  <li key={area.slug}>{area.city}, {area.state}</li>
                ))}
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Why Choose Us</h2>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2 mb-4">
                <li><strong>Locally owned</strong> — We are your neighbors, not a faceless franchise.</li>
                <li><strong>Trained & thorough</strong> — Every clean follows a detailed checklist.</li>
                <li><strong>Flexible scheduling</strong> — Monday through Saturday, 7 AM to 7 PM.</li>
                <li><strong>Transparent pricing</strong> — Upfront quotes with no hidden fees.</li>
                <li><strong>Satisfaction guaranteed</strong> — If something is not right, we will make it right.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Get In Touch</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ready for a spotless space? We would love to help. Reach out for a free quote or to book your next cleaning.
              </p>
              <ul className="list-none space-y-2 text-muted-foreground leading-relaxed">
                <li><strong>Phone:</strong> <a href={`tel:${SITE_PHONE.replace(/[^0-9]/g, '')}`} className="text-primary hover:underline">{SITE_PHONE}</a></li>
                <li><strong>Email:</strong> <a href={`mailto:${SITE_EMAIL}`} className="text-primary hover:underline">{SITE_EMAIL}</a></li>
                <li><strong>Address:</strong> {SITE_ADDRESS}</li>
                <li><strong>Hours:</strong> Monday – Saturday, 7:00 AM – 7:00 PM</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
