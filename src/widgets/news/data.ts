import { cache } from "react";

import { executeGraphQLRaw } from "@/shared/api/graphql/client";
import { CACHE_TAGS, DEFAULT_REVALIDATE_SECONDS } from "@/shared/lib/site-config";
import { formatDateParts } from "@/shared/lib/date";
import { resolveImage, resolveImageWithSources } from "@/shared/lib/media";
import { buildNewsUrl } from "@/shared/lib/navigation";
import { replaceCmsMediaUrls, stripHtml } from "@/shared/lib/rich-text";
import {
  buildNewsArchive,
  getNewsListingTitle,
  toEmbeddedVideoUrl,
  type NewsArticleViewModel,
  type NewsListItem,
  type RecentNewsItem,
} from "@/widgets/news/model";

const DEFAULT_NEWS_PAGE_SIZE = 9;
const NEWS_OVERVIEW_PAGE_SIZE = 50000;
const NEWS_ARCHIVE_STATIC_MONTH_LIMIT = 12;
const NEWS_ARTICLE_STATIC_LIMIT = 24;

type NewsMonthFilters = {
  date: {
    gte: string;
    lt: string;
  };
};

type NewsOverviewVariables = {
  pageSize: number;
  filters?: NewsMonthFilters;
};

type NewsTagNode = {
  id: string | null;
  attributes: {
    title: string;
  } | null;
};

type MediaAttributes = {
  name?: string | null;
  url?: string | null;
  width?: number | null;
  height?: number | null;
  alternativeText?: string | null;
  formats?: unknown;
};

type MediaResponse = {
  data: {
    attributes: MediaAttributes | null;
  } | null;
} | null;

type MediaListItem = {
  id: string | null;
  attributes: MediaAttributes | null;
};

type NewsOverviewEntity = {
  id: string | null;
  attributes: {
    title: string;
    body: string | null;
    date: string;
    main_photo: MediaResponse;
    preview_photo: MediaResponse;
    news_tags: {
      data: NewsTagNode[];
    } | null;
  } | null;
};

type NewsOverviewResponse = {
  novinas: {
    data: NewsOverviewEntity[];
  } | null;
};

type NewsNavigationEntity = {
  id: string | null;
  attributes: {
    title: string;
    date: string;
  } | null;
};

type NewsNavigationResponse = {
  novinas: {
    data: NewsNavigationEntity[];
  } | null;
};

type NewsArticleEntity = {
  id: string | null;
  attributes: {
    title: string;
    body: string | null;
    date: string;
    video_url: string | null;
    main_photo: MediaResponse;
    preview_photo: MediaResponse;
    collage_photos: {
      data: MediaListItem[];
    } | null;
    news_tags: {
      data: NewsTagNode[];
    } | null;
  } | null;
};

type NewsArticleResponse = {
  novinas: {
    data: NewsArticleEntity[];
  } | null;
};

const NEWS_OVERVIEW_QUERY = `
  query GetNewsOverview($pageSize: Int = 50000, $filters: NovinaFiltersInput) {
    novinas(
      sort: "date:desc"
      filters: $filters
      pagination: { page: 1, pageSize: $pageSize }
    ) {
      data {
        id
        attributes {
          title
          body
          date
          main_photo {
            data {
              attributes {
                name
                url
                width
                height
                alternativeText
              }
            }
          }
          preview_photo {
            data {
              attributes {
                name
                url
                width
                height
                alternativeText
              }
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
`;

const NEWS_NAVIGATION_QUERY = `
  query GetNewsNavigation($pageSize: Int = 50000) {
    novinas(sort: "date:desc", pagination: { page: 1, pageSize: $pageSize }) {
      data {
        id
        attributes {
          title
          date
        }
      }
    }
  }
`;

const NEWS_ARTICLE_QUERY = `
  query GetNewsArticle($newsId: ID!) {
    novinas(filters: { id: { eq: $newsId } }, pagination: { pageSize: 1 }) {
      data {
        id
        attributes {
          title
          body
          date
          video_url
          main_photo {
            data {
              attributes {
                name
                url
                width
                height
                alternativeText
                formats
              }
            }
          }
          preview_photo {
            data {
              attributes {
                name
                url
                width
                height
                alternativeText
                formats
              }
            }
          }
          collage_photos(pagination: { pageSize: 30 }) {
            data {
              id
              attributes {
                name
                url
                width
                height
                alternativeText
                formats
              }
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
`;

