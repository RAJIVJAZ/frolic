# 05 · High-Fidelity UI Specification

The built site *is* the high-fidelity deliverable — this file records the
decisions that are not obvious from reading the components.

## Hero

Two-column at `lg`, stacked below. The copy column parallaxes to `-38%` and
fades out by 62% scroll; the can holds longer and scales to 0.82. The
divergence is intentional: the product stays present while the words leave.

Scroll progress drives can tilt through a **ref**, not state
(`useMotionValueEvent` → `spinRef`). Scrolling therefore costs zero React
renders — the 3D loop samples the ref in `useFrame`.

The `<h1>` is the LCP element on most pages, so it is animated with **CSS, not
Framer Motion**. A Framer `initial` state is inlined into the SSR markup as
`opacity: 0`; the headline would be invisible until hydration and invisible
forever without JS. The CSS version animates transform only, inside an
overflow-hidden mask — opaque from the first frame.

## Flavour worlds

Switching a flavour re-skins the entire section via four CSS custom properties.
No class swapping, no conditional Tailwind, no per-flavour stylesheet.

```tsx
<section style={{ ...worldVars(product.world), background: product.world.wash }}>
```

`--world-ink` is authored per flavour rather than computed, so the ink on a
`--world-base` fill is always a deliberate choice: charcoal on the light
flavours, cream on Kokum, Jamun, Kala Khatta and Guava Chili.

## Product card

The can is CSS, not 3D. Ten WebGL contexts in a grid is not viable, and at card
size a gradient rectangle with a specular strip and a top highlight is
indistinguishable from a render. Hover adds rising bubbles — also pure CSS,
`animation-delay` staggered, zero JS per card.

`Add` gives optimistic feedback: the label becomes "Added ✳" and the variant
flips to `world` for 1.6s. `aria-live="polite"` announces it.

## Buy box

Purchase mode is chosen **before** pack size, because mode is the higher-stakes
decision and pack size reads differently once it is made. Subscription is
preselected and flagged "Best value"; one-time is a single tap away and equally
prominent in weight. The price block recomputes live and shows the struck list
price only when there is a real saving.

Discounts stack multiplicatively (`(1 - pack) × (1 - sub)`), not additively, so
a 24-can subscription lands at 32% rather than 35% and never approaches cost.

## Charts

Follow `dataviz`. Single series, so no legend — the heading names the measure.
Horizontal bars, because the category labels are long. Every bar is directly
labelled. Emphasis encoding: FROLIC in `#5C8310`, context bars in `#B8AFA2`.
4px rounded data-end, anchored to the baseline. A "View as table" toggle
renders a real `<table>` with row headers.

Bars animate width on `whileInView` with an 80 ms stagger, `once: true`.

## Nutrition panel

Mirrors the printed can label so the two can be checked against each other.
Real `<table>` with `<th scope="row">` — a screen reader announces which value
belongs to which nutrient. 2px charcoal border, tabular figures.

## Bundle builder

Capacity is a hard constraint: `+` disables at capacity, `Add box` stays
disabled until the box is exactly full. Shrinking 24 → 12 trims from the end
rather than clearing, so the customer's earliest choices survive.

Each chosen can appears as a coloured strip in the summary, spring-animated in
and out. It is the fastest read of "what is in my box" available.

Bundle lines carry a `unitPrice` into the cart. Without it, a 4-can share of a
24-can box would be re-priced as a 4-can pack and the cart total would disagree
with the price the customer was shown.

## Story scrub

280svh of scroll driving one sticky viewport. `saturate()` runs 0 → 1 across
the transition, so the "old soda" half is literally desaturated and colour
arrives with the solution. Under `prefers-reduced-motion` this is not slowed
down — it is replaced with two ordinary stacked panels.

## Empty, loading and error states

| State | Treatment |
|---|---|
| Empty cart | Illustrated panel, one sentence, "Browse flavours" |
| No filter matches | Inline sentence, filters stay visible |
| 3D unavailable | CSS can — indistinguishable at card size, close enough at hero size |
| 3D throws | `StageBoundary` swaps in the CSS can; page unaffected |
| 404 | Branded, lists all ten flavours as recovery links |
| Cart not yet hydrated | Badge renders `0` until `hydrated`, preventing a count flash |
