import React from 'react'
import Link from 'next/link'

type Button = {
  id?: string | null
  label?: string | null
  url?: string | null
  style?: 'solid' | 'outline' | null
}

type ActionBannerProps = {
  id?: string | null
  title?: string | null
  description?: string | null
  variant?: 'primary' | 'secondary' | 'gradient' | null
  buttons?: Button[] | null
}

const variantClasses: Record<'primary' | 'secondary' | 'gradient', string> = {
  primary:
    'bg-primary-container text-on-primary relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/20 before:to-transparent before:z-0',
  secondary:
    'bg-surface-container relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-secondary-container/30 before:to-transparent before:z-0',
  gradient:
    'bg-gradient-to-br from-primary via-primary-container to-secondary-container text-on-primary relative overflow-hidden',
}

const buttonClasses: Record<'solid' | 'outline', Record<string, string>> = {
  solid: {
    primary: 'bg-surface-container-lowest text-primary hover:scale-105',
    secondary: 'bg-tertiary-fixed text-tertiary hover:scale-105',
    gradient: 'bg-surface-container-lowest text-primary hover:scale-105',
  },
  outline: {
    primary: 'border-2 border-surface-container-lowest text-surface-container-lowest hover:bg-surface-container-lowest/10',
    secondary: 'border-2 border-on-surface text-on-surface hover:bg-on-surface/10',
    gradient: 'border-2 border-surface-container-lowest text-surface-container-lowest hover:bg-surface-container-lowest/10',
  },
}

export function ActionBannerComponent({
  title,
  description,
  variant = 'primary',
  buttons,
}: ActionBannerProps) {
  if (!title && !description) return null

  const bannerVariant = variant || 'primary'

  return (
    <section className="py-20 md:py-28 px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`${variantClasses[bannerVariant]} rounded-[2.5rem] p-12 md:p-20 relative z-10`}>
          <div className="relative z-20 space-y-8 text-center">
            {title ? (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mx-auto">
                {title}
              </h2>
            ) : null}

            {description ? (
              <p className="text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed opacity-95">
                {description}
              </p>
            ) : null}

            {buttons?.length ? (
              <div className="flex flex-wrap gap-4 md:gap-6 pt-6 justify-center">
                {buttons.map((button, index) => {
                  const buttonStyle = button.style || 'solid'
                  const buttonUrl = button.url || '#'
                  const buttonClass = `${buttonClasses[buttonStyle][bannerVariant]} px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-lg md:text-xl transition-all duration-300 inline-block`

                  return (
                    <Link key={button.id ?? `button-${index}`} href={buttonUrl} className={buttonClass}>
                      {button.label || 'Click Here'}
                    </Link>
                  )
                })}
              </div>
            ) : null}
          </div>

          {/* Decorative blobs */}
          {bannerVariant !== 'gradient' && (
            <>
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/15 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-tertiary-container/20 rounded-full blur-3xl -z-10" />
            </>
          )}
        </div>
      </div>
    </section>
  )
}
