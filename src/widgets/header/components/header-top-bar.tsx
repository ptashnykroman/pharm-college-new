import { Send } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import { SmartLink } from '@/widgets/navigation/smart-link'
import type { NavigationQuickLinkItem, NavigationSocialLinkItem } from '@/widgets/navigation/types'

type HeaderTopBarProps = {
  quickLinks: NavigationQuickLinkItem[]
  socialLinks: NavigationSocialLinkItem[]
  scrolled: boolean
}

export function HeaderTopBar({ quickLinks, socialLinks, scrolled }: HeaderTopBarProps) {
  return (
    <div
      className={cn(
        'border-b transition-smooth',
        scrolled ? 'border-border/60 bg-primary/80' : 'border-white/10 bg-primary-deep/30 backdrop-blur-md',
      )}
    >
      {/* max-w-[1500px] */}
      <div className="mx-auto flex h-9 container items-center justify-between px-4 text-xs md:px-6">
        <div className="flex items-center gap-1">
          {quickLinks.map((item, index) => {
            // const quickLinkIcon = getQuickLinkIcon(item.label)

            return (
              <SmartLink
                key={item.id}
                href={item.href}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[12px] transition-smooth',
                  scrolled
                    ? 'text-white hover:bg-accent/10'
                    : 'text-primary-foreground/85 hover:bg-white/10 hover:text-primary-foreground',
                  index > 2 && 'hidden sm:inline-flex',
                )}
              >
                {item.iconSrc ? (
                  <img src={item.iconSrc} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
                ) : null}
                {/* {quickLinkIcon.kind === 'image' ? (
                  <Image src={quickLinkIcon.src} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
                ) : (
                  <quickLinkIcon.icon className="h-4 w-4" aria-hidden="true" />
                )} */}
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
              className={cn(
                'inline-flex h-7 w-7 items-center justify-center rounded-md transition-smooth',
                scrolled
                  ? 'text-muted-foreground hover:bg-accent/10 hover:text-foreground'
                  : 'text-primary-foreground/85 hover:bg-white/10 hover:text-primary-foreground',
              )}
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
