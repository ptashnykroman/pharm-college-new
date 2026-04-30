import { CalendarDays, GraduationCap, School } from 'lucide-react'

import { AppButton } from '@/components/shared/app-button'
import type {
  EmbeddedScheduleViewModel,
  ScheduleDepartmentSection,
  ScheduleTeacherSection,
} from '@/widgets/schedule/data'

function GroupDirectorySection({ section }: { section: ScheduleDepartmentSection }) {
  return (
    <article className="rounded-[2rem] border border-border/70 bg-white p-6 shadow-card md:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.25rem] bg-primary text-primary-foreground shadow-soft">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-foreground">{section.title}</h2>
          {section.subtitle ? <p className="mt-2 text-sm text-foreground/70">{section.subtitle}</p> : null}
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {section.specialties.map((specialty) => (
          <div key={specialty.id} className="rounded-[1.5rem] border border-border/70 bg-muted/20 p-5">
            <h3 className="text-lg font-black text-foreground">{specialty.title}</h3>
            <div className="mt-4 grid gap-4">
              {specialty.degrees.map((degree) => (
                <div key={degree.id}>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">{degree.title}</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {degree.groups.map((group) => (
                      <AppButton key={group.id} href={group.href} variant="surface" shape="rounded">
                        {group.name}
                      </AppButton>
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
    <article className="rounded-[2rem] border border-border/70 bg-white p-6 shadow-card md:p-8">
      <h2 className="text-xl font-black text-foreground">{section.title}</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {section.teachers.map((teacher) => (
          <AppButton key={teacher.id} href={teacher.href} variant="surface" shape="rounded">
            {teacher.label}
          </AppButton>
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
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-primary-glow/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent-gold/10 blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-primary/15 bg-white/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-primary shadow-soft">
            Освітній процес
          </span>
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">Розклад</h1>
          <p className="mt-5 text-lg leading-8 text-foreground/75">
            Швидкий доступ до розкладу груп та викладачів у форматі Google Calendar.
          </p>
        </div>

        <div className="mt-10 grid gap-10">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-primary text-primary-foreground shadow-soft">
                <School className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Групи</h2>
                <p className="text-sm text-foreground/70">
                  Оберіть академічну групу для переходу до персонального розкладу.
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              {groupSections.map((section) => (
                <GroupDirectorySection key={section.id} section={section} />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-primary text-primary-foreground shadow-soft">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Викладачі</h2>
                <p className="text-sm text-foreground/70">
                  Кожен викладач має окремий маршрут із вбудованим календарем занять.
                </p>
              </div>
            </div>

            <div className="grid gap-6">
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
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-primary-glow/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent-gold/10 blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-primary/15 bg-white/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-primary shadow-soft">
            Розклад
          </span>
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
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-primary-glow/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent-gold/10 blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-primary/15 bg-white/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-primary shadow-soft">
            Розклад
          </span>
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

export function EmbeddedSchedulePageView({ item }: { item: EmbeddedScheduleViewModel }) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-primary-glow/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent-gold/10 blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">{item.title}</h1>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-border/70 bg-white p-3 shadow-card md:p-4">
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
