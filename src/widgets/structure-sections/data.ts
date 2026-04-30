import { cache } from 'react'

import type {
  ComponentPagesSeo,
  Enum_Subdivision_Layout,
  Enum_Vidilenya_Layout,
  SubdivisionLeftSidebarDynamicZone,
  SubdivisionPageComponentsDynamicZone,
  SubdivisionRightSidebarDynamicZone,
  VidilenyaLeftSidebarDynamicZone,
  VidilenyaPageComponentsDynamicZone,
  VidilenyaRightSidebarDynamicZone,
} from '@/shared/api/graphql/generated'
import { executeGraphQLRaw } from '@/shared/api/graphql/client'
import { resolveImage } from '@/shared/lib/media'
import { CACHE_TAGS, DEFAULT_REVALIDATE_SECONDS } from '@/shared/lib/site-config'
import {
  filterStructureSectionBlocks,
  type StructureSectionCardViewModel,
  type StructureSectionPageViewModel,
} from '@/widgets/structure-sections/model'

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

type SectionListNode = {
  id: string | null
  attributes: {
    name: string
    slug: string | null
    main_photo: {
      data: MediaListItem[]
    }
  } | null
}

type SectionDetailNode = {
  id: string | null
  attributes: {
    name: string
    slug: string | null
    layout: Enum_Subdivision_Layout | Enum_Vidilenya_Layout
    SEO: ComponentPagesSeo | null
    main_photo: {
      data: MediaListItem[]
    }
    page_components:
      | readonly (SubdivisionPageComponentsDynamicZone | null)[]
      | readonly (VidilenyaPageComponentsDynamicZone | null)[]
      | null
    right_sidebar:
      | readonly (SubdivisionRightSidebarDynamicZone | null)[]
      | readonly (VidilenyaRightSidebarDynamicZone | null)[]
      | null
    left_sidebar:
      | readonly (SubdivisionLeftSidebarDynamicZone | null)[]
      | readonly (VidilenyaLeftSidebarDynamicZone | null)[]
      | null
  } | null
}

type StructureSectionListResponse = {
  subdivisions?: {
    data: SectionListNode[]
  } | null
  vidilenyas?: {
    data: SectionListNode[]
  } | null
}

type StructureSectionDetailResponse = {
  subdivisions?: {
    data: SectionDetailNode[]
  } | null
  vidilenyas?: {
    data: SectionDetailNode[]
  } | null
}

type StructureSectionKind = 'subdivision' | 'vidilenya'

type StructureSectionConfig = {
  kind: StructureSectionKind
  collectionField: 'subdivisions' | 'vidilenyas'
  routeBase: '/structure/subdiv' | '/structure/vidilenya'
  listQuery: string
  detailQuery: string
}

const STRUCTURE_SHARED_FRAGMENTS = `
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
`

const STRUCTURE_SECTION_CONFIGS: Record<StructureSectionKind, StructureSectionConfig> = {
  subdivision: {
    kind: 'subdivision',
    collectionField: 'subdivisions',
    routeBase: '/structure/subdiv',
    listQuery: `
      query GetSubdivisionCards {
        subdivisions(sort: "name:asc", pagination: { pageSize: 100 }) {
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
    `,
    detailQuery: `
      ${STRUCTURE_SHARED_FRAGMENTS}

      query GetSubdivisionPage($slug: String!) {
        subdivisions(filters: { slug: { eq: $slug } }, pagination: { pageSize: 1 }) {
          data {
            id
            attributes {
              name
              slug
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
            }
          }
        }
      }
    `,
  },
  vidilenya: {
    kind: 'vidilenya',
    collectionField: 'vidilenyas',
    routeBase: '/structure/vidilenya',
    listQuery: `
      query GetVidilenyaCards {
        vidilenyas(sort: "name:asc", pagination: { pageSize: 100 }) {
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
    `,
    detailQuery: `
      ${STRUCTURE_SHARED_FRAGMENTS}

      query GetVidilenyaPage($slug: String!) {
        vidilenyas(filters: { slug: { eq: $slug } }, pagination: { pageSize: 1 }) {
          data {
            id
            attributes {
              name
              slug
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
            }
          }
        }
      }
    `,
  },
}

function getCollectionData(
  response: StructureSectionListResponse | StructureSectionDetailResponse,
  field: 'subdivisions' | 'vidilenyas',
) {
  return response[field]?.data ?? []
}

function mapSectionCard(
  item: SectionListNode,
  routeBase: StructureSectionConfig['routeBase'],
): StructureSectionCardViewModel | null {
  if (!item.id || !item.attributes?.slug) {
    return null
  }

  const image = item.attributes.main_photo.data[0]
    ? resolveImage(item.attributes.main_photo.data[0], 'card', item.attributes.name)
    : null

  return {
    id: item.id,
    title: item.attributes.name,
    href: `${routeBase}/${item.attributes.slug}`,
    image,
  }
}

function mapSectionPage(item: SectionDetailNode): StructureSectionPageViewModel | null {
  if (!item.id || !item.attributes?.slug) {
    return null
  }

  const mainPhotos = item.attributes.main_photo.data
    .map((media) => resolveImage(media, 'hero', item.attributes?.name))
    .filter((media): media is NonNullable<typeof media> => Boolean(media))

  return {
    id: item.id,
    title: item.attributes.name,
    slug: item.attributes.slug,
    layout: item.attributes.layout,
    seoTitle: item.attributes.SEO?.title ?? null,
    seoDescription: item.attributes.SEO?.description ?? null,
    seoMeta: item.attributes.SEO?.meta ?? null,
    mainPhotos,
    leftBlocks: filterStructureSectionBlocks(item.attributes.left_sidebar),
    mainBlocks: filterStructureSectionBlocks(item.attributes.page_components),
    rightBlocks: filterStructureSectionBlocks(item.attributes.right_sidebar),
  }
}

export async function getStructureSectionCards(kind: StructureSectionKind) {
  const config = STRUCTURE_SECTION_CONFIGS[kind]

  const response = await executeGraphQLRaw<StructureSectionListResponse>(
    config.listQuery,
    {},
    {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.structure, CACHE_TAGS.routes],
    },
  )

  return getCollectionData(response, config.collectionField)
    .map((item) => mapSectionCard(item as SectionListNode, config.routeBase))
    .filter((item): item is StructureSectionCardViewModel => Boolean(item))
}

const getStructureSectionPageCached = cache(async (kind: StructureSectionKind, slug: string) => {
  const config = STRUCTURE_SECTION_CONFIGS[kind]

  const response = await executeGraphQLRaw<StructureSectionDetailResponse>(
    config.detailQuery,
    {
      slug,
    },
    {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.structure, CACHE_TAGS.routes, CACHE_TAGS.pageSeo],
    },
  )

  const entry = getCollectionData(response, config.collectionField)[0]

  return entry ? mapSectionPage(entry as SectionDetailNode) : null
})

export async function getStructureSectionPageData(kind: StructureSectionKind, slug: string) {
  return getStructureSectionPageCached(kind, slug)
}

export async function getStructureSectionPageMetadata(kind: StructureSectionKind, slug: string) {
  const config = STRUCTURE_SECTION_CONFIGS[kind]
  const page = await getStructureSectionPageData(kind, slug)

  if (!page) {
    return null
  }

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription,
    pathname: `${config.routeBase}/${slug}`,
    image: page.mainPhotos[0]?.src ?? null,
    meta: page.seoMeta,
  }
}
