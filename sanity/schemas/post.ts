import { defineType, defineField } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Journal post',
  type: 'document',
  fields: [
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', maxLength: 80 }, validation: (r) => r.required() }),
    defineField({ name: 'title', type: 'string', validation: (r) => r.required().max(90) }),
    defineField({ name: 'excerpt', type: 'text', rows: 3, validation: (r) => r.required().max(320) }),
    defineField({
      name: 'category',
      type: 'string',
      options: { list: ['Gut health', 'Flavour', 'Behind the can', 'Recipes'] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'targetKeyword',
      title: 'Target keyword',
      type: 'string',
      description: 'The cluster this post is built to rank for. Every post needs one — see docs/11-seo-strategy.md.',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'publishedAt', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'readingMinutes', type: 'number', validation: (r) => r.required().min(1) }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{
        type: 'object',
        name: 'section',
        fields: [
          defineField({ name: 'h', title: 'Heading', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'p', title: 'Paragraphs', type: 'array', of: [{ type: 'text', rows: 4 }], validation: (r) => r.required().min(1) }),
        ],
        preview: { select: { title: 'h' } },
      }],
      validation: (r) => r.required().min(2),
    }),
    defineField({ name: 'relatedFlavours', type: 'array', of: [{ type: 'reference', to: [{ type: 'flavour' }] }] }),
    defineField({ name: 'ogImage', type: 'image', options: { hotspot: true } }),
  ],
  orderings: [{ title: 'Newest', name: 'newest', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'category' } },
});
