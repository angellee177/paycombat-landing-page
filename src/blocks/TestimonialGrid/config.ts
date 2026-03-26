import type { Block } from 'payload'

export const TestimonialGridBlock: Block = {
  slug: 'testimonialGrid',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      required: false,
      admin: {
        width: '50%',
      },
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Columns',
      required: true,
      defaultValue: '3',
      options: [
        { label: '2 columns', value: '2' },
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
        { label: '6 columns', value: '6' },
      ],
      admin: {
        width: '50%',
      },
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      minRows: 1,
      maxRows: 6,
      required: true,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: 'Testimonial Quote',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          label: 'Client Name',
          required: true,
        },
        {
          name: 'company',
          type: 'text',
          label: 'Company',
          required: true,
        },
        {
          name: 'initials',
          type: 'text',
          label: 'Avatar Initials',
          required: false,
        },
      ],
    },
  ],
}
