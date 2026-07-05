import Link from 'next/link'
import { MapPin } from 'lucide-react'

interface LocationCardProps {
  city: string
  state: string
  slug: string
}

export function LocationCard({ city, state, slug }: LocationCardProps) {
  return (
    <Link
      href={`/locations/${slug}`}
      className="group flex items-center gap-3 bg-white border border-border rounded-xl px-5 py-4 hover:border-primary hover:shadow-md transition-all duration-200"
    >
      <MapPin className="w-5 h-5 text-primary shrink-0" />
      <span className="font-semibold text-foreground text-sm">{city}</span>
      <span className="text-xs text-muted-foreground">{state}</span>
      <span className="ml-auto text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">View &rarr;</span>
    </Link>
  )
}
