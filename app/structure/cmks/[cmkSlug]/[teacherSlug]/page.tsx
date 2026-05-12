import { notFound } from 'next/navigation'

import { buildBreadcrumbTrail, type BreadcrumbItem } from '@/shared/lib/breadcrumbs'
import { buildPageMetadata, createPlaceholderMetadata } from '@/shared/lib/metadata'
import { TeacherProfilePageView } from '@/widgets/personnel/teacher-profile-page'
import { getTeacherProfileMetadata, getTeacherProfilePageData } from '@/widgets/personnel/data'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'

type TeacherProfilePageProps = {
  params: Promise<{
    cmkSlug: string
    teacherSlug: string
  }>
}

export async function generateMetadata({ params }: TeacherProfilePageProps) {
  const resolved = await params
  const metadata = await getTeacherProfileMetadata(resolved.cmkSlug, resolved.teacherSlug)

  if (!metadata) {
    return createPlaceholderMetadata(`/structure/cmks/${resolved.cmkSlug}/${resolved.teacherSlug}`)
  }

  return buildPageMetadata(metadata)
}

export default async function TeacherProfilePage({ params }: TeacherProfilePageProps) {
  const resolved = await params
  const [hero, teacher] = await Promise.all([
    getSharedInnerPageHeroData(),
    getTeacherProfilePageData(resolved.cmkSlug, resolved.teacherSlug),
  ])

  if (!teacher) {
    notFound()
  }

  const breadcrumbs = buildBreadcrumbTrail([
    { label: 'Структура', href: '/structure' },
    { label: 'Циклові комісії', href: '/structure/cmks' },
    { label: teacher.cycleCommission.name, href: `/structure/cmks/${teacher.cycleCommission.slug}` },
    { label: teacher.name, href: `/structure/cmks/${teacher.cycleCommission.slug}/${teacher.slug}` },
  ] satisfies BreadcrumbItem[])

  return (
    <>
      <InnerPageHero title={teacher.name} breadcrumbs={breadcrumbs} slides={hero.slides} />
      <TeacherProfilePageView teacher={teacher} />
    </>
  )
}
