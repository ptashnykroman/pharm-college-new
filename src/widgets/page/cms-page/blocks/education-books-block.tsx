import {
  ImageLightboxGallery,
  type ImageLightboxGalleryItem,
} from "@/components/shared/image-lightbox-gallery";
import { resolveImageWithSources } from "@/shared/lib/media";
import { BlockShell } from "@/widgets/page/cms-page/components/block-shell";
import { RichText } from "@/widgets/page/cms-page/components/rich-text";
import type { EducationBooksBlock } from "@/widgets/page/cms-page/model";

function EducationBookImage({
  item,
  title,
  triggerClassName,
  imageClassName,
  imageSizes,
}: {
  item: ImageLightboxGalleryItem;
  title: string;
  triggerClassName?: string;
  imageClassName?: string;
  imageSizes: string;
}) {
  return (
    <ImageLightboxGallery
      items={[item]}
      title={title}
      imageSizes={imageSizes}
      gridClassName="mt-0 !grid-cols-1 !gap-0"
      triggerClassName={triggerClassName}
      imageClassName={imageClassName}
    />
  );
}

function CompactEducationBookCard({
  block,
  imageItem,
}: {
  block: EducationBooksBlock;
  imageItem: ImageLightboxGalleryItem | null;
}) {
  return (
    <div className="!mx-2 inline-block w-full align-top !mt-0 sm:w-[calc(50%-16px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-16px)]">
      <BlockShell className="w-full h-full overflow-hidden border-border/70 !bg-white !p-0 shadow-soft">
        {imageItem ? (
          <EducationBookImage
            item={imageItem}
            title={imageItem.image.alt || "Навчальний посібник"}
            imageSizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
            triggerClassName="rounded-none border-0 shadow-none"
            imageClassName="!object-contain !h-full !w-auto"
          />
        ) : null}

        <div className="space-y-4 p-4 md:p-5">
          <RichText
            html={block.description}
            className="text-sm leading-6 md:text-base md:leading-7"
          />
          {block.authors ? (
            <details
              open={block.authors.default_open}
              className="rounded-[1.25rem] border border-border/70 bg-gradient-soft"
            >
              <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold marker:hidden">
                {block.authors.title}
              </summary>
              <div className="border-t border-border/70 px-4 py-4">
                <RichText
                  html={block.authors.body}
                  className="text-sm leading-6"
                />
              </div>
            </details>
          ) : null}
        </div>
      </BlockShell>
    </div>
  );
}

function FullEducationBookBlock({
  block,
  imageItem,
}: {
  block: EducationBooksBlock;
  imageItem: ImageLightboxGalleryItem | null;
}) {
  return (
    <BlockShell>
      <div className="grid gap-6 md:grid-cols-[minmax(180px,220px)_minmax(0,1fr)] md:items-start">
        {imageItem ? (
          <EducationBookImage
            item={imageItem}
            title={imageItem.image.alt || "Навчальний посібник"}
            imageSizes="(max-width: 767px) 100vw, 220px"
            triggerClassName="mx-auto rounded-[1.5rem] border-0 shadow-soft"
            imageClassName="w-full object-cover"
          />
        ) : null}

        <div className="space-y-4">
          <RichText html={block.description} className="text-base leading-7" />
          {block.authors ? (
            <details
              open={block.authors.default_open}
              className="rounded-[1.5rem] border border-border/70 bg-white/80"
            >
              <summary className="cursor-pointer list-none px-4 py-3 font-semibold marker:hidden">
                {block.authors.title}
              </summary>
              <div className="border-t border-border/70 px-4 py-4">
                <RichText
                  html={block.authors.body}
                  className="text-sm leading-7"
                />
              </div>
            </details>
          ) : null}
        </div>
      </div>
    </BlockShell>
  );
}

export function EducationBooksPageBlock({
  block,
}: {
  block: EducationBooksBlock;
}) {
  const image = resolveImageWithSources(
    block.main_photo,
    "card",
    "Навчальний посібник",
  );

  const imageItem = image
    ? {
        id: `education-book-${block.id}`,
        image,
      }
    : null;

  if (!block.add_container) {
    return <CompactEducationBookCard block={block} imageItem={imageItem} />;
  }

  return <FullEducationBookBlock block={block} imageItem={imageItem} />;
}
