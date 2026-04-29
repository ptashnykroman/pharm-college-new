import { createHomeMetadata } from "@/shared/lib/metadata";
import { getHomePageViewData } from "@/widgets/home/data";
import { HomePageView } from "@/widgets/home/home-page";

export const metadata = createHomeMetadata();
export const revalidate = 3600;

export default async function Home() {
  const data = await getHomePageViewData();

  return <HomePageView data={data} />;
}
