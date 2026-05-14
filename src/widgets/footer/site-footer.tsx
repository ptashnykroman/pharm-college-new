import type { FooterViewModel } from '@/widgets/footer/model'
import { FooterAddressColumn } from '@/widgets/footer/components/footer-address-column'
import { FooterBrandColumn } from '@/widgets/footer/components/footer-brand-column'
import { FooterContactColumn } from '@/widgets/footer/components/footer-contact-column'
import { FooterMessageActions } from '@/widgets/footer/components/footer-message-actions'
import { SITE_NAME } from '@/shared/lib/site-config'

export function SiteFooter({ data }: { data: FooterViewModel }) {
  return (
    <footer className="relative overflow-hidden bg-gradient-stats text-primary-foreground">
      <div className="glow-orb glow-primary-20 absolute -top-24 right-0 h-72 w-72" />

      <div className="container relative mx-auto px-4 pt-16 pb-8 md:px-6">
        <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-[1fr_2fr_1fr]">
          <FooterBrandColumn logoImage={data.logoImage} socialLinks={data.socialLinks} />

          <div className="flex flex-col lg:justify-center md:flex-row gap-10 xl:gap-20 2xl:gap-32">
            <FooterAddressColumn addressHtml={data.addressHtml} mapUrl={data.mapUrl} />
            <FooterContactColumn mainPhone={data.mainPhone} secondaryPhone={data.secondaryPhone} email={data.email} />
          </div>

          <FooterMessageActions />
        </div>

        <div className="mt-12 flex flex-row items-center justify-between gap-3 border-t border-[rgba(255,255,255,0.1)] pt-6 text-xs text-[rgba(var(--primary-foreground),0.6)]">
          <div>{data.copyright.trim() ? data.copyright : `© 1938-${new Date().getFullYear()} ${SITE_NAME}`}</div>
          <div>Всі права захищені</div>
        </div>
      </div>
    </footer>
  )
}
