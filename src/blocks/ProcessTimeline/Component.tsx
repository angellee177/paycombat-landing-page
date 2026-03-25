import React from 'react'

export type ProcessTimelineProps = {
  steps: Array<{
    number: string
    title: string
    description: string
  }>
}

export function ProcessTimelineComponent({ steps }: ProcessTimelineProps) {
  if (!steps || steps.length < 2) return null

  return (
    <section className="py-24 px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs font-black uppercase tracking-[0.8em] text-primary mb-4 block font-sans">
            OUR PROCESS
          </span>
          <h2 className="text-5xl md:text-6xl font-['Manrope'] font-bold tracking-[-0.04em] leading-[1.05] text-on-surface">
            The Precision Methodology
          </h2>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-20 md:gap-0 relative">
          {steps.map((step, idx) => (
            <div
              key={step.number + step.title}
              className="flex flex-col items-start text-left relative group min-w-[260px] max-w-[340px] md:pr-8"
            >
              <div className="flex items-center w-full md:w-auto justify-start md:justify-normal relative">
                <div
                  className={[
                    'z-10 flex items-center justify-center font-bold font-mono',
                    'text-lg md:text-xl w-16 h-16 rounded-full',
                    'border-2 border-[#2E47D1] bg-white text-[#2E47D1] shadow-none',
                    'transition-all duration-300',
                    'group-hover:bg-[#2E47D1] group-hover:text-white group-hover:shadow-lg',
                    'font-mono',
                  ].join(' ')}
                  style={{ fontVariantNumeric: 'tabular-nums', fontFamily: 'Manrope, monospace' }}
                >
                  {step.number}
                </div>
                {/* Connector line (horizontal only, except last) */}
                {idx < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute left-full top-1/2 transform -translate-y-1/2 ml-4"
                    style={{
                      width: '180px',
                      height: '0px',
                      borderTop: '2.5px dashed #2E47D1',
                    }}
                  />
                )}
              </div>
              {/* Step content */}
              <div className="mt-8 md:mt-12 max-w-[320px]">
                <h3 className="text-2xl md:text-2xl font-bold mb-4 text-on-surface font-['Manrope']">
                  {step.title}
                </h3>
                <p className="text-on-surface-variant font-medium leading-relaxed text-lg md:text-xl font-['Inter']">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
