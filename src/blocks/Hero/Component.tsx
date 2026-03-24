import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import { resolveSiteLink } from '@/lib/resolveSiteLink'

type HeroSectionProps = {
  id?: string | null
  layout?: 'split' | 'centered' | 'text-only' | 'media-left' | null
  eyebrow?:
    | {
        text?: string | null
        icon?: string | null
        filled?: boolean | null
      }
    | string
    | null
  headline?: {
    prefix?: string | null
    highlight?: string | null
    suffix?: string | null
  } | null
  title?: string | null
  highlightText?: string | null
  description?: string | null
  actions?:
    | {
        id?: string | null
        label?: string | null
        page?: { slug?: string | null } | number | null
        url?: string | null
        variant?: 'primary' | 'secondary' | 'ghost' | null
      }[]
    | null
  media?: {
    image?: number | Media | null
    altOverride?: string | null
    showDecor?: boolean | null
  } | null
  spacing?: {
    top?: 'sm' | 'md' | 'lg' | null
    bottom?: 'sm' | 'md' | 'lg' | null
  } | null
  primaryCTA?: {
    label?: string | null
    url?: string | null
  } | null
  secondaryCTA?: {
    label?: string | null
    url?: string | null
  } | null
  image?: number | Media | null
}

type HeroAction = {
  id?: string | null
  label?: string | null
  page?: { slug?: string | null } | number | null
  url?: string | null
  variant?: 'primary' | 'secondary' | 'ghost' | null
}

export function HeroSection(props: HeroSectionProps) {
  const eyebrowText = typeof props.eyebrow === 'string' ? props.eyebrow : props.eyebrow?.text || ''
  const eyebrowIcon = typeof props.eyebrow === 'string' ? 'verified' : props.eyebrow?.icon || 'verified'
  const eyebrowFilled = typeof props.eyebrow === 'string' ? true : props.eyebrow?.filled ?? true

  const title = props.headline?.prefix || props.title || ''
  const highlight = props.headline?.highlight || props.highlightText || ''
  const suffix = props.headline?.suffix || ''

  const mediaSource = props.media?.image ?? props.image
  const media = typeof mediaSource === 'object' && mediaSource ? mediaSource : null
  const imageUrl = media?.url || ''
  const imageAlt = props.media?.altOverride || media?.alt || 'Hero image'
  const imageWidth = media?.width || 1200
  const imageHeight = media?.height || 800
  const hasHeroText = Boolean(eyebrowText || title || props.description)

  const topPaddingMap = {
    sm: 'pt-8 md:pt-10 lg:pt-12',
    md: 'pt-14 md:pt-20 lg:pt-24',
    lg: 'pt-20 md:pt-28 lg:pt-32',
  } as const
  const bottomPaddingMap = {
    sm: 'pb-8 md:pb-10 lg:pb-12',
    md: 'pb-14 md:pb-20 lg:pb-24',
    lg: 'pb-20 md:pb-28 lg:pb-32',
  } as const
  const topPadding = topPaddingMap[props.spacing?.top || 'md']
  const bottomPadding = bottomPaddingMap[props.spacing?.bottom || 'lg']
  const sectionPadding = hasHeroText ? `${topPadding} ${bottomPadding}` : 'py-8 md:py-10 lg:py-12'

  const fallbackActions: HeroAction[] = [
    props.primaryCTA?.label ? { label: props.primaryCTA.label, url: props.primaryCTA.url, variant: 'primary' as const } : null,
    props.secondaryCTA?.label
      ? { label: props.secondaryCTA.label, url: props.secondaryCTA.url, variant: 'secondary' as const }
      : null,
  ].filter(Boolean) as HeroAction[]

  const actions: HeroAction[] = props.actions?.length ? props.actions : fallbackActions
  const layout = props.layout || 'split'
  const showMedia = layout !== 'text-only' && Boolean(imageUrl)
  const showDecor = props.media?.showDecor ?? true

  const actionClass: Record<'primary' | 'secondary' | 'ghost', string> = {
    primary:
      'bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-lg hover:scale-95 transition-transform shadow-xl',
    secondary:
      'bg-surface-container-lowest text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-surface-container-low transition-colors shadow-sm ring-1 ring-outline-variant/20',
    ghost: 'text-slate-700 px-6 py-3 rounded-full font-semibold hover:bg-slate-100 transition-colors',
  }

  const containerClassByLayout: Record<'split' | 'centered' | 'text-only' | 'media-left', string> = {
    split: 'max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-16',
    centered: 'max-w-5xl mx-auto flex flex-col items-center text-center gap-8',
    'text-only': 'max-w-5xl mx-auto',
    'media-left': 'max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-start gap-16',
  }
  const textClassByLayout: Record<'split' | 'centered' | 'text-only' | 'media-left', string> = {
    split: 'lg:w-1/2 space-y-8',
    centered: 'space-y-8',
    'text-only': 'space-y-8',
    'media-left': 'lg:w-1/2 space-y-8',
  }
  const mediaClassByLayout: Record<'split' | 'centered' | 'text-only' | 'media-left', string> = {
    split: 'lg:w-1/2 relative',
    centered: 'w-full max-w-3xl relative',
    'text-only': 'hidden',
    'media-left': 'lg:w-1/2 relative',
  }

  // #region agent log
  // fetch('http://127.0.0.1:7272/ingest/b6180842-bdf5-43f3-9eb9-1d3130ec3a35', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '92e393' },
  //   body: JSON.stringify({
  //     sessionId: '92e393',
  //     runId: `run-${Date.now()}`,
  //     hypothesisId: 'H10',
  //     location: 'src/blocks/Hero/Component.tsx:12',
  //     message: 'Hero render snapshot',
  //     data: { headline, description },
  //     timestamp: Date.now(),
  //   }),
  // }).catch(() => {})
  // #endregion

  return (
    <section className={`relative overflow-hidden bg-surface px-8 ${sectionPadding}`}>
      <div className={containerClassByLayout[layout]}>
        <div className={textClassByLayout[layout]}>
          {eyebrowText ? (
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
                eyebrowFilled ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{eyebrowIcon}</span>
              {eyebrowText}
            </div>
          ) : null}
          <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface leading-[1.1] tracking-tight">
            {title}
            {highlight ? <span className="text-primary italic"> {highlight}</span> : null}
            {suffix ? <span> {suffix}</span> : null}
          </h1>
          {props.description ? (
            <p className="text-lg md:text-xl text-on-surface-variant max-w-xl font-medium leading-relaxed">
              {props.description}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-4 pt-4">
            {actions.map((action, index) => {
              const resolved = resolveSiteLink({
                label: action.label,
                page: action.page,
                url: action.url,
              })
              if (!resolved) return null
              const variant = action.variant || 'primary'
              return (
                <Link key={`${resolved.href}-${index}`} href={resolved.href} className={actionClass[variant]}>
                  {resolved.label}
                </Link>
              )
            })}
          </div>
        </div>
        <div className={mediaClassByLayout[layout]}>
          {showMedia ? (
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                className="w-full h-auto"
              />
            </div>
          ) : null}
          {showMedia && showDecor ? (
            <>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-fixed-dim/30 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-tertiary-fixed-dim/20 rounded-full blur-2xl -z-10" />
            </>
          ) : null}
        </div>
      </div>
    </section>
  )
}