import type { Metadata } from 'next'
import { PageLayout } from '@/components/page-layout'
import { SITE_NAME, SITE_PHONE, SITE_EMAIL, SERVICE_AREAS, RESIDENTIAL_SERVICES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: `Answers to common questions about ${SITE_NAME} cleaning services — pricing, service areas, scheduling, what's included, cancellation policy, and our satisfaction guarantee.`,
  alternates: {
    canonical: '/faq',
  },
}

const faqs = [
  {
    question: 'What cleaning services do you offer?',
    answer: 'We offer residential and commercial cleaning services including Standard Cleaning, Deep Cleaning, Move-In/Move-Out Cleaning, Recurring Cleaning, Special Event Cleaning, and Commercial Cleaning for offices and small businesses.',
  },
  {
    question: 'How much does a cleaning cost?',
    answer: `Our residential cleaning base prices are: Standard Cleaning — $80, Deep Cleaning — $220, Move-In/Move-Out Cleaning — $250, Recurring Cleaning — $100, and Special Event Cleaning — $175. Final pricing depends on the size and condition of your space. Request a free quote for an accurate estimate.`,
  },
  {
    question: 'What areas do you serve?',
    answer: `We serve West Georgia and East Alabama, including ${SERVICE_AREAS.map(a => `${a.city}, ${a.state}`).join('; ')}. If you are near any of these communities, reach out and we will let you know if we can accommodate your location.`,
  },
  {
    question: 'What are your hours?',
    answer: 'We operate Monday through Saturday, 7:00 AM to 7:00 PM. Contact us to schedule a cleaning at a time that works for you.',
  },
  {
    question: 'What is included in a standard cleaning?',
    answer: 'A standard cleaning covers dusting all surfaces, vacuuming and mopping floors, cleaning kitchens (countertops, sink, stovetop, exterior of appliances), and sanitizing bathrooms (toilets, sinks, tubs, showers, mirrors). Deep cleaning adds detail work like baseboards, blinds, interior appliances, and hard-to-reach areas.',
  },
  {
    question: 'Do I need to be home during the cleaning?',
    answer: 'No, you do not need to be home. Many of our clients provide access instructions (a key, garage code, or door unlock) and return to a freshly cleaned space. We are fully insured and background-checked for your peace of mind.',
  },
  {
    question: 'Do you provide cleaning supplies and equipment?',
    answer: 'Yes, we bring our own professional-grade cleaning supplies and equipment. If you prefer we use specific products you provide, just let us know in advance.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We ask for at least 24 hours notice if you need to reschedule or cancel a cleaning. Cancellations with less than 24 hours notice may be subject to a fee. Recurring cleanings can be paused or adjusted at any time with notice.',
  },
  {
    question: 'Do you offer a satisfaction guarantee?',
    answer: 'Absolutely. If something is not up to your standards, let us know within 24 hours and we will return to address it at no additional cost. Your satisfaction is our priority.',
  },
  {
    question: 'How do I book a cleaning?',
    answer: `You can book online through our booking page, request a free quote, or call us directly at ${SITE_PHONE}. We will confirm your appointment and take care of the rest.`,
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer,
    },
  })),
}

export default function FAQPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { name: 'Home', href: '/' },
        { name: 'FAQ' },
      ]}
      schema={faqSchema}
    >
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Answers to common questions about our cleaning services, pricing, and policies.
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <section key={i} className="border-b border-border pb-8 last:border-0">
                <h2 className="text-xl font-bold text-foreground mb-3">
                  {faq.question}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-secondary p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Still have questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              We are happy to help. Reach out and we will get back to you promptly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${SITE_PHONE.replace(/[^0-9]/g, '')}`}
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Call {SITE_PHONE}
              </a>
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
