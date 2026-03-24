import type { Block } from 'payload'

export const HowItWorksBlock: Block = {
  slug: 'howItWorks',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'The Digital Architecture of Flow.',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'steps',
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
          name: 'label',
          type: 'text',
          admin: {
            description: 'Optional short label, e.g. Step 01',
          },
        },
      ],
    },
  ],
}