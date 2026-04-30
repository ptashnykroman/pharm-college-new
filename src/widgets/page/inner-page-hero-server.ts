import { cache } from 'react'

import { getHomeHero } from '@/shared/api/graphql/sdk'
import { buildInnerPageHeroViewModel } from '@/widgets/page/inner-page-hero-data'

export const getSharedInnerPageHeroData = cache(async () => {
  const heroData = await getHomeHero()

  return buildInnerPageHeroViewModel(heroData)
})
