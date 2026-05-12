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

export default async function TeacherSchedulePage({
  params,
}: TeacherSchedulePageProps) {
  const resolved = await params
  const [hero, item] = await Promise.all([
    getSharedInnerPageHeroData(),
    getTeacherSchedulePageData(resolved.teacherSlug),
  ])

  if (!item) {
    notFound()
  }

  const breadcrumbs = buildBreadcrumbTrail([
    { label: 'Розклад', href: '/rozklad' },
    { label: 'Викладачі', href: '/rozklad/vikladach' },
    {
      label: item.title,
      href: `/rozklad/vikladach/${encodeURIComponent(resolved.teacherSlug)}`,
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
