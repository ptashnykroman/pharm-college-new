import { buildPageMetadata } from '@/shared/lib/metadata'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getGroupScheduleDirectory } from '@/widgets/schedule/data'
import { GroupScheduleDirectoryPageView } from '@/widgets/schedule/schedule-page'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Групи',
    description: 'Список академічних груп із переходом до персонального розкладу.',
    pathname: '/rozklad/grupa',
  })
}

export default async function GroupScheduleDirectoryPage() {
  const [hero, sections] = await Promise.all([getSharedInnerPageHeroData(), getGroupScheduleDirectory()])

  return (
    <>
      <InnerPageHero title="Групи" slides={hero.slides} />
      <GroupScheduleDirectoryPageView sections={sections} />
    </>
  )
}
