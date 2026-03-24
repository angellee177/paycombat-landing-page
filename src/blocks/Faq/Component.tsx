import React from 'react'

type FaqItem = {
  id?: string | null
  question?: string | null
  answer?: string | null
}

type FaqSectionProps = {
  id?: string | null
  headline?: string | null
  description?: string | null
  items?: FaqItem[] | null
}

export function FaqSection({ id, headline, description, items }: FaqSectionProps) {
  const safeItems = (items || []).filter((item) => item.question?.trim())
  if (!headline && safeItems.length === 0) return null

  return (
    <section id={id || undefined} className="py-24 px-8 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto">
        {headline ? (
          <h2
            className={`text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-center ${description ? 'mb-4' : 'mb-10'}`}
          >
            {headline}
          </h2>
        ) : null}
        {description ? (
          <p className="text-center text-slate-600 font-medium mb-10 max-w-2xl mx-auto">{description}</p>
        ) : null}

        <div className="space-y-3">
          {safeItems.map((item, index) => (
            <details
              key={item.id ?? item.question ?? `faq-${index}`}
              className="group rounded-2xl border border-slate-200 bg-slate-50/50 open:bg-white open:shadow-sm transition-shadow"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-5 py-4 font-semibold text-slate-900 md:text-lg [&::-webkit-details-marker]:hidden">
                <span className="text-left">{item.question}</span>
                <span
                  className="material-symbols-outlined shrink-0 text-slate-500 transition-transform group-open:rotate-180"
                  aria-hidden
                >
                  expand_more
                </span>
              </summary>
              <div className="px-5 pb-5 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100 group-open:pt-4">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
