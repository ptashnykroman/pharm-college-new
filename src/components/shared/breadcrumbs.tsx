import Link from 'next/link'
import { ChevronRight, House } from 'lucide-react'

import type { BreadcrumbItem } from '@/shared/lib/breadcrumbs'

type BreadcrumbsProps = {
  items?: readonly BreadcrumbItem[] | null
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items?.length) {
    return null
  }

  return (
    <nav aria-label="Breadcrumbs" className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
      <ol className="flex flex-wrap items-center gap-x-0.5 gap-y-1 text-primary-foreground/80 md:gap-x-2">
        {items.map((item, index) => {
          const isCurrent = item.current ?? index === items.length - 1
          const canLink = Boolean(item.href && !isCurrent)
          const key = `${item.href ?? item.label}-${index}`

          return (
            <li key={key} className="flex items-center gap-0.5 text-[10px] md:gap-2 md:text-[12px] lg:text-sm">
              {canLink ? (
                <Link href={item.href!} className="flex items-center gap-1.5 transition-colors hover:text-primary-foreground">
                  {item.href === '/' ? <House className="h-3.5 w-3.5 shrink-0" /> : null}
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isCurrent ? 'page' : undefined}
                  className="flex items-center gap-1.5 font-medium text-primary-foreground"
                >
                  {item.href === '/' ? <House className="h-3.5 w-3.5 shrink-0" /> : null}
                  {item.label}
                </span>
              )}

              {index < items.length - 1 ? (
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-primary-foreground/50" />
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
