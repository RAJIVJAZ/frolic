import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductMedia } from '@/components/art/ProductMedia';
import { SweetArt } from '@/components/art/SweetArt';
import { PageShell } from '@/components/layout/PageShell';
import { JsonLd } from '@/components/seo/JsonLd';
import { EnquirySection } from '@/components/sections/EnquirySection';
import { Faq } from '@/components/sections/Faq';
import { ArchFrame } from '@/components/ui/ArchFrame';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Ornament } from '@/components/ui/SectionHeading';
import { whatsappLink } from '@/lib/business';
import { PRODUCTS, productBySlug } from '@/lib/products';
import { breadcrumbSchema, pageMeta, productSchema } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = productBySlug(params.slug);
  if (!p) return {};
  return pageMeta({
    title: `${p.name} — Handcrafted ${p.name} Sweet, Gift Boxes & Bulk Supply`,
    description: p.metaDescription,
    path: `/sweets/${p.slug}`,
  });
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = productBySlug(params.slug);
  if (!p) notFound();
  const wa = whatsappLink(`Hello Mithaiwallah, I would like to order ${p.name}.`);
  const others = PRODUCTS.filter((x) => x.slug !== p.slug).slice(0, 3);
  const faqs = [
    { q: `How long does your ${p.name.toLowerCase()} stay fresh?`, a: `${p.shelfLife}. Every pack carries its best-before date; keep it sealed and away from heat and direct sun.` },
    { q: `What is ${p.name.toLowerCase()} made from?`, a: `${p.ingredients.join(', ')}. Allergens: ${p.allergens.join(', ')}.` },
    { q: `Do you supply ${p.name.toLowerCase()} in bulk or under our own label?`, a: `${p.bulk} Share your volumes and delivery city through the enquiry form or WhatsApp and our trade team will quote.` },
    { q: 'Can I include it in a custom gift box?', a: `Yes. ${p.name} can go into any of our gift collections or a fully custom assortment, with your logo, monogram or message on the box.` },
  ];

  return (
    <PageShell>
      <JsonLd data={[productSchema(p), breadcrumbSchema([{ name: 'Sweets', path: '/sweets' }, { name: p.name, path: `/sweets/${p.slug}` }])]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-cream-200/50 pb-20 pt-36 sm:pt-44">
        <div className="jaali pointer-events-none absolute inset-0 opacity-50" />
        <div className="container-luxe relative">
          <nav aria-label="Breadcrumb" className="mb-8 text-[0.8rem] text-ink-muted">
            <Link href="/" className="hover:text-maroon">Home</Link>
            <span className="mx-2 text-gold-500">/</span>
            <Link href="/sweets" className="hover:text-maroon">Sweets</Link>
            <span className="mx-2 text-gold-500">/</span>
            <span aria-current="page" className="text-ink-soft">{p.name}</span>
          </nav>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className="mx-auto w-full max-w-xl">
              <ArchFrame tone={p.tone} className="aspect-square">
                <div className="absolute inset-x-0 top-[11%] text-center font-hindi text-5xl text-gold-700/55">{p.hindi}</div>
                {p.photo ? (
                  <ProductMedia product={p} priority />
                ) : (
                  <SweetArt variant={p.art} title={`${p.name}, plated`} className="absolute bottom-[4%] left-1/2 w-[112%] max-w-none -translate-x-1/2" />
                )}
              </ArchFrame>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="eyebrow">{p.tagline}</span>
              <Ornament className="-ml-1 mt-3" />
              <h1 className="mt-5 font-display text-display-lg font-semibold text-maroon">{p.name}</h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">{p.summary}</p>
              <div className="mt-7">
                <h2 className="label">Available as</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.formats.map((f) => (
                    <li key={f} className="rounded-full border border-gold-300/70 bg-cream-50 px-4 py-1.5 text-sm text-ink-soft">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href={`/contact?type=retail&product=${p.slug}#enquire`} variant="primary" icon="arrow">
                  Order {p.name}
                </Button>
                {wa && (
                  <Button href={wa} variant="whatsapp" iconLeft="whatsapp" external>
                    Order on WhatsApp
                  </Button>
                )}
                <Button href={`/contact?type=corporate&product=${p.slug}#enquire`} variant="outline" iconLeft="gift">
                  Add to a gift box
                </Button>
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-ink-muted">
                <Icon name="clock" className="h-4 w-4 text-gold-600" /> {p.shelfLife}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 sm:py-28">
        <div className="container-luxe grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <span className="eyebrow">The Story</span>
            <h2 className="mt-4 font-display text-display-sm font-semibold text-maroon">What makes our {p.name.toLowerCase()} different.</h2>
          </Reveal>
          <Reveal className="space-y-5 text-[1.08rem] leading-[1.85] text-ink-soft">
            {p.story.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Ingredients & serving */}
      <section className="bg-cream-50 py-24 sm:py-28">
        <div className="container-luxe grid gap-8 lg:grid-cols-2">
          <Reveal className="h-full rounded-[2rem] border border-gold-300/50 bg-cream p-9">
            <Icon name="leaf" className="h-7 w-7 text-gold-700" />
            <h2 className="mt-5 font-display text-3xl font-semibold text-maroon">Ingredients</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.ingredients.map((ing) => (
                <li key={ing} className="flex items-center gap-3 text-ink-soft">
                  <span className="h-1.5 w-1.5 rotate-45 bg-gold-500" /> {ing}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-gold-300/50 pt-5 text-sm text-ink-muted">
              <strong className="text-ink">Allergens:</strong> {p.allergens.join(', ')}. Made in a kitchen that also handles milk, tree nuts and dry fruits.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="h-full rounded-[2rem] bg-maroon-velvet p-9 text-cream">
            <Icon name="sparkle" className="h-7 w-7 text-gold-300" />
            <h2 className="mt-5 font-display text-3xl font-semibold text-gold-100">Serving suggestions</h2>
            <ul className="mt-6 space-y-4">
              {p.serving.map((s) => (
                <li key={s} className="flex gap-3 leading-relaxed text-cream/80">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-gold-300" /> {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* For business */}
      <section className="py-24 sm:py-28">
        <div className="container-luxe">
          <Reveal className="grid items-center gap-10 rounded-[2.5rem] border border-gold-300/60 bg-cream-200/60 p-9 sm:p-14 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="eyebrow">For Hotels, Caterers & Retailers</span>
              <h2 className="mt-4 font-display text-display-sm font-semibold text-maroon">
                {p.name} manufacturer & bulk supplier
              </h2>
              <p className="mt-5 leading-relaxed text-ink-soft">
                {p.bulk} Consistent recipe, consistent texture, batch after batch — with pan-India dispatch and private-label packaging on request.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Button href={`/contact?type=wholesale&product=${p.slug}#enquire`} variant="primary" icon="arrow">
                Get a wholesale quote
              </Button>
              <Button href="/wholesale#private-label" variant="ghost" icon="arrow">
                Private label options
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq faqs={faqs} title={`${p.name}, answered.`} />

      {/* More sweets */}
      <section className="bg-cream-50 py-24">
        <div className="container-luxe">
          <h2 className="text-center font-display text-display-sm font-semibold text-maroon">Complete the box</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/sweets/${o.slug}`} className="group">
                <ArchFrame tone={o.tone} className="aspect-[4/5] transition-transform duration-700 ease-luxe group-hover:-translate-y-1">
                  <SweetArt variant={o.art} className="absolute bottom-[6%] left-1/2 w-[118%] max-w-none -translate-x-1/2" />
                </ArchFrame>
                <h3 className="mt-4 font-display text-2xl font-semibold text-maroon">{o.name}</h3>
                <p className="text-sm text-ink-muted">{o.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EnquirySection defaultType="retail" title={`Order ${p.name}.`} intro="For your family, a gift or a celebration. Tell us what you need and where — we will confirm availability, delivery and price." />
    </PageShell>
  );
}
