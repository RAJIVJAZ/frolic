import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { buildMetadata } from '@/lib/seo';
import { posts } from '@/lib/journal';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { Arrow } from '@/components/ui/Button';

export const metadata: Metadata = buildMetadata({
  title: 'Journal',
  description:
    'Prebiotics explained without the hype, sugar comparisons with actual numbers, Indian fruit worth knowing about, and what happens in a beverage formulation lab.',
  path: '/journal',
  keywords: ['prebiotic vs probiotic', 'daily fibre intake India', 'sugar content soft drinks India'],
});

export default function JournalPage() {
  return (
    <PageShell
      eyebrow="Journal"
      title="Longer than a label allows."
      intro="Gut health without the overselling, flavour history, and the parts of making a drink that nobody puts on the can."
      path="/journal"
      wide
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal as="li" key={post.slug} delay={i % 3}>
            <article className="group h-full">
              <Link
                href={`/journal/${post.slug}`}
                className="flex h-full flex-col rounded-card border border-charcoal-line p-6 transition-all duration-400 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge>{post.category}</Badge>
                  <span className="font-mono text-[0.66rem] text-charcoal-muted">
                    {post.readingMinutes} min
                  </span>
                </div>
                <h2 className="mt-5 text-step-1 leading-snug">{post.title}</h2>
                <p className="mt-3 flex-1 text-step--1 leading-relaxed text-charcoal-muted">
                  {post.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-step--1 font-semibold">
                  Read <Arrow />
                </span>
              </Link>
            </article>
          </Reveal>
        ))}
      </ul>
    </PageShell>
  );
}
