import type { CollectionConfig } from 'payload'

export const Messages: CollectionConfig = {
  slug: 'messages',
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['from', 'email', 'subject', 'message', 'resolved', 'createdAt'],
    group: 'Content',
    components: {
      views: {
        edit: {
          default: {
            Component: '@/app/(payload)/admin/MessageDetailView#MessageDetailView',
          },
        },
      },
    },
  },
  access: {
    read: ({ req: { user } }) => Boolean(user), // Only authenticated users can read
    update: ({ req: { user } }) => !!user && user.roles?.includes('admin'), // Only admin can update (mark as resolved)
    delete: ({ req: { user } }) => !!user && user.roles?.includes('admin'),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'from',
      type: 'text',
      label: 'From',
      admin: { readOnly: true },
      virtual: true,
      hooks: {
        afterRead: [({ siblingData }) => `${siblingData.name || ''}`.trim()],
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'resolved',
      type: 'checkbox',
      label: 'Resolved',
      defaultValue: false,
      admin: { position: 'sidebar' },
      access: {
        update: ({ req: { user } }) => !!user && user.roles?.includes('admin'),
      },
    },
    {
      name: 'replies',
      type: 'array',
      admin: {
        hidden: true,
      },
      fields: [
        {
          name: 'senderName',
          type: 'text',
        },
        {
          name: 'senderEmail',
          type: 'email',
        },
        {
          name: 'role',
          type: 'select',
          options: ['admin', 'user'],
          required: true,
        },
        {
          name: 'body',
          type: 'textarea',
          required: true,
        },
        {
          name: 'privateNote',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'sentAt',
          type: 'date',
          required: true,
        },
      ],
    },
  ],
  timestamps: true,
}
