'use client'

import { useEffect, useRef, useState } from 'react'

type HomeContactsMapProps = {
  title: string
  mapUrl: string
}

const MAP_ROOT_MARGIN = '300px'

export function HomeContactsMap({ title, mapUrl }: HomeContactsMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [shouldLoadMap, setShouldLoadMap] = useState(false)

  useEffect(() => {
    const node = containerRef.current

    if (!node || shouldLoadMap) {
      return
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setShouldLoadMap(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries

        if (!entry?.isIntersecting) {
          return
        }

        setShouldLoadMap(true)
        observer.disconnect()
      },
      { rootMargin: MAP_ROOT_MARGIN },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [shouldLoadMap])

  return (
    <div ref={containerRef} className="mt-6 overflow-hidden rounded-2xl border border-border bg-muted/40">
      {shouldLoadMap ? (
        <iframe
          src={mapUrl}
          title={title}
          className="h-[400px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="flex h-[400px] items-center justify-center bg-gradient-soft px-6 text-center">
          <div className="max-w-sm">
            <p className="text-sm font-semibold text-foreground">Карта завантажиться, коли ви доскролите до цього блоку.</p>
            <p className="mt-2 text-sm text-muted-foreground">Так сторінка відкривається швидше, а карта з’являється саме тоді, коли вона потрібна.</p>
          </div>
        </div>
      )}
    </div>
  )
}
