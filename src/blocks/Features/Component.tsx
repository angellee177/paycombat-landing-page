import React from 'react'

type FeatureCard = {
  id?: string | null
  title?: string | null
  description?: string | null
  icon?: string | null
  variant?: 'default' | 'emphasis' | 'secondary' | null
}

type FeaturesProps = {
  id?: string | null
  headline?: string | null
  description?: string | null
  cards?: FeatureCard[] | null
}

const cardVariantClass: Record<'default' | 'emphasis' | 'secondary', string> = {
  default: 'bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow',
  emphasis: 'bg-surface-container hover:bg-surface-container-high transition-colors',
  secondary: 'bg-secondary-container',
}

const iconVariantClass: Record<'default' | 'emphasis' | 'secondary', string> = {
  default: 'bg-primary-fixed text-primary',
  emphasis: 'bg-tertiary-fixed text-tertiary',
  secondary: 'bg-surface-container-lowest text-on-secondary-container',
}

export function FeaturesSection({ headline, description, cards }: FeaturesProps) {
  if (!headline && !description && (!cards || cards.length === 0)) return null

  return (
    <section className="py-24 px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        {(headline || description) && (
          <div className="text-center mb-20 space-y-4">
            {headline ? <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">{headline}</h2> : null}
            {description ? (
              <p className="text-on-surface-variant max-w-2xl mx-auto font-medium">{description}</p>
            ) : null}
          </div>
        )}

        {cards?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, index) => {
              const variant = (card.variant || 'default') as 'default' | 'emphasis' | 'secondary'
              const iconName = card.icon || 'star'

              return (
                <article
                  key={card.id ?? card.title ?? `feature-${index}`}
                  className={`p-10 rounded-[2rem] ${cardVariantClass[variant]}`}
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8">
                    <span className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconVariantClass[variant]}`}>
                      <span className="material-symbols-outlined text-3xl">{iconName}</span>
                    </span>
                  </div>

                  {card.title ? <h3 className="text-2xl font-bold mb-4">{card.title}</h3> : null}
                  {card.description ? (
                    <p className="text-on-surface-variant font-medium leading-relaxed">{card.description}</p>
                  ) : null}
                </article>
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}