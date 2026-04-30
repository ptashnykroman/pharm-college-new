'use client'

import { startTransition, useMemo, useState } from 'react'

import { Pagination } from '@/components/shared/pagination'
import { NewsCard } from '@/widgets/home/news/news-card'
import type { NewsListItem } from '@/widgets/news/model'

export function NewsListClient({ items, pageSize }: { items: NewsListItem[]; pageSize: number }) {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const visibleItems = useMemo(() => items.slice((page - 1) * pageSize, page * pageSize), [items, page, pageSize])

  if (!items.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-border/80 bg-white/70 p-10 text-center shadow-soft">
        <h2 className="text-2xl font-black text-foreground">Новин поки немає</h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          Для цього періоду ще не знайдено жодної публікації.
        </p>
      </div>
    )
  }

  return (
    <>
      <div key={page} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleItems.map((item, index) => (
          <NewsCard key={`${page}-${item.id}`} item={item} index={index} page={page - 1} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(nextPage) => {
          startTransition(() => {
            setPage(nextPage)
          })
        }}
      />
    </>
  )
}
