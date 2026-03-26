'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type MobileNavLink = {
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

export function MobileNav({ links, ctas }: { links: MobileNavLink[]; ctas?: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)

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
    if (hrefHash) {
      return normPath === normHrefPath && locationHash === hrefHash
    }
    // Split into segments for strict matching
    const hrefSegments = normHrefPath.split('/').filter(Boolean)
    const pathSegments = normPath.split('/').filter(Boolean)
    return (
      normPath === normHrefPath ||
      (hrefSegments.length > 0 &&
        pathSegments.length >= hrefSegments.length &&
        hrefSegments.every((seg, i) => seg === pathSegments[i]))
    )
  }

  return (
    <>
      {/* Hamburger button */}
      <button
        className="md:hidden flex items-center px-2 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
      >
        <span className="material-symbols-outlined text-3xl">menu</span>
      </button>
      {/* Overlay */}
      {open && <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)} />}
      {/* Slide-down menu */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-lg transition-transform duration-300 md:hidden ${open ? 'translate-y-0' : '-translate-y-full'}`}
        style={{ minHeight: 64 }}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="font-black text-xl tracking-tight">Menu</span>
          <button
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>
        <div className="flex flex-col gap-2 px-6 py-4">
          {links.map((link, i) => {
            if (link.type === 'dropdown' && link.children && link.children.length > 0) {
              return (
                <div key={link.label + i} className="flex flex-col">
                  <button
                    type="button"
                    className="py-3 px-2 text-lg font-semibold rounded flex items-center justify-between hover:bg-slate-100 text-slate-700"
                    onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                    aria-haspopup="menu"
                    aria-expanded={openDropdown === i}
                  >
                    <span>{link.label}</span>
                    <span className="material-symbols-outlined text-base ml-1">expand_more</span>
                  </button>
                  {openDropdown === i && (
                    <div className="flex flex-col pl-4 border-l border-slate-200 bg-slate-50 rounded-b-lg mt-1">
                      {link.children.map((child, cidx) => {
                        const childActive = child.href ? isActive(child.href) : false
                        return (
                          <Link
                            key={child.label + cidx}
                            href={child.href || '#'}
                            className={`py-1.5 px-2 text-sm rounded hover:bg-slate-100 ${
                              childActive
                                ? 'text-primary font-bold border-b-2 border-primary'
                                : child.highlight
                                  ? 'text-primary font-bold'
                                  : 'text-slate-700'
                            } hover:text-primary`}
                            onClick={() => setOpen(false)}
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
            const href = link.href || '#'
            const active = link.href ? isActive(link.href) : false
            return (
              <Link
                key={href + i}
                href={href}
                className={`py-3 px-2 text-lg font-semibold rounded hover:bg-slate-100 ${active ? 'text-primary font-bold border-b-2 border-primary' : 'text-slate-600'}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
        {ctas && <div className="flex flex-col gap-2 px-6 pb-4">{ctas}</div>}
      </nav>
    </>
  )
}
