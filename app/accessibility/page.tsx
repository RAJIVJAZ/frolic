import type { Metadata } from 'next';
import { PageShell, Prose } from '@/components/layout/PageShell';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Accessibility',
  description: 'How frolic.in is built for keyboard, screen reader and reduced-motion use, and what we know still needs work.',
  path: '/accessibility',
});

export default function AccessibilityPage() {
  return (
    <PageShell
      eyebrow="Accessibility"
      title="Built to be usable."
      intro="We target WCAG 2.2 Level AA. This page states what we have done, and — more usefully — what we know is not done yet."
      path="/accessibility"
    >
      <Prose>
        <h2>What is in place</h2>
        <ul>
          <li>Every interactive control is reachable and operable by keyboard, with a visible focus ring that meets contrast requirements.</li>
          <li>Touch targets are at least 44 × 44 CSS pixels throughout.</li>
          <li>Body text meets 4.5:1 contrast; large text and UI boundaries meet 3:1.</li>
          <li>The 3D product scenes are decorative, hidden from assistive technology, and replaced with a static image when motion is reduced.</li>
          <li><code>prefers-reduced-motion</code> is honoured globally: scroll-driven sequences become static panels rather than simply freezing mid-animation.</li>
          <li>Charts are never colour-alone — every value is directly labelled and each chart has a table view.</li>
          <li>Nutrition information is marked up as a real table with row headers, so screen readers announce which value belongs to which nutrient.</li>
          <li>Form inputs have persistent visible labels, not placeholder-only labels.</li>
        </ul>

        <h2>What still needs work</h2>
        <ul>
          <li>The flavour carousel is operable by keyboard but does not yet implement the full ARIA tabs keyboard pattern (arrow-key navigation between tabs).</li>
          <li>Some longer flavour stories have not been reviewed for plain-language readability.</li>
          <li>We have not completed a full screen-reader pass on the bundle builder with JAWS.</li>
        </ul>

        <h2>Tell us</h2>
        <p>
          If something here does not work for you, email access@frolic.in. Describe what you were
          trying to do and what happened — we would rather fix a real problem than guess at one.
        </p>
      </Prose>
    </PageShell>
  );
}
