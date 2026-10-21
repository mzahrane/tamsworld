import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt', 'updatedAt'],
    group: 'Editorial',
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { status: { equals: 'published' } }
    },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  versions: { drafts: { autosave: { interval: 1500 } }, maxPerDoc: 50 },
  fields: [
    { name: 'title', type: 'text', required: true, maxLength: 120 },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'dek', type: 'textarea', required: true, maxLength: 240, admin: { description: 'Editorial standfirst shown under the title.' } },
    { name: 'excerpt', type: 'textarea', required: true, maxLength: 300 },
    { name: 'author', type: 'relationship', relationTo: 'users', required: true },
    { name: 'category', type: 'relationship', relationTo: 'categories', required: true },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'body', type: 'richText', required: true },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'readingTimeMinutes', type: 'number', min: 1, admin: { readOnly: true } },
    { name: 'publishedAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'seo', type: 'group', fields: [
      { name: 'title', type: 'text', maxLength: 60 },
      { name: 'description', type: 'textarea', maxLength: 160 },
      { name: 'noIndex', type: 'checkbox', defaultValue: false },
    ] },
  ],
  timestamps: true,
}
