import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'

import { cn } from '@/lib/utils'
import { normalizePhone } from '@/widgets/page/cms-page/lib'
import type { AdministrationCardViewModel } from '@/widgets/personnel/model'

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function AdministrationCard({ person }: { person: AdministrationCardViewModel }) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-deep via-primary to-primary-glow shadow-card">
        {person.photo ? (
          <Image
            src={person.photo.src}
            alt={person.photo.alt}
            width={person.photo.width}
            height={person.photo.height}
            className="h-[360px] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-[360px] items-center justify-center bg-gradient-to-br from-primary-deep via-primary to-primary-glow text-6xl font-black text-white/90">
            {getInitials(person.name)}
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-deep via-primary/90 to-transparent px-5 pb-5 pt-16">
          {person.position ? (
            <p className="text-balance text-lg font-bold leading-6 text-white">{person.position}</p>
          ) : null}
        </div>
      </div>

      <div className="-mt-6 mx-4 flex flex-1 flex-col rounded-[1.75rem] border border-border/70 bg-white p-5 shadow-card">
        <h2 className="text-xl font-black text-foreground">{person.name}</h2>

        <div className="mt-4 space-y-3 text-sm text-foreground/80">
          {person.phone ? (
            <a
              href={`tel:${normalizePhone(person.phone)}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4" />
              <span>{person.phone}</span>
            </a>
          ) : null}

          {person.email ? (
            <a href={`mailto:${person.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-primary">
              <Mail className="h-4 w-4" />
              <span className="break-all">{person.email}</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export function AdministrationPageView({ people }: { people: AdministrationCardViewModel[] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute left-0 top-20 h-64 w-64 rounded-full bg-primary-glow/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent-gold/10 blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-primary/15 bg-white/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-primary shadow-soft">
            Команда коледжу
          </span>
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">Адміністрація</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-foreground/75">
            Контакти та посади адміністрації. Ці картки є інформаційними й не ведуть на окремі сторінки.
          </p>
        </div>

        <div className={cn('mt-10 grid gap-8', 'sm:grid-cols-2 xl:grid-cols-4')}>
          {people.map((person) => (
            <AdministrationCard key={person.id} person={person} />
          ))}
        </div>
      </div>
    </section>
  )
}
