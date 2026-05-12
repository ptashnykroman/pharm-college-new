import { cache } from 'react'

import { getHomeHero } from '@/shared/api/graphql/sdk'
import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { buildPageMetadata } from '@/shared/lib/metadata'
import { getNewsListPageData } from '@/widgets/news/data'
import { NewsListPageView } from '@/widgets/news/news-list-page'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { buildInnerPageHeroViewModel } from '@/widgets/page/inner-page-hero-data'

const PATHNAME = '/novina'

const getSharedHero = cache(async () => {
  const heroData = await getHomeHero()

  return buildInnerPageHeroViewModel(heroData)
})

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Всі новини',
    description: 'Актуальні новини, події та оголошення ЖБФФК.',
    pathname: PATHNAME,
  })
}

export default async function NewsIndexPage() {
  const [hero, data] = await Promise.all([getSharedHero(), getNewsListPageData({ pageSize: 12 })])
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <InnerPageHero title={data.title} breadcrumbs={breadcrumbs} slides={hero.slides} />
      <NewsListPageView {...data} />
    </>
  )
}
