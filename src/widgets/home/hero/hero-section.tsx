"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import type { HomePageViewModel } from "@/widgets/home/model";
import { HeroAnnouncementStrip } from "@/widgets/home/hero/hero-announcement-strip";
import { HeroBackgroundSlider } from "@/widgets/home/hero/hero-background-slider";
import { buildHeroSlides } from "@/widgets/home/hero/hero-utils";
import { FloatingPromos } from "./floating-promos";

export function HomeHeroSection({ hero }: { hero: HomePageViewModel["hero"] }) {
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const slides = buildHeroSlides(hero);
  const totalAnnouncements = hero.announcements.length;
  const currentAnnouncement =
    totalAnnouncements > 0
      ? hero.announcements[announcementIndex % totalAnnouncements]
      : null;

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const id = window.setInterval(() => {
      setBackgroundIndex((current) => (current + 1) % slides.length);
    }, 10000);

    return () => window.clearInterval(id);
  }, [slides.length]);

  useEffect(() => {
    if (totalAnnouncements <= 1 || isAnnouncementDialogOpen) {
      return;
    }

    const id = window.setInterval(() => {
      setAnnouncementIndex((current) => (current + 1) % totalAnnouncements);
    }, 6000);

    return () => window.clearInterval(id);
  }, [isAnnouncementDialogOpen, totalAnnouncements]);

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <HeroBackgroundSlider slides={slides} activeIndex={backgroundIndex} />

      <FloatingPromos />

      <div className="animate-float-slow absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary-glow/30 blur-3xl" />

      <div
        className="relative container mx-auto flex min-h-[100svh] flex-col items-center justify-center px-4 pb-20 pt-28 md:px-6"
        style={{ minHeight: "100vh" }}
      >
        <div className="animate-fade-up flex max-w-[900px] flex-col items-center text-center">
          <h1
            style={{
              fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
              fontWeight: 900,
            }}
            className="text-4xl sm:text-5xl lg:text-6xl 3xl:text-7xl mt-6 leading-[1.05] tracking-tight text-primary-foreground"
          >
            Житомирський базовий{" "}
            <span className="block bg-gradient-to-r from-accent-gold to-white bg-clip-text text-transparent">
              фармацевтичний фаховий коледж
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/85 sm:text-xl">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={hero.primaryHref}
              className="inline-flex h-12 items-center rounded-md bg-accent-gold px-6 text-sm font-bold text-accent-gold-foreground shadow-elegant transition-bounce hover:scale-[1.02] hover:bg-accent-gold/90"
            >
              Вступ 2026
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href={hero.secondaryHref}
              className="inline-flex h-12 items-center rounded-md border border-white/30 bg-white/10 px-6 text-sm font-bold text-primary-foreground backdrop-blur-md transition-smooth hover:bg-white/20 hover:text-primary-foreground"
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
