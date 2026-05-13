import Image from "next/image";
import { ExternalLink } from "lucide-react";

import { resolveImage } from "@/shared/lib/media";
import { normalizeHref } from "@/shared/lib/navigation";
import { SmartLink } from "@/widgets/navigation/smart-link";
import { BlockShell } from "@/widgets/page/cms-page/components/block-shell";
import type { PartnersBlock } from "@/widgets/page/cms-page/model";

export function PartnersPageBlock({ block }: { block: PartnersBlock }) {
  const partners = (block.partners?.data ?? [])
    .map((item) => {
      const attributes = item.attributes;

      if (!attributes || !item.id) {
        return null;
      }

      return {
        id: item.id,
        name: attributes.name,
        href: normalizeHref(
          attributes.presentation_link || attributes.link || "#",
        ),
        image: resolveImage(attributes.logo, "logo", attributes.name),
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  // if (partners.length === 0) {
  //   return null;
  // }
  // rounded-[2rem] border border-border/80 bg-white p-5 shadow-soft md:p-6
  return (
    <div className="p-5 bg-secondary rounded-[2rem] ">
      <div className="flex items-center justify-center gap-4">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-center text-foreground">{block.title}</h2>
        {/* <ExternalLink className="hidden h-5 w-5 text-primary md:block" /> */}
      </div>

      {!!partners.length && (
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
          {partners.map((partner) => (
            <SmartLink
              key={partner.id}
              href={partner.href}
              className="flex min-h-28 items-center justify-center rounded-[1.5rem] border border-border/70 bg-muted/20 p-4 transition-smooth hover:-translate-y-1 hover:bg-white"
              ariaLabel={partner.name}
            >
              {partner.image ? (
                <Image
                  src={partner.image.src}
                  alt={partner.image.alt}
                  width={partner.image.width}
                  height={partner.image.height}
                  className="max-h-16 w-auto object-contain"
                />
              ) : (
                <span className="text-center text-sm font-medium text-foreground/80">
                  {partner.name}
                </span>
              )}
            </SmartLink>
          ))}
        </div>
      )}
    </div>
  );
}
