'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import EngIcon from '@/shared/assets/icons/header/United-kingdom_flag.webp'
import type { NavigationNode } from '@/shared/lib/navigation'
import { HERO_PRIMARY_LINK } from '@/shared/lib/site-config'
import { cn } from '@/shared/lib/utils'
import { HeaderBrand } from '@/widgets/header/components/header-brand'
import { HeaderFloatingPromos } from '@/widgets/header/components/header-floating-promos'
import { HeaderTopBar } from '@/widgets/header/components/header-top-bar'
import type { HeaderViewModel } from '@/widgets/header/model'
import { DesktopNavigation } from '@/widgets/navigation/desktop-navigation'
import { MobileNavigation } from '@/widgets/navigation/mobile-navigation'

export function SiteHeader({ data }: { data: HeaderViewModel }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mobileStack, setMobileStack] = useState<NavigationNode[]>([])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) {
      setMobileStack([])
    }
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="relative">
      <header
        className={cn(
          // 'fixed inset-x-0 top-0 z-50 transition-smooth',
          'fixed inset-x-0 top-0 z-50',
          scrolled ? 'border-b border-border bg-background/85 shadow-soft backdrop-blur-xl' : 'bg-transparent',
        )}
      >
        {isHomePage ? <HeaderFloatingPromos scrolled={scrolled} /> : null}
        <HeaderTopBar quickLinks={data.quickLinks} socialLinks={data.socialLinks} scrolled={scrolled} />

        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 md:px-6 lg:h-[68px]">
          <HeaderBrand scrolled={scrolled} />

          <nav className="hidden items-center gap-0.5 xl:flex">
            <DesktopNavigation items={data.navigation} scrolled={scrolled} />
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={HERO_PRIMARY_LINK}
              className="inline-flex items-center rounded-full bg-primary p-1 text-xs font-semibold text-primary-foreground shadow-soft transition-bounce hover:opacity-95"
            >
              <Image width={24} height={24} src={EngIcon} alt="eng" quality={90} />
            </Link>
            <button
              onClick={() => setOpen((current) => !current)}
              className={cn(
                'cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-lg transition-smooth xl:hidden',
                scrolled ? 'text-foreground hover:bg-accent' : 'text-primary-foreground hover:bg-white/10',
              )}
              aria-label="Меню"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <MobileNavigation
        open={open}
        onClose={() => setOpen(false)}
        nav={data.navigation}
        quickLinks={data.quickLinks}
        socialLinks={data.socialLinks}
        stack={mobileStack}
        setStack={setMobileStack}
      />
    </div>
  )
}
