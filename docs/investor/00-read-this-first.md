# Read This First

Three findings from building this pack materially change the FROLIC pitch.
They are stated up front because a deck that hides them will not survive a
second meeting.

---

## 1. The first-mover claim is false. Delete it.

India already has at least two prebiotic soda brands in market:

- **Misfits** (Mumbai; founders Aditya and Yash Pai). Publicly describes
  itself as *"India's first prebiotic soda brand."* Raised a seed round led by
  Nu Ventures with angels who backed Acko, Third Wave Coffee and Fox Tail.
  Sells on its own site, Amazon India and Swiggy Instamart.
  **Its spec is 250 ml, 7 g prebiotic fibre, 4 g sugar** — within rounding
  error of FROLIC's — at a lower price point.
- **Bubz**, positioned at Gen Z, also covered as an Indian prebiotic soda
  entrant.

Any pitch claiming "India's first" dies the moment a partner runs one search.
Worse, the near-identical spec means "7 g fibre, 4 g sugar in a 250 ml can" is
not differentiation — it is table stakes.

**The reframe, which is a stronger story anyway:** category creation with two
sub-scale incumbents is *better* than true first-mover. Someone else is paying
for consumer education, the demand signal is validated, and no one has won
distribution. FROLIC's wedge is not being first — it is being **the only
Indian-flavour-native brand in the category.** Misfits is a Western-format
minimal-ingredient soda made in India. FROLIC is nimbu masala, aam panna,
kokum, jamun, jeera. That is a defensible, hard-to-copy position rooted in
taste memory a foreign entrant cannot manufacture.

**Honest caveat:** Misfits ships **zero added sugar**; FROLIC carries **4 g
added sugar**. On the health axis we are behind. Our counter is taste, and it
has to be demonstrably true in blind tests — see §4 of
[08-proof-required.md](08-proof-required.md).

---

## 2. A 40% GST slab sits on this product. It governs everything.

From 22 September 2025, India taxes aerated and sweetened beverages at a flat
**40% GST**, replacing the previous 28% + 12% cess. Non-carbonated fruit- and
juice-based drinks and packaged water sit at **5%**.

At an MRP of ₹130, **₹37.14 is tax** — 29% of the shelf price — before the
brand, distributor or retailer is paid a rupee.

Consequences carried through the whole model:

| Consequence | Where it shows up |
|---|---|
| Brand nets ₹62–84 per can depending on channel, not ₹130 | [05-unit-economics.md](05-unit-economics.md) |
| ₹130 MRP is structurally necessary, not greedy positioning | Minimum viable price is ₹107 at a 50% GM floor |
| A still (non-carbonated) line would face 5% GST, not 40% | A 35-point arbitrage — the single largest margin lever available |
| Price-led competition is near-impossible | Anyone undercutting on MRP is destroying their own gross margin |

This is also a **moat argument**: the tax makes the category structurally
unattractive to low-price entrants and rewards brands that can command a
premium. Most decks treat GST as an accounting footnote. It is the central
economic fact of this business.

---

## 3. FROLIC has no traction. That is the real objection.

Everything in this pack is a model. There is no revenue, no repeat-purchase
data, no shelf velocity, no blind taste result. Every financial projection
here is arithmetic applied to assumptions — clearly labelled `[A]` in
`investor/assumptions.mjs`.

No institutional seed investor in Indian consumer will fund this on a model
alone, particularly against a funded incumbent with a near-identical product.
The sequence that works is: **prove taste and repeat, then raise.**

The realistic path is a ₹1.5–2.5 Cr angel/pre-seed to fund one production run
and six months of D2C, and then the ₹10 Cr seed against real cohort data.
[08-proof-required.md](08-proof-required.md) lists exactly what evidence to
generate first, in priority order.

---

## How to use this pack

| Document | What it is |
|---|---|
| [01-investor-conviction.md](01-investor-conviction.md) | Seven investor personas: invest / reject / de-risking milestones |
| [02-category-creation.md](02-category-creation.md) | Category map and timing matrix |
| [03-market-projection.md](03-market-projection.md) | Bottom-up customers, ARPU, revenue Y1–Y5 |
| [04-ebitda-model.md](04-ebitda-model.md) | Three cases, path to profitability |
| [05-unit-economics.md](05-unit-economics.md) | Per-can economics, three formats, minimum viable price |
| [06-investor-returns.md](06-investor-returns.md) | Cap table, MOIC, IRR, probability-weighted |
| [07-why-frolic-wins.md](07-why-frolic-wins.md) | Moat analysis and competitive positioning |
| [08-proof-required.md](08-proof-required.md) | The evidence checklist, sequenced |
| [09-investor-faq.md](09-investor-faq.md) | 100 questions with answers |

**All numbers are generated.** `investor/assumptions.mjs` holds every input;
`node investor/build.mjs` regenerates
[`investor/output/tables.md`](../../investor/output/tables.md) and
`model.json`. Change an assumption, re-run, and every table moves together. No
figure in this pack was typed by hand.

## Sources

- [PepsiCo Form 10-Q, FY2025 (SEC)](https://www.sec.gov/Archives/edgar/data/77476/000007747625000053/pep-20250906.htm) — Poppi consideration $1.95bn cash + $0.2bn contingent
- [CNBC — PepsiCo buys Poppi](https://www.cnbc.com/2025/03/17/pepsico-buys-prebiotic-soda-brand-poppi-for-more-than-1point6-billion.html)
- [ClearTax — GST on cold drinks](https://cleartax.in/s/gst-on-cold-drinks) and [new GST rates, Sep 2025](https://www.twotax.in/blog-details/new-gst-rates-for-food-beverages-from-22-sept-2025-complete-updated-list)
- [BW Disrupt — Misfits seed funding](https://www.bwdisrupt.com/article/misfits-secures-seed-funding-to-expand-indias-first-prebiotic-soda-brand-570639), [YourStory — Misfits](https://yourstory.com/2025/10/mumbai-based-misfits-gut-health-soda-zero-sugar-prebiotic-beverage-startup)
- [SME Futures — Bubz](https://smefutures.com/indias-first-prebiotic-soda-how-bubz-is-redefining-functional-beverages-for-gen-z/)
