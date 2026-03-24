'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function MobileNav({
  links,
  ctas,
}: {
  links: { label: string; href: string }[]
  ctas?: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

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
    return normPath === normHrefPath || normPath.startsWith(normHrefPath + '/')
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
            const active = isActive(link.href)
            return (
              <Link
                key={link.href + i}
                href={link.href}
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
