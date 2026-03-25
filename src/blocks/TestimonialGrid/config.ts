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
