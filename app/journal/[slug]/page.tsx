import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { posts } from '@/lib/journal';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, breadcrumbSchema, absoluteUrl, SITE } from '@/lib/seo';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink, Arrow } from '@/components/ui/Button';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Post not found' };
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/journal/${post.slug}`,
    keywords: [post.targetKeyword],
  });
}

function articleSchema(post: (typeof posts)[number]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    wordCount: post.body.reduce((n, s) => n + s.p.join(' ').split(/\s+/).length, 0),
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: { '@id': `${SITE.url}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/journal/${post.slug}`) },
  };
}

export default function JournalPost({ params }: Params) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Journal', path: '/journal' },
            { name: post.title, path: `/journal/${post.slug}` },
          ]),
        ]}
      />

      <article className="shell py-section">
        <div className="mx-auto max-w-prose">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href="/journal"
              className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-charcoal-muted hover:text-charcoal"
            >
              ← Journal
            </Link>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <Badge>{post.category}</Badge>
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-charcoal-muted">
              {post.readingMinutes} min read
            </span>
            <time
              dateTime={post.date}
              className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-charcoal-muted"
            >
              {new Date(post.date).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </div>

          <h1 className="mt-6 text-step-4">{post.title}</h1>
          <p className="mt-6 text-step-1 leading-relaxed text-charcoal-muted">{post.excerpt}</p>

          <div className="mt-12 space-y-12">
            {post.body.map((section) => (
              <section key={section.h}>
                <h2 className="text-step-2">{section.h}</h2>
                {section.p.map((para) => (
                  <p key={para.slice(0, 30)} className="mt-4 leading-relaxed text-charcoal-soft">
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <aside className="mt-16 rounded-panel border-2 border-charcoal p-8">
            <p className="eyebrow">While you are here</p>
            <h2 className="mt-3 text-step-2">Ten flavours, 7g of fibre each.</h2>
            <p className="mt-2 text-charcoal-muted">
              Built from nimbu, jamun, kokum and everything else we grew up drinking.
            </p>
            <div className="mt-6">
              <ButtonLink href="/shop">Shop FROLIC <Arrow /></ButtonLink>
            </div>
          </aside>
        </div>
      </article>

      <section className="shell pb-section">
        <div className="mx-auto max-w-prose">
          <h2 className="text-step-2">Read next</h2>
          <ul className="mt-6 space-y-px overflow-hidden rounded-card bg-charcoal/10">
            {more.map((p) => (
              <li key={p.slug} className="bg-cream">
                <Link
                  href={`/journal/${p.slug}`}
                  className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-charcoal/[0.03]"
                >
                  <span>
                    <span className="block font-semibold">{p.title}</span>
                    <span className="mt-0.5 block text-step--1 text-charcoal-muted">
                      {p.category} · {p.readingMinutes} min
                    </span>
                  </span>
                  <Arrow className="shrink-0 text-charcoal-muted" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
