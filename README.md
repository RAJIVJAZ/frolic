# FROLIC

**Feel Good. Sip Different.**
India's premium prebiotic functional soda — storefront, design system and
brand architecture.

An original brand and design language built from scratch: ten flavours drawn
from Indian fruit, spice and salt, a procedurally generated 3D can, and a
commerce front end that stays under 180 kB of JavaScript while doing it.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint
```

Node 20+. No environment variables needed to run — the catalogue ships local.

---

## What is here

**37 statically prerendered pages**, including ten product pages, six journal
posts and a full set of commerce, editorial and policy routes.

| Area | Built |
|---|---|
| Homepage | 3D hero, scroll-scrubbed brand story, flavour-world carousel, science section with validated charts, ingredient explorer, social proof, subscription CTA |
| Commerce | Shop with filter/sort, PDP with buy box and nutrition panel, persisted cart drawer, bundle builder, subscription flows, rewards programme |
| Discovery | Four-question flavour quiz scored against the live catalogue |
| Editorial | Brand story, science explainer, ingredient library, journal |
| 3D | Procedural can — lathe geometry, canvas-drawn label, instanced carbonation, procedural lighting. Zero asset files, zero network fetches |
| SEO | Organization, WebSite, Product + NutritionInformation, FAQPage, Article, BreadcrumbList, ItemList schema; generated sitemap and robots |
| CMS | Executable Sanity schemas with compliance validation |

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion ·
React Three Fiber / three.js · Zustand · Sanity schemas ·
headless Shopify architecture

## Three things worth knowing

**The flavour world system.** Each product declares four colours. `worldVars()`
applies them as CSS custom properties, and any subtree — a card, a carousel
slide, a whole page — re-skins itself. Adding a flavour is one entry in
`lib/products.ts`; the shop, quiz, carousel, bundle builder, sitemap, schema
and 3D label all pick it up automatically.

**The can is generated, not modelled.** Lathe silhouette, canvas-drawn label,
`<Lightformer>` environment. No GLB, no texture file, no HDR — so a new flavour
needs no 3D work, and nothing in the render path can 404.

**three.js is genuinely conditional.** The capability and viewport gates sit
*outside* the dynamic-import boundary, so the renderer is never fetched on
reduced-motion, Save-Data, slow-network, low-core or low-memory devices. That
single change took First Load JS from 405 kB to 170 kB.

## Documentation

| # | Document |
|---|---|
| 01 | [Sitemap & IA](docs/01-sitemap.md) |
| 02 | [User flows](docs/02-user-flows.md) |
| 03 | [Design system](docs/03-design-system.md) |
| 04 | [Wireframes](docs/04-wireframes.md) |
| 05 | [High-fidelity UI spec](docs/05-ui-spec.md) |
| 06 | [Motion design spec](docs/06-motion-spec.md) |
| 07 | [3D & photography asset spec](docs/07-3d-asset-spec.md) |
| 08 | [Shopify architecture](docs/08-shopify-architecture.md) |
| 09 | [Database structure](docs/09-database-structure.md) |
| 10 | [CMS structure](docs/10-cms-structure.md) |
| 11 | [SEO strategy & content plan](docs/11-seo-strategy.md) |
| 12 | [Website copy](docs/12-website-copy.md) |
| 13 | [Compliance & claims matrix](docs/13-compliance-claims.md) |
| 14 | [Conversion optimisation strategy](docs/14-cro-strategy.md) |
| 15 | [Mobile layouts](docs/15-mobile-layouts.md) |
| 16 | [Developer handoff](docs/16-developer-handoff.md) |

## Status

The storefront runs end to end as a static experience. **Checkout is not
wired, forms do not submit, and reviews are illustrative placeholders** — the
`AggregateRating` schema they feed must be disabled before launch. Full list of
gaps and the pre-launch checklist are in
[docs/16-developer-handoff.md](docs/16-developer-handoff.md).

## Originality

FROLIC is an original brand: name, positioning, palette, typography, flavour
range, copy, illustration system and 3D approach are all created for this
project. No third-party brand assets, designs, code or copy are reproduced.

## Note on claims

FROLIC is presented as a food product, not a medicine. All nutrition and
ingredient copy describes composition and function, never a health outcome for
the drinker. The claims matrix in
[docs/13-compliance-claims.md](docs/13-compliance-claims.md) records what may
and may not be said, and the CMS schemas enforce the obvious cases at authoring
time.
