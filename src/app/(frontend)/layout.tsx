import React from 'react'
import './styles.css'
import { StyleProbe } from '@/components/StyleProbe'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { resolveSiteLink } from '@/lib/resolveSiteLink'
import type { Media } from '@/payload-types'
import { NavLinks } from '@/components/NavLinks'
import { MobileNav } from '@/components/MobileNav'

// Match Payload's SiteSettings headerLinks structure
type SiteLinkConfig = {
  type?: 'link' | 'dropdown'
  label?: string | null
  url?: string | null
  page?: { slug?: string | null } | number | null
  highlight?: boolean | null
  children?: Array<{
    label?: string | null
    url?: string | null
    page?: { slug?: string | null } | number | null
    highlight?: boolean | null
  }>
}

type SiteSettingsData = {
  brandName?: string | null
  headerLogo?: number | Media | null
  headerLinks?: SiteLinkConfig[] | null
  headerPrimaryCTA?: { label?: string | null; url?: string | null } | null
  headerSecondaryCTA?: { label?: string | null; url?: string | null } | null
  footerDescription?: string | null
  footerLinks?: SiteLinkConfig[] | null
}

export const metadata = {
  description: 'Paycombat Landing page using Payload in a Next.js app.',
  title: 'Paycombat Landing Page',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const siteSettings = (await payload.findGlobal({
    slug: 'site-settings' as never,
    depth: 1,
  })) as SiteSettingsData

  const brandName = siteSettings.brandName || 'PayCombat'
  const headerLogoMedia =
    typeof siteSettings.headerLogo === 'object' && siteSettings.headerLogo
      ? siteSettings.headerLogo
      : null
  const headerLogoUrl = headerLogoMedia?.url || ''
  const headerLogoAlt = headerLogoMedia?.alt || brandName
  const headerLogoWidth = headerLogoMedia?.width || 320
  const headerLogoHeight = headerLogoMedia?.height || 80
  const headerLogoIsSvg = headerLogoMedia?.mimeType === 'image/svg+xml'

  const headerLinks = (siteSettings.headerLinks || [])
    .map((link): any => {
      if (link.type === 'dropdown' && Array.isArray(link.children) && link.children.length > 0) {
        return {
          type: 'dropdown',
          label: link.label ?? '',
          highlight: link.highlight ?? false,
          children: link.children
            .map((child) => {
              const resolved = resolveSiteLink({
                label: child.label,
                url: child.url,
                page: child.page,
              })
              if (!resolved) return null
              return {
                ...resolved,
                highlight: child.highlight ?? false,
              }
            })
            .filter(Boolean),
        }
      }
      // Single link
      const resolved = resolveSiteLink({
        label: link.label,
        url: link.url,
        page: link.page,
      })
      if (!resolved) return null
      return {
        ...resolved,
        highlight: link.highlight ?? false,
        type: 'link',
      }
    })
    .filter((l): l is Exclude<typeof l, null | undefined> => Boolean(l))
  // Debug: log headerLinks to inspect dropdown/children structure
  // eslint-disable-next-line no-console
  console.log('DEBUG headerLinks:', JSON.stringify(headerLinks, null, 2))
  const primaryCTA = siteSettings.headerPrimaryCTA || {}
  const secondaryCTA = siteSettings.headerSecondaryCTA || {}
  const footerDescription =
    siteSettings.footerDescription ||
    '© 2026 PayCombat. All rights reserved. Built for the modern architect.'
  const footerLinks = (siteSettings.footerLinks || [])
    .map((link) =>
      resolveSiteLink({
        label: link.label,
        url: link.url,
      }),
    )
    .filter(Boolean) as { label: string; href: string }[]

  // #region agent log
  // fetch('http://127.0.0.1:7272/ingest/b6180842-bdf5-43f3-9eb9-1d3130ec3a35', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '92e393' },
  //   body: JSON.stringify({
  //     sessionId: '92e393',
  //     runId: `run-${Date.now()}`,
  //     hypothesisId: 'H5',
  //     location: 'src/app/(frontend)/layout.tsx:12',
  //     message: 'Rendering frontend layout with global footer',
  //     data: { hasFooter: true, hasGlobalSettings: Boolean(siteSettings), headerLinksCount: headerLinks.length },
  //     timestamp: Date.now(),
  //   }),
  // }).catch(() => {})
  // #endregion

  return (
    <html lang="en">
      <body>
        <StyleProbe />
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm">
          <nav className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto gap-8 md:gap-12">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center shrink-0 min-h-[40px] md:min-h-[52px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              aria-label={brandName}
            >
              {headerLogoUrl ? (
                <Image
                  src={headerLogoUrl}
                  alt={headerLogoAlt}
                  width={headerLogoWidth}
                  height={headerLogoHeight}
                  className="h-10 w-auto max-w-[160px] md:h-[52px] md:max-w-[280px] object-contain object-left"
                  sizes="(max-width: 768px) 160px, 280px"
                  priority
                  unoptimized={headerLogoIsSvg}
                />
              ) : (
                <span className="text-2xl font-black tracking-tighter text-slate-900">
                  {brandName}
                </span>
              )}
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-3 md:gap-4 flex-1">
              <NavLinks links={headerLinks} />
            </div>
            {/* Mobile Nav */}
            <div className="md:hidden flex items-center gap-2">
              <MobileNav
                links={headerLinks}
                ctas={[
                  secondaryCTA.label ? (
                    <Link
                      key="mobile-secondary"
                      href={secondaryCTA.url || '#'}
                      className="text-slate-600 font-medium px-3 py-2 hover:bg-slate-100/50 rounded-lg transition-all text-base whitespace-nowrap text-center"
                    >
                      {secondaryCTA.label}
                    </Link>
                  ) : null,
                  primaryCTA.label ? (
                    <Link
                      key="mobile-primary"
                      href={primaryCTA.url || '#'}
                      className="bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold px-5 py-3 rounded-full hover:scale-95 transition-transform duration-200 shadow-lg text-base whitespace-nowrap text-center"
                    >
                      {primaryCTA.label}
                    </Link>
                  ) : null,
                ].filter(Boolean)}
              />
            </div>
            {/* CTAs - Desktop */}
            <div className="hidden md:flex items-center gap-3 md:gap-4 shrink-0">
              {secondaryCTA.label ? (
                <Link
                  href={secondaryCTA.url || '#'}
                  className="text-slate-600 font-medium px-3 md:px-4 py-2 hover:bg-slate-100/50 rounded-lg transition-all text-sm md:text-base whitespace-nowrap"
                >
                  {secondaryCTA.label}
                </Link>
              ) : null}
              {primaryCTA.label ? (
                <Link
                  href={primaryCTA.url || '#'}
                  className="bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold px-5 md:px-6 py-2.5 rounded-full hover:scale-95 transition-transform duration-200 shadow-lg text-sm md:text-base whitespace-nowrap"
                >
                  {primaryCTA.label}
                </Link>
              ) : null}
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="text-xl font-bold text-slate-900">{brandName}</div>
              <p className="text-xs text-slate-500 font-medium">{footerDescription}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {footerLinks.map((link, index) => (
                <Link
                  key={`${link.href}-${index}`}
                  className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-transform hover:translate-x-1"
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
