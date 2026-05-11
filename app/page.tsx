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
// Зробити кастомний button-link не на основі <button> щоб текст в кнопці переносився по рядкам
// Для <code> зробити background transparent
// На сторінці ЦК, голову ЦК зробити PersonCard
