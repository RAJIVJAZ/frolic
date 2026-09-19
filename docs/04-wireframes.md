# 04 · Wireframes

Low-fidelity structure for every template. `[ ]` is a block, `▓` is an image or
3D surface, `━` a divider. Desktop is 1440; mobile is 390.

---

## Home — desktop

```
┌──────────────────────────────────────────────────────────┐
│ ✳ announcement marquee                                   │  36px
├──────────────────────────────────────────────────────────┤
│ FROLIC      Flavours  Science  Ingredients  Story  Sub    │  72px sticky
│                                       [Shop] [🛒 0]      │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ( chip: 7g fibre · 4g sugar · 0 caffeine )              │
│                                        ▓▓▓▓▓▓            │
│  India's most                         ▓▓▓▓▓▓▓▓           │  hero
│  exciting                            ▓▓ 3D CAN ▓▓        │  92svh
│  functional soda                      ▓▓▓▓▓▓▓▓           │
│                                        ▓▓▓▓▓▓            │
│  Subheadline, two lines                                  │
│  [Shop Now →]  [Explore Flavours]                        │
│  7g          −75%          10                            │
│                      ↓ scroll                            │
├──────────────────────────────────────────────────────────┤
│ Start here                            [Shop all ten →]   │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                      │  bestsellers
│ │ can  │ │ can  │ │ can  │ │ can  │                      │
│ │ name │ │ name │ │ name │ │ name │                      │
│ │ ₹    │ │ ₹    │ │ ₹    │ │ ₹    │                      │
│ │[Add] │ │[Add] │ │[Add] │ │[Add] │                      │
│ └──────┘ └──────┘ └──────┘ └──────┘                      │
├──────────────────────────────────────────────────────────┤
│ ███████████ STICKY SCRUB — 280svh ███████████            │
│  THE PROBLEM                                             │
│  Soda got very good at one thing: sugar.                 │  story
│  8–10 │ <50% │ 0g                                        │  (desaturated)
│         ↓ crossfade at 50% ↓                             │
│  WHAT WE DID                                             │
│  So we rebuilt it from the fibre up.                     │  (full colour)
│  7g │ 4g │ 10          [Read the full story →]           │
├──────────────────────────────────────────────────────────┤
│ Ten flavours                                  [←] [→]    │
│        ▓▓▓▓▓▓        │  MOST LOVED  7g  32kcal           │  carousel
│       ▓▓ 3D ▓▓       │  Nimbu Masala Fizz                │  (world-tinted)
│        ▓▓▓▓▓▓        │  tagline / story                  │
│                      │  [note][note][note]               │
│                      │  Intensity ▓▓▓▓░  Sweet ▓▓░░░     │
│                      │  [Add 12-pack] [Full details →]   │
│ (•)(•)(•)(•)(•)(•)(•)(•)(•)(•)  ← flavour rail           │
├──────────────────────────────────────────────────────────┤
│ Fibre is the part everyone skipped.                      │
│ ┌──────────────────────────────────────────────┐         │  science
│ │ Sugar per 250ml        [sugar|fibre] [table] │         │
│ │ FROLIC        ████ 6g                        │         │
│ │ Juice         ████████████████ 24g           │         │
│ │ Cola          ██████████████████ 27g         │         │
│ └──────────────────────────────────────────────┘         │
│ What a prebiotic is  │  01 → 02 → 03 steps               │
├──────────────────────────────────────────────────────────┤
│ Ingredients — 6 cards, expandable                        │
├──────────────────────────────────────────────────────────┤
│ ✳ press marquee ✳                                        │
│ 4.7 ★ 2,847      │  ┌────┐┌────┐                         │  social
│ 5★ ████████ 78%  │  │rev ││rev │                         │
│ 4★ ██ 15%        │  └────┘└────┘                         │
│ #SipDifferent — 6-up UGC grid                            │
├──────────────────────────────────────────────────────────┤
│ ███ The fridge stays full. ███                           │
│ 01 Save 20% │ 02 Swap │ 03 Skip │ 04 First access        │  subscribe
│ [Start a subscription →]  [Take the quiz]                │
├──────────────────────────────────────────────────────────┤
│ FOOTER — wordmark · signup · 3 nav columns               │
│ all ten flavours · legal · disclaimer · ▓FROLIC▓ crop    │
└──────────────────────────────────────────────────────────┘
```

## Home — mobile (390)

Single column. The one structural change: **the can moves above the headline**
(`order-1` / `order-2`). Product-first is the right hierarchy on a phone, and
the headline still clears the fold.

