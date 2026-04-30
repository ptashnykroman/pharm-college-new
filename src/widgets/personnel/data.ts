import { cache } from 'react'

import { executeGraphQLRaw } from '@/shared/api/graphql/client'
import { resolveImage } from '@/shared/lib/media'
import { stripHtml } from '@/shared/lib/rich-text'
import { CACHE_TAGS, DEFAULT_REVALIDATE_SECONDS } from '@/shared/lib/site-config'
import type {
  AdministrationCardViewModel,
  CommissionOption,
  TeacherCardViewModel,
  TeacherProfileViewModel,
} from '@/widgets/personnel/model'

type MediaAttributes = {
  name?: string | null
  url?: string | null
  width?: number | null
  height?: number | null
  alternativeText?: string | null
  formats?: unknown
}

type MediaResponse = {
  data: {
    attributes: MediaAttributes | null
  } | null
} | null

type LessonNode = {
  id: string | null
  attributes: {
    name: string
  } | null
}

type CommissionNode = {
  id: string | null
  attributes: {
    name: string
    slug: string | null
  } | null
}

type WorkerNode = {
  id: string | null
  attributes: {
    name: string
    photo: MediaResponse
    email: string | null
    phone: string | null
    position: string | null
    status?: string | null
    additional_information?: string | null
    printed_works?: string | null
    calendar_id?: string | null
    slug: string | null
    lessons: {
      data: LessonNode[]
    } | null
    cycle_commission: {
      data: CommissionNode | null
    } | null
  } | null
}

type WorkerAttributes = NonNullable<WorkerNode['attributes']>

type AdministrationResponse = {
  workers: {
    data: WorkerNode[]
  } | null
}

type TeacherDirectoryResponse = {
  workers: {
    data: WorkerNode[]
  } | null
  cycleCommissions: {
    data: CommissionNode[]
  } | null
}

type TeacherProfileResponse = {
  workers: {
    data: WorkerNode[]
  } | null
}

const ADMINISTRATION_QUERY = `
  query GetAdministrationDirectory {
    workers(
      filters: { is_administration: { eq: true } }
      sort: ["weight:desc", "name:asc"]
      pagination: { pageSize: 200 }
    ) {
      data {
        id
        attributes {
          name
          photo {
            data {
              attributes {
                name
                url
                width
                height
                alternativeText
                formats
              }
            }
          }
          email
          phone
          position
        }
      }
    }
  }
`

