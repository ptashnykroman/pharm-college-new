import Image from "next/image";

import type { HomePageViewModel } from "@/widgets/home/model";

export function PartnersSection({
  partners,
}: {
  partners: HomePageViewModel["partners"];
}) {
  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">Наші партнери</h2>
          <p className="mt-4 text-muted-foreground">
            Співпрацюємо з провідними аптечними мережами та фармацевтичними компаніями.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {partners.map((item) => {
            const content = (
              <div className="flex h-24 items-center justify-center rounded-2xl border border-border bg-card p-4 text-center text-sm font-semibold text-muted-foreground shadow-soft transition-bounce hover:-translate-y-1 hover:border-[rgba(var(--primary),0.3)] hover:text-primary hover:shadow-card">
                {item.image ? (
                  <Image
                    src={item.image.src}
                    alt={item.image.alt || item.name}
                    width={item.image.width}
                    height={item.image.height}
                    quality={80}
                    className="max-h-16 w-auto object-contain"
                    sizes="(max-width: 639px) 50vw, (max-width: 767px) 33vw, 20vw"
                  />
                ) : (
                  item.name
                )}
              </div>
            );

            return item.href ? (
              <a key={item.id} href={item.href} target="_blank" rel="noreferrer">
                {content}
              </a>
            ) : (
              <div key={item.id}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
