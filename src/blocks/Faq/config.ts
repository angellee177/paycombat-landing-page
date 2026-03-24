import type { Block } from 'payload'

export const FaqBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ',
    plural: 'FAQ',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Frequently Asked Questions',
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional intro shown under the headline.',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Questions',
      minRows: 1,
      defaultValue: [
        {
          question: "How secure are Paycombat's payment solutions?",
          answer:
            'We use industry-standard encryption, PCI-DSS aligned practices, and advanced fraud monitoring so every transaction is protected end-to-end.',
        },
        {
          question: 'How long does integration typically take?',
          answer:
            'Many teams complete a first integration in a few days. Timeline depends on your stack and checkout flows; our APIs and docs are built to get you live quickly.',
        },
        {
          question: 'What types of payments can we accept with Paycombat?',
          answer:
            'Accept major cards (e.g. Visa, Mastercard), e-wallets, and other methods supported in your region—so customers can pay the way they prefer.',
        },
        {
          question: 'How does pricing work?',
          answer:
            'Pricing is tailored to your business volume and needs. Contact us for a custom quote that matches your transaction profile.',
        },
        {
          question: 'What kind of customer support does Paycombat offer?',
          answer:
            'You get responsive support for onboarding, integration, and day-to-day operations so your team is never stuck when it matters.',
        },
      ],
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
