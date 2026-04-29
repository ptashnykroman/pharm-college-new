import type { Metadata } from "next";

import {
  SITE_DESCRIPTION,
  SITE_FULL_NAME,
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

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary",
      title: pageTitle,
      description: pageDescription,
      images: ogImage ? [ogImage] : [],
    },
    robots,
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
