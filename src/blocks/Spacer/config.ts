import type { Block } from 'payload'

export const SpacerBlock: Block = {
  slug: 'spacer',
  fields: [
    {
      name: 'height',
      type: 'select',
      required: true,
      defaultValue: 'md',
      options: [
        { label: 'Extra Small (32px)', value: 'xs' },
        { label: 'Small (48px)', value: 'sm' },
        { label: 'Medium (64px)', value: 'md' },
        { label: 'Large (96px)', value: 'lg' },
        { label: 'Extra Large (128px)', value: 'xl' },
        { label: 'XXL (160px)', value: '2xl' },
      ],
    },
  ],
}
