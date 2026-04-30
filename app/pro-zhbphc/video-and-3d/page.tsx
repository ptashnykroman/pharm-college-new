import { buildPageMetadata } from '@/shared/lib/metadata'
import { getSharedInnerPageHeroData } from '@/widgets/page/inner-page-hero-server'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getVideoAnd3dPageData } from '@/widgets/static-pages/data'
import { VideoAnd3dPageView } from '@/widgets/static-pages/video-and-3d-page'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Відео та 3D-панорами',
    description: 'Добірка відео та 3D-панорам коледжу з повноекранним переглядом.',
    pathname: '/pro-zhbphc/video-and-3d',
  })
}

export default async function VideoAnd3dPage() {
  const [hero, data] = await Promise.all([getSharedInnerPageHeroData(), getVideoAnd3dPageData()])

  return (
    <>
      <InnerPageHero title="Відео та 3D-панорами" slides={hero.slides} />
      <VideoAnd3dPageView data={data} />
    </>
  )
}
