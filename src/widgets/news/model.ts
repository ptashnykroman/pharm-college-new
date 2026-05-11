import { formatDateParts, getMonthStandaloneName } from "@/shared/lib/date";
import type { ResolvedImage, ResolvedImageWithSources } from "@/shared/lib/media";
import { buildNewsArchiveUrl } from "@/shared/lib/navigation";

export type NewsListItem = {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  tag: string | null;
  date: ReturnType<typeof formatDateParts>;
  image: ResolvedImage;
};

export type RecentNewsItem = {
  id: string;
  title: string;
  href: string;
  dateLabel: string;
};

export type NewsArchiveMonth = {
  month: string;
  label: string;
  href: string;
  count: number;
};

export type NewsArchiveYear = {
  year: string;
  months: NewsArchiveMonth[];
};

export type NewsArticleViewModel = {
  id: string;
  title: string;
  href: string;
  excerpt: string;
  bodyHtml: string;
  tags: string[];
  date: ReturnType<typeof formatDateParts>;
  image: ResolvedImage | null;
  gallery: ResolvedImageWithSources[];
  videoEmbedUrl: string | null;
};

export function buildNewsArchive(dates: readonly string[]) {
  const groups = new Map<string, Map<string, number>>();

  for (const date of dates) {
    const [year = "", month = ""] = date.split("-");

    if (!year || !month) {
      continue;
    }

    const yearGroup = groups.get(year) ?? new Map<string, number>();
    yearGroup.set(month, (yearGroup.get(month) ?? 0) + 1);
    groups.set(year, yearGroup);
  }

  return Array.from(groups.entries())
    .sort(([leftYear], [rightYear]) => Number(rightYear) - Number(leftYear))
    .map(([year, months]) => ({
      year,
      months: Array.from(months.entries())
        .sort(([leftMonth], [rightMonth]) => Number(leftMonth) - Number(rightMonth))
        .map(([month, count]) => ({
          month,
          label: getMonthStandaloneName(month),
          href: buildNewsArchiveUrl(year, month),
          count,
        })),
    }));
}

export function getNewsListingTitle(year?: string, month?: string) {
  if (!year || !month) {
    return "Всі новини";
  }

  return `Новини за ${getMonthStandaloneName(month)} ${year} року`;
}

export function toEmbeddedVideoUrl(url: string | null | undefined) {
  if (!url?.trim()) {
    return null;
  }

  return url
    .replace("https://www.youtube.com/", "https://www.youtube.com/embed/")
    .replace("watch?v=", "")
    .split("&t=")[0];
}
