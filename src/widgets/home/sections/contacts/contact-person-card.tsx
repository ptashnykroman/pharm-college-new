import { Mail, MapPin, Phone, User } from 'lucide-react'

import type { HomePageViewModel } from '@/widgets/home/model'

const iconByIndex = [MapPin, Phone, Mail] as const

export function ContactPersonCard({
  person,
  index,
}: {
  person: HomePageViewModel['contacts']['people'][number]
  index: number
}) {
  const Icon = iconByIndex[index % iconByIndex.length]

  return (
    <div className="flex items-start gap-2 sm:gap-4 rounded-2xl border border-border bg-card px-3 py-5 sm:p-5 shadow-soft transition-smooth hover:shadow-card">
      <div className="flex h-9 w-9 sm:h-11 sm:w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
        <User className="h-5 w-5 sm:h-7 sm:w-7" />
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{person.position}</div>

        <div className="font-medium text-foreground">{person.name}</div>

        <div className="mt-0 space-y-0 text-sm text-foreground">
          <a href={`tel:${person.phone}`} className="block transition-smooth hover:text-primary">
            {person.phone}
          </a>
          <a
            href={`mailto:${person.email}`}
            className="block transition-smooth hover:text-primary max-[350px]:max-w-[210px] max-[400px]:max-w-[250px] max-w-auto truncate overflow-hidden text-ellipsis"
          >
            {person.email}
          </a>
        </div>
      </div>
    </div>
  )
}
