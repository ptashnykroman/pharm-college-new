import { buildPageMetadata } from '@/shared/lib/metadata'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { GeneralInfoPageView } from '@/widgets/static-pages/general-info-page'
import { getPrimaryAdministrationContact } from '@/widgets/static-pages/data'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'General Information',
    description: 'General information about Zhytomyr Basic Pharmaceutical Professional College for international visitors.',
    pathname: '/general-info',
  })
}

export default async function GeneralInfoPage() {
  const [hero, principal] = await Promise.all([getSharedInnerPageHeroData(), getPrimaryAdministrationContact()])

  return (
    <>
      <InnerPageHero title="General Information" slides={hero.slides} />
      <GeneralInfoPageView principal={principal} />
    </>
  )
}