function getNewsTagTitle(newsTags: { data: NewsTagNode[] } | null | undefined) {
  return newsTags?.data.find((item) => item.attributes?.title)?.attributes?.title ?? null;
}

function trimExcerpt(body: string | null | undefined) {
  const previewText = stripHtml(body);

  if (!previewText) {
    return "";
  }

  return `${previewText.slice(0, 180).trim()}${previewText.length > 180 ? "..." : ""}`;
}

function readNewsDateSegments(date: string | null | undefined) {
  const match = date?.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (!match) {
    return null;
  }

  return {
    year: match[1],
    month: match[2],
    day: match[3],
  };
}

function buildNewsMonthFilters(year: string | undefined, month: string | undefined) {
  if (!year || !month || !/^\d{4}$/.test(year) || !/^(0[1-9]|1[0-2])$/.test(month)) {
    return undefined;
  }

  const monthStart = `${year}-${month}-01`;
  const nextMonthDate = new Date(Date.UTC(Number(year), Number(month), 1));
  const nextMonthStart = `${nextMonthDate.getUTCFullYear()}-${String(
    nextMonthDate.getUTCMonth() + 1,
  ).padStart(2, "0")}-01`;

  return {
    date: {
      gte: monthStart,
      lt: nextMonthStart,
    },
  } satisfies NewsMonthFilters;
}

function resolveNewsCardImage(
  previewPhoto: MediaResponse,
  mainPhoto: MediaResponse,
  title: string,
) {
  return (
    resolveImage(previewPhoto, "card", title) ||
    resolveImage(mainPhoto, "card", title)
  );
}

function mapOverviewItem(item: NewsOverviewEntity): NewsListItem | null {
  if (!item.id || !item.attributes) {
    return null;
  }

  const image = resolveNewsCardImage(
    item.attributes.preview_photo,
    item.attributes.main_photo,
    item.attributes.title,
  );

  if (!image) {
    return null;
  }

  return {
    id: item.id,
    title: item.attributes.title,
    excerpt: trimExcerpt(item.attributes.body),
    href: buildNewsUrl(item.attributes.date, item.id),
    tag: getNewsTagTitle(item.attributes.news_tags),
    date: formatDateParts(item.attributes.date),
    image,
  };
}

function buildRecentNewsFromNavigation(items: readonly NewsNavigationEntity[]): RecentNewsItem[] {
  return items.slice(0, 5).flatMap((item) => {
    if (!item.id || !item.attributes) {
      return [];
    }

    const date = formatDateParts(item.attributes.date);

    return [
      {
        id: item.id,
        title: item.attributes.title,
        href: buildNewsUrl(item.attributes.date, item.id),
        dateLabel: `${date.day} ${date.monthLong} ${date.year}`,
      },
    ];
  });
}

function resolveGallery(items: readonly MediaListItem[], title: string) {
  return items.flatMap((item) => {
    const image = resolveImageWithSources(item, "gallery", title);

    return image ? [image] : [];
  });
}

const getNewsOverviewData = cache(async (year?: string, month?: string) => {
  const filters = buildNewsMonthFilters(year, month);
  const variables: NewsOverviewVariables = {
    pageSize: NEWS_OVERVIEW_PAGE_SIZE,
  };

  if (filters) {
    variables.filters = filters;
  }

  const response = await executeGraphQLRaw<NewsOverviewResponse>(
    NEWS_OVERVIEW_QUERY,
    variables,
    {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.news],
    },
  );

  const rawItems = response.novinas?.data ?? [];

  return {
    rawItems,
    items: rawItems
      .map(mapOverviewItem)
      .filter((item): item is NewsListItem => Boolean(item)),
  };
});

