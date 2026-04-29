import type { HomePageViewModel } from "@/widgets/home/model";
import { HomeHeroSection } from "@/widgets/home/hero/hero-section";
import { HomeNewsSection } from "@/widgets/home/news/home-news-section";
import { AboutSection } from "@/widgets/home/sections/about-section";
import { ContactsSection } from "@/widgets/home/sections/contacts-section";
import { EventsSection } from "@/widgets/home/sections/events-section";
import { GallerySection } from "@/widgets/home/sections/gallery-section";
import { PartnersSection } from "@/widgets/home/sections/partners-section";
import { StatsSection } from "@/widgets/home/sections/stats-section";

export function HomePageView({ data }: { data: HomePageViewModel }) {
  return (
    <>
      <HomeHeroSection hero={data.hero} />
      <main>
        <AboutSection about={data.about} />
        <StatsSection stats={data.stats} />
        <HomeNewsSection items={data.news} />
        <EventsSection events={data.events} />
        <GallerySection gallery={data.gallery} />
        <ContactsSection contacts={data.contacts} />
        <PartnersSection partners={data.partners} />
      </main>
    </>
  );
}
