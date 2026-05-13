import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { buildPageMetadata } from '@/shared/lib/metadata'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getStructureSectionCards } from '@/widgets/structure-sections/data'
import { StructureSectionListPageView } from '@/widgets/structure-sections/structure-section-list-page'

const PATHNAME = '/structure/subdiv'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Підрозділи',
    description: 'Підрозділи Житомирського базового фармацевтичного фахового коледжу.',
    pathname: PATHNAME,
  })
}

export default async function SubdivisionsPage() {
  const items = await getStructureSectionCards('subdivision')
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <InnerPageHero title="Підрозділи" breadcrumbs={breadcrumbs} />
      <StructureSectionListPageView
        badge="Підрозділи"
        title="Підрозділи"
        description="Оберіть підрозділ, щоб перейти до його окремої сторінки з описом, матеріалами та структурою."
        items={items}
      />
    </>
  )
}
