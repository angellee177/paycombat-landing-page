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

  // #region agent log
  fetch('http://127.0.0.1:7272/ingest/b6180842-bdf5-43f3-9eb9-1d3130ec3a35', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '92e393' },
    body: JSON.stringify({
      sessionId: '92e393',
      runId,
      hypothesisId: 'H1',
      location: 'src/app/(frontend)/page.tsx:27',
      message: 'Fetched landing page',
      data: {
        hasPage: Boolean(page),
        title: page?.title ?? null,
        layoutLength: Array.isArray(page?.layout) ? page.layout.length : 0,
        blockTypes: Array.isArray(page?.layout) ? page.layout.map((b: { blockType?: string }) => b?.blockType ?? null) : [],
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {})
  // #endregion

  if (!page) {
    // #region agent log
    fetch('http://127.0.0.1:7272/ingest/b6180842-bdf5-43f3-9eb9-1d3130ec3a35', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '92e393' },
      body: JSON.stringify({
        sessionId: '92e393',
        runId,
        hypothesisId: 'H2',
        location: 'src/app/(frontend)/page.tsx:47',
        message: 'Page not found branch hit',
        data: { slug: 'landing-page' },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion
    return <div>Page not found</div>
  }

  // #region agent log
  fetch('http://127.0.0.1:7272/ingest/b6180842-bdf5-43f3-9eb9-1d3130ec3a35', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '92e393' },
    body: JSON.stringify({
      sessionId: '92e393',
      runId,
      hypothesisId: 'H4',
      location: 'src/app/(frontend)/page.tsx:73',
      message: 'Rendering blocks markup',
      data: { returnShape: 'render-blocks', layoutLength: Array.isArray(page.layout) ? page.layout.length : 0 },
      timestamp: Date.now(),
    }),
  }).catch(() => {})
  // #endregion
  return (
    <RenderBlocks blocks={page.layout} />
  )
}
