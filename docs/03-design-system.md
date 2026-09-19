# 03 · Design System

Everything here resolves to a token in `tailwind.config.ts` or a CSS custom
property in `app/globals.css`. If a value appears in a component but not here,
that is a bug in the component.

---

## 1. Colour

### Brand primaries

| Token | Hex | Role |
|---|---|---|
| `lime` | `#B8F135` | Signature. Hero accent, primary flavour world, active states |
| `tangerine` | `#FF6A1A` | Energy. Orange Masala world, "problem" side of the story |
| `berry` | `#6B2E8F` | Depth. Jamun / Kala Khatta worlds |
| `sunshine` | `#FFD029` | Warmth. Aam Panna world, highlights |
| `mint` | `#3FD9A4` | Trust. Verified badges, free-shipping unlock, savings |

Each ships as a 50–900 ramp so there is always a step with enough contrast for
the job. **The 400-level brand hue is for large areas, never for text or data
marks** — `#B8F135` on `#FFFDF7` is 1.32:1.

### Neutrals

| Token | Hex | Role |
|---|---|---|
| `cream` | `#FFFDF7` | Page surface |
| `ivory` | `#F6EFE2` | Alternating section surface |
| `sand` | `#E7DCC8` | Tertiary surface |
| `charcoal` | `#14110F` | Body text, primary buttons, dark sections |
| `charcoal-soft` | `#2B2622` | Secondary text |
| `charcoal-muted` | `#5C544D` | Tertiary text, captions |
| `charcoal-line` | `#D9CFBD` | Hairlines, card borders |

Body text on cream is 15.6:1. Muted text is 6.4:1. Both clear AA comfortably.

### Flavour worlds

The mechanism that lets one component set serve ten products. Each product
declares four values, applied as CSS custom properties by `worldVars()`:

```ts
--world-base   // signature hue — buttons, can body, glow
--world-deep   // dark shade — gradient end, meters, text on light
--world-wash   // page tint behind the product
--world-ink    // guaranteed-legible ink on --world-base
```

Any subtree can own a world. A product card, a carousel slide and a whole
page each re-skin independently without leaking into each other.

### Chart colours — a separate, validated set

Data marks do not use brand primaries. `lib/chartTokens.ts` holds darker steps
from the same ramps, validated against the light chart surface for lightness
band, chroma floor, CVD separation and 3:1 contrast:

```
#5C8310  #6B2E8F  #BC4104  #1A8F69      (fixed categorical order)
highlight #5C8310 · context #B8AFA2
```

Scope: **light surface only.** A dark-surface chart needs its own steps
selected and re-validated — this set does not survive being flipped.

---

## 2. Typography

| Role | Family | Why |
|---|---|---|
| Display | Bricolage Grotesque (600/700/800) | High contrast, slightly irregular — does the personality work |
| Sans | Inter | Tabular figures, which nutrition panels and price rows depend on |
| Mono | JetBrains Mono (500/600/700) | Eyebrows, badges, data labels |

All three are self-hosted via `next/font` — no render-blocking request to a
font CDN, no layout shift on swap.

### Fluid scale

Every step is a `clamp()`, so there are no type-only breakpoints.

| Token | Range | Use |
|---|---|---|
| `step--1` | 0.82 → 0.92rem | Captions, meta, fine print |
| `step-0` | 1 → 1.12rem | Body |
| `step-1` | 1.2 → 1.5rem | Lead paragraphs, card titles |
| `step-2` | 1.5 → 2.1rem | Sub-section headings |
| `step-3` | 1.9 → 3rem | Section headings |
| `step-4` | 2.1 → 3.4rem | Major section headings |
| `step-5` | 2.6 → 5rem | Page titles |
| `step-6` | 3 → 6.4rem | Hero only |

> **Integration note.** These names are not in tailwind-merge's default
> config. Left undeclared it classifies `text-step-2` as a text *colour* and
> silently drops a competing `text-cream` — which is how every dark button on
> the site ended up with invisible text. The scale is declared in the
> `font-size` class group in `lib/utils.ts`. Any new step must be added there
> too.

Headings use `text-wrap: balance`, body uses `text-wrap: pretty`.

---

## 3. Spacing, radius, elevation

```
spacing.section   clamp(4.5rem, 3rem + 7vw, 9rem)     vertical section rhythm
spacing.gutter    clamp(1.25rem, 0.85rem + 2vw, 3rem) horizontal page gutter
maxWidth.shell    88rem                                content container
maxWidth.prose    38rem                                reading measure
```

```
radius.pill    999px     buttons, chips, badges
radius.card    1.75rem   product cards, panels
radius.panel   2.5rem    large containers
```

```
shadow.lift   resting elevation
shadow.float  hover / modal elevation
shadow.glow   flavour-tinted, keyed to --glow-tint
```

---

## 4. Motion tokens

```
ease.frolic    cubic-bezier(0.22, 1, 0.36, 1)      standard — entrances, scroll
ease.elastic   cubic-bezier(0.34, 1.56, 0.64, 1)   buttons, toggles, selection
```

| Duration | Use |
|---|---|
| 180–260 ms | Hover, focus, colour change |
| 300–450 ms | Toggles, accordions, card swaps |
| 550–850 ms | Entrances, scroll reveals |
| 20 s+ | Ambient loops (marquee, gradient drift) |

Full specification in `06-motion-spec.md`.

---

## 5. Components

### Button

Variants: `primary` (charcoal/cream) · `ink` (cream/charcoal) · `world`
(flavour/auto-ink) · `outline` · `ghost`.
Sizes: `sm` 44px · `md` 48px · `lg` 56px — all clear the 44px touch minimum.

Behaviour: `-translate-y-0.5` on hover, `scale-0.97` on press, elastic easing.
The trailing `<Arrow/>` slides 4px on hover.

### Card

`rounded-card`, `border-charcoal-line`, `shadow-lift` at rest → `shadow-float`
and `-translate-y-1` on hover. Product cards additionally run CSS-only rising
bubbles inside the can well — no JS per card.

### Badge

`neutral` · `world` · `ink` · `mint`. Mono, uppercase, 0.16em tracking.
Product badges ("Most loved", "New") use `ink` for maximum contrast against a
flavour wash.

### Meter

Five segments, filled in `--world-deep`. Always paired with a numeric
`n/5` readout and `role="img"` with a text label — never colour alone.

### Form controls

48px minimum height, 2px border, `rounded-card`, border darkens on focus plus
the global 3px focus ring. **Labels are always visible** — never
placeholder-only.

### Navigation

Transparent at scroll 0, `bg-cream/85` + blur + hairline after 24px. The active
pill is a shared-layout element so it slides between items. Mobile opens a
full-screen sheet with staggered items and a body scroll lock.

---

## 6. Accessibility contract

- Body text ≥ 4.5:1; large text and UI boundaries ≥ 3:1.
- 3px focus ring in `--world-deep`, 3px offset, on every focusable element.
- Touch targets ≥ 44×44px.
- `prefers-reduced-motion` honoured globally **and** per-component: the 3D
  stage is not merely frozen, it is never fetched.
- Charts are never colour-alone: direct labels on every mark plus a table view.
- Decorative 3D is `aria-hidden`; its meaning lives in the surrounding copy.
- Skip-to-content link is the first focusable element.
