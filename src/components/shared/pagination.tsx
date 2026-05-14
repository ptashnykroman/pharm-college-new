"use client";

import type { ReactNode } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { cn } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

function buildPaginationRange(
  totalPages: number,
  currentPage: number,
  siblings = 1,
) {
  const visiblePageCount = 7 + siblings;

  if (visiblePageCount >= totalPages) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblings, 1);
  const rightSiblingIndex = Math.min(currentPage + siblings, totalPages);
  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 2;

  if (!showLeftDots && showRightDots) {
    const leftItemsCount = 2 + 2 * siblings;

    return [
      ...Array.from({ length: leftItemsCount }, (_, index) => index + 1),
      "...",
      totalPages,
    ] as const;
  }

  if (showLeftDots && !showRightDots) {
    const rightItemsCount = 2 + 2 * siblings;

    return [
      1,
      "...",
      ...Array.from(
        { length: rightItemsCount },
        (_, index) => totalPages - rightItemsCount + index + 1,
      ),
    ] as const;
  }

  return [
    1,
    "...",
    ...Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, index) => leftSiblingIndex + index,
    ),
    "...",
    totalPages,
  ] as const;
}

function PaginationButton({
  children,
  onClick,
  disabled = false,
  active = false,
  className,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex cursor-pointer h-8 sm:h-11 w-8 sm:w-11 items-center justify-center rounded-full border px-3 text-[13px] sm:text-sm font-semibold shadow-soft transition-bounce",
        active
          ? "scale-110 border-primary bg-primary text-primary-foreground shadow-elegant"
          : "border-border bg-card text-muted-foreground hover:border-[rgba(var(--primary),0.3)] hover:text-primary",
        disabled &&
          "pointer-events-none opacity-40 hover:border-border hover:text-muted-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = buildPaginationRange(totalPages, currentPage);

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "mt-12 flex flex-wrap items-center justify-center gap-1 sm:gap-2",
        className,
      )}
    >
      <PaginationButton
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="Перша сторінка"
      >
        <ChevronsLeft className="h-4 w-4" />
      </PaginationButton>

      {/* <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Попередня сторінка"
      >
        <ChevronLeft className="h-4 w-4" />
      </PaginationButton> */}

      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="inline-flex h-8 sm:h-11 w-8 sm:w-11 items-center justify-center text-[13px] sm:text-sm font-semibold text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <PaginationButton
            key={page}
            onClick={() => onPageChange(page)}
            active={page === currentPage}
            aria-label={`Сторінка ${page}`}
          >
            {page}
          </PaginationButton>
        ),
      )}

      {/* <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Наступна сторінка"
      >
        <ChevronRight className="h-4 w-4" />
      </PaginationButton> */}

      <PaginationButton
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Остання сторінка"
      >
        <ChevronsRight className="h-4 w-4" />
      </PaginationButton>
    </nav>
  );
}
