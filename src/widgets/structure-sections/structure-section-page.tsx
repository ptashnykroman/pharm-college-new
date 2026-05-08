import { cn } from '@/lib/utils'
import type { RenderablePageBlock } from '@/widgets/page/cms-page/model'
import { PageBlockRenderer } from '@/widgets/page/cms-page/components/page-block-renderer'
import { CmkMainPhotoGallery } from '@/widgets/cycle-commissions/cmk-main-photo-gallery'
import {
  STRUCTURE_SECTION_LAYOUTS,
  type RenderableStructureSectionBlock,
  type StructureSectionPageViewModel,
} from '@/widgets/structure-sections/model'

function StructureSectionColumn({
  blocks,
  className,
  isSidebar = false,
}: {
  blocks: readonly RenderableStructureSectionBlock[]
  className?: string
  isSidebar?: boolean
}) {
  if (!blocks.length) {
    return null
  }

  return (
    <div className={cn('space-y-6', className)}>
      {blocks.map((block) => (
        <PageBlockRenderer
          key={`${block.component_type}-${block.id}`}
          block={block as unknown as RenderablePageBlock}
          isSidebar={isSidebar}
        />
      ))}
    </div>
  )
}

export function StructureSectionPageView({
  page,
  badge,
}: {
  page: StructureSectionPageViewModel
  badge: string
}) {
  const layout = STRUCTURE_SECTION_LAYOUTS[page.layout] ?? STRUCTURE_SECTION_LAYOUTS.col_12

  return (
    <section className="relative pb-20 pt-10 md:pb-24 md:pt-14">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-8 max-w-4xl text-center">
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">{page.title}</h1>
        </div>

        <div className={cn('gap-6', layout.columnLayoutClassName)}>
          <StructureSectionColumn blocks={page.leftBlocks} className={layout.leftClassName} isSidebar />

          <div className={layout.mainClassName}>
            <CmkMainPhotoGallery images={page.mainPhotos} />
            <StructureSectionColumn blocks={page.mainBlocks} />
          </div>

          <StructureSectionColumn blocks={page.rightBlocks} className={layout.rightClassName} isSidebar />
        </div>
      </div>
    </section>
  )
}
