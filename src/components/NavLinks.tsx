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

  const isActive = (href: string) => {
    const [hrefPath, hrefHash] = href.split('#')
    const normHrefPath = normalizePath(hrefPath)
    const normPath = normalizePath(cleanPathname)
    if (hrefHash) {
      // Only active if both path and hash match
      return normPath === normHrefPath && locationHash === hrefHash
    }
    // Only active if path matches and there is no hash in the current URL
    return normPath === normHrefPath && !locationHash
  }

  return (
    <div className="hidden md:flex items-center gap-1 lg:gap-2">
      {links.map((link, index) => {
        const active = isActive(link.href)
        return (
          <Link
            key={`${link.href}-${index}`}
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
