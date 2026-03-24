import { getPayload } from 'payload'
import React from 'react'

import { RenderBlocks } from '@/components/RenderBlocks'
import config from '@/payload.config'

type SlugPageProps = {
  params: Promise<{ slug: string }>
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
    },
  })

  if (!page) {
    return <div>Page not found</div>
  }

  return <RenderBlocks blocks={page.layout} />
}
