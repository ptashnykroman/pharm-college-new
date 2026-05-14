import Image from 'next/image'

import collegePhoto3 from '@/shared/assets/images/homepage/college_photo3.webp'
import { FloatingPromos } from '@/widgets/home/hero/floating-promos'
import { HomeMainSectionsFallback } from '@/widgets/home/home-page'

const HOME_HERO_DESCRIPTION =
  'Готуємо професіоналів для аптечної справи, лабораторної діагностики та медицини. Сучасні лабораторії, досвідчені викладачі, реальна практика.'

export function HomePageLoading() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden" style={{ minHeight: '100vh' }}>
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

        <FloatingPromos />

        <div className="animate-float-slow absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[rgba(var(--primary-glow),0.3)] blur-3xl" />

        <div
          className="relative container mx-auto flex min-h-[100svh] flex-col items-center justify-center px-4 pb-20 pt-28 md:px-6"
          style={{ minHeight: '100vh' }}
        >
          <div className="animate-fade-up flex max-w-[900px] flex-col items-center text-center">
            <h1
              style={{ fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif' }}
              className="text-2xl 2xs:text-3xl xs:text-4xl sm:text-5xl lg:text-6xl 3xl:text-7xl leading-[1.05] font-black tracking-tight text-primary-foreground"
            >
              Житомирський базовий{' '}
              <span className="hero-gradient-text block">
                фармацевтичний фаховий коледж
              </span>
            </h1>

            <p className="text-sm 2xs:text-base xs:text-lg sm:text-xl mt-6 max-w-2xl text-[rgba(var(--primary-foreground),0.85)]">
              {HOME_HERO_DESCRIPTION}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <div className="inline-flex h-10 2xs:h-11 xs:h-12 items-center rounded-md bg-accent-gold px-4 xs:px-6 text-[12px] 2xs:text-sm font-bold text-accent-gold-foreground shadow-elegant">
                Вступ 2026
              </div>
              <div className="inline-flex h-10 2xs:h-11 xs:h-12 items-center rounded-md border border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.1)] px-4 xs:px-6 text-[12px] 2xs:text-sm font-bold text-primary-foreground backdrop-blur-md">
                Переглянути розклад
              </div>
            </div>

            <div className="mt-8 w-full max-w-[90vw] xs:max-w-md">
              <div className="flex items-center gap-3 rounded-full border border-[rgba(255,255,255,0.15)] bg-[rgba(var(--primary-deep),0.4)] py-1 xs:py-1.5 pl-1.5 pr-2 backdrop-blur-md">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-gold-foreground">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-destructive" />
                  </span>
                  Увага
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block h-3 w-full animate-pulse rounded-full bg-[rgba(var(--primary-foreground),0.2)] xs:h-4" />
                </span>

                <span className="hidden shrink-0 text-[11px] tabular-nums text-[rgba(var(--primary-foreground),0.5)] sm:inline">1/3</span>

                <span className="flex shrink-0 items-center gap-0.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)]" />
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)]" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeMainSectionsFallback />
    </>
  )
}
