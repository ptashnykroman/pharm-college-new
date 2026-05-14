import Image from 'next/image'

import collegePhoto3 from '@/shared/assets/images/homepage/college_photo3.webp'

export function PageLoadingSkeleton() {
  return (
    <>
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
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[rgba(var(--primary-glow),0.25)] blur-3xl" />

        <div className="relative container mx-auto h-full px-4 md:px-6">
          <div className="flex h-full items-center justify-center pt-24 pb-14 text-center">
            <div className="max-w-5xl animate-fade-up">
              <h1
                style={{
                  fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
                }}
                className="text-2xl 2xs:text-3xl xs:text-4xl sm:text-5xl leading-[1.05] font-black tracking-tight text-primary-foreground"
              >
                Житомирський базовий{' '}
                <span className="hero-gradient-text block">
                  фармацевтичний фаховий коледж
                </span>
              </h1>
            </div>
          </div>

          <nav aria-label="Breadcrumbs loading" className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
            <ol className="flex animate-pulse flex-wrap items-center gap-x-1.5 gap-y-1 md:gap-x-2">
              <li className="h-3 w-12 rounded-full bg-[rgba(var(--primary-foreground),0.35)] md:h-3.5 md:w-16" />
              <li className="h-3 w-3 rounded-full bg-[rgba(var(--primary-foreground),0.25)] md:h-3.5 md:w-3.5" />
              <li className="h-3 w-24 rounded-full bg-[rgba(var(--primary-foreground),0.35)] md:h-3.5 md:w-32" />
            </ol>
          </nav>
        </div>
      </section>

      <div className="container mx-auto px-4 pt-16 pb-32 md:px-6">
        <div className="mx-auto max-w-5xl animate-pulse space-y-5">
          <div className="h-8 w-2/3 rounded-full bg-muted" />
          <div className="h-4 rounded-full bg-muted" />
          <div className="h-4 rounded-full bg-muted" />
          <div className="h-4 w-4/5 rounded-full bg-muted" />
          <div className="h-4 rounded-full bg-muted" />
          <div className="h-4 w-4/5 rounded-full bg-muted" />
        </div>
      </div>
    </>
  )
}
