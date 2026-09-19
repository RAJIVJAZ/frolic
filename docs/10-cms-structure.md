# 10 · CMS Structure

**Sanity**, chosen for three reasons that matter here: schemas are TypeScript
(so validation lives beside the types the front end already uses), GROQ can
shape a response to match a component exactly, and custom validation rules can
block a compliance mistake at authoring time rather than at review time.

Executable schemas are in `sanity/schemas/`. This document explains the model.

## Document types

| Type | Count | Who edits | Cadence |
|---|---|---|---|
| `flavour` | 10 | Brand + compliance | Monthly |
| `ingredient` | 10 | Brand + compliance | Rarely |
| `post` | Growing | Content | Weekly |
| `faq` | ~20 | Support + compliance | Monthly |
| `review` | Many | Moderation only | Daily |
| `siteSettings` | 1 (singleton) | Growth | Weekly |

## What is *not* in the CMS

Price, SKU, inventory and variant IDs are Shopify's. Putting a price in Sanity
creates two numbers that can disagree, and the one the customer sees would not
be the one they are charged. See `08-shopify-architecture.md` for the full
ownership table.

## `flavour`

The editorial half of a product, joined to Shopify on `handle`. Grouped into
five tabs so a copywriter never has to scroll past nutrition fields.

**Validation that earns its place:**

```ts
// Added sugar cannot exceed total sugar; prebiotic fibre cannot exceed
// dietary fibre. Both are arithmetic impossibilities that are easy to type.
validation: (r) => r.required().custom((n) => {
  if (n.addedSugarG > n.totalSugarG) return 'Added sugar cannot exceed total sugar.';
  if (n.prebioticFibreG > n.dietaryFibreG) return 'Prebiotic fibre cannot exceed dietary fibre.';
  return true;
})
```

- `notes` is `.length(3)` exactly — three notes are printed on the can, and the
  label layout assumes three.
- `shortName` is capped at 18 characters, which is what the can pill fits.
- All four `world` colours are hex-validated. `ink` must reach 4.5:1 against
  `base`; in practice it is always charcoal or cream.

## `ingredient`

Carries the highest-risk copy on the site. `benefit` has a banned-phrase check:

```ts
const BANNED = ['cures', 'treats', 'prevents', 'heals', 'boosts immunity',
                'detox', 'detoxifies', 'burns fat', 'weight loss', 'anti-ageing'];
```

This is a speed bump, not a compliance process — it catches the obvious cases
at typing time so the review in `13-compliance-claims.md` can spend its
attention on the subtle ones.

## `post`

`targetKeyword` is required. A journal post without a keyword cluster is a
post nobody asked for; making the field mandatory forces the decision before
the writing starts.

Body is structured (`{ h, p[] }`) rather than free rich text, which keeps
heading hierarchy correct for SEO and means the renderer cannot be handed
markup it does not support.

## `review`

Mirrored from Postgres. Every content field is `readOnly` — moderators publish,
reject or feature, they do not edit what a customer wrote. `verified` is set
from the Shopify order and is never editable, because a verified badge that an
editor can grant is not a verified badge.

## `siteSettings`

Singleton for everything growth should be able to change without a deploy:
announcement bar, free-shipping threshold, subscription discount, press
mentions, support email, legal disclaimer.

The shipping threshold appears in the announcement bar, the cart progress bar
and the PDP reassurance list. Sourcing all three from one field is the only way
they stay consistent.

## Queries

```groq
// Full catalogue — merged with Shopify commerce fields at request time.
*[_type == "flavour"] | order(isBestseller desc, name asc) {
  "handle": handle.current,
  name, shortName, tagline, notes, story, ritual, pairing,
  heroIngredients[]{ name, role, "slug": ingredient->slug.current },
  world, nutrition, intensity, sweetness, profile, bestFor,
  badge, isNew, isBestseller
}

// Single flavour with its ingredients resolved.
*[_type == "flavour" && handle.current == $handle][0] {
  ...,
  "ingredients": heroIngredients[].ingredient->{
    "slug": slug.current, name, botanical, category, origin,
    flavourProfile, benefit, dose, accent
  }
}

// FAQs for one surface, in display order.
*[_type == "faq" && $surface in surfaces] | order(order asc) { question, answer }
```

## Editor experience

- **Groups, not one long form.** Five tabs on `flavour`; a copywriter opens
  Editorial and never sees the nutrition panel.
- **Descriptions state the constraint, not the obvious.** "Must match the
  Shopify product handle exactly. Changing this breaks the merge" — not
  "the handle".
- **Previews show the colour.** The `flavour` preview selects `world.base` so
  the list reads as a palette.
- **Validation explains the fix.** Every custom rule returns a sentence a
  non-engineer can act on.

## Publishing

```
Draft → Review → Published
```

Nutrition and ingredient `benefit` changes require a compliance reviewer on the
document before publish. Sanity's `publishedAt` + document history give a full
audit trail, which is exactly what an FSSAI query needs.

A publish fires a webhook to `/api/webhooks/sanity`, which calls
`revalidateTag` for the affected handle. A copy fix on one flavour does not
rebuild the catalogue.
