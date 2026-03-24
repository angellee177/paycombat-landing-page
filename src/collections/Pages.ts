import type { CollectionConfig } from 'payload'
import { pageBlocks } from '@/blocks'

const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: pageBlocks,
    },
  ],
}

export default Pages