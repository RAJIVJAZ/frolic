import type { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/lib/products';
import { LAUNCH_FLAVOURS, LAUNCH_SET_RATIONALE } from '@/lib/company';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { Reveal } from '@/components/ui/Reveal';
import { Arrow, ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CanFallback } from '@/components/three/CanFallback';
import { StagePill } from '@/components/prelaunch/StatusPill';
import { FlavourCarousel } from '@/components/sections/FlavourCarousel';
import { worldVars } from '@/lib/utils';

export const metadata: Metadata = buildMetadata({
  title: 'The Range',
  description:
    'Ten FROLIC flavour concepts built from Indian drinking culture — nimbu masala, aam panna, kokum, jamun, jeera and more. Four selected for launch.',
  path: '/flavours',
});

function ConceptCard({ handle, index }: { handle: string; index: number }) {
  const product = products.find((p) => p.handle === handle)!;
  const isLaunch = (LAUNCH_FLAVOURS as readonly string[]).includes(handle);
  return (
    <Reveal as="li" delay={index % 5}>
      <Link
        href={`/flavours/${product.handle}`}
        className="group flex h-full flex-col overflow-hidden rounded-card border border-charcoal-line bg-cream transition-all duration-500 ease-frolic hover:-translate-y-1 hover:shadow-float"
        style={worldVars(product.world)}
      >
        <div className="relative grid aspect-[4/5] place-items-center" style={{ background: product.world.wash }}>
          <CanFallback product={product} widthClass="w-[36%]" />
          <span className="absolute left-4 top-4">
            <Badge tone={isLaunch ? 'ink' : 'neutral'}>{isLaunch ? 'Launch set' : 'In development'}</Badge>
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-step-1 leading-tight">{product.name}</h3>
          <p className="mt-1.5 text-step--1 text-charcoal-muted">{product.notes.join(' · ')}</p>
          <p className="mt-3 flex-1 text-step--1 leading-relaxed text-charcoal-muted">{product.tagline}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-step--1 font-semibold">
            Flavour story <Arrow />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function FlavoursPage() {
  const launch = products.filter((p) => (LAUNCH_FLAVOURS as readonly string[]).includes(p.handle));
  const rest = products.filter((p) => !(LAUNCH_FLAVOURS as readonly string[]).includes(p.handle));

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Flavours', path: '/flavours' }])} />

      <section className="shell pt-12">
        <div className="max-w-3xl">
          <StagePill />
          <h1 className="mt-6 text-step-5">Ten concepts. Four go first.</h1>
          <p className="mt-6 text-step-1 text-charcoal-muted">
            Every flavour is built around a drink that already exists somewhere in India — a
            roadside cart, a coastal kitchen, a summer ritual. None has been manufactured yet.
          </p>
        </div>
      </section>

      <FlavourCarousel />

      <section className="shell py-section">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">The launch set</p>
            <h2 className="mt-3 text-step-3">Four to start</h2>
            <p className="mt-3 text-charcoal-muted">{LAUNCH_SET_RATIONALE}</p>
          </div>
          <ButtonLink href="/waitlist" className="shrink-0">
            Join the waitlist <Arrow />
          </ButtonLink>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {launch.map((p, i) => <ConceptCard key={p.handle} handle={p.handle} index={i} />)}
        </ul>

        <div className="mt-20 max-w-2xl">
          <p className="eyebrow">Still in development</p>
          <h2 className="mt-3 text-step-3">Six more concepts</h2>
          <p className="mt-3 text-charcoal-muted">
            Written, designed and costed — waiting on formulation capacity and demand signal before
            they join the range.
          </p>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {rest.map((p, i) => <ConceptCard key={p.handle} handle={p.handle} index={i} />)}
        </ul>

        <p className="mt-10 text-step--1 text-charcoal-muted">
          Cans shown are design concepts. Final artwork, formulation and nutritional values are not
          yet determined.
        </p>
      </section>
    </>
  );
}
