import type { Block } from 'payload'

export const SplitContentBlock: Block = {
  slug: 'splitContent',
  fields: [
    {
      name: 'layout',
      type: 'select',
      required: true,
      defaultValue: 'image-right',
      options: [
        { label: 'Image on Right', value: 'image-right' },
        { label: 'Image on Left', value: 'image-left' },
      ],
    },
    {
      name: 'layoutGrid',
      label: 'Layout Grid',
      type: 'select',
      required: true,
      defaultValue: '2',
      options: [
        { label: '1 column', value: '1' },
        { label: '2 columns', value: '2' },
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
      ],
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Split Content Section',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'contentType',
      type: 'select',
      required: true,
      defaultValue: 'text',
      options: [
        { label: 'Text', value: 'text' },
        { label: 'List', value: 'list' },
      ],
    },
    {
      name: 'listItems',
      type: 'array',
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
          defaultValue: 'check_circle',
        },
      ],
    },
    {
      name: 'images',
      label: 'Image/Text Tiles',
      type: 'array',
      minRows: 1,
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
          defaultValue: 'Content image',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
          },
        },
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
