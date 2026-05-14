import type { BreadcrumbItem } from '@/shared/lib/breadcrumbs'

export const STATIC_BREADCRUMB_TRAILS: Record<
  string,
  readonly BreadcrumbItem[]
> = {
  '/general-info': [
    { label: 'General Information', href: '/general-info' },
  ],
  '/novina': [{ label: 'Новини' }],
  '/pro-zhbphc/administracia': [
    { label: 'Структура', href: '/structure' },
    { label: 'Адміністрація', href: '/pro-zhbphc/administracia' },
  ],
  '/pro-zhbphc/viklad-sklad': [
    { label: 'Структура', href: '/structure' },
    { label: 'Кадровий склад', href: '/pro-zhbphc/viklad-sklad' },
  ],
  '/pro-zhbphc/kontakty': [
    { label: 'Про ЖБФФК', href: '/pro-zhbphc' },
    {
      label: "Контакти та зв'язок",
      href: '/pro-zhbphc/contacts-and-communication',
    },
    { label: 'Контакти', href: '/pro-zhbphc/kontakty' },
  ],
  '/pro-zhbphc/contacts-and-communication/feedback': [
    { label: 'Про ЖБФФК', href: '/pro-zhbphc' },
    {
      label: "Контакти та зв'язок",
      href: '/pro-zhbphc/contacts-and-communication',
    },
    {
      label: "Зворотний зв'язок",
      href: '/pro-zhbphc/contacts-and-communication/feedback',
    },
  ],
  '/pro-zhbphc/contacts-and-communication/trust-box': [
    { label: 'Про ЖБФФК', href: '/pro-zhbphc' },
    {
      label: "Контакти та зв'язок",
      href: '/pro-zhbphc/contacts-and-communication',
    },
    {
      label: 'Скринька довіри',
      href: '/pro-zhbphc/contacts-and-communication/trust-box',
    },
  ],
  '/pro-zhbphc/video-and-3d': [
    { label: 'Про ЖБФФК', href: '/pro-zhbphc' },
    {
      label: 'Відео і 3D-панорами',
      href: '/pro-zhbphc/video-and-3d',
    },
  ],
  '/rozklad': [{ label: 'Розклад' }],
  '/rozklad/grupa': [
    { label: 'Розклад', href: '/rozklad' },
    { label: 'Групи' },
  ],
  '/rozklad/vikladach': [
    { label: 'Розклад', href: '/rozklad' },
    { label: 'Викладачі' },
  ],
  '/exam-schedule': [
    { label: 'Розклад', href: '/rozklad' },
    { label: 'Розклад екзаменів', href: '/exam-schedule' },
  ],
  '/structure/cmks': [
    { label: 'Структура', href: '/structure' },
    { label: 'Циклові комісії', href: '/structure/cmks' },
  ],
  '/structure/subdiv': [
    { label: 'Структура', href: '/structure' },
    { label: 'Підрозділи', href: '/structure/subdiv' },
  ],
  '/structure/vidilenya': [
    { label: 'Структура', href: '/structure' },
    { label: 'Відділення', href: '/structure/vidilenya' },
  ],
}
