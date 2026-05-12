import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { buildPageMetadata } from '@/shared/lib/metadata'
import { getPrimaryAdministrationContact } from '@/widgets/static-pages/data'
import { GeneralInfoPageView } from '@/widgets/static-pages/general-info-page'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'

const PATHNAME = '/general-info'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'General Information',
    description: 'General information about Zhytomyr Basic Pharmaceutical Professional College for international visitors.',
    pathname: PATHNAME,
  })
}

export default async function GeneralInfoPage() {
  const [hero, principal] = await Promise.all([getSharedInnerPageHeroData(), getPrimaryAdministrationContact()])
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <InnerPageHero title="General Information" breadcrumbs={breadcrumbs} slides={hero.slides} />
      <GeneralInfoPageView principal={principal} />
    </>
  )
}
