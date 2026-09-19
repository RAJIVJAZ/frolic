import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { buildMetadata } from '@/lib/seo';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = buildMetadata({
  title: 'Wholesale & Trade',
  description: 'Stock FROLIC in your café, gym, restaurant or store. Ten-case minimum, standard trade margins, delivery across India.',
  path: '/wholesale',
});

const TERMS = [
  { label: 'Minimum order', value: '10 cases (240 cans)' },
  { label: 'Case configuration', value: '24 × 250 ml, single or mixed flavour' },
  { label: 'Lead time', value: '5–7 working days from PO' },
  { label: 'Payment', value: 'Net 30 after the first three orders' },
  { label: 'Shelf life', value: '12 months from production, ambient' },
  { label: 'Support', value: 'Fridge decals, shelf talkers, staff tasting kit' },
];

export default function WholesalePage() {
  return (
    <PageShell
      eyebrow="Wholesale"
      title="Put it in your fridge."
      intro="We supply cafés, gyms, restaurants, offices and independent grocers across India. No exclusivity clauses, no listing fees."
      path="/wholesale"
    >
      <dl className="grid gap-px overflow-hidden rounded-card bg-charcoal/10 sm:grid-cols-2">
        {TERMS.map((t) => (
          <div key={t.label} className="bg-cream p-5">
            <dt className="eyebrow">{t.label}</dt>
            <dd className="mt-1.5 font-semibold">{t.value}</dd>
          </div>
        ))}
      </dl>

      <form className="mt-12 space-y-4" aria-label="Wholesale enquiry">
        <h2 className="text-step-2">Start a trade account</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="business" className="eyebrow mb-2 block">Business name</label>
            <input id="business" required className="min-h-[3rem] w-full rounded-card border-2 border-charcoal/12 bg-cream px-4 focus:border-charcoal focus:outline-none" />
          </div>
          <div>
            <label htmlFor="city" className="eyebrow mb-2 block">City</label>
            <input id="city" required className="min-h-[3rem] w-full rounded-card border-2 border-charcoal/12 bg-cream px-4 focus:border-charcoal focus:outline-none" />
          </div>
          <div>
            <label htmlFor="trade-email" className="eyebrow mb-2 block">Email</label>
            <input id="trade-email" type="email" required autoComplete="email" className="min-h-[3rem] w-full rounded-card border-2 border-charcoal/12 bg-cream px-4 focus:border-charcoal focus:outline-none" />
          </div>
          <div>
            <label htmlFor="type" className="eyebrow mb-2 block">Business type</label>
            <select id="type" className="min-h-[3rem] w-full rounded-card border-2 border-charcoal/12 bg-cream px-4 focus:border-charcoal focus:outline-none">
              <option>Café or restaurant</option>
              <option>Gym or studio</option>
              <option>Grocery or convenience</option>
              <option>Office or workplace</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <Button type="submit" size="lg">Request a trade pack</Button>
      </form>
    </PageShell>
  );
}