```
┌───────────────┐
│ ✳ marquee     │
│ FROLIC 🛒 ☰   │
├───────────────┤
│    ▓▓▓▓▓      │  46svh
│   ▓▓ CAN ▓▓   │
│    ▓▓▓▓▓      │
├───────────────┤
│ ( chip )      │
│ India's most  │
│ exciting      │
│ functional    │
│ soda          │
│ sub…          │
│ [Shop Now →]  │  full-width
│ [Explore]     │
│ 7g −75% 10    │
└───────────────┘
Bestsellers → 1-up stack
Carousel    → can above detail; rail scrolls horizontally
Charts      → bars full-width, labels above
UGC         → 2-up grid
Footer      → columns stack
```

---

## PDP

```
DESKTOP                                MOBILE
┌────────────┬────────────┐            ┌───────────┐
│            │ breadcrumb │            │breadcrumb │
│            │ badges     │            │  ▓ CAN ▓  │  46svh
│    ▓▓▓     │ H1         │            │ badges    │
│  ▓ CAN ▓   │ tagline    │            │ H1        │
│    ▓▓▓     │ ★ reviews  │            │ tagline   │
│  (sticky)  │ notes      │            │ ★ reviews │
│            │┌──────────┐│            │┌─────────┐│
│            ││ BUY BOX  ││            ││ BUY BOX ││
│            ││ Sub│Once ││            ││ stacked ││
│            ││ 6│12│24  ││            │└─────────┘│
│            ││ cadence  ││            └───────────┘
│            ││ ₹ total  ││
│            ││ [ADD]    ││
│            │└──────────┘│
└────────────┴────────────┘
Story + ritual/pairing  │  Nutrition panel (sticky col)
Ingredient list (linked)│  Art-direction swatches
━ Reviews (3-up) ━
━ Related (4-up) ━
```

## Shop

```
H1 + intro                                    [Take the quiz →]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[All][Citrus][Spiced][Fruity][Tart][Herbal]   Sort [▾]
Showing 10 of 10                                    ← live region
┌────┐┌────┐┌────┐┌────┐     4-up @1280 · 3-up @1024
└────┘└────┘└────┘└────┘     2-up @640  · 1-up @390
```

## Quiz

```
Question 3 of 4                              Back
▓▓▓▓▓▓▓▓░░░░░░░░
How loud should it be?
helper text
┌──────────────┐┌──────────────┐
│ Easy-going   ││ Confident    │      2-up desktop
└──────────────┘└──────────────┘      1-up mobile
┌──────────────┐
│ Hit me       │
└──────────────┘
            ↓ RESULTS ↓
Start with Kokum.            ← best match named in the H2
┌──────┐┌──────┐┌──────┐
│BEST  ││ #2   ││ #3   │
└──────┘└──────┘└──────┘
[Add all three 6-packs · ₹2,106]  [Start over]
```

## Bundle builder

```
DESKTOP  ┌─────────────────────┬──────────────┐
         │ [12 cans][24 cans]  │  YOUR BOX    │
         │           Surprise  │  8/12        │
         │ ┌────────┐┌────────┐│  ▓▓▓▓░░░░    │
         │ │can −2+ ││can −0+ ││  ▐▐▐▐▐▐▐▐    │ ← visual stack
         │ └────────┘└────────┘│  ☑ Subscribe │
         │ … ×10               │  ₹ per can   │
         │                     │  ₹ total     │
         │                     │  [ADD BOX]   │ ← disabled until full
         └─────────────────────┴──────────────┘
                                  (sticky)
MOBILE   picker stacks; summary becomes a bottom sticky bar
```

## Cart drawer

```
        ┌─────────────────────┐
        │ Your cart       [×] │
        ├─────────────────────┤
        │ ₹214 to free ship   │
        │ ▓▓▓▓▓▓▓▓░░░░        │
        ├─────────────────────┤
        │ ▐ Kokum      Remove │
        │   12-can pack       │
        │   [Subscription]    │
        │   [− 1 +]     ₹1,224│
        ├─────────────────────┤
        │ Subtotal     ₹1,224 │
        │ You save      −₹336 │
        │ Shipping       Free │
        │ Total        ₹1,224 │
        │ [    CHECKOUT    ]  │
        └─────────────────────┘
          max-w 28rem · full-width on mobile
```

## Breakpoints

| Name | Width | Grid |
|---|---|---|
| base | 0–639 | 1 col, stacked, full-width CTAs |
| sm | 640 | 2-up cards, side-by-side buy options |
| lg | 1024 | Nav expands, PDP splits, carousel side-by-side |
| xl | 1280 | 4-up shop grid, 5-up flavours grid |
