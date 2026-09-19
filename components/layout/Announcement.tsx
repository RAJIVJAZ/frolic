import { Marquee } from '@/components/ui/Marquee';

export function Announcement() {
  return (
    <div className="bg-charcoal py-2.5 text-cream">
      <Marquee
        speed={44}
        items={[
          'Free shipping over ₹999',
          '7g prebiotic fibre in every can',
          'Subscribe & save 20%',
          '10 flavours, 0 mg caffeine',
          'Shipping across India',
        ]}
        itemClassName="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.2em]"
        separator="✳"
      />
    </div>
  );
}
