import { buildPageMetadata } from '@/shared/lib/metadata'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { FeedbackPageView } from '@/widgets/static-pages/feedback-page'

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Зворотний зв'язок",
    description: "Форма зворотного зв'язку для звернень, пропозицій та запитань до коледжу.",
    pathname: '/pro-zhbphc/contacts-and-communication/feedback',
  })
}

export default async function FeedbackPage() {
  const hero = await getSharedInnerPageHeroData()

  return (
    <>
      <InnerPageHero title="Зворотний зв'язок" slides={hero.slides} />
      <FeedbackPageView />
    </>
  )
}
