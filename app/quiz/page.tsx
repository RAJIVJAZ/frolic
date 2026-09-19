import type { Metadata } from 'next';
import { FlavourQuiz } from '@/components/commerce/FlavourQuiz';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Find Your Flavour — 4-Question Quiz',
  description:
    'Answer four questions and we will point you at the three FROLIC prebiotic sodas most likely to suit you. Takes about thirty seconds.',
  path: '/quiz',
});

export default function QuizPage() {
  return (
    <section className="shell pb-section pt-12">
      <div className="mx-auto mb-12 max-w-3xl">
        <p className="eyebrow">Flavour finder</p>
        <h1 className="mt-4 text-step-5">Four questions. Three matches.</h1>
      </div>
      <FlavourQuiz />
    </section>
  );
}
