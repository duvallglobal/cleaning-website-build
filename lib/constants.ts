export const SITE_NAME = 'Rainwater & Shine Cleaning Co.'
export const SITE_TAGLINE = 'Spotless Results, Every Time'
export const SITE_URL = 'https://rainwatershine.com'

// Contact info — quote/booking/contact copies are also sent here via the Make.com webhook.
export const SITE_PHONE = '(706) 350-0938'
export const SITE_ADDRESS = '1409 4th Ave, West Point, GA 31833'

// Contact email — quote/booking/contact copies are also sent here via the Make.com webhook.
export const OWNER_EMAIL = 'mj@dgconsulting.tech'
export const CONTACT_EMAIL = OWNER_EMAIL
export const SITE_EMAIL = CONTACT_EMAIL

export const SERVICE_AREAS = [
  { city: 'West Point', state: 'GA', slug: 'west-point-ga', lat: 32.8777, lng: -85.1833 },
  { city: 'LaGrange',   state: 'GA', slug: 'lagrange-ga',   lat: 33.0393, lng: -85.031 },
  { city: 'Franklin',   state: 'GA', slug: 'franklin-ga',   lat: 33.2818, lng: -85.0988 },
  { city: 'Columbus',   state: 'GA', slug: 'columbus-ga',   lat: 32.461,  lng: -84.9877 },
  { city: 'Opelika',    state: 'AL', slug: 'opelika-al',    lat: 32.6451, lng: -85.3783 },
  { city: 'Auburn',     state: 'AL', slug: 'auburn-al',     lat: 32.6099, lng: -85.4808 },
]

export const RESIDENTIAL_SERVICES = [
  {
    slug: 'standard-cleaning',
    name: 'Standard Cleaning',
    description: 'Recurring upkeep that keeps your home consistently fresh — dusting, floors, kitchens, and baths.',
    icon: 'Sparkles',
    base: 80,
  },
  {
    slug: 'deep-cleaning',
    name: 'Deep Cleaning',
    description: 'A thorough top-to-bottom reset — baseboards, appliances, grout, vents, and every overlooked corner.',
    icon: 'Brush',
    base: 220,
  },
  {
    slug: 'move-in-out',
    name: 'Move-In / Move-Out',
    description: 'Leave your old place spotless or start fresh in your new one. Ideal for deposits and closings.',
    icon: 'Home',
    base: 250,
  },
  {
    slug: 'recurring-cleaning',
    name: 'Recurring Cleaning',
    description: 'Weekly, bi-weekly, or monthly plans at a discounted recurring rate. Same cleaner every visit.',
    icon: 'CalendarCheck',
    base: 100,
  },
  {
    slug: 'special-event',
    name: 'Special Event',
    description: 'Pre- or post-event cleaning so you can focus on your guests instead of the mess.',
    icon: 'PartyPopper',
    base: 175,
  },
]

// Value propositions — kept factual, no unverifiable claims.
export const VALUE_PROPS = [
  { label: 'Transparent Flat Pricing', icon: 'BadgeCheck' },
  { label: 'Eco-Friendly Products Available', icon: 'Leaf' },
  { label: 'Easy Online Booking', icon: 'CalendarCheck' },
  { label: 'Satisfaction Guarantee', icon: 'ThumbsUp' },
]
