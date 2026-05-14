import { cache } from 'react'

import { executeGraphQLRaw } from '@/shared/api/graphql/client'
import {
  Enum_Examschedule_Educationaldegree,
  Enum_Examschedule_Formofstudy,
  Enum_Examschedule_Semester,
  Enum_Examschedule_Specialty,
} from '@/shared/api/graphql/generated'
import {
  CACHE_TAGS,
  DEFAULT_REVALIDATE_SECONDS,
} from '@/shared/lib/site-config'

type GroupNode = {
  id: string | null
  attributes: {
    name: string
    calendar_id: string | null
    specialty: string | null
    educationalDegree: string | null
    course_number: string | null
    vidilenya: {
      data: {
        attributes: {
          name: string
        } | null
      } | null
    } | null
  } | null
}

type TeacherNode = {
  id: string | null
  attributes: {
    name: string
    slug: string | null
    calendar_id?: string | null
  } | null
}

type CommissionNode = {
  id: string | null
  attributes: {
    name: string
    workers: {
      data: TeacherNode[]
    } | null
  } | null
}

type GroupsResponse = {
  groups: {
    data: GroupNode[]
  } | null
}

type TeachersResponse = {
  cycleCommissions: {
    data: CommissionNode[]
  } | null
}

type TeacherResponse = {
  workers: {
    data: TeacherNode[]
  } | null
}

type ExamScheduleNode = {
  id: string | null
  attributes: {
    educationalDegree: Enum_Examschedule_Educationaldegree
    formOfStudy: Enum_Examschedule_Formofstudy
    link: string
    semester: Enum_Examschedule_Semester
    specialty: Enum_Examschedule_Specialty
  } | null
}

type ExamSchedulesResponse = {
  examSchedules: {
    data: ExamScheduleNode[]
    meta: {
      pagination: {
        pageCount: number
      }
    }
  } | null
}

export type ScheduleGroupLink = {
  id: string
  name: string
  href: string
}

export type ScheduleDegreeSection = {
  id: string
  title: string
  groups: ScheduleGroupLink[]
}

export type ScheduleSpecialtySection = {
  id: string
  title: string
  degrees: ScheduleDegreeSection[]
}

export type ScheduleDepartmentSection = {
  id: string
  title: string
  subtitle?: string
  specialties: ScheduleSpecialtySection[]
}

export type ScheduleTeacherLink = {
  id: string
  label: string
  href: string
}

export type ScheduleTeacherSection = {
  id: string
  title: string
  teachers: ScheduleTeacherLink[]
}

export type EmbeddedScheduleViewModel = {
  title: string
  subtitle: string
  calendarUrl: string
}

export type ExamScheduleLink = {
  id: string
  href: string
  label: string
}

export type ExamScheduleProgramSection = {
  id: string
  title: string
  items: ExamScheduleLink[]
}

export type ExamScheduleSpecialtySection = {
  id: string
  title: string
  programs: ExamScheduleProgramSection[]
}

export type ExamScheduleStudyFormSection = {
  id: string
  title: string
  specialties: ExamScheduleSpecialtySection[]
}

export type ExamSchedulePageViewModel = {
  title: string
  subtitle: string
  sections: ExamScheduleStudyFormSection[]
}

const ALL_GROUPS_QUERY = `
  query GetScheduleGroups {
    groups(sort: "name:asc", pagination: { pageSize: 500 }) {
      data {
        id
        attributes {
          name
          calendar_id
          specialty
          educationalDegree
          course_number
          vidilenya {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`

const ALL_TEACHERS_QUERY = `
  query GetScheduleTeachers {
    cycleCommissions(pagination: { pageSize: 100 }, sort: "name:asc") {
      data {
        id
        attributes {
          name
          workers(
            filters: { category: { in: ["teacher"] } }
            sort: "name:asc"
            pagination: { pageSize: 200 }
          ) {
            data {
              id
              attributes {
                name
                slug
                calendar_id
              }
            }
          }
        }
      }
    }
  }
`

const GROUP_BY_NAME_QUERY = `
  query GetGroupSchedule($groupName: String!) {
    groups(filters: { name: { eq: $groupName } }, pagination: { pageSize: 1 }) {
      data {
        id
        attributes {
          name
          calendar_id
        }
      }
    }
  }
`

const TEACHER_BY_SLUG_QUERY = `
  query GetTeacherSchedule($teacherSlug: String!) {
    workers(
      filters: { category: { in: ["teacher"] }, slug: { eq: $teacherSlug } }
      pagination: { pageSize: 1 }
    ) {
      data {
        id
        attributes {
          name
          slug
          calendar_id
        }
      }
    }
  }
`

