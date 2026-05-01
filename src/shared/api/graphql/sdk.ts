import {
  GetHeaderScheduleDocument,
  GetHomeEventsDocument,
  GetHomeHeroDocument,
  GetHomeNewsDocument,
  GetHomePageContentDocument,
  GetPageByPathDocument,
  GetPageSeoDocument,
  GetShellDataDocument,
  type GetHomePartnersQuery,
} from "@/shared/api/graphql/generated";
import { executeGraphQL, executeGraphQLRaw } from "@/shared/api/graphql/client";
import { CACHE_TAGS, DEFAULT_REVALIDATE_SECONDS } from "@/shared/lib/site-config";

const HOME_PARTNERS_PAGE_SIZE = 100;

const getHomePartnersPageQuery = /* GraphQL */ `
  query GetHomePartnersPage($page: Int!, $pageSize: Int!) {
    partners(
      filters: { not: { type: { eq: "Other" } } }
      sort: "weight:desc"
      pagination: { page: $page, pageSize: $pageSize }
    ) {
      meta {
        pagination {
          page
          pageCount
        }
      }
      data {
        id
        attributes {
          name
          link
          presentation_link
          type
          weight
          logo {
            ...MediaFileFields
          }
        }
      }
    }
  }

  fragment MediaFileAttributes on UploadFile {
    name
    url
    width
    height
    alternativeText
    formats
  }

  fragment MediaFileFields on UploadFileEntityResponse {
    data {
      attributes {
        ...MediaFileAttributes
      }
    }
  }
`;

type HomePartnersPageQuery = {
  partners: (NonNullable<GetHomePartnersQuery["partners"]> & {
    meta: {
      pagination: {
        page: number;
        pageCount: number;
      };
    };
  }) | null;
};

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

export async function getHomePartners(): Promise<GetHomePartnersQuery> {
  const options = {
    revalidate: DEFAULT_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.partners, CACHE_TAGS.home],
  };

  const firstPage = await executeGraphQLRaw<
    HomePartnersPageQuery,
    { page: number; pageSize: number }
  >(
    getHomePartnersPageQuery,
    {
      page: 1,
      pageSize: HOME_PARTNERS_PAGE_SIZE,
    },
    options,
  );

  const firstPartnersPage = firstPage.partners;

  if (!firstPartnersPage) {
    return {
      partners: null,
    };
  }

  const totalPages = firstPartnersPage.meta.pagination.pageCount;
  const partnerItems = [...firstPartnersPage.data];

  for (let page = 2; page <= totalPages; page += 1) {
    const nextPage = await executeGraphQLRaw<
      HomePartnersPageQuery,
      { page: number; pageSize: number }
    >(
      getHomePartnersPageQuery,
      {
        page,
        pageSize: HOME_PARTNERS_PAGE_SIZE,
      },
      options,
    );

    partnerItems.push(...(nextPage.partners?.data ?? []));
  }

  return {
    partners: {
      ...firstPartnersPage,
      data: partnerItems,
    },
  };
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
