import type { Block } from 'payload'

export const ProcessTimeline: Block = {
  slug: 'processTimeline',
  fields: [
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
