type LinkInput = {
  label?: string | null
  url?: string | null
  page?: { slug?: string | null } | number | null
}

export function resolveSiteLink(link: LinkInput): { label: string; href: string } | null {
  const label = (link.label || '').trim()
  if (!label) return null

  const customURL = (link.url || '').trim()
  if (customURL) {
    return { label, href: customURL }
  }

  if (typeof link.page === 'object' && link.page?.slug) {
    const slug = link.page.slug
    return { label, href: slug === 'landing-page' ? '/' : `/${slug}` }
  }

  return { label, href: '#' }
}
