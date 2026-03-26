'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type NavLink = {
  type?: 'link' | 'dropdown'
  label: string
  href?: string
  highlight?: boolean
  children?: Array<{
    label: string
    href?: string
    highlight?: boolean
  }>
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
    // If current location has a hash, do not activate the base path link
    if (locationHash && !hrefHash) {
      return false
    }
    // Special case: root link is only active on homepage
    if (normHrefPath === '/') {
      return normPath === '/'
    }
    // For other links, match only if path matches exactly (no prefix match)
    return normPath === normHrefPath
  }

  const [openDropdown, setOpenDropdown] = useState<number | null>(null)

  return (
    <div className="hidden md:flex items-center gap-1 lg:gap-2 relative">
      {links.map((link, index) => {
        if (link.type === 'dropdown' && link.children && link.children.length > 0) {
          return (
            <div key={link.label + index} className="relative">
              <button
                type="button"
                className="font-medium transition-all duration-300 px-3 py-2 whitespace-nowrap text-base flex items-center gap-1 hover:text-primary"
                onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                aria-haspopup="menu"
                aria-expanded={openDropdown === index}
              >
                {link.label}
                <span className="material-symbols-outlined text-base ml-1">expand_more</span>
              </button>
              {/* Dropdown menu */}
              {openDropdown === index && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 min-w-[200px] bg-white border border-black/10 rounded-xl py-2 z-50 flex flex-col items-stretch"
                  tabIndex={0}
                  // Only close on click outside or selecting a child
                >
                  {link.children.map((child, cidx) => {
                    const childActive = child.href ? isActive(child.href) : false
                    return (
                      <Link
                        key={child.label + cidx}
                        href={child.href || '#'}
                        className={`block px-8 py-1.5 text-base font-medium text-center whitespace-nowrap transition-colors duration-200 hover:bg-slate-100 ${
                          childActive
                            ? 'text-primary font-bold border-b-2 border-primary'
                            : child.highlight
                              ? 'text-primary font-bold'
                              : 'text-slate-700'
                        } hover:text-primary`}
                        onClick={() => setOpenDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        }
        // Single link
        const active = link.href ? isActive(link.href) : false
        return (
          <Link
            key={`${link.href || link.label}-${index}`}
            aria-current={active ? 'page' : undefined}
            className={`font-medium transition-all duration-300 px-3 py-2 whitespace-nowrap text-sm lg:text-base ${
              active
                ? 'text-primary font-bold border-b-2 border-primary'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            href={link.href || '#'}
          >
            {link.label}
          </Link>
        )
      })}
    </div>
  )
}
