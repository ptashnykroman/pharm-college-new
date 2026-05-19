import { buildPageMetadata } from '@/shared/lib/metadata'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { getScheduleLandingPageData } from '@/widgets/schedule/data'
import { ScheduleLandingPageView } from '@/widgets/schedule/schedule-page'

const PATHNAME = '/rozklad'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Розклад',
    description: 'Розклад груп та викладачів коледжу.',
    pathname: PATHNAME,
  })
}

export default async function SchedulePage() {
  const data = await getScheduleLandingPageData()
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <InnerPageHero breadcrumbs={breadcrumbs} />
      <ScheduleLandingPageView groupSections={data.groupSections} teacherSections={data.teacherSections} />
    </>
  )
}
