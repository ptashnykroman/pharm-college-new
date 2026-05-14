import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import type { NewsListItem } from "@/widgets/news/model";
import { getNewsTagTone, newsToneStyles } from "@/widgets/home/news/news-utils";

type NewsCardProps = {
  item: NewsListItem;
  index: number;
  page: number;
  isHomePage?: boolean;
};

export function NewsCard({ item, index, page, isHomePage }: NewsCardProps) {
  const tone = getNewsTagTone(item.tag, index);

  return (
    <article
      style={{ animationDelay: `${index * 80}ms` }}
      className="group relative isolate flex animate-fade-up flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition-bounce hover:-translate-y-2 hover:shadow-elegant"
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-border transition-smooth group-hover:ring-[rgba(var(--primary),0.3)]" />

      <Link href={item.href}>
        <div className="relative aspect-[16/11] overflow-hidden">
          <Image
            src={item.image.src}
            alt={item.image.alt || item.title}
            fill
            quality={95}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-bounce duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-news-overlay" />

          <div className="absolute left-5 top-5 flex flex-col items-center justify-center rounded-2xl bg-[rgba(var(--card),0.95)] px-3 py-2 text-center shadow-card backdrop-blur transition-bounce group-hover:-rotate-3 group-hover:scale-105">
            <span className="text-xl font-extrabold leading-none text-primary">
              {item.date.day}
            </span>
            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {item.date.monthShort}
            </span>
          </div>

          {item.tag ? (
            <div
              className={cn(
                "absolute right-5 top-5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide shadow-soft",
                newsToneStyles[tone],
              )}
            >
              {item.tag}
            </div>
          ) : null}
        </div>
      </Link>

      <div
        className={
          "relative flex flex-1 flex-col " + (isHomePage ? "p-6" : "p-4")
        }
      >
        <Link href={item.href}>
          <h3
            className={
              "text-lg leading-snug text-foreground transition-smooth line-clamp-3 group-hover:text-primary " +
              (isHomePage ? "font-extrabold" : "font-bold leading-tight")
            }
          >
            {item.title}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-3 flex-1 text-sm text-muted-foreground">
          {item.excerpt}
        </p>
        <Link
          href={item.href}
          className="mt-5 inline-flex items-center justify-between gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-smooth group-hover:border-[rgba(var(--primary),0.3)] group-hover:bg-[rgba(var(--primary),0.05)] group-hover:text-primary"
        >
          Читати далі
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-primary transition-bounce group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>

      <div
        key={`${page}-${item.id}`}
        className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full bg-[rgba(var(--primary-glow),0)] blur-2xl transition-smooth group-hover:bg-[rgba(var(--primary-glow),0.4)]"
      />
    </article>
  );
}
