import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { buildMetadata } from '@/lib/seo';
import { ButtonLink, Arrow } from '@/components/ui/Button';

export const metadata: Metadata = buildMetadata({
  title: 'Find a Stockist',
  description: 'FROLIC is stocked in 400+ stores, cafés and gyms across India. Find the nearest one, or ask your local shop to carry it.',
  path: '/stockists',
});

const CITIES = [
  { city: 'Mumbai', count: 118, areas: ['Bandra', 'Lower Parel', 'Andheri', 'Colaba', 'Powai'] },
  { city: 'Bengaluru', count: 96, areas: ['Indiranagar', 'Koramangala', 'HSR', 'Jayanagar'] },
  { city: 'Delhi NCR', count: 84, areas: ['Hauz Khas', 'GK-II', 'Gurugram', 'Noida'] },
  { city: 'Pune', count: 47, areas: ['Koregaon Park', 'Baner', 'Kalyani Nagar'] },
  { city: 'Hyderabad', count: 33, areas: ['Jubilee Hills', 'Gachibowli', 'Banjara Hills'] },
  { city: 'Chennai', count: 28, areas: ['Nungambakkam', 'Adyar', 'Alwarpet'] },
];

export default function StockistsPage() {
  return (
    <PageShell
      eyebrow="Stockists"
      title="Four hundred fridges and counting."
      intro="Online is faster, but if you want to try one before committing to a pack, here is roughly where we are."
      path="/stockists"
      wide
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CITIES.map((c) => (
          <li key={c.city} className="rounded-card border border-charcoal-line p-6">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-step-2">{c.city}</h2>
              <span className="font-mono text-[0.72rem] font-bold text-charcoal-muted">
                {c.count} stores
              </span>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.areas.map((a) => (
                <li key={a} className="chip">{a}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-panel border-2 border-charcoal p-8">
        <h2 className="text-step-3">Not near any of these?</h2>
        <p className="mt-3 max-w-prose text-charcoal-muted">
          We ship anywhere in India, usually faster than driving to a shop. Or tell your local store
          to email trade@frolic.in — we onboard new stockists from ten cases up.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/shop" size="lg">Order online <Arrow /></ButtonLink>
          <ButtonLink href="/wholesale" variant="outline" size="lg">Stock FROLIC</ButtonLink>
        </div>
      </div>
    </PageShell>
  );
}
