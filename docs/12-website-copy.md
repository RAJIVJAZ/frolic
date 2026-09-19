# 12 · Website Copy

The shipped copy lives in the components and in `lib/products.ts`,
`lib/ingredients.ts`, `lib/faqs.ts` and `lib/journal.ts`. This document is the
voice specification and the master reference for the copy that is not
data-driven.

---

## Voice

**We sound like a person who knows the subject and is not trying to impress
you with it.**

| We do | We don't |
|---|---|
| Say the number | Say "packed with" |
| Name the specific thing (kala namak, hydroxycitric acid) | Say "natural goodness" |
| Admit what we don't know | Extrapolate from a study we half-read |
| Use the Indian reference without explaining it | Translate our own culture for ourselves |
| Land a joke and move on | Perform quirkiness |
| Write a short sentence when it's enough | Pad to sound authoritative |

**Under-claiming is a brand asset.** The gut-health category has an overselling
problem. Being the brand that told you less than it could is a position nobody
else is taking.

### Register

- Second person. "You", not "the consumer".
- Contractions, always.
- British-Indian spelling: flavour, colour, litre, fibre.
- Numerals for data (7 g, 4 g, 250 ml), words for rhetoric ("ten flavours").
- Em dashes for asides. Semicolons sparingly.

### The three things we will always say plainly

1. 7 g of prebiotic fibre per 250 ml can.
2. 4 g of added sugar, about a quarter of a regular soda.
3. It is a soft drink, not a medicine.

---

## Master copy

### Brand

```
FROLIC
Feel Good. Sip Different.
India's premium prebiotic functional soda.
```

### Homepage

**Hero**
```
Eyebrow   7g prebiotic fibre · 4g added sugar · 0 caffeine
H1        India's most exciting functional soda
Sub       Prebiotic fibre, botanical ingredients, and amazing taste —
          built from nimbu, jamun, kokum and every other flavour we
          actually grew up drinking.
CTAs      Shop Now  ·  Explore Flavours
Stats     7g Prebiotic fibre · −75% Sugar vs. regular soda · 10 Flavours
```

**Bestsellers**
```
Eyebrow   Start here
H2        The four people order first.
```

**Story — problem**
```
Eyebrow   The problem
H2        Soda got very good at one thing: sugar.
Body      For a century the category optimised for one sensation and
          stopped there. Meanwhile the people drinking it started reading
          labels, counting grams, and quietly walking away — without ever
          finding something that tasted as good.
Stats     8–10 teaspoons of sugar in a regular 300 ml soft drink
          < 50% of Indian adults meet recommended daily fibre intake
          0 g fibre in the soda aisle, more or less across the board
```

**Story — solution**
```
Eyebrow   What we did about it
H2        So we rebuilt it from the fibre up.
Body      Low sugar. Seven grams of prebiotic fibre. Botanical ingredients
          pressed, steeped and blended rather than reconstituted from a
          powder. And flavours drawn from what India already drinks:
          nimbu, jamun, kokum, aam panna, jeera.
Stats     7 g prebiotic fibre per 250 ml can
          4 g added sugar — about a quarter of a regular soda
          10 flavours built from Indian fruit, spice and salt
```

**Flavours**
```
Eyebrow   Ten flavours
H2        Every one its own world.
```

**Science**
```
Eyebrow   The science, plainly
H2        Fibre is the part everyone skipped.
Body      Prebiotic fibre is not an exotic supplement — it is a plant fibre
          your own gut bacteria can use and you cannot digest. Here is what
          that means, and what it looks like next to the rest of the aisle.
```

**Ingredients**
```
Eyebrow   What's actually in it
H2        Ten ingredients worth naming.
Body      No proprietary blends hiding behind a trademark. Tap any card for
          where it comes from, what it tastes like, and why it earned a
          place in the can.
```

**Social proof**
```
Eyebrow   What people say
H2        2,847 reviews and a 4.7.
Body      We ask every buyer seven days after delivery — long enough to
          have actually finished a pack.
```

