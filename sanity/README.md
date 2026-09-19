# Sanity Studio schemas

These are the content schemas for the FROLIC Studio. They are **deliverable
artifacts for a separate workspace**, not part of the Next.js build — the app's
`tsconfig.json` excludes this directory, because type-checking them here would
require pulling the entire Studio toolchain into the storefront.

## Using them

```bash
npm create sanity@latest -- --template clean --typescript
```

Then copy `schemas/` into the new project and register them:

```ts
// sanity.config.ts
import { schemaTypes } from './schemas';

export default defineConfig({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
```

## What is here

| Schema | Purpose |
|---|---|
| `flavour.ts` | Editorial half of a product — story, world colours, nutrition, quiz taxonomy. Joined to Shopify on `handle` |
| `ingredient.ts` | Ingredient library, with banned-phrase validation on health-claim copy |
| `post.ts` | Journal posts, structured body, mandatory target keyword |
| `faq.ts` | FAQs, tagged by the surfaces they appear on |
| `review.ts` | Moderation mirror — content fields are read-only |
| `siteSettings.ts` | Singleton: announcement bar, shipping thresholds, discount rate |

## What is deliberately not here

Price, SKU, inventory and variant IDs. Those belong to Shopify. Duplicating
them would create two numbers that can disagree, and the one the customer sees
would not be the one they are charged. The full ownership table is in
[`docs/08-shopify-architecture.md`](../docs/08-shopify-architecture.md).

## Validation worth noting

`flavour.nutrition` rejects arithmetic impossibilities (added sugar exceeding
total sugar; prebiotic fibre exceeding dietary fibre). `ingredient.benefit`
rejects a list of health-claim phrases at authoring time — a speed bump ahead
of the review process in
[`docs/13-compliance-claims.md`](../docs/13-compliance-claims.md), not a
replacement for it.
