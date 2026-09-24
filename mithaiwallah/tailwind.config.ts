import type { Config } from 'tailwindcss';

/**
 * Mithaiwallah design tokens.
 *
 * Three colours carry the brand: cream (the ground), maroon (authority) and
 * gold (celebration). Everything else is a tint of those three. Contrast
 * rules — which gold may carry small text and which may not — are recorded in
 * docs/01-brand-guidelines.md; the short version is that small gold text on
 * cream must be gold-700 or darker.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FBF6EC',
          50: '#FFFDF8',
          100: '#FBF6EC',
          200: '#F4EAD6',
          300: '#EADBBE',
          400: '#DCC69E',
        },
        maroon: {
          DEFAULT: '#6B1024',
          50: '#FBEEF0',
          100: '#F3D3D9',
          200: '#E2A2AE',
          300: '#C9677C',
          400: '#A1344F',
          500: '#841935',
          600: '#6B1024',
          700: '#530B1B',
          800: '#3C0813',
          900: '#26050C',
        },
        gold: {
          DEFAULT: '#B8893B',
          50: '#FBF5E8',
          100: '#F4E6C4',
          200: '#E9CF94',
          300: '#D9B872',
          400: '#C89F52',
          500: '#B8893B',
          600: '#9A712E',
          700: '#7A5823',
          800: '#5A4119',
          900: '#3A2A10',
        },
        ink: {
          DEFAULT: '#2B1A14',
          soft: '#5C4638',
          muted: '#7D6757',
        },
        pista: '#8FA35A',
        saffron: '#E8A33D',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        hindi: ['var(--font-hindi)', 'var(--font-display)', 'serif'],
      },
      fontSize: {
        eyebrow: ['0.72rem', { lineHeight: '1', letterSpacing: '0.28em' }],
        'display-sm': ['clamp(2rem, 4vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(2.4rem, 5.2vw, 3.75rem)', { lineHeight: '1.04', letterSpacing: '-0.015em' }],
        'display-lg': ['clamp(2.9rem, 7.4vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        luxe: '0 40px 80px -40px rgba(58, 20, 10, 0.45)',
        card: '0 1px 0 rgba(122, 88, 35, 0.12), 0 18px 40px -24px rgba(58, 20, 10, 0.35)',
        glow: '0 0 0 1px rgba(217, 184, 114, 0.35), 0 20px 60px -20px rgba(184, 137, 59, 0.45)',
      },
      borderRadius: {
        arch: '999px 999px 1.25rem 1.25rem',
      },
      backgroundImage: {
        'gold-foil':
          'linear-gradient(115deg, #7A5823 0%, #C89F52 22%, #F4E6C4 42%, #C89F52 58%, #9A712E 78%, #D9B872 100%)',
        'maroon-velvet':
          'radial-gradient(120% 90% at 50% 0%, #841935 0%, #6B1024 38%, #3C0813 100%)',
      },
      keyframes: {
        sheen: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        drift: {
          '0%': { transform: 'translate3d(0, 0, 0)', opacity: '0' },
          '15%': { opacity: '1' },
          '85%': { opacity: '1' },
          '100%': { transform: 'translate3d(var(--dx, 20px), -120px, 0)', opacity: '0' },
        },
        kenburns: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '100%': { transform: 'scale(1.06) rotate(-1.5deg)' },
        },
        sweep: {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)' },
          '60%, 100%': { transform: 'translateX(220%) skewX(-18deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        sheen: 'sheen 6s linear infinite',
        drift: 'drift var(--dur, 9s) ease-in-out infinite',
        kenburns: 'kenburns 18s ease-in-out infinite alternate',
        sweep: 'sweep 7s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
