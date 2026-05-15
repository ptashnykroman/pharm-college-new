import { notFound } from 'next/navigation'

import { buildNewsArchiveBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { buildPageMetadata } from '@/shared/lib/metadata'
import { getNewsArchiveStaticParams, getNewsListPageData } from '@/widgets/news/data'
import { getNewsListingTitle } from '@/widgets/news/model'
import { NewsListPageView } from '@/widgets/news/news-list-page'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'

type NewsArchivePageProps = {
  params: Promise<{
    year: string
    month: string
  }>
}

function isValidMonth(month: string) {
  return /^(0[1-9]|1[0-2])$/.test(month)
}

export async function generateStaticParams() {
  return getNewsArchiveStaticParams()
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

  const data = await getNewsListPageData({
    year: resolved.year,
    month: resolved.month,
    pageSize: 12,
  })
  const breadcrumbs = buildNewsArchiveBreadcrumbs(resolved.year, resolved.month)

  return (
    <>
      <InnerPageHero breadcrumbs={breadcrumbs} />
      <NewsListPageView {...data} />
    </>
  )
}
