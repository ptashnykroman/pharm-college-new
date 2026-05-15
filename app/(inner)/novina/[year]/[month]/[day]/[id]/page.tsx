import { notFound, redirect } from 'next/navigation'

import { buildNewsArticleBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { buildPageMetadata } from '@/shared/lib/metadata'
import { buildNewsUrl } from '@/shared/lib/navigation'
import { buildNewsArticleJsonLd } from '@/shared/lib/seo'
import { SeoJsonLd } from '@/shared/ui/seo-json-ld'
import {
  getNewsArticleMetadata,
  getNewsArticlePageData,
  getNewsArticleStaticParams,
} from '@/widgets/news/data'
import { NewsArticlePageView } from '@/widgets/news/news-article-page'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'

type FullNewsPageProps = {
  params: Promise<{
    year: string
    month: string
    day: string
    id: string
  }>
}

export async function generateStaticParams() {
  return getNewsArticleStaticParams()
}

export async function generateMetadata({ params }: FullNewsPageProps) {
  const resolved = await params
  const metadata = await getNewsArticleMetadata(resolved.id)

  if (!metadata) {
    return buildPageMetadata({
      title: 'Новину не знайдено',
      description: 'Запитану новину не знайдено.',
      pathname: `/novina/${resolved.year}/${resolved.month}/${resolved.day}/${resolved.id}`,
      indexable: false,
    })
  }

  return buildPageMetadata(metadata)
}

export default async function FullNewsPage({ params }: FullNewsPageProps) {
  const resolved = await params
  const data = await getNewsArticlePageData(resolved.id)

  if (!data.article) {
    notFound()
  }

  const canonicalPath = buildNewsUrl(data.article.date.iso, data.article.id)
  const currentPath = `/novina/${resolved.year}/${resolved.month}/${resolved.day}/${resolved.id}`

  if (canonicalPath !== currentPath) {
    redirect(canonicalPath)
  }

  const breadcrumbs = buildNewsArticleBreadcrumbs()

  return (
    <>
      <SeoJsonLd
        data={buildNewsArticleJsonLd({
          title: data.article.title,
          description: data.article.excerpt,
          pathname: canonicalPath,
          publishedTime: data.article.date.iso,
          modifiedTime: data.article.date.iso,
          imageUrl: data.article.image?.src ?? null,
          keywords: data.article.tags,
        })}
      />
      <InnerPageHero title={data.article.title} breadcrumbs={breadcrumbs} />
      <NewsArticlePageView article={data.article} recentItems={data.recentItems} archive={data.archive} />
    </>
  )
}
