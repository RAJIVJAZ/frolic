import type { Metadata } from 'next';
import { SIGNUP_INTENTS } from '@/lib/company';
import { SignupForm } from '@/components/prelaunch/SignupForm';
import { StagePill } from '@/components/prelaunch/StatusPill';
import { buildMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Join the Waitlist',
  description:
    'Be among the first to taste FROLIC — India’s prebiotic soda built on Indian flavours. Early tasters, distributors, investors and partners can register interest.',
  path: '/waitlist',
});

const ORDER = ['waitlist', 'taster', 'distributor', 'investor', 'partnership'] as const;

export default function WaitlistPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Waitlist', path: '/waitlist' }])} />

      <section className="shell pt-12">
        <div className="max-w-3xl">
          <StagePill />
          <h1 className="mt-6 text-step-5">Be among the first to experience FROLIC.</h1>
          <p className="mt-6 text-step-1 text-charcoal-muted">
            We are pre-launch. There is no product to buy yet and we will not pretend otherwise —
            what there is, is a brand, a range, a plan and a founder building it. Tell us which of
            those you want to be part of.
          </p>
        </div>
      </section>

      <section className="shell py-section">
        <div className="grid gap-5 lg:grid-cols-2">
          {ORDER.map((intent, i) => {
            const c = SIGNUP_INTENTS[intent];
            const featured = i === 0;
            return (
              <div
                key={intent}
                className={
                  featured
                    ? 'rounded-panel border-2 border-charcoal bg-cream p-7 lg:col-span-2 lg:p-9'
                    : 'rounded-panel border border-charcoal-line bg-cream p-7'
                }
              >
                <div className={featured ? 'grid gap-8 lg:grid-cols-2 lg:items-center' : ''}>
                  <div>
                    <h2 className={featured ? 'text-step-3' : 'text-step-2'}>{c.label}</h2>
                    <p className="mt-3 max-w-prose leading-relaxed text-charcoal-muted">{c.blurb}</p>
                  </div>
                  <SignupForm intent={intent} className={featured ? '' : 'mt-6'} />
                </div>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-12 max-w-prose text-center text-step--1 text-charcoal-muted">
          We write rarely — when a pilot batch is ready, when there is a launch date, when there is
          something to taste. Not on a schedule.
        </p>
      </section>
    </>
  );
}
