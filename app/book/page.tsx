import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BookingForm } from '@/components/booking-form'

export const metadata: Metadata = {
  title: 'Book a Cleaning',
  description: 'Schedule your residential or commercial cleaning service with Rainwater & Shine Cleaning Co. Choose your preferred date and time.',
  robots: { index: false },
}

export default function BookPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-secondary py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2 text-balance">
              Schedule Your Cleaning
            </h1>
            <p className="text-muted-foreground">
              Pick a date and time that works for you. We&apos;ll confirm within 24 hours.
            </p>
          </div>
          <BookingForm />
        </div>
      </main>
      <Footer />
    </>
  )
}
