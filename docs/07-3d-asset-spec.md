# 07 · 3D & Photography Asset Specification

## Current state: zero assets

The shipped can is generated entirely from primitives at runtime. There is no
`.glb`, no texture file and no HDR. This is a deliberate architectural choice,
not a placeholder:

- **A new flavour ships by adding a row to `lib/products.ts`.** No modelling,
  no UV work, no re-export, no CDN upload.
- **Nothing in the render path can 404.** The original build used drei's
  `<Environment preset="studio">`, which fetches ~1 MB of HDR from a
  third-party CDN; when it failed, the whole page went down with it.
- **The label always matches the design tokens**, because it is drawn from
  them.

This section specifies both what exists and what a photographic or
high-fidelity 3D replacement would need to match.

---

## 1. Can geometry

Real-world reference: **250 ml sleek can, Ø53 mm × 134 mm.** Scene units are
decimetres, so the can is 0.53 × 1.34.

```
Profile (LatheGeometry, 64 segments, bottom → top):
  (0.000, -0.670)   base centre
  (0.164, -0.670)   base floor
  (0.239, -0.625)   base chime
  (0.265, -0.560)   wall start
  (0.265,  0.470)   wall end          ← straight section
  (0.246,  0.565)   shoulder taper
  (0.207,  0.635)
  (0.191,  0.670)   neck
  (0.199,  0.688)   rolled rim
  (0.186,  0.696)
  (0.000,  0.696)   lid plane
```

| Part | Geometry | Material |
|---|---|---|
| Shell | Lathe, 64 seg | `#d8d8dc`, metalness 0.92, roughness 0.28 |
| Sleeve | Open cylinder, r × 1.004, 64 seg | label texture, metalness 0.35, roughness 0.42 |
| Lid | Circle, r × 0.7 | `#c2c2c8`, metalness 0.95, roughness 0.22 |
| Tab | Ring 0.032–0.058 | `#aaaab2`, metalness 0.95, roughness 0.30 |

The sleeve sits 0.4% proud of the shell so the print never z-fights with the
metal.

**Poly budget for a replacement GLB:** ≤ 6k triangles, one 2048² albedo, one
ORM map, Draco-compressed, ≤ 180 kB. Must still be behind `LazyCanStage`.

---

## 2. Label texture

Generated at 2048 × 1024 on a 2D canvas. Width maps to circumference, height
to the printed band.

```
┌─────────── PANEL A (1024) ───────────┬─────────── PANEL B ───────────┐
│         ← SAFE_WIDTH 560px →         │        (identical)            │
│  0.12   P R E B I O T I C   S O D A  │                               │
│  0.36        F R O L I C             │  ← fit-to-width, max 150px    │
│  0.46   ◯◯◯ concentric arcs, 16%     │                               │
│  0.50   ▐ FLAVOUR NAME ▌ ink pill    │  ← fit-to-width, max 52px     │
│  0.67   NOTE · NOTE · NOTE           │  ← fit-to-width, max 26px     │
│  0.83   250 ML   (7g FIBRE)   NO CAF │                               │
└──────────────────────────────────────┴───────────────────────────────┘
```

**The safe width matters.** Only ~⅓ of a cylinder's circumference faces the
camera. Two panels guarantee a lockup is always visible, but content wider
than `SAFE_WIDTH` runs past the panel edge and the viewer sees two lockups
colliding at the seam. `fitText()` shrinks type until it fits, which is also
what lets "Jeera" and "Himalayan Lemon" both sit correctly on the name pill.

Background: vertical gradient `base → base (62%) → deep`, with 5%-opacity
white bands every 48px to suggest printed aluminium and give the rotating can
something to catch light on.

---

## 3. Lighting rig

Procedural, via `<Environment resolution={128} frames={1}>` with
`<Lightformer>` children. Standard three-point:

