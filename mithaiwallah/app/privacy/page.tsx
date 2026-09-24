import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/sections/PageHero';
import { BRAND, CONTACT } from '@/lib/business';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Privacy Notice',
  description: 'How Mithaiwallah collects, uses and protects the personal data you share through our enquiry forms.',
  path: '/privacy',
});

/**
 * Written to the Digital Personal Data Protection Act, 2023: a plain notice of
 * what is collected, why, for how long, and how to withdraw consent. Have it
 * reviewed by counsel before launch — this is a starting draft, not advice.
 */
export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Privacy" title="Privacy notice." crumbs={[{ name: 'Privacy', path: '/privacy' }]} intro="Plainly: what we collect when you enquire, why, and what you can ask us to do with it." />
      <section className="py-20">
        <div className="container-luxe prose-luxe max-w-3xl">
          <h2>What we collect</h2>
          <p>
            When you send an enquiry we collect the details you type in — your name, mobile number, email, city, company and
            the specifics of your order — along with the page you enquired from and, where present, the campaign link that
            brought you to the site.
          </p>
          <h2>Why we collect it</h2>
          <ul>
            <li>To respond to your enquiry by phone, WhatsApp or email, and to prepare a quote.</li>
            <li>To fulfil and deliver an order you place with us.</li>
            <li>Only if you tick the separate box: to send you festive collections and early-booking offers.</li>
          </ul>
          <h2>Who sees it</h2>
          <p>
            Our sales and gifting team, and the service providers that store and route enquiries for us (our database host
            and our customer-relationship software). We do not sell or rent your data to anyone.
          </p>
          <h2>How long we keep it</h2>
          <p>
            Enquiries that do not become orders are deleted after 24 months. Order records are kept for as long as tax and
            accounting law requires.
          </p>
          <h2>Your rights</h2>
          <p>
            You can ask to see, correct or delete your data, or withdraw consent for marketing at any time — every marketing
            message includes a way to opt out. Write to{' '}
            {CONTACT.email ? <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> : 'us'} and we will act within 30 days.
          </p>
          <h2>Contact</h2>
          <p>
            {BRAND.legalName}, {CONTACT.locality}, {CONTACT.region}, India.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
