import { STRAPI_API_URL } from "@/shared/lib/site-config";

export function replaceCmsMediaUrls(html: string | null | undefined) {
  if (!html) {
    return "";
  }

  return html
    .replaceAll('src="/uploads', `src="${STRAPI_API_URL}/uploads`)
    .replaceAll('href="/uploads', `href="${STRAPI_API_URL}/uploads`);
}

export function stripHtml(html: string | null | undefined) {
  if (!html) {
    return "";
  }

  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
