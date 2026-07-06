# Project Status — Rainwater & Shine Cleaning Co.


**Stack:** Next.js 16 (App Router), Tailwind CSS v4, shadcn/ui, Supabase, Make.com
**Vercel:** https://rainwater-shine-cleaning-met0xuif6.vercel.app
**Last Updated:** 2026-07-05

---

## Existing Routes

| Route | Type | Status |
|-------|------|--------|
| `/` | Homepage | ✅ Live |
| `/services/residential` | Residential listing | ✅ Live |
| `/services/residential/[slug]` | Service detail (5 types) | ✅ Live |
| `/services/commercial` | Commercial listing | ✅ Live |
| `/locations` | All locations index | ✅ Live |
| `/locations/west-point-ga` | West Point, GA | ✅ Live |
| `/locations/lagrange-ga` | LaGrange, GA | ✅ Live |
| `/locations/franklin-ga` | Franklin, GA | ✅ Live |
| `/locations/columbus-ga` | Columbus, GA | ✅ Live |
| `/locations/opelika-al` | Opelika, AL | ✅ Live |
| `/locations/auburn-al` | Auburn, AL | ✅ Live |
| `/contact` | Contact form | ✅ Live |
| `/quote/residential` | Quote form (noindex) | ✅ Live |
| `/book` | Booking form (noindex) | ✅ Live |
| `/opengraph-image` | OG image | ✅ Live |
| `/robots.txt` | Robots | ✅ Live |
| `/sitemap.xml` | Sitemap | ✅ Live |

---

## SEO Audit — Fix Status

### ✅ Completed (Code + Config Changes)

| Area | Change | File |
|------|--------|------|
| **Address** | Fixed schema from "123 Main Street" to real address `1409 4th Ave, West Point, GA 31833` | `app/locations/[city]/page.tsx` |
| **Fake testimonial** | Removed hardcoded fake review + 5-star rating; replaced with generic CTA | `app/locations/[city]/page.tsx` |
| **Footer** | Removed `await headers()`, made sync, hardcoded copyright year | `components/footer.tsx` |
| **Image optimization** | Removed `images.unoptimized: true` | `next.config.mjs` |
| **TS errors** | Removed `typescript.ignoreBuildErrors`, fixed 6 pre-existing type errors | `next.config.mjs`, booking-form, quote-wizard |
| **Form pages** | Added `robots: { index: false }` to quote + book | `app/quote/residential/page.tsx`, `app/book/page.tsx` |
| **Sitemap** | Removed quote/book URLs; static `lastModified` date | `app/sitemap.ts` |
| **Canonical URL** | Added `alternates.canonical` to root layout | `app/layout.tsx` |
| **OG image** | Created via `ImageResponse` at 1200×630 | `app/opengraph-image.tsx` |
| **OG metadata** | Added `openGraph.images`, `twitter.images` | `app/layout.tsx` |
| **Homepage title** | Restored to original `House & Commercial Cleaning in West GA & East AL` | `app/page.tsx` |
| **Homepage H1** | Restored to brand-driven "A cleaner home, without the hassle." | `app/page.tsx` |
| **Residential title** | Added location keywords (`West Point GA & Auburn AL`) | `app/services/residential/page.tsx` |
| **Commercial title** | Added location keywords (`Columbus GA & West Point GA`) | `app/services/commercial/page.tsx` |
| **Service JSON-LD** | Added to residential listing, commercial, and all 5 service detail pages | See files |
| **Breadcrumb JSON-LD** | Created reusable `BreadcrumbJsonLd` component; applied to city + detail pages | `components/breadcrumb-schema.tsx` |
| **Homepage schema** | Added `telephone`, `image`, `openingHours` to `HouseCleaningService` | `app/page.tsx` |
| **Hours of operation** | Updated to `Mo-Su 07:00-21:00` | `app/page.tsx`, `app/locations/[city]/page.tsx` |
| **AI crawlers** | Added GPTBot (disallow), OAI-SearchBot, PerplexityBot, ClaudeBot rules | `app/robots.ts` |
| **Dead config** | Removed unused `cacheComponents: true` | `next.config.mjs` |
| **Address constant** | Fixed `SITE_ADDRESS` to "4th Ave" (was "4th Avenue") | `lib/constants.ts` |
| **Vercel project** | Renamed from `cleaning-website-build` → `rainwater-shine-cleaning-co` | Vercel dashboard |
| **Production deploy** | Deployed to Vercel — 23/23 static pages, 0 errors | Live |

### 🟠 Remaining Manual / Offline

| Task | Priority | Notes |
|------|----------|-------|
| Google Business Profile | 🔴 High | Must match NAP exactly: `Rainwater & Shine Cleaning Co.`, `1409 4th Ave, West Point, GA 31833`, `(706) 350-0938` |
| `hello@rainwatershine.com` email | 🟡 Medium | Requires MX records + email hosting |
| Webhook URL in Vercel prod | ✅ Done | Already configured |
| GSC + GA4 setup | 🟡 Medium | Submit sitemap, monitor impressions |

### 🟢 Missing Pages to Build

| Page | Priority | Notes |
|------|----------|-------|
| `/privacy` | 🔴 High | Required by law — site collects personal data via forms |
| `/terms` | 🔴 High | Required for booking/quote service |
| `/about` | 🟡 Medium | Trust signal for local service business |
| `/faq` | 🟡 Medium | FAQPage schema opportunity, captures "cost in [city]" searches |
| `/services/commercial/[slug]` | 🟢 Low | Only if commercial has distinct service types |
| City-service combo pages | 🟢 Low | e.g. `/services/residential/deep-cleaning/west-point-ga` |

### 🟢 Long-Term / Content

| Task | Notes |
|------|-------|
| Review generation pipeline | Post-cleaning SMS/email → Google Reviews |
| Local citations | Yelp, Bing Places, Chamber of Commerce |
| Google Maps embed | On city pages |
| `"use cache"` on hero | Performance optimization for LCP |

---

## Environment Variables

All set in Vercel project `rainwater-shine-cleaning-co`:

| Variable | Set |
|----------|-----|
| `WEBHOOK_URL` | ✅ https://hook.us2.make.com/... |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ |
| `POSTGRES_PRISMA_URL` | ✅ |
| (Postgres connection vars) | ✅ |

---

## Build Health

| Metric | Status |
|--------|--------|
| Build passes | ✅ 23/23 pages, 0 TS errors |
| Static pages | ✅ All pages prerendered (○ static or ● SSG) |
| Dynamic pages | ✅ None (was: all pages due to footer) |
| Image optimization | ✅ WebP/AVIF via Next.js |
| TypeScript strictness | ✅ Enabled (was: `ignoreBuildErrors`) |
| Known warning | ⚠️ `DEP0205` — Node.js 26 deprecation of `module.register()` used by Next.js Turbopack (upstream, unfixable) |
