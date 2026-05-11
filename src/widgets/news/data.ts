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
  query GetNewsOverview($pageSize: Int = 50000) {
    novinas(sort: "date:desc", pagination: { page: 1, pageSize: $pageSize }) {
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

function buildRecentNews(items: readonly NewsOverviewEntity[]): RecentNewsItem[] {
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

const getNewsOverviewData = cache(async () => {
  const response = await executeGraphQLRaw<NewsOverviewResponse>(
    NEWS_OVERVIEW_QUERY,
    {
      pageSize: NEWS_OVERVIEW_PAGE_SIZE,
    },
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
    recentItems: buildRecentNews(rawItems),
    archive: buildNewsArchive(
      rawItems.flatMap((item) => (item.attributes?.date ? [item.attributes.date] : [])),
    ),
  };
});

async function getNewsArticleById(newsId: string) {
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
}

export async function getNewsListPageData({
  year,
  month,
  pageSize = DEFAULT_NEWS_PAGE_SIZE,
}: {
  year?: string;
  month?: string;
  pageSize?: number;
}) {
  const overview = await getNewsOverviewData();
  const title = getNewsListingTitle(year, month);
  const items =
    year && month
      ? overview.items.filter((item) => item.date.iso.startsWith(`${year}-${month}-`))
      : overview.items;

  return {
    title,
    pageSize,
    items,
    recentItems: overview.recentItems,
    archive: overview.archive,
  };
}

export async function getNewsArticlePageData(newsId: string) {
  const [overview, article] = await Promise.all([
    getNewsOverviewData(),
    getNewsArticleById(newsId),
  ]);

  return {
    article,
    recentItems: overview.recentItems,
    archive: overview.archive,
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
  };
}
