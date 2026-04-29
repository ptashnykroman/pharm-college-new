import { cn } from "@/lib/utils";

import { formatCmsHtml } from "@/widgets/page/cms-page/lib";

export function RichText({
  html,
  className,
}: {
  html: string | null | undefined;
  className?: string;
}) {
  if (!html?.trim()) {
    return null;
  }

  return (
    <div
      className={cn("rich-text", className)}
      dangerouslySetInnerHTML={{ __html: formatCmsHtml(html) }}
    />
  );
}
