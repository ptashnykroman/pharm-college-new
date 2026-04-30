import { cache } from 'react'
import { notFound } from 'next/navigation'

import { getHomeHero } from '@/shared/api/graphql/sdk'
import { buildPageMetadata } from '@/shared/lib/metadata'
import { getNewsListPageData } from '@/widgets/news/data'
import { getNewsListingTitle } from '@/widgets/news/model'
import { NewsListPageView } from '@/widgets/news/news-list-page'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { buildInnerPageHeroViewModel } from '@/widgets/page/inner-page-hero-data'

type NewsArchivePageProps = {
  params: Promise<{
    year: string
    month: string
  }>
}

const getSharedHero = cache(async () => {
  const heroData = await getHomeHero()

  return buildInnerPageHeroViewModel(heroData)
})

function isValidMonth(month: string) {
  return /^(0[1-9]|1[0-2])$/.test(month)
}

export async function generateMetadata({ params }: NewsArchivePageProps) {
  const resolved = await params

  if (!isValidMonth(resolved.month)) {
    return buildPageMetadata({
      title: 'Архів новин',
      description: 'Архів новин коледжу.',
      pathname: `/novina/${resolved.year}/${resolved.month}`,
      indexable: false,
    })
  }

  const title = getNewsListingTitle(resolved.year, resolved.month)

  return buildPageMetadata({
    title,
    description: `${title}. Архів публікацій коледжу за обраний місяць.`,
    pathname: `/novina/${resolved.year}/${resolved.month}`,
  })
}

export default async function NewsArchivePage({ params }: NewsArchivePageProps) {
  const resolved = await params

  if (!isValidMonth(resolved.month)) {
    notFound()
  }

  const [hero, data] = await Promise.all([
    getSharedHero(),
    getNewsListPageData({
      year: resolved.year,
      month: resolved.month,
      pageSize: 12,
    }),
  ])

  return (
    <>
      <InnerPageHero title={data.title} slides={hero.slides} />
      <NewsListPageView {...data} />
    </>
  )
}
