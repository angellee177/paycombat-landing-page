import React from 'react'

type FormField = {
  id?: string | null
  label?: string | null
  name?: string | null
  type?: 'text' | 'email' | 'textarea' | 'tel' | null
  placeholder?: string | null
  required?: boolean | null
  fullWidth?: boolean | null
}

type InfoCard = {
  id?: string | null
  icon?: string | null
  label?: string | null
  content?: string | null
}

type HighlightItem = {
  id?: string | null
  label?: string | null
  value?: string | null
  isClosed?: boolean | null
}

type HighlightCard = {
  enabled?: boolean | null
  title?: string | null
  icon?: string | null
  items?: HighlightItem[] | null
}

type ContactSplitProps = {
  id?: string | null
  title?: string | null
  description?: string | null
  formTitle?: string | null
  formFields?: FormField[] | null
  submitButtonLabel?: string | null
  infoCards?: InfoCard[] | null
  highlightCard?: HighlightCard | null
}

export function ContactSplitComponent({
  title,
  description,
  formTitle,
  formFields,
  submitButtonLabel,
  infoCards,
  highlightCard,
}: ContactSplitProps) {
  if (!title && !description && (!formFields || formFields.length === 0)) return null

  const fields = formFields || []
  const infos = infoCards || []
  const highlight = highlightCard?.enabled && highlightCard?.items?.length ? highlightCard : null

  return (
    <section id="contact-us" className="py-20 md:py-28 px-8 bg-surface">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Form Section */}
          <div className="bg-surface-container-lowest p-8 md:p-10 rounded-2xl shadow-sm border border-outline-variant/50">
            {formTitle ? (
              <h3 className="text-2xl font-bold mb-8 text-on-surface">{formTitle}</h3>
            ) : null}

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {fields.map((field) => {
                  const fieldKey = field.id ?? field.name ?? `field-${field.label}`
                  const isFullWidth = field.fullWidth === true
                  const wrapperClass = isFullWidth ? 'sm:col-span-2' : ''

                  if (field.type === 'textarea') {
                    return (
                      <div key={fieldKey} className="sm:col-span-2">
                        {field.label ? (
                          <label className="block text-sm font-semibold text-on-surface mb-2">
                            {field.label}
                            {field.required && <span className="text-error"> *</span>}
                          </label>
                        ) : null}
                        <textarea
                          className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-bright focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none resize-none"
                          placeholder={field.placeholder || ''}
                          required={field.required ?? false}
                          rows={4}
                        />
                      </div>
                    )
                  }

                  return (
                    <div key={fieldKey} className={wrapperClass}>
                      {field.label ? (
                        <label className="block text-sm font-semibold text-on-surface mb-2">
                          {field.label}
                          {field.required && <span className="text-error"> *</span>}
                        </label>
                      ) : null}
                      <input
                        className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-bright focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none"
                        placeholder={field.placeholder || ''}
                        required={field.required ?? false}
                        type={field.type || 'text'}
                      />
                    </div>
                  )
                })}
              </div>

              <button
                className="w-full py-4 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary-container transition-colors shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
                type="submit"
              >
                {submitButtonLabel || 'Send Message'}
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </form>
          </div>

          {/* Info Section */}
          <div className="flex flex-col gap-8">
            {/* Regular Info Cards Grid */}
            {infos && infos.length > 0 && (
              <div className="grid grid-cols-1 gap-6">
                {infos.map((info, index) => (
                  <div
                    key={info.id ?? `info-${index}`}
                    className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/30 flex items-start gap-4 hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <span className="material-symbols-outlined text-xl">{info.icon || 'info'}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      {info.label ? (
                        <h4 className="font-bold text-lg mb-1 text-on-surface">{info.label}</h4>
                      ) : null}
                      {info.content ? (
                        <div className="text-on-surface-variant text-sm leading-relaxed whitespace-pre-line">
                          {info.content}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Highlight Card (Business Hours, etc.) */}
            {highlight && highlight.items && highlight.items.length > 0 && (
              <div className="bg-primary text-on-primary p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-primary-container relative overflow-hidden mt-4">
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16 blur-2xl" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-on-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">
                        {highlight.icon || 'schedule'}
                      </span>
                    </div>
                    <h4 className="text-2xl font-bold">{highlight.title || 'Hours'}</h4>
                  </div>

                  <div className="space-y-4">
                    {highlight.items.map((item, index) => (
                      <div
                        key={item.id ?? `highlight-item-${index}`}
                        className="flex justify-between items-center gap-4 pb-4 border-b border-on-primary/15 last:border-b-0 last:pb-0"
                      >
                        <span className="font-medium text-base opacity-95">{item.label}</span>
                        <div className="text-right flex items-center gap-2">
                          {item.isClosed && (
                            <span className="inline-block px-3 py-1 bg-on-tertiary-container text-tertiary-container rounded-md text-xs font-bold">
                              CLOSED
                            </span>
                          )}
                          {!item.isClosed && (
                            <span className="font-bold text-on-primary whitespace-nowrap">{item.value}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
