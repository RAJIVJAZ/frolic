# 08 · Shopify Architecture

## Why headless

Shopify owns money, inventory, tax and compliance. Next.js owns the
experience. The boundary is deliberate: PCI scope, GST invoicing and payment
reconciliation are problems worth paying Shopify to have solved, and none of
them benefit from a custom front end.

```
┌─────────────────┐   Storefront API (GraphQL)   ┌──────────────────┐
│  Next.js 14     │ ───────────────────────────► │  Shopify Plus    │
│  (Vercel, edge) │ ◄─────────────────────────── │  products/orders │
└────────┬────────┘   cart, checkout, customer   └────────┬─────────┘
         │                                                │
         │ GROQ                                  Admin API│ webhooks
         ▼                                                ▼
┌─────────────────┐                             ┌──────────────────┐
│  Sanity CMS     │                             │  Recharge        │
│  editorial      │                             │  subscriptions   │
└─────────────────┘                             └──────────────────┘
```

## The merge contract

A `Product` in `lib/products.ts` is the union of two sources. **Field
ownership is exclusive** — no field is writable from both systems.

| Field | Owner | Why |
|---|---|---|
| `price`, `comparePrice` | Shopify | Must match what checkout charges |
| `sku`, `variantId` | Shopify | Fulfilment identity |
| `availableForSale`, inventory | Shopify | Single source of stock truth |
| `handle` | Shopify | Also the CMS join key |
| `name`, `shortName` | Shopify | Appears on invoices |
| `tagline`, `story`, `ritual`, `pairing` | Sanity | Editorial, changes weekly |
| `notes`, `heroIngredients` | Sanity | Editorial |
| `world` (base/deep/wash/ink/environment) | Sanity | Design tokens per flavour |
| `nutrition` | Sanity | Reviewed, versioned, legally sensitive |
| `intensity`, `sweetness`, `profile`, `bestFor` | Sanity | Quiz taxonomy |
| `badge`, `isNew`, `isBestseller` | Sanity | Merchandising |

```ts
// lib/commerce/merge.ts
export async function getCatalogue(): Promise<Product[]> {
  const [commerce, editorial] = await Promise.all([
    shopify.products({ first: 50 }),   // price, sku, variantId, stock
    sanity.fetch(FLAVOURS_QUERY),      // everything else
  ]);

  const byHandle = new Map(editorial.map((e) => [e.handle, e]));

  return commerce.map((c) => {
    const e = byHandle.get(c.handle);
    // A product with no editorial record is not renderable — it would have no
    // world, no nutrition and no story. Surface it loudly rather than shipping
    // a broken card.
    if (!e) throw new MissingEditorialError(c.handle);
    return { ...e, ...toCommerceFields(c) };
  });
}
```

## Product model in Shopify

One product per flavour; pack size is the variant axis. Subscription is a
selling plan on the variant, not a separate product — so a 12-can pack has one
inventory pool whether bought once or on subscription.

```
Product: FROLIC Nimbu Masala Fizz     handle: nimbu-masala-fizz
├── Variant  6 cans    FRLC-NMF-250-6     ₹720
├── Variant 12 cans    FRLC-NMF-250-12  ₹1,325
└── Variant 24 cans    FRLC-NMF-250-24  ₹2,448
      └── Selling plan group "Subscribe & Save"
          ├── Every 2 weeks   −20%
          ├── Every 4 weeks   −20%
          └── Every 6 weeks   −20%
```

Bundles are a **line-item property**, not a product. A build-your-own box
becomes N lines each carrying:

```
_bundle_id    uuid        groups the lines for fulfilment and refunds
_bundle_size  12 | 24     the tier the price was derived from
_unit_price   124         per-can price the customer was shown
```

This is what keeps the cart honest: a 4-can share of a 24-can box must not be
re-priced as a 4-can pack. The same rule is enforced client-side by
`CartLine.unitPrice`.

## Metafields

| Namespace | Key | Type | Use |
|---|---|---|---|
| `frolic` | `fibre_grams` | number_integer | Badge, schema |
| `frolic` | `added_sugar_grams` | number_integer | Badge, schema |
| `frolic` | `energy_kcal` | number_integer | Badge, schema |
| `frolic` | `sanity_id` | single_line_text | Join key |
| `frolic` | `fssai_licence` | single_line_text | Label compliance |
| `frolic` | `batch_shelf_life_months` | number_integer | Ops |

Duplicating three nutrition figures into Shopify is deliberate: they appear in
order confirmations and invoices, which Shopify renders without calling Sanity.

## Subscriptions (Recharge)

| Capability | Behaviour |
|---|---|
| Cadence | 2 / 4 / 6 weeks, changeable any time |
| Flavour swap | Until 48h before dispatch |
| Skip / pause | Self-serve, unlimited |
| Cancel | Self-serve, no fee, no minimum term |
| Charge | 3 days pre-dispatch, email first |
| Dunning | 2 retries over 5 days, then auto-pause |

The 48-hour cutoff is a warehouse constraint, and it is stated in the UI at the
point of decision rather than in a policy page.

## Checkout

Shopify-hosted. Payments via Razorpay: UPI, cards, netbanking, wallets, and COD
under ₹2,000 (COD is still a meaningful share of Indian D2C and excluding it
costs more than the RTO risk).

Enabled: Shop Pay accelerated checkout, address autocomplete, one-page layout,
order-status notifications over WhatsApp and email.

## Webhooks

| Topic | Endpoint | Action |
|---|---|---|
| `products/update` | `/api/webhooks/shopify/product` | Revalidate PDP + listings |
| `inventory_levels/update` | `/api/webhooks/shopify/inventory` | Revalidate availability |
| `orders/paid` | `/api/webhooks/shopify/order` | Award Fizz points, settle referral |
| `orders/fulfilled` | `/api/webhooks/shopify/fulfilled` | Schedule day-7 review request |
| `customers/create` | `/api/webhooks/shopify/customer` | Create loyalty account |

All verified by HMAC against `SHOPIFY_WEBHOOK_SECRET` before any processing.

## Caching & revalidation

| Data | Strategy |
|---|---|
| PDP, listings | ISR, 300s + on-demand via webhook |
| Editorial | ISR, 3600s + Sanity webhook |
| Cart | Client-side, never cached server-side |
| Inventory | 60s, or live on the buy box for low-stock variants |

`revalidateTag` is keyed by product handle, so a price change on one flavour
does not rebuild the catalogue.

## Environment

```
SHOPIFY_STORE_DOMAIN
SHOPIFY_STOREFRONT_ACCESS_TOKEN
SHOPIFY_ADMIN_ACCESS_TOKEN        # server only
SHOPIFY_WEBHOOK_SECRET            # server only
RECHARGE_ACCESS_TOKEN             # server only
SANITY_PROJECT_ID
SANITY_DATASET
SANITY_API_READ_TOKEN             # server only
NEXT_PUBLIC_SITE_URL
```

Admin, webhook and Recharge tokens are server-only and must never be prefixed
`NEXT_PUBLIC_`.
