import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

type ListItem = {
  id?: string | null
  text?: string | null
  icon?: string | null
}

type SplitContentProps = {
  id?: string | null
  layout?: 'image-right' | 'image-left' | null
  headline?: string | null
  description?: string | null
  contentType?: 'text' | 'list' | null
  listItems?: ListItem[] | null
  image?: number | Media | null
  imageAlt?: string | null
}

export function SplitContentComponent({
  layout = 'image-right',
  headline,
  description,
  contentType = 'text',
  listItems,
  image,
  imageAlt,
}: SplitContentProps) {
  if (!headline && !description) return null

  const imageData = typeof image === 'object' ? image : null
  const imageUrl = imageData?.url || ''
  const alt = imageAlt || imageData?.alt || 'Content section image'
  const imageWidth = imageData?.width || 600
  const imageHeight = imageData?.height || 600
  const layoutDir = layout || 'image-right'

  const containerClass =
    layoutDir === 'image-right'
      ? 'flex flex-col lg:flex-row items-center gap-12 md:gap-16'
      : 'flex flex-col lg:flex-row-reverse items-center gap-12 md:gap-16'

  const textSectionClass = 'lg:w-1/2 space-y-6'

  return (
    <section className="py-20 md:py-28 px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className={containerClass}>
          {/* Text Content */}
          <div className={textSectionClass}>
            {headline ? (
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface leading-[1.1]">
                {headline}
              </h2>
            ) : null}

            {description && contentType === 'text' ? (
              <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed max-w-xl">
                {description}
              </p>
            ) : null}

            {contentType === 'list' && listItems?.length ? (
              <ul className="space-y-4 md:space-y-5">
                {listItems.map((item, index) => (
                  <li key={item.id ?? `list-item-${index}`} className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary text-2xl flex-shrink-0 mt-1">
                      {item.icon || 'check_circle'}
                    </span>
                    <span className="text-on-surface-variant font-medium text-base md:text-lg leading-relaxed">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 w-full">
            {imageUrl ? (
              <div className="relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src={imageUrl}
                  alt={alt}
                  width={imageWidth}
                  height={imageHeight}
                  className="w-full h-auto"
                />
              </div>
            ) : (
              <div className="w-full aspect-square bg-surface-container-lowest rounded-3xl flex items-center justify-center">
                <span className="text-on-surface-variant">No image</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
