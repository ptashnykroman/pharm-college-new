import {
  getHomeEvents,
  getHomeHero,
  getHomeNews,
  getHomePageContent,
  getHomePartners,
} from "@/shared/api/graphql/sdk";
import { buildHomePageViewModel } from "@/widgets/home/model";

export async function getHomePageViewData() {
  const [hero, content, news, events, partners] = await Promise.all([
    getHomeHero(),
    getHomePageContent(),
    getHomeNews(9),
    getHomeEvents(),
    getHomePartners(),
  ]);

  return buildHomePageViewModel(hero, content, news, events, partners);
}
