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
          name: 'text',
          type: 'text',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imageAlt',
      type: 'text',
      defaultValue: 'Content image',
    },
  ],
}
