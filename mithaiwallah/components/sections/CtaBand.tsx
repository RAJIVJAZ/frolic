import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { whatsappLink } from '@/lib/business';

export function CtaBand({
  title = 'Planning a celebration? Let’s make it unforgettable.',
  body = 'Tell us the occasion and the numbers — we will come back with an assortment, a box and a quote within one working day.',
  primary = { href: '/contact#enquire', label: 'Request a custom gift box' },
}: {
  title?: string;
  body?: string;
  primary?: { href: string; label: string };
}) {
  const wa = whatsappLink('Hello Mithaiwallah, I would like to plan an order.');
  return (
    <section className="py-16 sm:py-20">
      <div className="container-luxe">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-maroon-velvet px-8 py-16 text-center text-cream shadow-luxe sm:px-16">
          <div className="jaali-light pointer-events-none absolute inset-0" />
          <h2 className="relative mx-auto max-w-3xl font-display text-display-sm font-semibold text-balance">{title}</h2>
          <p className="relative mx-auto mt-5 max-w-2xl text-cream/75">{body}</p>
          <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={primary.href} variant="gold" icon="arrow" size="lg">
              {primary.label}
            </Button>
            {wa && (
              <Button href={wa} variant="outline-light" iconLeft="whatsapp" size="lg" external>
                Chat on WhatsApp
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
