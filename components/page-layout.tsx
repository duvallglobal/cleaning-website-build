import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BreadcrumbJsonLd } from '@/components/breadcrumb-schema'

interface Crumb {
  name: string
  href?: string
}

interface PageLayoutProps {
  children: React.ReactNode
  breadcrumbs?: Crumb[]
  schema?: Record<string, any>
  className?: string
}

export function PageLayout({ children, breadcrumbs, schema, className = 'bg-background' }: PageLayoutProps) {
  return (
    <>
      {breadcrumbs && <BreadcrumbJsonLd items={breadcrumbs} />}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <Header />
      <main className={className}>{children}</main>
      <Footer />
    </>
  )
}
