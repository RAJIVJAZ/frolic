# 09 · Launch Checklist

Everything below is either a **fact only the business can supply** or an **account only the business can open**. The site hides unconfirmed facts rather than inventing them — but it cannot launch until they are real.

## Business facts — `lib/business.ts`

- [ ] **Logo**: final file in `public/brand/`, `BRAND.logo` set (nav, footer, brochures and schema switch automatically)
- [ ] **WhatsApp Business number**: `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits with country code, e.g. `919876543210`)
- [ ] **Phone**: `NEXT_PUBLIC_PHONE_NUMBER`
- [ ] **Email inboxes** in `CONTACT` exist and are monitored (`hello@…`, `gifting@…`) — or change them
- [ ] **Domain**: `NEXT_PUBLIC_SITE_URL` set to the real domain (canonical URLs, sitemap, OG images depend on it)
- [ ] **Street address + PIN code**, identical to the Google Business Profile; `CONTACT.mapsUrl`
- [ ] **Opening hours** confirmed (`CONTACT.hours`, `hoursSchema`)
- [ ] **FSSAI licence number** (`COMPLIANCE.fssaiLicence`) — legally required on a food business website — and **GSTIN**
- [ ] **Commercial terms** (`TERMS`): minimum boxes, lead times, delivery coverage — as production can hold them in Diwali week
- [ ] **Announcement bar** (`ANNOUNCEMENT`) reflects the current season

## Product truth — `lib/products.ts`

- [ ] Every **ingredient list** checked against the production recipe card (FSSAI: the listing must match the label)
- [ ] **Allergens** correct for each sweet
- [ ] **Shelf life** per product confirmed (ideally by lab testing for the ones sold nationally)
- [ ] **Bikaneri Cake** description confirmed — the copy describes a dense, dry-fruit-layered milk cake; correct it if Mithaiwallah's version differs
- [ ] Formats (box sizes) match what is actually packed

## Claims to confirm

- [ ] Manufacturing statements (`components/sections/Manufacturing.tsx`, `app/manufacturing/page.tsx`): milk checks on arrival, separate zones, batch codes, food-grade trays
- [ ] FAQ answers: GST invoicing, tastings in Prayagraj, sample boxes, venue delivery, pan-India delivery (`app/corporate-gifting`, `app/wedding-gifting`, `app/wholesale`)
- [ ] Franchise and distributor pages describe what is really on offer; the "expression of interest" disclaimer stays until a franchise agreement exists
- [ ] Privacy notice (`app/privacy/page.tsx`) reviewed by counsel; retention period confirmed

## Proof

- [ ] **Testimonials** in `lib/testimonials.ts` replaced with real clients' words, with written consent to publish their name/company; set `sample: false` (the "illustrative" label disappears automatically)
- [ ] **Photography & hero film** delivered (doc 10); `photo` set per product; `BRAND.heroVideo` set
- [ ] Brochure PDFs regenerated after all of the above (`npm run brochures`)

## Accounts & integrations

- [ ] Supabase: `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` on the host (table + RLS already created in project `service`)
- [ ] Dashboard: `SUPABASE_SECRET_KEY`, `ADMIN_USER`, `ADMIN_PASSWORD` — strong password, shared only with sales
- [ ] CRM / automation: `LEAD_WEBHOOK_URL`, `LEAD_WEBHOOK_SECRET` (doc 05 §6)
- [ ] Instagram **@mithaiwallahofficial** claimed (Business account); `INSTAGRAM_ACCESS_TOKEN` + monthly refresh job
- [ ] Facebook page and YouTube channel claimed with the same handle (URLs in `SOCIAL`)
- [ ] Google Business Profile verified; Search Console verified; sitemap submitted
- [ ] Google Tag Manager with GA4 (`generate_lead`) and, if advertising, Meta Pixel
- [ ] Trademark search done (doc 01 §4)

## Pre-flight

- [ ] Submit a test enquiry of every type on the live domain; see each in `/admin/leads` and at the webhook; then delete them
- [ ] Tap every WhatsApp and phone button on a real phone
- [ ] Rich Results Test on home, a product page, the corporate page and a journal post
- [ ] Lighthouse mobile ≥ 90 performance, 100 accessibility on the home page
- [ ] Share the home page and a product page on WhatsApp — branded preview card appears
