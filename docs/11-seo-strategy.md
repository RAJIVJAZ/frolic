# 11 · SEO Strategy & Content Plan

## Position

FROLIC is competing in a category that barely exists in Indian search yet.
"Prebiotic soda India" has low volume and low competition; "healthy soda
India" has meaningful volume and weak incumbents. The strategy is therefore
**category creation, not category capture**: win the informational queries that
precede the commercial ones, and be the obvious answer when the commercial
queries grow.

## Keyword architecture

### Tier 1 — Commercial (money pages)

| Keyword | Target | Intent |
|---|---|---|
| prebiotic soda India | `/` | Transactional |
| healthy soda India | `/shop` | Transactional |
| low sugar soft drink | `/shop` | Commercial investigation |
| gut health drink India | `/science` | Commercial investigation |
| functional beverage India | `/` | Commercial investigation |
| buy prebiotic soda online | `/shop` | Transactional |
| soda subscription India | `/subscribe` | Transactional |

### Tier 2 — Informational (journal)

| Keyword | Target | Why it converts |
|---|---|---|
| prebiotic vs probiotic | `/journal/prebiotic-vs-probiotic` | The single most common confusion in the category |
| sugar content soft drinks India | `/journal/how-much-sugar-in-indian-soft-drinks` | Comparison intent — one step from a purchase |
| daily fibre intake India | `/journal/fibre-gap-india` | Problem-aware, not yet solution-aware |
| what is inulin / chicory root fibre | `/ingredients` | Ingredient-led research |
| prebiotic fibre beverage formulation | `/journal/eleven-attempts-at-a-fibre-soda` | Low volume, high authority |

### Tier 3 — Long-tail flavour & recipe

| Cluster | Target |
|---|---|
| what is kokum / kokum benefits | `/journal/why-kokum-deserves-better`, `/products/kokum-burst` |
| jamun soda, aam panna drink | Respective PDPs |
| easy mocktail recipes India | `/journal/six-frolic-mocktails` |
| jeera soda benefits | `/products/jeera-fizz` |

Flavour queries are the quiet win. "Jamun soda" has almost no commercial
competition and near-perfect intent match.

## On-page implementation

| Element | Implementation |
|---|---|
| Title template | `%s | FROLIC`, with a hand-written default on `/` |
| Canonicals | Absolute, on every page, via `buildMetadata()` |
| OG / Twitter | Per page; per flavour on PDPs |
| Sitemap | Generated at build from the live catalogue (`app/sitemap.ts`) |
| Robots | Blocks `/account`, `/cart`, `/checkout`, `/api/`, `/search` |
| Headings | One `<h1>` per page, no skipped levels |
| Internal links | Footer lists all ten flavours; ingredient cards link to flavours; journal posts link to PDPs |
| Images | AVIF/WebP via `next/image`, explicit dimensions, descriptive alt |
| Rendering | Every indexable route is statically prerendered |

## Structured data

| Schema | Where | Notes |
|---|---|---|
| `Organization` | Global | Logo, address, contact points, sameAs |
| `WebSite` + `SearchAction` | Global | Sitelinks search box |
| `Product` | Each PDP | With `NutritionInformation` and `AggregateOffer` |
| `AggregateRating` | Each PDP | Only when real review data exists |
| `FAQPage` | `/`, `/faq`, `/science`, `/subscribe`, `/shipping` | Answer in the first sentence |
| `BreadcrumbList` | All non-home pages | — |
| `ItemList` | `/`, `/shop`, `/flavours` | All ten products |
| `Article` | Journal posts | With `wordCount`, `articleSection` |

`NutritionInformation` on a beverage Product is underused by competitors and
is exactly the kind of structured fact that surfaces in AI answers.

> **Rule:** never emit `AggregateRating` without genuine reviews behind it.
> It is a manual-action risk and it is dishonest.

## Content calendar — first two quarters

**Q1 — Establish the category**

| Week | Piece | Cluster |
|---|---|---|
| 1 | Prebiotic or probiotic? | prebiotic vs probiotic |
| 3 | How much sugar is actually in an Indian soft drink? | sugar comparison |
| 5 | The Indian fibre gap | daily fibre intake |
| 7 | What inulin is and why it is in your drink | chicory root fibre |
| 9 | Reading an Indian nutrition label | label literacy |
| 11 | Eleven attempts at a fibre soda | formulation |

**Q2 — Own the flavours**

| Week | Piece | Cluster |
|---|---|---|
| 13 | Kokum deserves better than a sachet | kokum |
| 15 | Jamun's six-week season | jamun |
| 17 | Why aam panna was medicine first | aam panna |
| 19 | Six two-minute mocktails | mocktail recipes |
| 21 | The case for savoury soda | jeera soda |
| 23 | What "functional beverage" actually means | category definition |

**Publishing standard:** every post declares a `targetKeyword` in the CMS —
the field is required. A post without a cluster does not get written.

## Technical SEO targets

| Metric | Target |
|---|---|
| LCP | < 2.0s mobile |
| CLS | < 0.05 |
| INP | < 150ms |
| Indexable pages, month 6 | 60+ |
| Prerendered share of indexable routes | 100% |

Core Web Vitals are a ranking input and this site is heavily animated, which is
why the 3D capability gate in `06-motion-spec.md` exists. The animation budget
is an SEO budget.

## Off-page

1. **Digital PR over link buying.** The sugar-comparison study is built to be
   cited — original data, clear methodology, honest about limitations.
2. **Ingredient sourcing stories.** Kokum and jamun sourcing is genuinely
   interesting to food and regional press.
3. **Dietitian relationships, not influencer volume.** One qualified dietitian
   who will say something accurate is worth more here than twenty reels, and
   carries far less compliance risk.
4. **Stockist reciprocity.** 400+ stockists, each a potential local citation.

## Measurement

| Question | Metric |
|---|---|
| Are we winning the category? | Share of voice on Tier 1 |
| Is content converting? | Assisted conversions from `/journal` |
| Is the technical base holding? | CWV pass rate in Search Console |
| Are rich results firing? | Product, FAQ, Article coverage |
| Which flavours drive search? | Organic entrances by PDP |

Review monthly. Reassess cluster priority quarterly — in a category this young,
volume estimates go stale fast.
