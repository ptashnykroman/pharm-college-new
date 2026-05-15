'use client'

import Link from 'next/link'
import { ArrowLeft, X } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

import type { NavigationNode } from '@/shared/lib/navigation'
import { cn } from '@/shared/lib/utils'
import { MobileNavigationFooter } from '@/widgets/navigation/mobile-navigation-footer'
import { MobileNavigationList } from '@/widgets/navigation/mobile-navigation-list'
import { SmartLink } from '@/widgets/navigation/smart-link'
import type { NavigationQuickLinkItem, NavigationSocialLinkItem } from '@/widgets/navigation/types'

type MobileNavigationProps = {
  open: boolean
  onClose: () => void
  nav: NavigationNode[]
  quickLinks: NavigationQuickLinkItem[]
  socialLinks: NavigationSocialLinkItem[]
  stack: NavigationNode[]
  setStack: Dispatch<SetStateAction<NavigationNode[]>>
}

export function MobileNavigation({
  open,
  onClose,
  nav,
  quickLinks,
  socialLinks,
  stack,
  setStack,
}: MobileNavigationProps) {
  const level = stack.length
  const current = stack[level - 1]

  return (
    <div
      className={cn(
        'fixed inset-0 z-[60] xl:hidden',
        'transition-opacity duration-300',
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <div onClick={onClose} className="absolute inset-0 bg-[rgba(var(--foreground),0.4)] backdrop-blur-sm" />

      <div
        className={cn(
          'absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-elegant',
          'transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
          {level > 0 ? (
            <button
              onClick={() => setStack((currentStack) => currentStack.slice(0, -1))}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-smooth hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Назад
            </button>
          ) : (
            <div className="text-sm font-semibold text-foreground">Меню</div>
          )}

          <button
            onClick={onClose}
            aria-label="Закрити"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-accent"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {level > 0 ? (
          <div className="shrink-0 px-5 pb-2 pt-4">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {stack
                .slice(0, -1)
                .map((item) => item.label)
                .join(' / ') || 'Меню'}
            </div>
            <div className="mt-0.5 text-xl font-bold text-foreground">{current?.label}</div>
          </div>
        ) : null}

        <div className="relative flex-1 overflow-hidden">
          <div
            className="flex h-full transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(-${(level * 100) / (level + 1)}%)`,
              width: `${(level + 1) * 100}%`,
            }}
          >
            {Array.from({ length: level + 1 }).map((_, index) => {
              const isActive = index === level
              const panelItems = index === 0 ? nav : (stack[index - 1]?.children ?? [])

              return (
                <div
                  key={index}
                  className="h-full overflow-y-auto pt-2 flex flex-col"
                  style={{ width: `${100 / (level + 1)}%` }}
                  aria-hidden={!isActive}
                >
                  {index === 0 && level === 0 ? (
                    <div className="px-2 pb-2 text-[11px] uppercase tracking-wider text-muted-foreground">Розділи</div>
                  ) : null}

                  <MobileNavigationList
                    items={panelItems}
                    isActive={isActive}
                    onClose={onClose}
                    stack={stack}
                    setStack={setStack}
                  />

                  {index === 0 ? (
                    <MobileNavigationFooter quickLinks={quickLinks} socialLinks={socialLinks} onClose={onClose} />
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
