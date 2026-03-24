import Link from 'next/link'
import React from 'react'

type CtaBannerProps = {
  id?: string | null
  title?: string | null
  description?: string | null
  button?: {
    id?: string | null
    label?: string | null
    url?: string | null
  } | null
}

export function CtaBannerSection({ title, description, button }: CtaBannerProps) {
  if (!title && !description) return null

  const buttonLabel = button?.label || 'Start Your Journey'
  const buttonUrl = button?.url || '#'

  return (
    <section className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-primary-container rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            {title ? (
              <h2 className="text-4xl md:text-6xl font-extrabold text-on-primary tracking-tight">
                {title}
              </h2>
            ) : null}

            {description ? (
              <p className="text-primary-fixed-dim text-lg md:text-xl max-w-2xl mx-auto font-medium">
                {description}
              </p>
            ) : null}

            <div className="pt-6">
              <Link
                href={buttonUrl}
                className="inline-block bg-surface-container-lowest text-primary px-10 py-5 rounded-full font-extrabold text-xl hover:scale-105 transition-transform shadow-2xl"
              >
                {buttonLabel}
              </Link>
            </div>
          </div>

          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-tertiary-container/30 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  )
}