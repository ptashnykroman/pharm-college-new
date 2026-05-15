import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { buildPageMetadata } from '@/shared/lib/metadata'
import { buildContactPageJsonLd } from '@/shared/lib/seo'
import { SeoJsonLd } from '@/shared/ui/seo-json-ld'
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
  const people = await getAdministrationPageData()
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <SeoJsonLd data={buildContactPageJsonLd()} />
      <InnerPageHero title="Контакти" breadcrumbs={breadcrumbs} />
      <ContactsPageView people={people} />
    </>
  )
}
