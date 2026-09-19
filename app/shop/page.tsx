import type { Metadata } from 'next';
import { ShopGrid } from '@/components/commerce/ShopGrid';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, itemListSchema, breadcrumbSchema } from '@/lib/seo';
import { ButtonLink, Arrow } from '@/components/ui/Button';

export const metadata: Metadata = buildMetadata({
  title: 'Shop All Prebiotic Sodas',
  description:
    'All ten FROLIC prebiotic sodas. 7g prebiotic fibre and low added sugar in every 250ml can. Filter by flavour profile, sort by sugar. Free shipping over ₹999.',
  path: '/shop',
  keywords: ['buy prebiotic soda India', 'healthy soda online India', 'low sugar soft drink buy'],
});

export default function ShopPage() {
  return (
    <>
      <JsonLd
        data={[
          itemListSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Shop', path: '/shop' },
          ]),
        ]}
      />
      <section className="shell pb-section pt-12">
        <header className="flex flex-col gap-6 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">The full range</p>
            <h1 className="mt-4 max-w-[16ch] text-step-5">Ten flavours. Pick your starting point.</h1>
            <p className="mt-5 max-w-prose text-step-1 text-charcoal-muted">
              Every can: 7g of prebiotic fibre, under 40 kcal, no caffeine. The only thing that
              changes is how loud it is.
            </p>
          </div>
          <ButtonLink href="/quiz" variant="outline" className="shrink-0">
            Not sure? Take the quiz <Arrow />
          </ButtonLink>
        </header>

        <ShopGrid />
      </section>
    </>
  );
}
