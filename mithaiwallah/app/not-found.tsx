import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <PageShell>
      <section className="grid min-h-[70vh] place-items-center pt-32 text-center">
        <div className="container-luxe max-w-xl">
          <p className="eyebrow">Page not found</p>
          <h1 className="mt-5 font-display text-display-md font-semibold text-maroon">This box seems to be empty.</h1>
          <p className="mt-5 text-ink-soft">The page you were looking for has moved or never existed. The sweets, happily, are still here.</p>
          <div className="mt-9 flex justify-center gap-3">
            <Button href="/" variant="primary">Back to home</Button>
            <Button href="/sweets" variant="outline">Explore sweets</Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
