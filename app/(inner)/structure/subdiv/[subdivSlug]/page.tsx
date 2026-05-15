import { notFound } from 'next/navigation'

import { buildBreadcrumbTrail, type BreadcrumbItem } from '@/shared/lib/breadcrumbs'
import { buildPageMetadata, createPlaceholderMetadata } from '@/shared/lib/metadata'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import {
  getStructureSectionPageData,
  getStructureSectionPageMetadata,
  getStructureSectionStaticParams,
} from '@/widgets/structure-sections/data'
import { StructureSectionPageView } from '@/widgets/structure-sections/structure-section-page'

type SubdivisionDetailPageProps = {
  params: Promise<{
    subdivSlug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await getStructureSectionStaticParams('subdivision')

  return slugs.map((subdivSlug) => ({ subdivSlug }))
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
  const page = await getStructureSectionPageData('subdivision', resolved.subdivSlug)

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
      <InnerPageHero title={page.title} breadcrumbs={breadcrumbs} />
      <StructureSectionPageView page={page} badge="Підрозділ" />
    </>
  )
}
