'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'
import { Mail, Phone } from 'lucide-react'

import { cn } from '@/lib/utils'
import { normalizePhone } from '@/widgets/page/cms-page/lib'
import type { CycleCommissionTeacherViewModel } from '@/widgets/cycle-commissions/model'

function HeadCard({ teacher }: { teacher: CycleCommissionTeacherViewModel }) {
  return (
    <article className="rounded-[2rem] border border-border/70 bg-white p-5 shadow-soft">
      <div className="grid gap-5 sm:grid-cols-[120px_minmax(0,1fr)] sm:items-start">
        <Link href={teacher.href} className="overflow-hidden rounded-[1.5rem] bg-muted/30 shadow-soft">
          {teacher.photo ? (
            <Image
              src={teacher.photo.src}
              alt={teacher.photo.alt}
              width={teacher.photo.width}
              height={teacher.photo.height}
              className="h-full w-full object-cover transition duration-500 hover:scale-[1.04]"
            />
          ) : (
            <div className="flex aspect-[3/4] items-center justify-center bg-gradient-primary text-3xl font-black text-white">
              {teacher.name
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase() ?? '')
                .join('')}
            </div>
          )}
        </Link>

        <div>
          <Link href={teacher.href} className="text-xl font-black text-foreground transition-colors hover:text-primary">
            {teacher.name}
          </Link>
          {teacher.position ? <p className="mt-2 text-sm leading-6 text-primary">{teacher.position}</p> : null}

          <div className="mt-4 space-y-2 text-sm text-foreground/80">
            {teacher.phone ? (
              <a href={`tel:${normalizePhone(teacher.phone)}`} className="flex items-center gap-2 hover:text-primary">
                <Phone className="h-4 w-4" />
                <span>{teacher.phone}</span>
              </a>
            ) : null}
            {teacher.email ? (
              <a href={`mailto:${teacher.email}`} className="flex items-center gap-2 hover:text-primary">
                <Mail className="h-4 w-4" />
                <span className="break-all">{teacher.email}</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}

function TeacherCard({ teacher }: { teacher: CycleCommissionTeacherViewModel }) {
  const nameLines = teacher.name.split(' ').filter(Boolean)

  return (
    <article className="rounded-[1.75rem] border border-border/70 bg-white p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-card">
      <div className="flex items-center gap-4">
        <Link href={teacher.href} className="shrink-0 overflow-hidden rounded-[1.25rem] bg-muted/30">
          {teacher.photo ? (
            <Image
              src={teacher.photo.src}
              alt={teacher.photo.alt}
              width={teacher.photo.width}
              height={teacher.photo.height}
              className="h-[130px] w-[90px] object-cover"
            />
          ) : (
            <div className="flex h-[130px] w-[90px] items-center justify-center bg-gradient-primary text-2xl font-black text-white">
              {nameLines
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase() ?? '')
                .join('')}
            </div>
          )}
        </Link>

        <div className="min-w-0">
          <Link href={teacher.href} className="text-xl font-black leading-tight text-foreground transition-colors hover:text-primary">
            {nameLines.map((part, index) => (
              <span key={`${part}-${index}`} className="block">
                {part}
              </span>
            ))}
          </Link>
        </div>
      </div>

      {teacher.subjects.length ? (
        <ul className="mt-4 space-y-2 text-sm leading-6 text-foreground/75">
          {teacher.subjects.map((subject) => (
            <li key={subject}>«{subject}»</li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

export function CmkPeoplePanel({
  title = 'Склад комісії',
  head,
  teachers,
  className,
}: {
  title?: string
  head: CycleCommissionTeacherViewModel | null
  teachers: CycleCommissionTeacherViewModel[]
  className?: string
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const teachersPerPage = 4

  const pagesCount = Math.max(1, Math.ceil(teachers.length / teachersPerPage))

  const paginatedTeachers = useMemo(() => {
    const start = (currentPage - 1) * teachersPerPage

    return teachers.slice(start, start + teachersPerPage)
  }, [currentPage, teachers])

  function handlePageChange(page: number) {
    setCurrentPage(page)
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div ref={sectionRef} className={cn('space-y-6', className)}>
      {head ? <HeadCard teacher={head} /> : null}

      {teachers.length ? (
        <>
          <div className="rounded-[1.5rem] bg-gradient-soft px-5 py-4 text-center">
            <h2 className="text-xl font-black text-primary">{title}</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            {paginatedTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>

          {pagesCount > 1 ? (
            <div className="flex flex-wrap justify-center gap-2">
              {Array.from({ length: pagesCount }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageChange(page)}
                  className={cn(
                    'inline-flex h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-bold transition',
                    currentPage === page
                      ? 'border-primary bg-primary text-primary-foreground shadow-soft'
                      : 'border-primary/25 bg-white text-primary hover:border-primary hover:bg-primary/5',
                  )}
                >
                  {page}
                </button>
              ))}
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
