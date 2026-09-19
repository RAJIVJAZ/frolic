import type { Config } from 'tailwindcss';

/**
 * FROLIC Design System — Tailwind token layer.
 * Every colour, radius, shadow and type step used across the site resolves here,
 * so the whole brand can be re-tuned from one file.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ——— Brand primaries
        lime: {
          DEFAULT: '#B8F135',
          50: '#F5FDE3',
          100: '#EBFBC5',
          200: '#DCF89C',
          300: '#CDF56D',
          400: '#B8F135',
          500: '#9ED91C',
          600: '#7CAE14',
          700: '#5C8310',
          800: '#3E590B',
          900: '#233206',
        },
        tangerine: {
          DEFAULT: '#FF6A1A',
          50: '#FFF1E8',
          100: '#FFDFC9',
          200: '#FFC49A',
          300: '#FFA366',
          400: '#FF6A1A',
          500: '#E85206',
          600: '#BC4104',
          700: '#8E3103',
          800: '#5F2102',
          900: '#331101',
        },
        berry: {
          DEFAULT: '#6B2E8F',
          50: '#F4EAFA',
          100: '#E6D2F4',
          200: '#CCA6E8',
          300: '#AC74D6',
          400: '#8B47BC',
          500: '#6B2E8F',
          600: '#552573',
          700: '#3F1B56',
          800: '#2A1239',
          900: '#17091F',
        },
        sunshine: {
          DEFAULT: '#FFD029',
          50: '#FFFAE6',
          100: '#FFF3C2',
          200: '#FFE888',
          300: '#FFDC55',
          400: '#FFD029',
          500: '#EDB800',
          600: '#BD9200',
          700: '#8C6D00',
          800: '#5C4700',
          900: '#312600',
        },
        mint: {
          DEFAULT: '#3FD9A4',
          50: '#E8FCF5',
          100: '#C8F7E7',
          200: '#97EFD1',
          300: '#66E6BA',
          400: '#3FD9A4',
          500: '#22B686',
          600: '#1A8F69',
          700: '#13694D',
          800: '#0C4433',
          900: '#06251C',
        },
        // ——— Neutrals
        cream: '#FFFDF7',
        ivory: '#F6EFE2',
        sand: '#E7DCC8',
        charcoal: {
          DEFAULT: '#14110F',
          soft: '#2B2622',
          muted: '#5C544D',
          line: '#D9CFBD',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Fluid type scale — clamp(min, preferred, max)
        'step--1': ['clamp(0.82rem, 0.79rem + 0.15vw, 0.92rem)', { lineHeight: '1.5' }],
        'step-0': ['clamp(1rem, 0.96rem + 0.2vw, 1.12rem)', { lineHeight: '1.6' }],
        'step-1': ['clamp(1.2rem, 1.12rem + 0.4vw, 1.5rem)', { lineHeight: '1.45' }],
        'step-2': ['clamp(1.5rem, 1.35rem + 0.75vw, 2.1rem)', { lineHeight: '1.25' }],
        'step-3': ['clamp(1.9rem, 1.6rem + 1.45vw, 3rem)', { lineHeight: '1.1' }],
        'step-4': ['clamp(2.1rem, 1.7rem + 2vw, 3.4rem)', { lineHeight: '1.04' }],
        'step-5': ['clamp(2.6rem, 1.85rem + 3.7vw, 5rem)', { lineHeight: '0.98' }],
        'step-6': ['clamp(3rem, 1.9rem + 5.4vw, 6.4rem)', { lineHeight: '0.9' }],
      },
      borderRadius: {
        pill: '999px',
        card: '1.75rem',
        panel: '2.5rem',
      },
      boxShadow: {
        lift: '0 1px 2px rgba(20,17,15,0.06), 0 12px 32px -12px rgba(20,17,15,0.22)',
        float: '0 24px 60px -24px rgba(20,17,15,0.38)',
        glow: '0 0 0 1px rgba(255,253,247,0.6), 0 18px 48px -14px var(--glow-tint, rgba(184,241,53,0.55))',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.45)',
      },
      spacing: {
        section: 'clamp(4.5rem, 3rem + 7vw, 9rem)',
        gutter: 'clamp(1.25rem, 0.85rem + 2vw, 3rem)',
      },
      maxWidth: {
        shell: '88rem',
        prose: '38rem',
      },
      transitionTimingFunction: {
        frolic: 'cubic-bezier(0.22, 1, 0.36, 1)',
        elastic: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        rise: {
          '0%': { transform: 'translate3d(0,0,0) scale(0.6)', opacity: '0' },
          '12%': { opacity: '0.9' },
          '100%': { transform: 'translate3d(var(--drift, 12px), -120%, 0) scale(1.05)', opacity: '0' },
        },
        marquee: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(-3%) rotate(-1.5deg)' },
          '50%': { transform: 'translateY(3%) rotate(1.5deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-160% 0' },
          '100%': { backgroundPosition: '260% 0' },
        },
        wordIn: {
          from: { transform: 'translate3d(0, 110%, 0)' },
          to: { transform: 'translate3d(0, 0, 0)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
      animation: {
        rise: 'rise var(--rise-duration, 7s) linear infinite',
        marquee: 'marquee var(--marquee-duration, 38s) linear infinite',
        bob: 'bob 6s ease-in-out infinite',
        shimmer: 'shimmer 2.6s linear infinite',
        wordIn: 'wordIn 0.85s cubic-bezier(0.22, 1, 0.36, 1) backwards',
        pulseRing: 'pulseRing 2.4s ease-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
