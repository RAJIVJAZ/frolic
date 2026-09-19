# 15 · Mobile Layouts

India is a mobile-first market by an enormous margin. Mobile is the design
target; desktop is the adaptation.

## Breakpoints

| Name | Width | Grid behaviour |
|---|---|---|
| base | 0–639 | 1 column, full-width CTAs, stacked forms |
| `sm` | 640 | 2-up cards, side-by-side buy options |
| `lg` | 1024 | Nav expands, PDP splits, carousel side-by-side |
| `xl` | 1280 | 4-up shop grid, 5-up flavours grid |

There are **no type-only breakpoints.** Every size is a `clamp()`, so
typography scales continuously and cannot break at an untested width.

Gutter: `clamp(1.25rem, 0.85rem + 2vw, 3rem)` — 20px at 390, 48px at 1440.
Section rhythm: `clamp(4.5rem, 3rem + 7vw, 9rem)`.

## Structural changes on mobile

### Hero — product first

The one deliberate reordering. On mobile the can is `order-1` and the copy
`order-2`; on `lg` this reverses.

```
390px                          1024px+
┌─────────────┐                ┌──────────┬──────────┐
│   ▓ CAN ▓   │  46svh         │ headline │  ▓ CAN ▓ │
├─────────────┤                │ sub      │          │
│ chip        │                │ CTAs     │          │
│ headline    │                │ stats    │          │
│ sub         │                └──────────┴──────────┘
│ [Shop Now]  │  full width
│ [Explore]   │  full width
│ 7g −75% 10  │
└─────────────┘
```

Product-first is the right hierarchy on a phone — the can is the most
information-dense element available and it earns the first screen. The `<h1>`
still clears the fold at 390 × 844.

### Navigation

Below `lg`, primary nav collapses to a full-screen sheet:

- Opens with a 300ms fade + 12px rise; items stagger in at 45ms.
- Body scroll locked while open.
- Closes automatically on route change.
- Includes **Shop All** at the top and **Flavour Quiz** at the bottom — the
  quiz is promoted on mobile specifically, because guided discovery matters
  more on a small screen.
- Trigger is a 44×44 button; every sheet item is a 60px-tall row.

Cart and wordmark stay in the bar at all widths. The `Shop` button hides below
`sm` to protect the cart's touch target.

### Horizontal rails

Four surfaces scroll horizontally rather than wrapping:

| Rail | Content |
|---|---|
| Announcement | Value-prop marquee |
| Flavour selector | Ten flavour chips |
| Shop filters | Six profile filters |
| Ingredient filters | Six category filters |

All use `.rail`: `scroll-snap-type: x mandatory`, hidden scrollbar,
`-webkit-overflow-scrolling: touch`, and `scroll-snap-align: center` on
children. Filter rails do not snap — snapping a filter row makes it feel
sticky rather than responsive.

### Cart drawer

`max-w-[28rem]`, which is full-width below 448px. Spring-in from the right,
focus trapped, `Escape` closes, body scroll locked.

### Bundle builder

Desktop: two columns with a sticky summary.
Mobile: picker stacks; the summary becomes a **bottom sticky bar** showing
capacity, total and the CTA — the two things you need while choosing.

### Charts

Bars go full width; labels move above the bar rather than beside it. The
measure toggle and table toggle stack below the heading. Values stay directly
on the bars.

### PDP

Desktop has a sticky can column. Mobile stacks: can → badges → H1 → tagline →
reviews link → notes → buy box. The buy box is reached in one thumb-scroll.

## Touch

| Rule | Implementation |
|---|---|
| Minimum target | 44×44 CSS px — button `sm` is 44px, `md` 48px, `lg` 56px |
| Quantity steppers | 36×36 visual, 44px hit area via padding |
| Spacing between targets | ≥ 8px |
| Thumb zone | Primary CTAs in the lower two-thirds; destructive actions never there |
| `touch-action` | `pan-y` on the 3D canvas so vertical scroll is never captured |
| Tap highlight | Suppressed; replaced with an explicit active state |

## Performance on mobile

The capability gate in `LazyCanStage` is primarily a mobile protection. A
mid-range Android on a 3G connection gets the CSS can and never downloads
three.js:

```
hardwareConcurrency < 4   → no 3D
deviceMemory < 4          → no 3D
saveData === true         → no 3D
effectiveType === '2g'    → no 3D
prefers-reduced-motion    → no 3D
element > 200px away      → not yet
```

Other mobile-specific measures:

- `overflow-x: clip` on `body` — prevents iOS horizontal jitter when the
  address bar collapses over a fixed canvas.
- `svh` units throughout, not `vh`, so layouts do not jump as browser chrome
  shows and hides.
- Fonts self-hosted via `next/font`; no third-party font request.
- `viewportFit: 'cover'` plus safe-area-aware gutters.
- All indexable routes statically prerendered.

## Verified

| Check | Result |
|---|---|
| Horizontal overflow at 390px | 0px on `/`, `/shop`, `/products/*`, `/bundle` |
| First Load JS | 170 kB (from 405 kB before the gate was moved) |
| 3D on low-capability device | Not fetched |
| Hero `<h1>` above the fold at 390×844 | Yes |
| Prerendered routes | 37/37 |

## Targets

| Metric | Mobile target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | 100 |
| LCP | < 2.0s |
| CLS | < 0.05 |
| INP | < 150ms |