**Subscribe**
```
Eyebrow   Subscribe & save
H2        The fridge stays full. You stop thinking about it.
Body      Pick your flavours, pick a cadence, and we handle the rest. Most
          people land on a 12-can box every four weeks — it works out to
          about ₹82 a can.
Perks     Save 20%, always · Swap flavours freely ·
          Skip or pause anytime · New flavours first
```

### Page headlines

| Page | Eyebrow | H1 |
|---|---|---|
| `/shop` | The full range | Ten flavours. Pick your starting point. |
| `/flavours` | The range | Ten flavours. Ten worlds. |
| `/science` | The science | Seven grams, and what they are actually doing in there. |
| `/ingredients` | Ingredients | Nothing hiding behind a trademark. |
| `/story` | Our story | We wanted the drink that already existed — just built properly. |
| `/subscribe` | Subscribe & save | Twenty percent off, permanently. |
| `/bundle` | Build a bundle | Your box, your mix. |
| `/quiz` | Flavour finder | Four questions. Three matches. |
| `/rewards` | Frolic Club | Drink more. Pay less. Obviously. |
| `/journal` | Journal | Longer than a label allows. |
| `/faq` | Questions | Straight answers. |
| `/stockists` | Stockists | Four hundred fridges and counting. |
| `/wholesale` | Wholesale | Put it in your fridge. |
| `/careers` | Careers | Come make soda properly. |
| `/contact` | Contact | Talk to a person. |
| `/accessibility` | Accessibility | Built to be usable. |
| 404 | 404 | This flavour does not exist. Yet. |

### Product copy pattern

Every flavour follows the same four-beat structure:

1. **Tagline** — one line, the angle. *"The corner-shop classic, rebuilt with fibre."*
2. **Notes** — exactly three, two words max. *Sharp lime · Black salt · Toasted cumin*
3. **Story** — open on a sensory memory, name the specific ingredient doing the
   work, state what changed, close on a short line.
4. **Ritual & pairing** — one sentence each, practical.

Full text for all ten is in `lib/products.ts`.

### UI microcopy

| Context | Copy |
|---|---|
| Add to cart | `Add 12-pack` → `Added ✳` |
| Subscription option | `Save 20% · skip or cancel anytime` |
| Free shipping progress | `₹214 away from free shipping` → `Free shipping unlocked ✳` |
| Empty cart | `Nothing in here yet.` / `Ten flavours, seven grams of fibre each. Start somewhere.` |
| Bundle incomplete | `Choose 4 more` |
| Bundle full | `Box is full — ready to go.` |
| Quiz result | `Start with Ginger Lime.` |
| Filter empty | `Nothing matches that filter yet. Try another profile.` |
| Newsletter | `Get first access to new flavours` / `No spam. Unsubscribe whenever.` |
| Checkout note | `Taxes calculated at checkout · UPI, cards, COD` |

### Legal (verbatim, every page footer)

```
FROLIC is a food product, not a medicine. It is not intended to diagnose,
treat, cure or prevent any disease. Nutritional values are per 250 ml serving
and may vary marginally by batch. If you are pregnant, nursing, or managing a
medical condition, talk to a qualified healthcare professional before making
changes to your diet.
```

### Email

**Welcome** — *Subject:* `You bought the purple one. Here's what's in it.`
**Day 7 review request** — *Subject:* `Finished the pack?`
**Subscription reminder** — *Subject:* `Your box ships Thursday. Want to change it?`
**Win-back** — *Subject:* `We added two flavours since you left.`

Every subject line is a sentence, not a slogan. No exclamation marks.

---

## Words we do not use

`superfood` · `detox` · `boosts immunity` · `guilt-free` · `clean` ·
`chemical-free` · `miracle` · `game-changer` · `revolutionary` ·
`packed with` · `wellness journey` · `self-care ritual`

The first six are compliance risks (`13-compliance-claims.md`). The rest are
just bad writing.
