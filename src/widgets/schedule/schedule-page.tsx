import { CalendarDays, GraduationCap, School } from "lucide-react";

import { AppButton } from "@/components/shared/app-button";
import type {
  EmbeddedScheduleViewModel,
  ScheduleDepartmentSection,
  ScheduleTeacherSection,
} from "@/widgets/schedule/data";
import { SmartLink } from "../navigation/smart-link";

function GroupDirectorySection({
  section,
}: {
  section: ScheduleDepartmentSection;
}) {
  return (
    <article className="rounded-[1.5rem] sm:rounded-[2rem] border border-border/70 bg-white shadow-card px-2 py-6 sm:p-6 md:p-8">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex h-10 sm:h-12 w-10 sm:w-12 shrink-0 items-center justify-center rounded-[1.25rem] bg-primary text-primary-foreground shadow-soft">
          <GraduationCap className="h-4 sm:h-5 w-4 sm:w-5" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-foreground leading-tight">
            {section.title}
          </h2>
          {section.subtitle ? (
            <p className="mt-0.5 text-xs sm:text-sm md:text-md text-foreground/70">
              {section.subtitle}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {section.specialties.map((specialty) => (
          <div
            key={specialty.id}
            className="rounded-[1.5rem] border border-border/70 bg-muted/20 px-3 py-5 sm:p-5"
          >
            <h3 className="text-base sm:text-lg font-black text-foreground leading-tight">
              {specialty.title}
            </h3>
            <div className="mt-4 grid gap-4">
              {specialty.degrees.map((degree) => (
                <div key={degree.id}>
                  <p className="text-sm font-bold text-primary">
                    {degree.title}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
                    {degree.groups.map((group) => (
                      <SmartLink
                        key={group.id}
                        className="rounded-[0.75rem] shadow-soft border border-primary/30 bg-white py-1 px-3 text-sm sm:text-md font-semibold text-foreground hover:bg-accent hover:text-primary"
                        href={group.href}
                      >
                        {group.name}
                      </SmartLink>
                    ))}
                    {/* {degree.groups.map((group) => (
                      <AppButton
                        key={group.id}
                        href={group.href}
                        variant="surface"
                        shape="rounded"
                      >
                        {group.name}
                      </AppButton>
                    ))} */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function TeacherDirectorySection({
  section,
}: {
  section: ScheduleTeacherSection;
}) {
  return (
    <article className="rounded-[1.5rem] sm:rounded-[2rem] border border-border/70 bg-white shadow-card p-4 sm:p-6 md:p-8">
      <h2 className="text-base sm:text-xl font-black text-foreground">
        {section.title}
      </h2>
      <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
        {section.teachers.map((teacher) => (
          <SmartLink
            key={teacher.id}
            className="rounded-[0.75rem] shadow-soft border border-primary/30 bg-white py-1 px-3 text-sm sm:text-md font-semibold text-foreground hover:bg-accent hover:text-primary"
            href={teacher.href}
          >
            {teacher.label}
          </SmartLink>
        ))}
        {/* {section.teachers.map((teacher) => (
          <AppButton
            key={teacher.id}
            href={teacher.href}
            variant="surface"
            shape="rounded"
          >
            {teacher.label}
          </AppButton>
        ))} */}
      </div>
    </article>
  );
}

export function ScheduleLandingPageView({
  groupSections,
  teacherSections,
}: {
  groupSections: ScheduleDepartmentSection[];
  teacherSections: ScheduleTeacherSection[];
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-primary-glow/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent-gold/10 blur-3xl" />

      <div className="container relative mx-auto px-2 sm:px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">
            Групи
          </h1>
        </div>

        <div className="mt-10 grid gap-10">
          <div>
            {/* <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-primary text-primary-foreground shadow-soft">
                <School className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Групи</h2>
              </div>
            </div> */}

            <div className="grid gap-6">
              {groupSections.map((section) => (
                <GroupDirectorySection key={section.id} section={section} />
              ))}
            </div>
          </div>

          <div>
            {/* <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-primary text-primary-foreground shadow-soft">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">
                  Викладачі
                </h2>
              </div>
            </div> */}
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">
                Викладачі
              </h1>
            </div>

            <div className="grid mt-6 gap-6">
              {teacherSections.map((section) => (
                <TeacherDirectorySection key={section.id} section={section} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GroupScheduleDirectoryPageView({
  sections,
}: {
  sections: ScheduleDepartmentSection[];
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-primary-glow/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent-gold/10 blur-3xl" />

      <div className="container relative mx-auto px-0 sm:px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">
            Групи
          </h1>
        </div>

        <div className="mt-10 grid gap-6">
          {sections.map((section) => (
            <GroupDirectorySection key={section.id} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeacherScheduleDirectoryPageView({
  sections,
}: {
  sections: ScheduleTeacherSection[];
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-primary-glow/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent-gold/10 blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">
            Викладачі
          </h1>
        </div>

        <div className="mt-10 grid gap-6">
          {sections.map((section) => (
            <TeacherDirectorySection key={section.id} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function EmbeddedSchedulePageView({
  item,
}: {
  item: EmbeddedScheduleViewModel;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-primary-glow/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent-gold/10 blur-3xl" />

      <div className="container relative mx-auto sm:px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">
            {item.title}
          </h1>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-border/70 bg-white p-2 sm:p-3 shadow-card md:p-4">
          <iframe
            src={item.calendarUrl}
            title={item.title}
            className="h-[800px] w-full rounded-[1.5rem]"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
