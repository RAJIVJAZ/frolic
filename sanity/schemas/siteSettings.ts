import { defineType, defineField } from 'sanity';

/** Singleton. Everything an editor should be able to change without a deploy. */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'announcements',
      title: 'Announcement bar',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Rotating marquee items. Keep each under 40 characters.',
      validation: (r) => r.required().min(2),
    }),
    defineField({ name: 'freeShippingThreshold', type: 'number', initialValue: 999, description: 'In rupees. Also drives the cart progress bar.' }),
    defineField({ name: 'flatShippingRate', type: 'number', initialValue: 79 }),
    defineField({ name: 'subscriptionDiscount', type: 'number', initialValue: 0.2, description: 'Fraction, e.g. 0.2 for 20%.', validation: (r) => r.min(0).max(0.5) }),
    defineField({ name: 'pressMentions', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'instagramHandle', type: 'string', initialValue: '@drinkfrolic' }),
    defineField({ name: 'supportEmail', type: 'string', initialValue: 'hello@frolic.in' }),
    defineField({
      name: 'legalDisclaimer',
      type: 'text',
      rows: 4,
      description: 'Appears in the footer of every page. Changes require compliance sign-off.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
