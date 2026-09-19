# 14 · Conversion Rate Optimisation Strategy

## Baseline assumptions

Indian D2C beverage, cold traffic, first six months:

| Metric | Assumption | Target, month 6 |
|---|---|---|
| Home → PDP | 34% | 42% |
| PDP → add to cart | 8% | 12% |
| Cart → checkout | 62% | 70% |
| Checkout completion | 68% | 78% |
| **Overall CVR** | **~1.2%** | **~2.7%** |
| Subscription share of first orders | 15% | 30% |
| AOV | ₹980 | ₹1,240 |
| COD share | 35% | 28% |

The two numbers that matter most are **subscription share** and **COD share**.
Subscription share drives LTV; COD share drives RTO losses, which are the
quiet killer of Indian D2C margins.

## The friction, in order

### 1. Ten flavours is too many for a cold visitor

The single largest leak. Paradox of choice with a product nobody has tasted.

| Mechanism | Where |
|---|---|
| Bestsellers section limits the first decision to four | Home |
| Flavour quiz — four questions, three ranked matches | `/quiz`, linked from shop header, mobile nav, subscription CTA |
| 6-can starter pack makes "I don't know" cheap | Everywhere |
| Quiz result offers "Add all three 6-packs" in one action | `/quiz` |
| Bundle builder reframes choice as assembly, not selection | `/bundle` |

**Test:** does a 3-flavour homepage outperform a 4-flavour one? Fewer choices
usually wins, but four fills the grid cleanly at `lg`.

### 2. "Is this actually going to taste good?"

A functional beverage is assumed to taste like a compromise.

| Mechanism | Where |
|---|---|
| Flavour stories lead with sensory memory, not nutrition | PDP, carousel |
| Tasting notes as the first scannable element | Cards, PDP |
| Intensity and sweetness meters set expectations honestly | Carousel, PDP |
| Reviews that mention taste specifically, surfaced first | PDP |
| A review that says "start slow on the fibre" left published | Social proof |

That last one is deliberate. A visible four-star review with a real caveat
raises trust in the five-star ones.

### 3. Subscription feels like a trap

| Mechanism | Where |
|---|---|
| "Skip or cancel anytime" inside the buy box, at the decision point | PDP |
| "No minimum term, no cancellation fee" stated twice on `/subscribe` | `/subscribe` |
| Explicit "no retention script" | `/subscribe`, `/rewards` |
| Per-can price shown for both modes so the saving is arithmetic | Buy box |
| Cadence chosen before commitment, not after | Buy box |

### 4. Cart abandonment

| Mechanism | Where |
|---|---|
| Free-shipping progress bar with the exact rupee gap | Cart drawer |
| Drawer opens on add — confirms the action, shows progress | Global |
| Savings shown as a line item, not implied | Cart drawer |
| Payment methods named before checkout (UPI, cards, COD) | Cart drawer |
| Cart persists across sessions | `localStorage` |

### 5. Checkout

Shopify-hosted, so the levers are configuration: one-page layout, Shop Pay,
address autocomplete, UPI as the first-listed method, COD capped at ₹2,000.

## Pricing psychology

**Two stacked discounts, never one.** Pack tier (0/8/15%) and subscription
(20%) stack multiplicatively. The customer makes two separate decisions, each
individually small, arriving at 32% off without a single "32% OFF" banner —
which would cheapen the brand and anchor the list price as fictional.

**Bundle pricing is flat per tier.** A 12-can box costs the same whatever the
mix. Removing the arithmetic removes the hesitation.

**₹999 free-shipping threshold** sits just above a 6-pack (₹720) and just
below a 12-pack (₹1,325), so the progress bar always has somewhere to go.

## Test roadmap

**Quarter 1**

| # | Hypothesis | Metric |
|---|---|---|
| 1 | Quiz entry point in the hero beats bestsellers-first for cold traffic | Home → PDP |
| 2 | One-time preselected beats subscription preselected on first visit | First-order CVR, sub share |
| 3 | Social proof above the buy box beats below | PDP → ATC |
| 4 | Sugar comparison chart on the PDP beats PDP without | PDP → ATC |

Test 2 matters most: preselecting subscription lifts sub share but may
suppress first-order conversion. The net LTV effect is an empirical question,
not a design opinion.

**Quarter 2**

| # | Hypothesis | Metric |
|---|---|---|
| 5 | Sticky mobile ATC bar beats inline-only | Mobile ATC |
| 6 | 3-flavour bestsellers beats 4 | Home → PDP |
| 7 | COD deposit of ₹99 reduces RTO more than it costs in conversion | Net revenue per session |
| 8 | Quiz at 3 questions beats 4 | Quiz completion → purchase |

**Test discipline:** one variable, two weeks minimum, 95% significance, and a
pre-registered primary metric. No peeking and no calling a test on day three.

## Post-purchase

| Day | Trigger | Purpose |
|---|---|---|
| 0 | Order confirmation | Set delivery expectation |
| 2 | Dispatch + WhatsApp tracking | Reduce "where is it" contact |
| 7 | Review request | Reviews; the fibre advisory repeats here |
| 14 | Subscription offer | Convert a satisfied one-time buyer |
| 30 | Replenishment nudge | Reorder |
| 60 | Win-back with new flavours | Reactivation |

Day 7 is chosen so they have actually finished a pack. A review request on day
2 gets a review of the packaging.

## Measurement

Primary: **revenue per session**, segmented by traffic source and device.
Everything else is diagnostic.

| Diagnostic | Watch for |
|---|---|
| Quiz drop-off by question | A question that is confusing rather than hard |
| Bundle abandonment at N cans | Capacity friction |
| Rank-1 quiz match vs. actual purchase | Whether the scoring weights are right |
| COD share by city | Where prepaid incentives should run |
| RTO rate by pincode | Where to stop offering COD |
| Subscription churn by cycle | Cycle 2 is the cliff — that is where interventions go |
