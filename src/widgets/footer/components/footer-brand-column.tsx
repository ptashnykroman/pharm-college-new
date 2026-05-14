import Image from 'next/image'
import { Send } from 'lucide-react'

import type { FooterViewModel } from '@/widgets/footer/model'
import { FooterLink } from '@/widgets/footer/components/footer-link'
import designLogo from '@/shared/assets/icons/header/logo.png'
import { SITE_FULL_NAME, SITE_NAME, SITE_NAME2 } from '@/shared/lib/site-config'
import { AppButton } from '@/components/shared/app-button'

export function FooterBrandColumn({ logoImage, socialLinks }: Pick<FooterViewModel, 'logoImage' | 'socialLinks'>) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center">
          {logoImage ? (
            <Image
              src={logoImage.src}
              alt={logoImage.alt || SITE_NAME}
              width={50}
              height={50}
              quality={92}
              className="h-full w-full object-contain"
              sizes="50px"
            />
          ) : (
            <Image
              src={designLogo}
              alt={SITE_NAME}
              width={50}
              height={50}
              quality={92}
              className="h-full w-full object-contain"
              sizes="50px"
            />
          )}
        </div>
        <div>
          <div className="font-bold">{SITE_NAME}</div>
          <div className="text-[11px] uppercase tracking-wider text-[rgba(var(--primary-foreground),0.7)]">{SITE_NAME2}</div>
        </div>
      </div>

      <p className="mt-4 text-sm text-[rgba(var(--primary-foreground),0.75)]">{SITE_FULL_NAME}</p>

      <div className="mt-5 flex gap-2">
        {socialLinks.map((item) => (
          <AppButton key={item.id} variant="glass" size="icon" href={item.href}>
            {item.iconSrc ? (
              <img src={item.iconSrc} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </AppButton>
        ))}
      </div>
    </div>
  )
}
