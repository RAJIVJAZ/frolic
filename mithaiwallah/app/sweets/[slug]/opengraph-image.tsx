import { OG_SIZE, ogCard } from '@/lib/og';
import { PRODUCTS, productBySlug } from '@/lib/products';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Mithaiwallah signature sweet';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const p = productBySlug(params.slug)!;
  return ogCard({ eyebrow: 'The Signature Collection', title: p.name, subtitle: p.tagline });
}
