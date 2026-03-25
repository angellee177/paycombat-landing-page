import React from 'react'

export type Testimonial = {
  quote: string
  name: string
  company: string
  initials?: string | null
}

export type TestimonialGridBlockProps = {
  title?: string | null
  testimonials: Testimonial[]
}

export function TestimonialGridComponent({ title, testimonials }: TestimonialGridBlockProps) {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="py-24 px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        {title && (
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-center mb-20">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={t.name + t.company + idx}
              className={[
                'flex flex-col h-full bg-white rounded-2xl p-10 transition-all duration-300 border group cursor-pointer',
                'border-black/10 shadow-[0_2px_12px_0_rgba(16,30,54,0.04)] hover:shadow-[0_8px_32px_0_rgba(46,71,209,0.18)] hover:border-[#2E47D1]/60',
              ].join(' ')}
              style={{ minHeight: 320 }}
            >
              <span className="material-symbols-outlined text-primary text-4xl mb-6">
                format_quote
              </span>
              <blockquote className="italic text-on-surface-variant text-lg leading-relaxed mb-8 flex-1">
                “{t.quote}”
              </blockquote>
              <div className="flex items-center gap-4 mt-auto">
                {t.initials && (
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {t.initials}
                  </div>
                )}
                <div>
                  <div className="font-bold text-on-surface">{t.name}</div>
                  <div className="font-sans text-on-surface-variant tracking-widest text-sm font-semibold">
                    {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
