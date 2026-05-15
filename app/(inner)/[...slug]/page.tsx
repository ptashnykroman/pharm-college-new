import { cache } from 'react'
import { notFound } from 'next/navigation'

import { resolveBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { buildPageMetadata } from '@/shared/lib/metadata'
import { resolveImage } from '@/shared/lib/media'
import { getAllCmsPagePaths, getPageByPath } from '@/shared/api/graphql/sdk'
import { getSiteChromeData } from '@/widgets/header/data'
import { CmsPage } from '@/widgets/page/cms-page'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'

const STATIC_ROUTE_PATHS = new Set([
  '/',
  '/general-info',
  '/novina',
  '/pro-zhbphc/administracia',
  '/pro-zhbphc/contacts-and-communication/feedback',
  '/pro-zhbphc/contacts-and-communication/trust-box',
  '/pro-zhbphc/kontakty',
  '/pro-zhbphc/video-and-3d',
  '/pro-zhbphc/viklad-sklad',
  '/rozklad',
  '/rozklad/grupa',
  '/rozklad/vikladach',
  '/structure/cmks',
  '/structure/subdiv',
  '/structure/vidilenya',
])

const STATIC_ROUTE_PREFIXES = [
  '/novina',
  '/rozklad/grupa',
  '/rozklad/vikladach',
  '/structure/cmks',
  '/structure/subdiv',
  '/structure/vidilenya',
]

type DynamicPageProps = {
  params: Promise<{
    slug?: string[]
  }>
}

function resolvePathname(slug: string[] | undefined) {
  const pathname = `/${(slug ?? []).join('/')}`.replace(/\/$/, '')

  return pathname || '/'
}

function shouldGenerateCatchAllPath(pathname: string) {
  if (STATIC_ROUTE_PATHS.has(pathname)) {
    return false
  }

  return !STATIC_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(`${prefix}/`))
}

function toSlugParam(pathname: string) {
  return {
    slug: pathname
      .replace(/^\/+|\/+$/g, '')
      .split('/')
      .filter(Boolean),
  }
}

const getPageData = cache(async (pathname: string) => {
  const data = await getPageByPath(pathname)

  return data.pages?.data[0]?.attributes ?? null
})

export async function generateStaticParams() {
  const paths = await getAllCmsPagePaths()

  return paths.filter(shouldGenerateCatchAllPath).map(toSlugParam)
}

export async function generateMetadata({ params }: DynamicPageProps) {
  const resolved = await params
  const pathname = resolvePathname(resolved.slug)
  const page = await getPageData(pathname)

  if (!page) {
    notFound()
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

export default async function DynamicPage({ params }: DynamicPageProps) {
  const resolved = await params
  const pathname = resolvePathname(resolved.slug)
  const page = await getPageData(pathname)

  if (!page) {
    notFound()
  }

  const { header } = await getSiteChromeData()
  const breadcrumbs = resolveBreadcrumbs({
    pathname,
    navigation: header.navigation,
  })

  return (
    <>
      <InnerPageHero breadcrumbs={breadcrumbs} />
      <CmsPage page={page} />
    </>
  )
}
