import { ImageResponse } from 'next/og';
import { BRAND } from './business';

export const OG_SIZE = { width: 1200, height: 630 };

/** The shared social card. Satori cannot run SVG filters, so it is typographic. */
export function ogCard({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 80,
          background: 'radial-gradient(120% 90% at 50% 0%, #841935 0%, #6B1024 40%, #3C0813 100%)',
          color: '#FBF6EC',
          fontFamily: 'serif',
        }}
      >
        <div style={{ position: 'absolute', top: 28, left: 28, right: 28, bottom: 28, border: '2px solid rgba(217,184,114,0.55)', borderRadius: 24, display: 'flex' }} />
        <div style={{ fontSize: 26, letterSpacing: 10, color: '#D9B872', textTransform: 'uppercase', display: 'flex' }}>{eyebrow}</div>
        <div style={{ fontSize: title.length > 30 ? 76 : 112, lineHeight: 1.05, marginTop: 24, display: 'flex' }}>{title}</div>
        <div style={{ fontSize: 36, marginTop: 22, color: '#E9CF94', display: 'flex' }}>{subtitle}</div>
        <div style={{ position: 'absolute', bottom: 60, fontSize: 24, color: 'rgba(251,246,236,0.7)', letterSpacing: 4, display: 'flex' }}>
          {BRAND.name.toUpperCase()} · {BRAND.city.toUpperCase()}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
