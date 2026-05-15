'use client'

import Image from 'next/image'
import { Calendar, LoaderCircle } from 'lucide-react'
import { useState } from 'react'

import type { ImageLightboxSlide } from '@/components/shared/image-lightbox'
import type { HomePageViewModel } from '@/widgets/home/model'

type ImageLightboxComponent = typeof import('@/components/shared/image-lightbox').ImageLightbox

let imageLightboxPromise: Promise<ImageLightboxComponent> | null = null

function loadImageLightbox() {
  if (!imageLightboxPromise) {
    imageLightboxPromise = import('@/components/shared/image-lightbox').then((mod) => mod.ImageLightbox)
  }

  return imageLightboxPromise
}

export function EventsSection({
  events,
}: {
  events: HomePageViewModel['events']
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [loadingEventId, setLoadingEventId] = useState<string | null>(null)
  const [imageLightboxComponent, setImageLightboxComponent] = useState<ImageLightboxComponent | null>(null)

  const slides: ImageLightboxSlide[] = []
  const slideIndexes = new Map<string, number>()

  for (const item of events) {
    if (!item.image) {
      continue
    }

    slideIndexes.set(item.id, slides.length)
    slides.push({
      src: item.image.src,
      alt: item.image.alt || item.title,
      width: item.image.width,
      height: item.image.height,
    })
  }

  async function openLightbox(eventId: string) {
    const nextIndex = slideIndexes.get(eventId)

    if (nextIndex === undefined) {
      return
    }

    if (imageLightboxComponent) {
      setLightboxIndex(nextIndex)
      setLightboxOpen(true)
      return
    }

    setLoadingEventId(eventId)

    try {
      const nextImageLightboxComponent = await loadImageLightbox()

      setImageLightboxComponent(() => nextImageLightboxComponent)
      setLightboxIndex(nextIndex)
      setLightboxOpen(true)
    } finally {
      setLoadingEventId((currentEventId) => (currentEventId === eventId ? null : currentEventId))
    }
  }

  const ImageLightbox = imageLightboxComponent

  return (
    <section id="events" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-primary-deep">
        <div className="absolute inset-0 bg-gradient-events-primary-glow" />
        <div className="absolute inset-0 bg-gradient-events-gold-glow" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl">
          <h2 className="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">Події коледжу</h2>
          <p className="mt-3 text-muted-foreground">
            Не пропустіть найближчі заходи: дні відкритих дверей, конференції та зустрічі.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {events.map((item, index) => {
            const canOpenLightbox = slideIndexes.has(item.id)
            const isLoading = loadingEventId === item.id

            return (
              <article
                key={item.id}
                style={{
                  animationDelay: `${index * 100}ms`,
                  transitionProperty: 'transform, box-shadow',
                }}
                className="group relative flex min-w-0 flex-col animate-fade-up overflow-hidden rounded-3xl bg-[rgba(var(--card),0.95)] shadow-card backdrop-blur transition-bounce hover:-translate-y-2 hover:shadow-elegant"
              >
                <div className="relative h-44 overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image.src}
                      alt={item.image.alt || item.title}
                      fill
                      quality={80}
                      sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                      className="object-cover transition-bounce duration-500 group-hover:scale-110"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-events-overlay" />

                  <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-soft">
                    Подія
                  </span>

                  <div className="absolute -bottom-2 left-5 flex h-20 w-20 flex-col items-center justify-center rounded-t-2xl bg-card text-center shadow-elegant ring-4 ring-card transition-bounce group-hover:-rotate-3">
                    <span className="text-2xl font-black leading-none text-primary">{item.date.day}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {item.date.monthShort}
                    </span>
                    <span className="text-sm font-medium text-[rgba(var(--muted-foreground),0.8)]">
                      {item.date.year}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-6 py-6 text-foreground">
                  <h3 className="flex-1 text-lg font-bold transition-smooth group-hover:text-primary">{item.title}</h3>
                  <button
                    type="button"
                    disabled={!canOpenLightbox || isLoading}
                    onClick={() => void openLightbox(item.id)}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 cursor-pointer text-sm font-semibold text-primary-foreground shadow-soft transition-bounce hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-soft"
                  >
                    {isLoading ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <Calendar className="h-4 w-4" />
                    )}
                    {isLoading ? 'Завантажуємо фото' : 'Деталі події'}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {ImageLightbox ? (
        <ImageLightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={slides}
          onView={setLightboxIndex}
        />
      ) : null}
    </section>
  )
}
