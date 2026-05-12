import { notFound } from 'next/navigation'

import {
  buildBreadcrumbTrail,
  type BreadcrumbItem,
} from '@/shared/lib/breadcrumbs'
import {
  buildPageMetadata,
  createPlaceholderMetadata,
} from '@/shared/lib/metadata'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import {
  decodeScheduleRouteParam,
  getGroupSchedulePageData,
} from '@/widgets/schedule/data'
import { EmbeddedSchedulePageView } from '@/widgets/schedule/schedule-page'

type GroupSchedulePageProps = {
  params: Promise<{
    groupName: string
  }>
}

export async function generateMetadata({ params }: GroupSchedulePageProps) {
  const resolved = await params
  const groupName = decodeScheduleRouteParam(resolved.groupName)
  const item = await getGroupSchedulePageData(groupName)
  const encodedGroupName = encodeURIComponent(groupName)

  if (!item) {
    return createPlaceholderMetadata(`/rozklad/grupa/${encodedGroupName}`)
  }

  return buildPageMetadata({
    title: item.title,
    description: item.subtitle,
    pathname: `/rozklad/grupa/${encodedGroupName}`,
  })
}

export default async function GroupSchedulePage({
  params,
}: GroupSchedulePageProps) {
  const resolved = await params
  const groupName = decodeScheduleRouteParam(resolved.groupName)
  const [hero, item] = await Promise.all([
    getSharedInnerPageHeroData(),
    getGroupSchedulePageData(groupName),
  ])

  if (!item) {
    notFound()
  }

  const encodedGroupName = encodeURIComponent(groupName)
  const breadcrumbs = buildBreadcrumbTrail([
    { label: 'Розклад', href: '/rozklad' },
    { label: 'Групи', href: '/rozklad/grupa' },
    {
      label: groupName,
      href: `/rozklad/grupa/${encodedGroupName}`,
    },
  ] satisfies BreadcrumbItem[])

  return (
    <>
      <InnerPageHero
        title={item.title}
        breadcrumbs={breadcrumbs}
        slides={hero.slides}
      />
      <EmbeddedSchedulePageView item={item} />
    </>
  )
}
