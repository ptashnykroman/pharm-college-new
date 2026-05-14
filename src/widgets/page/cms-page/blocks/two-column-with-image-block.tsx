import Image from "next/image";

import { cn } from "@/lib/utils";
import { Enum_Componentpageblockstwocolumnwithimage_Layout } from "@/shared/api/graphql/generated";
import { resolveImage } from "@/shared/lib/media";
import { BlockShell } from "@/widgets/page/cms-page/components/block-shell";
import { RichText } from "@/widgets/page/cms-page/components/rich-text";
import type { TwoColumnWithImageBlock } from "@/widgets/page/cms-page/model";

export function TwoColumnWithImagePageBlock({ block }: { block: TwoColumnWithImageBlock }) {
  const image = resolveImage(block.image, "card");
  const textFirst = block.layout === Enum_Componentpageblockstwocolumnwithimage_Layout.TextImage;

  return (
    <BlockShell className="overflow-hidden md:p-8">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className={cn(!textFirst && "lg:order-2")}>
          <RichText html={block.body} />
        </div>
        {image ? (
          <div className={cn("overflow-hidden rounded-[1.75rem] bg-[rgba(var(--muted),0.3)]", !textFirst && "lg:order-1")}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}
      </div>
    </BlockShell>
  );
}
