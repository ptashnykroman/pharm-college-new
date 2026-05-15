import {
  SITE_ADDRESS_COUNTRY,
  SITE_ADDRESS_LOCALITY,
  SITE_ADDRESS_POSTAL_CODE,
  SITE_ADDRESS_STREET,
  SITE_CONTACT_PAGE_PATH,
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_FULL_NAME,
  SITE_LATITUDE,
  SITE_LONGITUDE,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_PHONE,
  SITE_URL,
} from "@/shared/lib/site-config";

type JsonLdRecord = Record<string, unknown>;

type NewsArticleJsonLdInput = {
  title: string;
  description: string;
  pathname: string;
  publishedTime: string;
  modifiedTime?: string;
  imageUrl?: string | null;
  keywords?: readonly string[];
};

function createAbsoluteUrl(pathname = "/") {
  return new URL(pathname, `${SITE_URL}/`).toString();
}

export function serializeJsonLd(data: JsonLdRecord | readonly JsonLdRecord[]) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_FULL_NAME,
    alternateName: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: SITE_OG_IMAGE,
    image: SITE_OG_IMAGE,
    email: SITE_EMAIL,
    telephone: SITE_PHONE,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_ADDRESS_STREET,
      postalCode: SITE_ADDRESS_POSTAL_CODE,
      addressLocality: SITE_ADDRESS_LOCALITY,
      addressCountry: SITE_ADDRESS_COUNTRY,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_LATITUDE,
      longitude: SITE_LONGITUDE,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "main office",
      telephone: SITE_PHONE,
      email: SITE_EMAIL,
      url: createAbsoluteUrl(SITE_CONTACT_PAGE_PATH),
      availableLanguage: ["uk"],
    },
  } satisfies JsonLdRecord;
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_FULL_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "uk",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  } satisfies JsonLdRecord;
}

export function buildContactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${createAbsoluteUrl(SITE_CONTACT_PAGE_PATH)}#webpage`,
    url: createAbsoluteUrl(SITE_CONTACT_PAGE_PATH),
    name: "Контакти",
    description: "Контактні дані адміністрації, карта та форма звернення до коледжу.",
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
    mainEntity: {
      "@id": `${SITE_URL}/#organization`,
    },
  } satisfies JsonLdRecord;
}

export function buildNewsArticleJsonLd({
  title,
  description,
  pathname,
  publishedTime,
  modifiedTime,
  imageUrl,
  keywords,
}: NewsArticleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${createAbsoluteUrl(pathname)}#article`,
    headline: title,
    description,
    url: createAbsoluteUrl(pathname),
    mainEntityOfPage: createAbsoluteUrl(pathname),
    datePublished: publishedTime,
    dateModified: modifiedTime ?? publishedTime,
    image: imageUrl ? [imageUrl] : [SITE_OG_IMAGE],
    keywords: keywords?.length ? keywords.join(", ") : undefined,
    author: {
      "@type": "Organization",
      name: SITE_FULL_NAME,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  } satisfies JsonLdRecord;
}
