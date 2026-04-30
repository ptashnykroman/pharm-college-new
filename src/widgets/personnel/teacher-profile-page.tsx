'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { CalendarDays, Mail, Phone } from 'lucide-react'

import { cn } from '@/lib/utils'
import { AppButton } from '@/components/shared/app-button'
import { formatCmsHtml, normalizePhone } from '@/widgets/page/cms-page/lib'
import type { TeacherProfileViewModel } from '@/widgets/personnel/model'

function TeacherProfileTabButton({
  isActive,
  label,
  onClick,
}: {
  isActive: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-5 py-3 text-sm font-bold transition md:text-base',
        isActive
          ? 'bg-primary text-primary-foreground shadow-soft'
          : 'bg-muted text-foreground/70 hover:bg-accent hover:text-foreground',
      )}
    >
      {label}
    </button>
  )
}

function TeacherProfileTabs({ teacher }: { teacher: TeacherProfileViewModel }) {
  const tabs = [
    { id: 'general', label: 'Загальна інформація' },
    ...(teacher.additionalInformation?.trim()
      ? [{ id: 'additional', label: 'Додаткова інформація' }]
      : []),
    ...(teacher.printedWorks?.trim() ? [{ id: 'printed', label: 'Друковані праці' }] : []),
  ]

  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? 'general')

  return (
    <div className="container mx-auto px-4 pb-16 md:px-6 md:pb-20">
      <div className="rounded-[2rem] border border-border/70 bg-white/90 p-4 shadow-card backdrop-blur md:p-6">
        <div className="flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <TeacherProfileTabButton
              key={tab.id}
              isActive={tab.id === activeTab}
              label={tab.label}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-[2rem] border border-border/70 bg-white p-6 shadow-card md:p-8">
        {activeTab === 'general' ? (
          <div className="grid gap-8 lg:grid-cols-[minmax(240px,320px)_minmax(0,1fr)]">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-deep via-primary to-primary-glow shadow-soft">
                {teacher.photo ? (
                  <Image
                    src={teacher.photo.src}
                    alt={teacher.photo.alt}
                    width={teacher.photo.width}
                    height={teacher.photo.height}
                    className="w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[3/4] items-center justify-center text-6xl font-black text-white/90">
                    {teacher.name
                      .split(' ')
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((part) => part[0]?.toUpperCase() ?? '')
                      .join('')}
                  </div>
                )}
              </div>

              {teacher.calendarId ? (
                <AppButton
                  href={`/rozklad/vikladach/${teacher.slug}`}
                  icon={CalendarDays}
                  iconPosition="right"
                  shape="rounded"
                  width="full"
                >
                  Переглянути розклад
                </AppButton>
              ) : null}
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/75">
                <Link href={`/structure/cmks/${teacher.cycleCommission.slug}`} className="transition-colors hover:text-primary">
                  {teacher.cycleCommission.name}
                </Link>
              </p>
              <h1 className="mt-3 text-3xl font-black text-foreground md:text-4xl">{teacher.name}</h1>

              {teacher.status || teacher.position ? (
                <div className="mt-6 rounded-[1.5rem] bg-gradient-soft p-5">
                  <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-foreground/65">Посада та кваліфікація</h3>
                  <p className="mt-3 text-base leading-7 text-foreground/80">{teacher.status || teacher.position}</p>
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                {teacher.email ? (
                  <a
                    href={`mailto:${teacher.email}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white px-4 py-2 text-foreground/80 shadow-soft transition-colors hover:text-primary"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{teacher.email}</span>
                  </a>
                ) : null}

                {teacher.phone ? (
                  <a
                    href={`tel:${normalizePhone(teacher.phone)}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white px-4 py-2 text-foreground/80 shadow-soft transition-colors hover:text-primary"
                  >
                    <Phone className="h-4 w-4" />
                    <span>{teacher.phone}</span>
                  </a>
                ) : null}
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-foreground/65">Навчальні предмети</h3>

                {teacher.subjects.length ? (
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {teacher.subjects.map((subject) => (
                      <li
                        key={subject}
                        className="rounded-[1.25rem] border border-border/70 bg-white px-4 py-3 text-sm leading-6 text-foreground/80 shadow-soft"
                      >
                        «{subject}»
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm leading-7 text-foreground/75">Інформація про предмети викладача наразі відсутня.</p>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === 'additional' && teacher.additionalInformation ? (
          <div className="rich-text" dangerouslySetInnerHTML={{ __html: formatCmsHtml(teacher.additionalInformation) }} />
        ) : null}

        {activeTab === 'printed' && teacher.printedWorks ? (
          <div className="rich-text" dangerouslySetInnerHTML={{ __html: formatCmsHtml(teacher.printedWorks) }} />
        ) : null}
      </div>
    </div>
  )
}

export function TeacherProfilePageView({ teacher }: { teacher: TeacherProfileViewModel }) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute left-0 top-16 h-72 w-72 rounded-full bg-primary-glow/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent-gold/10 blur-3xl" />

      <TeacherProfileTabs teacher={teacher} />
    </section>
  )
}
