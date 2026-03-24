import type { CollectionConfig } from 'payload'

export const Messages: CollectionConfig = {
  slug: 'messages',
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['from', 'email', 'subject', 'message', 'resolved', 'createdAt'],
    group: 'Content',
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
      admin: { position: 'sidebar' },
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
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
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
  ],
  timestamps: true,
}
