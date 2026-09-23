import type { Metadata } from 'next';
import { StagePill } from '@/components/prelaunch/StatusPill';
import { SignupForm } from '@/components/prelaunch/SignupForm';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { FOUNDER } from '@/lib/company';

export const metadata: Metadata = buildMetadata({
  title: 'Join Us',
  description:
    'FROLIC is a one-person company building India’s prebiotic soda. The founding roles we are looking to fill, and what joining now actually means.',
  path: '/careers',
});

/**
 * Careers, pre-launch.
 *
 * These are roles being recruited for, not funded headcount with a start date.
 * Framed as founding-team conversations, because anything else would misdescribe
 * what someone would actually be joining.
 */
const ROLES = [
  {
    title: 'Beverage Formulation Lead',
    type: 'Founding team',
    location: 'Pune · on-site',
    priority: 'Highest priority',
    body: 'Suspending 7 g of fibre in a clear carbonated liquid without clouding it, losing carbonation or flattening the aromatics. If you have solved this before, you are the most important hire this company makes.',
    looking: ['Food technology or beverage science background', 'Hands-on bench trial experience', 'Ideally carbonated soft drinks or functional beverages'],
  },
  {
    title: 'Sales & Distribution Lead',
    type: 'Founding team',
    location: 'Mumbai or Pune · field',
    priority: 'Highest priority',
    body: 'Indian beverage distribution cannot be built from a cold start, and no amount of capital substitutes for the relationships. We need someone who already has them.',
    looking: ['FMCG or beverage distribution experience', 'Existing distributor and modern trade relationships', 'Comfortable being early and building the function'],
  },
  {
    title: 'Brand & Community Lead',
    type: 'Founding team',
    location: 'Remote (India)',
    priority: 'After first production',
    body: 'Turning a waitlist into a community, and a community into the demand that makes a first production run worth making. The brand system exists — this is about making people care about it.',
    looking: ['Consumer brand or D2C community experience', 'Strong writing', 'Comfortable with a brand that under-claims'],
  },
  {
    title: 'Operations & Supply Chain',
    type: 'Founding team',
    location: 'Pune · on-site',
    priority: 'After co-packer selection',
    body: 'Co-packer management, ingredient sourcing including seasonal fruit, inventory and the unglamorous work that decides whether a beverage brand survives its first summer.',
    looking: ['FMCG operations or procurement', 'Comfortable with seasonal and perishable inputs', 'Quality systems experience'],
  },
];

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Careers', path: '/careers' }])} />

      <section className="shell pt-12">
        <div className="max-w-3xl">
          <StagePill />
          <h1 className="mt-6 text-step-5">Come build this from the beginning.</h1>
          <p className="mt-6 text-step-1 text-charcoal-muted">
            FROLIC is currently one person. That is not a humblebrag — it is the situation, and it
            is why these roles are real founding-team conversations rather than job listings.
          </p>
        </div>

        <div className="mt-10 max-w-3xl rounded-panel border-2 border-tangerine-400 bg-tangerine-50 p-7">
          <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.16em] text-tangerine-600">
            What joining now actually means
          </p>
          <ul className="mt-4 space-y-2.5 leading-relaxed text-charcoal-soft">
            <li className="flex gap-2.5"><span className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-tangerine-500" aria-hidden />Pre-revenue and pre-funding. Compensation will involve meaningful equity and will be discussed openly.</li>
            <li className="flex gap-2.5"><span className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-tangerine-500" aria-hidden />No product has been manufactured yet. You would be shaping the first one, not inheriting it.</li>
            <li className="flex gap-2.5"><span className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-tangerine-500" aria-hidden />Timing depends on funding and on the first pilot batch. We will be straight with you about both.</li>
          </ul>
        </div>
      </section>

      <section className="shell py-section">
        <h2 className="text-step-3">Roles we&apos;re looking to fill</h2>
        <ul className="mt-8 space-y-5">
          {ROLES.map((role, i) => (
            <Reveal as="li" key={role.title} delay={i}>
              <article className="rounded-card border border-charcoal-line bg-cream p-7 transition-shadow hover:shadow-lift">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-step-2">{role.title}</h3>
                    <p className="mt-1.5 text-step--1 text-charcoal-muted">
                      {role.type} · {role.location}
                    </p>
                  </div>
                  <Badge tone={role.priority === 'Highest priority' ? 'ink' : 'neutral'}>
                    {role.priority}
                  </Badge>
                </div>
                <p className="mt-4 max-w-prose leading-relaxed text-charcoal-muted">{role.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {role.looking.map((l) => <li key={l} className="chip">{l}</li>)}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-ivory py-section">
        <div className="shell mx-auto max-w-2xl">
          <h2 className="text-step-3">Interested?</h2>
          <p className="mt-3 text-charcoal-muted">
            There is no application portal. Write to {FOUNDER.email} with what you have
            built, or use the form below. It is read by the founder, because the founder is the
            whole company.
          </p>
          <div className="mt-8">
            <SignupForm intent="partnership" />
          </div>
        </div>
      </section>
    </>
  );
}
