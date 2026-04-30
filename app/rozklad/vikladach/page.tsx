import { buildPageMetadata } from '@/shared/lib/metadata'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getTeacherScheduleDirectory } from '@/widgets/schedule/data'
import { TeacherScheduleDirectoryPageView } from '@/widgets/schedule/schedule-page'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Викладачі',
    description: 'Список викладачів із переходом до персонального розкладу.',
    pathname: '/rozklad/vikladach',
  })
}

export default async function TeacherScheduleDirectoryPage() {
  const [hero, sections] = await Promise.all([getSharedInnerPageHeroData(), getTeacherScheduleDirectory()])

  return (
    <>
      <InnerPageHero title="Викладачі" slides={hero.slides} />
      <TeacherScheduleDirectoryPageView sections={sections} />
    </>
  )
}
