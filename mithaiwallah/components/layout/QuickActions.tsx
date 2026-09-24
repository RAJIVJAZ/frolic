import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { CONTACT } from '@/lib/business';

/**
 * Two entry points that follow the visitor everywhere:
 *  - desktop: a floating WhatsApp button, bottom right;
 *  - mobile: a three-button action bar (WhatsApp · Call · Get a quote),
 *    because on a phone the thumb zone is where decisions happen.
 * When no WhatsApp number is configured, the WhatsApp buttons route to the
 * enquiry form rather than opening a chat with nobody.
 */
export function QuickActions({ whatsappHref }: { whatsappHref: string }) {
  const external = whatsappHref.startsWith('http');
  return (
    <>
      <a
        href={whatsappHref}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label="Chat with Mithaiwallah on WhatsApp"
        className="group fixed bottom-6 right-6 z-40 hidden items-center gap-3 rounded-full bg-[#1F7A4D] py-3 pl-3 pr-5 text-white shadow-[0_18px_40px_-12px_rgba(31,122,77,0.7)] transition-all duration-500 ease-luxe hover:-translate-y-0.5 lg:flex"
      >
        <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15">
          <Icon name="whatsapp" className="h-6 w-6" />
        </span>
        <span className="text-sm font-semibold">Chat with us</span>
      </a>

      <nav
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-gold-300/40 bg-cream/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      >
        <a
          href={whatsappHref}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="flex flex-col items-center gap-1 py-2.5 text-[0.7rem] font-semibold text-[#1F7A4D]"
        >
          <Icon name="whatsapp" className="h-6 w-6" />
          WhatsApp
        </a>
        <a
          href={CONTACT.phone ? `tel:+${CONTACT.phone}` : '/contact'}
          className="flex flex-col items-center gap-1 border-x border-gold-300/30 py-2.5 text-[0.7rem] font-semibold text-maroon"
        >
          <Icon name="phone" className="h-6 w-6" />
          Call
        </a>
        <Link href="/contact#enquire" className="flex flex-col items-center gap-1 bg-maroon py-2.5 text-[0.7rem] font-semibold text-cream">
          <Icon name="gift" className="h-6 w-6" />
          Get a quote
        </Link>
      </nav>
    </>
  );
}
