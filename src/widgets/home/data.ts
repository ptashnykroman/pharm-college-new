import {
  getHomeEvents,
  getHomeHero,
  getHomeNews,
  getHomePageContent,
  getHomePartners,
} from "@/shared/api/graphql/sdk";
import {
  buildHomeHeroViewModel,
  buildHomeMainSectionsViewModel,
} from "@/widgets/home/model";
import {
  HOME_EVENTS_SECTION_ITEMS,
  HOME_NEWS_SECTION_ITEMS,
} from "@/widgets/home/section-limits";

export async function getHomeHeroViewData() {
  const hero = await getHomeHero();

  return buildHomeHeroViewModel(hero);
}

export async function getHomeMainSectionsViewData() {
  const [content, news, events, partners] = await Promise.all([
    getHomePageContent(),
    getHomeNews(HOME_NEWS_SECTION_ITEMS),
    getHomeEvents(HOME_EVENTS_SECTION_ITEMS),
    getHomePartners(),
  ]);

  return buildHomeMainSectionsViewModel(content, news, events, partners);
}

export async function getHomePageViewData() {
  const [hero, sections] = await Promise.all([
    getHomeHeroViewData(),
    getHomeMainSectionsViewData(),
  ]);

  return {
    hero,
    ...sections,
  };
}
