'use client'

import { useState } from "react";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { NewsArchiveYear } from "@/widgets/news/model";

const INITIAL_VISIBLE_YEARS = 5;

export function NewsArchive({ items }: { items: NewsArchiveYear[] }) {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, INITIAL_VISIBLE_YEARS);

  return (
    <div className="space-y-4">
      {visibleItems.map((yearItem) => (
        <Accordion key={yearItem.year} type="single" collapsible className="gap-0">
          <AccordionItem value={yearItem.year}>
            <AccordionTrigger>{yearItem.year}</AccordionTrigger>
            <AccordionContent className="pt-0">
              <ul className="space-y-2 pt-4">
                {yearItem.months.map((month) => (
                  <li key={`${yearItem.year}-${month.month}`}>
                    <Link
                      href={month.href}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-muted/25 px-4 py-3 text-sm font-semibold text-foreground transition-smooth hover:border-primary/25 hover:bg-primary/5 hover:text-primary"
                    >
                      <span>{month.label}</span>
                      <span className="rounded-full bg-white px-2.5 py-1 text-xs text-muted-foreground shadow-soft">
                        {month.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}

      {!showAll && items.length > INITIAL_VISIBLE_YEARS ? (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="w-full rounded-full border border-primary/20 bg-card px-5 py-3 text-sm font-semibold text-primary shadow-soft transition-bounce hover:-translate-y-0.5 hover:border-primary/35 hover:bg-primary hover:text-primary-foreground"
        >
          Завантажити більше
        </button>
      ) : null}
    </div>
  );
}
