import { ArrowRight } from "lucide-react";

import { AppButton } from "@/components/shared/app-button";
import { BlockShell } from "@/widgets/page/cms-page/components/block-shell";
import type { ButtonLinkBlock } from "@/widgets/page/cms-page/model";
import { normalizeHref } from "@/shared/lib/navigation";

export function ButtonLinkPageBlock({
  block,
  isSidebar,
}: {
  block: ButtonLinkBlock;
  isSidebar: boolean;
}) {
  return (
    <BlockShell className="flex justify-start">
      <AppButton
        href={normalizeHref(block.link)}
        icon={ArrowRight}
        iconPosition="right"
        shape="rounded"
        variant={isSidebar ? "surface" : "default"}
        width={isSidebar ? "full" : "content"}
      >
        {block.text}
      </AppButton>
    </BlockShell>
  );
}
