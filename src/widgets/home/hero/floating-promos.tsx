import Image from 'next/image'

import { cn } from '@/shared/lib/utils'
import howareyou from '@/shared/assets/images/howareyou.jpg'
import educationWebsite from '@/shared/assets/images/education-website-2024.webp'

export function FloatingPromos() {
  return (
    <div className="absolute flex flex-col items-center gap-1.5 sm:gap-2 right-3 xl:right-4 bottom-4 lg:bottom-6 xl:bottom-8">
      <Image
        src={educationWebsite}
        quality={70}
        alt="Освітній сайт 2024"
        sizes="(max-width: 639px) 48px, (max-width: 1279px) 56px, 80px"
        className={cn('h-12 w-12 object-contain transition-smooth sm:h-14 sm:w-14 lg:h-16 lg:w-16 xl:h-20 xl:w-20')}
      />
      <Image
        src={howareyou}
        quality={70}
        alt="Ти як?"
        sizes="(max-width: 639px) 40px, (max-width: 1279px) 48px, 64px"
        className={cn('h-10 w-10 object-contain transition-smooth sm:h-12 sm:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16')}
      />
    </div>
  )
}
