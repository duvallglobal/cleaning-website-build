import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ContactForm } from '@/components/contact-form'
import { Phone, Mail, Clock } from 'lucide-react'
import { SITE_PHONE, SITE_EMAIL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Rainwater & Shine Cleaning Co. We serve West Point GA, LaGrange GA, Columbus GA, Opelika AL, and Auburn AL.',
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-secondary py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2 text-balance">
              Get in Touch
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Questions, custom requests, or just want to say hi — we&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Info sidebar */}
            <aside className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="font-bold text-foreground mb-5">Contact Information</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <a href={`tel:${SITE_PHONE.replace(/\D/g,'')}`} className="font-semibold text-foreground hover:text-primary">{SITE_PHONE}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <a href={`mailto:${SITE_EMAIL}`} className="font-semibold text-foreground hover:text-primary">{SITE_EMAIL}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Hours</p>
                      <p className="font-semibold text-foreground text-sm">Mon–Sat: 7:00 AM – 7:00 PM</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-primary rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">Need it fast?</h3>
                <p className="text-sm text-white/80 mb-4">Get an instant quote online in under 2 minutes.</p>
                <a href="/quote/residential" className="inline-block bg-white text-primary text-sm font-bold rounded-full px-5 py-2.5 hover:bg-white/90 transition-colors">
                  Free Quote
                </a>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
