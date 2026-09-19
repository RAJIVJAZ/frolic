import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Account, cart and checkout pages are per-visitor and have no search
        // value; search result pages would generate near-infinite thin URLs.
        disallow: ['/account', '/cart', '/checkout', '/api/', '/search'],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
