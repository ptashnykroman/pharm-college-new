import { NewsArchive } from '@/widgets/news/news-archive'
import { NewsListClient } from '@/widgets/news/news-list-client'
import type { NewsArchiveYear, NewsListItem, RecentNewsItem } from '@/widgets/news/model'

type NewsListPageViewProps = {
  title: string
  items: NewsListItem[]
  recentItems: RecentNewsItem[]
  archive: NewsArchiveYear[]
  pageSize: number
}

export function NewsListPageView({
  title,
  items,
  archive,
  pageSize,
}: NewsListPageViewProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft pb-20 pt-10 md:pb-24 md:pt-14">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6 flex items-center justify-center gap-4">
          <h1
            id="news-list-heading"
            className="mb-2 text-3xl font-black text-foreground sm:text-4xl"
            style={{ scrollMarginTop: '7rem' }}
          >
            {title}
          </h1>
          <span className="rounded-full bg-muted px-4 py-1.5 text-sm font-semibold text-muted-foreground">
            {items.length} публікацій
          </span>
        </div>

        <div className="grid gap-16 lg:gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <NewsListClient
              key={`${title}-${items.length}-${pageSize}`}
              items={items}
              pageSize={pageSize}
              scrollTargetId="news-list-heading"
            />
          </div>

          <aside>
            <NewsArchive items={archive} />
          </aside>
        </div>
      </div>
    </section>
  )
}
