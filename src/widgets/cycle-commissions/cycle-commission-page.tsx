import { cn } from '@/lib/utils'
import type { RenderablePageBlock } from '@/widgets/page/cms-page/model'
import { PageBlockRenderer } from '@/widgets/page/cms-page/components/page-block-renderer'
import { CmkMainPhotoGallery } from '@/widgets/cycle-commissions/cmk-main-photo-gallery'
import { CmkPeoplePanel } from '@/widgets/cycle-commissions/cmk-people-panel'
import {
  CYCLE_COMMISSION_LAYOUTS,
  type CycleCommissionPageViewModel,
  type RenderableCycleCommissionBlock,
} from '@/widgets/cycle-commissions/model'

function CycleCommissionColumn({
  blocks,
  className,
  isSidebar = false,
}: {
  blocks: readonly RenderableCycleCommissionBlock[]
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

export function CycleCommissionPageView({ page }: { page: CycleCommissionPageViewModel }) {
  const layout = CYCLE_COMMISSION_LAYOUTS[page.layout] ?? CYCLE_COMMISSION_LAYOUTS.col_12
  const peoplePanel =
    page.head || page.teachers.length ? <CmkPeoplePanel head={page.head} teachers={page.teachers} /> : null

  return (
    <section className="relative pb-20 pt-10 md:pb-24 md:pt-14">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-8 max-w-4xl text-center">
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">{page.title}</h1>
        </div>

        <div className={cn('gap-6', layout.columnLayoutClassName)}>
          <CycleCommissionColumn blocks={page.leftBlocks} className={layout.leftClassName} isSidebar />

          <div className={layout.mainClassName}>
            <CmkMainPhotoGallery images={page.mainPhotos} />
            {layout.peoplePlacement === 'main' ? peoplePanel : null}
            <CycleCommissionColumn blocks={page.mainBlocks} />
          </div>

          <div className={layout.rightClassName}>
            <CycleCommissionColumn blocks={page.rightBlocks} isSidebar />
            {layout.peoplePlacement === 'right' ? peoplePanel : null}
          </div>
        </div>
      </div>
    </section>
  )
}
