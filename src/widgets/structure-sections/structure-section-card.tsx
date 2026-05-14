import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { SmartLink } from "@/widgets/navigation/smart-link";
import type { StructureSectionCardViewModel } from "@/widgets/structure-sections/model";

export function StructureSectionCard({
  item,
  badge,
}: {
  item: StructureSectionCardViewModel;
  badge: string;
}) {
  return (
    <SmartLink
      href={item.href}
      className="group relative block min-h-[260px] overflow-hidden rounded-[2rem] border border-[rgba(var(--border),0.7)] bg-white shadow-card transition hover:-translate-y-1.5 hover:shadow-elegant"
    >
      <div className="absolute inset-0">
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
          />
        ) : (
          <div className="h-full w-full bg-gradient-hero" />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-[rgba(var(--primary),0.6)] to-[rgba(var(--primary-deep),0.1)] opacity-90 transition group-hover:opacity-95" />

      <div className="relative flex min-h-[260px] flex-col justify-end p-6">
        <div className="mt-4 flex items-end justify-between gap-4">
          <h2 className="text-balance text-lg font-black leading-tight text-white">
            {item.title}
          </h2>

          <span className="absolute right-4 top-4 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[rgba(255,255,255,0.9)] text-primary shadow-soft transition group-hover:translate-x-1">
            <ArrowRight className="h-5 w-5" />
          </span>
        </div>
      </div>
    </SmartLink>
  );
}
