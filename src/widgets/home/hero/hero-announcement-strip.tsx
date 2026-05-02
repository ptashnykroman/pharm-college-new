import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RichText } from "@/widgets/page/cms-page/components/rich-text";

type HeroAnnouncementStripProps = {
  title: string;
  body: string;
  isDialogOpen: boolean;
  currentIndex: number;
  total: number;
  onDialogOpenChange: (open: boolean) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function HeroAnnouncementStrip({
  title,
  body,
  isDialogOpen,
  currentIndex,
  total,
  onDialogOpenChange,
  onPrevious,
  onNext,
}: HeroAnnouncementStripProps) {
  const hasBody = body.trim().length > 0;

  return (
    <div className="mt-8 w-full max-w-md">
      <Dialog open={isDialogOpen} onOpenChange={onDialogOpenChange}>
        <p className="group flex items-center gap-3 rounded-full border border-white/15 bg-primary-deep/40 py-1.5 pl-1.5 pr-2 backdrop-blur-md transition-smooth hover:border-accent-gold/50 hover:bg-primary-deep/60">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-gold-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-destructive" />
            </span>
            Увага
          </span>

          {hasBody ? (
            <DialogTrigger asChild>
              <button
                type="button"
                key={currentIndex}
                className="min-w-0 flex-1 animate-fade-up rounded-sm text-left text-sm text-primary-foreground/90 transition-smooth group-hover:text-accent-gold hover:text-accent-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/60"
              >
                <span className="cursor-pointer block truncate decoration-white/20 underline-offset-4">
                  {title}
                </span>
                <span className="sr-only">
                  Відкрити повний текст оголошення
                </span>
              </button>
            </DialogTrigger>
          ) : (
            <span
              key={currentIndex}
              className="min-w-0 flex-1 animate-fade-up truncate text-sm text-primary-foreground/90 group-hover:text-accent-gold"
            >
              {title}
            </span>
          )}

          <span className="hidden shrink-0 text-[11px] tabular-nums text-primary-foreground/50 sm:inline">
            {currentIndex + 1}/{total}
          </span>

          <span className="flex shrink-0 items-center gap-0.5">
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                onPrevious();
              }}
              aria-label="Попереднє оголошення"
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-primary-foreground/70 transition-smooth hover:bg-white/10 hover:text-accent-gold"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                onNext();
              }}
              aria-label="Наступне оголошення"
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-primary-foreground/70 transition-smooth hover:bg-white/10 hover:text-accent-gold"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </span>
        </p>

        {hasBody ? (
          <DialogContent className="grid max-h-[85svh] max-w-[calc(100%-2rem)] grid-rows-[auto_minmax(0,1fr)] gap-0 overflow-hidden rounded-[1.75rem] border border-border/70 bg-background p-0 shadow-elegant sm:max-w-2xl">
            <DialogHeader className="gap-3 border-b border-border/70 px-6 py-5 sm:px-8">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                Оголошення
              </span>
              <DialogTitle className="text-left text-xl font-black leading-tight text-foreground sm:text-2xl">
                {title}
              </DialogTitle>
            </DialogHeader>

            <div className="min-h-0 overflow-y-auto px-6 pb-6 sm:px-8 sm:pb-8">
              <RichText
                html={body}
                className="my-6 text-sm leading-7 text-foreground/80 sm:text-base"
              />
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </div>
  );
}
