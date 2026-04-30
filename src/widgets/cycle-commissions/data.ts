import { cache } from 'react'

import type {
  ComponentPagesSeo,
  CycleCommissionLeftSidebarDynamicZone,
  CycleCommissionPageComponentsDynamicZone,
  CycleCommissionRightSidebarDynamicZone,
  Enum_Cyclecommission_Layout,
} from '@/shared/api/graphql/generated'
import { executeGraphQLRaw } from '@/shared/api/graphql/client'
import { resolveImage } from '@/shared/lib/media'
import { CACHE_TAGS, DEFAULT_REVALIDATE_SECONDS } from '@/shared/lib/site-config'
import {
  filterCycleCommissionBlocks,
  type CycleCommissionCardViewModel,
  type CycleCommissionPageViewModel,
  type CycleCommissionTeacherViewModel,
} from '@/widgets/cycle-commissions/model'

type MediaAttributes = {
  name?: string | null
  url?: string | null
  width?: number | null
  height?: number | null
  alternativeText?: string | null
  formats?: unknown
}

type MediaListItem = {
  id: string | null
  attributes: MediaAttributes | null
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

type WorkerNode = {
  id: string | null
  attributes: {
    name: string
    slug: string | null
    photo: MediaResponse
    lessons: {
      data: LessonNode[]
    } | null
    email: string | null
    phone: string | null
    position: string | null
  } | null
}

type CycleCommissionListNode = {
  id: string | null
  attributes: {
    name: string
    slug: string | null
    main_photo: {
      data: MediaListItem[]
    }
  } | null
}

type CycleCommissionDetailNode = {
  id: string | null
  attributes: {
    name: string
    slug: string | null
    layout: Enum_Cyclecommission_Layout
    page_url: string
    SEO: ComponentPagesSeo | null
    main_photo: {
      data: MediaListItem[]
    }
    headOfCommission: {
      data: WorkerNode | null
    } | null
    page_components: readonly (CycleCommissionPageComponentsDynamicZone | null)[] | null
    right_sidebar: readonly (CycleCommissionRightSidebarDynamicZone | null)[] | null
    left_sidebar: readonly (CycleCommissionLeftSidebarDynamicZone | null)[] | null
    workers: {
      data: WorkerNode[]
    } | null
  } | null
}

type CycleCommissionListResponse = {
  cycleCommissions: {
    data: CycleCommissionListNode[]
  } | null
}

type CycleCommissionDetailResponse = {
  cycleCommissions: {
    data: CycleCommissionDetailNode[]
  } | null
}

const CYCLE_COMMISSION_LIST_QUERY = `
  query GetCycleCommissionCards {
    cycleCommissions(sort: "name:asc", pagination: { pageSize: 100 }) {
      data {
        id
        attributes {
          name
          slug
          main_photo(sort: ["id:asc"], pagination: { pageSize: 1 }) {
            data {
              id
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
        }
      }
    }
  }
`

const CYCLE_COMMISSION_DETAIL_QUERY = `
  fragment MediaFileAttributes on UploadFile {
    name
    url
    width
    height
    alternativeText
    formats
  }

  fragment MediaFileFields on UploadFileEntityResponse {
    data {
      attributes {
        ...MediaFileAttributes
      }
    }
  }

  fragment MediaFileListItemFields on UploadFileEntity {
    id
    attributes {
      ...MediaFileAttributes
    }
  }

  fragment PageAccordionFields on ComponentPageBlocksAccordion {
    id
    title
    body
    default_open
    component_type
  }

  fragment PageBodyFields on ComponentPageBlocksBody {
    id
    body
    component_type
  }

  fragment PageButtonImagesFields on ComponentPageBlocksButtonImages {
    id
    component_type
    Components {
      id
      link
      image {
        ...MediaFileFields
      }
    }
  }

  fragment PageButtonLinkFields on ComponentPageBlocksButtonLink {
    id
    text
    link
    component_type
  }

  fragment PageEducationBooksFields on ComponentPageBlocksEducationBooks {
    id
    description
    component_type
    add_container
    main_photo {
      ...MediaFileFields
    }
    authors {
      ...PageAccordionFields
    }
  }

  fragment PagePanoramasFields on ComponentPageBlocksPanorams {
    id
    title
    component_type
    panoramas(pagination: { pageSize: 30 }) {
      data {
        id
        attributes {
          title
          link
          poster {
            ...MediaFileFields
          }
          weight
        }
      }
    }
    withBackground
  }

  fragment PagePartnersBlockFields on ComponentPageBlocksPartnersBlock {
    id
    component_type
    title
    partners(sort: ["weight:desc", "name:asc"], pagination: { pageSize: 100 }) {
      data {
        id
        attributes {
          name
          logo {
            ...MediaFileFields
          }
          link
          presentation_link
          type
          weight
        }
      }
    }
  }

  fragment PagePhotosGalleryFields on ComponentPageBlocksPhotosGallery {
    id
    title
    component_type
    images(pagination: { pageSize: 30 }) {
      data {
        ...MediaFileListItemFields
      }
    }
  }

  fragment PageTwoColumnWithImageFields on ComponentPageBlocksTwoColumnWithImage {
    id
    body
    component_type
    image {
      ...MediaFileFields
    }
    layout
  }

  fragment PagePersonFields on ComponentPageBlocksPerson {
    id
    component_type
    worker {
      data {
        id
        attributes {
          name
          photo {
            ...MediaFileFields
          }
          position
          email
          phone
          slug
          cycle_commission {
            data {
              attributes {
                slug
              }
            }
          }
        }
      }
    }
  }

  query GetCycleCommissionPage($pageUrl: String!) {
    cycleCommissions(filters: { page_url: { eq: $pageUrl } }, pagination: { pageSize: 1 }) {
      data {
        id
        attributes {
          name
          slug
          page_url
          layout
          SEO {
            title
            description
            meta {
              id
              name
              content
            }
          }
          main_photo(sort: ["id:asc"], pagination: { pageSize: 20 }) {
            data {
              ...MediaFileListItemFields
            }
          }
          headOfCommission {
            data {
              id
              attributes {
                name
                slug
                photo {
                  ...MediaFileFields
                }
                position
                phone
                email
              }
            }
          }
          page_components {
            ...PageAccordionFields
            ...PageBodyFields
            ...PageButtonImagesFields
            ...PageButtonLinkFields
            ...PageEducationBooksFields
            ...PagePanoramasFields
            ...PagePartnersBlockFields
            ...PagePhotosGalleryFields
            ...PageTwoColumnWithImageFields
            ...PagePersonFields
          }
          right_sidebar {
            ...PageAccordionFields
            ...PageBodyFields
            ...PageButtonImagesFields
            ...PageButtonLinkFields
            ...PageEducationBooksFields
            ...PagePanoramasFields
            ...PagePartnersBlockFields
            ...PagePhotosGalleryFields
            ...PageTwoColumnWithImageFields
            ...PagePersonFields
          }
          left_sidebar {
            ...PageAccordionFields
            ...PageBodyFields
            ...PageButtonImagesFields
            ...PageButtonLinkFields
            ...PageEducationBooksFields
            ...PagePanoramasFields
            ...PagePartnersBlockFields
            ...PagePhotosGalleryFields
            ...PageTwoColumnWithImageFields
            ...PagePersonFields
          }
          workers(
            filters: { category: { in: ["teacher"] }, email: { notNull: true } }
            sort: "name:asc"
            pagination: { pageSize: 100 }
          ) {
            data {
              id
              attributes {
                name
                slug
                photo {
                  ...MediaFileFields
                }
                lessons {
                  data {
                    id
                    attributes {
                      name
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
      }
    }
  }
`

function mapTeacher(node: WorkerNode, cmkSlug: string): CycleCommissionTeacherViewModel | null {
  if (!node.id || !node.attributes?.slug) {
    return null
  }

  return {
    id: node.id,
    name: node.attributes.name,
    slug: node.attributes.slug,
    href: `/structure/cmks/${cmkSlug}/${node.attributes.slug}`,
    photo: resolveImage(node.attributes.photo, 'card', node.attributes.name),
    position: node.attributes.position,
    phone: node.attributes.phone,
    email: node.attributes.email,
    subjects: (node.attributes.lessons?.data ?? []).flatMap((lesson) =>
      lesson.attributes?.name ? [lesson.attributes.name] : [],
    ),
  }
}

function mapCycleCommissionCard(item: CycleCommissionListNode): CycleCommissionCardViewModel | null {
  if (!item.id || !item.attributes?.slug) {
    return null
  }

  const image = item.attributes.main_photo.data[0]
    ? resolveImage(item.attributes.main_photo.data[0], 'card', item.attributes.name)
    : null

  return {
    id: item.id,
    title: item.attributes.name,
    href: `/structure/cmks/${item.attributes.slug}`,
    image,
  }
}

export const getCycleCommissionCards = cache(async () => {
  const response = await executeGraphQLRaw<CycleCommissionListResponse>(
    CYCLE_COMMISSION_LIST_QUERY,
    {},
    {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.structure, CACHE_TAGS.routes],
    },
  )

  return (response.cycleCommissions?.data ?? [])
    .map(mapCycleCommissionCard)
    .filter((item): item is CycleCommissionCardViewModel => Boolean(item))
})

