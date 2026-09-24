# 01 · Brand Guidelines

> **Mithaiwallah** — *Handcrafted Traditions. Crafted for Celebrations.*
> A premium celebration & gifting brand, not just a sweet manufacturer.

---

## 1. Positioning

**For** families, companies and wedding hosts who want the sweets they give to say something about them,
**Mithaiwallah is** the premium Indian sweets and gifting brand from Prayagraj
**that** makes a focused collection of milk sweets the traditional way and presents them with the finish of a luxury gift,
**unlike** local sweet shops (inconsistent, plain packaging) and national snack brands (industrial, impersonal),
**because** every sweet is slow-cooked by hand and every order is planned, branded and delivered by one accountable team.

**The one-line version:** *Apple meets Indian luxury sweets* — restraint, craft and a flawless unboxing, applied to mithai.

### Brand promise

> The sweets you give are part of the message. We make sure they say the right thing.

### What we are / are not

| We are | We are not |
|---|---|
| A celebration & gifting brand | A general sweet shop with 80 varieties |
| Six signature sweets, made well | A catalogue that changes every week |
| Planned, calm, on time | A last-minute Diwali scramble |
| Warm, Indian, confident | Loud, discount-led, generic "royal" clichés |

---

## 2. Values

Seven values, in this order. Every page, post and box should be defensible against them.

| Value | What it means in practice |
|---|---|
| **Trust** | We say what is in the box and deliver on the date we promised. We never fake reviews, numbers or reactions. |
| **Purity** | Full-cream milk, pure desi ghee, whole dry fruits. No premixes. |
| **Tradition** | Recipes kept the way they were taught, because they were right. |
| **Luxury** | Luxury is care you can feel — texture, box, ribbon, timing — not gold for its own sake. |
| **Celebration** | We exist for the happiest days in people's lives. That is a responsibility. |
| **Craftsmanship** | Every tray is finished by hand, by people proud of it. |
| **Authentic taste** | It should taste like the best version of what you remember. |

---

## 3. Personality & voice

**Personality:** the gracious host at a family wedding — warm, unhurried, impeccably prepared, never showing off.

| We sound | We don't sound |
|---|---|
| Warm and specific — *"Milk reduced for hours in a wide kadhai."* | Vague and inflated — *"Heavenly taste, world-class quality!!!"* |
| Confident, quiet — *"Gifts that carry your name well."* | Pushy — *"HURRY! LIMITED STOCK! BUY NOW!"* |
| Honest about limits — *"Kalakand is best within three days."* | Over-promising — *"Stays fresh for months!"* |
| Indian without cliché — *kadhai, halwai, shagun, bidaai* used naturally | Pastiche — *"Royal Maharaja taste of the Mughals"* |

### Writing rules

1. **Short sentences.** One idea each. Full stops are a luxury signal.
2. **Concrete over abstract.** Name the ingredient, the step, the date.
3. **No exclamation marks** on the website or brochures. One is allowed in a social caption if it is genuinely joyful.
4. **Hindi words stay in Hindi** (khoya, chhena, varq, halwai, shagun) and are not italicised or explained unless the audience is corporate/export.
5. **Numbers are real or absent.** No invented capacities, years, client counts or star ratings. Placeholders use **[square brackets]** until filled with the truth.
6. **Food, not medicine.** Never claim health benefits. Describe ingredients and process only.
7. **Spelling:** Indian/British English (*colour, customise, programme*). The brand is always **Mithaiwallah** — one word, capital M only. Hindi: **मिठाईवाला**.

### Messaging by audience

| Audience | Lead message | Proof points |
|---|---|---|
| Families / gift buyers | *Six sweets, made the long way.* | Ingredients, freshness, beautiful boxes |
| Corporate (HR, admin, procurement) | *Gifts that carry your name well.* | Custom branding, planning timeline, pan-India delivery, GST invoicing |
| Weddings (families, planners) | *For the sweetest days of their lives.* | Monograms, colour matching, tastings, venue delivery |
| Hotels / restaurants / caterers | *The kitchen behind your counter.* | Consistency, portioning, standing schedules |
| Sweet shops / private label | *Our kitchen. Your name on the box.* | Recipe matching, packaging, labelling |
| Distributors / franchise | *Bring Mithaiwallah to your city.* | Central production, brand support, clear written terms |
| Export buyers | *Indian sweets for Indian homes abroad.* | Shelf-stable lines, export packaging, sampling |

