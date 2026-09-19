import type { Metadata } from 'next';
import { PageShell, Prose } from '@/components/layout/PageShell';
import { buildMetadata, faqSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Shipping & Returns',
  description: 'Free shipping over ₹999, 2–4 working days to metros. Damaged or leaking cans replaced, no return required.',
  path: '/shipping',
});

const FAQS = [
  { question: 'How much is shipping?', answer: 'Free on orders over ₹999. Below that, a flat ₹79 anywhere in India.' },
  { question: 'How long does delivery take?', answer: '2–4 working days to metro cities, 4–7 working days elsewhere. Subscriptions ship on the same weekday each cycle.' },
  { question: 'What if a can arrives damaged?', answer: 'Send a photo to hello@frolic.in within 7 days and we replace it. You do not need to return anything — shipping a damaged can back costs more than the can.' },
  { question: 'Can I return an order I did not like?', answer: 'Unopened packs can be returned within 14 days of delivery for a full refund minus return shipping. We cannot accept opened cans for food-safety reasons.' },
];

export default function ShippingPage() {
  return (
    <PageShell
      eyebrow="Shipping & returns"
      title="Getting it to you."
      intro="Cans are heavy and fragile, which makes beverage logistics genuinely difficult. Here is exactly how we handle it."
      path="/shipping"
    >
      <JsonLd data={faqSchema(FAQS)} />
      <Prose>
        <h2>Rates and timing</h2>
        <ul>
          <li>Orders over ₹999 — free shipping, anywhere in India.</li>
          <li>Orders under ₹999 — flat ₹79.</li>
          <li>Metro cities — 2 to 4 working days.</li>
          <li>Everywhere else — 4 to 7 working days.</li>
          <li>Subscriptions dispatch on the same weekday each cycle, with an email three days before.</li>
        </ul>

        <h2>Packaging</h2>
        <p>
          Every pack ships in a double-walled corrugated carton with moulded pulp dividers. Both are
          recyclable and neither is plastic. We over-engineer this deliberately: a leaking can ruins
          the whole box, and the cost of a sturdier carton is lower than the cost of replacing one.
        </p>

        <h2>Damage</h2>
        <p>
          Photograph the damage and email hello@frolic.in within seven days of delivery. We send a
          replacement straight away and do not ask for the damaged goods back.
        </p>

        <h2>Returns</h2>
        <p>
          Unopened packs can be returned within fourteen days of delivery for a refund of the
          product value; return shipping is deducted unless the return is our error. Opened cans
          cannot be accepted — food safety, not pedantry.
        </p>

        <h2>Cancelling an order</h2>
        <p>
          Orders can be cancelled free of charge until they are handed to the courier, usually the
          next working day. After that, treat it as a return.
        </p>
      </Prose>
    </PageShell>
  );
}
