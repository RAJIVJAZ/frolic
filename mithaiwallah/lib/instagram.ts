import 'server-only';
import type { SweetArtVariant } from './products';

/**
 * Instagram feed.
 *
 * With INSTAGRAM_ACCESS_TOKEN set (Instagram API with Instagram Login, on a
 * Business or Creator account), the gallery shows the latest posts and
 * refreshes hourly via ISR. Without it — or if the API fails — it shows the
 * curated tiles below, so the section never renders empty or broken.
 *
 * Long-lived tokens last 60 days. Refresh before expiry:
 *   GET https://graph.instagram.com/refresh_access_token
 *       ?grant_type=ig_refresh_token&access_token=TOKEN
 * (see docs/05-lead-funnel-and-automation.md for the monthly job).
 */

export type FeedItem =
  | { kind: 'live'; id: string; image: string; caption: string; href: string; isVideo: boolean }
  | { kind: 'curated'; id: string; art: SweetArtVariant | 'box'; caption: string; href: string; tone: string };

export const CURATED: FeedItem[] = [
  { kind: 'curated', id: 'c1', art: 'milk-cake', caption: 'Hours in the kadhai. Seconds on the plate.', href: '', tone: '#F1DDB7' },
  { kind: 'curated', id: 'c2', art: 'box', caption: 'Diwali boxes, packed by hand for 400 desks.', href: '', tone: '#E9D6B2' },
  { kind: 'curated', id: 'c3', art: 'kalakand', caption: 'Kalakand, made this morning.', href: '', tone: '#F5ECD8' },
  { kind: 'curated', id: 'c4', art: 'peda', caption: 'Every peda carries a thumbprint.', href: '', tone: '#EFD9B0' },
  { kind: 'curated', id: 'c5', art: 'malai-barfi', caption: 'Silver varq, one sheet at a time.', href: '', tone: '#F7F0E2' },
  { kind: 'curated', id: 'c6', art: 'kunda', caption: 'Kunda: milk taken to its darkest.', href: '', tone: '#E6CBA4' },
];

type ApiMedia = {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
};

export async function getInstagramFeed(limit = 6): Promise<{ items: FeedItem[]; live: boolean }> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return { items: CURATED.slice(0, limit), live: false };
  try {
    const url = new URL('https://graph.instagram.com/me/media');
    url.searchParams.set('fields', 'id,caption,media_type,media_url,thumbnail_url,permalink');
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('access_token', token);
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Instagram API ${res.status}`);
    const json = (await res.json()) as { data?: ApiMedia[] };
    const items: FeedItem[] = (json.data ?? [])
      .map((m) => ({
        kind: 'live' as const,
        id: m.id,
        image: (m.media_type === 'VIDEO' ? m.thumbnail_url : m.media_url) ?? '',
        caption: (m.caption ?? '').split('\n')[0].slice(0, 120),
        href: m.permalink,
        isVideo: m.media_type === 'VIDEO',
      }))
      .filter((m) => m.image);
    return items.length ? { items, live: true } : { items: CURATED.slice(0, limit), live: false };
  } catch (err) {
    console.error('[mithaiwallah] instagram feed failed, using curated tiles', err);
    return { items: CURATED.slice(0, limit), live: false };
  }
}
