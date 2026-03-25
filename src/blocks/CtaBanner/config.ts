import type { Block } from 'payload'

export const CtaBannerBlock: Block = {
  slug: 'ctaBanner',
  fields: [
    {
      name: 'background',
      type: 'select',
      label: 'Background Style',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Black', value: 'black' },
      ],
      defaultValue: 'primary',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Ready to combat the status quo?',
    },
    {
      name: 'highlight',
      type: 'group',
      label: 'Highlight Text',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Highlight',
        },
        {
          name: 'color',
          type: 'select',
          label: 'Highlight Color',
          options: [
            { label: 'White', value: 'white' },
            { label: 'Purple', value: 'purple' },
          ],
          defaultValue: 'purple',
        },
      ],
      admin: {
        description: 'Optional: Highlight part of the title with a color.',
      },
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
        {
          name: 'style',
          type: 'select',
          label: 'Button Style',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: "Black n' white", value: 'blackWhite' },
          ],
          defaultValue: 'primary',
          required: false,
        },
      ],
    },
  ],
}
