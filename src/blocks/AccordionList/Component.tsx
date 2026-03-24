'use client'

import React, { useState } from 'react'
import Link from 'next/link'

type Tag = {
  id?: string | null
  label?: string | null
  icon?: string | null
}

type ListItem = {
  id?: string | null
  title?: string | null
  subtitle?: string | null
  tags?: Tag[] | null
  url?: string | null
  actionLabel?: string | null
}

type Group = {
  id?: string | null
  label?: string | null
  items?: ListItem[] | null
}

type AccordionListProps = {
  id?: string | null
  title?: string | null
  description?: string | null
  showSearch?: boolean | null
  searchPlaceholder?: string | null
  groups?: Group[] | null
}

export function AccordionListComponent({
  id,
  title,
  description,
  showSearch,
  searchPlaceholder,
  groups,
}: AccordionListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedGroup, setExpandedGroup] = useState<string | null>(
    groups && groups.length > 0
      ? groups[0]?.id ?? groups[0]?.label ?? null
      : null
  )

  if (!title && !description && (!groups || groups.length === 0)) return null

  const searchTerm = searchQuery.toLowerCase()

  // Filter groups and items based on search
  const filteredGroups = (groups || []).map((group) => ({
    ...group,
    items: (group.items || []).filter(
      (item) =>
        !searchTerm ||
        item.title?.toLowerCase().includes(searchTerm) ||
        item.subtitle?.toLowerCase().includes(searchTerm) ||
        item.tags?.some((tag) => tag.label?.toLowerCase().includes(searchTerm))
    ),
  })).filter((group) => group.items?.length ?? 0 > 0)

  return (
    <section id={id || undefined} className="py-20 md:py-28 px-8 bg-surface">
      <div className="max-w-5xl mx-auto">
        {(title || description) && (
          <div className="text-center mb-12 md:mb-16 space-y-4">
            {title ? (
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="text-lg md:text-xl text-on-surface-variant max-w-3xl mx-auto font-medium">
                {description}
              </p>
            ) : null}
          </div>
        )}

        {showSearch && (
          <div className="mb-12">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">
                search
              </span>
              <input
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder || 'Search...'}
                type="text"
                value={searchQuery}
              />
            </div>
          </div>
        )}

        {filteredGroups.length > 0 ? (
          <div className="space-y-6 md:space-y-8">
            {filteredGroups.map((group, groupIndex) => {
              const groupKey = group.id ?? group.label ?? `group-${groupIndex}`
              return (
                <div key={groupKey} className="space-y-4">
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 rounded-xl bg-surface-container-lowest border border-outline-variant hover:border-primary/50 transition-colors text-left"
                    onClick={() =>
                      setExpandedGroup(
                        expandedGroup === groupKey ? null : groupKey
                      )
                    }
                  >
                    <h3 className="text-sm font-bold tracking-widest uppercase text-primary">
                      {group.label}
                    </h3>
                    <span
                      className={`material-symbols-outlined text-primary transition-transform duration-300 ${
                        expandedGroup === groupKey ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {expandedGroup === groupKey && (
                    <div className="space-y-3 md:space-y-4 pl-0 md:pl-6 animate-in fade-in duration-300">
                      {group.items?.map((item, itemIndex) => (
                        <Link
                          key={item.id ?? `item-${itemIndex}`}
                          href={item.url || '#'}
                          className="group/item flex flex-col md:flex-row md:items-center md:justify-between p-6 bg-surface-container-lowest rounded-xl border border-outline-variant hover:border-primary/50 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex-1 min-w-0 mb-4 md:mb-0">
                            <h4 className="text-lg md:text-xl font-bold text-on-surface mb-2 group-hover/item:text-primary transition-colors">
                              {item.title}
                            </h4>

                            {item.subtitle ? (
                              <p className="text-on-surface-variant font-medium text-base mb-3 line-clamp-2">
                                {item.subtitle}
                              </p>
                            ) : null}

                            {item.tags?.length ? (
                              <div className="flex flex-wrap gap-3 md:gap-4">
                                {item.tags.map((tag, tagIndex) => (
                                  <div
                                    key={tag.id ?? `tag-${tagIndex}`}
                                    className="flex items-center gap-1.5 text-on-surface-variant text-sm font-medium"
                                  >
                                    <span className="material-symbols-outlined text-[18px]">
                                      {tag.icon || 'label'}
                                    </span>
                                    <span>{tag.label}</span>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>

                          <div className="flex items-center gap-2 font-bold text-primary opacity-0 md:opacity-100 group-hover/item:opacity-100 transition-opacity whitespace-nowrap ml-auto">
                            {item.actionLabel || 'View Details'}
                            <span className="material-symbols-outlined text-xl">chevron_right</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-on-surface-variant font-medium">
              {searchQuery
                ? 'No results found. Try adjusting your search.'
                : 'No items available.'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
