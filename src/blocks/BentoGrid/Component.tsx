import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

type BentoItem = {
  id?: string | null
  type?: 'image' | 'text-solid' | 'text-outline' | null
  size?: 'square' | 'tall' | 'wide' | 'large' | null
  image?: number | Media | null
  imageAlt?: string | null
  label?: string | null
  backgroundColor?: 'primary' | 'secondary' | 'tertiary' | 'surface' | null
}

type BentoGridProps = {
  id?: string | null
  title?: string | null
  description?: string | null
  items?: BentoItem[] | null
}

const sizeClasses: Record<'square' | 'tall' | 'wide' | 'large', string> = {
  square: 'col-span-1 row-span-1',
  tall: 'col-span-1 row-span-2',
  wide: 'col-span-2 row-span-1',
  large: 'col-span-2 row-span-2',
}

const colorMap: Record<'primary' | 'secondary' | 'tertiary' | 'surface', string> = {
  primary: 'bg-primary text-on-primary',
  secondary: 'bg-secondary-container text-on-secondary-container',
  tertiary: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  surface: 'bg-surface-container text-on-surface',
}

export function BentoGridComponent({
  title,
  description,
  items,
}: BentoGridProps) {
  if (!title && !description && (!items || items.length === 0)) return null

  const validItems = items || []

  return (
    <section className="py-20 md:py-28 px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        {(title || description) && (
          <div className="text-center mb-16 md:mb-20 space-y-4">
            {title ? (
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="text-lg md:text-xl text-on-surface-variant max-w-3xl mx-auto font-medium">
                {description}
              </p>
            ) : null}
          </div>
        )}

        {validItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] md:auto-rows-[300px] gap-4 md:gap-6">
            {validItems.map((item, index) => {
              const sizeClass = sizeClasses[item.size || 'square']
              const itemKey = item.id ?? `bento-item-${index}`

              if (item.type === 'image') {
                const imageData = typeof item.image === 'object' ? item.image : null
                const imageUrl = imageData?.url || ''
                const alt = item.imageAlt || imageData?.alt || 'Gallery item'
                const imageWidth = imageData?.width || 500
                const imageHeight = imageData?.height || 500

                return (
                  <div
                    key={itemKey}
                    className={`${sizeClass} rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-surface-container`}
                  >
                    {imageUrl ? (
                      <Image
                        alt={alt}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        height={imageHeight}
                        src={imageUrl}
                        width={imageWidth}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-surface-container-lowest">
                        <span className="text-on-surface-variant text-center text-sm px-4">
                          No image
                        </span>
                      </div>
                    )}
                  </div>
                )
              }

              // Text Card (solid or outline)
              const bgColor = item.backgroundColor || 'primary'
              const isOutline = item.type === 'text-outline'
              const cardClass = isOutline
                ? `border-2 border-primary text-primary`
                : colorMap[bgColor]

              return (
                <div
                  key={itemKey}
                  className={`${sizeClass} rounded-2xl p-6 md:p-8 flex items-end justify-start ${cardClass} shadow-lg hover:shadow-xl transition-shadow duration-300`}
                >
                  <span className={`text-xl md:text-2xl font-bold leading-tight ${
                    item.size === 'tall' || item.size === 'large'
                      ? 'text-3xl md:text-4xl'
                      : ''
                  }`}>
                    {item.label || 'Label'}
                  </span>
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}
