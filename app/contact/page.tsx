import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { buildMetadata } from '@/lib/seo';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us',
  description: 'Questions about an order, a subscription, wholesale or anything else. A human replies within one working day.',
  path: '/contact',
});

const CHANNELS = [
  { label: 'General & orders', value: 'hello@frolic.in', note: 'Replies within one working day' },
  { label: 'Wholesale & stockists', value: 'trade@frolic.in', note: 'Minimum order 10 cases' },
  { label: 'Press & partnerships', value: 'press@frolic.in', note: 'Media kit available on request' },
  { label: 'Phone', value: '+91 20 4890 1200', note: 'Mon–Sat, 10am–6pm IST' },
];

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Talk to a person."
      intro="No ticket numbers, no chatbot loop. Email the right address below or use the form and someone on the team picks it up."
      path="/contact"
    >
      <div className="grid gap-10 sm:grid-cols-2">
        <dl className="space-y-px overflow-hidden rounded-card bg-charcoal/10">
          {CHANNELS.map((c) => (
            <div key={c.label} className="bg-cream px-5 py-4">
              <dt className="eyebrow">{c.label}</dt>
              <dd className="mt-1.5 font-semibold">{c.value}</dd>
              <dd className="mt-0.5 text-step--1 text-charcoal-muted">{c.note}</dd>
            </div>
          ))}
        </dl>

        <form className="space-y-4" aria-label="Contact form">
          <div>
            <label htmlFor="name" className="eyebrow mb-2 block">Your name</label>
            <input id="name" name="name" required autoComplete="name"
              className="min-h-[3rem] w-full rounded-card border-2 border-charcoal/12 bg-cream px-4 focus:border-charcoal focus:outline-none" />
          </div>
          <div>
            <label htmlFor="email" className="eyebrow mb-2 block">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email"
              className="min-h-[3rem] w-full rounded-card border-2 border-charcoal/12 bg-cream px-4 focus:border-charcoal focus:outline-none" />
          </div>
          <div>
            <label htmlFor="topic" className="eyebrow mb-2 block">What is this about?</label>
            <select id="topic" name="topic"
              className="min-h-[3rem] w-full rounded-card border-2 border-charcoal/12 bg-cream px-4 focus:border-charcoal focus:outline-none">
              <option>An order</option>
              <option>My subscription</option>
              <option>Wholesale</option>
              <option>Something else</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="eyebrow mb-2 block">Message</label>
            <textarea id="message" name="message" rows={5} required
              className="w-full rounded-card border-2 border-charcoal/12 bg-cream p-4 focus:border-charcoal focus:outline-none" />
          </div>
          <Button type="submit" size="lg" className="w-full">Send message</Button>
          <p className="text-[0.72rem] text-charcoal-muted">
            We use what you send here only to answer you. See our privacy policy.
          </p>
        </form>
      </div>
    </PageShell>
  );
}
