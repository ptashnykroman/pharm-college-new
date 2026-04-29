import { cn } from "@/lib/utils";

import type { RenderablePageBlock } from "@/widgets/page/cms-page/model";
import { PageBlockRenderer } from "@/widgets/page/cms-page/components/page-block-renderer";

type PageColumnProps = {
  className?: string;
  blocks: readonly RenderablePageBlock[];
  isSidebar?: boolean;
};

export function PageColumn({ blocks, className, isSidebar = false }: PageColumnProps) {
  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-6", className)}>
      {blocks.map((block) => (
        <PageBlockRenderer key={`${block.component_type}-${block.id}`} block={block} isSidebar={isSidebar} />
      ))}
    </div>
  );
}
