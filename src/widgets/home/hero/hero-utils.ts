import type { StaticImageData } from 'next/image'

import type { HomePageViewModel } from '@/widgets/home/model'
import collegePhoto1 from '@/shared/assets/images/homepage/college_photo1.webp'
import collegePhoto2 from '@/shared/assets/images/homepage/college_photo2.webp'
import collegePhoto3 from '@/shared/assets/images/homepage/college_photo3.webp'

export type HeroSlide = {
  src: string | StaticImageData
  alt: string
  width: number
  height: number
}

const FALLBACK_ALT = 'Zhytomyr Basic Pharmaceutical Professional College'

const fallbackSlides: HeroSlide[] = [
  {
    src: collegePhoto3,
    width: collegePhoto3.width,
    height: collegePhoto3.height,
    alt: FALLBACK_ALT,
  },
  {
    src: collegePhoto1,
    width: collegePhoto1.width,
    height: collegePhoto1.height,
    alt: FALLBACK_ALT,
  },
  {
    src: collegePhoto2,
    width: collegePhoto2.width,
    height: collegePhoto2.height,
    alt: FALLBACK_ALT,
  },
]

export function buildHeroSlides(hero: HomePageViewModel['hero']) {
  if (hero.sliderImages.length === 0) {
    return fallbackSlides
  }

  return hero.sliderImages.map((image) => ({
    src: image.src,
    alt: image.alt || hero.title,
    width: image.width,
    height: image.height,
  }))
}