| Light | Form | Position | Rot | Scale | Intensity | Colour |
|---|---|---|---|---|---|---|
| Key | rect | 2.5, 3, 2 | −45° x | 6×6 | 2.6 | `#ffffff` |
| Fill | rect | −3.5, 1, −1.5 | 75° y | 5×5 | 0.9 | `#e8f0ff` |
| Edge L | rect | −2, 0, 1.5 | 60° y | 0.35×5 | 3.2 | `#ffffff` |
| Edge R | rect | 2, 0.4, 1.2 | −60° y | 0.25×4.5 | 2.2 | `#fff6e8` |
| Bounce | rect | 0, −3, 0 | 90° x | 8×8 | 0.5 | `#fffdf7` |

The two thin edge strips are what become the long vertical highlights down the
can — they are the single most important element for reading it as metal.

Scene lights: ambient 0.85, directional key 1.5 at (3,4,3), directional rim
0.6 at (−3,1.5,−2) tinted `--world-base`.
Camera: position (0, 0.08, 3.1), fov 34. Long lens, minimal perspective
distortion — product-photography convention.

---

## 4. Particles

**Carbonation** — one `InstancedMesh`, sphere r=1 at 10×10 segments, scaled
per instance.

```
count      70–110 depending on surface
radius     0.006 – 0.023
rise       0.18 – 0.68 units/s, plus r × 4 (bigger bubbles rise faster)
wobble     sin(t × 0.5–2.1) × 0.06 on x
z range    −0.35 to −1.45          ← behind the can, always
opacity    0.22, depthWrite false
```

> Keep bubbles behind the can and shallow in z. Bubbles that drift toward the
> camera render as large opaque blobs, not carbonation.

**Floating forms** — icosahedra at detail 0–2, abstract rather than modelled
fruit. Deliberate: a low-poly shape reads as a graphic choice, a low-poly
mango reads as a failed mango.

```
count 6–7 · scale 0.055–0.121 · z −1.1 to −2.6
orbit radius 1.45–2.05 · bob sin(t × 0.25–0.73) × 0.22
colours [world.base, world.deep, #FFFDF7]
```

---

## 5. Photography direction (per flavour)

Each product carries an `environment` brief in `lib/products.ts`. These are the
art-direction notes for a real shoot or a high-fidelity render.

| Flavour | Brief |
|---|---|
| Nimbu Masala | Sun-bleached limes mid-bounce over chalk-white, hard noon shadow, salt crystals suspended |
| Aam Panna | Mango orchard at golden hour, backlit leaves, dust in the light shafts |
| Kokum | Wet black volcanic rock, breaking-wave spray, fruit half-submerged in a tide pool at dusk |
| Jamun | Violet splash frozen mid-crown against near-black, glossy skin highlights |
| Kala Khatta | Neon-lit night market, crushed ice under a bare bulb, indigo syrup arcing through frame |
| Ginger Lime | Cracked ginger root and lime halves on warm travertine, low raking light |
| Jeera | Toasted cumin on raw linen, tungsten light, a thin curl of smoke |
| Himalayan Lemon | Pale morning fog over still water, one lemon on wet slate, condensation on cold glass |
| Guava Chili | Halved pink guava on terracotta, chilli flakes in a light shaft, coral-to-red gradient |
| Orange Masala | Blood-orange cross-sections backlit like stained glass, spice dust in the beam |

**Shared constraints:** 85–135 mm equivalent; can occupies 55–70% of frame
height; one dominant light direction per flavour; the flavour's `wash` colour
must be recoverable from the background; never more than three props in frame.

Delivery: 3000×3750 (4:5) master, AVIF + WebP at 360/640/1024/1536/1920,
`next/image` with `priority` on the PDP hero only.

---

## 6. Rules for anything added later

1. Nothing in the 3D render path may fetch from a third-party origin.
2. Any new asset loads behind `LazyCanStage` — never eagerly, never on mobile
   without passing the capability gate.
3. Every 3D surface has a CSS or image fallback that is acceptable on its own.
4. Decorative 3D is `aria-hidden`; its meaning lives in the surrounding copy.
5. Budget: ≤ 250 kB total per scene after compression.
