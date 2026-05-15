import {
  GetHeaderScheduleDocument,
  type GetHomeEventsQuery,
  GetHomeHeroDocument,
  GetHomePageContentDocument,
  GetPageByPathDocument,
  GetPageSeoDocument,
  GetShellDataDocument,
  type GetHomeNewsQuery,
  type GetHomePartnersQuery,
} from "@/shared/api/graphql/generated";
import { executeGraphQL, executeGraphQLRaw } from "@/shared/api/graphql/client";
import { CACHE_TAGS, DEFAULT_REVALIDATE_SECONDS } from "@/shared/lib/site-config";

const HOME_NEWS_PAGE_SIZE = 9;
const HOME_EVENTS_PAGE_SIZE = 6;
const HOME_PARTNERS_PAGE_SIZE = 100;
const CMS_PAGE_PATHS_PAGE_SIZE = 100;

const getCmsPagePathsQuery = /* GraphQL */ `
  query GetCmsPagePaths($page: Int!, $pageSize: Int!) {
    pages(sort: ["page_url:asc"], pagination: { page: $page, pageSize: $pageSize }) {
      meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
      data {
        id
        attributes {
          page_url
          publishedAt
          updatedAt
        }
      }
    }
  }
`;

const getHomeNewsPageQuery = /* GraphQL */ `
  query GetHomeNewsPage($page: Int!, $pageSize: Int!) {
    novinas(sort: "date:desc", pagination: { page: $page, pageSize: $pageSize }) {
      meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
      data {
        id
        attributes {
          title
          body
          date
          video_url
          main_photo {
            ...MediaFileFields
          }
          preview_photo {
            ...MediaFileFields
          }
          collage_photos(pagination: { pageSize: 10 }) {
            data {
              ...MediaFileListItemFields
            }
          }
          news_tags {
            data {
              id
              attributes {
                title
              }
            }
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

  fragment MediaFileListItemFields on UploadFileEntity {
    id
    attributes {
      ...MediaFileAttributes
    }
  }
`;

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

const getHomeEventsPageQuery = /* GraphQL */ `
  query GetHomeEventsPage($pageSize: Int!) {
    events(
      pagination: { pageSize: $pageSize }
      sort: ["weight:desc", "date:desc"]
    ) {
      data {
        id
        attributes {
          title
          date
          weight
          image {
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

type HomeNewsPageQuery = {
  novinas: (NonNullable<GetHomeNewsQuery["novinas"]> & {
    meta: {
      pagination: {
        total: number;
        page: number;
        pageSize: number;
        pageCount: number;
      };
    };
  }) | null;
};

type CmsPagePathsPageQuery = {
  pages: {
    meta: {
      pagination: {
        total: number;
        page: number;
        pageSize: number;
        pageCount: number;
      };
    };
    data: Array<{
      id: string;
      attributes: {
        page_url?: string | null;
        publishedAt?: string | null;
        updatedAt?: string | null;
      } | null;
    }>;
  } | null;
};

export type CmsPageEntry = {
  pathname: string;
  updatedAt: string | null;
};

function normalizeCmsPath(path: string | null | undefined) {
  const trimmed = path?.trim();

  if (!trimmed || /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed)) {
    return null;
  }

  const [withoutQuery] = trimmed.split(/[?#]/);
  const normalized = `/${withoutQuery.replace(/^\/+/, "")}`
    .replace(/\/{2,}/g, "/")
    .replace(/\/+$/, "");

  return normalized || "/";
}

function collectCmsPageEntries(page: CmsPagePathsPageQuery) {
  return (
    page.pages?.data.flatMap((entry) => {
      const pathname = normalizeCmsPath(entry.attributes?.page_url);

      if (!pathname) {
        return [];
      }

      return [
        {
          pathname,
          updatedAt: entry.attributes?.updatedAt ?? entry.attributes?.publishedAt ?? null,
        } satisfies CmsPageEntry,
      ];
    }) ?? []
  );
}

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

export async function getHomeNews(
  pageSize = HOME_NEWS_PAGE_SIZE,
): Promise<GetHomeNewsQuery> {
  const options = {
    revalidate: DEFAULT_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.news, CACHE_TAGS.home],
  };

  const firstPage = await executeGraphQLRaw<
    HomeNewsPageQuery,
    { page: number; pageSize: number }
  >(
    getHomeNewsPageQuery,
    {
      page: 1,
      pageSize,
    },
    options,
  );

  const firstNewsPage = firstPage.novinas;

  if (!firstNewsPage) {
    return {
      novinas: null,
    };
  }

  const totalPages = firstNewsPage.meta.pagination.pageCount;

  if (totalPages <= 1) {
    return {
      novinas: firstNewsPage,
    };
  }

  const remainingPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, index) =>
      executeGraphQLRaw<HomeNewsPageQuery, { page: number; pageSize: number }>(
        getHomeNewsPageQuery,
        {
          page: index + 2,
          pageSize,
        },
        options,
      ),
    ),
  );

  return {
    novinas: {
      ...firstNewsPage,
      data: [
        ...firstNewsPage.data,
        ...remainingPages.flatMap((page) => page.novinas?.data ?? []),
      ],
    },
  };
}

export function getHomeEvents(
  pageSize = HOME_EVENTS_PAGE_SIZE,
): Promise<GetHomeEventsQuery> {
  return executeGraphQLRaw<GetHomeEventsQuery, { pageSize: number }>(
    getHomeEventsPageQuery,
    {
      pageSize,
    },
    {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.events, CACHE_TAGS.home],
    },
  );
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

export async function getAllCmsPagePaths(
  pageSize = CMS_PAGE_PATHS_PAGE_SIZE,
): Promise<string[]> {
  const entries = await getAllCmsPageEntries(pageSize);

  return entries.map((entry) => entry.pathname);
}

export async function getAllCmsPageEntries(
  pageSize = CMS_PAGE_PATHS_PAGE_SIZE,
): Promise<CmsPageEntry[]> {
  const options = {
    revalidate: DEFAULT_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.page, CACHE_TAGS.routes],
  };

  const firstPage = await executeGraphQLRaw<
    CmsPagePathsPageQuery,
    { page: number; pageSize: number }
  >(
    getCmsPagePathsQuery,
    {
      page: 1,
      pageSize,
    },
    options,
  );

  const pageCount = firstPage.pages?.meta.pagination.pageCount ?? 0;
  const entryMap = new Map<string, CmsPageEntry>();

  collectCmsPageEntries(firstPage).forEach((entry) => {
    entryMap.set(entry.pathname, entry);
  });

  if (pageCount > 1) {
    const remainingPages = await Promise.all(
      Array.from({ length: pageCount - 1 }, (_, index) =>
        executeGraphQLRaw<CmsPagePathsPageQuery, { page: number; pageSize: number }>(
          getCmsPagePathsQuery,
          {
            page: index + 2,
            pageSize,
          },
          options,
        ),
      ),
    );

    remainingPages.forEach((page) => {
      collectCmsPageEntries(page).forEach((entry) => {
        entryMap.set(entry.pathname, entry);
      });
    });
  }

  return Array.from(entryMap.values()).sort((left, right) =>
    left.pathname.localeCompare(right.pathname, "uk"),
  );
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
