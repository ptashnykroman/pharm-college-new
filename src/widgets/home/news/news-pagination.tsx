import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/shared/lib/utils";

type NewsPaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export function NewsPagination({
  page,
  totalPages,
  onChange,
}: NewsPaginationProps) {
  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, page - 1))}
        disabled={page === 0}
        aria-label="Попередня сторінка"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-soft transition-smooth hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:hover:bg-card disabled:hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onChange(index)}
          aria-label={`Сторінка ${index + 1}`}
          className={cn(
            "inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-semibold transition-bounce",
            index === page
              ? "scale-110 border-primary bg-primary text-primary-foreground shadow-elegant"
              : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-primary",
          )}
        >
          {index + 1}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages - 1, page + 1))}
        disabled={page === totalPages - 1}
        aria-label="Наступна сторінка"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-soft transition-smooth hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:hover:bg-card disabled:hover:text-foreground"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
