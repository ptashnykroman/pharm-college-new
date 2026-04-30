export type NavigationNode = {
  id: string;
  label: string;
  href: string;
  children: NavigationNode[];
};

const LEGACY_DYNAMIC_PREFIXES = [
  "/novina",
  "/rozklad/grupa",
  "/rozklad/vikladach",
  "/structure/cmks",
  "/structure/subdiv",
  "/structure/vidilenya",
];

export function normalizeHref(href: string | null | undefined) {
  const trimmed = (href || "").replace(/\s+/g, "").trim();

  if (!trimmed) {
    return "#";
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  if (trimmed.startsWith("#")) {
    return trimmed;
  }

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const normalized = withLeadingSlash.replace(/\/{2,}/g, "/");

  return normalized !== "/" ? normalized.replace(/\/$/, "") : normalized;
}

export function isExternalHref(href: string) {
  return /^(https?:)?\/\//i.test(href);
}

export function flattenNavigationPaths(nodes: readonly NavigationNode[]) {
  const paths = new Set<string>();

  for (const node of nodes) {
    if (!isExternalHref(node.href) && node.href.startsWith("/")) {
      paths.add(node.href);
    }

    for (const childPath of flattenNavigationPaths(node.children)) {
      paths.add(childPath);
    }
  }

  return paths;
}

export function buildNewsUrl(date: string, id: string) {
  const [year = "", month = "", day = ""] = date.split("-");
  return `/novina/${year}/${month}/${day}/${id}`;
}

export function buildNewsArchiveUrl(year: string, month: string) {
  return `/novina/${year}/${month}`;
}

export function isKnownLegacyPath(
  pathname: string,
  knownPaths: ReadonlySet<string>,
) {
  if (knownPaths.has(pathname)) {
    return true;
  }

  return LEGACY_DYNAMIC_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
