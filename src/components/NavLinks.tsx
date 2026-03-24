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
  const [hash, setHash] = useState('')

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash)
    updateHash()
    window.addEventListener('hashchange', updateHash)
    return () => window.removeEventListener('hashchange', updateHash)
  }, [])

  const normalizePath = (path: string) => {
    if (path === '/') return '/'
    return path.replace(/\/$/, '')
  }
  const isActive = (href: string) => {
    const [hrefPath, hrefHash] = href.split('#')
    const normHrefPath = normalizePath(hrefPath)
    const normPath = normalizePath(pathname)
    if (hrefHash) {
      return normPath === normHrefPath && hash.replace('#', '') === hrefHash
    }
    return normPath === normHrefPath && !hash
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
