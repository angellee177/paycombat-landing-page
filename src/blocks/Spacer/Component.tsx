import React from 'react'

type SpacerProps = {
  id?: string | null
  height?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | null
}

const heightClasses: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', string> = {
  xs: 'h-8',
  sm: 'h-12',
  md: 'h-16',
  lg: 'h-24',
  xl: 'h-32',
  '2xl': 'h-40',
}

export function SpacerComponent({ height = 'md' }: SpacerProps) {
  const spacerHeight = height || 'md'

  return <div className={`${heightClasses[spacerHeight]} w-full`} aria-hidden="true" />
}
