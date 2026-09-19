# 09 · Database Structure

Shopify owns orders, customers, products and inventory. This database owns
only what Shopify cannot: loyalty, referrals, quiz analytics, review moderation
and subscription-health signals.

**Postgres.** Money-adjacent balances need transactions and constraints.

## ERD

```
customers ──┬── loyalty_accounts ──── loyalty_transactions
            ├── referrals (referrer / referred)
            ├── reviews ──── review_media
            ├── quiz_sessions ──── quiz_answers
            └── subscription_snapshots

products (mirror) ──┬── reviews
                    └── quiz_results
```

## Tables

```sql
-- Local mirror keyed to Shopify. Never the source of truth for identity.
CREATE TABLE customers (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shopify_id        BIGINT UNIQUE NOT NULL,
  email_hash        TEXT NOT NULL,          -- SHA-256; raw email lives in Shopify
  first_order_at    TIMESTAMPTZ,
  city              TEXT,
  marketing_consent BOOLEAN NOT NULL DEFAULT FALSE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON customers (shopify_id);

-- Read-only mirror so reviews and quiz results can have real FKs.
CREATE TABLE products (
  handle       TEXT PRIMARY KEY,
  shopify_id   BIGINT UNIQUE NOT NULL,
  name         TEXT NOT NULL,
  is_active    BOOLEAN NOT NULL DEFAULT TRUE,
  synced_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### Loyalty

```sql
CREATE TYPE loyalty_tier AS ENUM ('sipper', 'regular', 'devotee');

