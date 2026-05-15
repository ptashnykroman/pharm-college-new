import { notFound } from 'next/navigation'

import { buildBreadcrumbTrail, type BreadcrumbItem } from '@/shared/lib/breadcrumbs'
import { buildPageMetadata, createPlaceholderMetadata } from '@/shared/lib/metadata'
import {
  getCycleCommissionPageData,
  getCycleCommissionPageMetadata,
  getCycleCommissionStaticParams,
} from '@/widgets/cycle-commissions/data'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { CycleCommissionPageView } from '@/widgets/cycle-commissions/cycle-commission-page'

type CycleCommissionDetailPageProps = {
  params: Promise<{
    cmkSlug: string
  }>
}

export async function generateStaticParams() {
  return getCycleCommissionStaticParams()
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
  const page = await getCycleCommissionPageData(resolved.cmkSlug)

  if (!page) {
    notFound()
  }

  const breadcrumbs = buildBreadcrumbTrail([
    { label: 'Структура', href: '/structure' },
    { label: 'Циклові комісії', href: '/structure/cmks' },
    { label: page.title, href: `/structure/cmks/${page.slug}` },
  ] satisfies BreadcrumbItem[])

  return (
    <>
      <InnerPageHero title={page.title} breadcrumbs={breadcrumbs} />
      <CycleCommissionPageView page={page} />
    </>
  )
}