const EXAM_SCHEDULES_PAGE_SIZE = 100

const EXAM_SCHEDULES_QUERY = `
  query GetExamSchedulesPage($page: Int!, $pageSize: Int!) {
    examSchedules(
      sort: ["formOfStudy:asc", "specialty:asc", "educationalDegree:asc", "semester:asc"]
      pagination: { page: $page, pageSize: $pageSize }
    ) {
      meta {
        pagination {
          pageCount
        }
      }
      data {
        id
        attributes {
          educationalDegree
          formOfStudy
          link
          semester
          specialty
        }
      }
    }
  }
`

const DEPARTMENT_FARM_LAB = 'Фармацевтично-лабораторне відділення'
const DEPARTMENT_DISTANCE = 'Відділення заочної форми навчання'
const SPECIALTY_PHARMACY = 'Farmacziya_promislova_farmacziya_226'
const SPECIALTY_LAB = 'Tehnologiyi_medichnoyi_diagnostiki_ta_likuvannya_224'

const EXAM_SCHEDULE_SEMESTER_TITLES: Record<
  Enum_Examschedule_Semester,
  string
> = {
  [Enum_Examschedule_Semester.Semestr_1]: 'I семестр',
  [Enum_Examschedule_Semester.Semestr_2]: 'II семестр',
  [Enum_Examschedule_Semester.Semestr_3]: 'III семестр',
  [Enum_Examschedule_Semester.Semestr_4]: 'IV семестр',
  [Enum_Examschedule_Semester.Semestr_5]: 'V семестр',
  [Enum_Examschedule_Semester.Semestr_6]: 'VI семестр',
  [Enum_Examschedule_Semester.PershePivrichchya]: 'Перше півріччя',
  [Enum_Examschedule_Semester.DrugePivrichchya]: 'Друге півріччя',
}

const EXAM_SCHEDULE_SEMESTER_ORDER: Record<
  Enum_Examschedule_Semester,
  number
> = {
  [Enum_Examschedule_Semester.Semestr_1]: 1,
  [Enum_Examschedule_Semester.Semestr_2]: 2,
  [Enum_Examschedule_Semester.Semestr_3]: 3,
  [Enum_Examschedule_Semester.Semestr_4]: 4,
  [Enum_Examschedule_Semester.Semestr_5]: 5,
  [Enum_Examschedule_Semester.Semestr_6]: 6,
  [Enum_Examschedule_Semester.PershePivrichchya]: 7,
  [Enum_Examschedule_Semester.DrugePivrichchya]: 8,
}

const DEGREE_TITLES: Record<string, string> = {
  OPS_Fahovij_molodshij_bakalavr_na_bazi_9_klasiv:
    'ОПС Фаховий молодший бакалавр (на базі 9 класів)',
  OPS_Fahovij_molodshij_bakalavr_na_bazi_11_klasiv:
    'ОПС Фаховий молодший бакалавр (на базі 11 класів)',
  OR_pershij_bakalavrskij: 'ОР перший (бакалаврський)',
}

const DEPARTMENT_CONFIGS = [
  {
    id: 'farm-lab',
    title: 'Фармацевтично-лабораторне відділення',
    matchName: DEPARTMENT_FARM_LAB,
    specialties: [
      {
        id: 'pharmacy',
        title: '226 Фармація, промислова фармація',
        specialtyKey: SPECIALTY_PHARMACY,
      },
      {
        id: 'laboratory-diagnostics',
        title: '224 Технології медичної діагностики та лікування',
        specialtyKey: SPECIALTY_LAB,
      },
    ],
  },
  {
    id: 'distance',
    title: 'Відділення заочної форми навчання',
    matchName: DEPARTMENT_DISTANCE,
    specialties: [
      {
        id: 'distance-pharmacy',
        title: '226 Фармація, промислова фармація',
        specialtyKey: SPECIALTY_PHARMACY,
      },
    ],
  },
] as const

