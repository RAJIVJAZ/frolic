import { Marquee } from '@/components/ui/Marquee';

export function Announcement() {
  return (
    <div className="bg-charcoal py-2.5 text-cream">
      <Marquee
        speed={44}
        items={[
          'In development — launching 2027',
          'Join the waitlist for early access',
          'Prebiotic fibre · low sugar · no caffeine',
          'Built in Prayagraj, India',
          'Early taster applications open',
        ]}
        itemClassName="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.2em]"
        separator="✳"
      />
    </div>
  );
}
