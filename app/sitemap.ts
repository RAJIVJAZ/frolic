import type { MetadataRoute } from 'next';
import { products } from '@/lib/products';
import { posts } from '@/lib/journal';
import { SITE } from '@/lib/seo';

/**
 * Priorities reflect commercial intent, not page count: the shop and product
 * pages are the money pages, the editorial pages support them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1, freq: 'weekly' },
    { path: '/waitlist', priority: 0.95, freq: 'weekly' },
    { path: '/flavours', priority: 0.9, freq: 'weekly' },
    { path: '/development', priority: 0.9, freq: 'weekly' },
    { path: '/founder', priority: 0.8, freq: 'monthly' },
    { path: '/science', priority: 0.8, freq: 'monthly' },
    { path: '/investors', priority: 0.75, freq: 'monthly' },
    { path: '/ingredients', priority: 0.75, freq: 'monthly' },
    { path: '/distributors', priority: 0.7, freq: 'monthly' },
    { path: '/quiz', priority: 0.7, freq: 'monthly' },
    { path: '/journal', priority: 0.7, freq: 'weekly' },
    { path: '/story', priority: 0.6, freq: 'yearly' },
    { path: '/faq', priority: 0.6, freq: 'monthly' },
    { path: '/careers', priority: 0.6, freq: 'monthly' },
    { path: '/contact', priority: 0.5, freq: 'yearly' },
    { path: '/accessibility', priority: 0.3, freq: 'yearly' },
    { path: '/privacy', priority: 0.2, freq: 'yearly' },
    { path: '/terms', priority: 0.2, freq: 'yearly' },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE.url}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...products.map((p) => ({
      url: `${SITE.url}/flavours/${p.handle}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...posts.map((p) => ({
      url: `${SITE.url}/journal/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'yearly' as const,
      priority: 0.55,
    })),
  ];
}
