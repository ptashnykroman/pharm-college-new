'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { ResolvedImage } from '@/shared/lib/media'

export function CmkMainPhotoGallery({ images }: { images: ResolvedImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (images.length === 0) {
    return null
  }

  if (images.length === 1) {
    const image = images[0]

    return (
      <div className="overflow-hidden rounded-[2rem] border border-border/80 bg-white shadow-card">
        <Image
          priority
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="max-h-[420px] w-full object-cover"
        />
      </div>
    )
  }

  const image = images[activeIndex]

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border/80 bg-white shadow-card">
      <div className="relative">
        <Image
          priority
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="max-h-[420px] w-full object-cover"
        />

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-primary-deep/80 via-primary/35 to-transparent px-4 pb-4 pt-16">
          <button
            type="button"
            onClick={() => setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1))}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-primary shadow-soft transition hover:scale-105"
            aria-label="Попереднє фото"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex flex-wrap justify-center gap-2">
            {images.map((slide, index) => (
              <button
                key={`${slide.src}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition ${
                  index === activeIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/55 hover:bg-white/80'
                }`}
                aria-label={`Перейти до фото ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setActiveIndex((current) => (current + 1) % images.length)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-primary shadow-soft transition hover:scale-105"
            aria-label="Наступне фото"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
