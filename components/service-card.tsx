import Link from 'next/link'
import {
  Sparkles, Brush, Home, CalendarCheck, PartyPopper,
  Building2, ShieldCheck, BadgeCheck, Star, Leaf, ThumbsUp,
  ArrowRight,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles, Brush, Home, CalendarCheck, PartyPopper, Building2,
  ShieldCheck, BadgeCheck, Star, Leaf, ThumbsUp, ArrowRight,
}

interface ServiceCardProps {
  name: string
  description: string
  icon: string
  slug?: string
  href?: string
  base?: number
}

export function ServiceCard({ name, description, icon, slug, href, base }: ServiceCardProps) {
  const Icon = ICON_MAP[icon] ?? Sparkles
  const link = href ?? (slug ? `/services/residential/${slug}` : '#')

  return (
    <Link href={link} className="group block h-full">
      <Card className="h-full border border-border hover:border-primary hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
            <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-semibold text-lg text-foreground mb-2">{name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">{description}</p>
          {base && (
            <p className="text-xs text-primary font-semibold mt-3">Starting at ${base}</p>
          )}
          <div className="flex items-center gap-1 mt-4 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Learn more <ArrowRight className="w-4 h-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
