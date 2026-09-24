import Link from 'next/link';
import { SweetArt } from '@/components/art/SweetArt';
import { PageShell } from '@/components/layout/PageShell';
import { JsonLd } from '@/components/seo/JsonLd';
import { CtaBand } from '@/components/sections/CtaBand';
import { PageHero } from '@/components/sections/PageHero';
import { ArchFrame } from '@/components/ui/ArchFrame';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { PRODUCTS } from '@/lib/products';
import { abs, breadcrumbSchema, pageMeta } from '@/lib/seo';
import { cn } from '@/lib/utils';

export const metadata = pageMeta({
  title: 'Premium Indian Sweets — The Signature Collection',
  description:
    'Milk cake, kalakand, malai barfi, peda, kunda and Bikaneri cake — premium Indian sweets handcrafted in Prayagraj with pure milk solids and premium dry fruits. Gift boxes, bulk and wholesale.',
  path: '/sweets',
});

export default function SweetsPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Sweets', path: '/sweets' }]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Mithaiwallah signature sweets',
            itemListElement: PRODUCTS.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/sweets/${p.slug}`), name: p.name })),
          },
        ]}
      />
      <PageHero
        eyebrow="The Signature Collection"
        title="Premium Indian sweets, made the long way."
        intro="Six sweets, each with its own story and its own patience. Pure milk solids, pure desi ghee and premium dry fruits — handcrafted in Prayagraj for your table, your gifts and your celebrations."
        crumbs={[{ name: 'Sweets', path: '/sweets' }]}
        actions={
          <>
            <Button href="#collection" variant="primary" icon="arrow">
              Browse the collection
            </Button>
            <Button href="/contact?type=retail#enquire" variant="outline">
              Order a box
            </Button>
          </>
        }
      />

      {/* Index */}
      <section id="collection" className="scroll-mt-28 py-20">
        <div className="container-luxe grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <Link href={`#${p.slug}`} className="group block">
                <ArchFrame tone={p.tone} className="aspect-[4/5] transition-transform duration-700 ease-luxe group-hover:-translate-y-1">
                  <div className="absolute inset-x-0 top-[14%] text-center font-hindi text-2xl text-gold-700/60 sm:text-3xl">{p.hindi}</div>
                  <SweetArt variant={p.art} className="absolute bottom-[6%] left-1/2 w-[118%] max-w-none -translate-x-1/2" />
                </ArchFrame>
                <h2 className="mt-5 font-display text-2xl font-semibold text-maroon sm:text-3xl">{p.name}</h2>
                <p className="mt-1 text-sm text-ink-muted">{p.tagline}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* A dedicated section per sweet */}
      {PRODUCTS.map((p, i) => (
        <section key={p.slug} id={p.slug} className={cn('scroll-mt-28 py-20 sm:py-28', i % 2 === 0 ? 'bg-cream-50' : 'bg-cream')}>
          <div className="container-luxe grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className={cn('mx-auto w-full max-w-lg', i % 2 === 1 && 'lg:order-2')}>
              <ArchFrame tone={p.tone} className="aspect-square">
                <div className="absolute inset-x-0 top-[12%] text-center font-hindi text-4xl text-gold-700/60">{p.hindi}</div>
                <SweetArt variant={p.art} title={`${p.name}, plated`} className="absolute bottom-[4%] left-1/2 w-[112%] max-w-none -translate-x-1/2" />
              </ArchFrame>
              <p className="mt-3 text-center text-xs uppercase tracking-[0.16em] text-ink-muted">Illustration · product photography coming soon</p>
            </Reveal>
            <Reveal>
              <span className="eyebrow">0{i + 1} · {p.tagline}</span>
              <h2 className="mt-4 font-display text-display-md font-semibold text-maroon">{p.name}</h2>
              <div className="mt-6 space-y-4 text-[1.03rem] leading-relaxed text-ink-soft">
                {p.story.slice(0, 2).map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="label">Ingredients</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{p.ingredients.join(' · ')}</p>
                </div>
                <div>
                  <h3 className="label">Serving suggestion</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{p.serving[0]}</p>
                </div>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button href={`/sweets/${p.slug}`} variant="primary" icon="arrow">
                  Discover {p.name}
                </Button>
                <Link href={`/contact?type=wholesale&product=${p.slug}#enquire`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-maroon">
                  <Icon name="boxes" className="h-4 w-4" /> Bulk supply
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <CtaBand />
    </PageShell>
  );
}
