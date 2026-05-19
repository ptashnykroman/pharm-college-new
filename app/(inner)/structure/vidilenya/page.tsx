import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { buildPageMetadata } from '@/shared/lib/metadata'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getStructureSectionCards } from '@/widgets/structure-sections/data'
import { StructureSectionListPageView } from '@/widgets/structure-sections/structure-section-list-page'

const PATHNAME = '/structure/vidilenya'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Відділення',
    description: 'Відділення Житомирського базового фармацевтичного фахового коледжу.',
    pathname: PATHNAME,
  })
}

export default async function VidilenyaPage() {
  const items = await getStructureSectionCards('vidilenya')
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <InnerPageHero breadcrumbs={breadcrumbs} />
      <StructureSectionListPageView
        badge="Відділення"
        title="Відділення"
        description="Оберіть відділення, щоб перейти до його окремої сторінки."
        items={items}
      />
    </>
  )
}
