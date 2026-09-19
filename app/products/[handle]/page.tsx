import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, getProduct, formatINR } from '@/lib/products';
import { worldVars } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, productSchema, breadcrumbSchema } from '@/lib/seo';
import { reviews, reviewStats } from '@/lib/reviews';
import { ingredients } from '@/lib/ingredients';
import { LazyCanStage } from '@/components/three/LazyCanStage';
import { BuyBox } from '@/components/commerce/BuyBox';
import { NutritionPanel } from '@/components/commerce/NutritionPanel';
import { ProductCard } from '@/components/commerce/ProductCard';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { Stars } from '@/components/sections/SocialProof';
import { Arrow } from '@/components/ui/Button';

type Params = { params: { handle: string } };

/** All ten flavours are prerendered at build time. */
export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export function generateMetadata({ params }: Params): Metadata {
  const product = getProduct(params.handle);
  if (!product) return { title: 'Flavour not found' };

  return buildMetadata({
    title: `${product.name} — Prebiotic Soda`,
    description: `${product.tagline} ${product.nutrition.prebioticFibreG}g prebiotic fibre, ${product.nutrition.addedSugarG}g added sugar, ${product.nutrition.energyKcal} kcal per 250ml can. ${product.notes.join(', ')}.`,
    path: `/products/${product.handle}`,
    image: `/og/${product.handle}.png`,
    keywords: [
      `${product.shortName.toLowerCase()} soda`,
      'prebiotic soda India',
      'low sugar soft drink',
      'functional beverage India',
    ],
  });
}

export default function ProductPage({ params }: Params) {
  const product = getProduct(params.handle);
  if (!product) notFound();

  const related = products.filter((p) => p.handle !== product.handle).slice(0, 4);
  const productReviews = reviews.filter((r) => r.flavour === product.handle);
  const heroIngredientSlugs = product.heroIngredients.map((h) =>
    ingredients.find((i) => i.name.toLowerCase().includes(h.name.toLowerCase().split(' ')[0])),
  );

  return (
    <div style={worldVars(product.world)}>
      <JsonLd
        data={[
          productSchema(product, reviewStats.count, reviewStats.average),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Shop', path: '/shop' },
            { name: product.name, path: `/products/${product.handle}` },
          ]),
        ]}
      />

      {/* ——— Hero ————————————————————————————————————————— */}
      <section
        className="grain relative isolate overflow-hidden"
        style={{ background: product.world.wash }}
      >
        <div className="world-wash pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden />

        <div className="shell py-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-charcoal-muted">
              <li><Link href="/" className="hover:text-charcoal">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/shop" className="hover:text-charcoal">Shop</Link></li>
              <li aria-hidden>/</li>
              <li className="text-charcoal">{product.name}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="h-[46svh] min-h-[20rem] lg:h-[70svh] lg:sticky lg:top-24">
              <LazyCanStage
                product={product}
                className="h-full w-full"
                bubbles={90}
                showForms
                scale={1.1}
              />
            </div>

            <div className="max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                {product.badge && <Badge tone="ink">{product.badge}</Badge>}
                <Badge tone="world">{product.nutrition.prebioticFibreG}g prebiotic fibre</Badge>
                <Badge>No caffeine</Badge>
              </div>

              <h1 className="mt-5 text-step-5">{product.name}</h1>
              <p className="mt-4 text-step-2 font-medium text-charcoal-soft">{product.tagline}</p>

              <Link
                href="#reviews"
                className="mt-5 inline-flex items-center gap-2.5 text-step--1 text-charcoal-muted hover:text-charcoal"
              >
                <Stars rating={5} />
                <span>
                  {reviewStats.average} · {reviewStats.count.toLocaleString('en-IN')} reviews
                </span>
              </Link>

              <ul className="mt-7 flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <li key={note} className="chip">{note}</li>
                ))}
              </ul>

              <div className="mt-8">
                <BuyBox product={product} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Story ————————————————————————————————————————— */}
      <section className="py-section">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <p className="eyebrow">The flavour story</p>
            <h2 className="mt-4 text-step-3">Why this one exists</h2>
            <p className="mt-6 text-step-1 leading-relaxed text-charcoal-soft">{product.story}</p>

            <dl className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <dt className="eyebrow">How to drink it</dt>
                <dd className="mt-2 text-charcoal-muted">{product.ritual}</dd>
              </div>
              <div>
                <dt className="eyebrow">Goes with</dt>
                <dd className="mt-2 text-charcoal-muted">{product.pairing}</dd>
              </div>
              <div>
                <dt className="eyebrow">Best for</dt>
                <dd className="mt-2 text-charcoal-muted">{product.bestFor.join(' · ')}</dd>
              </div>
              <div>
                <dt className="eyebrow">Flavour profile</dt>
                <dd className="mt-2 capitalize text-charcoal-muted">{product.profile.join(' · ')}</dd>
              </div>
            </dl>

            <div className="mt-12">
              <h3 className="text-step-2">What&apos;s inside</h3>
              <ul className="mt-5 space-y-px overflow-hidden rounded-card bg-charcoal/10">
                {product.heroIngredients.map((ing, i) => {
                  const match = heroIngredientSlugs[i];
                  const inner = (
                    <>
                      <span className="font-semibold">{ing.name}</span>
                      <span className="mt-1 block text-step--1 text-charcoal-muted">{ing.role}</span>
                    </>
                  );
                  return (
                    <li key={ing.name} className="bg-cream">
                      {match ? (
                        <Link
                          href={`/ingredients#${match.slug}`}
                          className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-charcoal/[0.03]"
                        >
                          <span className="block">{inner}</span>
                          <Arrow className="shrink-0 text-charcoal-muted" />
                        </Link>
                      ) : (
                        <span className="block px-5 py-4">{inner}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="lg:pt-14">
            <NutritionPanel product={product} />

            <div className="mt-6 rounded-card border border-charcoal-line p-5">
              <p className="eyebrow">Art direction note</p>
              <p className="mt-2 text-step--1 leading-relaxed text-charcoal-muted">
                {product.world.environment}
              </p>
              <div className="mt-4 flex gap-2">
                {[product.world.base, product.world.deep, product.world.wash].map((c) => (
                  <span
                    key={c}
                    className="h-8 flex-1 rounded-lg border border-charcoal/10"
                    style={{ background: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Reviews ——————————————————————————————————————— */}
      <section id="reviews" className="bg-ivory py-section scroll-mt-24">
        <div className="shell">
          <h2 className="text-step-3">What people say about {product.shortName}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(productReviews.length > 0 ? productReviews : reviews.slice(0, 3)).map((review, i) => (
              <Reveal as="li" key={review.id} delay={i}>
                <figure className="flex h-full flex-col rounded-card border border-charcoal-line bg-cream p-6">
                  <div className="flex items-center justify-between">
                    <Stars rating={review.rating} />
                    {review.verified && <Badge tone="mint">Verified</Badge>}
                  </div>
                  <blockquote className="mt-4 flex-1">
                    <p className="font-display text-step-1 font-bold leading-snug">{review.title}</p>
                    <p className="mt-3 text-step--1 leading-relaxed text-charcoal-muted">{review.body}</p>
                  </blockquote>
                  <figcaption className="mt-5 border-t border-charcoal-line/70 pt-4 text-step--1 font-semibold">
                    {review.name}
                    <span className="ml-2 font-normal text-charcoal-muted">{review.location}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ——— Related ——————————————————————————————————————— */}
      <section className="py-section">
        <div className="shell">
          <h2 className="text-step-3">Try these next</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal as="li" key={p.handle} delay={i}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
