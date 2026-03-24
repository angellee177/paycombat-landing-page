import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'split',
      options: [
        { label: 'Split (text + media)', value: 'split' },
        { label: 'Centered', value: 'centered' },
        { label: 'Text Only', value: 'text-only' },
        { label: 'Media Left', value: 'media-left' },
      ],
    },
    {
      name: 'eyebrow',
      type: 'group',
      fields: [
        { name: 'text', type: 'text' },
        { name: 'icon', type: 'text', defaultValue: 'verified' },
        { name: 'filled', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      name: 'headline',
      type: 'group',
      fields: [
        { name: 'prefix', type: 'text', required: true },
        { name: 'highlight', type: 'text' },
        { name: 'suffix', type: 'text' },
      ],
    },
    { name: 'description', type: 'textarea' },
    {
      name: 'actions',
      type: 'array',
      label: 'Buttons',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'page', type: 'relationship', relationTo: 'pages' },
        { name: 'url', type: 'text' },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Ghost', value: 'ghost' },
          ],
        },
      ],
    },
    {
      name: 'media',
      type: 'group',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'altOverride', type: 'text' },
        { name: 'showDecor', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      name: 'spacing',
      type: 'group',
      fields: [
        {
          name: 'top',
          type: 'select',
          defaultValue: 'md',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
        {
          name: 'bottom',
          type: 'select',
          defaultValue: 'lg',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
      ],
    },

    // Backward compatibility fields for existing entries
    { name: 'eyebrowLegacy', type: 'text', admin: { hidden: true } },
    { name: 'title', type: 'text', admin: { hidden: true } },
    { name: 'highlightText', type: 'text', admin: { hidden: true } },
    {
      name: 'primaryCTA',
      type: 'group',
      admin: { condition: () => false },
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'secondaryCTA',
      type: 'group',
      admin: { condition: () => false },
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media', admin: { hidden: true } },
  ],
}