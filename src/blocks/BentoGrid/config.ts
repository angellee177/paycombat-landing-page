import type { Block } from 'payload'

export const BentoGridBlock: Block = {
  slug: 'bentoGrid',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Gallery',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 2,
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'image',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'Text Card (Solid)', value: 'text-solid' },
            { label: 'Text Card (Outline)', value: 'text-outline' },
          ],
        },
        {
          name: 'size',
          type: 'select',
          required: true,
          defaultValue: 'square',
          options: [
            { label: 'Square (1x1)', value: 'square' },
            { label: 'Tall (1x2)', value: 'tall' },
            { label: 'Wide (2x1)', value: 'wide' },
            { label: 'Large (2x2)', value: 'large' },
          ],
        },
        // Image fields
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
          },
        },
        {
          name: 'imageAlt',
          type: 'text',
          defaultValue: 'Gallery item',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
          },
        },
        // Text card fields
        {
          name: 'label',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'text-solid' || siblingData?.type === 'text-outline',
          },
        },
        {
          name: 'backgroundColor',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary (Blue)', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Tertiary', value: 'tertiary' },
            { label: 'Surface', value: 'surface' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'text-solid',
          },
        },
      ],
    },
  ],
}
