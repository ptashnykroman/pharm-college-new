import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { buildPageMetadata } from '@/shared/lib/metadata'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getExamSchedulePageData } from '@/widgets/schedule/data'
import { ExamSchedulePageView } from '@/widgets/schedule/schedule-page'

const PATHNAME = '/exam-schedule'

export async function generateMetadata() {
  const page = await getExamSchedulePageData()

  return buildPageMetadata({
    title: page.title,
    description: page.subtitle,
    pathname: PATHNAME,
  })
}

export default async function ExamSchedulePage() {
  const page = await getExamSchedulePageData()
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <InnerPageHero breadcrumbs={breadcrumbs} />
      <ExamSchedulePageView page={page} />
    </>
  )
}
