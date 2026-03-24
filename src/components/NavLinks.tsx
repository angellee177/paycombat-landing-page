'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLink = {
  label: string
  href: string
}

type NavLinksProps = {
  links: NavLink[]
}

export function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    // Exact match for home page
    if (href === '/') {
      return pathname === '/'
    }
    // For other pages, check if pathname starts with the href
    return pathname.startsWith(href)
  }

  return (
    <div className="hidden md:flex items-center gap-1 lg:gap-2">
      {links.map((link, index) => {
        const active = isActive(link.href)
        return (
          <Link
            key={`${link.href}-${index}`}
            className={`font-medium transition-all duration-300 px-3 py-2 whitespace-nowrap text-sm lg:text-base rounded-md ${
              active
                ? 'text-primary bg-primary/10 font-bold border-b-2 border-primary'
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