const EXAM_SCHEDULE_CONFIGS = [
  {
    id: 'denna',
    title: 'Денна форма навчання',
    formOfStudy: Enum_Examschedule_Formofstudy.Denna,
    specialties: [
      {
        id: 'denna-pharmacy',
        title: 'Спеціальність 226 Фармація, промислова фармація',
        specialty: Enum_Examschedule_Specialty.FarmacziyaPromislovaFarmacziya_226,
        programs: [
          {
            id: 'denna-pharmacy-2020-ops',
            title: 'ОПП "Фармація" 2020 ОПС фаховий молодший бакалавр',
            educationalDegree:
              Enum_Examschedule_Educationaldegree.OppFarmacziyaOpsFahovijMolodshijBakalavr_2020,
          },
          {
            id: 'denna-pharmacy-2023-fmb',
            title: 'ОПП "Фармація" фаховий молодший бакалавр',
            educationalDegree:
              Enum_Examschedule_Educationaldegree.OppFarmacziyaFahovijMolodshijBakalavr_2023,
          },
          {
            id: 'denna-pharmacy-2020-bachelor',
            title: 'ОПП "Фармація" 2020 першого (бакалаврського) рівня ВО',
            educationalDegree:
              Enum_Examschedule_Educationaldegree.OppFarmacziyaPershogoBakalavrskogoRivnyaVo_2020,
          },
        ],
      },
      {
        id: 'denna-laboratory',
        title:
          'Спеціальність 224 Технології медичної діагностики та лікування',
        specialty:
          Enum_Examschedule_Specialty.TehnologiyiMedichnoyiDiagnostikiTaLikuvannya_224,
        programs: [
          {
            id: 'denna-laboratory-2020-ops',
            title: 'ОПП "Лабораторна діагностика" фаховий молодший бакалавр',
            educationalDegree:
              Enum_Examschedule_Educationaldegree.OppLaboratornaDiagnostikaOpsFahovijMolodshijBakalavr_2020,
          },
          {
            id: 'denna-laboratory-2023-ops',
            title:
              'ОПП "Лабораторна діагностика" 2023 ОПС фаховий молодший бакалавр',
            educationalDegree:
              Enum_Examschedule_Educationaldegree.OppLaboratornaDiagnostikaOpsFahovijMolodshijBakalavr_2023,
          },
        ],
      },
    ],
  },
  {
    id: 'zaochna',
    title: 'Заочна форма навчання',
    formOfStudy: Enum_Examschedule_Formofstudy.Zaochna,
    specialties: [
      {
        id: 'zaochna-pharmacy',
        title: 'Спеціальність 226 Фармація, промислова фармація',
        specialty: Enum_Examschedule_Specialty.FarmacziyaPromislovaFarmacziya_226,
        programs: [
          {
            id: 'zaochna-pharmacy-2023-fmb',
            title: 'ОПП "Фармація" 2023 ОПС фаховий молодший бакалавр',
            educationalDegree:
              Enum_Examschedule_Educationaldegree.OppFarmacziyaFahovijMolodshijBakalavr_2023,
          },
        ],
      },
    ],
  },
] as const

function buildCalendarUrl(calendarId: string) {
  return `https://calendar.google.com/calendar/embed?showTitle=0&showTz=0&mode=AGENDA&height=600&wkst=2&hl=uk_UA&bgcolor=%23FFFFFF&src=${encodeURIComponent(calendarId)}&ctz=Europe%2FKiev`
}

function parseCourseNumber(value: string | null | undefined) {
  if (!value) {
    return Number.MAX_SAFE_INTEGER
  }

  return Number.parseInt(value.replace('kurs_', ''), 10)
}

function sortGroups(groups: GroupNode[]) {
  return [...groups].sort((left, right) => {
    const leftAttributes = left.attributes
    const rightAttributes = right.attributes

    if (!leftAttributes || !rightAttributes) {
      return 0
    }

    const courseDiff =
      parseCourseNumber(leftAttributes.course_number) -
      parseCourseNumber(rightAttributes.course_number)

    if (courseDiff !== 0) {
      return courseDiff
    }

    return leftAttributes.name.localeCompare(rightAttributes.name, 'uk')
  })
}

function formatTeacherLabel(name: string) {
  const parts = name.split(' ').filter(Boolean)

  if (parts.length < 3) {
    return name
  }

  return `${parts[0]} ${parts[1][0] ?? ''}.${parts[2][0] ?? ''}.`
}

function sortExamScheduleItems(items: ExamScheduleNode[]) {
  return [...items].sort((left, right) => {
    const leftSemester =
      left.attributes?.semester &&
      EXAM_SCHEDULE_SEMESTER_ORDER[left.attributes.semester]
    const rightSemester =
      right.attributes?.semester &&
      EXAM_SCHEDULE_SEMESTER_ORDER[right.attributes.semester]

    if ((leftSemester ?? 0) !== (rightSemester ?? 0)) {
      return (leftSemester ?? 0) - (rightSemester ?? 0)
    }

    return (left.attributes?.link ?? '').localeCompare(
      right.attributes?.link ?? '',
      'uk',
    )
  })
}

