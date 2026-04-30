import { buildPageMetadata } from '@/shared/lib/metadata'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getStructureSectionCards } from '@/widgets/structure-sections/data'
import { StructureSectionListPageView } from '@/widgets/structure-sections/structure-section-list-page'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Відділення',
    description: 'Відділення Житомирського базового фармацевтичного фахового коледжу.',
    pathname: '/structure/vidilenya',
  })
}

export default async function VidilenyaPage() {
  const [hero, items] = await Promise.all([getSharedInnerPageHeroData(), getStructureSectionCards('vidilenya')])

  return (
    <>
      <InnerPageHero title="Відділення" slides={hero.slides} />
      <StructureSectionListPageView
        badge="Відділення"
        title="Відділення"
        description="Оберіть відділення, щоб перейти до його окремої сторінки з описом, матеріалами та структурою."
        items={items}
      />
    </>
  )
}
