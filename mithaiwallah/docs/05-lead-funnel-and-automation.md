# 05 · Lead Generation Funnel & Automation

What is **built** is marked ✅. What needs an account or a decision is marked ☐.

---

## 1. The funnel

```
TOP — attention            MIDDLE — consideration             BOTTOM — conversion
──────────────────         ──────────────────────────         ───────────────────────────
Instagram Reels            Website (gifting pages,            Enquiry form ✅ → lead record ✅
YouTube Shorts               product pages, brochures) ✅     WhatsApp conversation ✅
Facebook Reels             WhatsApp Catalog ☐                 Sales call within 1 working day
Google (SEO + GBP) ✅      Downloadable catalogues ✅          Tasting / samples
Creator collabs            Email nurture ☐                    Quote → proof → order
LinkedIn (founder)         Retargeting ads ☐                  Corporate meetings
Wedding directories                                           Repeat & referral
IndiaMART / TradeIndia
```

**Principle:** every top-of-funnel asset points to *one* next step, and every next step ends in either the **enquiry form** or **WhatsApp**. Both create a record the team can follow up.

---

## 2. Capture points (built)

| Where | What happens |
|---|---|
| Enquiry form on every key page ✅ | Five types (corporate, wedding, wholesale, franchise, family order), type-specific questions from `lib/leads.ts`, consent + separate marketing opt-in, honeypot, rate limit |
| Deep links ✅ | `/contact?type=wedding`, `?product=kalakand`, `?collection=The%20Royal%20Trunk` pre-select and pre-fill the form |
| Locked single-type forms ✅ | `/corporate-gifting`, `/wedding-gifting`, `/wholesale`, `/franchise` show only their own form |
| WhatsApp everywhere ✅ | Floating button (desktop), thumb bar (mobile: WhatsApp · Call · Get a quote), product "Order on WhatsApp", pre-filled messages. Falls back to the form while no number is configured |
| After submit ✅ | Thank-you with a **reference number** (e.g. `MW-7K3P2Q`), "Continue on WhatsApp" pre-filled with the enquiry summary, and the matching **catalogue** link |
| Attribution ✅ | First-touch UTM source/medium/campaign, referrer and landing page stored with every lead |
| Analytics ✅ | `generate_lead` pushed to `window.dataLayer` with `lead_type` — ready for GTM → GA4 and Meta Pixel conversions |

---

## 3. The lead record ✅

Table `public.mithaiwallah_leads` in Supabase (`supabase/migrations/…_mithaiwallah_leads.sql`).

| Field | Notes |
|---|---|
| `reference` | `MW-XXXXXX`, no 0/O/1/I — easy to read aloud on a call |
| `lead_type` | corporate · wedding · wholesale · franchise · retail |
| `priority` | **hot / warm / cold**, scored on submit (below) |
| `status` | new → contacted → qualified → quoted → won / lost |
| contact | name, phone (required), email, company, city |
| `event_date` | delivery / wedding date |
| `details` | type-specific answers (quantity, budget, branding, volume…) |
| consent | `consent` (required), `marketing_opt_in` (separate) |
| attribution | source_path, landing_path, referrer, utm_* |
| `notes` | sales notes, editable in the dashboard |

**Security:** the website uses the *publishable* key, which RLS limits to inserting new leads. It cannot read, update or delete — tested by assuming the `anon` role: insert ✅, select 0 rows, update 0, delete 0; status ≠ new, notes, missing consent, bad phone/email/type all rejected.

### Lead scoring ✅ (`app/api/lead/route.ts`)

| Priority | Rule |
|---|---|
| **Hot** | 250+ boxes, or 200 kg+/month wholesale, or a corporate/wedding/wholesale date within 45 days |
| **Warm** | Everything else in corporate, wedding, wholesale; franchise with ₹10 lakh+ investment |
| **Cold** | Family orders with no near date; franchise under ₹10 lakh |

### Speed-to-lead SLAs

| Priority | First contact | Channel |
|---|---|---|
| Hot | **within 1 hour** (business hours) | Phone call, then WhatsApp summary |
| Warm | same working day | WhatsApp, then call |
| Cold | next working day | WhatsApp |

Leads contacted within an hour convert several times better than next-day leads; the dashboard's "Hot & open" tile is the first thing the sales lead checks each morning and after lunch.

---

## 4. Lead tracking dashboard ✅

