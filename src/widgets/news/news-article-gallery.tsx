"use client";

import { useMemo } from "react";

import {
  ImageLightboxGallery,
  type ImageLightboxGalleryItem,
} from "@/components/shared/image-lightbox-gallery";
import type { ResolvedImageWithSources } from "@/shared/lib/media";

export function NewsArticleGallery({
  images,
  title,
}: {
  images: ResolvedImageWithSources[];
  title: string;
}) {
  const items = useMemo<ImageLightboxGalleryItem[]>(
    () =>
      images.map((image, index) => ({
        id: `${image.src}-${index}`,
        image,
      })),
    [images],
  );

  if (!images.length) {
    return null;
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-black text-foreground">Фотогалерея</h2>
      <ImageLightboxGallery
        items={items}
        title={title}
        imageSizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
      />
    </section>
  );
}
