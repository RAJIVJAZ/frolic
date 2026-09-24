import { OG_SIZE, ogCard } from '@/lib/og';
import { POSTS, postBySlug } from '@/lib/journal';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Mithaiwallah Journal';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const p = postBySlug(params.slug)!;
  return ogCard({ eyebrow: `Journal · ${p.category}`, title: p.title, subtitle: `${p.readMinutes} min read` });
}
