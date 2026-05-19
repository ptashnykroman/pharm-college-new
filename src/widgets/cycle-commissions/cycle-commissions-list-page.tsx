import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import { SmartLink } from '@/widgets/navigation/smart-link'
import type { CycleCommissionCardViewModel } from '@/widgets/cycle-commissions/model'

function CycleCommissionCard({ item }: { item: CycleCommissionCardViewModel }) {
  return (
    <SmartLink
      href={item.href}
      className="group relative block min-h-[260px] overflow-hidden rounded-[2rem] border border-[rgba(var(--border),0.7)] bg-white shadow-card transition hover:-translate-y-1.5 hover:shadow-elegant"
    >
      <div className="absolute inset-0">
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
          />
        ) : (
          <div className="h-full w-full bg-gradient-hero" />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-card-overlay opacity-90 transition group-hover:opacity-95" />

      <div className="relative flex min-h-[260px] flex-col justify-end p-6">
        <div className="mt-4 flex items-end justify-between gap-4">
          <h2 className="text-balance text-lg font-black leading-tight text-white">{item.title}</h2>

          <span className="absolute right-4 top-4 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[rgba(255,255,255,0.9)] text-primary shadow-soft transition group-hover:translate-x-1">
            <ArrowRight className="h-5 w-5" />
          </span>
        </div>
      </div>
    </SmartLink>
  )
}

export function CycleCommissionsListPageView({ items }: { items: CycleCommissionCardViewModel[] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-divider" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">Циклові комісії</h1>
        </div>

        <div className="mt-10 grid gap-3 md:gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <CycleCommissionCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
