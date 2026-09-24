# 08 · Corporate & Wedding Brochures

Two printable catalogues, built from the same data as the website so they can never disagree with it.

| Catalogue | Web (printable) | PDF | Pages |
|---|---|---|---|
| Corporate Gifting | `/brochure/corporate` | `public/brochures/mithaiwallah-corporate-gifting.pdf` | 6 |
| Wedding Gifting | `/brochure/wedding` | `public/brochures/mithaiwallah-wedding-gifting.pdf` | 5 |

## Contents

**Corporate** — 1 Cover (*Gifts that carry your name well*) · 2 Why Mithaiwallah: four corporate offerings + six reasons · 3 The six signature sweets · 4 The three gift collections (Classic, Heritage, Royal Trunk) · 5 Custom branding + the Diwali planning timeline · 6 How to order, minimums, lead times, contact.

**Wedding** — 1 Cover (*For the sweetest days of their lives*) · 2 What we create + a box for every ceremony · 3 The six signature sweets · 4 Personalisation, collections and the "how many boxes" rule of thumb · 5 How to order, contact.

## Regenerating the PDFs

Any change to `lib/business.ts` (phone, WhatsApp, terms), `lib/gifting.ts` or `lib/products.ts` flows into the brochures. Rebuild the PDFs after editing:

```bash
npm run build && npm start   # or: npm run dev
npm run brochures            # writes public/brochures/*.pdf
```

**Regenerate after setting the real phone/WhatsApp numbers** — the contact page of each PDF only shows channels that are configured.

## How sales should use them

- **WhatsApp:** send the PDF straight after the first call, with a one-line summary of what was discussed.
- **Email:** link to the web version (`/brochure/corporate`) rather than attaching 1.5 MB — it is always the latest.
- **Print:** A4, full-bleed, 170–250 gsm matte or silk; take 10 to every corporate meeting and planner visit.
- **Instagram:** DM keyword replies (*DIWALI*, *WEDDING*) send the web link.
- **Pricing** is intentionally not in the brochures. Send a quote per order (volume, customisation, delivery spread) — a printed price list becomes the ceiling for every negotiation.
