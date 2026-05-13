import type { ReactNode } from 'react'

import type { HomeHeroViewModel, HomeMainSectionsViewModel } from '@/widgets/home/model'
import { HomeHeroSection } from '@/widgets/home/hero/hero-section'
import { HomeNewsSection } from '@/widgets/home/news/home-news-section'
import { AboutSection } from '@/widgets/home/sections/about-section'
import { ContactsSection } from '@/widgets/home/sections/contacts-section'
import { EventsSection } from '@/widgets/home/sections/events-section'
import { GallerySection } from '@/widgets/home/sections/gallery-section'
import { PartnersSection } from '@/widgets/home/sections/partners-section'
import { StatsSection } from '@/widgets/home/sections/stats-section'

export function HomePageView({ hero, children }: { hero: HomeHeroViewModel; children: ReactNode }) {
  return (
    <>
      <HomeHeroSection hero={hero} />
      <main>{children}</main>
    </>
  )
}

export async function HomeMainSections({ sectionsPromise }: { sectionsPromise: Promise<HomeMainSectionsViewModel> }) {
  const sections = await sectionsPromise

  return <HomeMainSectionsView sections={sections} />
}

function HomeMainSectionsView({ sections }: { sections: HomeMainSectionsViewModel }) {
  return (
    <>
      <AboutSection about={sections.about} />
      <StatsSection stats={sections.stats} />
      <HomeNewsSection items={sections.news} />
      <EventsSection events={sections.events} />
      <GallerySection gallery={sections.gallery} />
      <ContactsSection contacts={sections.contacts} />
      <PartnersSection partners={sections.partners} />
    </>
  )
}

export function HomeMainSectionsFallback() {
  return (
    <div className="bg-background px-4 py-16 md:px-6">
      <div className="container mx-auto px-4 pt-16 pb-32 md:px-6">
        <div className="mx-auto max-w-5xl animate-pulse space-y-5">
          <div className="h-8 w-2/3 rounded-full bg-muted" />
          <div className="h-4 rounded-full bg-muted" />
          <div className="h-4 rounded-full bg-muted" />
          <div className="h-4 w-4/5 rounded-full bg-muted" />
          <div className="h-4 rounded-full bg-muted" />
          <div className="h-4 w-4/5 rounded-full bg-muted" />
        </div>
      </div>
    </div>
  )
}
