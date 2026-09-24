import { whatsappLink } from '@/lib/business';
import { Announcement } from './Announcement';
import { Footer } from './Footer';
import { Nav } from './Nav';
import { QuickActions } from './QuickActions';
import { AttributionCapture } from './Attribution';

export function PageShell({ children, overDark = false }: { children: React.ReactNode; overDark?: boolean }) {
  const wa =
    whatsappLink('Hello Mithaiwallah, I would like to know more about your sweets and gift boxes.') ??
    '/contact#enquire';
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-maroon focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>
      <Nav overDark={overDark} whatsappHref={wa} banner={<Announcement />} />
      <main id="main">{children}</main>
      <Footer />
      <QuickActions whatsappHref={wa} />
      <AttributionCapture />
    </>
  );
}
