import type { Block } from 'payload'

export const CategoryCardBlock: Block = {
  slug: 'categoryCard',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Specialized Knowledge Domains',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      required: false,
      defaultValue: 'Expertise Categories',
      admin: {
        description: 'Small label above the title, e.g. EXPERTISE CATEGORIES',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Categories',
      required: true,
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: false,
          admin: {
            description:
              'Material Symbols icon name (e.g. account_balance_wallet), check https://fonts.google.com/icons for options',
          },
        },
        {
          name: 'watermark',
          type: 'text',
          required: false,
          admin: {
            description:
              'Material Symbols icon name for watermark (e.g. account_balance_wallet), check https://fonts.google.com/icons for options',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'features',
          type: 'array',
          label: 'Features',
          required: true,
          fields: [
            {
              name: 'feature',
              type: 'text',
              label: 'Feature',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
