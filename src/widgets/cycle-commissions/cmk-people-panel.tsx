'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import type { CycleCommissionTeacherViewModel } from '@/widgets/cycle-commissions/model'
import { PersonPageBlock } from '../page/cms-page/blocks/person-block'
import type { PersonBlock } from '../page/cms-page/model'

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
          <Link
            href={teacher.href}
            className="text-xl font-black leading-tight text-foreground transition-colors hover:text-primary"
          >
            {nameLines.map((part, index) => (
              <span key={`${part}-${index}`} className="block">
                {part}
              </span>
            ))}
          </Link>
        </div>
      </div>

      {teacher.subjects.length ? (
        <ul className="mt-4 text-sm leading-6 text-foreground/75">
          {teacher.subjects.map((subject) => (
            <li key={subject}>«{subject}»</li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

function buildPersonBlockFromTeacher(teacher: CycleCommissionTeacherViewModel): PersonBlock {
  const [, , cmkSlug] = teacher.href.split('/').filter(Boolean)

  return {
    worker: {
      data: {
        attributes: {
          name: teacher.name,
          slug: teacher.slug,
          position: teacher.position,
          phone: teacher.phone,
          email: teacher.email,
          photo: {
            data: teacher.photo
              ? {
                  attributes: {
                    name: teacher.name,
                    url: teacher.photo.src,
                    width: teacher.photo.width,
                    height: teacher.photo.height,
                    alternativeText: teacher.photo.alt,
                    formats: null,
                  },
                }
              : null,
          },
          cycle_commission: {
            data: cmkSlug
              ? {
                  attributes: {
                    slug: cmkSlug,
                  },
                }
              : null,
          },
        },
      },
    },
  } as PersonBlock
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
      {head ? (
        <PersonPageBlock
          block={buildPersonBlockFromTeacher(head)}
        />
      ) : null}

      {teachers.length ? (
        <>
          <div className="rounded-[1.5rem] bg-gradient-soft px-5 py-4 text-center">
            <h2 className="text-xl font-black text-primary">{title}</h2>
          </div>

          <div className="grid gap-4 grid-cols-1">
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
