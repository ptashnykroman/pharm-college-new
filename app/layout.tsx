import type { Metadata } from 'next'

import { SITE_DESCRIPTION, SITE_FULL_NAME, SITE_NAME, SITE_URL } from '@/shared/lib/site-config'
import { SiteFooter } from '@/widgets/footer/site-footer'
import { getSiteChromeData } from '@/widgets/header/data'
import { SiteHeader } from '@/widgets/header/site-header'

import './globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

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
    <html lang="uk" className={cn('h-full antialiased', 'font-sans', inter.variable)}>
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
