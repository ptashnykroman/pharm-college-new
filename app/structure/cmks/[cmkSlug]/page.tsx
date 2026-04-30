import { notFound } from 'next/navigation'

import { buildPageMetadata, createPlaceholderMetadata } from '@/shared/lib/metadata'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import {
  getCycleCommissionPageData,
  getCycleCommissionPageMetadata,
} from '@/widgets/cycle-commissions/data'
import { CycleCommissionPageView } from '@/widgets/cycle-commissions/cycle-commission-page'

type CycleCommissionDetailPageProps = {
  params: Promise<{
    cmkSlug: string
  }>
}

export async function generateMetadata({ params }: CycleCommissionDetailPageProps) {
  const resolved = await params
  const metadata = await getCycleCommissionPageMetadata(resolved.cmkSlug)

  if (!metadata) {
    return createPlaceholderMetadata(`/structure/cmks/${resolved.cmkSlug}`)
  }

  return buildPageMetadata(metadata)
}

export default async function CycleCommissionDetailPage({ params }: CycleCommissionDetailPageProps) {
  const resolved = await params
  const [hero, page] = await Promise.all([
    getSharedInnerPageHeroData(),
    getCycleCommissionPageData(resolved.cmkSlug),
  ])

  if (!page) {
    notFound()
  }

  return (
    <>
      <InnerPageHero title={page.title} slides={hero.slides} />
      <CycleCommissionPageView page={page} />
    </>
  )
}
