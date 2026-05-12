import { buildPageMetadata } from '@/shared/lib/metadata'
import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { getTeacherScheduleDirectory } from '@/widgets/schedule/data'
import { TeacherScheduleDirectoryPageView } from '@/widgets/schedule/schedule-page'

const PATHNAME = '/rozklad/vikladach'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Викладачі',
    description:
      'Список викладачів із переходом до персонального розкладу.',
    pathname: PATHNAME,
  })
}

export default async function TeacherScheduleDirectoryPage() {
  const [hero, sections] = await Promise.all([
    getSharedInnerPageHeroData(),
    getTeacherScheduleDirectory(),
  ])
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <InnerPageHero
        title="Викладачі"
        breadcrumbs={breadcrumbs}
        slides={hero.slides}
      />
      <TeacherScheduleDirectoryPageView sections={sections} />
    </>
  )
}
