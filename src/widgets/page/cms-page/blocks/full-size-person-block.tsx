import Image from "next/image";

import { resolveImage } from "@/shared/lib/media";
import { BlockShell } from "@/widgets/page/cms-page/components/block-shell";
import { RichText } from "@/widgets/page/cms-page/components/rich-text";
import type { FullSizePersonBlock } from "@/widgets/page/cms-page/model";

export function FullSizePersonPageBlock({ block }: { block: FullSizePersonBlock }) {
  const image = resolveImage(block.photo, "card", block.name);

  return (
    <BlockShell className="md:p-8">
      <div className="grid gap-6 md:grid-cols-[minmax(200px,280px)_minmax(0,1fr)] md:items-start">
        {image ? (
          <a
            href={image.src}
            target="_blank"
            rel="noreferrer"
            className="overflow-hidden rounded-[1.75rem] bg-muted/30 shadow-soft"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="w-full object-cover"
            />
          </a>
        ) : null}
        <div>
          <h2 className="text-2xl font-black text-foreground">{block.name}</h2>
          <RichText html={block.body} className="mt-4" />
        </div>
      </div>
    </BlockShell>
  );
}
