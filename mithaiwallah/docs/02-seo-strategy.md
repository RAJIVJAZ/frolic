# 02 · SEO Strategy

Goal: be the first premium result for **gifting-intent** mithai searches in Uttar Pradesh within 6 months, and rank nationally for **corporate** and **wedding** gifting terms within 12.

> Search volumes are not quoted here on purpose. Validate each keyword in **Google Keyword Planner** and, after launch, in **Search Console** — real impressions beat any third-party estimate.

---

## 1. Keyword → page map

Every target keyword has exactly one page that owns it. Two pages chasing one phrase split the ranking.

| Target keyword | Intent | Owning page | Also supports |
|---|---|---|---|
| **Premium Indian Sweets** | Commercial | `/` (home) · `/sweets` | Journal "Know Your Mithai" |
| **Corporate Gifting India** | Commercial, B2B | `/corporate-gifting` (H1 eyebrow + title + meta) | `/brochure/corporate`, Diwali guide post |
| **Wedding Gift Hampers** | Commercial | `/wedding-gifting` | Wedding boxes guide post |
| **Luxury Mithai Boxes** | Commercial | `/` Signature Gift Boxes section · `/festive-hampers` | `/corporate-gifting` collections |
| **Milk Cake Manufacturer** | B2B | `/sweets/milk-cake` ("Milk Cake manufacturer & bulk supplier" H2) | `/wholesale` |
| **Kalakand Manufacturer** | B2B | `/sweets/kalakand` (same H2 pattern) | `/wholesale` |
| **Bulk Sweet Supplier** | B2B | `/wholesale` | Every product page's bulk block |
| **Custom Gift Boxes** | Commercial | `/corporate-gifting` (Customisation section) | `/wedding-gifting` Personalise section |
| **Festive Gift Hampers** | Seasonal | `/festive-hampers` | Festival journal posts |
| **Wholesale Mithai Supplier** | B2B | `/wholesale` (title + H1 context) | `/franchise#distributors` |

### Secondary & long-tail (build over 12 months)

- *sweets shop Prayagraj*, *mithai Prayagraj*, *best milk cake in Prayagraj* → home + Google Business Profile
- *Diwali corporate gifts for employees*, *corporate Diwali gift boxes with logo* → `/corporate-gifting` + journal
- *return gifts for wedding guests*, *mithai box for wedding invitation* → `/wedding-gifting` + journal
- *private label sweets manufacturer*, *sweets manufacturer in UP* → `/wholesale#private-label`
- *peda online*, *kunda sweet*, *malai barfi with silver varq*, *Bikaneri cake* → product pages
- *milk cake vs kalakand*, *how long does milk cake last* → journal (informational → internal links to products)

---

## 2. On-page structure

| Element | Pattern | Example |
|---|---|---|
| Title | `Primary keyword — benefit \| Mithaiwallah` (≤ 60 chars before the brand) | *Corporate Gifting India — Branded Luxury Mithai Boxes \| Mithaiwallah* |
| Meta description | 140–160 chars; keyword + proof + place + action | see `pageMeta()` calls in each `app/**/page.tsx` |
| H1 | One per page, human and emotional; keyword in eyebrow/title/intro | *Corporate gifts people actually look forward to.* |
| URL | Short, lowercase, hyphenated, no dates | `/sweets/milk-cake`, `/journal/milk-cake-vs-kalakand` |
| Canonical | Absolute, self-referencing, from `NEXT_PUBLIC_SITE_URL` | `lib/seo.ts → pageMeta()` |
| Images | Descriptive `alt` naming the sweet and setting; WebP/AVIF via `next/image` | *"Milk cake, plated"* |
| Internal links | Every product ↔ gifting pages ↔ wholesale; every post links to its commercial page | CTA band at the end of each post |

### Site architecture

```
/                           Home — brand, collection, gifting, trust, enquiry
├── /sweets                 Collection hub (dedicated section per sweet)
│   └── /sweets/[slug]      6 product pages — story, ingredients, serving, bulk, FAQ
├── /corporate-gifting      Corporate landing page (B2B)
├── /wedding-gifting        Wedding landing page
├── /festive-hampers        Seasonal landing page + festival calendar
├── /wholesale              HoReCa · retail · #private-label · #export
├── /franchise              Franchise + #distributors
├── /manufacturing          Process, pillars, standards
├── /about                  Story & values
├── /contact                All channels + enquiry form
├── /journal                Blog hub
│   └── /journal/[slug]     Articles
├── /brochure/corporate     Printable catalogue (noindex)
├── /brochure/wedding       Printable catalogue (noindex)
└── /privacy
```

