'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { ResolvedImage } from '@/shared/lib/media'

const GALLERY_IMAGE_SIZES =
  '(min-width: 1536px) 960px, (min-width: 1280px) 820px, (min-width: 768px) calc(100vw - 3rem), calc(100vw - 2rem)'

function getPreviousIndex(currentIndex: number, total: number) {
  return currentIndex === 0 ? total - 1 : currentIndex - 1
}

function getNextIndex(currentIndex: number, total: number) {
  return (currentIndex + 1) % total
}

function collectPreparedIndexes(activeIndex: number, total: number) {
  if (total <= 1) {
    return [0]
  }

  return Array.from(
    new Set([activeIndex, getPreviousIndex(activeIndex, total), getNextIndex(activeIndex, total)]),
  )
}

export function CmkMainPhotoGallery({ images }: { images: ResolvedImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [pendingIndex, setPendingIndex] = useState<number | null>(null)
  const [loadedIndexes, setLoadedIndexes] = useState(() => new Set<number>([0]))

  useEffect(() => {
    setActiveIndex(0)
    setPendingIndex(null)
    setLoadedIndexes(new Set([0]))
  }, [images.length, images[0]?.src])

  useEffect(() => {
    if (pendingIndex === null || !loadedIndexes.has(pendingIndex)) {
      return
    }

    setActiveIndex(pendingIndex)
    setPendingIndex(null)
  }, [loadedIndexes, pendingIndex])

  if (images.length === 0) {
    return null
  }

  const markImageAsLoaded = (index: number) => {
    setLoadedIndexes((current) => {
      if (current.has(index)) {
        return current
      }

      const next = new Set(current)
      next.add(index)
      return next
    })
  }

  const requestSlide = (index: number) => {
    if (index === activeIndex || index === pendingIndex) {
      return
    }

    if (loadedIndexes.has(index)) {
      setActiveIndex(index)
      setPendingIndex(null)
      return
    }

    setPendingIndex(index)
  }

  if (images.length === 1) {
    const image = images[0]

    return (
      <div className="overflow-hidden rounded-[2rem] border border-border/80 bg-white shadow-card">
        <Image
          preload
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={GALLERY_IMAGE_SIZES}
          className="max-h-[420px] w-full object-cover"
        />
      </div>
    )
  }

  const preparedIndexes = Array.from(
    new Set([
      ...collectPreparedIndexes(activeIndex, images.length),
      ...(pendingIndex === null ? [] : collectPreparedIndexes(pendingIndex, images.length)),
    ]),
  )

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border/80 bg-white shadow-card">
      <div className="relative grid" aria-busy={pendingIndex !== null}>
        {preparedIndexes.map((index) => {
          const image = images[index]

          if (!image) {
            return null
          }

          const isVisible = index === activeIndex

          return (
            <Image
              key={`${image.src}-${index}`}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              preload={index === 0}
              loading={index === 0 ? undefined : 'eager'}
              sizes={GALLERY_IMAGE_SIZES}
              onLoad={() => markImageAsLoaded(index)}
              aria-hidden={!isVisible}
              className={`col-start-1 row-start-1 max-h-[420px] w-full object-cover transition-opacity duration-300 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )
        })}

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-primary-deep/80 via-primary/35 to-transparent px-4 pb-4 pt-16">
          <button
            type="button"
            onClick={() => requestSlide(getPreviousIndex(activeIndex, images.length))}
            className="cursor-pointer inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-primary shadow-soft transition hover:scale-105"
            aria-label="Попереднє фото"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex flex-wrap justify-center gap-2">
            {images.map((slide, index) => (
              <button
                key={`${slide.src}-${index}`}
                type="button"
                onClick={() => requestSlide(index)}
                className={`h-2.5 rounded-full transition ${
                  index === activeIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/55 hover:bg-white/80'
                }`}
                aria-label={`Перейти до фото ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => requestSlide(getNextIndex(activeIndex, images.length))}
            className="cursor-pointer inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-primary shadow-soft transition hover:scale-105"
            aria-label="Наступне фото"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
