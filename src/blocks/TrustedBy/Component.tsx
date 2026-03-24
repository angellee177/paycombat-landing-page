import React from 'react'

type TrustedBrand = {
  id?: string | null
  name?: string | null
}

type TrustedByProps = {
  id?: string | null
  title?: string | null
  brands?: TrustedBrand[] | null
}

export function TrustedBySection({ title, brands }: TrustedByProps) {
  if (!title && (!brands || brands.length === 0)) return null

  return (
    <section className="bg-surface-container-low py-12 px-8">
      <div className="max-w-7xl mx-auto">
        {title ? (
          <p className="text-center text-sm font-semibold text-outline mb-10 tracking-widest uppercase">
            {title}
          </p>
        ) : null}

        {brands?.length ? (
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {brands.map((brand, index) => (
              <div key={brand.id ?? brand.name ?? `brand-${index}`} className="text-2xl font-bold font-headline">
                {brand.name}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}