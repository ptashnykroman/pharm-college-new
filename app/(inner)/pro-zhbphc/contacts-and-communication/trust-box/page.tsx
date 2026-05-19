import { buildPageMetadata } from '@/shared/lib/metadata'
import { resolveStaticBreadcrumbs } from '@/shared/lib/breadcrumbs'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'
import { TrustBoxPageView } from '@/widgets/static-pages/trust-box-page'

const PATHNAME = '/pro-zhbphc/contacts-and-communication/trust-box'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Скринька довіри',
    description:
      'Звернення щодо безпечного освітнього середовища, академічної доброчесності та інших чутливих питань.',
    pathname: PATHNAME,
  })
}

export default async function TrustBoxPage() {
  const breadcrumbs = resolveStaticBreadcrumbs(PATHNAME)

  return (
    <>
      <InnerPageHero breadcrumbs={breadcrumbs} />
      <TrustBoxPageView />
    </>
  )
}
