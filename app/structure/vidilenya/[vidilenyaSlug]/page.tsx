import { notFound } from 'next/navigation'

import { buildPageMetadata, createPlaceholderMetadata } from '@/shared/lib/metadata'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
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

  return (
    <>
      <InnerPageHero title={page.title} slides={hero.slides} />
      <StructureSectionPageView page={page} badge="Відділення" />
    </>
  )
}