export function decodeScheduleRouteParam(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

const getAllGroups = cache(async () => {
  const response = await executeGraphQLRaw<GroupsResponse>(
    ALL_GROUPS_QUERY,
    {},
    {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.schedule, CACHE_TAGS.routes],
    },
  )

  return response.groups?.data ?? []
})

const getAllExamSchedules = cache(async (): Promise<ExamScheduleNode[]> => {
  const options = {
    revalidate: DEFAULT_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.schedule, CACHE_TAGS.routes],
  }

  const firstPage = await executeGraphQLRaw<
    ExamSchedulesResponse,
    { page: number; pageSize: number }
  >(
    EXAM_SCHEDULES_QUERY,
    {
      page: 1,
      pageSize: EXAM_SCHEDULES_PAGE_SIZE,
    },
    options,
  )

  const firstCollection = firstPage.examSchedules

  if (!firstCollection) {
    return []
  }

  const totalPages = firstCollection.meta.pagination.pageCount

  if (totalPages <= 1) {
    return firstCollection.data
  }

  const remainingPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, index) =>
      executeGraphQLRaw<ExamSchedulesResponse, { page: number; pageSize: number }>(
        EXAM_SCHEDULES_QUERY,
        {
          page: index + 2,
          pageSize: EXAM_SCHEDULES_PAGE_SIZE,
        },
        options,
      ),
    ),
  )

  return [
    ...firstCollection.data,
    ...remainingPages.flatMap((page) => page.examSchedules?.data ?? []),
  ]
})

const getAllTeacherSections = cache(
  async (): Promise<ScheduleTeacherSection[]> => {
    const response = await executeGraphQLRaw<TeachersResponse>(
      ALL_TEACHERS_QUERY,
      {},
      {
        revalidate: DEFAULT_REVALIDATE_SECONDS,
        tags: [CACHE_TAGS.schedule, CACHE_TAGS.routes],
      },
    )

    return (response.cycleCommissions?.data ?? []).flatMap((commission) => {
      if (!commission.id || !commission.attributes) {
        return []
      }

      const teachers = (commission.attributes.workers?.data ?? []).flatMap(
        (teacher) => {
          if (!teacher.id || !teacher.attributes?.slug) {
            return []
          }

          if (!teacher.attributes.calendar_id) {
            return []
          }

          return [
            {
              id: teacher.id,
              label: formatTeacherLabel(teacher.attributes.name),
              href: `/rozklad/vikladach/${encodeURIComponent(teacher.attributes.slug)}`,
            },
          ]
        },
      )

      if (!teachers.length) {
        return []
      }

      return [
        {
          id: commission.id,
          title: commission.attributes.name,
          teachers,
        },
      ]
    })
  },
)

export const getGroupScheduleDirectory = cache(
  async (): Promise<ScheduleDepartmentSection[]> => {
    const groups = await getAllGroups()

    return DEPARTMENT_CONFIGS.flatMap((department) => {
      const departmentGroups = groups.filter(
        (group) =>
          group.attributes?.vidilenya?.data?.attributes?.name ===
          department.matchName,
      )

      const specialties = department.specialties.flatMap((specialty) => {
        const degrees = Object.entries(DEGREE_TITLES).flatMap(
          ([degreeKey, degreeTitle]) => {
            const degreeGroups = sortGroups(
              departmentGroups.filter(
                (group) =>
                  group.attributes?.specialty === specialty.specialtyKey &&
                  group.attributes?.educationalDegree === degreeKey &&
                  Boolean(group.attributes?.name),
              ),
            ).flatMap((group) => {
              if (!group.id || !group.attributes?.name) {
                return []
              }

              return [
                {
                  id: group.id,
                  name: group.attributes.name,
                  href: `/rozklad/grupa/${encodeURIComponent(group.attributes.name)}`,
                },
              ]
            })

            if (!degreeGroups.length) {
              return []
            }

            return [
              {
                id: `${specialty.id}-${degreeKey}`,
                title: degreeTitle,
                groups: degreeGroups,
              },
            ]
          },
        )

        if (!degrees.length) {
          return []
        }

        return [
          {
            id: specialty.id,
            title: specialty.title,
            degrees,
          },
        ]
      })

      if (!specialties.length) {
        return []
      }

      return [
        {
          id: department.id,
          title: department.title,
          specialties,
        },
      ]
    })
  },
)

export const getTeacherScheduleDirectory = cache(async () =>
  getAllTeacherSections(),
)

