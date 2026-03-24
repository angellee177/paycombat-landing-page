import React from 'react'

type SectionHeaderProps = {
  id?: string | null
  title?: string | null
  description?: string | null
  alignment?: 'left' | 'center' | null
  size?: 'sm' | 'md' | 'lg' | null
  showDivider?: boolean | null
}

const headingClasses: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'text-2xl md:text-3xl',
  md: 'text-3xl md:text-4xl',
  lg: 'text-4xl md:text-5xl',
}

const containerClasses: Record<'left' | 'center', string> = {
  left: 'text-left',
  center: 'text-center',
}

const maxWidthClasses: Record<'left' | 'center', string> = {
  left: 'max-w-3xl',
  center: 'max-w-2xl mx-auto',
}

export function SectionHeaderComponent({
  title,
  description,
  alignment = 'left',
  size = 'lg',
  showDivider,
}: SectionHeaderProps) {
  if (!title && !description) return null

  const align = alignment || 'left'
  const headingSize = size || 'lg'

  return (
    <section className="py-16 md:py-20 lg:py-24 px-8 bg-surface">
      <div className={`max-w-7xl mx-auto`}>
        <div className={`${maxWidthClasses[align]} ${containerClasses[align]} space-y-4`}>
          {showDivider && align === 'left' && (
            <div className="w-16 h-1 bg-primary rounded-full" />
          )}
          
          {title ? (
            <h2 className={`${headingClasses[headingSize]} font-extrabold tracking-tight text-on-surface`}>
              {title}
            </h2>
          ) : null}
          
          {description ? (
            <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
