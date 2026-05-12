import { buildPageMetadata } from '@/shared/lib/metadata'
import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
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
  const [hero, sections] = await Promise.all([
    getSharedInnerPageHeroData(),
    getGroupScheduleDirectory(),
  ])
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <InnerPageHero
        title="Групи"
        breadcrumbs={breadcrumbs}
        slides={hero.slides}
      />
      <GroupScheduleDirectoryPageView sections={sections} />
    </>
  )
}
