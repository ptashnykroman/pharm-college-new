import { replaceCmsMediaUrls } from "@/shared/lib/rich-text";

export function formatCmsHtml(html: string | null | undefined) {
  const withMedia = replaceCmsMediaUrls(html);

  return withMedia
    .replace(/<table(\s[^>]*)?>/g, '<div class="rich-text__table-wrap"><table$1>')
    .replaceAll("</table>", "</table></div>");
}

export function normalizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}
