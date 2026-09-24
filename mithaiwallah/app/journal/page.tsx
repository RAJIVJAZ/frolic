import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/sections/PageHero';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { POSTS } from '@/lib/journal';
import { breadcrumbSchema, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Journal — Mithai, Gifting & Celebration Guides',
  description: 'Guides to Indian sweets, corporate gifting, wedding mithai boxes and festive hampers from the Mithaiwallah kitchen.',
  path: '/journal',
});

const fmt = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export default function JournalPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: 'Journal', path: '/journal' }])} />
      <PageHero
        eyebrow="The Journal"
        title="Notes from the kitchen."
        intro="Guides to Indian sweets, gifting and celebration — for families, HR teams and wedding planners."
        crumbs={[{ name: 'Journal', path: '/journal' }]}
      />
      <section className="py-20">
        <div className="container-luxe grid gap-6 md:grid-cols-3">
          {POSTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full">
              <Link href={`/journal/${p.slug}`} className="group flex h-full flex-col rounded-[2rem] border border-gold-300/60 bg-cream-50 p-8 shadow-card transition hover:-translate-y-1">
                <span className="eyebrow">{p.category}</span>
                <h2 className="mt-4 font-display text-[1.75rem] font-semibold leading-tight text-maroon">{p.title}</h2>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-muted">{p.description}</p>
                <p className="mt-6 flex items-center justify-between text-sm text-ink-muted">
                  <span>
                    {fmt(p.date)} · {p.readMinutes} min read
                  </span>
                  <Icon name="arrow" className="h-4 w-4 text-maroon transition-transform group-hover:translate-x-1" />
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
