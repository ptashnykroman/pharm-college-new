import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import { SmartLink } from '@/widgets/navigation/smart-link'
import type { CycleCommissionCardViewModel } from '@/widgets/cycle-commissions/model'

function CycleCommissionCard({ item }: { item: CycleCommissionCardViewModel }) {
  return (
    <SmartLink
      href={item.href}
      className="group relative block min-h-[260px] overflow-hidden rounded-[2rem] border border-border/70 bg-white shadow-card transition hover:-translate-y-1.5 hover:shadow-elegant"
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

      <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary/60 to-primary-deep/10 opacity-90 transition group-hover:opacity-95" />

      <div className="relative flex min-h-[260px] flex-col justify-end p-6">
        {/* <div className="inline-flex w-fit rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary shadow-soft">
          ЦМК
        </div> */}
        <div className="mt-4 flex items-end justify-between gap-4">
          <h2 className="text-balance text-lg font-black leading-tight text-white">{item.title}</h2>

          <span className="absolute right-4 top-4 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/90 text-primary shadow-soft transition group-hover:translate-x-1">
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
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute left-0 top-14 h-72 w-72 rounded-full bg-primary-glow/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent-gold/10 blur-3xl" />

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
