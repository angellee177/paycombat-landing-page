import Link from 'next/link'
import React from 'react'

type CtaBannerProps = {
  background?: 'primary' | 'black'
  title: string
  highlight?: {
    text?: string | null
    color?: 'white' | 'purple' | null
  }
  description: string
  button: {
    label: string
    url: string
    style?: 'primary' | 'blackWhite'
  }
}

export function CtaBannerComponent({
  background = 'primary',
  title,
  highlight,
  description,
  button,
}: CtaBannerProps) {
  // Compose the title with highlight if present
  let composedTitle: React.ReactNode = title
  if (highlight?.text) {
    const [before, after] = title.split(highlight.text)
    composedTitle = (
      <>
        {before}
        <span className={highlight.color === 'white' ? 'text-white' : 'text-[#bbc3ff]'}>
          {highlight.text}
        </span>
        {after}
      </>
    )
  }

  // Background style
  const bgClass =
    background === 'black' ? 'bg-[#23272F]' : 'bg-gradient-to-br from-[#2E47D1] to-[#3B2ED1]'

  // Text color for contrast
  const textColor = background === 'black' ? 'text-white' : 'text-white'

  // Button style
  let buttonClass =
    button.style === 'blackWhite'
      ? 'inline-block bg-white text-black px-10 py-5 rounded-full font-headline font-bold text-xl shadow-lg hover:bg-[#bbc3ff] hover:text-black transition-all scale-95 active:scale-90'
      : 'inline-block bg-white text-[#2E47D1] px-10 py-5 rounded-full font-headline font-bold text-xl shadow-lg hover:bg-[#bbc3ff] hover:text-[#2E47D1] transition-all scale-95 active:scale-90'

  return (
    <section className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={[
            bgClass,
            'rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden flex flex-col items-center',
          ].join(' ')}
        >
          <div className="relative z-10 flex flex-col items-center w-full">
            <h2 className="text-6xl md:text-6xl font-bold font-['Manrope'] tracking-tight mb-6 leading-tight text-white">
              {composedTitle}
            </h2>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium mb-10">
              {description}
            </p>
            <Link href={button.url} className={buttonClass}>
              {button.label}
            </Link>
          </div>
          {/* Decorative gradients for depth */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#bbc3ff]/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  )
}
