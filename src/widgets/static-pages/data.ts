import { cache } from 'react'

import { executeGraphQLRaw } from '@/shared/api/graphql/client'
import { resolveImage, type ResolvedImage } from '@/shared/lib/media'
import { CACHE_TAGS, DEFAULT_REVALIDATE_SECONDS } from '@/shared/lib/site-config'
import type { AdministrationCardViewModel } from '@/widgets/personnel/model'
import { getAdministrationPageData } from '@/widgets/personnel/data'

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

type PanoramaNode = {
  id: string | null
  attributes: {
    title: string
    link: string
    poster: MediaResponse
  } | null
}

type VideoNode = {
  id: string | null
  attributes: {
    title: string
    video_url: string
    video_poster: MediaResponse
  } | null
}

type VideoAnd3dResponse = {
  panoramas: {
    data: PanoramaNode[]
  } | null
  videos: {
    data: VideoNode[]
  } | null
}

export type VideoAnd3dCard = {
  id: string
  title: string
  url: string
  image: ResolvedImage | null
}

export type VideoAnd3dPageData = {
  panoramas: VideoAnd3dCard[]
  videos: VideoAnd3dCard[]
}

const VIDEO_AND_3D_QUERY = `
  query GetVideoAnd3dPageData {
    panoramas(sort: "weight:desc", pagination: { pageSize: 100 }) {
      data {
        id
        attributes {
          title
          link
          poster {
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
        }
      }
    }
    videos(sort: "createdAt:desc", pagination: { pageSize: 100 }) {
      data {
        id
        attributes {
          title
          video_url
          video_poster {
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
        }
      }
    }
  }
`

function mapPanorama(item: PanoramaNode): VideoAnd3dCard | null {
  if (!item.id || !item.attributes) {
    return null
  }

  return {
    id: item.id,
    title: item.attributes.title,
    url: item.attributes.link,
    image: resolveImage(item.attributes.poster, 'card', item.attributes.title),
  }
}

function mapVideo(item: VideoNode): VideoAnd3dCard | null {
  if (!item.id || !item.attributes) {
    return null
  }

  return {
    id: item.id,
    title: item.attributes.title,
    url: item.attributes.video_url,
    image: resolveImage(item.attributes.video_poster, 'card', item.attributes.title),
  }
}

export const getPrimaryAdministrationContact = cache(async (): Promise<AdministrationCardViewModel | null> => {
  const people = await getAdministrationPageData()
  return people[0] ?? null
})

export const getVideoAnd3dPageData = cache(async (): Promise<VideoAnd3dPageData> => {
  const response = await executeGraphQLRaw<VideoAnd3dResponse>(
    VIDEO_AND_3D_QUERY,
    {},
    {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.media, CACHE_TAGS.routes],
    },
  )

  return {
    panoramas: (response.panoramas?.data ?? []).map(mapPanorama).filter((item): item is VideoAnd3dCard => Boolean(item)),
    videos: (response.videos?.data ?? []).map(mapVideo).filter((item): item is VideoAnd3dCard => Boolean(item)),
  }
})
