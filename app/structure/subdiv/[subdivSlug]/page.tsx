import { notFound } from 'next/navigation'

import { buildPageMetadata, createPlaceholderMetadata } from '@/shared/lib/metadata'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
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

  return (
    <>
      <InnerPageHero title={page.title} slides={hero.slides} />
      <StructureSectionPageView page={page} badge="Підрозділ" />
    </>
  )
}
