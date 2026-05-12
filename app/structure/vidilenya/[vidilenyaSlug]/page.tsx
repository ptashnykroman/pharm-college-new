import { notFound } from 'next/navigation'

import { buildBreadcrumbTrail, type BreadcrumbItem } from '@/shared/lib/breadcrumbs'
import { buildPageMetadata, createPlaceholderMetadata } from '@/shared/lib/metadata'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import {
  getStructureSectionPageData,
  getStructureSectionPageMetadata,
} from '@/widgets/structure-sections/data'
import { StructureSectionPageView } from '@/widgets/structure-sections/structure-section-page'

type VidilenyaDetailPageProps = {
  params: Promise<{
    vidilenyaSlug: string
  }>
}

export async function generateMetadata({ params }: VidilenyaDetailPageProps) {
  const resolved = await params
  const metadata = await getStructureSectionPageMetadata('vidilenya', resolved.vidilenyaSlug)

  if (!metadata) {
    return createPlaceholderMetadata(`/structure/vidilenya/${resolved.vidilenyaSlug}`)
  }

  return buildPageMetadata(metadata)
}

export default async function VidilenyaDetailPage({ params }: VidilenyaDetailPageProps) {
  const resolved = await params
  const [hero, page] = await Promise.all([
    getSharedInnerPageHeroData(),
    getStructureSectionPageData('vidilenya', resolved.vidilenyaSlug),
  ])

  if (!page) {
    notFound()
  }

  const breadcrumbs = buildBreadcrumbTrail([
    { label: 'Структура', href: '/structure' },
    { label: 'Відділення', href: '/structure/vidilenya' },
    { label: page.title, href: `/structure/vidilenya/${resolved.vidilenyaSlug}` },
  ] satisfies BreadcrumbItem[])

  return (
    <>
      <InnerPageHero title={page.title} breadcrumbs={breadcrumbs} slides={hero.slides} />
      <StructureSectionPageView page={page} badge="Відділення" />
    </>
  )
}
