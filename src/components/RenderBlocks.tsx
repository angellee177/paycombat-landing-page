import React from 'react'
import { blockComponentMap } from '@/blocks'
import type { Page } from '@/payload-types'

type LayoutBlock = NonNullable<Page['layout']>[number]

function getFallbackBlockKey(block: LayoutBlock): string {
  if ('title' in block && typeof block.title === 'string' && block.title.length > 0) {
    return `${block.blockType}-${block.title}`
  }

  if ('headline' in block && typeof block.headline === 'string' && block.headline.length > 0) {
    return `${block.blockType}-${block.headline}`
  }

  return block.blockType ?? 'block'
}

export function RenderBlocks({ blocks }: { blocks: Page['layout'] }) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block) => {
        const stableKey = block?.id ?? getFallbackBlockKey(block)
        const BlockComponent = blockComponentMap[block.blockType]
        if (!BlockComponent) return null
        return <BlockComponent key={stableKey} {...block} />
      })}
    </>
  )
}