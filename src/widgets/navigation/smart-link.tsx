import Link from "next/link";
import type { ReactNode } from "react";

import { isExternalHref } from "@/shared/lib/navigation";

type SmartLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  prefetch?: boolean;
};

export function SmartLink({
  href,
  className,
  children,
  onClick,
  ariaLabel,
  prefetch,
}: SmartLinkProps) {
  if (isExternalHref(href) || href.startsWith("#")) {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        aria-label={ariaLabel}
        target={isExternalHref(href) ? "_blank" : undefined}
        rel={isExternalHref(href) ? "noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} prefetch={prefetch} className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
