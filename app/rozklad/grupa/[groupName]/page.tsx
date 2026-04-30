import { notFound } from 'next/navigation'

import { buildPageMetadata, createPlaceholderMetadata } from '@/shared/lib/metadata'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getGroupSchedulePageData } from '@/widgets/schedule/data'
import { EmbeddedSchedulePageView } from '@/widgets/schedule/schedule-page'

type GroupSchedulePageProps = {
  params: Promise<{
    groupName: string
  }>
}

export async function generateMetadata({ params }: GroupSchedulePageProps) {
  const resolved = await params
  const item = await getGroupSchedulePageData(resolved.groupName)
  const encodedGroupName = encodeURIComponent(resolved.groupName)

  if (!item) {
    return createPlaceholderMetadata(`/rozklad/grupa/${encodedGroupName}`)
  }

  return buildPageMetadata({
    title: item.title,
    description: item.subtitle,
    pathname: `/rozklad/grupa/${encodedGroupName}`,
  })
}

export default async function GroupSchedulePage({ params }: GroupSchedulePageProps) {
  const resolved = await params
  const [hero, item] = await Promise.all([getSharedInnerPageHeroData(), getGroupSchedulePageData(resolved.groupName)])

  if (!item) {
    notFound()
  }

  return (
    <>
      <InnerPageHero title={item.title} slides={hero.slides} />
      <EmbeddedSchedulePageView item={item} />
    </>
  )
}
