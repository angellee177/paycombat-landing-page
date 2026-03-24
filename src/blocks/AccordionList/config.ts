import type { Block } from 'payload'

export const AccordionListBlock: Block = {
  slug: 'accordionList',
  fields: [
    {
      name: 'id',
      type: 'text',
      admin: {
        description: 'HTML id for anchor linking (e.g., "accordion"). Used for /page#accordion URLs.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'List',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'showSearch',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Display search bar above the list',
      },
    },
    {
      name: 'searchPlaceholder',
      type: 'text',
      defaultValue: 'Search...',
      admin: {
        condition: (data) => data?.showSearch === true,
      },
    },
    {
      name: 'groups',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Category name (e.g., Engineering, Product, Support)',
          },
        },
        {
          name: 'items',
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'subtitle',
              type: 'textarea',
              admin: {
                description: 'Secondary text or description',
              },
            },
            {
              name: 'tags',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., "Remote", "Full-time", "New York"',
                  },
                },
                {
                  name: 'icon',
                  type: 'text',
                  defaultValue: 'location_on',
                  admin: {
                    description: 'Material Symbols icon name',
                  },
                },
              ],
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                description: 'Link to details page',
              },
            },
            {
              name: 'actionLabel',
              type: 'text',
              defaultValue: 'View Details',
            },
          ],
        },
      ],
    },
  ],
}
