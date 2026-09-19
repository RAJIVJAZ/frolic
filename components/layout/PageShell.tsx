import type { ReactNode } from 'react';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/seo';

/**
 * Shared shell for the editorial and policy pages — keeps the heading rhythm,
 * measure and breadcrumb schema identical across all of them.
 */
export function PageShell({
  eyebrow,
  title,
  intro,
  path,
  children,
  wide = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  path: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: title, path },
        ])}
      />
      <section className="shell py-section">
        <div className={wide ? '' : 'mx-auto max-w-3xl'}>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-step-5">{title}</h1>
          {intro && <p className="mt-6 text-step-1 text-charcoal-muted">{intro}</p>}
          <div className="mt-12">{children}</div>
        </div>
      </section>
    </>
  );
}

/** Long-form prose block with consistent vertical rhythm. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6 leading-relaxed text-charcoal-soft [&_h2]:mt-12 [&_h2]:text-step-2 [&_h3]:mt-8 [&_h3]:text-step-1 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
      {children}
    </div>
  );
}
