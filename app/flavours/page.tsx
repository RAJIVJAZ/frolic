import type { Metadata } from 'next';
import { FlavourCarousel } from '@/components/sections/FlavourCarousel';
import { ProductCard } from '@/components/commerce/ProductCard';
import { products } from '@/lib/products';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, itemListSchema, breadcrumbSchema } from '@/lib/seo';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = buildMetadata({
  title: 'All Ten Flavours',
  description:
    'Nimbu Masala, Aam Panna, Kokum, Jamun, Kala Khatta, Ginger Lime, Jeera, Himalayan Lemon, Guava Chili and Orange Masala — each with its own flavour story and nutrition panel.',
  path: '/flavours',
  keywords: ['prebiotic soda flavours', 'Indian soda flavours', 'jamun soda', 'kokum soda'],
});

export default function FlavoursPage() {
  return (
    <>
      <JsonLd
        data={[
          itemListSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Flavours', path: '/flavours' },
          ]),
        ]}
      />

      <section className="shell pt-12">
        <div className="max-w-3xl">
          <p className="eyebrow">The range</p>
          <h1 className="mt-4 text-step-5">Ten flavours. Ten worlds.</h1>
          <p className="mt-6 text-step-1 text-charcoal-muted">
            Each one is built around a drink that already exists somewhere in India — a cart, a
            kitchen, a coastline. Take your time.
          </p>
        </div>
      </section>

      <FlavourCarousel />

      <section className="shell py-section">
        <h2 className="text-step-3">All ten, side by side</h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {products.map((product, i) => (
            <Reveal as="li" key={product.handle} delay={i % 5}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
