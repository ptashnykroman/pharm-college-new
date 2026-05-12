import { buildPageMetadata } from '@/shared/lib/metadata'
import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getAdministrationPageData } from '@/widgets/personnel/data'
import { ContactsPageView } from '@/widgets/static-pages/contacts-page'

const PATHNAME = '/pro-zhbphc/kontakty'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Контакти',
    description: 'Контактні дані адміністрації, карта та форма звернення до коледжу.',
    pathname: PATHNAME,
  })
}

export default async function ContactsPage() {
  const [hero, people] = await Promise.all([getSharedInnerPageHeroData(), getAdministrationPageData()])
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <InnerPageHero title="Контакти" breadcrumbs={breadcrumbs} slides={hero.slides} />
      <ContactsPageView people={people} />
    </>
  )
}
