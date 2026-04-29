import Image from "next/image";
import Link from "next/link";

import logo from "@/shared/assets/icons/header/logo.png";
import { SITE_NAME, SITE_NAME2 } from "@/shared/lib/site-config";
import { cn } from "@/shared/lib/utils";

export function HeaderBrand({ scrolled }: { scrolled: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl transition-bounce group-hover:scale-105">
        <Image
          src={logo}
          alt={SITE_NAME}
          width={40}
          height={40}
          quality={75}
          className="h-full w-full object-contain"
          sizes="40px"
        />
      </div>
      <div className="hidden sm:block">
        <div
          className={cn(
            "text-base font-bold leading-tight transition-smooth",
            scrolled ? "text-foreground" : "text-primary-foreground",
          )}
        >
          {SITE_NAME}
        </div>
        <div
          className={cn(
            "text-sm uppercase tracking-wider transition-smooth",
            scrolled ? "text-muted-foreground" : "text-primary-foreground/75",
          )}
        >
          {SITE_NAME2}
        </div>
      </div>
    </Link>
  );
}
