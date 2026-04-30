import type { FooterViewModel } from '@/widgets/footer/model'
import { FooterAddressColumn } from '@/widgets/footer/components/footer-address-column'
import { FooterBrandColumn } from '@/widgets/footer/components/footer-brand-column'
import { FooterContactColumn } from '@/widgets/footer/components/footer-contact-column'
import { SITE_NAME } from '@/shared/lib/site-config'
import { AppButton } from '@/components/shared/app-button'

export function SiteFooter({ data }: { data: FooterViewModel }) {
  return (
    <footer className="relative overflow-hidden bg-gradient-stats text-primary-foreground">
      <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary-glow/20 blur-3xl" />

      <div className="container relative mx-auto px-4 pt-16 pb-8 md:px-6">
        <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-[1fr_2fr_1fr]">
          <FooterBrandColumn logoImage={data.logoImage} socialLinks={data.socialLinks} />
          {/* <FooterNavigationColumn quickLinks={data.quickLinks} /> */}

          <div className="flex flex-col lg:justify-center md:flex-row gap-10 xl:gap-20 2xl:gap-32">
            <FooterAddressColumn addressHtml={data.addressHtml} mapUrl={data.mapUrl} />
            <FooterContactColumn mainPhone={data.mainPhone} secondaryPhone={data.secondaryPhone} email={data.email} />
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3">
            <AppButton href="/pro-zhbphc/contacts-and-communication/feedback" variant="glass" className="w-60">
              Задати питання
            </AppButton>

            <AppButton href="/pro-zhbphc/contacts-and-communication/trust-box" variant="glass" className="w-60">
              Скринька довіри
            </AppButton>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-primary-foreground/60 sm:flex-row">
          <div>{data.copyright.trim() ? data.copyright : `© 1938-${new Date().getFullYear()} ${SITE_NAME}`}</div>
          <div>Всі права захищено</div>
        </div>
      </div>
    </footer>
  )
}
