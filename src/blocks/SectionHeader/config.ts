import type { Block } from 'payload'

export const SectionHeaderBlock: Block = {
  slug: 'sectionHeader',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Section Title',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'lg',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
    },
    {
      name: 'showDivider',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
