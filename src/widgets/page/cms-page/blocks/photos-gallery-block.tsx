import { ImageLightboxGallery, type ImageLightboxGalleryItem } from '@/components/shared/image-lightbox-gallery'
import { resolveImageWithSources } from '@/shared/lib/media'
import { BlockShell } from '@/widgets/page/cms-page/components/block-shell'
import type { PhotosGalleryBlock } from '@/widgets/page/cms-page/model'

export function PhotosGalleryPageBlock({ block }: { block: PhotosGalleryBlock }) {
  const images = block.images.data
    .map((item) => {
      const image = resolveImageWithSources(item, 'gallery', block.title)

      if (!image || !item.id) {
        return null
      }

      return {
        id: item.id,
        image,
      } satisfies ImageLightboxGalleryItem
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  if (images.length === 0) {
    return null
  }

  return (
    <BlockShell>
      {block.title ? <h2 className="text-2xl font-black text-foreground">{block.title}</h2> : null}
      <ImageLightboxGallery
        items={images}
        title={block.title}
        gridClassName="grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        triggerClassName="bg-muted/30 shadow-none hover:shadow-soft"
        imageClassName="transition-transform duration-500"
        imageSizes="(max-width: 767px) 50vw, 33vw"
      />
    </BlockShell>
  )
}
