'use client'

import { usePathname } from 'next/navigation'

import { HomePageLoading } from '@/widgets/home/home-page-loading'
import { PageLoadingSkeleton } from '@/widgets/page/page-loading-skeleton'

export default function AppLoading() {
  const pathname = usePathname()

  if (pathname === '/') {
    return <HomePageLoading />
  }

  return <PageLoadingSkeleton />
}
