import type { Block } from 'payload'

export const ProcessTimelineBlock: Block = {
  slug: 'processTimeline',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      required: true,
      defaultValue: 'Our Process',
      admin: {
        width: '50%',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Section Subtitle',
      required: true,
      defaultValue: 'The Precision Methodology',
      admin: {
        width: '50%',
      },
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 2,
      maxRows: 5,
      required: true,
      fields: [
        {
          name: 'number',
          type: 'text',
          label: 'Step Number',
          required: true,
          admin: {
            width: '20%',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            width: '40%',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            width: '40%',
          },
        },
      ],
    },
  ],
}
