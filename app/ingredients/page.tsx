import type { Metadata } from 'next';
import { Ingredients } from '@/components/sections/Ingredients';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Every Ingredient, Named',
  description:
    'Chicory root fibre, acacia gum, kokum, jamun, tulsi, amla and more — where each one comes from, what it tastes like and why it is in the can. No proprietary blends.',
  path: '/ingredients',
  keywords: ['prebiotic soda ingredients', 'chicory root fibre', 'natural soda ingredients India'],
});

export default function IngredientsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Ingredients', path: '/ingredients' },
        ])}
      />
      <section className="shell pt-12">
        <div className="max-w-3xl">
          <p className="eyebrow">Ingredients</p>
          <h1 className="mt-4 text-step-5">Nothing hiding behind a trademark.</h1>
          <p className="mt-6 text-step-1 text-charcoal-muted">
            Ten ingredients doing the real work, and what each of them is for. If it is in the can,
            it is on this page.
          </p>
        </div>
      </section>
      <Ingredients />
    </>
  );
}