`/admin/leads` — protected by HTTP Basic Auth (`ADMIN_USER`, `ADMIN_PASSWORD`); returns 404 if they are not set. Reads with `SUPABASE_SECRET_KEY` on the server only.

- Tiles: leads last 7 / 30 days, open pipeline, hot & open, win rate
- Breakdown by type and top UTM sources
- Filters by type, priority and status
- Each lead: tap-to-call, tap-to-WhatsApp, email, all answers, source; **status + notes editable inline**
- **CSV export** (`/admin/leads/export`, respects filters; formula-injection safe) for Excel, Google Sheets or a CRM import
- `mithaiwallah_lead_pipeline` view: weekly leads / hot / won / lost by type, for Looker Studio or Metabase

---

## 5. WhatsApp ☐

### Phase 1 — WhatsApp Business app (free, day 1)

1. Register the business number in the **WhatsApp Business** app; set `NEXT_PUBLIC_WHATSAPP_NUMBER` and `NEXT_PUBLIC_PHONE_NUMBER`.
2. Business profile: description, hours, address, website, email.
3. **Catalog:** the six sweets (photo, description, "price on request" or retail price), the three collections, and "Corporate gifting" / "Wedding gifting" as catalog items that open a conversation.
4. **Greeting message:** "Namaste 🙏 Welcome to Mithaiwallah. Tell us what you're celebrating — a corporate order, a wedding, or a box for family? We reply within the hour during business hours."
5. **Away message** outside hours with the enquiry-form link.
6. **Quick replies:** `/corp` (catalogue + 4 questions), `/wed`, `/whole`, `/price`, `/delivery`, `/shelf`.
7. **Labels** matching dashboard statuses: New · Contacted · Qualified · Quoted · Won · Lost · Repeat.

### Phase 2 — WhatsApp Business Platform (month 3+, when volume needs a team inbox)

Move to the Cloud API via a provider (Interakt, AiSensy, WATI, Gupshup or similar) for: a shared team inbox, click-to-WhatsApp ads, approved template messages (order confirmations, dispatch updates, festival broadcasts to opted-in customers), and a webhook into the CRM. Broadcasts go **only** to contacts who opted in.

---

## 6. CRM & automation ☐

Every lead is POSTed to `LEAD_WEBHOOK_URL` after it is stored ✅ — signed with HMAC-SHA256 in the `X-Mithaiwallah-Signature` header when `LEAD_WEBHOOK_SECRET` is set. If Supabase is down, the webhook still receives the lead; if both fail, the visitor is told to WhatsApp or call instead of seeing a false "thank you".

### Payload

```json
{
  "event": "lead.created",
  "lead": {
    "reference": "MW-7K3P2Q",
    "lead_type": "corporate",
    "status": "new",
    "priority": "hot",
    "name": "…", "phone": "+91 …", "email": "…", "company": "…", "city": "Lucknow",
    "event_date": "2026-10-28",
    "details": { "quantity": "250–500", "budget": "₹1,000–₹2,500", "occasion": "Diwali", "branding": "Yes — logo on box" },
    "message": "…",
    "consent": true, "marketing_opt_in": true,
    "source_path": "/corporate-gifting", "landing_path": "/", "utm_source": "instagram", "utm_campaign": "diwali26",
    "created_at": "2026-10-01T09:14:22.000Z"
  }
}
```

### Verifying the signature (receiver side, Node)

```js
import { createHmac, timingSafeEqual } from 'node:crypto';
const expected = createHmac('sha256', process.env.LEAD_WEBHOOK_SECRET).update(rawBody).digest('hex');
const ok = timingSafeEqual(Buffer.from(expected), Buffer.from(req.headers['x-mithaiwallah-signature'] ?? ''));
```

### Recommended stack by stage

| Stage | CRM | Why |
|---|---|---|
| Launch (0–100 leads/month) | The built-in dashboard + Google Sheets (via webhook) | Zero cost, zero training |
| Growth (100–500/month) | **Zoho CRM** or **HubSpot (free/Starter)** | Pipelines, tasks, email sequences, mobile app; both have Indian pricing and WhatsApp integrations |
| Scale (sales team 5+) | Zoho CRM / LeadSquared | Territory routing for distributors and franchise |

### Automation recipes (Zapier, Make, n8n or Pabbly)

