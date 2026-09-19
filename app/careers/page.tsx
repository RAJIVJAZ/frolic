import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { buildMetadata } from '@/lib/seo';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = buildMetadata({
  title: 'Careers',
  description: 'Open roles at FROLIC across formulation, supply chain, growth and design. Based in Pune, hybrid.',
  path: '/careers',
});

const ROLES = [
  { title: 'Formulation Scientist', team: 'Product', location: 'Pune · On-site', type: 'Full time' },
  { title: 'Supply Chain Manager', team: 'Operations', location: 'Pune · On-site', type: 'Full time' },
  { title: 'Performance Marketing Lead', team: 'Growth', location: 'Remote (India)', type: 'Full time' },
  { title: 'Senior Product Designer', team: 'Design', location: 'Remote (India)', type: 'Full time' },
  { title: 'Trade Sales Executive — West', team: 'Sales', location: 'Mumbai · Field', type: 'Full time' },
];

export default function CareersPage() {
  return (
    <PageShell
      eyebrow="Careers"
      title="Come make soda properly."
      intro="Small team, real ownership, and a product you can hand to someone and watch them react to. We hire for judgement over pedigree."
      path="/careers"
    >
      <ul className="space-y-px overflow-hidden rounded-card bg-charcoal/10">
        {ROLES.map((role) => (
          <li key={role.title} className="bg-cream">
            <a
              href={`mailto:careers@frolic.in?subject=${encodeURIComponent(role.title)}`}
              className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-charcoal/[0.03]"
            >
              <span>
                <span className="block font-display text-step-1 font-bold">{role.title}</span>
                <span className="mt-1 block text-step--1 text-charcoal-muted">
                  {role.team} · {role.location}
                </span>
              </span>
              <Badge>{role.type}</Badge>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-charcoal-muted">
        Nothing that fits? Send what you have been working on to careers@frolic.in. We read all of
        it and reply to most of it.
      </p>
    </PageShell>
  );
}
