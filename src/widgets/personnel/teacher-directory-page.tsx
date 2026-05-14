'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { CommissionOption, TeacherCardViewModel } from '@/widgets/personnel/model'

const ALL_COMMISSIONS_VALUE = 'all'

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function formatSubjects(subjects: string[]) {
  if (!subjects.length) {
    return 'Перейдіть у профіль викладача, щоб переглянути повну інформацію.'
  }

  return subjects.map((subject) => `«${subject}»`).join(', ')
}

function TeacherCard({ teacher, index }: { teacher: TeacherCardViewModel; index: number }) {
  const isReversed = Math.floor(index / 3) % 2 === 1

  return (
    <Link
      href={teacher.href}
      className={cn(
        'group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-[2rem] border border-[rgba(var(--border),0.7)] bg-white shadow-soft transition hover:-translate-y-1.5 hover:shadow-card lg:flex-row',
        isReversed && 'xl:flex-row-reverse',
      )}
    >
      <div className="relative shrink-0 overflow-hidden bg-gradient-brand-surface lg:w-[42%]">
        {teacher.photo ? (
          <Image
            src={teacher.photo.src}
            alt={teacher.photo.alt}
            width={teacher.photo.width}
            height={teacher.photo.height}
            className="h-full min-h-[220px] w-full object-cover transition duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full min-h-[220px] items-center justify-center text-6xl font-black text-[rgba(255,255,255,0.9)]">
            {getInitials(teacher.name)}
          </div>
        )}

        {/* <div className="absolute left-4 top-4 rounded-full bg-[rgba(255,255,255,0.9)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-primary shadow-soft">
          Профіль
        </div> */}
      </div>

      <div className="flex flex-1 flex-col p-3 md:p-5">
        <p className="text-sm font-bold text-primary leading-5">{teacher.cycleCommission.name}</p>
        <h2 className="mt-1 text-balance text-xl font-bold text-foreground leading-6">{teacher.name}</h2>
        <p className="mt-4 overflow-hidden text-sm leading-5 text-[rgba(var(--foreground),0.75)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]">
          {formatSubjects(teacher.subjects)}
        </p>

        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-primary transition-transform group-hover:translate-x-1">
          Детальніше
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

export function TeacherDirectoryPageView({
  commissions,
  teachers,
}: {
  commissions: CommissionOption[]
  teachers: TeacherCardViewModel[]
}) {
  const [selectedCommission, setSelectedCommission] = useState(ALL_COMMISSIONS_VALUE)

  const filteredTeachers =
    selectedCommission === ALL_COMMISSIONS_VALUE
      ? teachers
      : teachers.filter((teacher) => teacher.cycleCommission.slug === selectedCommission)

  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-divider" />
      <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-[rgba(var(--primary-glow),0.1)] blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[rgba(var(--accent-gold),0.1)] blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6">
        <h1 className="mt-5 text-3xl font-black text-center text-foreground sm:text-4xl">Кадровий склад</h1>

        <div className="w-full max-w-sm">
          <label className="mb-1 block text-sm font-bold text-[rgba(var(--foreground),0.65)]">ЦК</label>
          <Select value={selectedCommission} onValueChange={setSelectedCommission}>
            <SelectTrigger className="!h-12 w-full rounded-full border-[rgba(var(--primary),0.15)] bg-white px-4 shadow-soft cursor-pointer">
              <SelectValue placeholder="Усі ЦМК" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_COMMISSIONS_VALUE}>Усі ЦМК</SelectItem>
              {commissions.map((commission) => (
                <SelectItem key={commission.id} value={commission.slug} className="cursor-pointer">
                  {commission.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredTeachers.length ? (
          <div className="mt-10 grid gap-6 xl:grid-cols-3">
            {filteredTeachers.map((teacher, index) => (
              <TeacherCard key={teacher.id} teacher={teacher} index={index} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[2rem] border border-dashed border-border bg-[rgba(255,255,255,0.8)] px-6 py-12 text-center shadow-soft">
            <p className="text-lg font-semibold text-foreground">Для вибраної ЦМК викладачів не знайдено.</p>
          </div>
        )}
      </div>
    </section>
  )
}
