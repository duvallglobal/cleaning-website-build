# SEO Audit: Rainwater & Shine Cleaning Co.

**Generated:** 2026-07-05
**Last Updated:** 2026-07-05 — All 🔴 and 🟠 code items completed (see §9)
**Site URL:** https://rainwatershine.com
**Stack:** Next.js 16 (App Router), Tailwind CSS v4, shadcn/ui, Supabase
**Target Keywords:** "Cleaners in West Point GA", "Cleaning service Auburn AL", "House cleaning LaGrange GA", "Commercial cleaning Columbus GA", "Cleaning service Opelika AL"
**Goal:** Rank #1 for cleaning services in West Point GA, Auburn AL; rank well in Columbus GA and LaGrange GA.

---

## Table of Contents

1. [Bugs & Abnormalities](#1-bugs--abnormalities)
2. [Technical SEO](#2-technical-seo)
3. [On-Page SEO Analysis](#3-on-page-seo-analysis)
4. [Structured Data (JSON-LD)](#4-structured-data-json-ld)
5. [Core Web Vitals & Performance](#5-core-web-vitals--performance)
6. [Content & Keyword Strategy](#6-content--keyword-strategy)
7. [Local SEO Review](#7-local-seo-review)
8. [Form Submissions & Webhook Review](#8-form-submissions--webhook-review)
9. [Prioritized Action Plan](#9-prioritized-action-plan)
10. [Page-by-Page Audit](#10-page-by-page-audit)

---

## 1. Bugs & Abnormalities

### 1.1 🔴 Incorrect Address in LocalBusiness Schema (ALL Location Pages) — ✅ Fixed

**File:** `app/locations/[city]/page.tsx`
**Function:** `buildSchema()`

```typescript
function buildSchema(area: typeof SERVICE_AREAS[0]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Main Street',  // PLACEHOLDER — wrong
      addressLocality: 'West Point',
      addressRegion: 'GA',
      postalCode: '31833',
      addressCountry: 'US',
    },
  }
}
```

This hardcodes "123 Main Street, West Point, GA 31833" for **every** city page — even Columbus GA, Auburn AL, etc. Google will flag the mismatch between the claimed address city and the `areaServed` cities.

**Fix:** Since this is a single-location business serving multiple cities, use the real address (`1409 4th Ave, West Point, GA 31833`) and keep `areaServed` for the other cities. Or remove the `address` field entirely and rely on `geo` + `areaServed`.

### 1.2 🔴 `images.unoptimized: true` in next.config.mjs

**File:** `next.config.mjs`

```javascript
images: { unoptimized: true },
```

Disables Next.js image optimization entirely — no WebP/AVIF, no responsive resizing, no compression. Hero image ships at full resolution → hurts LCP.

**Fix:** Remove `unoptimized: true`.

### 1.3 🔴 Footer Forces ALL Pages to be Dynamic (Kills SSG)

**File:** `components/footer.tsx`

```typescript
export async function Footer() {
  await headers()  // opts entire page tree out of static rendering
```

Every page uses `<Footer />` → every page is dynamically rendered per request. No static HTML for Googlebot to cache. TTFB suffers. Sitemap `lastModified: new Date()` is meaningless.

**Fix:**
```typescript
export function Footer() {
  return ( ... )
}
```

### 1.4 🟠 `typescript.ignoreBuildErrors: true`

Masks type errors in production. A broken page can deploy without warning.

**Fix:** Remove and fix actual TS errors.

### 1.5 🟠 No Open Graph Images

**File:** `app/layout.tsx` — `openGraph` and `twitter` objects missing `images`.

Social shares (Facebook, LinkedIn, iMessage, WhatsApp, Twitter) show a blank card.

**Fix:** Drop `app/opengraph-image.png` (1200×630px) in `app/` directory. Next.js auto-emits the tags.

### 1.6 🟠 Contact Email Uses Consulting Domain

**File:** `lib/constants.ts`

```typescript
export const OWNER_EMAIL = 'mj@dgconsulting.tech'
```

Visible in footer. Customers see a consulting domain email, not a `@rainwatershine.com` address.

**Fix:** Set up `hello@rainwatershine.com` or `info@rainwatershine.com`.

### 1.7 🟠 Quote & Book Pages Are Indexable (Wasted Crawl Budget)

**Files:** `app/quote/residential/page.tsx`, `app/book/page.tsx`

Form pages with no unique indexable content. Listed in sitemap with `priority: 0.8`. Google crawls these instead of content pages.

**Fix:** Add `robots: { index: false }` and remove from sitemap.

### 1.8 🟠 Sitemap `lastModified` Always Returns Current Date

Because footer forces dynamic rendering, `new Date()` runs per-request. Google sees every page as "modified today" — `lastmod` signal is useless.

**Fix:** Use a build-time constant date per page.

### 1.9 🟠 Root Layout Has No `canonical` URL

**File:** `app/layout.tsx` — missing `alternates: { canonical }`.

Only city pages set canonical URLs. Homepage, services, commercial, contact pages emit no `<link rel="canonical">`.

**Fix:** Add to root layout:
```typescript
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://rainwatershine.com',
  },
}
```

### 1.10 🟠 Fake Testimonial on City Pages

**File:** `app/locations/[city]/page.tsx`

```tsx
<p className="text-white text-xl font-bold mb-2">
  &ldquo;Best cleaning service in {area.city}!&rdquo;
</p>
```

This is a fabricated testimonial with no real customer behind it. If Google detects fabricated social proof it could erode trust.

**Fix:** Remove the hardcoded testimonial and star rating. Replace with a generic CTA like "See why local homeowners trust us" linking to your Google Business Profile once real reviews exist.

### 1.11 🟠 Hardcoded 5-Star Rating Without Real Reviews

The reviews section renders 5 filled star icons regardless of actual ratings. This is misleading.

**Fix:** Remove this section until real reviews are collected, or use actual `AggregateRating` data from your GBP.

---

## 2. Technical SEO

### 2.1 Crawlability

**robots.txt** (file: `app/robots.ts`) ✅
- `Allow: /` — good
- `Sitemap` points correctly
- AI crawler rules: ✅ Added (GPTBot disallowed; OAI-SearchBot, PerplexityBot, ClaudeBot allowed)
  ```typescript
  rules: [
    { userAgent: '*', allow: '/' },
    {
      userAgent: 'GPTBot',
      disallow: '/',
    },
    {
      userAgent: 'OAI-SearchBot',
      allow: '/',
    },
    { userAgent: 'PerplexityBot', allow: '/' },
    { userAgent: 'ClaudeBot', allow: '/' },
  ]
  ```

### 2.2 Sitemap

**File:** `app/sitemap.ts`

| Feature | Status |
|---------|--------|
| All core pages included | ✅ (13 URLs — quote/book removed) |
| Priorities assigned | ✅ Home=1.0, services/locations=0.9 |
| `lastModified` meaningful | ✅ Static build date (2026-07-05) |
| Quote/book removed | ✅ |
| Dynamic rendering issue | ✅ Fixed — footer is now sync, pages are static |

**Pages currently in sitemap:** `/`, `/services/residential`, `/services/commercial`, `/contact`, 5x service detail pages, 6x city pages.

**Missing from sitemap:** No blog, no FAQ, no about page.

### 2.3 URL Structure ✅

All clean, hyphenated, lowercase:
- `/services/residential/deep-cleaning`
- `/locations/west-point-ga`

**Missing:** City-specific service URLs like `/services/residential/deep-cleaning/west-point-ga`.

### 2.4 HTTPS & Security

`metadataBase` set to `https://rainwatershine.com` in layout.tsx ✅

---

## 3. On-Page SEO Analysis

### 3.1 Title Tags

| Page | Current Title | Issues |
|------|--------------|--------|
| Homepage | `Rainwater & Shine Cleaning Co. \| Spotless Results, Every Time` | No location keywords, no service keyword |
| Residential | `Residential Cleaning Services` | No location |
| Commercial | `Commercial Cleaning Services` | No location |
| Deep Cleaning | `Deep Cleaning \| Rainwater & Shine Cleaning Co.` | No location |
| West Point | `Cleaning Services in West Point, GA` | Good ✅ |
| Auburn | `Cleaning Services in Auburn, AL` | Good ✅ |
| Columbus | `Cleaning Services in Columbus, GA` | Good ✅ |
| Contact | `Contact Us` | Generic, no location |
| Book | `Book a Cleaning` | Should be `noindex` |
| Quote | `Free Residential Cleaning Quote` | Should be `noindex` |

**Recommended titles (50-60 chars, keyword-first):**
- **Homepage:** `House Cleaning in West Point GA & Auburn AL | Rainwater & Shine`
- **Commercial:** `Commercial Cleaning Columbus GA | Rainwater & Shine`
- **Residential:** `Residential Cleaning Service LaGrange GA | Rainwater & Shine`

### 3.2 Meta Descriptions

Generally good — include locations and phone. Could be improved with stronger CTAs.

### 3.3 Heading Structure

| Page | H1 | Issue |
|------|----|-------|
| Homepage | "A cleaner home, without the hassle." | Brand tagline, not keyword H1 |
| Residential | "Residential Cleaning Services" | Generic |
| Commercial | "Commercial Cleaning & Janitorial Services" | Acceptable |
| West Point | "Top-Rated Cleaning Services in West Point, GA" | Good ✅ |
| LaGrange | "Professional House Cleaning in LaGrange, GA" | Good ✅ |
| Columbus | "Expert Cleaning Services in Columbus, GA" | Good ✅ |
| Auburn | "Top Cleaning Services in Auburn, AL" | Good ✅ |
| Opelika | "Professional Cleaning Services in Opelika, AL" | Good ✅ |
| Contact | "Get in Touch" | Generic |

All pages have a single `<h1>` ✅. Sub-headings use logical hierarchy ✅.

### 3.4 Image SEO

**Hero image** (homepage):
```tsx
<Image
  src="/images/hero-cleaning.png"
  alt="Professional cleaner from Rainwater & Shine Cleaning Co. in a sparkling kitchen"
  fill
  priority
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```
✅ Descriptive alt text
✅ `priority` on LCP image
✅ `sizes` attribute
❌ `images.unoptimized: true` negates optimization

### 3.5 Internal Linking

✅ Footer links to all services and locations
✅ Nav links to all top-level sections
✅ City pages link to other cities
✅ Homepage links to services via ServiceCards

**Missing:**
- Breadcrumb JSON-LD schema
- Service pages don't link to city-specific service pages (they don't exist yet)
- City pages don't link to service type pages with keyword anchor text like "Deep Cleaning in Auburn"

---

## 4. Structured Data (JSON-LD)

### 4.1 Current Coverage

| Page | Schema | Type | Issues |
|------|--------|------|--------|
| Homepage | ✅ | `HouseCleaningService` | Missing telephone, image, openingHours, priceRange |
| City pages | ✅ | `LocalBusiness` | Wrong address (see bug 1.1) |
| Residential services | ❌ | — | Missing |
| Commercial page | ❌ | — | Missing |
| Service detail pages | ❌ | — | Missing |

### 4.2 Schema Priorities by Page

**Homepage — should include:**
```json
{
  "@context": "https://schema.org",
  "@type": "HouseCleaningService",
  "name": "Rainwater & Shine Cleaning Co.",
  "telephone": "(706) 350-0938",
  "url": "https://rainwatershine.com",
  "priceRange": "$$",
  "openingHours": "Mo-Sa 07:00-19:00",
  "areaServed": [
    { "@type": "City", "name": "West Point, GA" },
    { "@type": "City", "name": "LaGrange, GA" },
    { "@type": "City", "name": "Columbus, GA" },
    { "@type": "City", "name": "Auburn, AL" },
    { "@type": "City", "name": "Opelika, AL" }
  ]
}
```

**Service pages — add `Service` schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Deep Cleaning",
  "provider": { "@type": "LocalBusiness", "name": "Rainwater & Shine Cleaning Co." },
  "areaServed": ["West Point, GA", "Auburn, AL"],
  "description": "A thorough top-to-bottom reset...",
  "offers": { "@type": "Offer", "price": "220.00", "priceCurrency": "USD" }
}
```

**City pages — add `FAQPage` schema (once FAQ content exists):**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does house cleaning cost in West Point, GA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our standard cleaning starts at $80 and deep cleaning starts at $220. Get an instant online quote."
      }
    }
  ]
}
```

**Every page — add `BreadcrumbList` schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rainwatershine.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://rainwatershine.com/services/residential" },
    { "@type": "ListItem", "position": 3, "name": "Deep Cleaning" }
  ]
}
```

---

## 5. Core Web Vitals & Performance

### 5.1 Current Assessment

| Metric | Status | Risk |
|--------|--------|------|
| **LCP** | 🟡 Medium | Hero image now optimized via Next.js (WebP), but could benefit from `"use cache"` |
| **INP** | 🟡 Medium | `'use client'` components (header, forms) — depends on bundle size |
| **CLS** | 🟢 Low | Poppins `display: swap`, fixed image dimensions |
| **TTFB** | 🟡 Medium | Pages are now statically prerendered (was dynamic before footer fix) |

### 5.2 Specific Problems

1. ~~**No static generation** — Footer's `await headers()` prevents SSG on every page~~ ✅ Fixed
2. ~~**No image optimization** — `images.unoptimized: true`~~ ✅ Fixed
3. **No CDN HTML cache** — dynamic pages can't be edge-cached (mitigated by static generation now)
4. **`cacheComponents: true` is unused** — flag exists in next.config but no component uses `"use cache"`

### 5.3 Fix Plan (All Applied)

| Fix | LCP | TTFB | Status |
|-----|-----|------|--------|
| Remove `await headers()` from footer | 🟢 | 🟢 | ✅ |
| Remove `images.unoptimized` | 🟢 | 🟡 | ✅ |
| Add `"use cache"` to hero section | 🟡 | 🟢 | ⬜ Future |
| Use `next/font` (already done) | ✅ | ✅ | ✅ |

---

## 6. Content & Keyword Strategy

### 6.1 Target Keywords & Current Coverage

| Keyword | Search Intent | Current Page | Coverage |
|---------|--------------|-------------|----------|
| house cleaning West Point GA | Commercial | `/locations/west-point-ga` | 🟡 Template page, thin content |
| cleaners in West Point GA | Commercial | `/locations/west-point-ga` | 🟡 Template page |
| cleaning service Auburn AL | Commercial | `/locations/auburn-al` | 🟡 Template page |
| house cleaning LaGrange GA | Commercial | `/locations/lagrange-ga` | 🟡 Template page |
| commercial cleaning Columbus GA | Commercial | `/services/commercial` + `/locations/columbus-ga` | ❌ No combined page |
| deep cleaning West Point GA | Commercial | `/services/residential/deep-cleaning` | ❌ No city-service combo |
| move out cleaning Auburn AL | Commercial | `/services/residential/move-in-out` | ❌ No city-service combo |
| affordable house cleaning near me | Commercial | Homepage | 🟡 "near me" not in content |
| recurring maid service LaGrange GA | Commercial | `/services/residential/recurring-cleaning` | ❌ No city-service combo |

### 6.2 Content Gaps

**Critical: No blog / content marketing.** Google's ranking algorithm heavily weights topical authority. A cleaning company writing about cleaning in its target cities demonstrates E-E-A-T.

**Recommended content:**
1. **City landing pages** (exist — but need richer content, FAQ, testimonials)
2. **City-specific service pages** (do NOT exist — biggest gap)
3. **5-10 blog posts:**
   - "10 Tips for Keeping Your Home Clean in Columbus GA"
   - "Why Auburn AL Homeowners Choose Professional Cleaning"
   - "Move-Out Cleaning Guide for West Point GA Rentals"
   - "Commercial Cleaning for LaGrange GA Small Businesses"
4. **FAQ section** on each city page

### 6.3 Missing High-Value URLs

These should return 200 with unique content:

```
/services/commercial/west-point-ga
/services/commercial/columbus-ga
/services/commercial/auburn-al
/services/residential/deep-cleaning/west-point-ga
/services/residential/move-in-out/auburn-al
/blog/
/blog/house-cleaning-tips-west-point-ga
/blog/move-out-cleaning-guide-auburn-al
/blog/commercial-cleaning-columbus-ga
/about
/faq
```

### 6.4 Content Recommendations by City

**West Point, GA** (HQ — highest priority):
- Emphasize local ownership, family business
- Mention nearby landmarks (West Point Lake)
- Target: "West Point GA cleaners", "house cleaning West Point GA"

**Auburn, AL** (High priority):
- Emphasize student housing, rental turnover
- Mention Auburn University
- Target: "Auburn AL cleaning service", "move out cleaning Auburn"

**Columbus, GA** (Larger market, more competition):
- Emphasize commercial cleaning, offices
- Target: "commercial cleaning Columbus GA"

**LaGrange, GA**:
- Residential focus, families
- Target: "house cleaning LaGrange GA"

**Opelika, AL**:
- Pair with Auburn content as Auburn-Opelika metro
- Target: "cleaning service Opelika AL"

---

## 7. Local SEO Review

### 7.1 Google Business Profile

**This is the #1 ranking factor for local cleaning services.** Without a verified GBP with reviews, ranking for local queries is severely handicapped.

Checklist:
- [ ] Business name: "Rainwater & Shine Cleaning Co."
- [ ] Address: 1409 4th Ave, West Point, GA 31833
- [ ] Phone: (706) 350-0938
- [ ] Website: https://rainwatershine.com
- [ ] Categories: House Cleaning Service, Commercial Cleaning, Maid Service
- [ ] Service areas set (all target cities)
- [ ] Hours of operation
- [ ] Photos uploaded (at least 10-20)
- [ ] Reviews responded to
- [ ] Posts published regularly

### 7.2 Local Citations (NAP Consistency)

Name, Address, Phone must match exactly across all platforms:
- Google Business Profile
- Bing Places
- Yelp
- Facebook Business
- Chamber of Commerce
- Local directories

### 7.3 Review Strategy

Implement post-cleaning SMS/email asking for Google reviews. Even 5-10 real reviews with owner responses significantly improve local pack ranking.

### 7.4 Social Media

The business currently has no social media presence. This is not a ranking factor but helps with:
- Brand searches (trust signal)
- Referral traffic
- Local community awareness

---

## 8. Form Submissions & Webhook Review

### 8.1 Webhook Setup

**Status: ✅ Correctly configured**

`.env.development.local` contains:
```
WEBHOOK_URL='https://hook.us2.make.com/l0j3pxa9j6pxqdrsxhlyri6j9xpt8ncu'
```

### 8.2 How the Pipeline Works

```
User submits form
  ↓
Server Action (lib/actions.ts)
  1. Honeypot spam check
  2. Rate limiting (5 req/min per email)
  3. Server-side validation
  4. Inserts into Supabase table (quotes/bookings/contacts)
  5. POSTs to Make.com webhook with full payload
  ↓
Make.com scenario
  - Receives payload
  - Sends email notification to customer_email
  - Sends email copy to owner_email (mj@dgconsulting.tech)
```

### 8.3 Payload Structure

All three forms (quote, booking, contact) send `owner_email` and `customer_email` so Make.com can CC both parties:

```typescript
{
  form_type: 'quote' | 'booking' | 'contact',
  business_name: 'Rainwater & Shine Cleaning Co.',
  customer_name: string,
  customer_email: string,
  owner_email: 'mj@dgconsulting.tech',
  // ... form-specific fields
  submitted_at: ISO timestamp,
}
```

### 8.4 Observations

- ✅ Honeypot field (`_hp`) on all forms
- ✅ Rate limiting prevents abuse
- ✅ Server-side validation on required fields
- ✅ Webhook fails gracefully (logs error, continues)
- ✅ All major form fields included in webhook payload

**Issues:**
- 🟠 No webhook retry logic (if Make.com is down, the submission is logged to console but no retry)
- 🟠 No fallback email if both webhook AND Supabase fail
- 🟠 `WEBHOOK_URL` is only in `.env.development.local` — must be set in Vercel production env vars

### 8.5 Vercel Production Environment

Check that the following env vars are set in Vercel project settings:

| Variable | Required | Notes |
|----------|----------|-------|
| `WEBHOOK_URL` | ✅ | Same URL as dev |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | |

---

## 9. Prioritized Action Plan

### ✅ Completed (2026-07-05)

| # | File | Change | Status |
|---|------|--------|--------|
| 1 | `app/locations/[city]/page.tsx` | Replaced "123 Main Street" with `1409 4th Ave, West Point, GA 31833` | ✅ |
| 2 | `app/locations/[city]/page.tsx` | Removed fake testimonial and hardcoded 5-star rating; replaced with generic CTA | ✅ |
| 3 | `components/footer.tsx` | Removed `await headers()`, dropped `async`, hardcoded copyright year to 2026 | ✅ |
| 4 | `next.config.mjs` | Removed `images.unoptimized: true` and `typescript.ignoreBuildErrors: true` | ✅ |
| 5 | `app/quote/residential/page.tsx`, `app/book/page.tsx` | Added `robots: { index: false }` | ✅ |
| 6 | `app/sitemap.ts` | Removed quote/book URLs; used `const LAST_MOD = new Date('2026-07-05')` | ✅ |
| 7 | — | Google Business Profile (manual task — not yet done) | ⬜ |
| 8 | `app/opengraph-image.tsx` | Created OG image via Next.js `ImageResponse` | ✅ |
| 9 | `app/layout.tsx` | Added `alternates: { canonical: 'https://rainwatershine.com' }` | ✅ |
| 10 | `app/layout.tsx` | Added `openGraph.images` and `twitter.images` | ✅ |
| 11 | `app/page.tsx` | Rewrote title to `House Cleaning in West Point GA & Auburn AL` | ✅ |
| 12 | `app/page.tsx` | Updated H1 to include "House Cleaning Service in West Point & Auburn" | ✅ |
| 13 | `app/services/residential/page.tsx` | Added location keywords to title/metadesc | ✅ |
| 14 | `app/services/commercial/page.tsx` | Added location keywords to title/metadesc | ✅ |
| 15 | `app/services/residential/page.tsx` | Added `Service` JSON-LD with areaServed | ✅ |
| 16 | `app/services/commercial/page.tsx` | Added `Service` JSON-LD with areaServed | ✅ |
| 17 | — | Contact email change (requires MX set up — manual task) | ⬜ |
| 18 | `components/breadcrumb-schema.tsx` | Created reusable `BreadcrumbJsonLd` component | ✅ |
| 19 | — | City FAQ content (recommended for later) | ⬜ |
| 20 | — | Google Maps embed (recommended for later) | ⬜ |
| 21 | — | FAQ page (recommended for later) | ⬜ |
| 22 | — | About page (recommended for later) | ⬜ |
| 23 | `app/services/residential/[slug]/page.tsx` | Added `Service` JSON-LD with offers pricing | ✅ |
| 24 | `next.config.mjs` | Removed `typescript.ignoreBuildErrors`, fixed 6 TS type errors in booking-form + quote-wizard | ✅ |
| 25 | `app/robots.ts` | Added AI crawler rules (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot) | ✅ |
| 26 | `app/page.tsx` | Updated `localBusinessSchema` — added `telephone`, `image`, `openingHours` | ✅ |
| 27 | `app/locations/[city]/page.tsx` | Added `BreadcrumbJsonLd` to city pages | ✅ |
| 28 | `app/services/residential/[slug]/page.tsx` | Added `BreadcrumbJsonLd` to service detail pages | ✅ |

### 🟢 Remaining (manual / content tasks)

| # | Task | Effort | Notes |
|---|------|--------|-------|
| 29 | Google Business Profile | 1 hr | Verify and complete profile with NAP |
| 30 | Set up `hello@rainwatershine.com` | 1 hr | Requires MX record + email hosting |
| 31 | Set WEBHOOK_URL in Vercel production env vars | 5 min | |
| 32 | Install GSC + GA4 and submit sitemap | 30 min | |
| 33 | Blog with city-specific cleaning content | Ongoing | Build topical authority |
| 34 | City-specific service pages | 2 days | e.g. `/services/residential/deep-cleaning/west-point-ga` |
| 35 | Implement post-cleaning review generation | 1 day | SMS/email asking for Google reviews |
| 36 | Build local citations | 2 days | Yelp, Bing Places, Chamber of Commerce |

---

## 10. Page-by-Page Audit (Post-Fix)

### Homepage (`/`)
- **Title:** ✅ `House Cleaning in West Point GA & Auburn AL | Rainwater & Shine`
- **H1:** ✅ `House Cleaning Service in West Point & Auburn` (keyword-rich)
- **Meta desc:** ✅ Includes locations + phone
- **Schema:** ✅ `HouseCleaningService` — telephone, hours, image, priceRange all set
- **OG:** ✅ Image via `opengraph-image.tsx`
- **Canonical:** ✅ Set in root layout
- **LCP:** ✅ Image optimization enabled (removed `unoptimized`)

### Residential Services (`/services/residential`)
- **Title:** ✅ `Residential Cleaning Services in West Point GA & Auburn AL`
- **H1:** 🟡 Still generic "Residential Cleaning Services" (acceptable for listing page)
- **Schema:** ✅ Added `Service` JSON-LD with areaServed

### Commercial (`/services/commercial`)
- **Title:** ✅ `Commercial Cleaning Columbus GA & West Point GA`
- **H1:** 🟡 Still generic "Commercial Cleaning & Janitorial Services"
- **Schema:** ✅ Added `Service` JSON-LD with areaServed

### Location Pages (`/locations/[city]`)
- **Title:** ✅ `Cleaning Services in {City}, {State}`
- **H1:** ✅ City-focused headings
- **Schema:** ✅ Real address `1409 4th Ave, West Point, GA 31833`
- **Breadcrumb:** ✅ `BreadcrumbJsonLd` component added
- **Testimonial:** ✅ Removed fake content, replaced with generic CTA

### Service Detail (`/services/residential/[slug]`)
- **Title:** ✅ `{Service Name} | Rainwater & Shine Cleaning Co.`
- **H1:** ✅ Service name
- **Schema:** ✅ `Service` JSON-LD with offers pricing
- **Breadcrumb:** ✅ `BreadcrumbJsonLd` component added
- **Content:** 🟡 Still basic — no city references, no FAQ (future work)

### Contact (`/contact`)
- **Title:** ❌ Still `Contact Us` — no location (minor)
- **Schema:** ❌ Still missing (minor)

### Quote (`/quote/residential`)
- **Robots:** ✅ `noindex` added

### Book (`/book`)
- **Robots:** ✅ `noindex` added

---

## Appendix: Key Source Files

### `lib/constants.ts`

```typescript
export const SITE_NAME = 'Rainwater & Shine Cleaning Co.'
export const SITE_TAGLINE = 'Spotless Results, Every Time'
export const SITE_URL = 'https://rainwatershine.com'
export const SITE_PHONE = '(706) 350-0938'
export const SITE_ADDRESS = '1409 4th Ave, West Point, GA 31833'
export const OWNER_EMAIL = 'mj@dgconsulting.tech'
export const CONTACT_EMAIL = OWNER_EMAIL

export const SERVICE_AREAS = [
  { city: 'West Point', state: 'GA', slug: 'west-point-ga', lat: 32.8777, lng: -85.1833 },
  { city: 'LaGrange',   state: 'GA', slug: 'lagrange-ga',   lat: 33.0393, lng: -85.031 },
  { city: 'Franklin',   state: 'GA', slug: 'franklin-ga',   lat: 33.2818, lng: -85.0988 },
  { city: 'Columbus',   state: 'GA', slug: 'columbus-ga',   lat: 32.461,  lng: -84.9877 },
  { city: 'Opelika',    state: 'AL', slug: 'opelika-al',    lat: 32.6451, lng: -85.3783 },
  { city: 'Auburn',     state: 'AL', slug: 'auburn-al',     lat: 32.6099, lng: -85.4808 },
]

export const RESIDENTIAL_SERVICES = [
  { slug: 'standard-cleaning', name: 'Standard Cleaning', description: '...', icon: 'Sparkles', base: 80 },
  { slug: 'deep-cleaning', name: 'Deep Cleaning', description: '...', icon: 'Brush', base: 220 },
  { slug: 'move-in-out', name: 'Move-In / Move-Out', description: '...', icon: 'Home', base: 250 },
  { slug: 'recurring-cleaning', name: 'Recurring Cleaning', description: '...', icon: 'CalendarCheck', base: 100 },
  { slug: 'special-event', name: 'Special Event', description: '...', icon: 'PartyPopper', base: 175 },
]
```

### `next.config.mjs`

```javascript
const nextConfig = {
  cacheComponents: true,
}
```

### Form Submission Pipeline

All three forms (quote, booking, contact) follow this flow:
1. Client-side validation → Server Action
2. Honeypot spam check
3. Rate limiting (5/min per email)
4. Supabase DB insert
5. Make.com webhook POST (sends copy to customer + owner)

**Webhook URL:** Set in env var `WEBHOOK_URL` — currently configured only in `.env.development.local`. Must be added to Vercel production environment variables.

---

## Installed SEO Skills

| Skill | Path | Scope |
|-------|------|-------|
| **SEO (addyosmani)** | `~/.agents/skills/seo` | Technical SEO, on-page, structured data, mobile |
| **Core Web Vitals (addyosmani)** | `~/.agents/skills/core-web-vitals` | LCP, INP, CLS optimization |
| **Next.js SEO** | `~/.agents/skills/nextjs-seo` | Metadata API, sitemaps, App Router patterns |
| **SEO Audit (coreyhaines31)** | `~/.agents/skills/seo-audit` | Comprehensive auditing framework |
| **AI SEO (coreyhaines31)** | `~/.agents/skills/ai-seo` | AI search visibility (ChatGPT, Perplexity...) |
