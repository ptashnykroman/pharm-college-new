import { cache } from 'react'
import { notFound } from 'next/navigation'

import { AppButton } from '@/components/shared/app-button'
import { resolveBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { buildPageMetadata, createPlaceholderMetadata } from '@/shared/lib/metadata'
import { resolveImage } from '@/shared/lib/media'
import { flattenNavigationPaths, isKnownLegacyPath } from '@/shared/lib/navigation'
import { getHomeHero, getPageByPath } from '@/shared/api/graphql/sdk'
import { getSiteChromeData } from '@/widgets/header/data'
import { CmsPage } from '@/widgets/page/cms-page'
import { buildInnerPageHeroViewModel } from '@/widgets/page/inner-page-hero-data'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'

const PLACEHOLDER_BADGE = 'Сторінка в роботі'
const PLACEHOLDER_MESSAGE_BEFORE_PATH = 'Маршрут '
const PLACEHOLDER_MESSAGE_AFTER_PATH =
  ' вже розпізнано, але його окрема реалізація ще переноситься зі старого сайту.'
const GO_HOME_LABEL = 'На головну'
const PLACEHOLDER_HERO_TITLE = 'Сторінка в розробці'

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
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{PLACEHOLDER_BADGE}</div>
        <p className="mt-5 text-lg leading-8 text-foreground/80">
          {PLACEHOLDER_MESSAGE_BEFORE_PATH}
          <span className="font-semibold text-foreground">{pathname}</span>
          {PLACEHOLDER_MESSAGE_AFTER_PATH}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <AppButton href="/" shape="rounded">
            {GO_HOME_LABEL}
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
  const chromePromise = getSiteChromeData()
  const [page, hero, { header }] = await Promise.all([pagePromise, heroPromise, chromePromise])
  const breadcrumbs = resolveBreadcrumbs({
    pathname,
    navigation: header.navigation,
  })

  if (page) {
    return (
      <>
        <InnerPageHero title={page.title} breadcrumbs={breadcrumbs} slides={hero.slides} />
        <CmsPage page={page} />
      </>
    )
  }

  const knownPaths = flattenNavigationPaths(header.navigation)

  if (!isKnownLegacyPath(pathname, knownPaths)) {
    notFound()
  }

  return (
    <>
      <InnerPageHero title={PLACEHOLDER_HERO_TITLE} breadcrumbs={breadcrumbs} slides={hero.slides} />
      <PlaceholderPage pathname={pathname} />
    </>
  )
}
