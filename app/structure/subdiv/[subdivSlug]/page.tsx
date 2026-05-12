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

type SubdivisionDetailPageProps = {
  params: Promise<{
    subdivSlug: string
  }>
}

export async function generateMetadata({ params }: SubdivisionDetailPageProps) {
  const resolved = await params
  const metadata = await getStructureSectionPageMetadata('subdivision', resolved.subdivSlug)

  if (!metadata) {
    return createPlaceholderMetadata(`/structure/subdiv/${resolved.subdivSlug}`)
  }

  return buildPageMetadata(metadata)
}

export default async function SubdivisionDetailPage({ params }: SubdivisionDetailPageProps) {
  const resolved = await params
  const [hero, page] = await Promise.all([
    getSharedInnerPageHeroData(),
    getStructureSectionPageData('subdivision', resolved.subdivSlug),
  ])

  if (!page) {
    notFound()
  }

  const breadcrumbs = buildBreadcrumbTrail([
    { label: 'Структура', href: '/structure' },
    { label: 'Підрозділи', href: '/structure/subdiv' },
    { label: page.title, href: `/structure/subdiv/${resolved.subdivSlug}` },
  ] satisfies BreadcrumbItem[])

  return (
    <>
      <InnerPageHero title={page.title} breadcrumbs={breadcrumbs} slides={hero.slides} />
      <StructureSectionPageView page={page} badge="Підрозділ" />
    </>
  )
}
