import type { MetadataRoute } from 'next';
import { POSTS } from '@/lib/journal';
import { PRODUCTS } from '@/lib/products';
import { abs } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const core: [string, number][] = [
    ['/', 1],
    ['/corporate-gifting', 0.95],
    ['/wedding-gifting', 0.95],
    ['/sweets', 0.9],
    ['/wholesale', 0.85],
    ['/festive-hampers', 0.85],
    ['/franchise', 0.7],
    ['/manufacturing', 0.7],
    ['/about', 0.6],
    ['/contact', 0.7],
    ['/journal', 0.6],
    ['/privacy', 0.2],
  ];
  return [
    ...core.map(([path, priority]) => ({ url: abs(path), lastModified: now, priority })),
    ...PRODUCTS.map((p) => ({ url: abs(`/sweets/${p.slug}`), lastModified: now, priority: 0.8 })),
    ...POSTS.map((p) => ({ url: abs(`/journal/${p.slug}`), lastModified: new Date(p.date), priority: 0.5 })),
  ];
}