const getNewsNavigationData = cache(async () => {
  const response = await executeGraphQLRaw<NewsNavigationResponse>(
    NEWS_NAVIGATION_QUERY,
    {
      pageSize: NEWS_OVERVIEW_PAGE_SIZE,
    },
    {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.news, CACHE_TAGS.routes],
    },
  );

  const rawItems = response.novinas?.data ?? [];

  return {
    rawItems,
    recentItems: buildRecentNewsFromNavigation(rawItems),
    archive: buildNewsArchive(
      rawItems.flatMap((item) => (item.attributes?.date ? [item.attributes.date] : [])),
    ),
  };
});

const getNewsArticleById = cache(async (newsId: string) => {
  const response = await executeGraphQLRaw<NewsArticleResponse>(
    NEWS_ARTICLE_QUERY,
    {
      newsId,
    },
    {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.news],
    },
  );

  const entry = response.novinas?.data[0];

  if (!entry?.id || !entry.attributes) {
    return null;
  }

  const { attributes } = entry;
  const heroImage =
    resolveImage(attributes.main_photo, "hero", attributes.title) ||
    resolveImage(attributes.preview_photo, "hero", attributes.title);

  return {
    id: entry.id,
    title: attributes.title,
    href: buildNewsUrl(attributes.date, entry.id),
    excerpt: trimExcerpt(attributes.body),
    bodyHtml: replaceCmsMediaUrls(attributes.body),
    tags: (attributes.news_tags?.data ?? []).flatMap((item) =>
      item.attributes?.title ? [item.attributes.title] : [],
    ),
    date: formatDateParts(attributes.date),
    image: heroImage,
    gallery: resolveGallery(attributes.collage_photos?.data ?? [], attributes.title),
    videoEmbedUrl: toEmbeddedVideoUrl(attributes.video_url),
  } satisfies NewsArticleViewModel;
});

export async function getNewsListPageData({
  year,
  month,
  pageSize = DEFAULT_NEWS_PAGE_SIZE,
}: {
  year?: string;
  month?: string;
  pageSize?: number;
}) {
  const [overview, navigation] = await Promise.all([
    getNewsOverviewData(year, month),
    getNewsNavigationData(),
  ]);
  const title = getNewsListingTitle(year, month);

  return {
    title,
    pageSize,
    items: overview.items,
    recentItems: navigation.recentItems,
    archive: navigation.archive,
  };
}

export async function getNewsArchiveStaticParams(limit = NEWS_ARCHIVE_STATIC_MONTH_LIMIT) {
  const overview = await getNewsNavigationData();
  const months = new Set<string>();
  const params: Array<{ year: string; month: string }> = [];

  for (const item of overview.rawItems) {
    const date = readNewsDateSegments(item.attributes?.date);
    const monthKey = date ? `${date.year}-${date.month}` : null;

    if (!date || !monthKey || months.has(monthKey)) {
      continue;
    }

    months.add(monthKey);
    params.push({
      year: date.year,
      month: date.month,
    });

    if (params.length >= limit) {
      break;
    }
  }

  return params;
}

export async function getNewsArticleStaticParams(limit = NEWS_ARTICLE_STATIC_LIMIT) {
  const overview = await getNewsNavigationData();

  return overview.rawItems.slice(0, limit).flatMap((item) => {
    const date = readNewsDateSegments(item.attributes?.date);

    if (!item.id || !date) {
      return [];
    }

    return [
      {
        year: date.year,
        month: date.month,
        day: date.day,
        id: item.id,
      },
    ];
  });
}

export async function getNewsArticlePageData(newsId: string) {
  const [navigation, article] = await Promise.all([
    getNewsNavigationData(),
    getNewsArticleById(newsId),
  ]);

  return {
    article,
    recentItems: navigation.recentItems,
    archive: navigation.archive,
  };
}

export async function getNewsArticleMetadata(newsId: string) {
  const article = await getNewsArticleById(newsId);

  if (!article) {
    return null;
  }

  return {
    title: article.title,
    description: article.excerpt,
    pathname: article.href,
    image: article.image?.src ?? null,
    openGraphType: 'article' as const,
    publishedTime: article.date.iso,
    modifiedTime: article.date.iso,
    keywords: article.tags,
  };
}
