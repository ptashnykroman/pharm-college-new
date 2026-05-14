import Link from "next/link";

import type { RecentNewsItem } from "@/widgets/news/model";

export function RecentNews({ items }: { items: RecentNewsItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="rounded-[1.75rem] border border-[rgba(var(--border),0.7)] bg-white p-5 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-card"
        >
          <Link href={item.href} className="block">
            <h3 className="text-base font-bold leading-6 text-foreground transition-smooth hover:text-primary">
              {item.title}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">{item.dateLabel}</p>
          </Link>
        </article>
      ))}
    </div>
  );
}
