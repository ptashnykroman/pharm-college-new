"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

import type { HomePageViewModel } from "@/widgets/home/model";

const ImageLightbox = dynamic(
  () =>
    import("@/components/shared/image-lightbox").then(
      (mod) => mod.ImageLightbox,
    ),
  { ssr: false },
);

const TABLET_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1024;
const CARD_GAP = 24;

function getVisibleCards() {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= DESKTOP_BREAKPOINT) return 3;
  if (window.innerWidth >= TABLET_BREAKPOINT) return 2;
  return 1;
}

export function EventsSection({
  events,
}: {
  events: HomePageViewModel["events"];
}) {
  const [visibleCards, setVisibleCards] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const slides = useMemo(
    () =>
      events
        .filter((item) => item.image)
        .map((item) => ({
          src: item.image!.src,
          alt: item.image!.alt || item.title,
          width: item.image!.width,
          height: item.image!.height,
        })),
    [events],
  );

  const slideIndexes = useMemo(() => {
    const indexes = new Map<string, number>();
    let currentIndex = 0;

    for (const item of events) {
      if (!item.image) {
        continue;
      }

      indexes.set(item.id, currentIndex);
      currentIndex += 1;
    }

    return indexes;
  }, [events]);

  const canSlide = events.length > visibleCards;
  const maxStartIndex = canSlide
    ? Math.max(0, events.length - visibleCards)
    : 0;
  const clampedStartIndex = Math.min(startIndex, maxStartIndex);
  const prevDisabled = !canSlide || clampedStartIndex === 0;
  const nextDisabled = !canSlide || clampedStartIndex >= maxStartIndex;

  useEffect(() => {
    const syncVisibleCards = () => {
      setVisibleCards(getVisibleCards());
    };

    syncVisibleCards();
    window.addEventListener("resize", syncVisibleCards);

    return () => {
      window.removeEventListener("resize", syncVisibleCards);
    };
  }, []);

  const openLightbox = (eventId: string) => {
    const nextIndex = slideIndexes.get(eventId);

    if (nextIndex === undefined) {
      return;
    }

    setLightboxIndex(nextIndex);
    setLightboxOpen(true);
  };

  const translateX = `translateX(calc(-${clampedStartIndex} * ((100% - ${(visibleCards - 1) * CARD_GAP}px) / ${visibleCards} + ${CARD_GAP}px)))`;
  const cardBasis = `calc((100% - ${(visibleCards - 1) * CARD_GAP}px) / ${visibleCards})`;

  return (
    <section id="events" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-primary-deep">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(var(--primary-glow),0.4),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(var(--accent-gold),0.18),_transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
          <div className="max-w-2xl">
            <h2 className="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">
              Події коледжу
            </h2>
            <p className="mt-3 text-muted-foreground">
              Не пропустіть найближчі заходи: дні відкритих дверей, конференції
              та зустрічі.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex gap-2 items-center">
            <button
              type="button"
              aria-label="Попередні події"
              disabled={prevDisabled}
              onClick={() => setStartIndex(Math.max(0, clampedStartIndex - 1))}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-card text-primary-foreground shadow-soft backdrop-blur-sm transition-smooth border border-[rgba(var(--primary),0.2)] cursor-pointer shadow-soft hover:bg-primary hover:text-primary-foreground enabled:hover:hover:[&>svg]:text-white disabled:cursor-not-allowed disabled:opacity-85 disabled:hover:bg-[rgba(255,255,255,0.1)]"
            >
              <ChevronLeft className="h-5 w-5 text-primary" />
            </button>

            <button
              type="button"
              aria-label="Наступні події"
              disabled={nextDisabled}
              onClick={() =>
                setStartIndex(Math.min(maxStartIndex, clampedStartIndex + 1))
              }
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-card text-primary-foreground shadow-soft backdrop-blur-sm transition-smooth border border-[rgba(var(--primary),0.2)] cursor-pointer shadow-soft hover:bg-primary hover:text-primary-foreground enabled:hover:hover:[&>svg]:text-white disabled:cursor-not-allowed disabled:opacity-85 disabled:hover:bg-[rgba(255,255,255,0.1)]"
            >
              <ChevronRight className="h-5 w-5 text-primary" />
            </button>
          </div>
        </div>

        <div className="mt-14">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: translateX }}
          >
            {events.map((item, index) => {
              const canOpenLightbox = slideIndexes.has(item.id);

              return (
                <article
                  key={item.id}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    flex: `0 0 ${cardBasis}`,
                  }}
                  className="group relative flex min-w-0 flex-col animate-fade-up overflow-hidden rounded-3xl bg-[rgba(var(--card),0.95)] shadow-card backdrop-blur transition-bounce hover:-translate-y-2 hover:shadow-elegant"
                >
                  <div className="relative h-44 overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image.src}
                        alt={item.image.alt || item.title}
                        fill
                        quality={95}
                        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                        className="object-cover transition-bounce duration-500 group-hover:scale-110"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--primary-deep),0.7)] via-[rgba(var(--primary),0.4)] to-transparent" />

                    <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-soft">
                      Подія
                    </span>

                    <div className="absolute -bottom-2 left-5 flex h-20 w-20 flex-col items-center justify-center rounded-t-2xl bg-card text-center shadow-elegant ring-4 ring-card transition-bounce group-hover:-rotate-3">
                      <span className="text-2xl font-extrabold leading-none text-primary">
                        {item.date.day}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {item.date.monthShort}
                      </span>
                      <span className="text-sm font-medium text-[rgba(var(--muted-foreground),0.8)]">
                        {item.date.year}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-6 py-6 text-foreground">
                    <h3 className="flex-1 text-lg font-bold transition-smooth group-hover:text-primary">
                      {item.title}
                    </h3>
                    <button
                      type="button"
                      disabled={!canOpenLightbox}
                      onClick={() => openLightbox(item.id)}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 cursor-pointer text-sm font-semibold text-primary-foreground shadow-soft transition-bounce hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-soft"
                    >
                      <Calendar className="h-4 w-4" />
                      Деталі події
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <ImageLightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        onView={setLightboxIndex}
      />
    </section>
  );
}
