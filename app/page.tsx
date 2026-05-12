import { createHomeMetadata } from '@/shared/lib/metadata'
import { getHomePageViewData } from '@/widgets/home/data'
import { HomePageView } from '@/widgets/home/home-page'

export const metadata = createHomeMetadata()
export const revalidate = 300

export default async function Home() {
  const data = await getHomePageViewData()

  return <HomePageView data={data} />
}
// libs: embla-carousel, yet-another-react-lightbox, sentry
// test: https://live.browserstack.com/

// TODO:
// Оптимізувати слайдер на сторінці ЦК
// На сторінці ЦК, голову ЦК зробити PersonCard
// В галереї новин на фото додати "Розширити/Детальніше"