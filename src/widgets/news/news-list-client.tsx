'use client'

import { startTransition, useMemo, useState } from 'react'

import { Pagination } from '@/components/shared/pagination'
import { NewsCard } from '@/widgets/home/news/news-card'
import type { NewsListItem } from '@/widgets/news/model'

type NewsListClientProps = {
  items: NewsListItem[]
  pageSize: number
  isHomePage?: boolean
  gridClassName?: string
  scrollTargetId?: string
}

export function NewsListClient({
  items,
  pageSize,
  isHomePage = false,
  gridClassName = 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
  scrollTargetId,
}: NewsListClientProps) {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const visibleItems = useMemo(() => items.slice((page - 1) * pageSize, page * pageSize), [items, page, pageSize])

  function scrollToTarget() {
    if (!scrollTargetId) {
      return
    }

    const target = document.getElementById(scrollTargetId)

    if (!target) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  if (!items.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-[rgba(var(--border),0.8)] bg-[rgba(255,255,255,0.7)] p-10 text-center shadow-soft">
        <h2 className="text-2xl font-black text-foreground">Новин поки немає</h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          Для цього періоду ще не знайдено жодної публікації.
        </p>
      </div>
    )
  }

  return (
    <>
      <div key={page} className={gridClassName}>
        {visibleItems.map((item, index) => (
          <NewsCard key={`${page}-${item.id}`} item={item} index={index} page={page - 1} isHomePage={isHomePage} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(nextPage) => {
          if (nextPage === page) {
            return
          }

          scrollToTarget()

          startTransition(() => {
            setPage(nextPage)
          })
        }}
      />
    </>
  )
}
