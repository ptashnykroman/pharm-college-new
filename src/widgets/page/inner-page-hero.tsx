import Image from 'next/image'

import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import collegePhoto3 from '@/shared/assets/images/homepage/college_photo3.webp'
import type { BreadcrumbItem } from '@/shared/lib/breadcrumbs'
import { SITE_FULL_NAME } from '@/shared/lib/site-config'

type InnerPageHeroProps = {
  title?: string
  breadcrumbs?: readonly BreadcrumbItem[] | null
}

export function InnerPageHero({ title, breadcrumbs }: InnerPageHeroProps) {
  const heading = title?.trim() || breadcrumbs?.at(-1)?.label || SITE_FULL_NAME

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
      <div className="absolute inset-0 bg-gradient-hero-radial" />
      <div className="absolute inset-0 bg-[rgba(var(--primary-deep),0.15)]" />
      <div className="glow-orb glow-primary-25 absolute -left-24 -top-24 h-72 w-72" />

      <div className="relative container mx-auto h-full px-4 md:px-6">
        <div className="flex h-full items-center justify-center pb-14 pt-24 text-center">
          <div className="max-w-5xl">
            <h1
              style={{
                fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
              }}
              className="text-2xl leading-[1.05] font-black tracking-tight text-primary-foreground 2xs:text-3xl xs:text-4xl sm:text-5xl"
            >
              {heading}
            </h1>
          </div>
        </div>

        <Breadcrumbs items={breadcrumbs} />
      </div>
    </section>
  )
}