export const getExamSchedulePageData = cache(
  async (): Promise<ExamSchedulePageViewModel> => {
    const examSchedules = await getAllExamSchedules()

    const sections = EXAM_SCHEDULE_CONFIGS.flatMap((studyForm) => {
      const specialties = studyForm.specialties.flatMap((specialty) => {
        const programs = specialty.programs.flatMap((program) => {
          const items = sortExamScheduleItems(
            examSchedules.filter(
              (scheduleItem) =>
                scheduleItem.attributes?.formOfStudy === studyForm.formOfStudy &&
                scheduleItem.attributes?.specialty === specialty.specialty &&
                scheduleItem.attributes?.educationalDegree ===
                  program.educationalDegree &&
                Boolean(scheduleItem.id) &&
                Boolean(scheduleItem.attributes?.link),
            ),
          ).flatMap((scheduleItem) => {
            if (!scheduleItem.id || !scheduleItem.attributes?.link) {
              return []
            }

            return [
              {
                id: scheduleItem.id,
                href: scheduleItem.attributes.link,
                label:
                  EXAM_SCHEDULE_SEMESTER_TITLES[
                    scheduleItem.attributes.semester
                  ],
              },
            ]
          })

          if (!items.length) {
            return []
          }

          return [
            {
              id: program.id,
              title: program.title,
              items,
            },
          ]
        })

        if (!programs.length) {
          return []
        }

        return [
          {
            id: specialty.id,
            title: specialty.title,
            programs,
          },
        ]
      })

      if (!specialties.length) {
        return []
      }

      return [
        {
          id: studyForm.id,
          title: studyForm.title,
          specialties,
        },
      ]
    })

    return {
      title: 'Розклад екзаменів',
      subtitle:
        'Актуальні посилання на екзаменаційні розклади для денної та заочної форм навчання.',
      sections,
    }
  },
)

export const getScheduleLandingPageData = cache(async () => {
  const [groupSections, teacherSections] = await Promise.all([
    getGroupScheduleDirectory(),
    getTeacherScheduleDirectory(),
  ])

  return {
    groupSections,
    teacherSections,
  }
})

export async function getGroupScheduleStaticParams() {
  const groups = await getAllGroups()
  const groupNames = new Set<string>()

  groups.forEach((group) => {
    if (group.attributes?.name && group.attributes.calendar_id) {
      groupNames.add(group.attributes.name)
    }
  })

  return Array.from(groupNames)
    .sort((left, right) => left.localeCompare(right, 'uk'))
    .map((groupName) => ({ groupName }))
}

export async function getTeacherScheduleStaticParams() {
  const sections = await getAllTeacherSections()
  const teacherSlugs = new Set<string>()

  sections.forEach((section) => {
    section.teachers.forEach((teacher) => {
      const slug = teacher.href.split('/').filter(Boolean).at(-1)

      if (slug) {
        teacherSlugs.add(decodeScheduleRouteParam(slug))
      }
    })
  })

  return Array.from(teacherSlugs)
    .sort((left, right) => left.localeCompare(right, 'uk'))
    .map((teacherSlug) => ({ teacherSlug }))
}

export const getGroupSchedulePageData = cache(
  async (groupName: string): Promise<EmbeddedScheduleViewModel | null> => {
    const decodedGroupName = decodeScheduleRouteParam(groupName)
    const response = await executeGraphQLRaw<GroupsResponse, { groupName: string }>(
      GROUP_BY_NAME_QUERY,
      { groupName: decodedGroupName },
      {
        revalidate: DEFAULT_REVALIDATE_SECONDS,
        tags: [CACHE_TAGS.schedule, CACHE_TAGS.routes],
      },
    )

    const group = response.groups?.data[0]

    if (!group?.attributes?.calendar_id) {
      return null
    }

    return {
      title: `Розклад групи ${group.attributes.name}`,
      subtitle: 'Актуальний Google Calendar розклад для академічної групи.',
      calendarUrl: buildCalendarUrl(group.attributes.calendar_id),
    }
  },
)

export const getTeacherSchedulePageData = cache(
  async (teacherSlug: string): Promise<EmbeddedScheduleViewModel | null> => {
    const response = await executeGraphQLRaw<
      TeacherResponse,
      { teacherSlug: string }
    >(TEACHER_BY_SLUG_QUERY, { teacherSlug }, {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.schedule, CACHE_TAGS.routes],
    })

    const teacher = response.workers?.data[0]

    if (!teacher?.attributes?.calendar_id) {
      return null
    }

    return {
      title: teacher.attributes.name,
      subtitle: 'Актуальний Google Calendar розклад викладача.',
      calendarUrl: buildCalendarUrl(teacher.attributes.calendar_id),
    }
  },
)
