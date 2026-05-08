import type { SearchResponse } from '@/shared/api/search/types'

type SearchSiteOptions = {
  limit?: number
  signal?: AbortSignal
}

type SearchErrorPayload = {
  error?: {
    message?: string
  }
}

export async function searchSite(query: string, options: SearchSiteOptions = {}): Promise<SearchResponse> {
  const params = new URLSearchParams({
    q: query.trim(),
  })

  if (options.limit) {
    params.set('limit', String(options.limit))
  }

  const response = await fetch(`/api/search?${params.toString()}`, {
    signal: options.signal,
  })

  const payload = (await response.json()) as SearchResponse & SearchErrorPayload

  if (!response.ok) {
    throw new Error(payload.error?.message || 'Search request failed')
  }

  return {
    results: Array.isArray(payload.results) ? payload.results : [],
  }
}
