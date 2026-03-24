import React from 'react'

type Feature = {
  id?: string | null
  title?: string | null
  description?: string | null
  icon?: string | null
  backgroundColor?: 'primary' | 'tertiary' | 'secondary' | 'surface' | null
}

type FeatureGridProps = {
  id?: string | null
  title?: string | null
  description?: string | null
  columns?: '2' | '3' | '4' | null
  features?: Feature[] | null
}

const columnClasses: Record<'2' | '3' | '4', string> = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-3',
  '4': 'md:grid-cols-2 lg:grid-cols-4',
}

const bgColorMap: Record<'primary' | 'tertiary' | 'secondary' | 'surface', string> = {
  primary: 'bg-primary-fixed text-primary',
  tertiary: 'bg-tertiary-fixed text-tertiary',
  secondary: 'bg-secondary-fixed text-secondary',
  surface: 'bg-surface-container text-on-surface',
}

export function FeatureGridComponent({
  title,
  description,
  columns = '3',
  features,
}: FeatureGridProps) {
  if (!title && !description && (!features || features.length === 0)) return null

  const colClass = columns || '3'
  const gridClass = `grid grid-cols-1 ${columnClasses[colClass]} gap-6 md:gap-8`

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

        {features?.length ? (
          <div className={gridClass}>
            {features.map((feature, index) => {
              const bgColor = feature.backgroundColor || 'primary'
              const iconName = feature.icon || 'star'

              return (
                <div
                  key={feature.id ?? feature.title ?? `feature-${index}`}
                  className="bg-surface-container-lowest rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${bgColorMap[bgColor]}`}
                  >
                    <span className="material-symbols-outlined text-3xl">{iconName}</span>
                  </div>

                  {feature.title ? (
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-on-surface">
                      {feature.title}
                    </h3>
                  ) : null}

                  {feature.description ? (
                    <p className="text-on-surface-variant font-medium leading-relaxed text-base md:text-lg">
                      {feature.description}
                    </p>
                  ) : null}
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}
