import Image from 'next/image'

import { resolveImage } from '@/shared/lib/media'
import { normalizeHref } from '@/shared/lib/navigation'
import { SmartLink } from '@/widgets/navigation/smart-link'
import type { ButtonImagesBlock } from '@/widgets/page/cms-page/model'

export function ButtonImagesPageBlock({ block }: { block: ButtonImagesBlock }) {
  const items = block.Components.filter((item): item is NonNullable<typeof item> => Boolean(item))

  if (items.length === 0) {
    return null
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => {
        const image = resolveImage(item.image, 'card')

        if (!image) {
          return null
        }

        return (
          <SmartLink
            key={item.id}
            href={normalizeHref(item.link)}
            className="group overflow-hidden rounded-[1.75rem] border border-border/80 bg-white shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-card"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </SmartLink>
        )
      })}
    </div>
  )
}
