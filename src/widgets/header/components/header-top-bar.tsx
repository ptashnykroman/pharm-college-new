import { Send } from 'lucide-react'

import { SmartLink } from '@/widgets/navigation/smart-link'
import type { NavigationQuickLinkItem, NavigationSocialLinkItem } from '@/widgets/navigation/types'

type HeaderTopBarProps = {
  quickLinks: NavigationQuickLinkItem[]
  socialLinks: NavigationSocialLinkItem[]
}

export function HeaderTopBar({ quickLinks, socialLinks }: HeaderTopBarProps) {
  return (
    <div className="header-top-bar">
      <div className="mx-auto flex h-9 container items-center justify-between px-4 text-xs md:px-6">
        <div className="flex items-center gap-1">
          {quickLinks.map((item, index) => {
            return (
              <SmartLink
                key={item.id}
                href={item.href}
                className={`header-quick-link inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] ${
                  index > 2 ? '!hidden sm:!inline-flex' : ''
                }`}
              >
                {item.iconSrc ? (
                  <img src={item.iconSrc} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
                ) : null}
                {item.label}
              </SmartLink>
            )
          })}
        </div>

        <div className="hidden md:flex items-center gap-1">
          {socialLinks.map((item) => (
            <SmartLink
              key={item.id}
              href={item.href}
              ariaLabel={item.label}
              className="header-social-link inline-flex h-7 w-7 items-center justify-center rounded-md"
            >
              {item.iconSrc ? (
                <img src={item.iconSrc} alt={item.label} width={16} height={16} className="h-4 w-4 object-contain" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </SmartLink>
          ))}
        </div>
      </div>
    </div>
  )
}
