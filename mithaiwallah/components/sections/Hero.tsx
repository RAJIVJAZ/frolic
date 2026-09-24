import { HeroPlatter } from '@/components/art/SweetArt';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { BRAND } from '@/lib/business';

/** Deterministic "random" so server and client render the same particles. */
const DUST = Array.from({ length: 22 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return {
    left: `${6 + r(1) * 88}%`,
    top: `${30 + r(2) * 60}%`,
    size: 2 + r(3) * 3.5,
    dur: `${7 + r(4) * 8}s`,
    delay: `${-r(5) * 12}s`,
    dx: `${-30 + r(6) * 60}px`,
  };
});

const TRUST = ['Pure milk solids', 'Premium dry fruits', 'Custom branding', 'Pan-India delivery'];

export function Hero() {
  const video = BRAND.heroVideo;
  return (
    <section className="relative isolate overflow-hidden bg-maroon-velvet text-cream">
      <div className="jaali-light pointer-events-none absolute inset-0 opacity-70" />
      {video && (
        <>
          <video
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            src={video.src}
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-maroon-900/70 via-maroon-900/40 to-maroon-900/90" />
        </>
      )}

      <div className="container-luxe relative flex min-h-[100svh] flex-col items-center pb-10 pt-40 text-center sm:pt-44">
        <span className="eyebrow-light">
          Handcrafted in {BRAND.city}
          <span className="hidden sm:inline"> · {BRAND.region}</span>
        </span>
        <h1 className="mt-7 font-display text-display-lg font-semibold text-balance">
          <span className="block">Handcrafted Traditions.</span>
          <span className="text-foil block animate-sheen italic">Crafted for Celebrations.</span>
        </h1>
        <p className="mt-7 max-w-2xl text-[1.08rem] leading-relaxed text-cream/75 text-pretty sm:text-lg">
          Premium Indian sweets, corporate gifting solutions and customised wedding hampers — made with purity and passion.
        </p>
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Button href="/sweets" variant="gold" size="lg" icon="arrow" className="w-full sm:w-auto">
            Explore Collection
          </Button>
          <Button href="/contact?type=corporate#enquire" variant="outline-light" size="lg" iconLeft="gift" className="w-full sm:w-auto">
            Request Custom Gift Box
          </Button>
        </div>

        {!video && (
          <div className="relative mt-10 w-[128%] max-w-5xl flex-1 sm:mt-6 sm:w-full">
            {/* Spotlight + halo under the thali */}
            <div className="pointer-events-none absolute left-1/2 top-[8%] h-[80%] w-[80%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(244,230,196,0.35),rgba(244,230,196,0))]" />
            <div className="relative will-change-transform motion-safe:animate-kenburns">
              <HeroPlatter className="relative mx-auto w-full drop-shadow-[0_40px_60px_rgba(20,4,8,0.55)]" />
              {/* Light sweep */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(closest-side,black,transparent)]">
                <div className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/20 to-transparent motion-safe:animate-sweep" />
              </div>
            </div>
            {/* Gold dust */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              {DUST.map((d, i) => (
                <span
                  key={i}
                  className="absolute rounded-full bg-gold-200 motion-safe:animate-drift"
                  style={
                    {
                      left: d.left,
                      top: d.top,
                      width: d.size,
                      height: d.size,
                      boxShadow: '0 0 8px 2px rgba(233,207,148,0.6)',
                      animationDelay: d.delay,
                      '--dur': d.dur,
                      '--dx': d.dx,
                      opacity: 0.8,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          </div>
        )}

        <ul className="relative mt-8 grid w-full max-w-4xl grid-cols-2 gap-x-4 gap-y-3 text-[0.82rem] text-cream/80 sm:flex sm:justify-center sm:gap-8">
          {TRUST.map((t) => (
            <li key={t} className="flex items-center justify-center gap-2">
              <Icon name="check" className="h-4 w-4 text-gold-300" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
