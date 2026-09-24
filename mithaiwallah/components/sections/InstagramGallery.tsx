import Image from 'next/image';
import { GiftBoxArt } from '@/components/art/GiftBoxArt';
import { SweetArt } from '@/components/art/SweetArt';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SOCIAL } from '@/lib/business';
import { getInstagramFeed } from '@/lib/instagram';

export async function InstagramGallery() {
  const { items } = await getInstagramFeed(6);
  return (
    <section id="instagram" className="bg-cream-200/60 py-24 sm:py-28">
      <div className="container-luxe">
        <SectionHeading
          eyebrow={`@${SOCIAL.instagramHandle}`}
          title="From our kitchen to your feed."
          intro="Slow-motion milk, hand-cut barfi, and the boxes leaving for weddings and offices across India."
        />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <a
                href={item.href || SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-2xl"
                style={item.kind === 'curated' ? { background: item.tone } : undefined}
              >
                {item.kind === 'live' ? (
                  <Image
                    src={item.image}
                    alt={item.caption || 'Mithaiwallah on Instagram'}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-1000 ease-luxe group-hover:scale-105"
                  />
                ) : item.art === 'box' ? (
                  <GiftBoxArt variant="open" tone="maroon" className="absolute inset-0 h-full w-full p-2" />
                ) : (
                  <SweetArt variant={item.art} className="absolute inset-x-0 bottom-3 w-full scale-110 transition-transform duration-1000 ease-luxe group-hover:scale-[1.18]" />
                )}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-maroon-900/85 via-maroon-900/10 to-transparent p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p className="text-[0.78rem] leading-snug text-cream">{item.caption}</p>
                </div>
                <Icon name="instagram" className="absolute right-3 top-3 h-5 w-5 text-maroon/50 transition group-hover:text-cream" />
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Button href={SOCIAL.instagram} variant="outline" iconLeft="instagram" external>
            Follow @{SOCIAL.instagramHandle}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
