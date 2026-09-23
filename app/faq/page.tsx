import type { Metadata } from 'next';
import { PRELAUNCH_FAQS } from '@/lib/faqs';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, faqSchema, breadcrumbSchema } from '@/lib/seo';
import { ButtonLink, Arrow } from '@/components/ui/Button';

export const metadata: Metadata = buildMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Sugar content, fibre, shipping, subscriptions and whether prebiotic is the same as probiotic. Straight answers about FROLIC.',
  path: '/faq',
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(PRELAUNCH_FAQS),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'FAQ', path: '/faq' },
          ]),
        ]}
      />
      <section className="shell py-section">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Questions</p>
          <h1 className="mt-4 text-step-5">Straight answers.</h1>

          <dl className="mt-12 divide-y divide-charcoal-line border-y border-charcoal-line">
            {PRELAUNCH_FAQS.map((faq) => (
              <div key={faq.question} className="py-7">
                <dt className="font-display text-step-2 font-bold">{faq.question}</dt>
                <dd className="mt-3 max-w-prose leading-relaxed text-charcoal-muted">{faq.answer}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 rounded-card border border-charcoal-line p-7">
            <h2 className="text-step-2">Still stuck?</h2>
            <p className="mt-2 text-charcoal-muted">
              Email hello@frolic.in and a human replies within one working day.
            </p>
            <div className="mt-5">
              <ButtonLink href="/contact" variant="outline">
                Contact us <Arrow />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
