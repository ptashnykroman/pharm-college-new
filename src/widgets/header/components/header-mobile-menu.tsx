'use client'

import { LoaderCircle, Menu, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import type { NavigationNode } from '@/shared/lib/navigation'
import type { NavigationQuickLinkItem, NavigationSocialLinkItem } from '@/widgets/navigation/types'

type MobileNavigationComponent = typeof import('@/widgets/navigation/mobile-navigation').MobileNavigation

const MENU_LABEL = 'Меню'
const MENU_LOADING_TITLE = 'Завантажуємо меню'
const MENU_LOADING_DESCRIPTION = 'Готуємо мобільну навігацію.'

let mobileNavigationPromise: Promise<MobileNavigationComponent> | null = null

function loadMobileNavigation() {
  if (!mobileNavigationPromise) {
    mobileNavigationPromise = import('@/widgets/navigation/mobile-navigation').then((mod) => mod.MobileNavigation)
  }

  return mobileNavigationPromise
}

type HeaderMobileMenuProps = {
  navigation: NavigationNode[]
  quickLinks: NavigationQuickLinkItem[]
  socialLinks: NavigationSocialLinkItem[]
}

export function HeaderMobileMenu({ navigation, quickLinks, socialLinks }: HeaderMobileMenuProps) {
  const mountedRef = useRef(true)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mobileStack, setMobileStack] = useState<NavigationNode[]>([])
  const [mobileNavigationComponent, setMobileNavigationComponent] = useState<MobileNavigationComponent | null>(null)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const warmNavigation = useCallback(async () => {
    if (mobileNavigationComponent) {
      return mobileNavigationComponent
    }

    const nextNavigationComponent = await loadMobileNavigation()

    if (mountedRef.current) {
      setMobileNavigationComponent(() => nextNavigationComponent)
    }

    return nextNavigationComponent
  }, [mobileNavigationComponent])

  const closeMobileNavigation = useCallback(() => {
    setOpen(false)
    setMobileStack([])
  }, [])

  const toggleMobileNavigation = useCallback(async () => {
    if (open) {
      closeMobileNavigation()
      return
    }

    if (mobileNavigationComponent) {
      setOpen(true)
      return
    }

    setLoading(true)

    try {
      const nextNavigationComponent = await warmNavigation()

      if (!mountedRef.current) {
        return
      }

      setMobileNavigationComponent(() => nextNavigationComponent)
      setOpen(true)
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, [closeMobileNavigation, mobileNavigationComponent, open, warmNavigation])

  const MobileNavigationComponent = mobileNavigationComponent

  return (
    <>
      <button
        type="button"
        onClick={() => void toggleMobileNavigation()}
        onMouseEnter={() => void warmNavigation()}
        onFocus={() => void warmNavigation()}
        onTouchStart={() => void warmNavigation()}
        className="header-action-button inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg xl:hidden"
        aria-label={MENU_LABEL}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        {loading && !open ? (
          <LoaderCircle className="h-5 w-5 animate-spin" />
        ) : open ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {!mobileNavigationComponent && loading ? (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <div className="absolute inset-0 bg-[rgba(var(--foreground),0.4)] backdrop-blur-sm" />
          <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-elegant">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
              <div className="text-sm font-semibold text-foreground">{MENU_LABEL}</div>
              <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
            </div>
            <div className="flex flex-1 items-center justify-center px-6 text-center">
              <div>
                <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-primary" />
                <p className="mt-4 text-base font-semibold text-foreground">{MENU_LOADING_TITLE}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{MENU_LOADING_DESCRIPTION}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {MobileNavigationComponent ? (
        <MobileNavigationComponent
          open={open}
          onClose={closeMobileNavigation}
          nav={navigation}
          quickLinks={quickLinks}
          socialLinks={socialLinks}
          stack={mobileStack}
          setStack={setMobileStack}
        />
      ) : null}
    </>
  )
}
