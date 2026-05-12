import { buildPageMetadata } from '@/shared/lib/metadata'
import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { TeacherDirectoryPageView } from '@/widgets/personnel/teacher-directory-page'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
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
  const [hero, data] = await Promise.all([getSharedInnerPageHeroData(), getTeacherDirectoryPageData()])
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <InnerPageHero title="Викладацький склад" breadcrumbs={breadcrumbs} slides={hero.slides} />
      <TeacherDirectoryPageView commissions={data.commissions} teachers={data.teachers} />
    </>
  )
}
