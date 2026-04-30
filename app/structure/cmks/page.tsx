import { buildPageMetadata } from '@/shared/lib/metadata'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getCycleCommissionCards } from '@/widgets/cycle-commissions/data'
import { CycleCommissionsListPageView } from '@/widgets/cycle-commissions/cycle-commissions-list-page'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Циклові комісії',
    description: 'Циклові комісії Житомирського базового фармацевтичного фахового коледжу.',
    pathname: '/structure/cmks',
  })
}

export default async function CycleCommissionsPage() {
  const [hero, items] = await Promise.all([getSharedInnerPageHeroData(), getCycleCommissionCards()])

  return (
    <>
      <InnerPageHero title="Циклові комісії" slides={hero.slides} />
      <CycleCommissionsListPageView items={items} />
    </>
  )
}
