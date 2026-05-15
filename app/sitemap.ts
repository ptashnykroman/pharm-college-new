import type { MetadataRoute } from "next";

import { getAllCmsPageEntries } from "@/shared/api/graphql/sdk";
import { SITE_URL } from "@/shared/lib/site-config";
import { getCycleCommissionStaticParams } from "@/widgets/cycle-commissions/data";
import {
  getNewsArchiveStaticParams,
  getNewsArticleStaticParams,
} from "@/widgets/news/data";
import { getTeacherProfileStaticParams } from "@/widgets/personnel/data";
import {
  getGroupScheduleStaticParams,
  getTeacherScheduleStaticParams,
} from "@/widgets/schedule/data";
import { getStructureSectionStaticParams } from "@/widgets/structure-sections/data";

const STATIC_ROUTE_PATHS = [
  "/",
  "/general-info",
  "/exam-schedule",
  "/novina",
  "/pro-zhbphc/administracia",
  "/pro-zhbphc/contacts-and-communication/feedback",
  "/pro-zhbphc/contacts-and-communication/trust-box",
  "/pro-zhbphc/kontakty",
  "/pro-zhbphc/video-and-3d",
  "/pro-zhbphc/viklad-sklad",
  "/rozklad",
  "/rozklad/grupa",
  "/rozklad/vikladach",
  "/structure/cmks",
  "/structure/subdiv",
  "/structure/vidilenya",
] as const;

function toAbsoluteUrl(pathname: string) {
  return new URL(pathname, `${SITE_URL}/`).toString();
}

function toSitemapEntry(
  pathname: string,
  lastModified?: string | Date | null,
): MetadataRoute.Sitemap[number] {
  return {
    url: toAbsoluteUrl(pathname),
    lastModified: lastModified ? new Date(lastModified) : undefined,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [
    cmsPages,
    cycleCommissions,
    teacherProfiles,
    groupSchedules,
    teacherSchedules,
    subdivisionSlugs,
    vidilenyaSlugs,
    newsArchives,
    newsArticles,
  ] = await Promise.all([
    getAllCmsPageEntries(),
    getCycleCommissionStaticParams(),
    getTeacherProfileStaticParams(),
    getGroupScheduleStaticParams(),
    getTeacherScheduleStaticParams(),
    getStructureSectionStaticParams("subdivision"),
    getStructureSectionStaticParams("vidilenya"),
    getNewsArchiveStaticParams(Number.MAX_SAFE_INTEGER),
    getNewsArticleStaticParams(Number.MAX_SAFE_INTEGER),
  ]);

  const entryMap = new Map<string, MetadataRoute.Sitemap[number]>();

  STATIC_ROUTE_PATHS.forEach((pathname) => {
    entryMap.set(pathname, toSitemapEntry(pathname));
  });

  cmsPages.forEach((page) => {
    entryMap.set(page.pathname, toSitemapEntry(page.pathname, page.updatedAt));
  });

  cycleCommissions.forEach(({ cmkSlug }) => {
    const pathname = `/structure/cmks/${cmkSlug}`;
    entryMap.set(pathname, toSitemapEntry(pathname));
  });

  teacherProfiles.forEach(({ cmkSlug, teacherSlug }) => {
    const pathname = `/structure/cmks/${cmkSlug}/${teacherSlug}`;
    entryMap.set(pathname, toSitemapEntry(pathname));
  });

  groupSchedules.forEach(({ groupName }) => {
    const pathname = `/rozklad/grupa/${encodeURIComponent(groupName)}`;
    entryMap.set(pathname, toSitemapEntry(pathname));
  });

  teacherSchedules.forEach(({ teacherSlug }) => {
    const pathname = `/rozklad/vikladach/${encodeURIComponent(teacherSlug)}`;
    entryMap.set(pathname, toSitemapEntry(pathname));
  });

  subdivisionSlugs.forEach((slug) => {
    const pathname = `/structure/subdiv/${slug}`;
    entryMap.set(pathname, toSitemapEntry(pathname));
  });

  vidilenyaSlugs.forEach((slug) => {
    const pathname = `/structure/vidilenya/${slug}`;
    entryMap.set(pathname, toSitemapEntry(pathname));
  });

  newsArchives.forEach(({ year, month }) => {
    const pathname = `/novina/${year}/${month}`;
    entryMap.set(pathname, toSitemapEntry(pathname, `${year}-${month}-01`));
  });

  newsArticles.forEach(({ year, month, day, id }) => {
    const pathname = `/novina/${year}/${month}/${day}/${id}`;
    entryMap.set(pathname, toSitemapEntry(pathname, `${year}-${month}-${day}`));
  });

  return Array.from(entryMap.entries())
    .sort(([left], [right]) => left.localeCompare(right, "uk"))
    .map(([, entry]) => entry);
}
