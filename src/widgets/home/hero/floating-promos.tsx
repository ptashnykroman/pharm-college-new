import Image from "next/image";

import educationWebsite from "@/shared/assets/images/education-website-2024.webp";
import howareyou from "@/shared/assets/images/howareyou.jpg";
import { cn } from "@/shared/lib/utils";

export function FloatingPromos() {
  return (
    <div className="absolute right-4 top-[calc(100vh-180px)] hidden flex-col items-center gap-2 xl:flex">
      <Image
        src={educationWebsite}
        quality={75}
        alt="Освітній сайт 2024"
        className={cn(
          "h-20 w-20 object-contain transition-smooth",
        )}
        priority
      />
      <Image
        src={howareyou}
        quality={75}
        alt="Ти як?"
        className={cn(
          "h-16 w-16 object-contain transition-smooth",
        )}
        priority
      />
    </div>
  );
}
