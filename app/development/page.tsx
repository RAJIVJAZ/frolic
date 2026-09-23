import type { Metadata } from 'next';
import { DevelopmentRoadmap, Timeline } from '@/components/prelaunch/Roadmap';
import { StagePill } from '@/components/prelaunch/StatusPill';
import { SignupForm } from '@/components/prelaunch/SignupForm';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { ROADMAP } from '@/lib/company';

export const metadata: Metadata = buildMetadata({
  title: 'What We’re Building',
  description:
    'An honest status report on FROLIC’s development — what is complete, what is underway, and what has not started yet.',
  path: '/development',
});

export default function DevelopmentPage() {
  const done = ROADMAP.filter((i) => i.status === 'complete').length;
  const underway = ROADMAP.filter((i) => i.status === 'underway').length;
  const notStarted = ROADMAP.length - done - underway;

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Development', path: '/development' }])} />

      <section className="shell pt-12">
        <div className="max-w-3xl">
          <StagePill />
          <h1 className="mt-6 text-step-5">What&apos;s built, what isn&apos;t.</h1>
          <p className="mt-6 text-step-1 text-charcoal-muted">
            Most pre-launch websites show a roadmap where everything is green. This one shows the
            red as well, because the unfinished items are the ones that actually decide whether
            FROLIC reaches a shelf.
          </p>
        </div>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-panel bg-charcoal/10 sm:grid-cols-3">
          {[
            { v: done, l: 'Workstreams complete', tone: 'text-mint-700' },
            { v: underway, l: 'Underway now', tone: 'text-tangerine-600' },
            { v: notStarted, l: 'Not started yet', tone: 'text-charcoal-muted' },
          ].map((s) => (
            <div key={s.l} className="bg-cream p-7">
              <dt className="sr-only">{s.l}</dt>
              <dd>
                <span className={`block font-display text-step-4 font-black leading-none ${s.tone}`}>
                  {s.v}
                </span>
                <span className="mt-2 block font-mono text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-charcoal-muted">
                  {s.l}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <DevelopmentRoadmap />
      <Timeline />

      <section className="shell py-section">
        <div className="mx-auto max-w-2xl rounded-panel border-2 border-charcoal p-8 text-center">
          <h2 className="text-step-3">Want to follow the build?</h2>
          <p className="mx-auto mt-3 max-w-prose text-charcoal-muted">
            We send an update when a workstream actually moves — not a newsletter.
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <SignupForm intent="waitlist" compact />
          </div>
        </div>
      </section>
    </>
  );
}
