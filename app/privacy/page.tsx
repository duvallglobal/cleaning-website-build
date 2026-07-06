import type { Metadata } from 'next'
import { PageLayout } from '@/components/page-layout'
import { SITE_NAME, SITE_EMAIL, SITE_PHONE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Learn how ${SITE_NAME} collects, uses, and protects your personal information. We respect your privacy and are committed to transparency.`,
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyPage() {
  const lastUpdated = 'July 5, 2026'

  return (
    <PageLayout
      breadcrumbs={[
        { name: 'Home', href: '/' },
        { name: 'Privacy Policy' },
      ]}
    >
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {SITE_NAME} ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website{' '}
                <a href="https://rainwatershine.com" className="text-primary hover:underline">
                  rainwatershine.com
                </a>{' '}
                and use our services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By using our website or services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our website or services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">Personal Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect personal information that you voluntarily provide when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                <li>Request a quote or estimate</li>
                <li>Book a cleaning service</li>
                <li>Contact us via our contact form</li>
                <li>Call or email us directly</li>
                <li>Subscribe to our mailing list (if applicable)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The personal information we may collect includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Service address (street, city, state, ZIP code)</li>
                <li>Property details (square footage, number of rooms, special requests)</li>
                <li>Preferred service dates and times</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3">Automatically Collected Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you visit our website, we may automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website</li>
                <li>Date and time of visit</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Service Delivery:</strong> To provide, schedule, and deliver cleaning services to your property
                </li>
                <li>
                  <strong>Communication:</strong> To respond to your inquiries, send appointment confirmations, reminders, and follow-up messages
                </li>
                <li>
                  <strong>Quote Generation:</strong> To calculate accurate estimates based on your property details
                </li>
                <li>
                  <strong>Payment Processing:</strong> To process payments for services rendered (if applicable)
                </li>
                <li>
                  <strong>Service Improvement:</strong> To understand customer preferences and improve our services
                </li>
                <li>
                  <strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes
                </li>
                <li>
                  <strong>Marketing:</strong> To send promotional emails or newsletters (only with your consent, where required by law)
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">How We Share Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell, rent, or trade your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Service Providers:</strong> We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you (e.g., email automation platforms, scheduling tools, payment processors). These parties are obligated to keep your information confidential.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., court orders, subpoenas).
                </li>
                <li>
                  <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.
                </li>
                <li>
                  <strong>Protection of Rights:</strong> We may disclose information when we believe it is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. After the retention period, we will securely delete or anonymize your information.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement reasonable administrative, technical, and physical security measures to protect your personal information from unauthorized access, use, alteration, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our security measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>SSL/TLS encryption for data transmitted through our website</li>
                <li>Secure storage of customer data with access controls</li>
                <li>Regular security audits and updates</li>
                <li>Employee training on data protection practices</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Your Privacy Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                <li>
                  <strong>Access:</strong> The right to request a copy of the personal information we hold about you
                </li>
                <li>
                  <strong>Correction:</strong> The right to request that we correct any inaccurate or incomplete information
                </li>
                <li>
                  <strong>Deletion:</strong> The right to request that we delete your personal information (subject to certain exceptions)
                </li>
                <li>
                  <strong>Opt-Out:</strong> The right to opt out of marketing communications at any time
                </li>
                <li>
                  <strong>Data Portability:</strong> The right to receive your personal information in a structured, commonly used format
                </li>
                <li>
                  <strong>Objection:</strong> The right to object to our processing of your personal information
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                To exercise any of these rights, please contact us at{' '}
                <a href={`mailto:${SITE_EMAIL}`} className="text-primary hover:underline">
                  {SITE_EMAIL}
                </a>{' '}
                or call us at{' '}
                <a href={`tel:${SITE_PHONE.replace(/\D/g, '')}`} className="text-primary hover:underline">
                  {SITE_PHONE}
                </a>
                . We will respond to your request within a reasonable timeframe and in accordance with applicable law.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our website may use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user behavior. Cookies are small data files stored on your device.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You can configure your browser to refuse cookies or alert you when cookies are being sent. However, some features of our website may not function properly without cookies.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately so we can delete it.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the updated policy on this page with a new "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">California Privacy Rights (CCPA)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>The right to know what personal information we collect, use, and disclose</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to opt out of the sale of your personal information (note: we do not sell personal information)</li>
                <li>The right to non-discrimination for exercising your privacy rights</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                To exercise your CCPA rights, please contact us using the information below.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
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
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
