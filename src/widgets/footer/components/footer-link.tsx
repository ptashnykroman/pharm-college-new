import Link from "next/link";
import type { ReactNode } from "react";

import { isExternalHref } from "@/shared/lib/navigation";

export function FooterLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  if (isExternalHref(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