---

## 3. Schema markup (implemented)

| Page | Types | Source |
|---|---|---|
| All pages | `Organization` (logo, sameAs, contactPoint, address, FSSAI identifier when set) | `app/layout.tsx` |
| Home, Contact | `FoodEstablishment` (LocalBusiness), `WebSite` | `localBusinessSchema()`, `websiteSchema()` |
| Product pages | `Product` (brand, manufacturer, material, countryOfOrigin), `FAQPage`, `BreadcrumbList` | `productSchema()` |
| Collection | `ItemList`, `BreadcrumbList` | `app/sweets/page.tsx` |
| Gifting & wholesale pages | `Service` (areaServed India), `FAQPage`, `BreadcrumbList` | `serviceSchema()`, `<Faq>` |
| Journal posts | `Article`, `BreadcrumbList` | `articleSchema()` |

Deliberate omissions:
- **No `offers` / price** on products — prices are quoted. Google will not show price rich results; that is the trade-off for not publishing a list price B2B buyers anchor on.
- **No `AggregateRating` / `Review`** until there are real, verifiable reviews. Marking up invented reviews violates Google's review-snippet policy and India's Consumer Protection (E-Commerce) Rules; the testimonials section is labelled illustrative until replaced.
- **FAQ rich results** are now shown mainly for authoritative government and health sites, so FAQ schema here is for machine understanding (and AI answers), not SERP real estate.

Validate every template in the **Rich Results Test** and **Schema Markup Validator** after deployment.

---

## 4. Local SEO

### Google Business Profile (do this in week 1)

1. Claim the profile for the **production/retail address in Prayagraj**. The name must be exactly **Mithaiwallah** — no keyword stuffing ("Mithaiwallah Best Sweets Prayagraj" gets suspended).
2. **Primary category:** *Indian sweets shop*. **Secondary:** *Confectionery store*, *Gift basket store*, *Corporate gift supplier*, *Food manufacturer*, *Wholesale food store* (choose only those that are true).
3. NAP (name, address, phone) **identical** on the site footer, schema (`CONTACT` in `lib/business.ts`), GBP, Justdial, IndiaMART and every directory.
4. Hours, WhatsApp chat, website link with UTM (`?utm_source=google&utm_medium=gbp`), products (the six sweets, with photos), services (corporate gifting, wedding gifting, wholesale, private label).
5. 20+ real photos at launch — kitchen, team, products, packaging, storefront — then 3–5 new photos a week.
6. **Posts** weekly (offers, festival updates) — reuse the week's best Instagram post.
7. **Reviews:** ask every satisfied customer with a short link (QR on the thank-you card inside every box, WhatsApp follow-up 3 days after delivery). Reply to every review within 48 hours. Never incentivise reviews or post your own.
8. Q&A: seed the five most-asked questions (delivery areas, minimum order, customisation, shelf life, tasting) and answer them.

### Citations & B2B directories

| Platform | Why |
|---|---|
| Justdial, Sulekha | Local discovery in UP |
| **IndiaMART, TradeIndia** | Ranks for *"… manufacturer"* and *"… wholesale supplier"* queries; generates B2B leads directly |
| Swiggy / Zomato (retail listing) | Local visibility, brand searches |
| Wedding directories (WedMeGood, WeddingWire India) | Wedding-gifting vendor listings |
| Facebook page, Instagram, YouTube | `sameAs` in schema; brand SERP |

### City pages (month 7+, only with substance)

Create `/corporate-gifting/lucknow`, `/corporate-gifting/noida`, `/wedding-gifting/varanasi` **only** when there are real deliveries, a client or planner quote, and local specifics (delivery times, venues served) for that city. Thin city pages that swap the city name are doorway pages and get devalued.

---

## 5. Blog structure

**Categories:** Know Your Mithai · Corporate Gifting · Weddings · Festivals · Behind the Kitchen

Each post: one search intent, 800–1,500 words, a table or checklist (featured-snippet bait), 2–3 internal links to commercial pages, a CTA band, `Article` schema. Posts live in `lib/journal.ts` (move to a CMS once publishing weekly).

### Published at launch

1. Milk Cake vs Kalakand: What Is the Difference? — *milk cake vs kalakand*
2. The Corporate Diwali Gifting Guide — *corporate diwali gifting*
3. Wedding Mithai Boxes: How Many to Order — *wedding mithai boxes*

### 12-month editorial plan (2 posts a month)

