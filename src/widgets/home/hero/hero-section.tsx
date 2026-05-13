'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import { FloatingPromos } from './floating-promos'
import collegePhoto3 from '@/shared/assets/images/homepage/college_photo3.webp'
import type { HomePageViewModel } from '@/widgets/home/model'
import { buildHeroSlides } from '@/widgets/home/hero/hero-utils'
import { HeroAnnouncementStrip } from '@/widgets/home/hero/hero-announcement-strip'
import { HeroBackgroundSlider } from '@/widgets/home/hero/hero-background-slider'

const DESKTOP_HERO_QUERY = '(min-width: 768px)'
const SLIDE_INTERVAL_MS = 10000

type SliderState = {
  activeIndex: number
  renderedIndexes: number[]
}

export function HomeHeroSection({ hero }: { hero: HomePageViewModel['hero'] }) {
  const [announcementIndex, setAnnouncementIndex] = useState(0)
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] = useState(false)
  const [isDesktopHero, setIsDesktopHero] = useState(false)
  const [sliderState, setSliderState] = useState<SliderState>({
    activeIndex: 0,
    renderedIndexes: [0],
  })

  const slides = buildHeroSlides(hero)
  const totalAnnouncements = hero.announcements.length
  const currentAnnouncement = totalAnnouncements > 0 ? hero.announcements[announcementIndex % totalAnnouncements] : null

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_HERO_QUERY)
    const syncDesktopState = () => setIsDesktopHero(mediaQuery.matches)

    syncDesktopState()
    mediaQuery.addEventListener('change', syncDesktopState)

    return () => mediaQuery.removeEventListener('change', syncDesktopState)
  }, [])

  useEffect(() => {
    if (!isDesktopHero || slides.length <= 1) {
      return
    }

    const id = window.setInterval(() => {
      setSliderState((current) => {
        const activeIndex = (current.activeIndex + 1) % slides.length
        const renderedIndexes = current.renderedIndexes.includes(activeIndex)
          ? current.renderedIndexes
          : [...current.renderedIndexes, activeIndex]

        return {
          activeIndex,
          renderedIndexes,
        }
      })
    }, SLIDE_INTERVAL_MS)

    return () => window.clearInterval(id)
  }, [isDesktopHero, slides.length])

  useEffect(() => {
    if (totalAnnouncements <= 1 || isAnnouncementDialogOpen) {
      return
    }

    const id = window.setInterval(() => {
      setAnnouncementIndex((current) => (current + 1) % totalAnnouncements)
    }, 5000)

    return () => window.clearInterval(id)
  }, [isAnnouncementDialogOpen, totalAnnouncements])

  return (
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

      {isDesktopHero ? (
        <HeroBackgroundSlider
          slides={slides}
          activeIndex={sliderState.activeIndex}
          preloadFirst={false}
          quality={90}
          renderedIndexes={sliderState.renderedIndexes}
          showOverlays={false}
        />
      ) : null}

      <div className="absolute inset-0 bg-gradient-hero opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.62_0.18_245_/_0.35),_transparent_60%)]" />

      <FloatingPromos />

      <div className="animate-float-slow absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary-glow/30 blur-3xl" />

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
            <span className="block bg-gradient-to-r from-accent-gold to-white bg-clip-text text-transparent">
              фармацевтичний фаховий коледж
            </span>
          </h1>

          <p className="text-sm 2xs:text-base xs:text-lg sm:text-xl mt-6 max-w-2xl text-primary-foreground/85">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={hero.primaryHref}
              className="inline-flex h-10 2xs:h-11 xs:h-12 p-4 xs:px-6 items-center rounded-md bg-accent-gold text-[12px] 2xs:text-sm font-bold text-accent-gold-foreground shadow-elegant transition-bounce hover:scale-[1.02] hover:bg-accent-gold/90"
            >
              Вступ 2026
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href={hero.secondaryHref}
              className="inline-flex h-10  2xs:h-11 xs:h-12 p-4 xs:px-6 items-center rounded-md border border-white/30 bg-white/10 text-[12px] 2xs:text-sm font-bold text-primary-foreground backdrop-blur-md transition-smooth hover:bg-white/20 hover:text-primary-foreground"
            >
              Переглянути розклад
            </Link>
          </div>

          {currentAnnouncement ? (
            <HeroAnnouncementStrip
              title={currentAnnouncement.title}
              body={currentAnnouncement.body}
              isDialogOpen={isAnnouncementDialogOpen}
              currentIndex={announcementIndex}
              total={totalAnnouncements}
              onDialogOpenChange={setIsAnnouncementDialogOpen}
              onPrevious={() =>
                setAnnouncementIndex((current) => (current === 0 ? totalAnnouncements - 1 : current - 1))
              }
              onNext={() => setAnnouncementIndex((current) => (current + 1) % totalAnnouncements)}
            />
          ) : null}
        </div>
      </div>
    </section>
  )
}
