import { cn } from '@/lib/utils'

import { PageBlockRenderer } from '@/widgets/page/cms-page/components/page-block-renderer'
import type { RenderablePageBlock } from '@/widgets/page/cms-page/model'

type PageColumnProps = {
  className?: string
  blocks: readonly RenderablePageBlock[]
  isSidebar?: boolean
}

export function PageColumn({ blocks, className, isSidebar = false }: PageColumnProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {blocks.map((block) => (
        <PageBlockRenderer key={`${block.component_type}-${block.id}`} block={block} isSidebar={isSidebar} />
      ))}
    </div>
  )
}
