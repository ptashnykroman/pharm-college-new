import { NextRequest, NextResponse } from 'next/server'

import type { SearchResponse } from '@/shared/api/search/types'
import { STRAPI_API_URL } from '@/shared/lib/site-config'

export const dynamic = 'force-dynamic'

type SearchErrorPayload = {
  error?: {
    message?: string
  }
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim() ?? ''
  const limit = request.nextUrl.searchParams.get('limit')?.trim() ?? ''

  if (!query) {
    return NextResponse.json(
      {
        results: [],
        error: {
          message: 'Query parameter "q" is required',
        },
      },
      { status: 400 },
    )
  }

  const searchUrl = new URL('/api/search', STRAPI_API_URL)
  searchUrl.searchParams.set('q', query)

  if (limit) {
    searchUrl.searchParams.set('limit', limit)
  }

  const response = await fetch(searchUrl, {
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
    },
  })

  const payload = (await response.json().catch(() => null)) as SearchResponse & SearchErrorPayload | null

  if (!response.ok) {
    return NextResponse.json(
      payload ?? {
        results: [],
        error: {
          message: 'Search request failed',
        },
      },
      { status: response.status },
    )
  }

  return NextResponse.json(
    payload ?? {
      results: [],
    },
  )
}
