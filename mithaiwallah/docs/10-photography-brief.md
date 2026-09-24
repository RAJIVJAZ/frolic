# 10 · Photography & Film Brief

The site ships with illustrations so it can launch before the shoot. Real photography is the single biggest upgrade to trust and conversion — book it for Phase 1.

## Look

Warm, cinematic, quiet. Single soft key light from the side (a large window or a softbox through diffusion), deep warm shadows, no flash, no flat light. Surfaces: cream linen, brass, dark walnut, maroon velvet. Props sparingly: marigold, rose petals, cardamom, saffron, a diya. See doc 01 §8.

## Product stills — per sweet (×6)

| # | Shot | Use | File name |
|---|---|---|---|
| 1 | 45° hero on a porcelain plate with a gold rim, cream background, 3 pieces | Product page hero, cards | `/public/media/products/{slug}-hero.jpg` |
| 2 | Macro of texture / grain / cut face | Product page, Instagram | `{slug}-macro.jpg` |
| 3 | Top-down in a brass thali with props | Collection page, social | `{slug}-thali.jpg` |
| 4 | In an open gift box | Gifting pages | `{slug}-box.jpg` |
| 5 | Hands: making, cutting or garnishing | Story sections | `{slug}-hands.jpg` |

Deliver 3000 px on the long edge, sRGB JPG, plus 4:5 crops for Instagram. Then set, for example:

```ts
photo: { src: '/media/products/milk-cake-hero.jpg', alt: 'Milk cake on a gold-rimmed plate, cut to show its caramel centre' },
```

## Packaging & gifting

- The three collections closed and open (maroon, ivory, gold/trunk), on cream and on maroon velvet
- A box with a sample foil logo ("YOUR LOGO") and one with a wedding monogram ("A & R")
- Rows of identical boxes (only from a real order, with permission)
- Hamper build sequence, ribbon close-ups, message card

## Kitchen & team

- Milk arriving and being checked; kadhais on the flame; the first stir
- Halwais at work — faces with signed model releases, hands without
- Packing table; dispatch labelled by city
- Founder portrait in the kitchen (environmental) and one clean headshot

## Hero film (home page)

- 10–20 s seamless loop, **no audio**, H.264 MP4, 1920×1080, under 8 MB (+ a 720p version for mobile if possible), plus a poster JPG of the first frame
- Sequence: milk pour (120 fps) → ladle stir → knife through milk cake revealing the caramel → varq on barfi → a box lid closing, ribbon pulled → the full thali under warm light
- Keep the centre third calm — the headline sits over it
- Save as `/public/media/hero.mp4` and `/public/media/hero.jpg`; set `BRAND.heroVideo`

## Reels footage bank

Shoot vertical 4K at 60/120 fps alongside the stills; doc 03b lists the exact shots for the first 30 posts. Two kitchen days cover all of them.

## Rights

Written model releases for every identifiable person; client permission before showing any client's logo or order; the business owns all rights (full buyout) including use in ads.
