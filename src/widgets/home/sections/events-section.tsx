import Image from 'next/image'
import { Calendar } from 'lucide-react'

import type { HomePageViewModel } from '@/widgets/home/model'

export function EventsSection({ events }: { events: HomePageViewModel['events'] }) {
  return (
    <section id="events" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-primary-deep">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_oklch(0.62_0.18_245_/_0.4),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_oklch(0.82_0.16_85_/_0.18),_transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">Події коледжу</h2>
            <p className="mt-3 text-muted-foreground">
              Не пропустіть найближчі заходи: дні відкритих дверей, конференції та зустрічі.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {events.slice(0, 3).map((item, index) => (
            <article
              key={item.id}
              style={{ animationDelay: `${index * 100}ms` }}
              className="group relative flex flex-col animate-fade-up overflow-hidden rounded-3xl bg-card/95 shadow-card backdrop-blur transition-bounce hover:-translate-y-2 hover:shadow-elegant"
            >
              <div className="relative h-44 overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image.src}
                    alt={item.image.alt || item.title}
                    fill
                    quality={95}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-bounce duration-500 group-hover:scale-110"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-deep/70 via-primary/40 to-transparent" />

                <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-soft">
                  Подія
                </span>

                <div className="absolute -bottom-2 left-5 flex h-20 w-20 flex-col items-center justify-center rounded-t-2xl bg-card text-center shadow-elegant ring-4 ring-card transition-bounce group-hover:-rotate-3">
                  <span className="text-2xl font-extrabold leading-none text-primary">{item.date.day}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {item.date.monthShort}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground/80">{item.date.year}</span>
                </div>
              </div>

              <div className="flex flex-col flex-1 px-6 py-6 text-foreground">
                <h3 className="flex-1 text-lg font-bold transition-smooth group-hover:text-primary">{item.title}</h3>
                <a
                  href="#events"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-bounce hover:shadow-glow"
                >
                  <Calendar className="h-4 w-4" />
                  Деталі події
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
