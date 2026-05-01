'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { startTransition, useMemo, useState } from 'react'

import { Pagination } from "@/components/shared/pagination";
import { NEWS_INDEX_PATH } from '@/shared/lib/site-config'
import type { HomePageViewModel } from '@/widgets/home/model'
import { NewsCard } from '@/widgets/home/news/news-card'
import { PAGE_SIZE } from '@/widgets/home/news/news-utils'

export function HomeNewsSection({ items }: { items: HomePageViewModel['news'] }) {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE))

  const visibleItems = useMemo(
    () => items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [items, page]
  )

  return (
    <section id="news" className="relative overflow-hidden bg-gradient-soft py-20 md:py-28">
      {/* <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" /> */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">Новини коледжу</h2>
            <p className="mt-3 text-muted-foreground">Стежте за подіями, конкурсами та можливостями нашого закладу.</p>
          </div>

          <Link
            href={NEWS_INDEX_PATH}
            className="group flex items-center gap-2 rounded-full max-w-[140px] truncate border border-primary/20 bg-card px-5 py-2.5 text-sm font-semibold text-primary shadow-soft transition-bounce hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
          >
            Усі новини
            <ArrowRight className="h-4 w-4 transition-bounce group-hover:translate-x-1" />
          </Link>
        </div>

        <div key={page} className="mt-12 grid gap-6 md:grid-cols-3">
          {visibleItems.map((item, index) => (
            <NewsCard key={`${page}-${item.id}`} item={item} index={index} page={page - 1} isHomePage />
          ))}
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(nextPage) => {
            startTransition(() => {
              setPage(nextPage);
            });
          }}
        />
      </div>
    </section>
  )
}
