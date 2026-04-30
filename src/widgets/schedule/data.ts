import { cache } from 'react'

import { executeGraphQLRaw } from '@/shared/api/graphql/client'
import { CACHE_TAGS, DEFAULT_REVALIDATE_SECONDS } from '@/shared/lib/site-config'

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

const DEPARTMENT_FARM_LAB = 'Фармацевтично-лабораторне відділення'
const DEPARTMENT_DISTANCE = 'Відділення заочної форми навчання'
const SPECIALTY_PHARMACY = 'Farmacziya_promislova_farmacziya_226'
const SPECIALTY_LAB = 'Tehnologiyi_medichnoyi_diagnostiki_ta_likuvannya_224'

const DEGREE_TITLES: Record<string, string> = {
  OPS_Fahovij_molodshij_bakalavr_na_bazi_9_klasiv: 'ОПС Фаховий молодший бакалавр (на базі 9 класів)',
  OPS_Fahovij_molodshij_bakalavr_na_bazi_11_klasiv: 'ОПС Фаховий молодший бакалавр (на базі 11 класів)',
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

    const courseDiff = parseCourseNumber(leftAttributes.course_number) - parseCourseNumber(rightAttributes.course_number)

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

const getAllTeacherSections = cache(async (): Promise<ScheduleTeacherSection[]> => {
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

    const teachers = (commission.attributes.workers?.data ?? []).flatMap((teacher) => {
      if (!teacher.id || !teacher.attributes?.slug) {
        return []
      }

      return [
        {
          id: teacher.id,
          label: formatTeacherLabel(teacher.attributes.name),
          href: `/rozklad/vikladach/${encodeURIComponent(teacher.attributes.slug)}`,
        },
      ]
    })

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
})

export const getGroupScheduleDirectory = cache(async (): Promise<ScheduleDepartmentSection[]> => {
  const groups = await getAllGroups()

  return DEPARTMENT_CONFIGS.flatMap((department) => {
    const departmentGroups = groups.filter(
      (group) => group.attributes?.vidilenya?.data?.attributes?.name === department.matchName,
    )

    const specialties = department.specialties.flatMap((specialty) => {
      const degrees = Object.entries(DEGREE_TITLES).flatMap(([degreeKey, degreeTitle]) => {
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
      })

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
})

export const getTeacherScheduleDirectory = cache(async () => getAllTeacherSections())

export const getScheduleLandingPageData = cache(async () => {
  const [groupSections, teacherSections] = await Promise.all([getGroupScheduleDirectory(), getTeacherScheduleDirectory()])

  return {
    groupSections,
    teacherSections,
  }
})

export const getGroupSchedulePageData = cache(async (groupName: string): Promise<EmbeddedScheduleViewModel | null> => {
  const response = await executeGraphQLRaw<GroupsResponse, { groupName: string }>(
    GROUP_BY_NAME_QUERY,
    { groupName },
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
})

export const getTeacherSchedulePageData = cache(async (teacherSlug: string): Promise<EmbeddedScheduleViewModel | null> => {
  const response = await executeGraphQLRaw<TeacherResponse, { teacherSlug: string }>(
    TEACHER_BY_SLUG_QUERY,
    { teacherSlug },
    {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.schedule, CACHE_TAGS.routes],
    },
  )

  const teacher = response.workers?.data[0]

  if (!teacher?.attributes?.calendar_id) {
    return null
  }

  return {
    title: teacher.attributes.name,
    subtitle: 'Актуальний Google Calendar розклад викладача.',
    calendarUrl: buildCalendarUrl(teacher.attributes.calendar_id),
  }
})
