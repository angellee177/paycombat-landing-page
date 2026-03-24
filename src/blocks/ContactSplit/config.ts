import type { Block } from 'payload'

export const ContactSplitBlock: Block = {
  slug: 'contactSplit',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Get in Touch',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'formTitle',
      type: 'text',
      defaultValue: 'Send us a message',
    },
    {
      name: 'formFields',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Form field name attribute',
          },
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'text',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Telephone', value: 'tel' },
          ],
        },
        {
          name: 'placeholder',
          type: 'text',
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'fullWidth',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Span full width (use for last field or textarea)',
          },
        },
      ],
    },
    {
      name: 'submitButtonLabel',
      type: 'text',
      defaultValue: 'Send Message',
    },
    {
      name: 'infoCards',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
          defaultValue: 'mail',
          admin: {
            description: 'Material Symbols icon name',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Can include line breaks or multiple lines (e.g., phone numbers)',
          },
        },
      ],
    },
    {
      name: 'highlightCard',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show a highlighted info card (e.g., Business Hours)',
          },
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Business Hours',
        },
        {
          name: 'icon',
          type: 'text',
          defaultValue: 'schedule',
          admin: {
            description: 'Material Symbols icon name',
          },
        },
        {
          name: 'items',
          type: 'array',
          minRows: 0,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'isClosed',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
