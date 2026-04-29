import type { GetShellDataQuery } from "@/shared/api/graphql/generated";
import { isExternalHref, type NavigationNode } from "@/shared/lib/navigation";
import { resolveImage, toAbsoluteMediaUrl } from "@/shared/lib/media";

export type FooterViewModel = {
  logoImage: ReturnType<typeof resolveImage>;
  title: string;
  addressHtml: string;
  mapUrl: string;
  mapImage: ReturnType<typeof resolveImage>;
  mainPhone: string;
  secondaryPhone: string | null;
  email: string;
  copyright: string;
  quickLinks: Array<{
    id: string;
    label: string;
    href: string;
  }>;
  socialLinks: Array<{
    id: string;
    href: string;
    iconSrc: string | null;
  }>;
};

export function buildFooterViewModel(
  shellData: GetShellDataQuery,
  navigation: readonly NavigationNode[],
): FooterViewModel {
  const footer = shellData.footer?.data?.attributes;

  if (!footer) {
    throw new Error("Footer shell data is missing.");
  }

  const quickLinks = navigation
    .filter((item) => item.href.startsWith("/") && !isExternalHref(item.href))
    .slice(0, 4)
    .map((item) => ({
      id: item.id,
      label: item.label,
      href: item.href,
    }));

  return {
    logoImage: resolveImage(footer.logo, "footer", footer.title),
    title: footer.title,
    addressHtml: footer.address,
    mapUrl: footer.map_url,
    mapImage: resolveImage(footer.map_photo, "footer", footer.title),
    mainPhone: footer.main_phone,
    secondaryPhone: footer.secondary_phone,
    email: footer.email,
    copyright: footer.copyright,
    quickLinks,
    socialLinks: (footer.social ?? [])
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .map((item) => ({
        id: item.id,
        href: item.link,
        iconSrc: toAbsoluteMediaUrl(item.icon.data?.attributes?.url),
      })),
  };
}
