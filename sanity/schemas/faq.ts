import { defineType, defineField } from 'sanity';

/** Rendered on /faq and emitted as FAQPage schema. Order matters. */
export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', type: 'string', validation: (r) => r.required().max(140) }),
    defineField({
      name: 'answer',
      type: 'text',
      rows: 4,
      description: 'Answer it in the first sentence. Google truncates the rest.',
      validation: (r) => r.required().max(700),
    }),
    defineField({
      name: 'surfaces',
      title: 'Show on',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['home', 'faq', 'science', 'subscribe', 'shipping'], layout: 'grid' },
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: 'order', type: 'number', validation: (r) => r.required() }),
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'question' } },
});
