import { buildPageMetadata } from '@/shared/lib/metadata'
import { AdministrationPageView } from '@/widgets/personnel/administration-page'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { getAdministrationPageData } from '@/widgets/personnel/data'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Адміністрація',
    description: 'Адміністрація Житомирського базового фармацевтичного фахового коледжу.',
    pathname: '/pro-zhbphc/administracia',
  })
}

export default async function AdministrationPage() {
  const [hero, people] = await Promise.all([getSharedInnerPageHeroData(), getAdministrationPageData()])

  return (
    <>
      <InnerPageHero title="Адміністрація" slides={hero.slides} />
      <AdministrationPageView people={people} />
    </>
  )
}
