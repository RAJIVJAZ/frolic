import Link from 'next/link';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/** Every one of the ten customer types gets a door that opens onto the right page. */
const AUDIENCES: { icon: IconName; title: string; href: string; line: string }[] = [
  { icon: 'heart', title: 'Families & gift buyers', href: '/sweets', line: 'Boxes for home and the people you love' },
  { icon: 'building', title: 'Corporate clients', href: '/corporate-gifting', line: 'Branded employee & client gifting' },
  { icon: 'rings', title: 'Wedding planners', href: '/wedding-gifting', line: 'Hampers, return gifts, invitation boxes' },
  { icon: 'sparkle', title: 'Event organisers', href: '/wedding-gifting#enquire', line: 'Gifting for launches, conferences, galas' },
  { icon: 'chef', title: 'Hotels', href: '/wholesale#horeca', line: 'Buffet trays and turndown sweets' },
  { icon: 'store', title: 'Restaurants', href: '/wholesale#horeca', line: 'Dessert-menu supply, on schedule' },
  { icon: 'store', title: 'Sweet shops', href: '/wholesale#private-label', line: 'Wholesale and private label' },
  { icon: 'truck', title: 'Distributors', href: '/franchise#distributors', line: 'Territories across UP & MP' },
  { icon: 'globe', title: 'Export buyers', href: '/wholesale#export', line: 'Long-life sweets for overseas markets' },
  { icon: 'gift', title: 'Festive gifting', href: '/festive-hampers', line: 'Diwali, Rakhi, Holi and more' },
];

export function Audiences() {
  return (
    <section className="bg-cream-200/60 py-24 sm:py-28">
      <div className="container-luxe">
        <SectionHeading eyebrow="Who We Serve" title="However you celebrate, there is a door for you." />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {AUDIENCES.map((a, i) => (
            <Reveal key={a.title} delay={(i % 5) * 0.05} className="h-full">
              <Link
                href={a.href}
                className="group flex h-full flex-col rounded-2xl border border-gold-300/50 bg-cream-50 p-5 transition-all duration-500 ease-luxe hover:-translate-y-1 hover:border-maroon/30 hover:shadow-card"
              >
                <Icon name={a.icon} className="h-6 w-6 text-gold-700" />
                <h3 className="mt-4 font-display text-[1.3rem] font-semibold leading-tight text-maroon">{a.title}</h3>
                <p className="mt-1.5 text-[0.82rem] leading-snug text-ink-muted">{a.line}</p>
                <Icon name="arrow" className="mt-auto h-4 w-4 translate-y-2 pt-0 text-maroon opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
