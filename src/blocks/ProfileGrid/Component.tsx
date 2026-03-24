import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

type Profile = {
  id?: string | null
  name?: string | null
  role?: string | null
  image?: number | Media | null
  bio?: string | null
}

type ProfileGridProps = {
  id?: string | null
  title?: string | null
  description?: string | null
  columns?: '2' | '3' | '4' | null
  profiles?: Profile[] | null
}

const columnClasses: Record<'2' | '3' | '4', string> = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-3',
  '4': 'md:grid-cols-2 lg:grid-cols-4',
}

export function ProfileGridComponent({
  title,
  description,
  columns = '3',
  profiles,
}: ProfileGridProps) {
  if (!title && !description && (!profiles || profiles.length === 0)) return null

  const colClass = columns || '3'
  const gridClass = `grid grid-cols-1 ${columnClasses[colClass]} gap-8 md:gap-10`

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

        {profiles?.length ? (
          <div className={gridClass}>
            {profiles.map((profile, index) => {
              const imageData = typeof profile.image === 'object' ? profile.image : null
              const imageUrl = imageData?.url || ''
              const imageAlt = imageData?.alt || profile.name || 'Profile'
              const imageWidth = imageData?.width || 400
              const imageHeight = imageData?.height || 400

              return (
                <div
                  key={profile.id ?? profile.name ?? `profile-${index}`}
                  className="group flex flex-col h-full"
                >
                  <div className="relative rounded-2xl overflow-hidden mb-6 bg-surface-container-lowest aspect-square">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={imageAlt}
                        width={imageWidth}
                        height={imageHeight}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-surface-container">
                        <span className="text-on-surface-variant">No image</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    {profile.name ? (
                      <h3 className="text-xl md:text-2xl font-bold text-on-surface mb-2">
                        {profile.name}
                      </h3>
                    ) : null}

                    {profile.role ? (
                      <p className="text-primary font-semibold text-sm md:text-base mb-4">
                        {profile.role}
                      </p>
                    ) : null}

                    {profile.bio ? (
                      <p className="text-on-surface-variant font-medium leading-relaxed text-base">
                        {profile.bio}
                      </p>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}
