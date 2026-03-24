import type { GlobalConfig } from 'payload'

export const ContactUsSettings: GlobalConfig = {
  slug: 'contact-us-settings',
  label: 'Contact Us Settings',
  fields: [
    {
      name: 'contactFormRecipient',
      type: 'email',
      label: 'Contact Form Recipient Email',
      required: true,
      defaultValue: 'admin@example.com',
      admin: {
        description: 'All contact form submissions will be sent to this address.',
      },
    },
  ],
}
