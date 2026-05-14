import Image from 'next/image'

import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import collegePhoto3 from '@/shared/assets/images/homepage/college_photo3.webp'
import type { BreadcrumbItem } from '@/shared/lib/breadcrumbs'

type InnerPageHeroProps = {
  title?: string
  breadcrumbs?: readonly BreadcrumbItem[] | null
}

export function InnerPageHero({ breadcrumbs }: InnerPageHeroProps) {
  return (
    <section className="relative h-[400px] overflow-hidden">
      <Image
        src={collegePhoto3}
        alt=""
        fill
        preload
        quality={90}
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-hero opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(var(--primary-glow),0.35),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[rgba(var(--primary-deep),0.15)]" />
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[rgba(var(--primary-glow),0.25)] blur-3xl" />

      <div className="relative container mx-auto h-full px-4 md:px-6">
        <div className="flex h-full items-center justify-center pt-24 pb-14 text-center">
          <div className="max-w-5xl">
            <h1
              style={{
                fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
              }}
              className="text-2xl 2xs:text-3xl xs:text-4xl sm:text-5xl leading-[1.05] font-black tracking-tight text-primary-foreground"
            >
              Житомирський базовий{' '}
              <span className="block bg-gradient-to-r from-accent-gold to-white bg-clip-text text-transparent">
                фармацевтичний фаховий коледж
              </span>
            </h1>
          </div>
        </div>

        <Breadcrumbs items={breadcrumbs} />
      </div>
    </section>
  )
}
