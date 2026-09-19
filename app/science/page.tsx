import type { Metadata } from 'next';
import { Science } from '@/components/sections/Science';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, faqSchema, breadcrumbSchema } from '@/lib/seo';
import { ButtonLink, Arrow } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = buildMetadata({
  title: 'The Science of Prebiotic Fibre',
  description:
    'What prebiotic fibre is, how it differs from a probiotic, and what 7g per can actually means. Plainly explained, with the claims we do and do not make.',
  path: '/science',
  keywords: [
    'what is prebiotic soda',
    'prebiotic vs probiotic',
    'gut health drink India',
    'inulin chicory root fibre',
  ],
});

const SCIENCE_FAQS = [
  {
    question: 'What is the difference between a prebiotic and a probiotic?',
    answer:
      'Probiotics are live micro-organisms. Prebiotics are fibres that the bacteria already in your gut can metabolise but you cannot digest. FROLIC contains prebiotic fibre and no live cultures.',
  },
  {
    question: 'How much fibre should I have in a day?',
    answer:
      'Indian dietary guidelines generally recommend around 25–30 g of dietary fibre per day for adults. One FROLIC can contributes 7 g. Individual needs vary — a qualified dietitian can advise for your situation.',
  },
  {
    question: 'Will 7g of fibre cause bloating?',
    answer:
      'Any meaningful increase in fibre intake can cause temporary bloating or wind if your usual intake is low. We use a slow-fermenting inulin and acacia blend for this reason, and we suggest starting with one can a day rather than three.',
  },
  {
    question: 'Is inulin safe?',
    answer:
      'Inulin is a widely used food ingredient found naturally in chicory, onions, garlic, bananas and wheat, and is permitted as a food ingredient in India. As with any fibre, tolerance varies between individuals.',
  },
];

const SECTIONS = [
  {
    heading: 'Fibre is the nutrient nobody optimised for',
    body: [
      'The soft drink category spent a century getting extremely good at one thing. Sweetness is cheap, shelf-stable, and reliably pleasurable — so that is what got optimised, and everything else in the can became a supporting act for it.',
      'Fibre went the other way. It is bulky, it can cloud a liquid, it changes mouthfeel, and it does nothing for the first sip. In a category judged on the first sip, it never stood a chance.',
      'That trade-off made sense when a soft drink was an occasional treat. It makes considerably less sense now that it is a daily habit for a large number of people.',
    ],
  },
  {
    heading: 'What makes a fibre "prebiotic"',
    body: [
      'A prebiotic is defined by what happens to it, not by what it is made of. Three things have to be true: it has to resist digestion in the upper gut, it has to be fermentable by the micro-organisms living in the colon, and that fermentation has to selectively favour some of them.',
      'Inulin — the fibre in chicory root — clears all three. It is a chain of fructose units linked in a way human digestive enzymes cannot break. It reaches the large intestine structurally unchanged, where resident bacteria are equipped to metabolise it.',
      'Acacia gum behaves similarly but ferments more gradually and further along the colon. Running both together is what lets us put 7 g in a can without making it an ordeal.',
    ],
  },
  {
    heading: 'What we will and will not tell you',
    body: [
      'Gut microbiome research is genuinely interesting and genuinely early. There is solid evidence that dietary fibre intake matters, and there is a great deal of enthusiastic extrapolation beyond that which we are not going to take part in.',
      'So: we will tell you exactly how much fibre is in the can, where it comes from, and what a prebiotic fibre is by definition. We will not tell you it will fix your digestion, your immunity, your mood or your skin.',
      'FROLIC is a soft drink with a better nutritional profile than the alternative. That is a real thing to be, and it does not need overselling.',
    ],
  },
];

export default function SciencePage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(SCIENCE_FAQS),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'The Science', path: '/science' },
          ]),
        ]}
      />

      <section className="shell pt-12">
        <div className="max-w-3xl">
          <p className="eyebrow">The science</p>
          <h1 className="mt-4 text-step-5">
            Seven grams, and what they are actually doing in there.
          </h1>
          <p className="mt-6 text-step-1 text-charcoal-muted">
            No hand-waving, no microbiome mysticism. Here is the mechanism, the dose, and the line
            we draw between what is established and what is still being studied.
          </p>
        </div>
      </section>

      <Science />

      <section className="shell py-section">
        <div className="mx-auto max-w-prose space-y-16">
          {SECTIONS.map((section, i) => (
            <Reveal key={section.heading} delay={i}>
              <article>
                <h2 className="text-step-3">{section.heading}</h2>
                {section.body.map((para) => (
                  <p key={para.slice(0, 32)} className="mt-5 text-step-1 leading-relaxed text-charcoal-soft">
                    {para}
                  </p>
                ))}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ivory py-section">
        <div className="shell mx-auto max-w-3xl">
          <h2 className="text-step-3">Common questions</h2>
          <dl className="mt-8 divide-y divide-charcoal-line">
            {SCIENCE_FAQS.map((faq) => (
              <div key={faq.question} className="py-6">
                <dt className="font-display text-step-1 font-bold">{faq.question}</dt>
                <dd className="mt-3 leading-relaxed text-charcoal-muted">{faq.answer}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10">
            <ButtonLink href="/shop" size="lg">
              Try it for yourself <Arrow />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
