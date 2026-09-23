import { ButtonLink, Arrow } from '@/components/ui/Button';
import { products } from '@/lib/products';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="shell grid min-h-[60svh] place-items-center py-section">
      <div className="max-w-xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-step-5">This flavour does not exist. Yet.</h1>
        <p className="mt-5 text-step-1 text-charcoal-muted">
          The page you were after has moved or never existed. Here are ten flavour concepts that do.
        </p>

        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {products.map((p) => (
            <li key={p.handle}>
              <Link
                href={`/flavours/${p.handle}`}
                className="chip transition hover:border-charcoal/40 hover:bg-cream"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: p.world.base }}
                  aria-hidden
                />
                {p.shortName}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/waitlist" size="lg">
            Join the waitlist <Arrow />
          </ButtonLink>
          <ButtonLink href="/" variant="outline" size="lg">
            Back home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