### Taglines & lines we own

- **Primary:** Handcrafted Traditions. Crafted for Celebrations.
- Six sweets. Each one made the long way.
- Gifts that carry your name well. *(corporate)*
- For the sweetest days of their lives. *(weddings)*
- Hours, not minutes, in every kadhai.
- Handmade taste. Industrial discipline. *(manufacturing)*

---

## 4. Logo

The final logo file supplied by the founder replaces the placeholder everywhere: drop it into `public/brand/` and set `BRAND.logo` in `lib/business.ts`.

Until then the site uses a **placeholder lock-up**: a *jharokha* (arched window) monogram containing an "M", beside the wordmark in Cormorant Garamond, with **मिठाईवाला** beneath.

| Rule | Spec |
|---|---|
| Clear space | The height of the "M" in the wordmark, on all sides |
| Minimum size | 120 px / 30 mm wide for the full lock-up; 24 px for the arch mark alone (favicon) |
| On cream | Maroon wordmark, gold-700 Hindi |
| On maroon / dark | Cream wordmark, gold-300 Hindi, gold-foil arch |
| Never | Stretch, recolour outside the palette, add shadows or glows, place on busy photography without a scrim, set the wordmark in another font |

> **Trademark note.** "Mithaiwala" is a common descriptive word in Hindi (*sweet-seller*), and several businesses use similar names. Before investing in signage and packaging, run a trademark search in **Class 30** (confectionery) and **Class 35** (retail) on the IP India public search, and consider registering the **stylised logo** (device mark), which is easier to protect than the word alone.

---

## 5. Colour

Three colours carry the brand. Everything else is a tint.

| Token | Hex | Role | Share of a layout |
|---|---|---|---|
| **Cream** | `#FBF6EC` | The ground: backgrounds, paper, space | ~60% |
| **Maroon** | `#6B1024` | Authority: headlines, primary buttons, hero and wedding sections | ~25% |
| **Royal Gold** | `#B8893B` | Celebration: hairlines, ornaments, foil, highlights | ~10% |
| Ink | `#2B1A14` | Body text | ~5% |

Full scales live in `tailwind.config.ts` (`cream-50…400`, `maroon-50…900`, `gold-50…900`).

**Gold foil gradient** — `linear-gradient(115deg, #7A5823, #C89F52 22%, #F4E6C4 42%, #C89F52 58%, #9A712E 78%, #D9B872)` — for the display word in a headline, primary CTA on dark, seals and box foil. Never for body text.

### Contrast (WCAG 2.2) — measured

| Pair | Ratio | Use |
|---|---|---|
| Maroon on cream | 11.3 : 1 | Any text |
| Ink on cream | 15.5 : 1 | Body |
| Ink-muted `#7D6757` on cream | 4.9 : 1 | Secondary text (minimum for small text) |
| **Gold-700** `#7A5823` on cream | 6.0 : 1 | Small gold text, eyebrows |
| Gold-600 `#9A712E` on cream | 4.1 : 1 | Large text (≥ 24 px) only |
| Gold-500 `#B8893B` on cream | 2.9 : 1 | **Decoration only — never text** |
| Cream on maroon | 11.3 : 1 | Any text |
| Gold-300 `#D9B872` on maroon | 6.4 : 1 | Eyebrows and accents on dark |
| White on WhatsApp green `#1F7A4D` | 5.3 : 1 | WhatsApp buttons |

---

## 6. Typography

| Role | Typeface | Weights | Notes |
|---|---|---|---|
| Display | **Cormorant Garamond** | 500–700, italic | Headlines, product names, quotes. Italic + gold foil for the emotional half of a headline. |
| Text & UI | **Manrope** | 400–700 | Body, buttons, forms, navigation. |
| Hindi | **Tiro Devanagari Hindi** | 400 | The Hindi name, product names in Hindi. **No letter-spacing** — it breaks the shirorekha. |

