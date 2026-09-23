import Link from 'next/link';
import { getProduct } from '@/lib/products';
import { LAUNCH_FLAVOURS, LAUNCH_SET_RATIONALE } from '@/lib/company';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Arrow } from '@/components/ui/Button';
import { CanFallback } from '@/components/three/CanFallback';
import { worldVars } from '@/lib/utils';

/**
 * The four launch concepts. No price, no cart — there is nothing to sell yet,
 * and a "Buy" button on a pre-launch site is the fastest way to look like a
 * mock-up rather than a company.
 */
export function LaunchFlavours() {
  const items = LAUNCH_FLAVOURS.map((h) => getProduct(h)!);

  return (
    <section className="py-section" aria-label="Launch flavours">
      <div className="shell">
        <SectionHeader
          eyebrow="The launch set"
          title={<>Four to start. Six in development.</>}
          body={LAUNCH_SET_RATIONALE}
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product, i) => (
            <Reveal as="li" key={product.handle} delay={i}>
              <article
                className="group h-full overflow-hidden rounded-card border border-charcoal-line bg-cream transition-all duration-500 ease-frolic hover:-translate-y-1 hover:shadow-float"
                style={worldVars(product.world)}
              >
                <Link href={`/flavours/${product.handle}`} className="flex h-full flex-col">
                  <div
                    className="relative grid aspect-[4/5] place-items-center overflow-hidden"
                    style={{ background: product.world.wash }}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(75% 60% at 50% 55%, ${product.world.base}55, transparent 70%)`,
                      }}
                    />
                    <CanFallback product={product} widthClass="w-[38%]" />
                    <span className="absolute left-4 top-4 rounded-pill border border-charcoal/12 bg-cream/85 px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-charcoal-soft backdrop-blur">
                      Concept
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-step-1 leading-tight">{product.name}</h3>
                    <p className="mt-1.5 text-step--1 text-charcoal-muted">
                      {product.notes.join(' · ')}
                    </p>
                    <p className="mt-3 flex-1 text-step--1 leading-relaxed text-charcoal-muted">
                      {product.tagline}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-step--1 font-semibold">
                      Flavour story <Arrow />
                    </span>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 text-step--1 text-charcoal-muted">
          Cans shown are design concepts. Final artwork, formulation and nutritional values are
          still in development.
        </p>
      </div>
    </section>
  );
}
