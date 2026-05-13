import type { Metadata } from 'next'

import { SITE_DESCRIPTION, SITE_FULL_NAME, SITE_NAME, SITE_URL } from '@/shared/lib/site-config'
import { SiteFooter } from '@/widgets/footer/site-footer'
import { getSiteChromeData } from '@/widgets/header/data'
import { SiteHeader } from '@/widgets/header/site-header'

import './globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
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
      className={cn('h-full antialiased', 'font-sans', inter.variable)}
      data-header-scroll-ready="false"
      data-header-scrolled="false"
      suppressHydrationWarning
    >
      <head>
        <script id="header-scroll-state" dangerouslySetInnerHTML={{ __html: HEADER_SCROLL_BOOTSTRAP }} />
      </head>
      <body className="min-h-full">
        <div className="flex min-h-[100dvh] flex-col bg-background text-foreground">
          <SiteHeader data={chrome.header} />
          <main className="flex-1">{children}</main>
          <SiteFooter data={chrome.footer} />
        </div>
      </body>
    </html>
  )
}
