import { notFound } from 'next/navigation'

import { buildPageMetadata, createPlaceholderMetadata } from '@/shared/lib/metadata'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { TeacherProfilePageView } from '@/widgets/personnel/teacher-profile-page'
import { getTeacherProfileMetadata, getTeacherProfilePageData } from '@/widgets/personnel/data'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'

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

  return (
    <>
      <InnerPageHero title={teacher.name} slides={hero.slides} />
      <TeacherProfilePageView teacher={teacher} />
    </>
  )
}
