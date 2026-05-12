import { buildPageMetadata } from '@/shared/lib/metadata'
import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { getScheduleLandingPageData } from '@/widgets/schedule/data'
import { ScheduleLandingPageView } from '@/widgets/schedule/schedule-page'

const PATHNAME = '/rozklad'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Розклад',
    description:
      'Розклад груп та викладачів коледжу з переходом до вбудованих Google Calendar сторінок.',
    pathname: PATHNAME,
  })
}

export default async function SchedulePage() {
  const [hero, data] = await Promise.all([
    getSharedInnerPageHeroData(),
    getScheduleLandingPageData(),
  ])
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <InnerPageHero
        title="Розклад"
        breadcrumbs={breadcrumbs}
        slides={hero.slides}
      />
      <ScheduleLandingPageView
        groupSections={data.groupSections}
        teacherSections={data.teacherSections}
      />
    </>
  )
}
