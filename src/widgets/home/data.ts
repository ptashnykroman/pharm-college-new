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

export async function getHomeHeroViewData() {
  const hero = await getHomeHero();

  return buildHomeHeroViewModel(hero);
}

export async function getHomeMainSectionsViewData() {
  const [content, news, events, partners] = await Promise.all([
    getHomePageContent(),
    getHomeNews(),
    getHomeEvents(),
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
