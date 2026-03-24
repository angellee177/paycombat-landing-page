import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

type ListItem = {
  id?: string | null
  title?: string | null
  description?: string | null
  icon?: string | null
}

type GridItem = {
  id?: string | null
  type?: 'image' | 'text-solid' | 'text-outline' | null
  size?: 'square' | 'tall' | 'wide' | 'large' | null
  image?: number | Media | null
  imageAlt?: string | null
  label?: string | null
  backgroundColor?: 'primary' | 'secondary' | 'tertiary' | 'surface' | null
}

type SplitContentProps = {
  id?: string | null
  layout?: 'image-right' | 'image-left' | null
  layoutGrid?: '1' | '2' | '3' | '4' | null
  headline?: string | null
  description?: string | null
  contentType?: 'text' | 'list' | null
  listItems?: ListItem[] | null
  images?: GridItem[] | null
  image?: number | Media | null
  imageAlt?: string | null
}

export function SplitContentComponent({
  layout = 'image-right',
  layoutGrid = '2',
  headline,
  description,
  contentType = 'text',
  listItems,
  images,
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
  const gridCols = Number(layoutGrid || 2)
  const gridClassMap: Record<number, string> = {
    1: 'grid grid-cols-1 gap-4',
    2: 'grid grid-cols-2 gap-4',
    3: 'grid grid-cols-3 gap-4',
    4: 'grid grid-cols-4 gap-4',
  }
  const gridClass = gridClassMap[Math.min(Math.max(gridCols, 1), 4)] || gridClassMap[2]

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

            {description ? (
              <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed max-w-xl">
                {description}
              </p>
            ) : null}

            {contentType === 'list' && listItems?.length ? (
              <div className="space-y-6">
                {listItems.map((item, index) => (
                  <div key={item.id ?? `list-item-${index}`} className="flex gap-4">
                    <span className="material-symbols-outlined text-primary text-3xl flex-shrink-0 mt-1">
                      {item.icon || 'check_circle'}
                    </span>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-on-surface">
                        {item.title}
                      </h3>
                      <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 w-full">
            {images && images.length > 0 ? (
              <div className={gridClass}>
                {images.map((item, idx) => {
                  const itemSize = item.size || 'square'
                  const sizeClasses: Record<'square' | 'tall' | 'wide' | 'large', string> = {
                    square: 'col-span-1 row-span-1',
                    tall: 'col-span-1 row-span-2',
                    wide: 'col-span-2 row-span-1',
                    large: 'col-span-2 row-span-2',
                  }
                  const itemSizeClass = sizeClasses[itemSize]

                  if (item.type === 'image') {
                    const tileData = typeof item.image === 'object' ? item.image : null
                    const tileUrl = tileData?.url || ''
                    const tileAlt = item.imageAlt || tileData?.alt || 'Content section image'
                    const tileWidth = tileData?.width || 600
                    const tileHeight = tileData?.height || 600

                    return (
                      <div key={item.id ?? `tile-${idx}`} className={`${itemSizeClass} relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300`}>
                        {tileUrl ? (
                          <Image
                            src={tileUrl}
                            alt={tileAlt}
                            width={tileWidth}
                            height={tileHeight}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-surface-container-lowest flex items-center justify-center">
                            <span className="text-on-surface-variant">No image</span>
                          </div>
                        )}
                      </div>
                    )
                  }

                  const bgColor = item.backgroundColor || 'primary'
                  const isOutline = item.type === 'text-outline'
                  const colorMap: Record<'primary' | 'secondary' | 'tertiary' | 'surface', string> = {
                    primary: 'bg-primary text-on-primary',
                    secondary: 'bg-secondary-container text-on-secondary-container',
                    tertiary: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
                    surface: 'bg-surface-container text-on-surface',
                  }
                  const cardClass = isOutline ? 'border-2 border-primary text-primary bg-transparent' : colorMap[bgColor]

                  return (
                    <div key={item.id ?? `tile-${idx}`} className={`${itemSizeClass} rounded-3xl p-6 md:p-8 flex items-center justify-center ${cardClass} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                      <span className={`text-xl md:text-2xl font-bold text-center ${itemSize === 'tall' || itemSize === 'large' ? 'text-3xl md:text-4xl' : ''}`}>
                        {item.label || 'Label'}
                      </span>
                    </div>
                  )
                })}
              </div>
            ) : imageUrl ? (
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
