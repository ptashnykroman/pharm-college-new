import { notFound } from 'next/navigation'

import { buildPageMetadata, createPlaceholderMetadata } from '@/shared/lib/metadata'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getTeacherSchedulePageData } from '@/widgets/schedule/data'
import { EmbeddedSchedulePageView } from '@/widgets/schedule/schedule-page'

type TeacherSchedulePageProps = {
  params: Promise<{
    teacherSlug: string
  }>
}

export async function generateMetadata({ params }: TeacherSchedulePageProps) {
  const resolved = await params
  const item = await getTeacherSchedulePageData(resolved.teacherSlug)

  if (!item) {
    return createPlaceholderMetadata(`/rozklad/vikladach/${resolved.teacherSlug}`)
  }

  return buildPageMetadata({
    title: item.title,
    description: item.subtitle,
    pathname: `/rozklad/vikladach/${resolved.teacherSlug}`,
  })
}

export default async function TeacherSchedulePage({ params }: TeacherSchedulePageProps) {
  const resolved = await params
  const [hero, item] = await Promise.all([getSharedInnerPageHeroData(), getTeacherSchedulePageData(resolved.teacherSlug)])

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
