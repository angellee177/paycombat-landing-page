'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type NavLink = {
  label: string
  href: string
}

type NavLinksProps = {
  links: NavLink[]
}

export function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname()
  const [locationHash, setLocationHash] = useState('')

  useEffect(() => {
    const updateHash = () => setLocationHash(window.location.hash.replace('#', ''))
    updateHash()
    window.addEventListener('hashchange', updateHash)
    return () => window.removeEventListener('hashchange', updateHash)
  }, [])

  const [currentPath] = pathname.split('#')
  const cleanPathname = currentPath

  // Helper to normalize paths (remove trailing slash except for root)
  const normalizePath = (path: string) => {
    if (path === '/') return '/'
    return path.replace(/\/$/, '')
  }

  const isExternal = (href: string) => href.startsWith('http://') || href.startsWith('https://')
  const isActive = (href: string) => {
    if (isExternal(href)) return false
    const [hrefPath, hrefHash] = href.split('#')
    const normHrefPath = normalizePath(hrefPath)
    const normPath = normalizePath(cleanPathname)
    // If link has a hash, both path and hash must match
    if (hrefHash) {
      return normPath === normHrefPath && locationHash === hrefHash
    }
    // Special case: root link is only active on homepage
    if (normHrefPath === '/') {
      return normPath === '/'
    }
    // For other links, match if current path starts with link path (for section highlighting)
    return normPath === normHrefPath || normPath.startsWith(normHrefPath + '/')
  }

  return (
    <div className="hidden md:flex items-center gap-1 lg:gap-2">
      {links.map((link, index) => {
        const active = isActive(link.href)
        // Debug logging for active state
        console.log('NavLinks debug:', {
          pathname,
          linkHref: link.href,
          active,
          locationHash,
        })
        return (
          <Link
            key={`${link.href}-${index}`}
            aria-current={active ? 'page' : undefined}
            className={`font-medium transition-all duration-300 px-3 py-2 whitespace-nowrap text-sm lg:text-base ${
              active
                ? 'text-primary font-bold border-b-2 border-primary'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            href={link.href}
          >
            {link.label}
          </Link>
        )
      })}
    </div>
  )
}
