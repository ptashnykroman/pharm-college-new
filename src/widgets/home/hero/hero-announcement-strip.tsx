import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
// button, input, accordion, dialog, pagination
type HeroAnnouncementStripProps = {
  title: string
  href: string
  currentIndex: number
  total: number
  onPrevious: () => void
  onNext: () => void
}

export function HeroAnnouncementStrip({
  title,
  href,
  currentIndex,
  total,
  onPrevious,
  onNext,
}: HeroAnnouncementStripProps) {
  return (
    <div className="mt-8 w-full max-w-md">
      <Link
        href={href}
        className="group flex items-center gap-3 rounded-full border border-white/15 bg-primary-deep/40 py-1.5 pl-1.5 pr-2 backdrop-blur-md transition-smooth hover:border-accent-gold/50 hover:bg-primary-deep/60"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-gold-foreground">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-destructive" />
          </span>
          Увага
        </span>
        <span
          key={currentIndex}
          className="min-w-0 flex-1 animate-fade-up truncate text-sm text-primary-foreground/90 group-hover:text-accent-gold"
        >
          {title}
        </span>

        <span className="hidden shrink-0 text-[11px] tabular-nums text-primary-foreground/50 sm:inline">
          {currentIndex + 1}/{total}
        </span>

        <span className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault()
              onPrevious()
            }}
            aria-label="Попереднє оголошення"
            className="flex h-7 w-7 items-center justify-center cursor-pointer rounded-full text-primary-foreground/70 transition-smooth hover:bg-white/10 hover:text-accent-gold"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault()
              onNext()
            }}
            aria-label="Наступне оголошення"
            className="flex h-7 w-7 items-center justify-center cursor-pointer rounded-full text-primary-foreground/70 transition-smooth hover:bg-white/10 hover:text-accent-gold"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </span>
      </Link>
    </div>
  )
}
