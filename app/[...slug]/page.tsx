import { cache } from 'react'
import { notFound } from 'next/navigation'

import { CmsPage } from '@/widgets/page/cms-page'
import { resolveImage } from '@/shared/lib/media'
import { getSiteChromeData } from '@/widgets/header/data'
import { AppButton } from '@/components/shared/app-button'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { getHomeHero, getPageByPath } from '@/shared/api/graphql/sdk'
import { buildInnerPageHeroViewModel } from '@/widgets/page/inner-page-hero-data'
import { flattenNavigationPaths, isKnownLegacyPath } from '@/shared/lib/navigation'
import { buildPageMetadata, createPlaceholderMetadata } from '@/shared/lib/metadata'

type DynamicPageProps = {
  params: Promise<{
    slug?: string[]
  }>
}

function resolvePathname(slug: string[] | undefined) {
  const pathname = `/${(slug ?? []).join('/')}`.replace(/\/$/, '')

  return pathname || '/'
}

const getPageData = cache(async (pathname: string) => {
  const data = await getPageByPath(pathname)

  return data.pages?.data[0]?.attributes ?? null
})

const getSharedInnerPageHero = cache(async () => {
  const heroData = await getHomeHero()

  return buildInnerPageHeroViewModel(heroData)
})

export async function generateMetadata({ params }: DynamicPageProps) {
  const resolved = await params
  const pathname = resolvePathname(resolved.slug)
  const page = await getPageData(pathname)

  if (!page) {
    return createPlaceholderMetadata(pathname)
  }

  const previewImage = resolveImage(page.main_photo, 'hero', page.title)

  return buildPageMetadata({
    title: page.SEO.title || page.title,
    description: page.SEO.description,
    pathname,
    image: previewImage?.src,
    meta: page.SEO.meta,
  })
}

function PlaceholderPage({ pathname }: { pathname: string }) {
  return (
    <div className="container mx-auto px-4 pb-20 pt-10 md:px-6 md:pt-14">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-border/80 bg-white p-8 text-center shadow-card md:p-12">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Сторінка в роботі</div>
        <p className="mt-5 text-lg leading-8 text-foreground/80">
          Маршрут <span className="font-semibold text-foreground">{pathname}</span> вже розпізнано, але його окрема
          реалізація ще переноситься зі старого сайту.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <AppButton href="/" shape="rounded">
            На головну
          </AppButton>
        </div>
      </div>
    </div>
  )
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const resolved = await params
  const pathname = resolvePathname(resolved.slug)
  const pagePromise = getPageData(pathname)
  const heroPromise = getSharedInnerPageHero()
  const page = await pagePromise

  if (page) {
    const hero = await heroPromise
    return (
      <>
        <InnerPageHero title={page.title} slides={hero.slides} />
        <CmsPage page={page} />
      </>
    )
  }

  const { header } = await getSiteChromeData()
  const knownPaths = flattenNavigationPaths(header.navigation)

  if (!isKnownLegacyPath(pathname, knownPaths)) {
    notFound()
  }

  const hero = await heroPromise

  return (
    <>
      <InnerPageHero title="Сторінка в розробці" slides={hero.slides} />
      <PlaceholderPage pathname={pathname} />
    </>
  )
}
