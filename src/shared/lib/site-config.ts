export const STRAPI_API_URL = (process.env.STRAPI_API_URL || 'https://api.pharm.zt.ua:9443').replace(/\/$/, '')

export const STRAPI_GRAPHQL_URL = process.env.STRAPI_GRAPHQL_URL || `${STRAPI_API_URL}/graphql`

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://pharm.zt.ua').replace(/\/$/, '')

export const SITE_NAME = 'ЖБФФК'
export const SITE_NAME2 = 'ЖОР'
export const SITE_FULL_NAME = 'Житомирський базовий фармацевтичний фаховий коледж'
export const SITE_FULL_NAME2 = 'Житомирської обласної ради'
export const SITE_DESCRIPTION =
  'Житомирський базовий фармацевтичний фаховий коледж – єдиний в Україні коледж фармацевтичного напрямку. Вступай до коледжу і отримуй справжню освіту і престижну професію.'
export const SITE_OG_IMAGE = 'https://pharm.zt.ua/uploads/Logo_Zh_Pharm_C_415_2eef903024.png'

export const DEFAULT_REVALIDATE_SECONDS = 60 * 60

export const CACHE_TAGS = {
  header: 'header',
  footer: 'footer',
  home: 'home',
  news: 'news',
  events: 'events',
  partners: 'partners',
  routes: 'routes',
  page: 'page',
  pageSeo: 'page-seo',
} as const

export const HERO_PRIMARY_LINK = '/abiturientam/conditions-of-entry'
export const HERO_SECONDARY_LINK = '/rozklad'
export const NEWS_INDEX_PATH = '/novina'
