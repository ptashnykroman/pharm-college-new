export const STRAPI_API_URL = (process.env.STRAPI_API_URL || 'https://api.pharm.zt.ua:9443').replace(/\/$/, '')

export const STRAPI_GRAPHQL_URL = process.env.STRAPI_GRAPHQL_URL || `${STRAPI_API_URL}/graphql`

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://pharm.zt.ua').replace(/\/$/, '')
export const SITE_LOCALE = 'uk_UA'
export const SITE_THEME_COLOR = '#ffffff'

export const SITE_NAME = 'ЖБФФК'
export const SITE_NAME2 = 'ЖОР'
export const SITE_FULL_NAME = 'Житомирський базовий фармацевтичний фаховий коледж'
export const SITE_FULL_NAME2 = 'Житомирської обласної ради'
export const SITE_DESCRIPTION =
  'Житомирський базовий фармацевтичний фаховий коледж – єдиний в Україні коледж фармацевтичного напрямку. Вступай до коледжу і отримуй справжню освіту і престижну професію.'
export const SITE_OG_IMAGE = 'https://pharm.zt.ua/uploads/Logo_Zh_Pharm_C_415_2eef903024.png'
export const SITE_EMAIL = 'college@pharm.zt.ua'
export const SITE_PHONE = '(0412) 24-25-45'
export const SITE_CONTACT_PAGE_PATH = '/pro-zhbphc/kontakty'
export const SITE_ADDRESS_STREET = 'Чуднівська, 99'
export const SITE_ADDRESS_POSTAL_CODE = '10005'
export const SITE_ADDRESS_LOCALITY = 'Житомир'
export const SITE_ADDRESS_COUNTRY = 'Україна'
export const SITE_LATITUDE = '50.244395'
export const SITE_LONGITUDE = '28.643623'

export const DEFAULT_REVALIDATE_SECONDS =
  process.env.NODE_ENV === 'development' ? 0 : 60 * 5

export const CACHE_TAGS = {
  header: 'header',
  footer: 'footer',
  home: 'home',
  news: 'news',
  events: 'events',
  partners: 'partners',
  media: 'media',
  personnel: 'personnel',
  schedule: 'schedule',
  structure: 'structure',
  routes: 'routes',
  page: 'page',
  pageSeo: 'page-seo',
} as const

export const HERO_PRIMARY_LINK = '/abiturientam/conditions-of-entry'
export const HERO_SECONDARY_LINK = '/rozklad'
export const NEWS_INDEX_PATH = '/novina'
