export type SearchResultType =
  | 'cycle-commission'
  | 'home-page-about'
  | 'novina'
  | 'page'
  | 'subdivision'
  | 'vidilenya'
  | 'worker'

export type SearchResult = {
  id: string
  type: SearchResultType
  title: string
  slug: string | null
  url: string
  excerpt: string
  matchedFields: string[]
}

export type SearchResponse = {
  results: SearchResult[]
}
