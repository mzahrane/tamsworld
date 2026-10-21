import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: { mimeTypes: ['image/*'], imageSizes: [{ name: 'card', width: 720, height: 480, position: 'centre' }, { name: 'hero', width: 1600, height: 1000, position: 'centre' }] },
  admin: { useAsTitle: 'alt', group: 'Editorial' },
  access: { read: () => true, create: ({ req }) => Boolean(req.user), update: ({ req }) => Boolean(req.user), delete: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'alt', type: 'text', required: true, admin: { description: 'Describe the image for accessibility; do not use keyword stuffing.' } },
    { name: 'caption', type: 'text' },
    { name: 'credit', type: 'text' },
  ],
}
