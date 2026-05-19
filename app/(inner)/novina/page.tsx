import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { buildPageMetadata } from '@/shared/lib/metadata'
import { getNewsListPageData } from '@/widgets/news/data'
import { NewsListPageView } from '@/widgets/news/news-list-page'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'

const PATHNAME = '/novina'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Всі новини',
    description: 'Актуальні новини та оголошення ЖБФФК.',
    pathname: PATHNAME,
  })
}

export default async function NewsIndexPage() {
  const data = await getNewsListPageData({ pageSize: 12 })
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <InnerPageHero breadcrumbs={breadcrumbs} />
      <NewsListPageView {...data} />
    </>
  )
}
