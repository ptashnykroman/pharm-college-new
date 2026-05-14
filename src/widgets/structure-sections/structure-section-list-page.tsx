import { StructureSectionCard } from "./structure-section-card";
import type { StructureSectionCardViewModel } from "@/widgets/structure-sections/model";

export function StructureSectionListPageView({
  badge,
  title,
  description,
  items,
}: {
  badge: string;
  title: string;
  description: string;
  items: StructureSectionCardViewModel[];
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--primary),0.2)] to-transparent" />
      <div className="absolute left-0 top-14 h-72 w-72 rounded-full bg-[rgba(var(--primary-glow),0.1)] blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[rgba(var(--accent-gold),0.1)] blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">
            {title}
          </h1>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <StructureSectionCard key={item.id} item={item} badge={badge} />
          ))}
        </div>
      </div>
    </section>
  );
}
