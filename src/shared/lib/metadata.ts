import type { Metadata } from "next";

import {
  SITE_DESCRIPTION,
  SITE_FULL_NAME,
  SITE_LOCALE,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_URL,
} from "@/shared/lib/site-config";

type SeoMetaItem = {
  id?: string | null;
  name: string;
  content: string;
};

type MetadataInput = {
  title?: string | null;
  description?: string | null;
  pathname?: string;
  image?: string | null;
  indexable?: boolean;
  keywords?: readonly string[] | string | null;
  openGraphType?: "website" | "article" | "profile";
  publishedTime?: string | null;
  modifiedTime?: string | null;
  authors?: readonly string[] | string | null;
  category?: string | null;
  meta?: readonly (SeoMetaItem | null)[] | null;
};

function createAbsoluteUrl(pathname = "/") {
  return new URL(pathname, `${SITE_URL}/`);
}

function getMetaContent(
  meta: readonly (SeoMetaItem | null)[] | null | undefined,
  name: string,
) {
  return meta?.find((item) => item?.name === name)?.content ?? null;
}

function normalizeKeywords(
  value: MetadataInput["keywords"] | string | null | undefined,
) : string[] | undefined {
  const rawKeywords: string[] | undefined = Array.isArray(value)
    ? [...value]
    : typeof value === "string"
      ? value.split(",").map((item: string) => item.trim())
      : undefined;

  const uniqueKeywords: string[] = Array.from(
    new Set((rawKeywords ?? []).map((item: string) => item.trim()).filter(Boolean)),
  );

  return uniqueKeywords.length ? uniqueKeywords : undefined;
}

function normalizeAuthors(value: MetadataInput["authors"]) {
  const authors = Array.isArray(value)
    ? value
    : value
      ? [value]
      : [];

  return authors
    .map((name) => name.trim())
    .filter(Boolean)
    .map((name) => ({ name }));
}

function resolveRobots(indexable: boolean, meta: MetadataInput["meta"]) {
  const robotsMeta = getMetaContent(meta, "robots");

  if (!indexable || robotsMeta?.includes("noindex")) {
    return {
      index: false,
      follow: false,
    };
  }

  return {
    index: true,
    follow: !robotsMeta?.includes("nofollow"),
  };
}

export function buildPageMetadata({
  title,
  description,
  pathname = "/",
  image,
  indexable = true,
  keywords,
  openGraphType,
  publishedTime,
  modifiedTime,
  authors,
  category,
  meta,
}: MetadataInput): Metadata {
  const pageTitle = title?.trim() || SITE_FULL_NAME;
  const pageDescription = description?.trim() || SITE_DESCRIPTION;
  const canonical =
    getMetaContent(meta, "canonical") ||
    getMetaContent(meta, "shortlink") ||
    createAbsoluteUrl(pathname).toString();
  const ogImage = getMetaContent(meta, "og:image") || image || SITE_OG_IMAGE;
  const robots = resolveRobots(indexable, meta);
  const pageKeywords = normalizeKeywords(
    keywords ?? getMetaContent(meta, "keywords"),
  );
  const pageAuthors = normalizeAuthors(authors);
  const typeFromMeta = getMetaContent(meta, "og:type");
  const pageType =
    openGraphType ??
    (typeFromMeta === "article" || typeFromMeta === "profile"
      ? typeFromMeta
      : "website");
  const publishedAt =
    publishedTime ?? getMetaContent(meta, "article:published_time");
  const modifiedAt =
    modifiedTime ?? getMetaContent(meta, "article:modified_time");

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    authors: pageAuthors.length ? pageAuthors : undefined,
    creator: SITE_NAME,
    publisher: SITE_FULL_NAME,
    category: category ?? undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: pageType,
      url: canonical,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : [],
      ...(publishedAt ? { publishedTime: publishedAt } : {}),
      ...(modifiedAt ? { modifiedTime: modifiedAt } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: pageTitle,
      description: pageDescription,
      images: ogImage ? [ogImage] : [],
    },
    robots,
    other: {
      ...(indexable ? {} : { googlebot: "noindex, nofollow" }),
    },
  };
}

export function createHomeMetadata(): Metadata {
  return buildPageMetadata({
    title: SITE_FULL_NAME,
    description: SITE_DESCRIPTION,
    pathname: "/",
    image: SITE_OG_IMAGE,
  });
}

export function createPlaceholderMetadata(pathname: string): Metadata {
  return buildPageMetadata({
    title: "Сторінка в розробці",
    description:
      "Цю сторінку ще переносять у нову версію сайту. Скоро вона з’явиться в оновленому вигляді.",
    pathname,
    indexable: false,
  });
}
