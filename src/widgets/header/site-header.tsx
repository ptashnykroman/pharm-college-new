'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Menu, Search, X } from 'lucide-react'
import { useEffect, useEffectEvent, useState } from 'react'

import EngIcon from '@/shared/assets/icons/header/United-kingdom_flag.webp'
import type { NavigationNode } from '@/shared/lib/navigation'
import { HERO_PRIMARY_LINK } from '@/shared/lib/site-config'
import { HeaderBrand } from '@/widgets/header/components/header-brand'
import { HeaderTopBar } from '@/widgets/header/components/header-top-bar'
import type { HeaderViewModel } from '@/widgets/header/model'
import { DesktopNavigation } from '@/widgets/navigation/desktop-navigation'
import { MobileNavigation } from '@/widgets/navigation/mobile-navigation'
import { SiteSearchDialog } from '@/widgets/search/site-search-dialog'

const SEARCH_LABEL = 'Пошук'
const MENU_LABEL = 'Меню'

export function SiteHeader({ data }: { data: HeaderViewModel }) {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileStack, setMobileStack] = useState<NavigationNode[]>([])

  const openSearch = useEffectEvent(() => {
    setSearchOpen(true)
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'k') {
        return
      }

      event.preventDefault()
      openSearch()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  function closeMobileNavigation() {
    setOpen(false)
    setMobileStack([])
  }

  function toggleMobileNavigation() {
    if (open) {
      closeMobileNavigation()
      return
    }

    setOpen(true)
  }

  return (
    <div className="relative">
      <header className="header-shell">
        <HeaderTopBar quickLinks={data.quickLinks} socialLinks={data.socialLinks} />

        <div className="mx-auto container flex h-16 items-center justify-between px-4 md:px-6 lg:h-[68px]">
          <HeaderBrand />

          <nav className="hidden items-center gap-0.5 xl:flex">
            <DesktopNavigation items={data.navigation} />
          </nav>

          <div className="flex items-center">
            <div className="flex items-center gap-2 xl:flex-row-reverse">
              <Link
                href={HERO_PRIMARY_LINK}
                className="inline-flex items-center rounded-full bg-primary p-1 text-xs font-semibold text-primary-foreground shadow-soft transition-bounce hover:opacity-95"
              >
                <Image width={24} height={24} src={EngIcon} alt="eng" quality={90} />
              </Link>

              <button
                onClick={() => setSearchOpen(true)}
                className="header-action-button inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg"
                aria-label={SEARCH_LABEL}
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={toggleMobileNavigation}
              className="header-action-button inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg xl:hidden"
              aria-label={MENU_LABEL}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <MobileNavigation
        open={open}
        onClose={closeMobileNavigation}
        nav={data.navigation}
        quickLinks={data.quickLinks}
        socialLinks={data.socialLinks}
        stack={mobileStack}
        setStack={setMobileStack}
      />
      <SiteSearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}
