import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/layout/PageShell';
import { JsonLd } from '@/components/seo/JsonLd';
import { CtaBand } from '@/components/sections/CtaBand';
import { Ornament } from '@/components/ui/SectionHeading';
import { POSTS, postBySlug, type Block } from '@/lib/journal';
import { articleSchema, breadcrumbSchema, pageMeta } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = postBySlug(params.slug);
  if (!p) return {};
  return pageMeta({ title: p.title, description: p.description, path: `/journal/${p.slug}`, type: 'article' });
}

function Render({ b }: { b: Block }) {
  switch (b.type) {
    case 'p':
      return <p>{b.text}</p>;
    case 'h2':
      return <h2>{b.text}</h2>;
    case 'ul':
      return (
        <ul>
          {b.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {b.head.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

const CTA: Record<string, { href: string; label: string }> = {
  'Corporate Gifting': { href: '/corporate-gifting#enquire', label: 'Plan corporate gifting' },
  Weddings: { href: '/wedding-gifting#enquire', label: 'Book a wedding consultation' },
  Festivals: { href: '/festive-hampers#enquire', label: 'Order festive hampers' },
  'Know Your Mithai': { href: '/sweets', label: 'Explore the collection' },
};

export default function PostPage({ params }: { params: { slug: string } }) {
  const p = postBySlug(params.slug);
  if (!p) notFound();
  return (
    <PageShell>
      <JsonLd data={[articleSchema(p), breadcrumbSchema([{ name: 'Journal', path: '/journal' }, { name: p.title, path: `/journal/${p.slug}` }])]} />
      <article>
        <header className="relative overflow-hidden bg-cream-200/50 pb-16 pt-40 sm:pt-48">
          <div className="jaali pointer-events-none absolute inset-0 opacity-60" />
          <div className="container-luxe relative max-w-3xl">
            <Link href="/journal" className="text-sm text-ink-muted hover:text-maroon">
              ← Journal
            </Link>
            <p className="eyebrow mt-8">{p.category}</p>
            <Ornament className="-ml-1 mt-3" />
            <h1 className="mt-5 font-display text-display-md font-semibold text-maroon text-balance">{p.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">{p.description}</p>
            <p className="mt-6 text-sm text-ink-muted">
              <time dateTime={p.date}>{new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</time> · {p.readMinutes} min read
            </p>
          </div>
        </header>
        <div className="container-luxe prose-luxe max-w-3xl py-16">
          {p.body.map((b, i) => (
            <Render key={i} b={b} />
          ))}
        </div>
      </article>
      <CtaBand primary={CTA[p.category]} />
    </PageShell>
  );
}
