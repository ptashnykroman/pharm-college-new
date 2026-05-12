"use client";

import { useEffect, useState } from "react";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import type { BreadcrumbItem } from "@/shared/lib/breadcrumbs";
import type { HeroSlide } from "@/widgets/home/hero/hero-utils";
import { HeroBackgroundSlider } from "@/widgets/home/hero/hero-background-slider";

type InnerPageHeroProps = {
  title?: string;
  breadcrumbs?: readonly BreadcrumbItem[] | null;
  slides: HeroSlide[];
};

export function InnerPageHero({ breadcrumbs, slides }: InnerPageHeroProps) {
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const id = window.setInterval(() => {
      setBackgroundIndex((current) => (current + 1) % slides.length);
    }, 10000);

    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative h-[400px] overflow-hidden">
      <HeroBackgroundSlider
        slides={slides}
        activeIndex={backgroundIndex}
        imageClassName="object-cover object-center"
      />

      <div className="absolute inset-0 bg-primary-deep/15" />
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary-glow/25 blur-3xl" />

      <div className="relative container mx-auto h-full px-4 md:px-6">
        <div className="flex h-full items-center justify-center pt-24 pb-14 text-center">
          <div className="max-w-5xl animate-fade-up">
            <h1
              style={{
                fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
              }}
              className="text-2xl 2xs:text-3xl xs:text-4xl sm:text-5xl leading-[1.05] font-black tracking-tight text-primary-foreground"
            >
              Житомирський базовий{" "}
              <span className="block bg-gradient-to-r from-accent-gold to-white bg-clip-text text-transparent">
                фармацевтичний фаховий коледж
              </span>
            </h1>
          </div>
        </div>

        <Breadcrumbs items={breadcrumbs} />
      </div>
    </section>
  );
}
