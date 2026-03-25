import React, { type ComponentType } from 'react'
import { ProcessTimelineComponent, type ProcessTimelineProps } from './Component'

// Adapter to allow ProcessTimelineComponent to be used as a generic block component
export const ProcessTimelineComponentAdapter: ComponentType<Record<string, unknown>> = (props) => {
  const { steps, title, subtitle } = props as Partial<ProcessTimelineProps>
  if (!Array.isArray(steps)) return null
  return React.createElement(ProcessTimelineComponent, {
    steps: steps as any,
    title,
    subtitle,
  })
}
