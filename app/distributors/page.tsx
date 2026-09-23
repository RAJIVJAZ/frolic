import type { Metadata } from 'next';
import { StagePill } from '@/components/prelaunch/StatusPill';
import { SignupForm } from '@/components/prelaunch/SignupForm';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = buildMetadata({
  title: 'Distributors & Retail',
  description:
    'Register early interest in stocking FROLIC — for distributors, retailers, cafés, gyms and offices across India. Launching from 2027.',
  path: '/distributors',
});

export default function DistributorsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Distributors', path: '/distributors' }])} />

      <section className="shell pt-12">
        <div className="max-w-3xl">
          <StagePill />
          <h1 className="mt-6 text-step-5">Stock FROLIC when it launches.</h1>
          <p className="mt-6 text-step-1 text-charcoal-muted">
            We are not shipping yet, and we are not going to waste your time pretending a product
            exists. What we are doing is building a list of distributors, retailers and venues to
            talk to first when pilot production is ready.
          </p>
        </div>
      </section>

      <section className="shell py-section">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2 className="text-step-3">What we can tell you now</h2>
            <dl className="mt-7 grid gap-px overflow-hidden rounded-card bg-charcoal/10 sm:grid-cols-2">
              {[
                ['Format', '250 ml sleek aluminium can'],
                ['Range at launch', 'Four flavours, expanding to ten'],
                ['Storage', 'Ambient — no cold chain required'],
                ['Shelf life target', '12 months (to be validated)'],
                ['Category', 'Premium functional / prebiotic soda'],
                ['First markets', 'Two metros, then five'],
              ].map(([k, v]) => (
                <div key={k} className="bg-cream p-5">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-1.5 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 rounded-card border-2 border-tangerine-400 bg-tangerine-50 p-6">
              <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.16em] text-tangerine-600">
                Not yet settled
              </p>
              <p className="mt-2 leading-relaxed text-charcoal-soft">
                Trade pricing, margin structure, case configuration, minimum order quantity and
                payment terms are all still being worked out — they depend on the co-packer and
                first production economics. We will come back to you with real numbers rather than
                indicative ones.
              </p>
            </div>

            <h2 className="mt-14 text-step-3">Ambient is the advantage</h2>
            <p className="mt-4 max-w-prose leading-relaxed text-charcoal-muted">
              FROLIC uses prebiotic fibre rather than live cultures, which means it is shelf-stable
              at ambient temperature. It survives carbonation, canning and a warm delivery van — no
              refrigerated transport, no cold-chain cost, no short-date risk on your shelf. That is
              a genuine structural difference from probiotic products in the same aisle.
            </p>

            <h2 className="mt-14 text-step-3">Who we want to hear from</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ['Regional distributors', 'Metro and tier-1 territories, premium beverage portfolios'],
                ['Modern trade & premium grocery', 'Stores whose shoppers already buy at this price point'],
                ['Cafés & restaurants', 'Venues looking for a non-alcoholic option with a story'],
                ['Gyms & studios', 'Caffeine-free, functional, ambient'],
                ['Offices & workplaces', 'Pantry and event supply'],
                ['Quick commerce', 'Dark store listings at launch'],
              ].map(([t, d], i) => (
                <Reveal as="li" key={t} delay={i}>
                  <div className="h-full rounded-card border border-charcoal-line p-5">
                    <p className="font-semibold">{t}</p>
                    <p className="mt-1.5 text-step--1 text-charcoal-muted">{d}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="rounded-panel border-2 border-charcoal bg-cream p-7 lg:sticky lg:top-24">
            <h2 className="text-step-2">Register interest</h2>
            <p className="mt-2 text-step--1 text-charcoal-muted">
              No commitment. You go on the list we call first when there is stock.
            </p>
            <SignupForm intent="distributor" className="mt-6" />
          </div>
        </div>
      </section>
    </>
  );
}
