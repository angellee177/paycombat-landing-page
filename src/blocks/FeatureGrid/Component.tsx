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
  columns?: '2' | '3' | '4' | '6' | null
  features?: Feature[] | null
}

const columnClasses: Record<'2' | '3' | '4' | '6', string> = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-3',
  '4': 'md:grid-cols-2 lg:grid-cols-4',
  '6': 'md:grid-cols-3', // Always 3 columns per row for 6 features
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
  // Use tighter gap for 6 columns
  const gridClass =
    colClass === '6'
      ? `grid grid-cols-1 ${columnClasses[colClass]} gap-3 md:gap-4 items-stretch`
      : `grid grid-cols-1 ${columnClasses[colClass]} gap-6 md:gap-8 items-stretch`

  return (
    <section className="py-20 md:py-28 px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        {(title || description) && (
          <div className="text-center mb-16 md:mb-20 space-y-4">
            {title ? (
              <>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                  {title}
                </h2>
                {/* Underline below title */}
                <div className="w-20 h-1 bg-primary mx-auto mt-4" />
              </>
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

              // Unified hover style for all columns and icon alignment
              const isCompact = colClass === '6'
              const cardPadding = isCompact ? 'p-4 md:p-5' : 'p-8 md:p-10'
              // Stronger shadow and blue border on hover for all columns
              const hoverShadow =
                colClass === '2' || colClass === '3' || colClass === '4' || colClass === '6'
                  ? 'hover:shadow-[0_8px_32px_0_rgba(46,71,209,0.18)] hover:border-[#2E47D1]/60'
                  : 'hover:shadow-[0_4px_24px_0_rgba(46,71,209,0.10)] hover:border-[#2E47D1]/40'
              const cardClass = [
                'flex flex-col justify-center items-center h-full min-h-[240px] bg-white rounded-2xl border border-black/10',
                'shadow-[0_2px_12px_0_rgba(16,30,54,0.04)]',
                'transition-all duration-300',
                'group',
                hoverShadow,
                cardPadding,
              ].join(' ')
              // Icon size and margin: 6 columns matches 4 columns
              const iconSize =
                colClass === '6' || colClass === '4'
                  ? 'w-14 h-14 mb-6'
                  : colClass === '2'
                    ? 'w-16 h-16 mb-6'
                    : 'w-14 h-14 mb-6'
              const iconFont =
                colClass === '6' || colClass === '4'
                  ? 'text-3xl'
                  : colClass === '2'
                    ? 'text-4xl'
                    : 'text-3xl'
              // Icon hover style for all columns
              const iconBg = [
                iconSize,
                'rounded-xl flex items-center justify-center',
                'bg-[#e7ebf7] text-[#2E47D1]',
                'transition-all duration-300',
                'group-hover:bg-[#2E47D1]',
                'group-hover:text-white',
                'shadow-none group-hover:shadow-[0_4px_24px_0_rgba(46,71,209,0.10)]',
              ].join(' ')
              const iconSpan = `material-symbols-outlined ${iconFont}`
              const titleClass = [
                isCompact ? 'text-lg mb-2' : 'text-xl md:text-2xl mb-3',
                'font-bold text-[#191c1d] text-center',
              ].join(' ')
              const descClass = [
                isCompact ? 'text-sm' : 'text-base md:text-lg',
                'text-[#444b57] font-medium leading-snug text-center',
              ].join(' ')

              return (
                <div key={feature.id ?? feature.title ?? `feature-${index}`} className={cardClass}>
                  <div className={iconBg}>
                    <span className={iconSpan}>{iconName}</span>
                  </div>

                  {feature.title ? <h3 className={titleClass}>{feature.title}</h3> : null}

                  {feature.description ? <p className={descClass}>{feature.description}</p> : null}
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}
