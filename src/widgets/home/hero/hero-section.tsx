"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { FloatingPromos } from "./floating-promos";
import type { HomePageViewModel } from "@/widgets/home/model";
import { buildHeroSlides } from "@/widgets/home/hero/hero-utils";
import { HeroBackgroundSlider } from "@/widgets/home/hero/hero-background-slider";
import { HeroAnnouncementStrip } from "@/widgets/home/hero/hero-announcement-strip";

const DESKTOP_HERO_QUERY = "(min-width: 768px)";
const SLIDE_INTERVAL_MS = 10000;
const HERO_BASE_QUALITY = 80;
const HERO_SLIDER_QUALITY = 80;

type SliderState = {
  activeIndex: number;
  renderedIndexes: number[];
};

export function HomeHeroSection({ hero }: { hero: HomePageViewModel["hero"] }) {
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] =
    useState(false);
  const [isDesktopHero, setIsDesktopHero] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [sliderState, setSliderState] = useState<SliderState>({
    activeIndex: 0,
    renderedIndexes: [0, 1],
  });

  const slides = buildHeroSlides(hero);
  const heroBaseImage = slides[0];
  const desktopSlides = slides.slice(1);
  const desktopActiveIndex =
    sliderState.activeIndex === 0 ? -1 : sliderState.activeIndex - 1;
  const desktopRenderedIndexes = sliderState.renderedIndexes
    .filter((index) => index > 0)
    .map((index) => index - 1);
  const totalAnnouncements = hero.announcements.length;
  const currentAnnouncement =
    totalAnnouncements > 0
      ? hero.announcements[announcementIndex % totalAnnouncements]
      : null;

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_HERO_QUERY);
    const syncDesktopState = () => setIsDesktopHero(mediaQuery.matches);

    syncDesktopState();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncDesktopState);

      return () => mediaQuery.removeEventListener("change", syncDesktopState);
    }

    mediaQuery.addListener(syncDesktopState);

    return () => mediaQuery.removeListener(syncDesktopState);
  }, []);

  useEffect(() => {
    const syncPageVisibility = () =>
      setIsPageVisible(document.visibilityState === "visible");

    syncPageVisibility();
    document.addEventListener("visibilitychange", syncPageVisibility);

    return () =>
      document.removeEventListener("visibilitychange", syncPageVisibility);
  }, []);

  useEffect(() => {
    if (!isDesktopHero || !isPageVisible || slides.length <= 1) {
      return;
    }

    const id = window.setInterval(() => {
      setSliderState((current) => {
        const activeIndex = (current.activeIndex + 1) % slides.length;
        const upcomingIndex = (activeIndex + 1) % slides.length;
        const renderedIndexes = current.renderedIndexes.slice();

        if (!renderedIndexes.includes(activeIndex)) {
          renderedIndexes.push(activeIndex);
        }

        if (!renderedIndexes.includes(upcomingIndex)) {
          renderedIndexes.push(upcomingIndex);
        }

        return {
          activeIndex,
          renderedIndexes,
        };
      });
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [isDesktopHero, isPageVisible, slides.length]);

  useEffect(() => {
    if (totalAnnouncements <= 1 || isAnnouncementDialogOpen || !isPageVisible) {
      return;
    }

    const id = window.setInterval(() => {
      setAnnouncementIndex((current) => (current + 1) % totalAnnouncements);
    }, 5000);

    return () => window.clearInterval(id);
  }, [isAnnouncementDialogOpen, isPageVisible, totalAnnouncements]);

  return (
    <section className="hero-viewport-height relative overflow-hidden">
      <Image
        src={heroBaseImage.src}
        alt=""
        fill
        preload
        quality={HERO_BASE_QUALITY}
        sizes="100vw"
        className="object-cover object-center"
      />

      {isDesktopHero && desktopSlides.length > 0 ? (
        <HeroBackgroundSlider
          slides={desktopSlides}
          activeIndex={desktopActiveIndex}
          preloadFirst={false}
          quality={HERO_SLIDER_QUALITY}
          renderedIndexes={desktopRenderedIndexes}
          showOverlays={false}
        />
      ) : null}

      <div className="absolute inset-0 bg-gradient-hero opacity-60" />
      <div className="absolute inset-0 bg-gradient-hero-radial" />

      <FloatingPromos />

      <div className="glow-orb glow-primary-30 animate-float-slow absolute -left-24 -top-24 h-96 w-96" />

      <div className="hero-viewport-height relative container mx-auto flex flex-col items-center justify-center px-4 pb-20 pt-28 md:px-6">
        <div className="flex max-w-[900px] flex-col items-center text-center">
          <h1
            style={{
              fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
            }}
            className="text-2xl 2xs:text-3xl xs:text-4xl sm:text-5xl lg:text-6xl 3xl:text-7xl leading-[1.05] font-black tracking-tight text-primary-foreground"
          >
            Житомирський базовий{" "}
            <span className="hero-gradient-text block">
              фармацевтичний фаховий коледж
            </span>
          </h1>

          <p className="text-sm 2xs:text-base xs:text-lg sm:text-xl mt-6 max-w-2xl text-[rgba(var(--primary-foreground),0.85)]">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={hero.primaryHref}
              className="inline-flex h-10 2xs:h-11 xs:h-12 p-4 xs:px-6 items-center rounded-md bg-accent-gold text-[12px] 2xs:text-sm font-bold text-accent-gold-foreground shadow-elegant transition-bounce hover:scale-[1.02] hover:bg-[rgba(var(--accent-gold),0.9)]"
            >
              Вступ 2026
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href={hero.secondaryHref}
              className="inline-flex h-10  2xs:h-11 xs:h-12 p-4 xs:px-6 items-center rounded-md border border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.1)] text-[12px] 2xs:text-sm font-bold text-primary-foreground backdrop-blur-[1px] transition-smooth hover:bg-[rgba(255,255,255,0.2)] hover:text-primary-foreground"
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
                setAnnouncementIndex((current) =>
                  current === 0 ? totalAnnouncements - 1 : current - 1,
                )
              }
              onNext={() =>
                setAnnouncementIndex(
                  (current) => (current + 1) % totalAnnouncements,
                )
              }
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
