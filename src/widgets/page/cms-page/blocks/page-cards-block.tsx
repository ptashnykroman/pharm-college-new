import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { resolveImage } from "@/shared/lib/media";
import { normalizeHref } from "@/shared/lib/navigation";
import { SmartLink } from "@/widgets/navigation/smart-link";
import type { PageCardsBlock } from "@/widgets/page/cms-page/model";

export function PageCardsPageBlock({ block }: { block: PageCardsBlock }) {
  const cards = (block.cards ?? [])
    .map((card) => {
      if (!card) {
        return null;
      }

      const image = resolveImage(card.photo, "card", card.name);

      return {
        id: card.id,
        href: normalizeHref(card.link),
        title: card.name,
        image,
      };
    })
    .filter((card): card is NonNullable<typeof card> => Boolean(card));

  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {cards.map((card) => (
        <SmartLink
          key={card.id}
          href={card.href}
          className="group rounded-[2rem] border border-border/80 bg-white p-4 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-card"
        >
          {card.image ? (
            <div className="overflow-hidden rounded-[1.5rem] bg-muted/30">
              <Image
                src={card.image.src}
                alt={card.image.alt}
                width={card.image.width}
                height={card.image.height}
                className="aspect-[5/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ) : null}
          <div className="mt-4 flex items-center justify-between gap-4">
            <h3 className="text-lg font-black text-foreground">{card.title}</h3>
            <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary transition-transform group-hover:translate-x-1" />
          </div>
        </SmartLink>
      ))}
    </div>
  );
}
