import { cn } from '@/lib/utils'

import type { BodyBlock } from '@/widgets/page/cms-page/model'
import { BlockShell } from '@/widgets/page/cms-page/components/block-shell'
import { RichText } from '@/widgets/page/cms-page/components/rich-text'

export function BodyPageBlock({ block, isSidebar }: { block: BodyBlock; isSidebar: boolean }) {
  return <RichText html={block.body} />
}
// <BlockShell className={cn(!isSidebar && "md:p-8")}>
// </BlockShell>
