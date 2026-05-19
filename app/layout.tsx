import Script from 'next/script'
import type { Metadata, Viewport } from 'next'

import {
  SITE_URL,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_FULL_NAME,
  SITE_DESCRIPTION,
  SITE_THEME_COLOR,
} from '@/shared/lib/site-config'
import { cn } from '@/lib/utils'
import { SeoJsonLd } from '@/shared/ui/seo-json-ld'
import { SiteFooter } from '@/widgets/footer/site-footer'
import { getSiteChromeData } from '@/widgets/header/data'
import { SiteHeader } from '@/widgets/header/site-header'
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from '@/shared/lib/seo'

import './globals.css'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

const HEADER_SCROLL_BOOTSTRAP = `(() => {
  const root = document.documentElement;
  const threshold = 12;
  let ticking = false;
  let lastState = root.dataset.headerScrolled;

  const syncHeaderState = () => {
    ticking = false;
    const nextState = window.scrollY > threshold ? 'true' : 'false';

    if (nextState !== lastState) {
      root.dataset.headerScrolled = nextState;
      lastState = nextState;
    }

    if (root.dataset.headerScrollReady !== 'true') {
      root.dataset.headerScrollReady = 'true';
    }
  };

  const scheduleSync = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(syncHeaderState);
  };

  syncHeaderState();
  window.addEventListener('scroll', scheduleSync, { passive: true });
  window.addEventListener('resize', scheduleSync, { passive: true });
  window.addEventListener('pageshow', scheduleSync);
})();`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_FULL_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  manifest: '/site.webmanifest',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_FULL_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: SITE_OG_IMAGE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_FULL_NAME,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: SITE_THEME_COLOR,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const chrome = await getSiteChromeData()

  return (
    <html
      lang="uk"
      className={cn('h-full antialiased', 'font-sans')}
      data-header-scroll-ready="false"
      data-header-scrolled="false"
      suppressHydrationWarning
    >
      <head>
        <script id="header-scroll-state" dangerouslySetInnerHTML={{ __html: HEADER_SCROLL_BOOTSTRAP }} />
        <SeoJsonLd data={[buildOrganizationJsonLd(), buildWebsiteJsonLd()]} />
      </head>

      <body className="min-h-full">
        <div className="flex min-h-screen min-h-[100dvh] flex-col bg-background text-foreground">
          <SiteHeader data={chrome.header} />
          <main className="flex-1">{children}</main>
          <SiteFooter data={chrome.footer} />
        </div>
      </body>

      {GA_MEASUREMENT_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      ) : null}
    </html>
  )
}
