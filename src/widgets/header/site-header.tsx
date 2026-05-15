import Image from 'next/image'
import Link from 'next/link'

import EngIcon from '@/shared/assets/icons/header/United-kingdom_flag.webp'
import { HERO_PRIMARY_LINK } from '@/shared/lib/site-config'
import { HeaderBrand } from '@/widgets/header/components/header-brand'
import { HeaderMobileMenu } from '@/widgets/header/components/header-mobile-menu'
import { SiteSearchControl } from '@/widgets/header/components/site-search-control'
import { HeaderTopBar } from '@/widgets/header/components/header-top-bar'
import type { HeaderViewModel } from '@/widgets/header/model'
import { DesktopNavigation } from '@/widgets/navigation/desktop-navigation'

export function SiteHeader({ data }: { data: HeaderViewModel }) {
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

              <SiteSearchControl />
            </div>

            <HeaderMobileMenu navigation={data.navigation} quickLinks={data.quickLinks} socialLinks={data.socialLinks} />
          </div>
        </div>
      </header>
    </div>
  )
}
