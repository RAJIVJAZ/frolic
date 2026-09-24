/**
 * A small hand-drawn icon set — 24px grid, 1.5 stroke — so the site carries
 * no icon library. Brand glyphs (WhatsApp, Instagram…) are simplified marks.
 */

const PATHS = {
  arrow: 'M5 12h14M13 6l6 6-6 6',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  close: 'M6 6l12 12M18 6L6 18',
  menu: 'M4 7h16M4 12h16M4 17h10',
  phone:
    'M5 4h3.2l1.6 4.2-2 1.3a11 11 0 0 0 6.7 6.7l1.3-2 4.2 1.6V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z',
  mail: 'M3.5 6.5h17v11h-17zM3.8 7l8.2 6.2L20.2 7',
  pin: 'M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21zM12 12.3a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7.5V12l3 2',
  leaf: 'M5 19c0-8 5-13.5 14-14-.5 9-6 14-14 14zM5 19l7-7',
  shield: 'M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6L12 3zM8.8 12l2.2 2.2 4.2-4.4',
  sparkle: 'M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3zM19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z',
  truck: 'M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3.2v2.8h-7M6.5 18.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6zM17 18.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z',
  boxes: 'M3.5 12.5h7v7h-7zM13.5 12.5h7v7h-7zM8.5 4.5h7v7h-7z',
  factory: 'M3 20.5V10l5 3V10l5 3V10l5 3V4.5h3v16H3zM7 17h2M11 17h2M15 17h2',
  gift: 'M4 10.5h16v10H4zM3 7h18v3.5H3zM12 7v13.5M12 7c-1.5-3.5-6-3.6-6-1.2C6 7 9 7 12 7zm0 0c1.5-3.5 6-3.6 6-1.2C18 7 15 7 12 7z',
  rings: 'M9 20a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM15 20a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM10 5.5L12 3l2 2.5',
  building: 'M4.5 20.5v-16h10v16M14.5 9.5h5v11M3 20.5h18M8 8h3M8 11.5h3M8 15h3',
  chef: 'M7 14.5V20h10v-5.5M7 14.5a4 4 0 0 1-.8-7.9A5 5 0 0 1 12 3.5a5 5 0 0 1 5.8 3.1 4 4 0 0 1-.8 7.9H7zM7 17.5h10',
  store: 'M4 9.5L5.5 4h13L20 9.5M4 9.5c0 1.4 1.1 2.5 2.7 2.5s2.6-1.1 2.6-2.5c0 1.4 1.1 2.5 2.7 2.5s2.7-1.1 2.7-2.5c0 1.4 1 2.5 2.6 2.5S20 10.9 20 9.5M5.5 12v8.5h13V12M10 20.5v-5h4v5',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3z',
  handshake: 'M2.5 11.5l4-4 4 2 3-2 4 1 4 3M6.5 7.5l-4 4 5.5 5.5 2-1.5 2 2 2-1.5 2 1 3.5-4.5M10.5 9.5l-2.5 2.5c.8 1 2.2 1 3 .2l1.5-1.2',
  heart: 'M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z',
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5M16 4.3a3.5 3.5 0 0 1 0 6.4M18 14.8c1.9.8 3.1 2.6 3.5 5.2',
  flask: 'M9.5 3.5h5M10.5 3.5v6L5 19a1.3 1.3 0 0 0 1.1 2h11.8A1.3 1.3 0 0 0 19 19l-5.5-9.5v-6M7.5 15h9',
  hand: 'M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 11V4a1.5 1.5 0 0 1 3 0v7M14 11V5.5a1.5 1.5 0 0 1 3 0V14c0 4-2.5 7-6.5 7-2.7 0-4.3-1.5-5.6-3.7L3.4 14.8a1.4 1.4 0 0 1 2.2-1.7L8 15.5',
  flame: 'M12 21c3.9 0 6.5-2.6 6.5-6.2 0-3.9-3-6-4.4-9.8-.4-1-1.7-1.1-2.2-.2-.9 1.8-.9 3.9-2.4 5.1-.7-.7-1-1.6-1.2-2.5-.2-.8-1.2-1-1.6-.3C5.9 9.1 5.5 11.2 5.5 14.8 5.5 18.4 8.1 21 12 21z',
  star: 'M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8L12 3.5z',
  download: 'M12 4v11M7 10.5l5 5 5-5M4.5 19.5h15',
  quote: 'M9.5 7.5C6.5 8.5 5 10.8 5 14v2.5h4.5V12H7c.2-1.7 1.2-2.9 3-3.6l-.5-.9zM18.5 7.5c-3 1-4.5 3.3-4.5 6.5v2.5h4.5V12H16c.2-1.7 1.2-2.9 3-3.6l-.5-.9z',
  plus: 'M12 5v14M5 12h14',
  chevron: 'M9 6l6 6-6 6',
} as const;

export type IconName = keyof typeof PATHS | 'whatsapp' | 'instagram' | 'facebook' | 'youtube';

export function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  if (name === 'whatsapp') {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
        <path d="M12 2.5a9.4 9.4 0 0 0-8.1 14.2L2.6 21.5l4.9-1.3A9.4 9.4 0 1 0 12 2.5zm0 17.2a7.8 7.8 0 0 1-4-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A7.8 7.8 0 1 1 12 19.7zm4.3-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.4 6.4 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.3z" />
      </svg>
    );
  }
  if (name === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
        <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z" />
      </svg>
    );
  }
  if (name === 'youtube') {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
        <path d="M21.2 7.6a2.5 2.5 0 0 0-1.8-1.8C17.9 5.4 12 5.4 12 5.4s-5.9 0-7.4.4a2.5 2.5 0 0 0-1.8 1.8C2.4 9.1 2.4 12 2.4 12s0 2.9.4 4.4a2.5 2.5 0 0 0 1.8 1.8c1.5.4 7.4.4 7.4.4s5.9 0 7.4-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.5.4-4.4.4-4.4s0-2.9-.4-4.4zM10.1 14.9V9.1l5 2.9-5 2.9z" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
