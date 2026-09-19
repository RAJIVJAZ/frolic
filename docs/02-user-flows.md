# 02 · User Flows

Five flows carry effectively all revenue. Each is written as the path plus the
specific moment it tends to fail, because the failure point is where the design
work actually is.

---

## Flow A — Cold visitor → first purchase

```
Paid social / search
  ↓
Home — hero states the category and the two numbers (7g fibre, 4g sugar)
  ↓
Bestsellers (4 cards)  ──or──  Flavour carousel (all 10)
  ↓
PDP: story · nutrition · buy box
  ↓
Buy box — subscription preselected, one-time one tap away
  ↓
Cart drawer — free-shipping progress bar
  ↓
Checkout (Shopify)
```

**Where it fails:** ten flavours is too many for a cold visitor. They open
three PDPs, fail to choose, and leave.

**Mitigations in the build:** bestsellers section limits the first choice to
four; `/quiz` is offered from the shop header, the mobile nav and the
subscription CTA; the 6-can pack exists specifically so "I don't know which one"
is a cheap decision.

---

## Flow B — Undecided visitor → quiz → purchase

```
Any page → Quiz CTA
  ↓
Q1 profile → Q2 sweetness → Q3 intensity → Q4 occasion
  ↓
Weighted scoring across the live catalogue
  ↓
Three ranked matches, best-match badged
  ↓
"Add all three 6-packs" (one action) ── or ── individual PDPs
```

**Design notes.** Four questions, not eight — completion beats precision.
Progress bar and a Back control on every step. Scoring is a transparent
weighted sum over `lib/products.ts`, so adding a flavour makes it reachable
with no quiz edits. Bestsellers get a small tie-break nudge.

---

## Flow C — One-time buyer → subscriber

```
Post-purchase email (day 7, after they have finished a pack)
  ↓
/subscribe — three-step explainer
  ↓
Bundle builder, subscription toggle on by default
  ↓
Fill 12 or 24 → choose cadence → subscribe
```

**Where it fails:** fear of being trapped. Answered inline at the decision
point — "skip or cancel anytime" sits inside the buy box, not in a policy page,
and the subscription FAQ states there is no minimum term and no cancellation
fee.

---

## Flow D — Returning customer → reorder

```
Account → order history → reorder
   or
Subscription reminder email (3 days pre-charge) → swap flavours → confirm
```

The reminder email is deliberately actionable rather than transactional: the
primary link is "change this box", not "view order". A subscriber who edits a
box is materially less likely to cancel it.

---

## Flow E — Researcher → convinced → purchase

```
Search: "prebiotic vs probiotic" / "how much sugar in soft drinks"
  ↓
/journal/<post> — answers the question, does not pitch
  ↓
In-article product block
  ↓
/science — mechanism, dose, and what we explicitly do not claim
  ↓
/ingredients → a specific flavour → PDP
```

This audience converts on restraint. The under-claiming on `/science` is a
conversion decision as much as a compliance one.

---

## Cart & checkout

```
Add → drawer opens (confirms the action, shows progress to free shipping)
  ↓
Line edit / quantity / remove
  ↓
Checkout → Shopify-hosted
     Address → Shipping → Payment (UPI · cards · netbanking · COD)
  ↓
Confirmation → account auto-created
```

Cart state persists to `localStorage` (`frolic-cart-v1`) and survives a reload.
Server-side persistence begins at checkout, where Shopify owns the cart.

## Accessibility notes on flows

- Every flow is completable by keyboard alone.
- The quiz advances on selection with a 180 ms delay so the selected state is
  perceivable before the panel changes.
- The cart drawer traps focus, closes on `Escape`, and restores focus on close.
- Live regions announce cart count, filter result counts and bundle capacity.
