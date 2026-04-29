import Image from "next/image";

import type { HeroSlide } from "@/widgets/home/hero/hero-utils";

type HeroBackgroundSliderProps = {
  slides: HeroSlide[];
  activeIndex: number;
  imageClassName?: string;
};

export function HeroBackgroundSlider({
  slides,
  activeIndex,
  imageClassName = "object-cover",
}: HeroBackgroundSliderProps) {
  return (
    <div className="absolute inset-0">
      {slides.map((slide, index) => (
        <Image
          key={`${typeof slide.src === "string" ? slide.src : slide.alt}-${index}`}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={index === 0}
          quality={100}
          sizes="100vw"
          className={`${imageClassName} transition-opacity duration-[2000ms] ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-hero opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.62_0.18_245_/_0.35),_transparent_60%)]" />
    </div>
  );
}
