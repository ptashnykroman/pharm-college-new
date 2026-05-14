'use client'

import Image from 'next/image'
import { Play, ScanSearch } from 'lucide-react'

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import type { VideoAnd3dPageData } from '@/widgets/static-pages/data'

function toEmbeddedVideoUrl(url: string) {
  return url
    .replace('https://www.youtube.com/', 'https://www.youtube.com/embed/')
    .replace('watch?v=', '')
    .split('&t=')[0]
}

function MediaCard({
  title,
  image,
  triggerLabel,
  embedUrl,
  kind,
}: {
  title: string
  image: VideoAnd3dPageData['videos'][number]['image']
  triggerLabel: string
  embedUrl: string
  kind: 'video' | 'panorama'
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group relative cursor-pointer overflow-hidden rounded-[2rem] border border-[rgba(var(--border),0.7)] bg-white text-left shadow-card transition hover:-translate-y-1.5 hover:shadow-elegant"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-hero">
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : null}

            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(var(--primary-deep),0.9)] via-[rgba(var(--primary),0.2)] to-transparent" />
            <div className="absolute right-5 top-5 flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(255,255,255,0.9)] text-primary shadow-soft">
              {kind === 'video' ? <Play className="h-5 w-5" /> : <ScanSearch className="h-5 w-5" />}
            </div>
          </div>

          <div className="p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{triggerLabel}</p>
            <h3 className="mt-3 text-xl font-black leading-tight text-foreground">{title}</h3>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent
        className="max-w-[96vw] overflow-hidden rounded-[2rem] border-0 bg-primary-deep p-0 text-white shadow-elegant sm:max-w-6xl"
        showCloseButton
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className={cn(kind === 'video' ? 'aspect-video' : 'h-[80vh]')}>
          <iframe
            src={embedUrl}
            title={title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function VideoAnd3dPageView({ data }: { data: VideoAnd3dPageData }) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--primary),0.2)] to-transparent" />
      <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-[rgba(var(--primary-glow),0.1)] blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[rgba(var(--accent-gold),0.1)] blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">Відео та 3D-панорами</h1>
        </div>

        <div className="mt-10 grid gap-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-primary text-primary-foreground shadow-soft">
                <ScanSearch className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">3D-панорами</h2>
                <p className="text-sm text-[rgba(var(--foreground),0.7)]">Інтерактивний 3D-перегляд навчальних приміщень</p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {data.panoramas.map((item) => (
                <MediaCard
                  key={item.id}
                  title={item.title}
                  image={item.image}
                  triggerLabel="3D-панорама"
                  embedUrl={item.url}
                  kind="panorama"
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-primary text-primary-foreground shadow-soft">
                <Play className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Відео</h2>
                <p className="text-sm text-[rgba(var(--foreground),0.7)]">Добірка відеоматеріалів коледжу з відкриттям у діалозі.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {data.videos.map((item) => (
                <MediaCard
                  key={item.id}
                  title={item.title}
                  image={item.image}
                  triggerLabel="Відео"
                  embedUrl={`${toEmbeddedVideoUrl(item.url)}?controls=2`}
                  kind="video"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
