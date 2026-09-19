import type { Metadata } from 'next';
import { BundleBuilder } from '@/components/commerce/BundleBuilder';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Build Your Own Box',
  description:
    'Mix and match any of the ten FROLIC prebiotic sodas into a 12 or 24-can box. Same price whatever the mix. Save up to 32% with a subscription.',
  path: '/bundle',
  keywords: ['prebiotic soda variety pack', 'mixed soda box India'],
});

export default function BundlePage() {
  return (
    <section className="shell pb-section pt-12">
      <header className="mb-10 max-w-2xl">
        <p className="eyebrow">Build a bundle</p>
        <h1 className="mt-4 text-step-5">Your box, your mix.</h1>
        <p className="mt-5 text-step-1 text-charcoal-muted">
          Same price whether you fill it with one flavour or all ten. Twelve cans to start, or
          twenty-four if you already know what you like.
        </p>
      </header>
      <BundleBuilder />
    </section>
  );
}
