import Image from 'next/image'

import type { HomePageViewModel } from '@/widgets/home/model'

export function GallerySection({ gallery }: { gallery: HomePageViewModel['gallery'] }) {
  return (
    <section id="gallery" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">{gallery.title}</h2>
          <p className="mt-4 text-muted-foreground">Навчання, події, дозвілля та люди, що формують нашу спільноту.</p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:gap-4">
          {gallery.items.slice(0, 6).map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl shadow-soft transition-bounce hover:-translate-y-1 hover:shadow-card"
            >
              <Image
                src={item.image.src}
                alt={item.image.alt || item.title}
                fill
                quality={95}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-bounce group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/85 via-primary-deep/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <div className="text-sm font-semibold text-primary-foreground md:text-base">{item.title}</div>
              </div>
            </a>
          ))}

          <a
            href={gallery.items[2].href}
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-square overflow-hidden rounded-2xl shadow-soft transition-bounce hover:-translate-y-1 hover:shadow-card"
          >
            <Image
              src={gallery.items[2].image.src}
              alt={gallery.items[2].image.alt || gallery.items[2].title}
              fill
              quality={95}
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-bounce group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/85 via-primary-deep/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
              <div className="text-sm font-semibold text-primary-foreground md:text-base">Зустріч з роботодавцями</div>
            </div>
          </a>

          <a
            href={gallery.items[2].href}
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-square overflow-hidden rounded-2xl shadow-soft transition-bounce hover:-translate-y-1 hover:shadow-card"
          >
            <Image
              src={gallery.items[2].image.src}
              alt={gallery.items[2].image.alt || gallery.items[2].title}
              fill
              quality={95}
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-bounce group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/85 via-primary-deep/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
              <div className="text-sm font-semibold text-primary-foreground md:text-base">?????</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
