import type { Block } from 'payload'

export const ActionBannerBlock: Block = {
  slug: 'actionBanner',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Ready to Take Action?',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary (Blue)', value: 'primary' },
        { label: 'Secondary (Bold)', value: 'secondary' },
        { label: 'Gradient', value: 'gradient' },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          defaultValue: '#',
        },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'solid',
          options: [
            { label: 'Solid', value: 'solid' },
            { label: 'Outline', value: 'outline' },
          ],
        },
      ],
    },
  ],
}