CREATE TABLE loyalty_accounts (
  customer_id     UUID PRIMARY KEY REFERENCES customers(id) ON DELETE CASCADE,
  -- Denormalised running balance. Kept correct by the trigger below, never
  -- written directly by application code.
  balance         INTEGER NOT NULL DEFAULT 0 CHECK (balance >= 0),
  lifetime_earned INTEGER NOT NULL DEFAULT 0,
  tier            loyalty_tier NOT NULL DEFAULT 'sipper',
  last_activity   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TYPE fizz_reason AS ENUM (
  'order', 'review', 'review_photo', 'referral',
  'birthday', 'social_follow', 'redemption', 'expiry', 'adjustment'
);

-- Append-only ledger. The balance is derivable from this table alone, which
-- is what makes disputes and clawbacks tractable.
CREATE TABLE loyalty_transactions (
  id           BIGSERIAL PRIMARY KEY,
  customer_id  UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  points       INTEGER NOT NULL,           -- signed: positive earn, negative spend
  reason       fizz_reason NOT NULL,
  -- Shopify order id, review id, referral id — whatever caused it.
  source_ref   TEXT,
  -- Idempotency: a webhook redelivery must not award points twice.
  idempotency_key TEXT UNIQUE,
  expires_at   TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (points <> 0)
);
CREATE INDEX ON loyalty_transactions (customer_id, created_at DESC);
CREATE INDEX ON loyalty_transactions (expires_at) WHERE expires_at IS NOT NULL;
```

```sql
CREATE FUNCTION apply_loyalty_txn() RETURNS TRIGGER AS $$
BEGIN
  UPDATE loyalty_accounts
     SET balance         = balance + NEW.points,
         lifetime_earned = lifetime_earned + GREATEST(NEW.points, 0),
         last_activity   = now(),
         tier = CASE
           WHEN lifetime_earned + GREATEST(NEW.points, 0) >= 15000 THEN 'devotee'
           WHEN lifetime_earned + GREATEST(NEW.points, 0) >=  5000 THEN 'regular'
           ELSE 'sipper'
         END
   WHERE customer_id = NEW.customer_id;
  RETURN NEW;
END $$ LANGUAGE plpgsql;

CREATE TRIGGER loyalty_txn_applied
AFTER INSERT ON loyalty_transactions
FOR EACH ROW EXECUTE FUNCTION apply_loyalty_txn();
```

The `balance >= 0` check plus the trigger means an over-redemption fails at the
database rather than going negative in application code.

### Referrals

```sql
CREATE TYPE referral_status AS ENUM ('pending', 'qualified', 'paid', 'void');

CREATE TABLE referrals (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id    UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  code           TEXT UNIQUE NOT NULL,
  referred_id    UUID REFERENCES customers(id) ON DELETE SET NULL,
  order_id       BIGINT,
  status         referral_status NOT NULL DEFAULT 'pending',
  reward_paise   INTEGER NOT NULL DEFAULT 15000,   -- ₹150
  qualified_at   TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- Self-referral is the most common abuse; block it in the schema.
  CHECK (referrer_id IS DISTINCT FROM referred_id)
);
CREATE UNIQUE INDEX ON referrals (referred_id) WHERE referred_id IS NOT NULL;
```

The partial unique index enforces one qualifying referral per referred
customer. Credit moves `pending → qualified` on `orders/fulfilled`, not
`orders/paid`, so a cancelled order never pays out.

### Reviews

```sql
CREATE TYPE review_status AS ENUM ('pending', 'published', 'rejected');

CREATE TABLE reviews (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id    UUID REFERENCES customers(id) ON DELETE SET NULL,
  product_handle TEXT NOT NULL REFERENCES products(handle),
  rating         SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title          TEXT NOT NULL CHECK (length(title) <= 120),
  body           TEXT NOT NULL CHECK (length(body) BETWEEN 20 AND 4000),
  display_name   TEXT NOT NULL,
  city           TEXT,
  -- Set from the Shopify order, never from user input.
  verified_order BIGINT,
  status         review_status NOT NULL DEFAULT 'pending',
  helpful_count  INTEGER NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at   TIMESTAMPTZ
);
CREATE INDEX ON reviews (product_handle, status, created_at DESC);
-- One review per customer per product.
CREATE UNIQUE INDEX ON reviews (customer_id, product_handle)
  WHERE customer_id IS NOT NULL;

CREATE TABLE review_media (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id   UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  width       INTEGER,
  height      INTEGER,
  moderated   BOOLEAN NOT NULL DEFAULT FALSE
);
```

Aggregate rating is a materialised view, refreshed on publish — PDPs read it
on every request and must not scan the review table.

```sql
CREATE MATERIALIZED VIEW product_rating_summary AS
SELECT product_handle,
       count(*)                      AS review_count,
       round(avg(rating)::numeric, 1) AS average_rating
  FROM reviews
 WHERE status = 'published'
 GROUP BY product_handle;
CREATE UNIQUE INDEX ON product_rating_summary (product_handle);
```

### Quiz

```sql
CREATE TABLE quiz_sessions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id   UUID REFERENCES customers(id) ON DELETE SET NULL,
  anonymous_id  TEXT,                      -- first-party cookie, pre-signup
  completed     BOOLEAN NOT NULL DEFAULT FALSE,
  -- Which question they abandoned on. The most actionable field here.
  dropped_at_q  SMALLINT,
  converted     BOOLEAN NOT NULL DEFAULT FALSE,
  order_id      BIGINT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE quiz_answers (
  session_id  UUID NOT NULL REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  answer_id   TEXT NOT NULL,
  PRIMARY KEY (session_id, question_id)
);

CREATE TABLE quiz_results (
  session_id     UUID NOT NULL REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  product_handle TEXT NOT NULL REFERENCES products(handle),
  rank           SMALLINT NOT NULL CHECK (rank BETWEEN 1 AND 3),
  score          NUMERIC(5,2) NOT NULL,
  PRIMARY KEY (session_id, rank)
);
```

This exists to answer one question: **does the quiz recommend what people
actually buy?** If rank-1 recommendations do not correlate with purchases, the
scoring weights are wrong.

### Subscription health

```sql
CREATE TABLE subscription_snapshots (
  id              BIGSERIAL PRIMARY KEY,
  customer_id     UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  recharge_id     BIGINT NOT NULL,
  status          TEXT NOT NULL,        -- active | paused | cancelled
  cadence_weeks   SMALLINT NOT NULL,
  box_size        SMALLINT NOT NULL,
  cycles_billed   INTEGER NOT NULL,
  flavours        TEXT[] NOT NULL,
  cancel_reason   TEXT,
  captured_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON subscription_snapshots (customer_id, captured_at DESC);
```

Recharge holds live state; these snapshots exist so churn can be analysed
against cadence, box size and flavour mix over time.

## Retention & privacy

| Data | Retention | Basis |
|---|---|---|
| `loyalty_transactions` | 7 years | Financial record |
| `quiz_sessions` (anonymous) | 14 months | Analytics |
| `reviews` (rejected) | 90 days | Moderation audit |
| `subscription_snapshots` | 3 years | Cohort analysis |
| `customers` | Until deletion request | — |

Emails are stored as SHA-256 hashes; raw addresses live only in Shopify, which
narrows the blast radius of a compromise here and makes a deletion request a
single-system operation.