All three are open-source Google Fonts, loaded with `next/font` (self-hosted at build, no layout shift).

**Scale (web):** display-lg 46–96 px · display-md 38–60 px · display-sm 32–44 px · body 16–18 px · eyebrow 11.5 px, uppercase, +0.28em tracking.
**Print:** cover 50 pt · page title 34 pt · subhead 16–20 pt · body 9–11 pt.

---

## 7. Graphic language

- **The jharokha arch** — the signature frame for every product image (`rounded-arch` + an inner gold hairline 8 px in, like a mount around a miniature painting).
- **Jaali** — a faint lattice pattern at 12–16% opacity behind hero and maroon sections. Never behind body text on cream at more than 16%.
- **The ornament** — two hairlines, two dots and a diamond, under every eyebrow.
- **Gold hairlines** — 1 px, gold-400 at 40–60%, for borders and dividers. Gold is drawn, not filled.
- **Seals** — circular gold-foil seals for claims like *Custom Branding Available*. One per view.

### Illustration

Until photography exists the site uses **procedural illustrations** of each sweet (SVG, grain textures, oblique projection). They are drawn to the same angle and light so any combination sits on one plate. Replace with photography product by product (`photo` field in `lib/products.ts`). Keep the illustrations for small UI moments (Instagram fallback tiles, brochure thumbnails).

---

## 8. Photography & film

See **[10 · Photography & film brief](10-photography-brief.md)** for the shot list. The short version:

- **Light:** single soft key from the side (window light), deep but warm shadows. Never flat, never flash.
- **Surfaces:** cream linen, brass, dark walnut, maroon velvet. No plastic, no stainless in hero shots.
- **Props:** marigold, rose petals, cardamom, saffron, diyas — one or two per frame, never a clutter.
- **People:** real hands, real halwais, real customers (with signed consent). No stock models.
- **Motion:** slow motion (120 fps) for pours, cuts and ribbons; locked-off tripod; one idea per shot.

---

## 9. Packaging system

| Tier | Box | Finish | Ribbon | Use |
|---|---|---|---|---|
| **The Classic Box** | Rigid maroon | Gold foil lid, 4-cavity tray | Gold | Employee gifting, return gifts |
| **The Heritage Box** | Ivory linen | Embossed monogram, magnetic closure | Maroon | Client gifting, family hampers |
| **The Royal Trunk** | Velvet-lined keepsake trunk | Brass clasp | Maroon | Leadership, VIP wedding hampers |

Every box carries: logo (or the client's), product list, net weight, batch code, best-before date, FSSAI licence number, allergen line, storage instruction and the website. Labelling must follow the FSS (Labelling and Display) Regulations, 2020.

---

## 10. Motion (web)

- Ease: `cubic-bezier(0.22, 1, 0.36, 1)` (`ease-luxe`), 500–900 ms. Luxury moves slowly and lands softly.
- Reveal: fade + 28 px rise, once, when 10% into view.
- Hero: slow Ken Burns (18 s), a light sweep every 7 s, drifting gold dust. All of it stops under `prefers-reduced-motion`.
- Never: bounce, spin, parallax on text, autoplaying sound.

---

## 11. Social templates

| Asset | Size | Rules |
|---|---|---|
| Reel / Short cover | 1080 × 1920 (safe centre 1080 × 1350) | Cormorant hook, cream on footage with a 30% maroon scrim; logo end card 1 s |
| Carousel | 1080 × 1350 | Cover: hook in display font; inner slides cream with maroon type; last slide = CTA |
| Photo post | 1080 × 1350 | No text on product photos; the caption does the talking |
| Story | 1080 × 1920 | Brand colours for stickers; always a link sticker when there is an offer |
| Highlights | 1080 × 1920 covers | Maroon circles with gold line icons: Sweets · Corporate · Weddings · Process · Reviews · Order |
