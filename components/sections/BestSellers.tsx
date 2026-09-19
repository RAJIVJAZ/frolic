import Link from 'next/link';
import { getBestsellers, formatINR, unitPriceFor } from '@/lib/products';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink, Arrow } from '@/components/ui/Button';
import { ProductCard } from '@/components/commerce/ProductCard';

export function BestSellers() {
  const items = getBestsellers();

  return (
    <section className="py-section" aria-label="Bestsellers">
      <div className="shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Start here"
            title={<>The four people order first.</>}
          />
          <ButtonLink href="/shop" variant="outline" className="shrink-0">
            Shop all ten <Arrow />
          </ButtonLink>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product, i) => (
            <Reveal as="li" key={product.handle} delay={i}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
