# FROLIC — Investor Model & Deck

## Run the model

```bash
node investor/build.mjs
```

Writes `investor/output/model.json` (machine-readable) and
`investor/output/tables.md` (the tables pasted into the DPR).

## How it is put together

```
investor/
├── assumptions.mjs   Every input. Nothing downstream is hand-typed.
├── model.mjs         Pure functions over the assumptions.
├── build.mjs         Emits model.json + tables.md
├── output/           Generated — do not edit
└── deck/             Source of the published pitch deck
```

**Change an assumption, re-run, and every table in the DPR and the deck moves
together.** The fastest way to lose a term sheet is for two numbers in the
same deck to disagree.

## Sourcing discipline

Every assumption carries a tag:

| Tag | Meaning |
|---|---|
| `[V]` | Verified against a primary or reputable secondary source, cited |
| `[E]` | Industry estimate or benchmark — defensible, needs validation |
| `[A]` | An assumption. A choice, not a fact. Investors will attack these first |

Currently `[V]`: the 40% GST slab on aerated beverages, the 5% still-beverage
rate, the Poppi acquisition consideration and revenue multiple, the Olipop
valuation. Almost everything else is `[E]` or `[A]`.

## Key outputs

| | Conservative | Base | Aggressive |
|---|---|---|---|
| Y5 net revenue | ₹73 Cr | ₹267 Cr | ₹595 Cr |
| EBITDA positive | Year 5 | Year 4 | Year 3 |
| Total capital need | ₹29.6 Cr | ₹30.4 Cr | ₹42.9 Cr |
| Seed MOIC (Y7 exit) | 15.9× | 39.0× | 74.5× |

Probability-weighted seed return (55% failure): **13.6× MOIC, 45.1% IRR.**

## Documents

The written pack is in [`docs/investor/`](../docs/investor/). Start with
[`00-read-this-first.md`](../docs/investor/00-read-this-first.md) — it states
the three findings that change the pitch before anything else.

## Health warning

FROLIC is pre-revenue, pre-product and pre-traction. Every projection here is
arithmetic applied to assumptions. The model is internally consistent; that is
not the same as being right.

## Detailed Project Report (PDF)

```bash
node investor/build.mjs          # regenerate model.json
node investor/dpr/build-dpr.mjs  # assemble the HTML
node investor/dpr/render-pdf.mjs # render to PDF via Chromium
```

Output: `investor/output/FROLIC-Detailed-Project-Report.pdf` — 55 pages, A4.

```
investor/dpr/
├── style.mjs          Print stylesheet (A4, 18mm margins)
├── parts-a.mjs        Cover, notice, contents, executive summary, glance
├── parts-b.mjs        Business (3–6), market & competition (7–10)
├── parts-c.mjs        Operations (11–15), financials (16–20)
├── parts-d.mjs        Risk & execution (21–24), annexures A–D
├── faq-selection.mjs  Investor questions for Annexure C
├── build-dpr.mjs      Assembles the HTML from model.json
└── render-pdf.mjs     Chromium → PDF
```

**Every figure in the report is read from `output/model.json`.** Change an
assumption, re-run all three commands, and the whole 55-page document
regenerates consistently.
