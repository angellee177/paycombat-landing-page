import type { Block } from 'payload'

export const FeatureGridBlock: Block = {
  slug: 'featureGrid',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Key Features',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
    {
      name: 'features',
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
          name: 'icon',
          type: 'text',
          defaultValue: 'star',
          admin: {
            description: 'Material Symbols icon name',
          },
        },
        {
          name: 'backgroundColor',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Tertiary', value: 'tertiary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Surface', value: 'surface' },
          ],
        },
      ],
    },
  ],
}
