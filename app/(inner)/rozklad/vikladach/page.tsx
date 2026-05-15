import { buildPageMetadata } from '@/shared/lib/metadata'
import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
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
  const sections = await getTeacherScheduleDirectory()
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <InnerPageHero
        title="Викладачі"
        breadcrumbs={breadcrumbs}
      />
      <TeacherScheduleDirectoryPageView sections={sections} />
    </>
  )
}
