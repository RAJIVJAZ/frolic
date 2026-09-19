# 06 · Motion Design Specification

## Principles

1. **Motion explains, it does not decorate.** Every animation either shows
   causality (this came from that), confirms an action, or directs attention.
2. **Interruptible.** No animation blocks input. Nothing waits for a
   transition to finish.
3. **Reduced motion is a different design, not a disabled one.** Freezing a
   scroll-scrub mid-way is a broken layout. Those sequences are replaced with
   static compositions that carry the same information.
4. **60fps or it does not ship.** Transform and opacity only. No animated
   `width`, `top`, `box-shadow` or `filter` on scroll-linked elements.

## Easing & duration

```
ease.frolic    cubic-bezier(0.22, 1, 0.36, 1)      entrances, scroll, layout
ease.elastic   cubic-bezier(0.34, 1.56, 0.64, 1)   buttons, toggles, selection
spring         stiffness 320–400, damping 26–36    drawers, chips, progress
```

| Band | Duration | Applies to |
|---|---|---|
| Micro | 180–260 ms | Hover, focus, colour |
| Small | 300–450 ms | Toggle, accordion, card swap |
| Entrance | 550–850 ms | Scroll reveal, headline, page-level |
| Ambient | 6–38 s | Marquee, gradient drift, can bob |

## Catalogue

### Scroll reveal — `<Reveal>`

```
from  opacity 0, translateY 28px
to    opacity 1, translateY 0
      750ms · ease.frolic · stagger index × 60ms
      viewport { once: true, amount: 0.25 }
```
Reduced motion: renders the end state immediately.

### Headline — `<RevealWords>`

```
per word  translateY 110% → 0 inside an overflow-hidden mask
          850ms · ease.frolic · stagger 55ms · animation-fill-mode backwards
```
**Opacity is never animated.** This is a CSS animation, not Framer Motion,
specifically so the LCP element paints opaque at first frame and survives a
JS failure. Reduced motion renders plain text.

### Hero parallax

| Element | Range | Output |
|---|---|---|
| Copy | 0 → 1 | `y: 0 → -38%`, `opacity: 1 → 0` by 0.62 |
| Can | 0 → 1 | `scale: 1 → 0.82` |
| Can tilt | 0 → 1 | `0 → 14` rad, written to a ref, lerped at 0.06 |

### Story scrub

```
0.02 → 0.46   problem opacity 1 → 0, y 0 → -12%
0.36 → 0.62   colour wash opacity 0 → 1
0.10 → 0.50   saturate(0) → saturate(1)
0.50 → 0.98   solution opacity 0 → 1, y 14% → 0
```
Reduced motion: two stacked static panels, no sticky, no scrub.

### Flavour carousel

```
exit    opacity 1→0, scale 1→0.9, rotate ±6°
enter   opacity 0→1, scale 0.9→1, rotate ∓6°→0
        550ms · ease.frolic · AnimatePresence mode="wait"
```
Direction of rotation follows navigation direction. The section background
crossfades over 700ms via CSS transition on the world variables.

### Micro-interactions

| Trigger | Response |
|---|---|
| Button hover | `translateY(-2px)`, shadow lift→float, 300ms elastic |
| Button press | `scale(0.97)` |
| Arrow hover | `translateX(4px)`, 300ms elastic |
| Card hover | `translateY(-4px)`, shadow float, bubbles fade in over 500ms |
| Can hover (card) | spring rotate -3°, y -6px |
| Nav active | shared-layout pill, spring 380/32 |
| Add to cart | label swap + variant flip, 1.6s, `aria-live` |
| Accordion | height auto, 400ms ease.frolic |
| Progress bars | spring 180–200 / 26–28 |

### Ambient

| Element | Spec |
|---|---|
| Marquee | 30–52s linear, infinite, duplicated track translated -50% |
| Can bob | `sin(t × 0.9) × 0.04` units, `sin(t × 0.55) × 0.045` rad tilt |
| Can spin | 0.35 rad/s idle |
| Bubbles | rise `0.18–0.68 + r×4` units/s, wobble `sin(t × 0.5–2.1)` |
| Gradient drift | scale 1→1.08, rotate 0→3°, 22s |

## 3D performance contract

The WebGL stage must never be the reason a page is slow. Enforced by:

1. **Gates outside the dynamic-import boundary.** `LazyCanStage` decides
   before `import('./CanStage')` is reached. three.js is *not fetched at all*
   unless all of these pass:
   - element within 200px of viewport (`IntersectionObserver`)
   - `prefers-reduced-motion: no-preference`
   - WebGL context obtainable
   - `saveData !== true`, `effectiveType !== 2g`
   - `hardwareConcurrency >= 4`, `deviceMemory >= 4`

   Measured effect: First Load JS 405 kB → 170 kB.

2. **No network assets in the render path.** The can label is generated on a
   2D canvas at runtime; the environment map is built from `<Lightformer>`
   geometry. Zero bytes fetched, and nothing that *can* fail.
   > drei's `<Environment preset="studio">` was the original implementation.
   > It fetches ~1 MB of HDR from a third-party CDN, and when that fetch fails
   > the loader throws inside Suspense and unmounts the entire page. Do not
   > reintroduce it.

3. **One draw call for carbonation.** `InstancedMesh`, per-instance matrix
   updated in `useFrame`. 120 bubbles cost roughly what one sphere costs.

4. **`dpr={[1, 2]}` + `AdaptiveDpr`** — resolution drops automatically under
   sustained load rather than dropping frames.

5. **Canvas unmounts when scrolled away**, releasing the GL context.

6. **`StageBoundary`** catches anything that still goes wrong and swaps in the
   CSS can.

## Budgets

| Metric | Budget |
|---|---|
| LCP | < 2.0s (target), < 2.5s (fail) |
| CLS | < 0.05 |
| INP | < 150ms |
| First Load JS | < 180 kB |
| 3D chunk | conditional; never on the critical path |
| Dropped frames during scroll scrub | < 2% |
