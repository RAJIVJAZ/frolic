# 16 · Developer Handoff

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build — must pass before every PR
npm run typecheck  # tsc --noEmit
npm run lint
```

Node 20+. No environment variables are required to run the site as-is; the
catalogue is local. Variables in `08-shopify-architecture.md` are needed only
once Shopify and Sanity are wired in.

## Layout

```
app/                    Routes (App Router). Every route is statically prerendered.
  layout.tsx            Fonts, global schema, nav/footer/cart shell
  page.tsx              Home
  products/[handle]/    PDP — generateStaticParams over the catalogue
  journal/[slug]/       Journal posts
  sitemap.ts robots.ts  Generated from the same data the pages render from

components/
  layout/               Nav, Footer, Announcement, PageShell
  sections/             Page-level compositions (Hero, Story, Science, …)
  commerce/             BuyBox, CartDrawer, ProductCard, BundleBuilder, Quiz, ShopGrid
  three/                WebGL — see the boundary rules below
  ui/                   Button, Badge, Reveal, Marquee, SectionHeader

lib/
  products.ts           Catalogue — the single source of truth
  ingredients.ts        Ingredient library
  reviews.ts            Reviews + UGC (illustrative shape)
  journal.ts            Journal content
  faqs.ts               FAQ content
  cart.ts               Zustand store, persisted
  seo.ts                Metadata builder + JSON-LD
  chartTokens.ts        Validated chart palette
  utils.ts              cn(), worldVars(), slugify()

sanity/schemas/         CMS schemas (executable)
docs/                   This documentation set
```

## The five rules

### 1. Never import from `components/three/CanStage` directly

Always use `LazyCanStage`. It holds the gates that decide whether three.js is
fetched at all. Importing `CanStage` from a page pulls ~400 kB into that
route's bundle unconditionally.

```tsx
// ✅
import { LazyCanStage } from '@/components/three/LazyCanStage';

// ❌ — defeats the entire performance strategy
import { CanStage } from '@/components/three/CanStage';
```

### 2. Nothing in the 3D render path may fetch from a third-party origin

The label texture is generated on a canvas; the environment map is built from
`<Lightformer>` geometry. A CDN fetch inside Suspense that fails throws and
unmounts the page — this is not hypothetical, it is what
`<Environment preset="studio">` did before it was removed.

### 3. New type-scale steps must be registered with tailwind-merge

`lib/utils.ts` declares `text-step-*` in the `font-size` class group. Without
it, tailwind-merge classifies them as text *colours* and silently drops a
competing colour class — which is how every dark button on the site once had
charcoal text on a charcoal fill.

```ts
'font-size': [{ text: ['step--1', 'step-0', /* … add new steps here */] }]
```

### 4. Chart colours come from `lib/chartTokens.ts`, never the brand palette

Brand primaries are tuned for large areas. `#B8F135` is 1.32:1 on cream — fine
for a can, unreadable as a data mark. The chart set is validated for lightness
band, chroma floor, CVD separation and 3:1 contrast, **on a light surface
only**. A dark-surface chart needs its own steps selected and re-validated.

### 5. Flavour theming goes through `worldVars()`, not conditional classes

```tsx
<div style={worldVars(product.world)}>
  <Button variant="world">Add to cart</Button>
</div>
```

Any subtree can own a world. Do not add per-flavour Tailwind classes.

## Adding a flavour

One file. `lib/products.ts` — add a `Product` entry with a unique `handle`.

Automatically picked up by: the shop grid and its filters, `/flavours`, the
homepage carousel, the quiz scoring, the bundle builder, the footer flavour
list, the 404 recovery list, `generateStaticParams` for the PDP, `sitemap.xml`,
and the `ItemList` schema. The 3D can generates its own label.

Checklist:
- `handle` matches the Shopify product handle exactly
- `world.ink` reaches 4.5:1 against `world.base` (charcoal or cream)
- `world.deep` reaches 3:1 on cream
- `notes` has exactly three entries, two words max
- `shortName` ≤ 18 characters
- `addedSugarG ≤ totalSugarG`, `prebioticFibreG ≤ dietaryFibreG`
- `profile` tags chosen so the quiz can reach it

## Adding a page

1. `app/<route>/page.tsx`, exporting `metadata` via `buildMetadata()`
2. Add `breadcrumbSchema` (or use `PageShell`, which does it)
3. Add the route to `app/sitemap.ts` with a priority
4. Link it from the footer or nav — an unlinked page is an unindexed page

## Accessibility checklist for any new component

- [ ] Keyboard reachable and operable
- [ ] Visible focus state (the global ring is usually enough)
- [ ] Touch targets ≥ 44×44px
- [ ] Text contrast ≥ 4.5:1, UI boundaries ≥ 3:1
- [ ] Information is never colour-alone
- [ ] Motion respects `useReducedMotion()`, with a static alternative rather
      than a frozen animation
- [ ] Decorative visuals `aria-hidden`
- [ ] Dynamic content changes announced via a live region
- [ ] Form inputs have persistent visible labels

## Performance budgets

| Metric | Budget | Current |
|---|---|---|
| First Load JS | < 180 kB | 170 kB |
| Largest route | < 200 kB | 175 kB (`/`) |
| 3D chunk on critical path | never | never |
| Prerendered indexable routes | 100% | 37/37 |

Check `npm run build` output on every PR. A regression in First Load JS almost
always means something imported `CanStage`, `three`, or a section component
into a shared module.

## Known gaps

Stated plainly so nobody discovers them at the wrong moment.

1. **Checkout is not wired.** The Checkout button is inert. Shopify Storefront
   API integration is specified in `08-shopify-architecture.md` but not built.
2. **Forms do not submit.** Contact, wholesale, newsletter and sign-in are
   markup and validation only — no handlers, no backend.
3. **Reviews and UGC are illustrative.** `lib/reviews.ts` has the exact shape
   the production loader will return, but the content is placeholder and must
   not ship as real. The `AggregateRating` schema on PDPs is driven by it —
   **disable that before launch or it is a manual-action risk.**
4. **The flavour carousel is not a full ARIA tabs implementation.** It is
   keyboard-operable, but arrow-key navigation between tabs is missing.
   Documented on `/accessibility`.
5. **Lifestyle photography does not exist.** UGC tiles and product wells use
   generated gradients. Art direction per flavour is in
   `07-3d-asset-spec.md`.
6. **Journal has six posts and no pagination.** Needed past ~12.
7. **No test suite.** Verification so far has been build checks, typecheck, a
   37-page link crawl and browser inspection. Unit tests for `unitPriceFor`,
   `computeTotals` and the quiz scoring are the highest-value first additions —
   all three are pure functions with real money or real recommendations
   downstream.
8. **No analytics.** The CRO plan in `14-cro-strategy.md` assumes event
   tracking that is not instrumented.

## Before launch

- [ ] Wire Shopify Storefront API; replace the local catalogue
- [ ] Wire Sanity; replace the local editorial content
- [ ] Remove placeholder reviews and the `AggregateRating` they feed
- [ ] Connect form handlers
- [ ] Commission and integrate photography
- [ ] Compliance sign-off on every claim (`13-compliance-claims.md`)
- [ ] Add analytics and consent management
- [ ] Run Lighthouse on the deployed build, mobile profile, against the
      targets in `15-mobile-layouts.md`
- [ ] Full screen-reader pass on the buy box and bundle builder
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production origin — canonicals,
      sitemap and OG URLs all derive from it
