import { buildPageMetadata } from '@/shared/lib/metadata'
import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { AdministrationPageView } from '@/widgets/personnel/administration-page'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getAdministrationPageData } from '@/widgets/personnel/data'

const PATHNAME = '/pro-zhbphc/administracia'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Адміністрація',
    description: 'Адміністрація Житомирського базового фармацевтичного фахового коледжу.',
    pathname: PATHNAME,
  })
}

export default async function AdministrationPage() {
  const people = await getAdministrationPageData()
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <InnerPageHero title="Адміністрація" breadcrumbs={breadcrumbs} />
      <AdministrationPageView people={people} />
    </>
  )
}
