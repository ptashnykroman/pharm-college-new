import Link from 'next/link'
import { Send } from 'lucide-react'

import { HERO_PRIMARY_LINK } from '@/shared/lib/site-config'
import { SmartLink } from '@/widgets/navigation/smart-link'
import type { NavigationQuickLinkItem, NavigationSocialLinkItem } from '@/widgets/navigation/types'

type MobileNavigationFooterProps = {
  quickLinks: NavigationQuickLinkItem[]
  socialLinks: NavigationSocialLinkItem[]
  onClose: () => void
}

export function MobileNavigationFooter({ quickLinks, socialLinks, onClose }: MobileNavigationFooterProps) {
  return (
    <>
      <div className="mt-4 border-t border-border pt-4">
        <div className="px-2 pb-2 text-[11px] uppercase tracking-wider text-muted-foreground">Швидкі посилання</div>
        <div className="grid grid-cols-2 gap-1">
          {quickLinks.map((item) => {
            // const quickLinkIcon = getQuickLinkIcon(item.label)

            return (
              <SmartLink
                key={item.id}
                href={item.href}
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition-smooth hover:bg-accent"
              >
                {item.iconSrc ? (
                  <img src={item.iconSrc} alt="" width={20} height={20} className="h-4 w-4 object-contain" />
                ) : null}
                {/* {quickLinkIcon.kind === 'image' ? (
                  <Image src={quickLinkIcon.src} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
                ) : (
                  <quickLinkIcon.icon className="h-5 w-5" aria-hidden="true" />
                )} */}

                {item.label}
              </SmartLink>
            )
          })}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-2">
        {socialLinks.map((item) => (
          <SmartLink
            key={item.id}
            href={item.href}
            ariaLabel={item.label}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-smooth hover:bg-accent hover:text-foreground"
          >
            {item.iconSrc ? (
              <img src={item.iconSrc} alt={item.label} width={16} height={16} className="h-4 w-4 object-contain" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </SmartLink>
        ))}
      </div>
      <Link
        href={HERO_PRIMARY_LINK}
        onClick={onClose}
        className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft"
      >
        Вступ 2026
      </Link>
    </>
  )
}
