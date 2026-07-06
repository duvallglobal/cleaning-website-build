'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Sparkles, CalendarCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Residential', href: '/services/residential' },
  { label: 'Commercial', href: '/services/commercial' },
  { label: 'Locations', href: '/locations' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[4.5rem]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Rainwater & Shine Cleaning Co. — Home">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <Sparkles className="w-4.5 h-4.5" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-base md:text-lg font-bold tracking-tight text-foreground">
                Rainwater <span className="text-primary">&amp;</span> Shine
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-medium mt-0.5">
                Cleaning Co.
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {NAV.map(n => (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full px-3.5 py-2 transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="ghost" className="font-semibold rounded-full text-foreground hover:bg-secondary">
              <Link href="/book">
                <CalendarCheck className="w-4 h-4 mr-1.5" />
                Book
              </Link>
            </Button>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full px-5 shadow-sm shadow-primary/25">
              <Link href="/quote/residential">Free Quote</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-t border-border px-4 pb-5 pt-2">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV.map(n => (
              <Link
                key={n.href}
                href={n.href}
                className="py-2.5 px-3 text-sm font-medium text-foreground rounded-lg hover:bg-secondary transition-colors"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Button asChild variant="outline" className="rounded-full w-full font-semibold border-primary/30 text-primary">
              <Link href="/book" onClick={() => setOpen(false)}>
                <CalendarCheck className="w-4 h-4 mr-1.5" />
                Book a Cleaning
              </Link>
            </Button>
            <Button asChild className="bg-primary text-primary-foreground font-semibold rounded-full w-full">
              <Link href="/quote/residential" onClick={() => setOpen(false)}>Get a Free Quote</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
