import Image from "next/image";

import type { HeroSlide } from "@/widgets/home/hero/hero-utils";

type HeroBackgroundSliderProps = {
  slides: HeroSlide[];
  activeIndex: number;
  imageClassName?: string;
  preloadFirst?: boolean;
  quality?: number;
  renderedIndexes?: readonly number[];
  showOverlays?: boolean;
};

export function HeroBackgroundSlider({
  slides,
  activeIndex,
  imageClassName = "object-cover",
  preloadFirst = true,
  quality = 90,
  renderedIndexes,
  showOverlays = true,
}: HeroBackgroundSliderProps) {
  const indexes = renderedIndexes ?? slides.map((_, index) => index);

  return (
    <div className="absolute inset-0">
      {indexes.map((index) => {
        const slide = slides[index];

        if (!slide) {
          return null;
        }

        const shouldPreload = preloadFirst && index === 0;
        const isActive = index === activeIndex;

        return (
          <Image
            key={`${typeof slide.src === "string" ? slide.src : slide.alt}-${index}`}
            src={slide.src}
            alt={slide.alt}
            fill
            loading={shouldPreload ? undefined : isActive ? "eager" : "lazy"}
            preload={shouldPreload}
            quality={quality}
            sizes="100vw"
            className={`${imageClassName} transition-opacity duration-[2000ms] ease-in-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          />
        );
      })}
      {showOverlays ? (
        <>
          <div className="absolute inset-0 bg-gradient-hero opacity-60" />
          <div className="absolute inset-0 bg-gradient-hero-radial" />
        </>
      ) : null}
    </div>
  );
}
