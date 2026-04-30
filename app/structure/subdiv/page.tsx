import { buildPageMetadata } from '@/shared/lib/metadata'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getStructureSectionCards } from '@/widgets/structure-sections/data'
import { StructureSectionListPageView } from '@/widgets/structure-sections/structure-section-list-page'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Підрозділи',
    description: 'Підрозділи Житомирського базового фармацевтичного фахового коледжу.',
    pathname: '/structure/subdiv',
  })
}

export default async function SubdivisionsPage() {
  const [hero, items] = await Promise.all([getSharedInnerPageHeroData(), getStructureSectionCards('subdivision')])

  return (
    <>
      <InnerPageHero title="Підрозділи" slides={hero.slides} />
      <StructureSectionListPageView
        badge="Підрозділи"
        title="Підрозділи"
        description="Оберіть підрозділ, щоб перейти до його окремої сторінки з описом, матеріалами та структурою."
        items={items}
      />
    </>
  )
}
