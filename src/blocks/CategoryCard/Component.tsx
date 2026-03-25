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
            <span className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-4 block font-sans">
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
              className="relative bg-surface-container-lowest rounded-[1.5rem] border border-black/10 shadow-[0_2px_12px_0_rgba(16,30,54,0.04)] p-10 flex flex-col min-h-[260px] overflow-hidden group transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(46,71,209,0.18)] hover:border-[#2E47D1]/60 cursor-pointer"
              style={{ marginBottom: idx < 2 ? '0' : undefined }}
            >
              {/* Watermark (large faded Material Symbol) */}
              {item.watermark && (
                <div className="absolute -right-8 -top-8 opacity-[0.045] group-hover:opacity-[0.16] transition-opacity pointer-events-none select-none">
                  <span className="material-symbols-outlined text-[180px]">{item.watermark}</span>
                </div>
              )}
              {/* Icon and Title (Material Symbol icon) */}
              <div className="flex items-center gap-4 mb-8">
                {item.icon && (
                  <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <span
                      className="material-symbols-outlined text-3xl"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      {item.icon}
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-headline font-extrabold text-on-surface group-hover:text-primary transition-colors duration-300">
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
                    <span className="text-on-surface-variant font-medium font-sans text-base md:text-lg">
                      {f.feature}
                    </span>
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