| Month | Post | Target query | Links to |
|---|---|---|---|
| Oct | Diwali Gift Hampers: 12 Ideas by Budget | diwali gift hampers | /festive-hampers |
| Oct | How Long Do Indian Sweets Last? A Shelf-Life Guide | how long do sweets last | /sweets |
| Nov | Bhai Dooj & Diwali Sweets Etiquette | diwali sweets | /festive-hampers |
| Nov | Client Gifts That Aren't Diaries: New Year Ideas | new year corporate gifts | /corporate-gifting |
| Dec | Wedding Return Gifts Guests Actually Keep | wedding return gifts ideas | /wedding-gifting |
| Dec | What Is Kunda? The Dark Milk Sweet Explained | kunda sweet | /sweets/kunda |
| Jan | Employee Appreciation Gifts Under ₹1,000 | employee gifts | /corporate-gifting |
| Jan | Makar Sankranti Sweets and Their Stories | sankranti sweets | /festive-hampers |
| Feb | Silver Varq: Is It Safe and How Is It Made? | silver varq | /sweets/malai-barfi |
| Feb | Wedding Invitation Boxes: A Planner's Guide | wedding invitation box | /wedding-gifting |
| Mar | Holi Gifting Ideas for Teams | holi corporate gifts | /corporate-gifting |
| Mar | Peda: From Temple Prasad to Gift Box | peda sweet | /sweets/peda |
| Apr | How to Choose a Private-Label Sweets Manufacturer | private label sweets | /wholesale#private-label |
| Apr | Sweets for Hotels: Buffet and Turndown Programmes | sweets supplier for hotels | /wholesale#horeca |
| May | Summer Storage: Keeping Milk Sweets Fresh | how to store milk sweets | /sweets |
| May | Behind the Kitchen: A Day with Our Halwais | — (brand) | /manufacturing |
| Jun | Starting a Sweets Distributorship in UP | sweets distributorship | /franchise |
| Jun | Destination-Wedding Hampers: Logistics Guide | destination wedding hampers | /wedding-gifting |
| Jul | Raksha Bandhan Gifts to Send Across India | rakhi sweets delivery | /festive-hampers |
| Jul | Planning Diwali Gifting in July (Yes, July) | diwali corporate gifting planning | /corporate-gifting |
| Aug | Janmashtami Sweets: Why Peda and Makhan Mishri | janmashtami sweets | /sweets/peda |
| Aug | Corporate Gifting Budget Calculator | corporate gift budget per employee | /corporate-gifting |
| Sep | The Bikaneri Cake Story | bikaneri cake | /sweets/bikaneri-cake |
| Sep | Diwali 2027 Corporate Gifting: Early-Bird Guide | diwali corporate gifts 2027 | /corporate-gifting |

---

## 6. Technical SEO

- **Static by default:** every page except `/api` and `/admin` is prerendered; the home page revalidates hourly (Instagram feed). Fast TTFB on any host.
- **Core Web Vitals:** fonts self-hosted via `next/font` (no CLS), SVG illustrations instead of heavy images until photography exists, Framer Motion loaded lazily (`LazyMotion`), no third-party scripts at launch. Target LCP < 2.0 s on 4G, CLS < 0.05, INP < 200 ms. When photography arrives: `next/image` with AVIF/WebP and `priority` only on the hero.
- `sitemap.xml` and `robots.txt` generated (`app/sitemap.ts`, `app/robots.ts`); `/admin` and `/api` disallowed; brochures `noindex`.
- Open Graph images generated per page type (`opengraph-image.tsx`) — every shared link on WhatsApp shows a branded card.
- `lang="en-IN"`, `og:locale en_IN`. A Hindi version (`/hi/…` with `hreflang`) is a month 9+ project, worth it for UP search behaviour.
- Content renders without JavaScript (forms need JS to submit; WhatsApp and phone links do not).

---

## 7. Measurement

| Tool | Set up | Watch |
|---|---|---|
| Google Search Console | Verify domain, submit sitemap | Impressions/clicks per target keyword; pages indexed; CWV |
| GA4 (via GTM) | `generate_lead` event already pushed to `dataLayer` by the form, with `lead_type` | Leads by landing page, source, device |
| Lead dashboard `/admin/leads` | Supabase + Basic Auth | Leads by type, priority, status, UTM source; win rate |
| Looker Studio | GSC + GA4 + Supabase (CSV export) | Monthly SEO report |

**Monthly SEO review:** top 20 queries, pages gaining/losing, new keyword opportunities from GSC, one page to improve, one post to write.
