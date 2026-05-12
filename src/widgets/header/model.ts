import type {
  GetHeaderScheduleQuery,
  GetShellDataQuery,
} from "@/shared/api/graphql/generated";
import {
  type NavigationNode,
  normalizeHref,
} from "@/shared/lib/navigation";
import { isSvgAsset, resolveImage, toAbsoluteMediaUrl } from "@/shared/lib/media";

export type HeaderLinkItem = {
  id: string;
  label: string;
  href: string;
  iconSrc?: string | null;
  children: NavigationNode[];
};

export type HeaderSocialItem = {
  id: string;
  label: string;
  href: string;
  iconSrc?: string | null;
};

export type HeaderViewModel = {
  title: string;
  logoImage: ReturnType<typeof resolveImage>;
  logoSvgUrl: string | null;
  quickLinks: HeaderLinkItem[];
  socialLabel: string;
  socialLinks: HeaderSocialItem[];
  navigation: NavigationNode[];
};

type HeaderNavigationItem = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<NonNullable<GetShellDataQuery["header"]>["data"]>["attributes"]
    >["Header"]
  >["navigation"]
>;

type HeaderNavigationEntry = NonNullable<HeaderNavigationItem[number]>;

type HeaderNavigationNodeLike = {
  id: string;
  text: string;
  link: string | null;
  submenu?: ReadonlyArray<HeaderNavigationNodeLike | null> | null;
};

type GroupEntity = NonNullable<
  NonNullable<NonNullable<GetHeaderScheduleQuery["groups"]>["data"]>[number]
>;

type WorkerEntity = NonNullable<
  NonNullable<NonNullable<GetHeaderScheduleQuery["workers"]>["data"]>[number]
>;

function hasAttributes<T extends { attributes: unknown | null }>(
  item: T | null,
): item is T & { attributes: Exclude<T["attributes"], null> } {
  return Boolean(item?.attributes);
}

function sortGroups(groups: readonly GroupEntity[]) {
  return [...groups.filter(hasAttributes)].sort((left, right) => {
    const leftCourse = Number(
      left.attributes.course_number.replace("kurs_", ""),
    );
    const rightCourse = Number(
      right.attributes.course_number.replace("kurs_", ""),
    );

    if (leftCourse !== rightCourse) {
      return leftCourse - rightCourse;
    }

    return left.attributes.name.localeCompare(right.attributes.name, "uk-UA");
  });
}

function formatTeacherMenuLabel(name: string) {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length < 3) {
    return name;
  }

  return `${parts[0]} ${parts[1][0]}. ${parts[2][0]}.`;
}

function buildScheduleChildren(
  schedule: GetHeaderScheduleQuery,
  href: string,
): NavigationNode[] | null {
  if (href === "/rozklad/grupa") {
    return sortGroups(schedule.groups?.data ?? []).map((group) => ({
      id: group.attributes.name,
      label: group.attributes.name,
      href: `/rozklad/grupa/${encodeURIComponent(group.attributes.name)}`,
      children: [],
    }));
  }

  if (href === "/rozklad/vikladach") {
    return (schedule.workers?.data ?? [])
      .filter(hasAttributes)
      .filter(
        (
          teacher,
        ): teacher is WorkerEntity & {
          attributes: Exclude<WorkerEntity["attributes"], null> & { slug: string };
        } => Boolean(teacher.attributes.slug),
      )
      .map((teacher) => ({
        id: teacher.attributes.slug,
        label: formatTeacherMenuLabel(teacher.attributes.name),
        href: `/rozklad/vikladach/${encodeURIComponent(teacher.attributes.slug)}`,
        children: [],
      }));
  }

  return null;
}

function normalizeNavigationNode(
  item: HeaderNavigationNodeLike,
  schedule: GetHeaderScheduleQuery,
): NavigationNode {
  const href = normalizeHref(item.link);
  const scheduleChildren = buildScheduleChildren(schedule, href);
  const children =
    scheduleChildren ??
    (item.submenu ?? [])
      .filter((child): child is HeaderNavigationNodeLike => Boolean(child))
      .map((child) => normalizeNavigationNode(child, schedule));

  return {
    id: item.id,
    label: item.text.trim(),
    href,
    children,
  };
}

function normalizeNavigation(
  items:
    | NonNullable<
        NonNullable<
          NonNullable<
            NonNullable<NonNullable<GetShellDataQuery["header"]>["data"]>["attributes"]
          >["Header"]
        >["navigation"]
      >
    | null
    | undefined,
  schedule: GetHeaderScheduleQuery,
): NavigationNode[] {
  return (items ?? [])
    .filter((item): item is HeaderNavigationEntry => Boolean(item))
    .map((item) => normalizeNavigationNode(item, schedule));
}

export function buildHeaderViewModel(
  shellData: GetShellDataQuery,
  schedule: GetHeaderScheduleQuery,
): HeaderViewModel {
  const header = shellData.header?.data?.attributes?.Header;

  if (!header) {
    throw new Error("Header shell data is missing.");
  }

  const resolvedLogo = resolveImage(header.logo, "logo", header.title);
  const absoluteLogoUrl = toAbsoluteMediaUrl(header.logo.data?.attributes?.url);
  const logoSvgUrl =
    absoluteLogoUrl && isSvgAsset(absoluteLogoUrl) ? absoluteLogoUrl : null;

  return {
    title: header.title,
    logoImage: resolvedLogo && !isSvgAsset(resolvedLogo.src) ? resolvedLogo : null,
    logoSvgUrl,
    quickLinks: (header.headerIcons ?? [])
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .map((item) => ({
        id: item.id,
        label: item.text?.trim() || "Link",
        href: normalizeHref(item.link),
        iconSrc: toAbsoluteMediaUrl(item.icon.data?.attributes?.url),
        children: [],
      })),
    socialLabel: header.social?.text?.trim() || "Social",
    socialLinks: (header.social?.icons ?? [])
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .map((item) => ({
        id: item.id,
        label: item.text?.trim() || "social",
        href: normalizeHref(item.link),
        iconSrc: toAbsoluteMediaUrl(item.icon.data?.attributes?.url),
      })),
    navigation: normalizeNavigation(header.navigation, schedule),
  };
}
