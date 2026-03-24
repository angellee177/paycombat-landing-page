import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  fields: [
    {
      name: 'brandName',
      type: 'text',
      required: true,
      defaultValue: 'PayCombat',
      admin: {
        description:
          'Used as the header fallback (if no logo), image alt text, and in the footer.',
      },
    },
    {
      name: 'headerLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Header logo',
      admin: {
        description:
          'Horizontal logo for the header. Prefer SVG or transparent PNG under ~200 KB. Common sizes: 250×150, 350×75, or 400×100 px; on mobile aim ~160×40 display — upload 2×–3× for retina.',
      },
    },
    {
      name: 'headerLinks',
      type: 'array',
      label: 'Header Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            description: 'Optional external/custom URL. If empty and page selected, uses /{page.slug}.',
          },
        },
        {
          name: 'highlight',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'headerPrimaryCTA',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Get Started' },
        { name: 'url', type: 'text', defaultValue: '#' },
      ],
    },
    {
      name: 'headerSecondaryCTA',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Log In' },
        { name: 'url', type: 'text', defaultValue: '#' },
      ],
    },
    {
      name: 'footerDescription',
      type: 'textarea',
      defaultValue: '© 2026 PayCombat. All rights reserved. Built for the modern architect.',
    },
    {
      name: 'footerLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Privacy Policy', url: '#' },
        { label: 'Terms of Service', url: '#' },
        { label: 'Cookie Settings', url: '#' },
        { label: 'Security', url: '#' },
        { label: 'Status', url: '#' },
      ],
    },
  ],
}
