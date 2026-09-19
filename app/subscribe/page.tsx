import type { Metadata } from 'next';
import { SubscribeCta } from '@/components/sections/SubscribeCta';
import { BundleBuilder } from '@/components/commerce/BundleBuilder';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, faqSchema, breadcrumbSchema } from '@/lib/seo';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = buildMetadata({
  title: 'Subscribe & Save 20%',
  description:
    'A box of FROLIC every two, four or six weeks. Save 20% on every can, swap flavours freely, skip or cancel anytime from your account.',
  path: '/subscribe',
  keywords: ['soda subscription India', 'healthy drink subscription', 'prebiotic soda delivery'],
});

const SUB_FAQS = [
  {
    question: 'How do I change the flavours in my next box?',
    answer:
      'From your account dashboard, up to 48 hours before your box ships. There is no limit on how often you change it.',
  },
  {
    question: 'Can I skip a delivery?',
    answer:
      'Yes — skip one box or pause indefinitely, both self-serve from your account. Your discount and pricing are unaffected.',
  },
  {
    question: 'Is there a minimum commitment?',
    answer: 'No. You can cancel after the first box with no fee and no phone call.',
  },
  {
    question: 'When am I charged?',
    answer:
      'Three days before each box ships. You get an email reminder before every charge with a link to change or skip it.',
  },
];

const STEPS = [
  { n: '01', title: 'Build your box', body: 'Twelve or twenty-four cans, any mix of the ten flavours.' },
  { n: '02', title: 'Pick a rhythm', body: 'Every two, four or six weeks. Four is what most people land on.' },
  { n: '03', title: 'Forget about it', body: 'We email before every charge. Change, skip or cancel in two taps.' },
];

export default function SubscribePage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(SUB_FAQS),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Subscribe', path: '/subscribe' },
          ]),
        ]}
      />

      <section className="shell pt-12">
        <div className="max-w-3xl">
          <p className="eyebrow">Subscribe &amp; save</p>
          <h1 className="mt-4 text-step-5">Twenty percent off, permanently.</h1>
          <p className="mt-6 text-step-1 text-charcoal-muted">
            Stacked on top of pack pricing, so a 24-can subscription box works out at about ₹84 a
            can. No minimum, no cancellation fee, no retention script.
          </p>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-panel bg-charcoal/10 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i} className="bg-cream p-7">
              <span className="font-mono text-[0.68rem] font-bold text-lime-700">{step.n}</span>
              <h2 className="mt-4 text-step-2">{step.title}</h2>
              <p className="mt-2 text-charcoal-muted">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="shell py-section">
        <h2 className="text-step-3">Start with your first box</h2>
        <p className="mt-3 max-w-prose text-charcoal-muted">
          Leave the subscription toggle on and the 20% applies to every can in here.
        </p>
        <div className="mt-10">
          <BundleBuilder />
        </div>
      </section>

      <SubscribeCta />

      <section className="shell py-section">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-step-3">Subscription questions</h2>
          <dl className="mt-8 divide-y divide-charcoal-line border-y border-charcoal-line">
            {SUB_FAQS.map((faq) => (
              <div key={faq.question} className="py-6">
                <dt className="font-display text-step-1 font-bold">{faq.question}</dt>
                <dd className="mt-3 leading-relaxed text-charcoal-muted">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
