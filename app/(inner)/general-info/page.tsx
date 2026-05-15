import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { buildPageMetadata } from '@/shared/lib/metadata'
import { getPrimaryAdministrationContact } from '@/widgets/static-pages/data'
import { GeneralInfoPageView } from '@/widgets/static-pages/general-info-page'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'

const PATHNAME = '/general-info'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'General Information',
    description: 'General information about Zhytomyr Basic Pharmaceutical Professional College for international visitors.',
    pathname: PATHNAME,
  })
}

export default async function GeneralInfoPage() {
  const principal = await getPrimaryAdministrationContact()
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <InnerPageHero breadcrumbs={breadcrumbs} />
      <GeneralInfoPageView principal={principal} />
    </>
  )
}
