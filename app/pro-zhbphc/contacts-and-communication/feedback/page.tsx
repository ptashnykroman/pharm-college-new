import { buildPageMetadata } from '@/shared/lib/metadata'
import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { FeedbackPageView } from '@/widgets/static-pages/feedback-page'

const PATHNAME = '/pro-zhbphc/contacts-and-communication/feedback'

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Зворотний зв'язок",
    description: "Форма зворотного зв'язку для звернень, пропозицій та запитань до коледжу.",
    pathname: PATHNAME,
  })
}

export default async function FeedbackPage() {
  const hero = await getSharedInnerPageHeroData()
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <InnerPageHero title="Зворотний зв'язок" breadcrumbs={breadcrumbs} slides={hero.slides} />
      <FeedbackPageView />
    </>
  )
}
