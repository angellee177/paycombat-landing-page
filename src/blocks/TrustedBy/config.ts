import type { Block } from 'payload'

export const TrustedByBlock: Block = {
  slug: 'trustedBy',
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Trusted by industry leaders' },
    {
      name: 'brands',
      type: 'array',
      fields: [{ name: 'name', type: 'text', required: true }],
      minRows: 1,
    },
  ],
}