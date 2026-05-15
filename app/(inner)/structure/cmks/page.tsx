import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { buildPageMetadata } from '@/shared/lib/metadata'
import { getCycleCommissionCards } from '@/widgets/cycle-commissions/data'
import { CycleCommissionsListPageView } from '@/widgets/cycle-commissions/cycle-commissions-list-page'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'

const PATHNAME = '/structure/cmks'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Циклові комісії',
    description: 'Циклові комісії Житомирського базового фармацевтичного фахового коледжу.',
    pathname: PATHNAME,
  })
}

export default async function CycleCommissionsPage() {
  const items = await getCycleCommissionCards()
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <InnerPageHero breadcrumbs={breadcrumbs} />
      <CycleCommissionsListPageView items={items} />
    </>
  )
}
