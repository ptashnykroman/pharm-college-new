import { Suspense } from 'react'

import { createHomeMetadata } from '@/shared/lib/metadata'
import { getHomeHeroViewData, getHomeMainSectionsViewData } from '@/widgets/home/data'
import { HomeMainSections, HomeMainSectionsFallback, HomePageView } from '@/widgets/home/home-page'

export const metadata = createHomeMetadata()
export const revalidate = 300

export default async function Home() {
  const sectionsPromise = getHomeMainSectionsViewData()
  const hero = await getHomeHeroViewData()

  return (
    <HomePageView hero={hero}>
      <Suspense fallback={<HomeMainSectionsFallback />}>
        <HomeMainSections sectionsPromise={sectionsPromise} />
      </Suspense>
    </HomePageView>
  )
}

// libs: embla-carousel, yet-another-react-lightbox, sentry
// test: https://live.browserstack.com/

// TODO:
// При повільному інтернеті background для header завантажується з затримкою
// Адаптація під старі браузери
// Підключити sentry
// Зробити статичну сторінку "Розклад екзаменів"
// Перевірити rich-text елементи в акордіоні
// Виправити education book компонент
// Перевірити чи генерується сторінка адміністрації
// Зробити сторінки "Матеріально-технічна база" та "Відео і 3д"
// Переробити картки на сторінці "Відомі випускники"