1. **New lead → Sheet + alert:** webhook → append row to "Leads" sheet → WhatsApp/Slack/email alert to the sales lead with priority in the title (`🔥 HOT corporate lead: 250–500 boxes, 28 Oct`).
2. **New lead → CRM:** webhook → create/update contact (dedupe on phone) → create deal in the pipeline for `lead_type` → assign owner by type (corporate → gifting lead; wholesale/franchise → trade lead).
3. **Hot lead not contacted in 1 hour:** schedule check → if status still `new`, escalate to the founder.
4. **Marketing opt-in → email list:** if `marketing_opt_in`, add to Brevo/Mailchimp/Zoho Campaigns with tags `lead_type`, `city`.
5. **Won → review request:** 3 days after delivery, WhatsApp template asking for a Google review (link) and permission to feature them.

---

## 7. Email marketing ☐

Tool: **Brevo** (generous free tier, India-friendly), **Zoho Campaigns** (if on Zoho CRM) or Mailchimp. Only contacts with `marketing_opt_in = true`; every email has one-click unsubscribe.

| Sequence | Trigger | Emails |
|---|---|---|
| **Corporate nurture** | Corporate lead, not yet quoted | D0 thank-you + catalogue · D2 "How to plan Diwali gifting" guide · D5 collections & branding examples · D9 client story (real) · D14 "Samples available — shall we send one?" |
| **Wedding nurture** | Wedding lead | D0 congratulations + wedding catalogue · D3 "How many boxes do you need" guide · D7 personalisation gallery · D14 tasting invitation |
| **Festival campaigns** | All opted-in | 6 weeks before: early-bird · 3 weeks: collections · 10 days: order cut-offs · after: thank-you + review ask |
| **Next-year early bird** | Won corporate clients | July: "Plan Diwali 2027 now" with last year's order pre-filled |

---

## 8. Outbound: the 1,000-company programme (roadmap Phase 3)

1. **Build the list** (month 5): companies with 50+ employees in Prayagraj, Lucknow, Kanpur, Varanasi, Noida/NCR — from LinkedIn (Sales Navigator), industry associations (CII, local chambers), IndiaMART buyers, bank/PSU regional offices, hospitals, colleges, IT parks. Record: company, city, headcount band, HR/admin/procurement contact, source.
2. **Sequence** (business emails and LinkedIn; always with an opt-out line):
   - Day 1: short personal email + corporate catalogue link (`?utm_source=outbound&utm_campaign=diwali27`)
   - Day 4: LinkedIn connection with a one-line note
   - Day 8: follow-up with the Diwali planning checklist
   - Day 14: offer a tasting box to the decision-maker
   - Day 21: final note, then quarterly updates only
3. **Sample boxes** to the top 100 accounts — the single highest-converting corporate tactic.
4. **Meetings:** 20-minute visit with a sample box, catalogue and a tiered proposal (team / leadership / key clients).

Treat personal data per the **DPDP Act, 2023**: collect only what you use, honour opt-outs immediately, and keep the list secure.

---

## 9. Sales scripts

### Corporate — first call (3 minutes)

1. "Thank you for your enquiry, reference **MW-…**. Is now a good time for three minutes?"
2. Occasion and date · headcount and tiers · budget per box · cities/addresses · branding.
3. Recommend: "For 300 employees at around ₹1,000 we'd suggest the Classic Box with your logo foil; for leadership, the Heritage Box."
4. Next step, always: "I'll WhatsApp you the catalogue and a written quote by [time]. Shall I courier a sample box to your office?"
5. Update status to *contacted* / *qualified* in the dashboard with notes.

### Wedding — consultation

Date(s) and ceremonies · guest households · colours and theme · who decides (family, planner) · tasting in Prayagraj or courier samples · budget per box. Close with a tasting date.

### Follow-up cadence (all types)

Day 0 call + WhatsApp summary · Day 2 WhatsApp with quote · Day 5 call · Day 10 WhatsApp "anything we can adjust?" · Day 20 final check, then mark *lost* with a reason (price, timing, competitor, no response). Lost reasons are reviewed monthly.

---

## 10. Instagram live feed ✅ / ☐

The home page gallery reads the latest posts when `INSTAGRAM_ACCESS_TOKEN` is set (Instagram API with Instagram Login, Business account), cached for an hour. Long-lived tokens expire after 60 days — refresh monthly:

```
GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=CURRENT_TOKEN
```

Put this in a monthly scheduled job (Vercel Cron, GitHub Actions or n8n) that updates the environment variable, or set a calendar reminder. If the token expires, the gallery silently falls back to the curated tiles.
