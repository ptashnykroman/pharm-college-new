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
import {
  decodeScheduleRouteParam,
  getGroupSchedulePageData,
  getGroupScheduleStaticParams,
} from '@/widgets/schedule/data'
import { EmbeddedSchedulePageView } from '@/widgets/schedule/schedule-page'

type GroupSchedulePageProps = {
  params: Promise<{
    groupName: string
  }>
}

export async function generateStaticParams() {
  return getGroupScheduleStaticParams()
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
  const item = await getGroupSchedulePageData(groupName)

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
      />
      <EmbeddedSchedulePageView item={item} />
    </>
  )
}
