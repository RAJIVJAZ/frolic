import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, getProduct } from '@/lib/products';
import { ingredients } from '@/lib/ingredients';
import { LAUNCH_FLAVOURS } from '@/lib/company';
import { worldVars } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { LazyCanStage } from '@/components/three/LazyCanStage';
import { CanFallback } from '@/components/three/CanFallback';
import { NutritionPanel } from '@/components/commerce/NutritionPanel';
import { SignupForm } from '@/components/prelaunch/SignupForm';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { Arrow } from '@/components/ui/Button';

type Params = { params: { handle: string } };

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export function generateMetadata({ params }: Params): Metadata {
  const product = getProduct(params.handle);
  if (!product) return { title: 'Flavour not found' };
  return buildMetadata({
    title: `${product.name} — Flavour Concept`,
    description: `${product.tagline} A FROLIC prebiotic soda concept in development: ${product.notes.join(', ')}.`,
    path: `/flavours/${product.handle}`,
  });
}

/**
 * Flavour concept page.
 *
 * Deliberately not a product page: no price, no cart, no Add button. Nutrition
 * is shown as a formulation target and labelled as one, because no batch has
 * been produced and published figures would be a claim we cannot support.
 */
export default function FlavourPage({ params }: Params) {
  const product = getProduct(params.handle);
  if (!product) notFound();

  const isLaunch = (LAUNCH_FLAVOURS as readonly string[]).includes(product.handle);
  const others = products.filter((p) => p.handle !== product.handle).slice(0, 4);
  const linkedIngredients = product.heroIngredients.map((h) =>
    ingredients.find((i) => i.name.toLowerCase().includes(h.name.toLowerCase().split(' ')[0])),
  );

  return (
    <div style={worldVars(product.world)}>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Flavours', path: '/flavours' },
          { name: product.name, path: `/flavours/${product.handle}` },
        ])}
      />

      <section className="grain relative isolate overflow-hidden" style={{ background: product.world.wash }}>
        <div className="world-wash pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden />
        <div className="shell py-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-charcoal-muted">
              <li><Link href="/" className="hover:text-charcoal">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/flavours" className="hover:text-charcoal">Flavours</Link></li>
              <li aria-hidden>/</li>
              <li className="text-charcoal">{product.name}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="h-[46svh] min-h-[20rem] lg:sticky lg:top-24 lg:h-[70svh]">
              <LazyCanStage product={product} className="h-full w-full" bubbles={90} showForms scale={1.1} />
            </div>

            <div className="max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="ink">{isLaunch ? 'Launch flavour' : 'In development'}</Badge>
                <Badge>Concept — not yet in production</Badge>
              </div>

              <h1 className="mt-5 text-step-5">{product.name}</h1>
              <p className="mt-4 text-step-2 font-medium text-charcoal-soft">{product.tagline}</p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {product.notes.map((n) => <li key={n} className="chip">{n}</li>)}
              </ul>

              <div className="mt-9 rounded-panel border border-charcoal-line bg-cream p-6 shadow-lift">
                <p className="eyebrow">Want to taste this one?</p>
                <h2 className="mt-2 text-step-2">Join the waitlist</h2>
                <p className="mt-2 text-step--1 text-charcoal-muted">
                  Early tasters receive pilot batches and give structured feedback before launch.
                </p>
                <SignupForm intent="waitlist" compact className="mt-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <p className="eyebrow">The flavour story</p>
            <h2 className="mt-4 text-step-3">Why this one</h2>
            <p className="mt-6 text-step-1 leading-relaxed text-charcoal-soft">{product.story}</p>

            <dl className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <dt className="eyebrow">Who it&apos;s for</dt>
                <dd className="mt-2 text-charcoal-muted">{product.bestFor.join(' · ')}</dd>
              </div>
              <div>
                <dt className="eyebrow">How to drink it</dt>
                <dd className="mt-2 text-charcoal-muted">{product.ritual}</dd>
              </div>
              <div>
                <dt className="eyebrow">Goes with</dt>
                <dd className="mt-2 text-charcoal-muted">{product.pairing}</dd>
              </div>
              <div>
                <dt className="eyebrow">Flavour profile</dt>
                <dd className="mt-2 capitalize text-charcoal-muted">{product.profile.join(' · ')}</dd>
              </div>
            </dl>

            <div className="mt-12">
              <h3 className="text-step-2">Ingredient philosophy</h3>
              <ul className="mt-5 space-y-px overflow-hidden rounded-card bg-charcoal/10">
                {product.heroIngredients.map((ing, i) => {
                  const match = linkedIngredients[i];
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
            <p className="mt-3 text-[0.75rem] leading-relaxed text-charcoal-muted">
              <strong>Formulation target, not a verified panel.</strong> These are the values the
              development work is aimed at. Final figures will come from batch analysis once pilot
              production is complete.
            </p>

            <div className="mt-6 rounded-card border border-charcoal-line p-5">
              <p className="eyebrow">Packaging direction</p>
              <p className="mt-2 text-step--1 leading-relaxed text-charcoal-muted">
                {product.world.environment}
              </p>
              <div className="mt-4 flex gap-2">
                {[product.world.base, product.world.deep, product.world.wash].map((c) => (
                  <span key={c} className="h-8 flex-1 rounded-lg border border-charcoal/10" style={{ background: c }} title={c} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-section">
        <div className="shell">
          <h2 className="text-step-3">The rest of the range</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((p, i) => (
              <Reveal as="li" key={p.handle} delay={i}>
                <Link
                  href={`/flavours/${p.handle}`}
                  className="group block h-full overflow-hidden rounded-card border border-charcoal-line bg-cream transition-all duration-400 hover:-translate-y-1 hover:shadow-lift"
                  style={worldVars(p.world)}
                >
                  <div className="grid aspect-[4/5] place-items-center" style={{ background: p.world.wash }}>
                    <CanFallback product={p} widthClass="w-[34%]" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-step-1 leading-tight">{p.name}</h3>
                    <p className="mt-1.5 text-step--1 text-charcoal-muted">{p.notes.join(' · ')}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