const TEACHER_DIRECTORY_QUERY = `
  query GetTeacherDirectory {
    cycleCommissions(sort: "name:asc", pagination: { pageSize: 100 }) {
      data {
        id
        attributes {
          name
          slug
        }
      }
    }
    workers(
      filters: { category: { in: ["teacher"] } }
      sort: "name:asc"
      pagination: { pageSize: 500 }
    ) {
      data {
        id
        attributes {
          name
          photo {
            data {
              attributes {
                name
                url
                width
                height
                alternativeText
                formats
              }
            }
          }
          slug
          lessons {
            data {
              id
              attributes {
                name
              }
            }
          }
          cycle_commission {
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

const TEACHER_PROFILE_QUERY = `
  query GetTeacherProfile($teacherSlug: String!) {
    workers(
      filters: { category: { in: ["teacher"] }, slug: { eq: $teacherSlug } }
      pagination: { pageSize: 1 }
    ) {
      data {
        id
        attributes {
          name
          photo {
            data {
              attributes {
                name
                url
                width
                height
                alternativeText
                formats
              }
            }
          }
          email
          phone
          position
          status
          additional_information
          printed_works
          calendar_id
          slug
          lessons {
            data {
              id
              attributes {
                name
              }
            }
          }
          cycle_commission {
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

function mapCommissionOption(item: CommissionNode | null | undefined): CommissionOption | null {
  if (!item?.id || !item.attributes?.slug) {
    return null
  }

  return {
    id: item.id,
    name: item.attributes.name,
    slug: item.attributes.slug,
  }
}

function mapSubjects(lessons: WorkerAttributes['lessons']) {
  return (lessons?.data ?? []).flatMap((lesson) => (lesson.attributes?.name ? [lesson.attributes.name] : []))
}

function mapAdministrationCard(item: WorkerNode): AdministrationCardViewModel | null {
  if (!item.id || !item.attributes) {
    return null
  }

  return {
    id: item.id,
    name: item.attributes.name,
    position: item.attributes.position,
    phone: item.attributes.phone,
    email: item.attributes.email,
    photo: resolveImage(item.attributes.photo, 'card', item.attributes.name),
  }
}

function mapTeacherCard(item: WorkerNode): TeacherCardViewModel | null {
  if (!item.id || !item.attributes?.slug) {
    return null
  }

  const cycleCommission = mapCommissionOption(item.attributes.cycle_commission?.data ?? null)

  if (!cycleCommission) {
    return null
  }

  return {
    id: item.id,
    name: item.attributes.name,
    href: `/structure/cmks/${cycleCommission.slug}/${item.attributes.slug}`,
    photo: resolveImage(item.attributes.photo, 'card', item.attributes.name),
    cycleCommission,
    subjects: mapSubjects(item.attributes.lessons),
  }
}

function mapTeacherProfile(item: WorkerNode): TeacherProfileViewModel | null {
  if (!item.id || !item.attributes?.slug) {
    return null
  }

  const cycleCommission = mapCommissionOption(item.attributes.cycle_commission?.data ?? null)

  if (!cycleCommission) {
    return null
  }

  return {
    id: item.id,
    name: item.attributes.name,
    slug: item.attributes.slug,
    photo: resolveImage(item.attributes.photo, 'card', item.attributes.name),
    email: item.attributes.email,
    phone: item.attributes.phone,
    position: item.attributes.position ?? null,
    status: item.attributes.status ?? null,
    additionalInformation: item.attributes.additional_information ?? null,
    printedWorks: item.attributes.printed_works ?? null,
    calendarId: item.attributes.calendar_id ?? null,
    cycleCommission,
    subjects: mapSubjects(item.attributes.lessons),
  }
}

export const getAdministrationPageData = cache(async () => {
  const response = await executeGraphQLRaw<AdministrationResponse>(
    ADMINISTRATION_QUERY,
    {},
    {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.personnel, CACHE_TAGS.routes],
    },
  )

  return (response.workers?.data ?? [])
    .map(mapAdministrationCard)
    .filter((item): item is AdministrationCardViewModel => Boolean(item))
})

export const getTeacherDirectoryPageData = cache(async () => {
  const response = await executeGraphQLRaw<TeacherDirectoryResponse>(
    TEACHER_DIRECTORY_QUERY,
    {},
    {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.personnel, CACHE_TAGS.routes],
    },
  )

  return {
    commissions: (response.cycleCommissions?.data ?? [])
      .map(mapCommissionOption)
      .filter((item): item is CommissionOption => Boolean(item)),
    teachers: (response.workers?.data ?? [])
      .map(mapTeacherCard)
      .filter((item): item is TeacherCardViewModel => Boolean(item)),
  }
})

const getTeacherProfileBySlug = cache(async (teacherSlug: string) => {
  const response = await executeGraphQLRaw<TeacherProfileResponse>(
    TEACHER_PROFILE_QUERY,
    {
      teacherSlug,
    },
    {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.personnel, CACHE_TAGS.routes],
    },
  )

  const worker = response.workers?.data[0]

  return worker ? mapTeacherProfile(worker) : null
})

export async function getTeacherProfilePageData(cmkSlug: string, teacherSlug: string) {
  const teacher = await getTeacherProfileBySlug(teacherSlug)

  if (!teacher || teacher.cycleCommission.slug !== cmkSlug) {
    return null
  }

  return teacher
}

export async function getTeacherProfileMetadata(cmkSlug: string, teacherSlug: string) {
  const teacher = await getTeacherProfilePageData(cmkSlug, teacherSlug)

  if (!teacher) {
    return null
  }

  const fallbackDescription = teacher.subjects.length
    ? `Викладає: ${teacher.subjects.join(', ')}.`
    : teacher.position || teacher.status || 'Персональна сторінка викладача.'

  return {
    title: teacher.name,
    description: stripHtml(teacher.additionalInformation) || fallbackDescription,
    pathname: `/structure/cmks/${teacher.cycleCommission.slug}/${teacher.slug}`,
    image: teacher.photo?.src ?? null,
  }
}
