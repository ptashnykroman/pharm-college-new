import { NewsArchive } from '@/widgets/news/news-archive'
import { NewsListClient } from '@/widgets/news/news-list-client'
import type { NewsArchiveYear, NewsListItem, RecentNewsItem } from '@/widgets/news/model'

export function NewsListPageView({
  title,
  items,
  recentItems,
  archive,
  pageSize,
}: {
  title: string
  items: NewsListItem[]
  recentItems: RecentNewsItem[]
  archive: NewsArchiveYear[]
  pageSize: number
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft pb-20 pt-10 md:pb-24 md:pt-14">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center items-center gap-4 mb-6">
          <h1 className="mb-2 text-3xl font-black text-foreground sm:text-4xl">{title}</h1>
          <span className="rounded-full bg-muted px-4 py-1.5 text-sm font-semibold text-muted-foreground">
            {items.length} публікацій
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] xl:gap-6">
          <div>
            <NewsListClient key={`${title}-${items.length}-${pageSize}`} items={items} pageSize={pageSize} />
          </div>

          <aside>
            <NewsArchive items={archive} />
          </aside>
        </div>
      </div>
    </section>
  )
}
