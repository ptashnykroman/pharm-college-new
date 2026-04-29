import { BlockShell } from "@/widgets/page/cms-page/components/block-shell";
import type { FrameBlock } from "@/widgets/page/cms-page/model";

export function FramePageBlock({ block }: { block: FrameBlock }) {
  return (
    <BlockShell className="overflow-hidden p-0">
      <div
        className="w-full [&_iframe]:min-h-[420px] [&_iframe]:w-full"
        dangerouslySetInnerHTML={{ __html: block.Frame }}
      />
    </BlockShell>
  );
}
