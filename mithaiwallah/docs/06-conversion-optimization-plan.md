# 06 · Conversion Optimisation Plan

The site's job is not to be admired — it is to turn a visitor into a **conversation** (form or WhatsApp). This plan lists what is built to do that, how to measure it, and the tests to run in order.

---

## 1. Conversion goals

| Goal | Event | Where it fires |
|---|---|---|
| **Primary:** enquiry submitted | `generate_lead` (dataLayer, with `lead_type`) + row in `mithaiwallah_leads` | Enquiry form |
| **Primary:** WhatsApp started | Outbound click to `wa.me` | Floating button, mobile bar, product pages, thank-you screen |
| Secondary: call tapped | Click on `tel:` | Mobile bar, contact page, footer |
| Secondary: catalogue viewed / PDF downloaded | Page view `/brochure/*`, click on PDF | Gifting pages, thank-you screen |
| Micro: product explored | Tab change in the collection showcase, product page view | Home, /sweets |

Set these up in **Google Tag Manager** on day one: GA4 events for all five, plus Meta Pixel `Lead` on `generate_lead` if running Meta ads.

---

## 2. What is built in (✅)

### Clarity above the fold
- ✅ One headline, one sub-line, **two CTAs** that match the two big intents: *Explore Collection* (browse) and *Request Custom Gift Box* (buy).
- ✅ Trust strip under the hero: pure milk solids · premium dry fruits · custom branding · pan-India delivery.
- ✅ Seasonal announcement bar pointing at the highest-value action this month (Diwali corporate booking).

### Routing each visitor to their page
- ✅ "Who We Serve" grid — ten audiences, ten doors, each landing on the page written for them.
- ✅ Dedicated landing pages for corporate, wedding, wholesale, franchise, festive — each with its own form locked to that enquiry type, its own FAQ and its own proof.

### Friction removed from the form
- ✅ Phone is the only required contact field (India converts on phone and WhatsApp, not email).
- ✅ Dropdowns instead of free text for quantity, budget, dates, branding — faster on mobile, cleaner data for sales.
- ✅ Deep links pre-fill type, product and collection (`/contact?type=corporate&collection=The%20Royal%20Trunk`).
- ✅ Clear consent, separate optional marketing opt-in (trust signal *and* DPDP compliance).
- ✅ Errors in plain language; submit button states; bot protection without CAPTCHA (honeypot + rate limit).

### Momentum after the form
- ✅ Thank-you screen with a **reference number**, a promise ("within one working day"), **Continue on WhatsApp** pre-filled with the enquiry, and the matching **catalogue**.

### Mobile-first
- ✅ Sticky **thumb bar**: WhatsApp · Call · Get a quote — always one tap away.
- ✅ Full-screen menu with a primary CTA and WhatsApp at thumb height.
- ✅ Sweet picker scrolls horizontally; forms are single-column; tap targets ≥ 44 px.
- ✅ No heavy media until real photography exists; SVG illustrations load instantly on 4G.

### Trust
- ✅ Manufacturing section and page (process, pillars, standards), FAQ on every commercial page, printable catalogues, visible contact details and hours, FSSAI licence in the footer once filled in.
- ⚠️ Testimonials are **labelled illustrative** until real ones exist — real, named (with consent) client quotes are the single biggest trust upgrade available. Get three before launch if at all possible.

---

## 3. Measurement baseline (first 4 weeks)

| Metric | How | Healthy early target |
|---|---|---|
| Visit → lead (form or WhatsApp) | GA4 conversions ÷ sessions | 2–4% overall; 5–8% on gifting pages |
| Form start → submit | GA4 `form_start` vs `generate_lead` | > 45% |
| Mobile share of leads | GA4 device | Expect 70%+ — design for it |
| WhatsApp : form ratio | Click events vs leads | Tells you which channel to optimise |
| Hot lead share | Dashboard | > 25% means targeting is right |
| Lead → quote → won | Dashboard statuses | Track by `lead_type` and `utm_source` |

Add **Microsoft Clarity** (free) for heatmaps and session recordings — watch 20 mobile sessions on the corporate page in week 2 before changing anything.

---

## 4. Test backlog (in priority order)

Run one test at a time per page; A/B only when a page has ~1,000+ sessions/month, otherwise make the change and compare month-on-month.

| # | Page | Hypothesis | Change | Metric |
|---|---|---|---|---|
| 1 | Corporate | Buyers need a number to start the conversation | Add "From ₹[x] per box" under each collection (once pricing is set) | Lead rate |
| 2 | Corporate | Social proof from recognisable clients converts HR | Logo strip of real clients (with permission) under the hero | Lead rate |
| 3 | All | WhatsApp is preferred to forms on mobile | Make "Chat on WhatsApp" the primary CTA on mobile heroes | WhatsApp starts + leads |
| 4 | Wedding | Couples plan visually | Gallery of real weddings (with consent) above the form | Scroll depth, lead rate |
| 5 | Form | Fewer fields → more submissions | Hide budget/branding behind "Add details (optional)" | Start → submit |
| 6 | Home | A gated catalogue captures earlier-stage buyers | "Get the 2027 corporate catalogue" (phone + company) as a softer CTA | Leads (cold → nurture) |
| 7 | Product | Retail buyers want to order now | Show retail box prices + "Order on WhatsApp" as the primary CTA | WhatsApp starts |
| 8 | Corporate | Deadlines drive action | Countdown to the branded-order cut-off in Diwali season | Lead rate in Sept–Oct |
| 9 | Wedding | A tool beats a paragraph | "How many boxes do I need?" calculator (households → boxes) | Engagement, lead rate |
| 10 | Exit intent (desktop) | A last offer saves some bounces | "Get the catalogue on WhatsApp" modal on corporate/wedding only | Leads |

---

## 5. Seasonal conversion calendar

| Window | Focus | On-site change |
|---|---|---|
| Jul–Sep | Corporate Diwali planning | Announcement bar + home hero secondary CTA → corporate; early-bird messaging |
| Oct–early Nov | Diwali execution | Order cut-off dates everywhere; festive hampers promoted; WhatsApp staffed longer hours |
| Nov–Feb | Wedding season | Wedding section moves above corporate on home; wedding catalogue promoted |
| Dec | Year-end corporate | New Year client gifting |
| Mar | Holi | Festive hampers |
| Aug | Raksha Bandhan | Pan-India rakhi hampers; shipping cut-offs |

All of these are one-line changes: `ANNOUNCEMENT` in `lib/business.ts`, and the section order in `app/page.tsx`.

---

## 6. Monthly CRO review

1. Leads by page, type, source and device (dashboard + GA4).
2. Five Clarity recordings of visitors who *didn't* convert on the top landing page.
3. Sales team feedback: which questions came up on every call? Answer them on the page.
4. Lost-reason tally from the dashboard notes.
5. Pick one test from the backlog; write down the hypothesis and the date you will judge it.
