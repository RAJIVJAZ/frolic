# 17 · Pre-Launch Site — Copy & Structure

The site was rebuilt from a storefront into a pre-launch company site. This
records the structure, the copy decisions, and — most importantly — the claims
that were deliberately *not* made.

## What changed

| Before | After | Why |
|---|---|---|
| `/shop`, `/bundle`, `/subscribe`, `/rewards`, `/account` | Removed | Nothing to sell. A buy button on a pre-launch site reads as a mock-up |
| `/products/[handle]` | `/flavours/[handle]` | These are flavour *concepts*, not products |
| Cart drawer, prices, add-to-cart | Removed entirely | No pricing is published anywhere on the site |
| `/stockists`, `/wholesale` | `/distributors` | Register interest, not place orders |
| Commerce FAQs (shipping, returns) | Pre-launch FAQs | None of the old ones could be answered honestly |
| — | `/waitlist`, `/development`, `/founder`, `/investors` | New |

## The one claim that had to be corrected

The brief specified the hero headline **"India's First Premium Prebiotic Soda"**.
That is false — Misfits (seed-funded, Mumbai) and Bubz are both already in the
Indian market, and Misfits ships a near-identical 250 ml / 7 g fibre / 4 g sugar
specification with zero added sugar.

A first-mover claim that fails one search is the cheapest possible way to lose a
distributor or an investor. Replaced with a claim that is both true and more
defensible:

> **A new generation of Indian soda**
> Prebiotic fibre, botanical ingredients and bold Indian flavours — nimbu masala,
> aam panna, kokum, ginger lime. Being built now, in Pune.

The FAQ answers the question directly rather than avoiding it: *"Is FROLIC
India's first prebiotic soda?" — "No. There are already prebiotic soda brands in
the Indian market. FROLIC's difference is the flavour idiom."*

## One file controls every progress claim

`lib/company.ts` is the only place the site says anything about status. Every
badge on `/development` reads from it.

**Defaults are deliberately conservative** — they claim only what this project
has demonstrably produced:

| Complete | Underway | Not started |
|---|---|---|
| Brand strategy & identity | Packaging & can design concepts | Formulation development |
| Product concept & range architecture | | Co-packer selection |
| Flavour research & sensory direction | | FSSAI licensing |
| Digital presence & investor materials | | Pilot production |
| | | Blind sensory testing |
| | | Regional launch |

> **Before publishing, set each `status` to what is actually true.** Claiming
> formulation trials, regulatory filings or manufacturing partners that do not
> exist is the fastest way to lose a distributor or an investor, because both
> will ask for the batch report, the licence number or the co-packer name.

## Claims deliberately avoided

| Not claimed | Why |
|---|---|
| Any revenue or sales figure | There are none |
| A completed formulation | No bench trials have been run |
| A named co-packer or manufacturing partner | None selected |
| FSSAI approval | Not filed |
| Verified nutrition values | Labelled "formulation target" wherever shown |
| A launch month | Year-level only. A missed month is a credibility cost |
| Team size beyond one | `/founder` and `/careers` state plainly that FROLIC is one person |
| Trade pricing or margins | Depend on first production economics |

## Page inventory

| Page | Purpose |
|---|---|
| `/` | Hero, mission, launch set, roadmap preview, founder, science, timeline, waitlist |
| `/waitlist` | Five signup intents: waitlist, taster, distributor, investor, partnership |
| `/development` | Full roadmap with honest status, plus the four-year timeline |
| `/founder` | Rajeev Jaiswal's story, the solo-founder position, hiring gaps |
| `/investors` | Category proof, why-now, current stage stated plainly, materials on request |
| `/distributors` | Format facts, what is not yet settled, who we want to hear from |
| `/careers` | Four founding roles, with what joining pre-funding actually means |
| `/flavours` | Ten concepts, four marked launch set |
| `/flavours/[handle]` | Concept page — story, ingredients, target nutrition, waitlist CTA |
| `/quiz` | Flavour matcher, results feed the waitlist |
| `/science`, `/ingredients`, `/story`, `/journal`, `/faq` | Unchanged editorial |

## Placeholders requiring real data

Marked in square brackets in `lib/company.ts` so they cannot ship unnoticed:
university name, graduation year, years in manufacturing, Anuradha Enterprises
scale, founder email, LinkedIn URL.

## The waitlist is not wired

`components/prelaunch/SignupForm.tsx` posts to `/api/signup`, which does not
exist. The form shows its success state so the page is demonstrable, and logs a
warning to the console rather than silently pretending. **Connect a real store
before collecting signups** — the contract is one endpoint accepting
`{ name, email, intent, ...extra }`.
