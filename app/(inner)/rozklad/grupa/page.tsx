import { buildPageMetadata } from '@/shared/lib/metadata'
import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getGroupScheduleDirectory } from '@/widgets/schedule/data'
import { GroupScheduleDirectoryPageView } from '@/widgets/schedule/schedule-page'

const PATHNAME = '/rozklad/grupa'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Групи',
    description:
      'Список академічних груп із переходом до персонального розкладу.',
    pathname: PATHNAME,
  })
}

export default async function GroupScheduleDirectoryPage() {
  const sections = await getGroupScheduleDirectory()
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <InnerPageHero
        title="Групи"
        breadcrumbs={breadcrumbs}
      />
      <GroupScheduleDirectoryPageView sections={sections} />
    </>
  )
}
