# 13 · Compliance & Claims Matrix

Referenced from `lib/ingredients.ts`, `components/sections/Science.tsx` and the
Sanity schemas. India-specific; this is not legal advice and a qualified
regulatory consultant signs off before launch.

## Framework

| Instrument | Relevance |
|---|---|
| FSS (Advertising and Claims) Regulations, 2018 | Governs every nutrition and health claim made here |
| FSS (Packaging and Labelling) Regulations | Label content, nutrition panel format |
| FSS (Food Products Standards and Food Additives) Regulations | Carbonated beverage category limits |
| Consumer Protection Act, 2019 | Misleading-advertisement liability, including endorser liability |
| ASCI Code | Self-regulatory; effectively binding in practice |

## The three claim types

**Nutrient content claim** — a statement about how much of a nutrient is
present. *"Contains 7 g of dietary fibre per serving."* Permitted where the
threshold is met and the figure is accurate.

**Nutrient comparative claim** — a comparison to a reference. *"75% less sugar
than a regular cola."* Requires a stated basis and a comparator that is a
genuine category typical.

**Health claim** — links a food to a health outcome. *"Supports digestive
health."* Requires an approved claim or substantiation acceptable to FSSAI.
**We do not make these.**

## Matrix

| Claim | Status | Conditions |
|---|---|---|
| "7 g prebiotic fibre per 250 ml can" | ✅ Approved | Batch-verified; must match the panel exactly |
| "4 g added sugar" | ✅ Approved | Per-flavour; never stated as a range |
| "−75% sugar vs. regular soda" | ⚠️ Conditional | Basis must be visible on the same screen; comparator is a category typical, not a named brand |
| "Low sugar" | ⚠️ Conditional | Only where the flavour meets the regulatory threshold; not a blanket brand claim |
| "No caffeine" / "0 mg caffeine" | ✅ Approved | True for all ten |
| "No artificial colours" | ✅ Approved | Formulation fact |
| "Prebiotic fibre" (as an ingredient descriptor) | ✅ Approved | Describes the ingredient class, not an outcome |
| "Inulin reaches the colon intact" | ✅ Approved | Definitional, not an outcome claim |
| "Gut bacteria ferment it" | ✅ Approved | Mechanism, stated without benefit |
| "Supports gut health" | ❌ Prohibited | Health claim, unsubstantiated |
| "Improves digestion" | ❌ Prohibited | Health claim |
| "Boosts immunity" | ❌ Prohibited | Health claim; heavily scrutinised post-2020 |
| "Aids weight loss" | ❌ Prohibited | Health claim; also a disease-risk-reduction claim |
| "Detoxifies" | ❌ Prohibited | Not a recognised physiological claim |
| "Healthy" (unqualified, of the product) | ❌ Prohibited | Implied general health claim |
| "Superfood" | ❌ Prohibited | No regulatory definition |
| "Suitable for diabetics" | ❌ Prohibited | Medical claim; FAQ answer explicitly declines it |
| "Amla is rich in vitamin C" | ⚠️ Conditional | True of the ingredient; must not imply the finished product is a vitamin C source unless it meets the threshold |

## How this is enforced in the build

**1. Copy fields carry the rule.** `lib/ingredients.ts` opens with:

> Copy discipline: every `benefit` string describes what the ingredient IS or
> DOES in the can — it never states a health outcome for the drinker.

**2. The CMS blocks the obvious cases.** `sanity/schemas/ingredient.ts`
rejects a banned phrase at authoring time with an actionable message.

**3. Arithmetic impossibilities are blocked.** `flavour.nutrition` validates
that added sugar ≤ total sugar and prebiotic fibre ≤ dietary fibre.

**4. Comparative claims carry their basis inline.** The science chart is
captioned *"Comparison figures are category typicals, not specific brands"* on
the same screen as the bars, not in a footnote.

**5. The disclaimer is in the global footer**, not a policy page — it appears
on all 37 pages.

**6. `/science` states the limit explicitly.** An entire section is devoted to
what we will not claim. This is a compliance control and a brand position
simultaneously.

## Review process

| Change | Reviewer | Gate |
|---|---|---|
| Nutrition figures | Compliance + QA | Blocking, pre-publish |
| Ingredient `benefit` / `detail` | Compliance | Blocking, pre-publish |
| Any new comparative claim | Compliance + Legal | Blocking |
| Journal post touching health | Compliance | Blocking |
| Marketing copy, product story | Brand lead | Non-blocking, spot-checked |
| UI microcopy | Brand lead | Non-blocking |

Sanity document history provides the audit trail, which is what an FSSAI query
actually needs: who changed a figure, when, and what it was before.

## Label requirements (per can)

- FSSAI licence number and logo
- Veg mark (green)
- Nutrition panel per 100 ml **and** per serving
- Full ingredient list in descending order by weight
- Allergen declaration
- Net quantity, MRP inclusive of all taxes
- Batch/lot, date of manufacture, best-before
- Manufacturer name and address
- Customer care contact
- Storage instruction
- High-fibre advisory: *"Contains added dietary fibre. Introduce gradually."*

The last item is not required by regulation. It is there because a bad first
week is how somebody decides fibre is not for them, and telling people up front
costs less than a refund and a one-star review.

## Advertising

- No health outcomes in paid creative, including influencer briefs.
- Influencer posts carry `#ad` / `#sponsored` per ASCI guidelines.
- Endorsers are briefed in writing on the prohibited list — under the Consumer
  Protection Act 2019 the endorser carries liability too.
- No targeting of under-13 audiences.
- No before/after imagery, ever.
