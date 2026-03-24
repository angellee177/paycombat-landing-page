import type { Block } from 'payload'

export const CtaBannerBlock: Block = {
  slug: 'ctaBanner',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Ready to combat the status quo?',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'button',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'Start Your Journey',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          defaultValue: '#',
        },
      ],
    },
  ],
}