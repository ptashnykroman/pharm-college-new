import { buildPageMetadata } from '@/shared/lib/metadata'
import { TeacherDirectoryPageView } from '@/widgets/personnel/teacher-directory-page'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { getTeacherDirectoryPageData } from '@/widgets/personnel/data'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Викладацький склад',
    description: 'Викладацький склад Житомирського базового фармацевтичного фахового коледжу.',
    pathname: '/pro-zhbphc/viklad-sklad',
  })
}

export default async function TeacherDirectoryPage() {
  const [hero, data] = await Promise.all([getSharedInnerPageHeroData(), getTeacherDirectoryPageData()])

  return (
    <>
      <InnerPageHero title="Викладацький склад" slides={hero.slides} />
      <TeacherDirectoryPageView commissions={data.commissions} teachers={data.teachers} />
    </>
  )
}
