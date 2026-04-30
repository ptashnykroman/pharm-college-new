import { buildPageMetadata } from '@/shared/lib/metadata'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getAdministrationPageData } from '@/widgets/personnel/data'
import { ContactsPageView } from '@/widgets/static-pages/contacts-page'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Контакти',
    description: 'Контактні дані адміністрації, карта та форма звернення до коледжу.',
    pathname: '/pro-zhbphc/kontakty',
  })
}

export default async function ContactsPage() {
  const [hero, people] = await Promise.all([getSharedInnerPageHeroData(), getAdministrationPageData()])

  return (
    <>
      <InnerPageHero title="Контакти" slides={hero.slides} />
      <ContactsPageView people={people} />
    </>
  )
}
