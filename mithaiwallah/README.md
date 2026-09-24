# Mithaiwallah

**Handcrafted Traditions. Crafted for Celebrations.**
The website and digital launch kit for Mithaiwallah, a premium Indian sweets and gifting brand from Prayagraj: signature sweets, corporate gifting, wedding hampers, wholesale and private label.

A self-contained Next.js app. It lives beside the FROLIC site in this repository and shares no code with it.

---

## Quick start

```bash
cd mithaiwallah
npm install
npm run dev            # http://localhost:3100
```

```bash
npm run build          # production build (all marketing pages prerendered)
npm run typecheck
npm run lint
npm run calendar       # regenerate the Instagram docs + 90-day calendar (+ CSV)
npm run brochures      # render the catalogues to PDF (needs the app running)
npm run screens -- / /corporate-gifting   # desktop + mobile screenshots
```

Node 20+. The site runs with **no environment variables**. Forms then show a "please WhatsApp or call" message, because nothing is configured to receive leads. Copy `.env.example` to `.env.local` to connect the services.

---

## The ten deliverables

| # | Deliverable | Where |
|---|---|---|
| 1 | **Complete website** (15 page templates, 27 routes) | `app/`, `components/` |
| 2 | **Mobile version** — mobile-first layouts, thumb bar (WhatsApp · Call · Quote), full-screen menu | Built into every page |
| 3 | **SEO strategy** — keyword map, schema, local SEO, blog plan | [docs/02](docs/02-seo-strategy.md) + implemented in `lib/seo.ts`, `app/sitemap.ts` |
| 4 | **Instagram launch plan** — set-up, bio, pillars, growth, and the **first 30 posts** with hook, script, caption, CTA and hashtags | [docs/03](docs/03-instagram-launch-plan.md), [docs/03b](docs/03b-instagram-first-30-posts.md) |
| 5 | **90-day content calendar** — dated, mix-balanced, festival-anchored; CSV for Sheets/Notion | [docs/04](docs/04-content-calendar-90-days.md), [CSV](docs/content-calendar.csv) |
| 6 | **Corporate gifting brochure** | `/brochure/corporate` · [PDF](public/brochures/mithaiwallah-corporate-gifting.pdf) |
| 7 | **Wedding gifting brochure** | `/brochure/wedding` · [PDF](public/brochures/mithaiwallah-wedding-gifting.pdf) |
| 8 | **Lead generation funnel** — forms, WhatsApp, Supabase, CRM webhook, email sequences, dashboard, sales scripts | [docs/05](docs/05-lead-funnel-and-automation.md) + `app/api/lead`, `app/admin/leads` |
| 9 | **Conversion optimisation plan** | [docs/06](docs/06-conversion-optimization-plan.md) |
| 10 | **Brand guidelines** | [docs/01](docs/01-brand-guidelines.md) |
| + | **12-month execution roadmap** | [docs/07](docs/07-12-month-roadmap.md) |
| + | Brochure guide · launch checklist · photography brief | [08](docs/08-brochures.md) · [09](docs/09-launch-checklist.md) · [10](docs/10-photography-brief.md) |

---

## Site map

| Route | Purpose |
|---|---|
| `/` | Hero, story, interactive sweet picker, corporate, gift boxes, weddings, why us, manufacturing, who we serve, testimonials, Instagram, enquiry |
| `/sweets`, `/sweets/[slug]` ×6 | Collection hub with a section per sweet; product pages (story, ingredients, serving, bulk, FAQ) |
| `/corporate-gifting` | Corporate landing page with collections, branding, Diwali timeline, FAQ and a corporate-only form |
| `/wedding-gifting` | Wedding landing page with personalisation, ceremonies, planners, FAQ and a wedding-only form |
| `/festive-hampers` | Festival calendar and hampers |
| `/wholesale` | Hotels & restaurants, retailers, `#private-label`, `#export` |
| `/franchise` | Franchise interest, `#distributors` |
| `/manufacturing`, `/about`, `/contact`, `/privacy` | Trust and contact |
| `/journal`, `/journal/[slug]` ×3 | Blog |
| `/brochure/corporate`, `/brochure/wedding` | Printable A4 catalogues (noindex) |
| `/admin/leads` | Lead dashboard (Basic Auth) |
| `/api/lead` | Lead intake |

## How it is built

- **Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion.** Every marketing page is statically prerendered; the home page revalidates hourly for the Instagram feed.
- **One file for business facts:** `lib/business.ts` holds the phone, WhatsApp, address, FSSAI number, terms and logo. Anything not yet confirmed is `null`, and the site hides it instead of inventing a value.
- **Illustrated until photographed.** Each sweet is drawn procedurally in SVG (grain textures, one shared projection) so the site launches before the shoot. Set `photo` on a product in `lib/products.ts` and that page switches to the photograph. Set `BRAND.heroVideo` and the home hero plays the film.
- **Leads:** `lib/leads.ts` defines every form field once, used by both the form and the API. The API validates, scores leads hot/warm/cold, stores them in Supabase (insert-only key), forwards them to a signed CRM webhook, and returns a reference number for WhatsApp follow-up.
- **Supabase:** table `mithaiwallah_leads` in project `service`, migration in `supabase/migrations/`. Row Level Security was verified by running as the `anon` role: the public key can insert, and cannot read, update or delete.

## Status — read before launch

**Placeholders the business must replace** are listed in [docs/09-launch-checklist.md](docs/09-launch-checklist.md). The ones that matter most:

- **Logo:** none was supplied, so the site uses an arch-monogram placeholder. Setting `BRAND.logo` swaps it everywhere.
- **Phone / WhatsApp / address / FSSAI number:** empty. WhatsApp buttons fall back to the enquiry form until the number is set.
- **Testimonials are samples**, labelled "illustrative" on the page, and no Review schema is emitted. Replace them with real, consented quotes.
- **Ingredients, shelf life and manufacturing statements** follow the traditional recipes and common practice. Check each one against Mithaiwallah's actual recipes and kitchen.
- **Photography:** illustrations stand in until the shoot ([docs/10](docs/10-photography-brief.md)).
