import Image from "next/image";
import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";
import { resolveImage } from "@/shared/lib/media";
import { BlockShell } from "@/widgets/page/cms-page/components/block-shell";
import type { PanoramasBlock } from "@/widgets/page/cms-page/model";

export function PanoramasPageBlock({ block }: { block: PanoramasBlock }) {
  const items = (block.panoramas?.data ?? [])
    .map((item) => {
      const attributes = item.attributes;

      if (!attributes || !item.id) {
        return null;
      }

      return {
        id: item.id,
        href: attributes.link,
        title: attributes.title,
        image: resolveImage(attributes.poster, "card", attributes.title),
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (items.length === 0) {
    return null;
  }

  return (
    <BlockShell className={cn(block.withBackground && "border-[rgba(var(--primary),0.2)] bg-gradient-hero text-white")}>
      {block.title ? (
        <h2 className={cn("text-2xl font-black", block.withBackground ? "text-white" : "text-foreground")}>
          {block.title}
        </h2>
      ) : null}
      
      <div className="mt-5 grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "group overflow-hidden rounded-[1.5rem] border transition-smooth hover:-translate-y-1",
              block.withBackground
                ? "border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)]"
                : "border-[rgba(var(--border),0.7)] bg-[rgba(var(--muted),0.2)] hover:bg-white",
            )}
          >
            {item.image ? (
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : null}
            <div className="flex items-center justify-between gap-3 px-4 py-4">
              <span className={cn("font-semibold", block.withBackground ? "text-white" : "text-foreground")}>
                {item.title}
              </span>
              <ExternalLink className={cn("h-4 w-4 flex-shrink-0", block.withBackground ? "text-white" : "text-primary")} />
            </div>
          </a>
        ))}
      </div>
    </BlockShell>
  );
}
