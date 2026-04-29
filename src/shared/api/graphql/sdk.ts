import {
  GetHeaderScheduleDocument,
  GetHomeEventsDocument,
  GetHomeHeroDocument,
  GetHomeNewsDocument,
  GetHomePageContentDocument,
  GetPageByPathDocument,
  GetHomePartnersDocument,
  GetPageSeoDocument,
  GetShellDataDocument,
} from "@/shared/api/graphql/generated";
import { executeGraphQL } from "@/shared/api/graphql/client";
import { CACHE_TAGS, DEFAULT_REVALIDATE_SECONDS } from "@/shared/lib/site-config";

export function getShellData() {
  return executeGraphQL(GetShellDataDocument, {}, {
    revalidate: DEFAULT_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.header, CACHE_TAGS.footer, CACHE_TAGS.routes],
  });
}

export function getHeaderSchedule() {
  return executeGraphQL(GetHeaderScheduleDocument, {}, {
    revalidate: DEFAULT_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.header, CACHE_TAGS.routes],
  });
}

export function getHomeHero() {
  return executeGraphQL(GetHomeHeroDocument, {}, {
    revalidate: DEFAULT_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.home, CACHE_TAGS.header],
  });
}

export function getHomePageContent() {
  return executeGraphQL(GetHomePageContentDocument, {}, {
    revalidate: DEFAULT_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.home],
  });
}

export function getHomeNews(pageSize = 9) {
  return executeGraphQL(
    GetHomeNewsDocument,
    {
      pageSize,
    },
    {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.news, CACHE_TAGS.home],
    },
  );
}

export function getHomeEvents() {
  return executeGraphQL(GetHomeEventsDocument, {}, {
    revalidate: DEFAULT_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.events, CACHE_TAGS.home],
  });
}

export function getHomePartners() {
  return executeGraphQL(GetHomePartnersDocument, {}, {
    revalidate: DEFAULT_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.partners, CACHE_TAGS.home],
  });
}

export function getPageSeo(pageUrl: string) {
  return executeGraphQL(
    GetPageSeoDocument,
    {
      pageUrl,
    },
    {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.pageSeo, CACHE_TAGS.routes],
    },
  );
}

export function getPageByPath(pageUrl: string) {
  return executeGraphQL(
    GetPageByPathDocument,
    {
      pageUrl,
    },
    {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.page, CACHE_TAGS.pageSeo, CACHE_TAGS.routes],
    },
  );
}
