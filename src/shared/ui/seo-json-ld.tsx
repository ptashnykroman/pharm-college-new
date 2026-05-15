import { serializeJsonLd } from "@/shared/lib/seo";

type SeoJsonLdProps = {
  data: Record<string, unknown> | readonly Record<string, unknown>[];
};

export function SeoJsonLd({ data }: SeoJsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
