import type { Metadata } from 'next';
import { FounderStory } from '@/components/sections/FounderStory';
import { StagePill } from '@/components/prelaunch/StatusPill';
import { SignupForm } from '@/components/prelaunch/SignupForm';
import { buildMetadata, breadcrumbSchema, SITE } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { FOUNDER, COMPANY } from '@/lib/company';
import { ButtonLink, Arrow } from '@/components/ui/Button';

export const metadata: Metadata = buildMetadata({
  title: 'The Founder',
  description:
    'Rajeev Jaiswal — electrical engineer, food manufacturer, and founder of FROLIC. Why he is building India’s prebiotic soda on Indian flavours.',
  path: '/founder',
});

function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: FOUNDER.name,
    jobTitle: FOUNDER.role,
    worksFor: { '@type': 'Organization', name: SITE.name },
    address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressRegion: 'Maharashtra', addressCountry: 'IN' },
  };
}

export default function FounderPage() {
  return (
    <>
      <JsonLd
        data={[
          personSchema(),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Founder', path: '/founder' }]),
        ]}
      />

      <section className="shell pt-12">
        <div className="max-w-3xl">
          <StagePill />
          <h1 className="mt-6 text-step-5">
            An engineer who makes things, building a drink properly.
          </h1>
          <p className="mt-6 text-step-1 text-charcoal-muted">
            FROLIC has one founder. {COMPANY.base}. No team yet, and no pretending otherwise.
          </p>
        </div>
      </section>

      <FounderStory full />

      <section className="bg-ivory py-section">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-step-3">Building the founding team</h2>
            <p className="mt-4 leading-relaxed text-charcoal-muted">
              A solo founder is a risk and it would be strange to claim otherwise. The honest
              version is that FROLIC needs three capabilities it does not yet have in-house, and
              hiring them is a higher priority than moving fast.
            </p>
            <ul className="mt-7 space-y-px overflow-hidden rounded-card bg-charcoal/10">
              {[
                ['Beverage formulation', 'A food technologist who has suspended fibre in a carbonated matrix before.'],
                ['Sales & distribution', 'Someone with real FMCG distributor relationships. This cannot be built from a cold start.'],
                ['Brand & community', 'Building the pre-launch audience that makes a first production run worth making.'],
              ].map(([t, d]) => (
                <li key={t} className="bg-cream px-5 py-4">
                  <p className="font-semibold">{t}</p>
                  <p className="mt-1 text-step--1 text-charcoal-muted">{d}</p>
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <ButtonLink href="/careers" variant="outline">
                See open roles <Arrow />
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-panel border border-charcoal-line bg-cream p-7">
            <h2 className="text-step-2">Get in touch</h2>
            <p className="mt-3 text-charcoal-muted">
              Investors, formulators, distributors and anyone who has built a beverage brand before
              — the inbox is open and read personally.
            </p>
            <dl className="mt-6 space-y-3 text-step--1">
              <div className="flex justify-between gap-4 border-b border-charcoal-line pb-3">
                <dt className="text-charcoal-muted">Email</dt>
                <dd className="font-semibold">{FOUNDER.email}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-charcoal-line pb-3">
                <dt className="text-charcoal-muted">LinkedIn</dt>
                <dd className="font-semibold">{FOUNDER.placeholders.linkedin}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-charcoal-muted">Based in</dt>
                <dd className="font-semibold">{COMPANY.base}</dd>
              </div>
            </dl>
            <div className="mt-7">
              <SignupForm intent="partnership" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
