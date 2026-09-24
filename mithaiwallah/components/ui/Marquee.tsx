const WORDS = [
  'Milk Cake',
  'Kalakand',
  'Malai Barfi',
  'Peda',
  'Kunda',
  'Bikaneri Cake',
  'Corporate Gifting',
  'Wedding Hampers',
  'Festive Boxes',
  'Private Label',
];

export function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="relative overflow-hidden border-y border-gold-300/40 bg-cream-50 py-5" aria-hidden>
      <div className="flex w-max motion-safe:animate-marquee">
        {row.map((w, i) => (
          <span key={i} className="flex items-center whitespace-nowrap px-6 font-display text-2xl italic text-maroon/80">
            {w}
            <span className="ml-12 text-base not-italic text-gold-500">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
