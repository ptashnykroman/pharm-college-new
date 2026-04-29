import type { GetHomeHeroQuery } from "@/shared/api/graphql/generated";
import { resolveImage } from "@/shared/lib/media";
import { buildHeroSlides, type HeroSlide } from "@/widgets/home/hero/hero-utils";
import type { HomePageViewModel } from "@/widgets/home/model";

export type InnerPageHeroViewModel = {
  title: string;
  slides: HeroSlide[];
};

export function buildInnerPageHeroViewModel(
  heroData: GetHomeHeroQuery,
): InnerPageHeroViewModel {
  const hero = heroData.header?.data?.attributes?.Header;

  if (!hero) {
    throw new Error("Homepage hero CMS data is incomplete.");
  }

  const sliderImages = (hero.headerBackground?.slider?.data ?? [])
    .map((item) => resolveImage(item, "hero", hero.title))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const slides = buildHeroSlides({
    title: hero.title,
    sliderImages,
  } as HomePageViewModel["hero"]);

  return {
    title: hero.title,
    slides,
  };
}
