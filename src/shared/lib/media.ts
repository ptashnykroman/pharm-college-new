import { STRAPI_API_URL } from "@/shared/lib/site-config";

type MediaFormatKey = "original" | "thumbnail" | "small" | "medium" | "large";

type MediaFormat = {
  url?: string | null;
  width?: number | null;
  height?: number | null;
  name?: string | null;
};

type MediaAttributes = {
  name?: string | null;
  url?: string | null;
  width?: number | null;
  height?: number | null;
  alternativeText?: string | null;
  formats?: unknown;
};

type MediaEntityLike =
  | {
      data: {
        attributes: MediaAttributes | null;
      } | null;
    }
  | null
  | undefined;

type MediaItemLike =
  | {
      attributes: MediaAttributes | null;
    }
  | null
  | undefined;

export type MediaSlot = "hero" | "card" | "gallery" | "logo" | "footer";

export type ResolvedImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type ResolvedImageSource = {
  src: string;
  width: number;
  height: number;
};

export type ResolvedImageWithSources = ResolvedImage & {
  sources: ResolvedImageSource[];
};

type ResolvedMedia = MediaFormat & {
  alternativeText?: string | null;
  name?: string | null;
};

const SLOT_PRIORITY: Record<MediaSlot, MediaFormatKey[]> = {
  hero: ["original", "large", "medium", "small", "thumbnail"],
  card: ["original", "large", "medium", "small", "thumbnail"],
  gallery: ["large", "original", "medium", "small", "thumbnail"],
  logo: ["original", "medium", "small", "large", "thumbnail"],
  footer: ["original", "medium", "small", "large", "thumbnail"],
};

const SOURCE_ORDER: MediaFormatKey[] = ["thumbnail", "small", "medium", "large"];

function asMediaAttributes(
  media: MediaEntityLike | MediaItemLike,
): MediaAttributes | null {
  if (!media) {
    return null;
  }

  if ("data" in media) {
    return media.data?.attributes ?? null;
  }

  return media.attributes ?? null;
}

export function toAbsoluteMediaUrl(url: string | null | undefined) {
  if (!url) {
    return null;
  }

  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `${STRAPI_API_URL}${url}`;
}

function parseFormats(formats: unknown) {
  if (!formats || typeof formats !== "object") {
    return {};
  }

  return formats as Partial<Record<MediaFormatKey, MediaFormat>>;
}

function resolveAltText(
  candidate: Pick<ResolvedMedia, "alternativeText" | "name">,
  fallbackAlt?: string,
) {
  return (
    candidate.alternativeText?.trim() ||
    fallbackAlt?.trim() ||
    candidate.name?.trim() ||
    ""
  );
}

function collectResolvedSources(original: MediaAttributes) {
  const parsedFormats = parseFormats(original.formats);
  const sources = new Map<string, ResolvedImageSource>();

  for (const key of SOURCE_ORDER) {
    const candidate = parsedFormats[key];
    const absoluteUrl = toAbsoluteMediaUrl(candidate?.url);

    if (!absoluteUrl || !candidate?.width || !candidate.height) {
      continue;
    }

    sources.set(absoluteUrl, {
      src: absoluteUrl,
      width: candidate.width,
      height: candidate.height,
    });
  }

  const originalUrl = toAbsoluteMediaUrl(original.url);

  if (originalUrl && original.width && original.height) {
    sources.set(originalUrl, {
      src: originalUrl,
      width: original.width,
      height: original.height,
    });
  }

  return Array.from(sources.values()).sort((left, right) => left.width - right.width);
}

function resolveVariant(
  original: MediaAttributes,
  slot: MediaSlot,
): ResolvedMedia | null {
  const originalUrl = toAbsoluteMediaUrl(original.url);
  if (!originalUrl) {
    return null;
  }

  const parsedFormats = parseFormats(original.formats);

  for (const key of SLOT_PRIORITY[slot]) {
    if (key === "original" && original.width && original.height) {
      return {
        url: originalUrl,
        width: original.width,
        height: original.height,
        alternativeText: original.alternativeText,
        name: original.name,
      };
    }

    const candidate = parsedFormats[key];

    if (candidate?.url && candidate.width && candidate.height) {
      return {
        ...candidate,
        url: toAbsoluteMediaUrl(candidate.url),
        alternativeText: original.alternativeText,
        name: original.name,
      };
    }
  }

  return {
    url: originalUrl,
    width: original.width,
    height: original.height,
    alternativeText: original.alternativeText,
    name: original.name,
  };
}

export function isSvgAsset(url: string | null | undefined) {
  return Boolean(url?.toLowerCase().includes(".svg"));
}

export function resolveImage(
  media: MediaEntityLike | MediaItemLike,
  slot: MediaSlot,
  fallbackAlt?: string,
): ResolvedImage | null {
  const attributes = asMediaAttributes(media);
  if (!attributes) {
    return null;
  }

  const candidate = resolveVariant(attributes, slot);
  if (!candidate?.url || !candidate.width || !candidate.height) {
    return null;
  }

  return {
    src: candidate.url,
    width: candidate.width,
    height: candidate.height,
    alt: resolveAltText(candidate, fallbackAlt),
  };
}

export function resolveImageWithSources(
  media: MediaEntityLike | MediaItemLike,
  slot: MediaSlot,
  fallbackAlt?: string,
): ResolvedImageWithSources | null {
  const attributes = asMediaAttributes(media);
  if (!attributes) {
    return null;
  }

  const candidate = resolveVariant(attributes, slot);
  if (!candidate?.url || !candidate.width || !candidate.height) {
    return null;
  }

  const sources = collectResolvedSources(attributes);

  if (!sources.length) {
    return null;
  }

  return {
    src: candidate.url,
    width: candidate.width,
    height: candidate.height,
    alt: resolveAltText(candidate, fallbackAlt),
    sources,
  };
}
