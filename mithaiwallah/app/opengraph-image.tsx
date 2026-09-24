import { BRAND } from '@/lib/business';
import { OG_SIZE, ogCard } from '@/lib/og';

export const alt = `${BRAND.name} — ${BRAND.tagline}`;
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OpengraphImage() {
  return ogCard({
    eyebrow: 'Premium Indian Sweets · Corporate & Wedding Gifting',
    title: BRAND.name,
    subtitle: BRAND.tagline,
  });
}
