# 01 · Sitemap & Information Architecture

## Principles

1. **Three clicks to a can, always.** No page is more than three clicks from a
   completed add-to-cart. The nav carries `Shop` as a persistent CTA so the
   distance is usually one.
2. **Editorial serves commerce.** Every content page has at least one
   contextual route back into the catalogue. `/science` ends on a CTA;
   `/ingredients` cards link to the flavours carrying that ingredient;
   journal posts carry an in-article product block.
3. **One canonical URL per product.** A flavour lives at
   `/products/<handle>` and nowhere else. `/flavours` and `/shop` are
   listings that link to it — they never duplicate its content.

## Tree

```
/                                 Home
├── /shop                         All flavours · filter + sort
├── /flavours                     Editorial range view + carousel
│   └── /products/[handle]        ×10 — PDP (canonical product URL)
│       ├── nimbu-masala-fizz
│       ├── aam-panna-spark
│       ├── kokum-burst
│       ├── jamun-pop
│       ├── kala-khatta-rush
│       ├── ginger-lime-lift
│       ├── jeera-fizz
│       ├── himalayan-lemon
│       ├── guava-chili
│       └── orange-masala
├── /bundle                       Build-your-own 12 / 24 box
├── /subscribe                    Subscription landing + box builder
├── /quiz                         4-question flavour finder
├── /rewards                      Frolic Club: points, tiers, referral
│
├── /science                      Prebiotic fibre explainer + charts
├── /ingredients                  Interactive ingredient explorer
├── /story                        Brand narrative + timeline + values
├── /journal                      Content hub
│   └── /journal/[slug]           ×6 — keyword-targeted posts
├── /faq                          FAQPage schema source
│
├── /stockists                    Retail locator
├── /wholesale                    Trade enquiry
├── /contact                      Support routing + form
├── /shipping                     Shipping & returns policy
├── /careers                      Open roles
│
├── /account                      Sign in (noindex)
├── /cart · /checkout             Shopify-hosted (noindex)
│
└── Legal
    ├── /privacy
    ├── /terms
    └── /accessibility
```

## Navigation

| Surface | Contains | Rationale |
|---|---|---|
| Announcement bar | Rotating value props | Shipping threshold + the 7g claim, seen before anything else |
| Primary nav (desktop) | Flavours · The Science · Ingredients · Our Story · Subscribe | Five items — discovery first, brand last |
| Persistent CTAs | `Shop` button, cart button | Never scrolls away; sticky header |
| Mobile sheet | Shop All + the five + Flavour Quiz | Quiz added here because mobile browsers benefit most from guided discovery |
| Footer | Shop / Learn / Support columns + all ten flavours | The flavour list is an internal-linking device as much as a nav |

## Indexing

Set in `app/robots.ts` and per-page metadata.

| Path | Indexed | Note |
|---|---|---|
| `/`, `/shop`, `/flavours`, `/products/*` | Yes | Priority 0.9–1.0 |
| `/science`, `/ingredients`, `/journal/*` | Yes | Informational capture |
| `/account`, `/cart`, `/checkout` | No | Per-visitor, no search value |
| `/search` | No | Generates near-infinite thin URLs |
| `/api/*` | No | — |

Sitemap is generated at build from the same catalogue the pages render from
(`app/sitemap.ts`), so a new flavour cannot ship without its URL being listed.
