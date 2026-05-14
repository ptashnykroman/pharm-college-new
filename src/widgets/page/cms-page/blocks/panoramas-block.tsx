"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { resolveImage } from "@/shared/lib/media";
import { BlockShell } from "@/widgets/page/cms-page/components/block-shell";
import type { PanoramasBlock } from "@/widgets/page/cms-page/model";

type PanoramaCardProps = {
  href: string;
  image: ReturnType<typeof resolveImage>;
  title: string;
  withBackground: boolean;
};

function PanoramaCard({ href, image, title, withBackground }: PanoramaCardProps) {
  const cardClassName = cn(
    "group w-full cursor-pointer overflow-hidden rounded-[1.5rem] border bg-transparent text-left transition-smooth hover:-translate-y-1",
    withBackground
      ? "border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)]"
      : "border-[rgba(var(--border),0.7)] bg-[rgba(var(--muted),0.2)] hover:bg-white",
  );
  const content = (
    <>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : null}
      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <span className={cn("font-semibold", withBackground ? "text-white" : "text-foreground")}>
          {title}
        </span>
        <ExternalLink className={cn("h-4 w-4 flex-shrink-0", withBackground ? "text-white" : "text-primary")} />
      </div>
    </>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={cardClassName}>
          {content}
        </button>
      </DialogTrigger>

      <DialogContent
        className="max-w-[96vw] overflow-hidden rounded-[2rem] border-0 bg-primary-deep p-0 text-white shadow-elegant sm:max-w-6xl"
        showCloseButton
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="h-[80vh]">
          <iframe
            src={href}
            title={title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
          <PanoramaCard
            key={item.id}
            href={item.href}
            title={item.title}
            image={item.image}
            withBackground={Boolean(block.withBackground)}
          />
        ))}
      </div>
    </BlockShell>
  );
}
