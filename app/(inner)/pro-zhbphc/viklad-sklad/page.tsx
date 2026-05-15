import { buildPageMetadata } from '@/shared/lib/metadata'
import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { TeacherDirectoryPageView } from '@/widgets/personnel/teacher-directory-page'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getTeacherDirectoryPageData } from '@/widgets/personnel/data'

const PATHNAME = '/pro-zhbphc/viklad-sklad'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Викладацький склад',
    description: 'Викладацький склад Житомирського базового фармацевтичного фахового коледжу.',
    pathname: PATHNAME,
  })
}

export default async function TeacherDirectoryPage() {
  const data = await getTeacherDirectoryPageData()
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <InnerPageHero breadcrumbs={breadcrumbs} />
      <TeacherDirectoryPageView commissions={data.commissions} teachers={data.teachers} />
    </>
  )
}
