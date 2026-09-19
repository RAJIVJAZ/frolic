import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { buildMetadata } from '@/lib/seo';
import { Button, ButtonLink, Arrow } from '@/components/ui/Button';

export const metadata: Metadata = buildMetadata({
  title: 'Your Account',
  description: 'Sign in to manage your subscription, swap flavours, check your Fizz balance and track orders.',
  path: '/account',
});

// Account pages are per-visitor and excluded from indexing in robots.ts.
export default function AccountPage() {
  return (
    <PageShell
      eyebrow="Account"
      title="Sign in."
      intro="Manage your subscription, swap flavours, track a delivery or check your Fizz balance."
      path="/account"
    >
      <form className="max-w-md space-y-4" aria-label="Sign in">
        <div>
          <label htmlFor="acc-email" className="eyebrow mb-2 block">Email</label>
          <input
            id="acc-email"
            type="email"
            required
            autoComplete="email"
            className="min-h-[3rem] w-full rounded-card border-2 border-charcoal/12 bg-cream px-4 focus:border-charcoal focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="acc-password" className="eyebrow mb-2 block">Password</label>
          <input
            id="acc-password"
            type="password"
            required
            autoComplete="current-password"
            className="min-h-[3rem] w-full rounded-card border-2 border-charcoal/12 bg-cream px-4 focus:border-charcoal focus:outline-none"
          />
        </div>
        <Button type="submit" size="lg" className="w-full">Sign in</Button>
        <p className="text-step--1 text-charcoal-muted">
          New here? Your account is created automatically with your first order.
        </p>
      </form>

      <div className="mt-12 rounded-card border border-charcoal-line p-7">
        <h2 className="text-step-2">Nothing to sign in to yet?</h2>
        <p className="mt-2 text-charcoal-muted">Start with a 6-can pack and see which one sticks.</p>
        <div className="mt-5">
          <ButtonLink href="/shop" variant="outline">Browse flavours <Arrow /></ButtonLink>
        </div>
      </div>
    </PageShell>
  );
}
