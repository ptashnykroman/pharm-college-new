import type {
  GetHomeEventsQuery,
  GetHomeHeroQuery,
  GetHomeNewsQuery,
  GetHomePageContentQuery,
  GetHomePartnersQuery,
} from "@/shared/api/graphql/generated";
import { formatDateParts } from "@/shared/lib/date";
import { resolveImage, toAbsoluteMediaUrl } from "@/shared/lib/media";
import { buildNewsUrl } from "@/shared/lib/navigation";
import { replaceCmsMediaUrls, stripHtml } from "@/shared/lib/rich-text";
import {
  HERO_PRIMARY_LINK,
  HERO_SECONDARY_LINK,
  NEWS_INDEX_PATH,
} from "@/shared/lib/site-config";
import type { NewsListItem } from "@/widgets/news/model";

export type HomePageViewModel = {
  hero: {
    title: string;
    description: string;
    primaryHref: string;
    secondaryHref: string;
    newsHref: string;
    backgroundType: string;
    backgroundImage: ReturnType<typeof resolveImage>;
    sliderImages: Array<NonNullable<ReturnType<typeof resolveImage>>>;
    videoUrl: string | null;
    videoPoster: ReturnType<typeof resolveImage>;
    frameUrl: string | null;
    framePoster: ReturnType<typeof resolveImage>;
    logoImage: ReturnType<typeof resolveImage>;
    announcements: Array<{
      id: string;
      title: string;
      body: string;
    }>;
    promoLinks: Array<{
      id: string;
      label: string;
      href: string;
    }>;
  };
  about: {
    title: string;
    bodyHtml: string;
    buttonText: string;
    buttonHref: string;
    image: ReturnType<typeof resolveImage>;
  };
  stats: Array<{
    id: string;
    value: string;
    label: string;
  }>;
  gallery: {
    title: string;
    items: Array<{
      id: string;
      title: string;
      href: string;
      image: NonNullable<ReturnType<typeof resolveImage>>;
    }>;
  };
  contacts: {
    title: string;
    mapUrl: string;
    people: Array<{
      id: string;
      name: string;
      position: string;
      phone: string;
      email: string;
    }>;
  };
  news: NewsListItem[];
  events: Array<{
    id: string;
    title: string;
    date: ReturnType<typeof formatDateParts>;
    image: ReturnType<typeof resolveImage>;
  }>;
  partners: Array<{
    id: string;
    name: string;
    href: string | null;
    image: ReturnType<typeof resolveImage>;
  }>;
};

function hasAttributes<T extends { attributes: unknown | null }>(
  item: T | null,
): item is T & { attributes: Exclude<T["attributes"], null> } {
  return Boolean(item?.attributes);
}

export function buildHomePageViewModel(
  heroData: GetHomeHeroQuery,
  contentData: GetHomePageContentQuery,
  newsData: GetHomeNewsQuery,
  eventsData: GetHomeEventsQuery,
  partnersData: GetHomePartnersQuery,
): HomePageViewModel {
  const hero = heroData.header?.data?.attributes?.Header;
  const about = contentData.homePageAbout?.data?.attributes;
  const statBlock = contentData.homePageStat?.data?.attributes;
  const gallery = contentData.homePageGallery?.data?.attributes;
  const contacts = contentData.homePageContact?.data?.attributes;

  if (!hero || !about || !statBlock || !gallery || !contacts) {
    throw new Error("Homepage CMS data is incomplete.");
  }

  const background = hero.headerBackground;
  const heroSliderImages = (background?.slider?.data ?? [])
    .map((item) => resolveImage(item, "hero", hero.title))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return {
    hero: {
      title: hero.title,
      description:
        "Готуємо професіоналів для аптечної справи, лабораторної діагностики та медицини. Сучасні лабораторії, досвідчені викладачі, реальна практика.",
      primaryHref: HERO_PRIMARY_LINK,
      secondaryHref: HERO_SECONDARY_LINK,
      newsHref: NEWS_INDEX_PATH,
      backgroundType: background?.backgroundType || "image",
      backgroundImage: resolveImage(background?.image ?? null, "hero", hero.title),
      sliderImages: heroSliderImages,
      videoUrl: toAbsoluteMediaUrl(background?.video?.data?.attributes?.url),
      videoPoster: resolveImage(
        background?.video_poster_primary ?? null,
        "hero",
        hero.title,
      ),
      frameUrl: background?.iframe_url || null,
      framePoster: resolveImage(
        background?.frame_poster ?? null,
        "hero",
        hero.title,
      ),
      logoImage: resolveImage(hero.logo, "logo", hero.title),
      announcements: (heroData.advertisements?.data ?? [])
        .filter(hasAttributes)
        .map((item) => ({
          id: item.id ?? item.attributes.title,
          title: item.attributes.title,
          body: replaceCmsMediaUrls(item.attributes.body),
        })),
      promoLinks: [
        {
          id: "edu-2024",
          label: "Освітній сайт 2024",
          href: "https://pharm.zt.ua",
        },
        {
          id: "howareu",
          label: "Ти як?",
          href: "https://howareu.com/",
        },
      ],
    },
    about: {
      title: about.title,
      bodyHtml: replaceCmsMediaUrls(about.body),
      buttonText: about.buttonText,
      buttonHref: "/pro-zhbphc/istoria-col",
      image: resolveImage(about.photo, "hero", about.title),
    },
    stats: statBlock.stats
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .map((item) => ({
        id: item.id,
        value: item.num,
        label: item.text,
      })),
    gallery: {
      title: gallery.title,
      items: gallery.GalleryItems
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
        .map((item) => {
          const image = resolveImage(item.photo, "gallery", item.title);

          if (!image) {
            return null;
          }

          return {
            id: item.id,
            title: item.title,
            href: item.link,
            image,
          };
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    },
    contacts: {
      title: contacts.title,
      mapUrl: contacts.frame_url,
      people: contacts.Contacts
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
        .map((item) => ({
          id: item.id,
          name: item.name,
          position: item.position,
          phone: item.phone,
          email: item.email,
        })),
    },
    news: (newsData.novinas?.data ?? [])
      .filter(hasAttributes)
      .map((item) => {
        const image =
          resolveImage(item.attributes.preview_photo, "card", item.attributes.title) ||
          resolveImage(item.attributes.main_photo, "card", item.attributes.title);

        if (!image || !item.id) {
          return null;
        }

        const previewText = stripHtml(item.attributes.body);
        const firstTag = (item.attributes.news_tags?.data ?? []).find((tag) =>
          Boolean(tag.attributes?.title),
        );

        return {
          id: item.id,
          title: item.attributes.title,
          excerpt: `${previewText.slice(0, 180).trim()}${
            previewText.length > 180 ? "..." : ""
          }`,
          href: buildNewsUrl(item.attributes.date, item.id),
          tag: firstTag?.attributes?.title ?? null,
          date: formatDateParts(item.attributes.date),
          image,
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    events: (eventsData.events?.data ?? [])
      .filter(hasAttributes)
      .map((item) => ({
        id: item.id ?? `${item.attributes.title}-${item.attributes.date}`,
        title: item.attributes.title,
        date: formatDateParts(item.attributes.date),
        image: resolveImage(item.attributes.image, "card", item.attributes.title),
      })),
    partners: (partnersData.partners?.data ?? [])
      .filter(hasAttributes)
      .map((item) => ({
        id: item.id ?? item.attributes.name,
        name: item.attributes.name,
        href: item.attributes.link || item.attributes.presentation_link || null,
        image: resolveImage(item.attributes.logo, "logo", item.attributes.name),
      })),
  };
}
