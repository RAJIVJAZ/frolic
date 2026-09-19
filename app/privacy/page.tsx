import type { Metadata } from 'next';
import { PageShell, Prose } from '@/components/layout/PageShell';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'What data FROLIC collects, why, how long we keep it, and how to get it deleted.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <PageShell eyebrow="Legal" title="Privacy policy" intro="Last updated 1 September 2026." path="/privacy">
      <Prose>
        <p>
          This policy explains what Frolic Beverages Pvt. Ltd. does with personal data collected
          through frolic.in. It is written to be read, not to be survived.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li><strong>Order data</strong> — name, delivery address, email, phone number and order contents. We need these to send you a box.</li>
          <li><strong>Account data</strong> — email and password hash, plus subscription preferences if you have one.</li>
          <li><strong>Payment data</strong> — handled entirely by our payment processor. We never see or store your card details.</li>
          <li><strong>Analytics</strong> — aggregated page views and conversion events, collected only after you consent.</li>
        </ul>

        <h2>What we do not do</h2>
        <p>
          We do not sell personal data, we do not share it with data brokers, and we do not use it
          for anything other than fulfilling your order, running your subscription and — if you have
          opted in — sending you email.
        </p>

        <h2>How long we keep it</h2>
        <p>
          Order records are retained for seven years because tax law requires it. Account data is
          kept until you delete your account. Analytics data is retained for fourteen months.
        </p>

        <h2>Your rights</h2>
        <p>
          You can ask for a copy of your data, ask us to correct it, or ask us to delete it. Email
          privacy@frolic.in and we will act within thirty days. Deleting your account does not
          delete order records we are legally obliged to keep.
        </p>

        <h2>Cookies</h2>
        <p>
          Strictly necessary cookies (cart contents, login session) are set without consent because
          the site cannot function without them. Analytics and marketing cookies are set only if
          you accept them, and you can change your mind at any time.
        </p>

        <h2>Contact</h2>
        <p>
          Frolic Beverages Pvt. Ltd., Pune, Maharashtra, India. Data queries: privacy@frolic.in.
        </p>
      </Prose>
    </PageShell>
  );
}
