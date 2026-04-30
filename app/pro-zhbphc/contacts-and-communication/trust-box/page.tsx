import { buildPageMetadata } from '@/shared/lib/metadata'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { TrustBoxPageView } from '@/widgets/static-pages/trust-box-page'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Скринька довіри',
    description: 'Конфіденційна сторінка для звернень щодо безпечного освітнього середовища, академічної доброчесності та інших чутливих питань.',
    pathname: '/pro-zhbphc/contacts-and-communication/trust-box',
  })
}

export default async function TrustBoxPage() {
  const hero = await getSharedInnerPageHeroData()

  return (
    <>
      <InnerPageHero title="Скринька довіри" slides={hero.slides} />
      <TrustBoxPageView />
    </>
  )
}
