import { STATIC_BREADCRUMB_TRAILS } from '@/shared/lib/breadcrumbs-registry'
import type { NavigationNode } from '@/shared/lib/navigation'

const NEWS_INDEX_PATH = '/novina'

export type BreadcrumbItem = {
  label: string
  href?: string
  current?: boolean
}

type ResolveBreadcrumbsInput = {
  pathname: string
  navigation?: readonly NavigationNode[] | null
}

const HOME_BREADCRUMB: BreadcrumbItem = {
  label: 'Головна',
  href: '/',
}

export function buildBreadcrumbTrail(items: readonly BreadcrumbItem[]) {
  if (items.length === 0) {
    return []
  }

  if (items[0]?.href === HOME_BREADCRUMB.href) {
    return [...items]
  }

  return [HOME_BREADCRUMB, ...items]
}

export function buildNewsArchiveBreadcrumbs(year: string, month: string) {
  return buildBreadcrumbTrail([
    { label: 'Новини', href: NEWS_INDEX_PATH },
    { label: year },
    { label: month },
  ])
}

export function buildNewsArticleBreadcrumbs() {
  return buildBreadcrumbTrail([
    { label: 'Новини', href: NEWS_INDEX_PATH, current: false },
  ])
}

function findNavigationTrail(
  nodes: readonly NavigationNode[],
  pathname: string,
): BreadcrumbItem[] | null {
  for (const node of nodes) {
    const currentItem: BreadcrumbItem = {
      label: node.label,
      href: node.href,
    }

    if (node.href === pathname) {
      return [currentItem]
    }

    const childTrail = findNavigationTrail(node.children, pathname)

    if (childTrail) {
      return [currentItem, ...childTrail]
    }
  }

  return null
}

export function resolveStaticBreadcrumbs(pathname: string) {
  if (pathname === '/') {
    return null
  }

  const trail = STATIC_BREADCRUMB_TRAILS[pathname]

  return trail ? buildBreadcrumbTrail(trail) : null
}

export function resolveNavigationBreadcrumbs(
  pathname: string,
  navigation: readonly NavigationNode[] | null | undefined,
) {
  if (pathname === '/' || !navigation?.length) {
    return null
  }

  const trail = findNavigationTrail(navigation, pathname)

  return trail ? buildBreadcrumbTrail(trail) : null
}

export function resolveBreadcrumbs({
  pathname,
  navigation,
}: ResolveBreadcrumbsInput) {
  return (
    resolveStaticBreadcrumbs(pathname) ??
    resolveNavigationBreadcrumbs(pathname, navigation)
  )
}