const getCycleCommissionByPath = cache(async (pageUrl: string) => {
  const response = await executeGraphQLRaw<CycleCommissionDetailResponse>(
    CYCLE_COMMISSION_DETAIL_QUERY,
    {
      pageUrl,
    },
    {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.structure, CACHE_TAGS.routes, CACHE_TAGS.pageSeo],
    },
  )

  const entry = response.cycleCommissions?.data[0]

  if (!entry?.id || !entry.attributes?.slug) {
    return null
  }

  const mainPhotos = entry.attributes.main_photo.data
    .map((item) => resolveImage(item, 'hero', entry.attributes?.name))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  const allTeachers = (entry.attributes.workers?.data ?? [])
    .map((teacher) => mapTeacher(teacher, entry.attributes!.slug!))
    .filter((teacher): teacher is CycleCommissionTeacherViewModel => Boolean(teacher))

  const head = entry.attributes.headOfCommission?.data
    ? mapTeacher(entry.attributes.headOfCommission.data, entry.attributes.slug)
    : null

  const teachers = head ? allTeachers.filter((teacher) => teacher.slug !== head.slug) : allTeachers

  return {
    id: entry.id,
    title: entry.attributes.name,
    slug: entry.attributes.slug,
    layout: entry.attributes.layout,
    seoTitle: entry.attributes.SEO?.title ?? null,
    seoDescription: entry.attributes.SEO?.description ?? null,
    seoMeta: entry.attributes.SEO?.meta ?? null,
    mainPhotos,
    leftBlocks: filterCycleCommissionBlocks(entry.attributes.left_sidebar),
    mainBlocks: filterCycleCommissionBlocks(entry.attributes.page_components),
    rightBlocks: filterCycleCommissionBlocks(entry.attributes.right_sidebar),
    head,
    teachers,
  } satisfies CycleCommissionPageViewModel
})

export async function getCycleCommissionPageData(cmkSlug: string) {
  return getCycleCommissionByPath(`/${cmkSlug}`)
}

export async function getCycleCommissionPageMetadata(cmkSlug: string) {
  const page = await getCycleCommissionPageData(cmkSlug)

  if (!page) {
    return null
  }

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription,
    pathname: `/structure/cmks/${cmkSlug}`,
    image: page.mainPhotos[0]?.src ?? null,
    meta: page.seoMeta,
  }
}
