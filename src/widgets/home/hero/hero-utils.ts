import type { StaticImageData } from "next/image";

import collegePhoto1 from "@/shared/assets/images/homepage/college_photo1.webp";
import collegePhoto2 from "@/shared/assets/images/homepage/college_photo2.webp";
import collegePhoto3 from "@/shared/assets/images/homepage/college_photo3.webp";
import type { HomePageViewModel } from "@/widgets/home/model";

export type HeroSlide = {
  src: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
};

const fallbackSlides: HeroSlide[] = [
  {
    src: collegePhoto3,
    width: collegePhoto3.width,
    height: collegePhoto3.height,
    alt: "Житомирський базовий фармацевтичний фаховий коледж",
  },
  {
    src: collegePhoto1,
    width: collegePhoto1.width,
    height: collegePhoto1.height,
    alt: "Житомирський базовий фармацевтичний фаховий коледж",
  },
  {
    src: collegePhoto2,
    width: collegePhoto2.width,
    height: collegePhoto2.height,
    alt: "Житомирський базовий фармацевтичний фаховий коледж",
  },
];

type HeroImage = NonNullable<
  | HomePageViewModel["hero"]["backgroundImage"]
  | HomePageViewModel["hero"]["videoPoster"]
  | HomePageViewModel["hero"]["framePoster"]
  | HomePageViewModel["hero"]["sliderImages"][number]
>;

export function buildHeroSlides(hero: HomePageViewModel["hero"]) {
  const candidates = [
    ...hero.sliderImages,
    // hero.backgroundImage,
    // hero.videoPoster,
    // hero.framePoster,
  ].filter((image): image is HeroImage => Boolean(image));

  if (candidates.length === 0) {
    return fallbackSlides;
  }

  const deduped = new Map<string, HeroSlide>();

  for (const image of candidates) {
    const current = deduped.get(image.src);

    if (!current || image.width > current.width) {
      deduped.set(image.src, {
        src: image.src,
        alt: image.alt || hero.title,
        width: image.width,
        height: image.height,
      });
    }
  }

  return Array.from(deduped.values()).sort((left, right) => {
    if (right.width !== left.width) {
      return right.width - left.width;
    }

    return right.height - left.height;
  });
}
