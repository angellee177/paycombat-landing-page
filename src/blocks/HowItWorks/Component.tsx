'use client'

import React from 'react'
import { useEffect, useState } from 'react'

type StepItem = {
  id?: string | null
  title?: string | null
  description?: string | null
  label?: string | null
}

type HowItWorksProps = {
  id?: string | null
  headline?: string | null
  description?: string | null
  steps?: StepItem[] | null
}

export function HowItWorksComponent({ headline, description, steps }: HowItWorksProps) {
  const safeSteps = steps || []
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  useEffect(() => {
    if (activeStepIndex >= safeSteps.length) {
      setActiveStepIndex(0)
    }
  }, [activeStepIndex, safeSteps.length])

  const activeStep = safeSteps[activeStepIndex]
  if (!headline && !description && safeSteps.length === 0) return null

  return (
    <section className="py-24 px-8 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3 space-y-6">
            {headline ? (
              <h2 className="text-4xl font-extrabold tracking-tight">{headline}</h2>
            ) : null}
            {description ? (
              <p className="text-on-surface-variant font-medium">{description}</p>
            ) : null}

            {safeSteps.length ? (
              <ul className="space-y-4 pt-4">
                {safeSteps.map((step, index) => {
                  const isActive = index === activeStepIndex
                  return (
                    <li key={step.id ?? step.title ?? `step-${index}`}>
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => {
                          setActiveStepIndex(index)
                        }}
                        className={`w-full text-left flex items-center gap-4 cursor-pointer ${isActive ? 'font-bold text-primary' : 'font-semibold text-on-surface'}`}
                      >
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                            isActive
                              ? 'bg-primary text-on-primary'
                              : 'bg-surface-dim text-on-surface'
                          }`}
                        >
                          {index + 1}
                        </span>
                        {step.title || `Step ${index + 1}`}
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 gap-8">
            {activeStep ? (
              <article
                key={
                  activeStep.id ??
                  activeStep.label ??
                  activeStep.title ??
                  `detail-${activeStepIndex}`
                }
                className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border-l-4 border-primary"
              >
                <p className="text-sm font-bold text-primary mb-4">
                  {activeStep.label || `Step ${String(activeStepIndex + 1).padStart(2, '0')}`}
                </p>
                {activeStep.title ? (
                  <h4 className="text-xl font-bold mb-2">{activeStep.title}</h4>
                ) : null}
                {activeStep.description ? (
                  <p className="text-on-surface-variant text-sm font-medium">
                    {activeStep.description}
                  </p>
                ) : null}
              </article>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
