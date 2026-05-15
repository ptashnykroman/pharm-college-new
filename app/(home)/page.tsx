import { Suspense } from 'react'

import { createHomeMetadata } from '@/shared/lib/metadata'
import { getHomeHeroViewData, getHomeMainSectionsViewData } from '@/widgets/home/data'
import { HomeMainSections, HomeMainSectionsFallback, HomePageView } from '@/widgets/home/home-page'

export const metadata = createHomeMetadata()
export const revalidate = 300

type HomePageContentProps = {
  heroPromise: ReturnType<typeof getHomeHeroViewData>
  sectionsPromise: ReturnType<typeof getHomeMainSectionsViewData>
}

export default function Home() {
  const heroPromise = getHomeHeroViewData()
  const sectionsPromise = getHomeMainSectionsViewData()

  return <HomePageContent heroPromise={heroPromise} sectionsPromise={sectionsPromise} />
}

async function HomePageContent({ heroPromise, sectionsPromise }: HomePageContentProps) {
  const hero = await heroPromise

  return (
    <HomePageView hero={hero}>
      <Suspense fallback={<HomeMainSectionsFallback />}>
        <HomeMainSections sectionsPromise={sectionsPromise} />
      </Suspense>
    </HomePageView>
  )
}