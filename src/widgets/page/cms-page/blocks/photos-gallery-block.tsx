import Image from "next/image";

import { BlockShell } from "@/widgets/page/cms-page/components/block-shell";
import type { PhotosGalleryBlock } from "@/widgets/page/cms-page/model";
import { resolveImage } from "@/shared/lib/media";

export function PhotosGalleryPageBlock({ block }: { block: PhotosGalleryBlock }) {
  const images = block.images.data
    .map((item) => {
      const image = resolveImage(item, "gallery", block.title);

      if (!image || !item.id) {
        return null;
      }

      return {
        id: item.id,
        image,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (images.length === 0) {
    return null;
  }

  return (
    <BlockShell>
      {block.title ? <h2 className="text-2xl font-black text-foreground">{block.title}</h2> : null}
      <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((item) => (
          <a
            key={item.id}
            href={item.image.src}
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-[1.5rem] border border-border/70 bg-muted/30"
          >
            <Image
              src={item.image.src}
              alt={item.image.alt}
              width={item.image.width}
              height={item.image.height}
              className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </a>
        ))}
      </div>
    </BlockShell>
  );
}
