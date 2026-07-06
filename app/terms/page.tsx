import type { Metadata } from 'next'
import { PageLayout } from '@/components/page-layout'
import { SITE_NAME, SITE_EMAIL, SITE_PHONE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Read the Terms of Service for ${SITE_NAME}. Understand your rights and responsibilities when booking our residential and commercial cleaning services.`,
  alternates: {
    canonical: '/terms',
  },
}

export default function TermsPage() {
  const lastUpdated = 'July 5, 2026'

  return (
    <PageLayout
      breadcrumbs={[
        { name: 'Home', href: '/' },
        { name: 'Terms of Service' },
      ]}
    >
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms of Service ("Terms") constitute a legally binding agreement between you and {SITE_NAME} ("Company," "we," "our," or "us") regarding your use of our website at{' '}
                <a href="https://rainwatershine.com" className="text-primary hover:underline">
                  rainwatershine.com
                </a>{' '}
                and our residential and commercial cleaning services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By accessing our website, requesting a quote, booking a service, or using our services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our website or services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Services Offered</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {SITE_NAME} provides professional residential and commercial cleaning services, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Standard house cleaning</li>
                <li>Deep cleaning</li>
                <li>Move-in and move-out cleaning</li>
                <li>Recurring cleaning services (weekly, bi-weekly, monthly)</li>
                <li>Special event cleaning</li>
                <li>Commercial and janitorial services</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Service availability may vary by location. We serve West Point GA, LaGrange GA, Franklin GA, Columbus GA, Opelika AL, and Auburn AL.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Booking and Scheduling</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">Online Quotes and Bookings</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may request a quote or book a service through our online forms. All quotes are estimates based on the information you provide and are subject to adjustment upon inspection of the property.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">Confirmation</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All bookings are subject to availability and confirmation by {SITE_NAME}. We will send you a confirmation email or contact you directly to confirm your appointment. Your service is not confirmed until you receive confirmation from us.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">Rescheduling</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you need to reschedule your appointment, please contact us at least 24 hours in advance. We will make every effort to accommodate your request based on availability.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">Cancellation Policy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cancellations made with less than 24 hours' notice may be subject to a cancellation fee. Recurring service clients must provide at least 48 hours' notice for cancellations. No-shows or same-day cancellations may be charged the full service fee.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Pricing and Payment</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">Pricing</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All prices quoted are estimates based on the information you provide. Final pricing may vary depending on the actual condition and size of the property. Any significant price adjustments will be communicated to you before work begins.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">Payment Terms</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Payment is due upon completion of services unless otherwise agreed in writing. We accept cash, check, and major credit cards. For recurring services, payment may be processed automatically on a recurring basis.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">Late Payment</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Invoices not paid within 30 days may incur late fees and may result in suspension of future services.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">Disputes</h3>
              <p className="text-muted-foreground leading-relaxed">
                If you believe there is an error in your invoice, please contact us within 7 days of receipt. We will work with you to resolve any billing disputes promptly.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Your Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To ensure a safe and efficient cleaning service, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Provide Access:</strong> Ensure our team has safe and timely access to the property at the scheduled time. If you will not be present, you must provide access instructions (lockbox code, key location, etc.).
                </li>
                <li>
                  <strong>Secure Valuables:</strong> Remove or secure any fragile, valuable, or irreplaceable items before our arrival. We are not responsible for damage to items that should have been secured.
                </li>
                <li>
                  <strong>Disclose Hazards:</strong> Inform us of any known hazards, such as mold, asbestos, lead paint, pets, or pest infestations.
                </li>
                <li>
                  <strong>Clear Clutter:</strong> Remove excessive clutter from surfaces and floors to allow efficient cleaning. We clean, we don't organize.
                </li>
                <li>
                  <strong>Provide Accurate Information:</strong> Provide accurate information about your property size, condition, and special requests when requesting a quote.
                </li>
                <li>
                  <strong>Pet Safety:</strong> Secure or confine pets during the cleaning appointment to ensure the safety of our team and your pets.
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Responsibilities and Service Standards</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We are committed to providing high-quality cleaning services. We will:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Arrive on time within the scheduled window</li>
                <li>Bring all necessary equipment and cleaning supplies</li>
                <li>Use eco-friendly products when requested</li>
                <li>Treat your property with respect and care</li>
                <li>Complete the agreed-upon scope of work</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                If you are not satisfied with our service, please contact us within 24 hours of the appointment. We will work to address your concerns and may offer a re-clean of the affected areas at no additional charge.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {SITE_NAME} is fully insured. However, we are not liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Damage to items that were not properly secured or disclosed as fragile</li>
                <li>Pre-existing damage or defects in your property</li>
                <li>Damage caused by normal wear and tear</li>
                <li>Loss or damage to cash, jewelry, collectibles, or other high-value items</li>
                <li>Failure to complete service due to unsafe working conditions or customer non-compliance</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In no event shall {SITE_NAME} be liable for any indirect, incidental, special, consequential, or punitive damages arising from our services. Our total liability for any claim shall not exceed the amount paid for the specific service in question.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                All claims for damage must be reported to us within 24 hours of the service. We will investigate all claims promptly and work with you to resolve them fairly.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Satisfaction Guarantee</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We stand behind the quality of our work. If you are not completely satisfied with our service, please contact us within 24 hours of your appointment. We will:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Listen to your concerns</li>
                <li>Return to re-clean the affected areas at no additional charge (if appropriate)</li>
                <li>Issue a partial or full refund in cases where a re-clean is not feasible</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                This guarantee applies only to services performed and does not cover issues caused by customer neglect, failure to follow pre-cleaning instructions, or normal wear and tear.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on our website, including text, graphics, logos, images, and software, is the property of {SITE_NAME} or its content suppliers and is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works from our website content without our express written permission.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your use of our services is also governed by our{' '}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                . Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify, defend, and hold harmless {SITE_NAME}, its officers, directors, employees, agents, and contractors from any claims, liabilities, damages, losses, or expenses (including reasonable attorneys' fees) arising from your breach of these Terms, your use of our services, or your violation of any law or the rights of a third party.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to refuse service or terminate our relationship with any customer at any time for any reason, including but not limited to: non-payment, abusive behavior toward our staff, unsafe working conditions, or violation of these Terms. For recurring services, either party may terminate the service agreement with written notice.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Force Majeure</h2>
              <p className="text-muted-foreground leading-relaxed">
                We shall not be liable for any failure or delay in performing our obligations due to circumstances beyond our reasonable control, including but not limited to: acts of God, natural disasters, severe weather, labor disputes, equipment failures, or government restrictions.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Governing Law and Dispute Resolution</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the State of Georgia, without regard to its conflict of law provisions.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Any disputes arising from these Terms or our services shall first be addressed through good-faith negotiation. If a resolution cannot be reached within 30 days, either party may pursue legal remedies in the appropriate courts of Troup County, Georgia.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Severability</h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect. The invalid or unenforceable provision shall be replaced with a valid provision that most closely reflects the original intent.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated "Last updated" date. Your continued use of our website or services after changes are posted constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Entire Agreement</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms, together with our Privacy Policy and any written service agreements, constitute the entire agreement between you and {SITE_NAME} regarding our services and supersede all prior or contemporaneous communications and proposals.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-secondary rounded-xl p-6 space-y-2">
                <p className="text-foreground font-semibold">{SITE_NAME}</p>
                <p className="text-muted-foreground">
                  Email:{' '}
                  <a href={`mailto:${SITE_EMAIL}`} className="text-primary hover:underline">
                    {SITE_EMAIL}
                  </a>
                </p>
                <p className="text-muted-foreground">
                  Phone:{' '}
                  <a href={`tel:${SITE_PHONE.replace(/\D/g, '')}`} className="text-primary hover:underline">
                    {SITE_PHONE}
                  </a>
                </p>
              </div>
            </section>

            <section>
              <div className="bg-blush rounded-xl p-6 border-l-4 border-primary">
                <p className="text-sm text-foreground">
                  <strong>Important:</strong> By booking a cleaning service with {SITE_NAME}, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
