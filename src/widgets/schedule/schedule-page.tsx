import { ArrowUpRight, CalendarRange, GraduationCap } from 'lucide-react'

import type {
  ExamSchedulePageViewModel,
  ExamScheduleProgramSection,
  ExamScheduleStudyFormSection,
  EmbeddedScheduleViewModel,
  ScheduleDepartmentSection,
  ScheduleTeacherSection,
} from '@/widgets/schedule/data'
import { SmartLink } from '../navigation/smart-link'

function GroupDirectorySection({ section }: { section: ScheduleDepartmentSection }) {
  return (
    <article className="rounded-[1.5rem] border border-[rgba(var(--border),0.7)] bg-white px-2 py-6 shadow-card sm:rounded-[2rem] sm:p-6 md:p-8">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[1.25rem] bg-primary text-primary-foreground shadow-soft sm:h-12 sm:w-12">
          <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div>
          <h2 className="text-lg leading-tight font-black text-foreground sm:text-xl md:text-2xl">{section.title}</h2>
          {section.subtitle ? (
            <p className="mt-0.5 text-xs text-[rgba(var(--foreground),0.7)] sm:text-sm md:text-md">{section.subtitle}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {section.specialties.map((specialty) => (
          <div key={specialty.id} className="rounded-[1.5rem] border border-[rgba(var(--border),0.7)] bg-[rgba(var(--muted),0.2)] px-3 py-5 sm:p-5">
            <h3 className="text-base leading-tight font-black text-foreground sm:text-lg">{specialty.title}</h3>
            <div className="mt-4 grid gap-4">
              {specialty.degrees.map((degree) => (
                <div key={degree.id}>
                  <p className="text-sm font-bold text-primary">{degree.title}</p>
                  <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
                    {degree.groups.map((group) => (
                      <SmartLink
                        key={group.id}
                        className="rounded-[0.75rem] border border-[rgba(var(--primary),0.3)] bg-white px-3 py-1 text-sm font-semibold text-foreground shadow-soft hover:bg-accent hover:text-primary sm:text-md"
                        href={group.href}
                      >
                        {group.name}
                      </SmartLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

function TeacherDirectorySection({ section }: { section: ScheduleTeacherSection }) {
  return (
    <article className="rounded-[1.5rem] border border-[rgba(var(--border),0.7)] bg-white p-4 shadow-card sm:rounded-[2rem] sm:p-6 md:p-8">
      <h2 className="text-base font-black text-foreground sm:text-xl">{section.title}</h2>
      <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
        {section.teachers.map((teacher) => (
          <SmartLink
            key={teacher.id}
            className="rounded-[0.75rem] border border-[rgba(var(--primary),0.3)] bg-white px-3 py-1 text-sm font-semibold text-foreground shadow-soft hover:bg-accent hover:text-primary sm:text-md"
            href={teacher.href}
          >
            {teacher.label}
          </SmartLink>
        ))}
      </div>
    </article>
  )
}

function ExamScheduleProgramCard({ program }: { program: ExamScheduleProgramSection }) {
  return (
    <div className="rounded-[1.5rem] border border-[rgba(var(--border),0.7)] bg-white p-4 shadow-soft sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-sm leading-snug font-black text-foreground sm:text-base">{program.title}</h4>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] bg-[rgba(var(--primary),0.08)] text-primary">
          <CalendarRange className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {program.items.map((item) => (
          <SmartLink
            key={item.id}
            className="group flex min-h-14 items-center justify-between gap-3 rounded-[1rem] border border-[rgba(var(--primary),0.2)] bg-white px-4 py-3 text-left text-sm font-semibold text-foreground shadow-soft transition-bounce hover:-translate-y-0.5 hover:border-[rgba(var(--primary),0.4)] hover:bg-[rgba(var(--accent),0.7)] hover:text-primary"
            href={item.href}
            ariaLabel={`Відкрити ${item.label}`}
          >
            <span>{item.label}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

function ExamScheduleStudyFormCard({ section }: { section: ExamScheduleStudyFormSection }) {
  return (
    <article className="rounded-[1.75rem] border border-[rgba(var(--border),0.7)] bg-[rgba(255,255,255,0.95)] shadow-card backdrop-blur sm:rounded-[2rem] p-3 sm:p-6 md:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.1rem] bg-primary text-primary-foreground shadow-soft">
          <CalendarRange className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl leading-tight font-black text-foreground sm:text-2xl">{section.title}</h2>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {section.specialties.map((specialty) => (
          <section
            key={specialty.id}
            className="rounded-[1.5rem] border border-[rgba(var(--border),0.7)] bg-[rgba(var(--muted),0.2)] p-4 sm:p-5 md:p-6"
          >
            <h3 className="text-lg leading-tight font-black text-foreground sm:text-xl">{specialty.title}</h3>
            <div className="mt-4 grid gap-4">
              {specialty.programs.map((program) => (
                <ExamScheduleProgramCard key={program.id} program={program} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}

export function ScheduleLandingPageView({
  groupSections,
  teacherSections,
}: {
  groupSections: ScheduleDepartmentSection[]
  teacherSections: ScheduleTeacherSection[]
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--primary),0.2)] to-transparent" />
      <div className="absolute top-12 left-0 h-72 w-72 rounded-full bg-[rgba(var(--primary-glow),0.1)] blur-3xl" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[rgba(var(--accent-gold),0.1)] blur-3xl" />

      <div className="container relative mx-auto px-2 sm:px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">Групи</h1>
        </div>

        <div className="mt-10 grid gap-10">
          <div className="grid gap-6">
            {groupSections.map((section) => (
              <GroupDirectorySection key={section.id} section={section} />
            ))}
          </div>

          <div>
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">Викладачі</h1>
            </div>

            <div className="mt-6 grid gap-6">
              {teacherSections.map((section) => (
                <TeacherDirectorySection key={section.id} section={section} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function GroupScheduleDirectoryPageView({ sections }: { sections: ScheduleDepartmentSection[] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--primary),0.2)] to-transparent" />
      <div className="absolute top-12 left-0 h-72 w-72 rounded-full bg-[rgba(var(--primary-glow),0.1)] blur-3xl" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[rgba(var(--accent-gold),0.1)] blur-3xl" />

      <div className="container relative mx-auto px-0 sm:px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">Групи</h1>
        </div>

        <div className="mt-10 grid gap-6">
          {sections.map((section) => (
            <GroupDirectorySection key={section.id} section={section} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function TeacherScheduleDirectoryPageView({ sections }: { sections: ScheduleTeacherSection[] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--primary),0.2)] to-transparent" />
      <div className="absolute top-12 left-0 h-72 w-72 rounded-full bg-[rgba(var(--primary-glow),0.1)] blur-3xl" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[rgba(var(--accent-gold),0.1)] blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">Викладачі</h1>
        </div>

        <div className="mt-10 grid gap-6">
          {sections.map((section) => (
            <TeacherDirectorySection key={section.id} section={section} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function ExamSchedulePageView({ page }: { page: ExamSchedulePageViewModel }) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="container relative mx-auto sm:px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">{page.title}</h1>
        </div>

        {page.sections.length ? (
          <div className="mt-8 grid gap-6 md:gap-8">
            {page.sections.map((section) => (
              <ExamScheduleStudyFormCard key={section.id} section={section} />
            ))}
          </div>
        ) : (
          <article className="mt-8 rounded-[1.75rem] border border-dashed border-border bg-[rgba(255,255,255,0.9)] p-8 text-center shadow-soft">
            <h2 className="text-xl font-black text-foreground">Розклад екзаменів поки що не опублікований</h2>
          </article>
        )}
      </div>
    </section>
  )
}

export function EmbeddedSchedulePageView({ item }: { item: EmbeddedScheduleViewModel }) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--primary),0.2)] to-transparent" />
      <div className="absolute top-12 left-0 h-72 w-72 rounded-full bg-[rgba(var(--primary-glow),0.1)] blur-3xl" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[rgba(var(--accent-gold),0.1)] blur-3xl" />

      <div className="container relative mx-auto sm:px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">{item.title}</h1>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-[rgba(var(--border),0.7)] bg-white p-2 shadow-card sm:p-3 md:p-4">
          <iframe
            src={item.calendarUrl}
            title={item.title}
            className="h-[800px] w-full rounded-[1.5rem]"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
