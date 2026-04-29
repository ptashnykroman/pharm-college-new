import Image from "next/image";

import { cn } from "@/lib/utils";
import { resolveImage } from "@/shared/lib/media";
import { BlockShell } from "@/widgets/page/cms-page/components/block-shell";
import { RichText } from "@/widgets/page/cms-page/components/rich-text";
import type { EducationBooksBlock } from "@/widgets/page/cms-page/model";

export function EducationBooksPageBlock({ block }: { block: EducationBooksBlock }) {
  const image = resolveImage(block.main_photo, "card", "Навчальний посібник");

  return (
    <BlockShell className={cn(!block.add_container && "bg-gradient-soft")}>
      <div className="grid gap-6 md:grid-cols-[minmax(180px,220px)_minmax(0,1fr)] md:items-start">
        {image ? (
          <a
            href={image.src}
            target="_blank"
            rel="noreferrer"
            className="mx-auto block overflow-hidden rounded-[1.5rem] shadow-soft"
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

        <div className="space-y-4">
          <RichText html={block.description} className="text-base leading-7" />
          {block.authors ? (
            <details
              open={block.authors.default_open}
              className="rounded-[1.5rem] border border-border/70 bg-white/80"
            >
              <summary className="cursor-pointer list-none px-4 py-3 font-semibold marker:hidden">
                {block.authors.title}
              </summary>
              <div className="border-t border-border/70 px-4 py-4">
                <RichText html={block.authors.body} className="text-sm leading-7" />
              </div>
            </details>
          ) : null}
        </div>
      </div>
    </BlockShell>
  );
}
