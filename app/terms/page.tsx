import type { Metadata } from 'next';
import { PageShell, Prose } from '@/components/layout/PageShell';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Sale',
  description: 'The terms that apply when you buy from frolic.in, including subscriptions, pricing and liability.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <PageShell eyebrow="Legal" title="Terms of sale" intro="Last updated 1 September 2026." path="/terms">
      <Prose>
        <h2>Who you are buying from</h2>
        <p>
          Frolic Beverages Pvt. Ltd., a company registered in India. These terms apply to every
          order placed through frolic.in.
        </p>

        <h2>Orders</h2>
        <p>
          An order is accepted when we email you a dispatch confirmation, not when you place it. If
          we cannot fulfil an order — stock, delivery area, a pricing error — we will tell you and
          refund you in full.
        </p>

        <h2>Pricing</h2>
        <p>
          Prices are in Indian rupees and include GST. Shipping is shown before you pay. We may
          change prices at any time, but never for an order already accepted, and never for a
          subscription cycle already confirmed by email.
        </p>

        <h2>Subscriptions</h2>
        <ul>
          <li>You are charged three days before each box ships, with an email reminder first.</li>
          <li>You can change flavours, change cadence, skip, pause or cancel up to 48 hours before dispatch.</li>
          <li>There is no minimum term and no cancellation fee.</li>
          <li>If a payment fails we retry twice over five days, then pause the subscription.</li>
        </ul>

        <h2>Product information</h2>
        <p>
          FROLIC is a food product. Nutritional values are typical and may vary marginally by batch.
          Nothing on this site is medical advice or a claim to treat, prevent or cure any condition.
          Check the can for the definitive ingredient and allergen statement.
        </p>

        <h2>Liability</h2>
        <p>
          Nothing in these terms limits liability for death or personal injury caused by negligence,
          for fraud, or for anything else that cannot lawfully be limited. Beyond that, our
          liability for any order is limited to the amount you paid for it.
        </p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of India, with courts in Prayagraj having jurisdiction.</p>
      </Prose>
    </PageShell>
  );
}
