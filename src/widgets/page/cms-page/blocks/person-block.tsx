import Image from 'next/image'
import { ArrowRight, Mail, Phone } from 'lucide-react'

import { AppButton } from '@/components/shared/app-button'
import { resolveImage } from '@/shared/lib/media'
import { SmartLink } from '@/widgets/navigation/smart-link'
import { BlockShell } from '@/widgets/page/cms-page/components/block-shell'
import { normalizePhone } from '@/widgets/page/cms-page/lib'
import type { PersonBlock } from '@/widgets/page/cms-page/model'

export function PersonPageBlock({ block }: { block: PersonBlock }) {
  const worker = block.worker?.data?.attributes

  if (!worker) {
    return null
  }

  const photo = resolveImage(worker.photo, 'card', worker.name)
  const personHref =
    worker.cycle_commission?.data?.attributes?.slug && worker.slug
      ? `/structure/cmks/${worker.cycle_commission.data.attributes.slug}/${worker.slug}`
      : null
  
  return (
    <BlockShell>
      <div className="flex flex-col items-center gap-5">
        {photo ? (
          <div className="overflow-hidden rounded-[1.75rem] bg-[rgba(var(--muted),0.3)] text-center w-full">
            {personHref ? (
              <SmartLink href={personHref} className="block">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="w-full h-full object-cover max-h-[400px] max-w-[300px] mx-auto"
                />
              </SmartLink>
            ) : (
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="w-full h-full object-cover max-h-[360px] max-w-[300px] mx-auto"
              />
            )}
          </div>
        ) : null}

        <div>
          <h3 className="text-xl font-black text-foreground text-center">{worker.name}</h3>
          {worker.position ? <p className="mt-2 text-sm text-primary text-center">{worker.position}</p> : null}
        </div>

        <div className="space-y-3 text-sm text-[rgba(var(--foreground),0.8)]">
          {worker.phone ? (
            <a className="flex items-center gap-2 hover:text-primary" href={`tel:${normalizePhone(worker.phone)}`}>
              <Phone className="h-4 w-4" />
              <span>{worker.phone}</span>
            </a>
          ) : null}
          {worker.email ? (
            <a className="flex items-center gap-2 hover:text-primary" href={`mailto:${worker.email}`}>
              <Mail className="h-4 w-4" />
              <span>{worker.email}</span>
            </a>
          ) : null}
        </div>

        {personHref ? (
          <AppButton
            href={personHref}
            icon={ArrowRight}
            iconPosition="right"
            shape="rounded"
            variant="surface"
            width="full"
          >
            Детальніше
          </AppButton>
        ) : null}
      </div>
    </BlockShell>
  )
}
