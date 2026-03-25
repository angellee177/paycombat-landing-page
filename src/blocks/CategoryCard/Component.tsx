import React from 'react'
import type { Media } from '@/payload-types'

export type CategoryCardBlockProps = {
  title?: string | null
  subtitle?: string | null
  items: Array<{
    icon?: string | null
    watermark?: string | null
    title: string
    features: Array<{ feature: string }>
  }>
}

export function CategoryCardBlock({ title, subtitle, items }: CategoryCardBlockProps) {
  if (!items || items.length === 0) return null
  // Only show the first 4 items for a 2x2 grid
  const cards = items.slice(0, 4)

  return (
    <section className="py-24 px-8 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        {/* Subtitle */}
        {subtitle && (
          <div className="text-center mb-2">
            <span className="text-xs font-black uppercase tracking-[0.5em] text-primary mb-4 block">
              {subtitle}
            </span>
          </div>
        )}
        {/* Title */}
        {title && (
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-center mb-12">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {cards.map((item, idx) => (
            <div
              key={item.title + idx}
              className="relative bg-white rounded-2xl shadow-[0_8px_32px_rgba(25,28,29,0.05)] p-10 flex flex-col min-h-[260px] overflow-hidden group transition-all duration-300 hover:shadow-[0_16px_48px_rgba(25,28,29,0.08)]"
              style={{ marginBottom: idx < 2 ? '0' : undefined }}
            >
              {/* Watermark (large faded Material Symbol) */}
              {item.watermark && (
                <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none select-none">
                  <span className="material-symbols-outlined text-[160px]">{item.watermark}</span>
                </div>
              )}
              {/* Icon and Title (Material Symbol icon) */}
              <div className="flex items-center gap-4 mb-8">
                {item.icon && (
                  <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary">
                    <span
                      className="material-symbols-outlined text-2xl"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      {item.icon}
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-headline font-extrabold text-on-surface">
                  {item.title}
                </h3>
              </div>
              {/* Features List */}
              <ul className="space-y-4">
                {item.features?.map((f, i) => (
                  <li key={f.feature + i} className="flex gap-3 items-center">
                    <span className="material-symbols-outlined text-primary text-xl">
                      check_circle
                    </span>
                    <span className="text-on-surface-variant font-medium">{f.feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
