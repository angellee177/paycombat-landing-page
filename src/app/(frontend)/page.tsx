import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import { RenderBlocks } from '@/components/RenderBlocks'
import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const runId = `run-${Date.now()}`
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  await payload.auth({ headers })

  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'landing-page' },
    },
  })

  if (!page) {
    return <div>Page not found</div>
  }

  return (
    <RenderBlocks blocks={page.layout} />
  )
}
