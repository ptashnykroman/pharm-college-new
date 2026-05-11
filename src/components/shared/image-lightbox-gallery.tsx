"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState } from "react";

import type {
  ImageLightboxSlide,
  ImageLightboxSource,
} from "@/components/shared/image-lightbox";
import { cn } from "@/lib/utils";
import type {
  ResolvedImageSource,
  ResolvedImageWithSources,
} from "@/shared/lib/media";

const LIGHTBOX_IMAGE_WIDTHS = [
  16,
  32,
  48,
  64,
  96,
  128,
  256,
  384,
  640,
  750,
  828,
  1080,
  1200,
  1920,
  2048,
  3840,
];

const LIGHTBOX_IMAGE_QUALITY = 75;

const loadImageLightbox = () => import("@/components/shared/image-lightbox");

const ImageLightbox = dynamic(
  () => loadImageLightbox().then((mod) => mod.ImageLightbox),
  { ssr: false },
);

export type ImageLightboxGalleryItem = {
  id: string;
  image: ResolvedImageWithSources;
};

function toNextImageUrl(src: string, width: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${LIGHTBOX_IMAGE_QUALITY}`;
}

function getSortedSources(image: ResolvedImageWithSources) {
  const fallbackSource: ResolvedImageSource = {
    src: image.src,
    width: image.width,
    height: image.height,
  };

  const sources = image.sources.length ? image.sources : [fallbackSource];

  return [...sources].sort((left, right) => left.width - right.width);
}

function pickSourceForWidth(
  sources: readonly ResolvedImageSource[],
  targetWidth: number,
) {
  return (
    sources.find((source) => source.width >= targetWidth) ??
    sources[sources.length - 1]
  );
}

function buildOptimizedSource(
  source: ResolvedImageSource,
  targetWidth: number,
  targetHeight: number,
): ImageLightboxSource {
  return {
    src: toNextImageUrl(source.src, targetWidth),
    width: targetWidth,
    height: targetHeight,
  };
}

function buildOriginalSource(source: ResolvedImageSource): ImageLightboxSource {
  return {
    src: source.src,
    width: source.width,
    height: source.height,
  };
}

function buildLargestSource(source: ResolvedImageSource): ImageLightboxSource {
  if (LIGHTBOX_IMAGE_WIDTHS.includes(source.width)) {
    return {
      src: toNextImageUrl(source.src, source.width),
      width: source.width,
      height: source.height,
    };
  }

  return buildOriginalSource(source);
}

function buildLightboxSlide(image: ResolvedImageWithSources): ImageLightboxSlide {
  const sources = getSortedSources(image);
  const largestSource = sources[sources.length - 1];

  const responsiveSources = LIGHTBOX_IMAGE_WIDTHS.filter(
    (width) => width < largestSource.width,
  ).map((width) => {
    const source = pickSourceForWidth(sources, width);
    const height = Math.round(
      (largestSource.height / largestSource.width) * width,
    );

    return buildOptimizedSource(source, width, height);
  });

  return {
    src: buildLargestSource(largestSource).src,
    alt: image.alt,
    width: largestSource.width,
    height: largestSource.height,
    srcSet: [...responsiveSources, buildLargestSource(largestSource)],
  };
}

export function ImageLightboxGallery({
  items,
  title,
  gridClassName,
  triggerClassName,
  imageClassName,
  imageSizes,
}: {
  items: ImageLightboxGalleryItem[];
  title: string;
  gridClassName?: string;
  triggerClassName?: string;
  imageClassName?: string;
  imageSizes: string;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [shouldRenderLightbox, setShouldRenderLightbox] = useState(false);

  const slides = useMemo(
    () => items.map((item) => buildLightboxSlide(item.image)),
    [items],
  );

  if (!items.length) {
    return null;
  }

  const prepareLightbox = () => {
    void loadImageLightbox();
  };

  const openLightbox = (index: number) => {
    prepareLightbox();
    setShouldRenderLightbox(true);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div
        className={cn(
          "mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
          gridClassName,
        )}
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onPointerEnter={prepareLightbox}
            onFocus={prepareLightbox}
            onTouchStart={prepareLightbox}
            onClick={() => openLightbox(index)}
            aria-haspopup="dialog"
            aria-label={`Відкрити фото ${index + 1}`}
            className={cn(
              "group w-full cursor-pointer overflow-hidden rounded-[1.5rem] border border-border/70 bg-white text-left shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-card focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              triggerClassName,
            )}
          >
            <Image
              src={item.image.src}
              alt={item.image.alt || title}
              width={item.image.width}
              height={item.image.height}
              sizes={imageSizes}
              className={cn(
                "aspect-[4/3] h-full w-full object-cover transition-bounce group-hover:scale-105",
                imageClassName,
              )}
            />
          </button>
        ))}
      </div>

      {shouldRenderLightbox ? (
        <ImageLightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={slides}
        />
      ) : null}
    </>
  );
}
