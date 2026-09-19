import { defineType, defineField } from 'sanity';

/**
 * Review — mirrored from Postgres for moderation, not authored here.
 * Editors can publish, reject or feature; they cannot edit the body.
 */
export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({ name: 'externalId', type: 'string', readOnly: true }),
    defineField({ name: 'displayName', type: 'string', readOnly: true }),
    defineField({ name: 'city', type: 'string', readOnly: true }),
    defineField({ name: 'rating', type: 'number', readOnly: true, validation: (r) => r.min(1).max(5) }),
    defineField({ name: 'title', type: 'string', readOnly: true }),
    defineField({ name: 'body', type: 'text', rows: 5, readOnly: true }),
    defineField({ name: 'flavour', type: 'reference', to: [{ type: 'flavour' }], readOnly: true }),
    defineField({ name: 'verified', type: 'boolean', readOnly: true, description: 'Set from the Shopify order. Never editable.' }),
    defineField({
      name: 'status',
      type: 'string',
      options: { list: ['pending', 'published', 'rejected'], layout: 'radio' },
      initialValue: 'pending',
    }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false, description: 'Surfaces on the homepage and PDP.' }),
  ],
  preview: { select: { title: 'title', subtitle: 'displayName' } },
});
