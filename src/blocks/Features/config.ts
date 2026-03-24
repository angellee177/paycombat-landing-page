import type { Block } from 'payload'

export const FeaturesBlock: Block = {
  slug: 'features',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Built for Precision.',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Material Symbols icon name, e.g. speed, shield_lock, api, public',
          },
        },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Emphasis', value: 'emphasis' },
            { label: 'Secondary', value: 'secondary' },
          ],
        },
      ],
    },
  ],
}