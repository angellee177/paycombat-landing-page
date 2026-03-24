import type { Block } from 'payload'

export const ProfileGridBlock: Block = {
  slug: 'profileGrid',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Our Team',
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
      name: 'profiles',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'bio',
          type: 'textarea',
        },
      ],
    },
  ],
}
