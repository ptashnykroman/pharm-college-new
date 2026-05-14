import Image from "next/image";
import { Mail, Phone } from "lucide-react";

import { normalizePhone } from "@/widgets/page/cms-page/lib";
import type { AdministrationCardViewModel } from "@/widgets/personnel/model";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function AdministrationCard({
  person,
}: {
  person: AdministrationCardViewModel;
}) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative overflow-hidden rounded-t-[2rem] bg-gradient-brand-surface shadow-card">
        {person.photo ? (
          <Image
            src={person.photo.src}
            alt={person.photo.alt}
            width={person.photo.width}
            height={person.photo.height}
            className="h-[360px] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-[360px] items-center justify-center bg-gradient-brand-surface text-6xl font-black text-[rgba(255,255,255,0.9)]">
            {getInitials(person.name)}
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-admin-overlay px-5 pb-5 pt-16">
          {person.position ? (
            <p className="text-balance text-lg font-bold leading-6 text-white">
              {person.position}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col rounded-b-[1.75rem] border border-[rgba(var(--border),0.7)] bg-white p-5 shadow-card">
        <h2 className="text-xl font-black text-foreground">{person.name}</h2>

        <div className="mt-4 space-y-3 text-sm text-[rgba(var(--foreground),0.8)]">
          {person.phone ? (
            <a
              href={`tel:${normalizePhone(person.phone)}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4" />
              <span>{person.phone}</span>
            </a>
          ) : null}

          {person.email ? (
            <a
              href={`mailto:${person.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              <span className="break-all">{person.email}</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
