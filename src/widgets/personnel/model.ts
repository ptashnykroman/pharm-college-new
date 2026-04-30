import type { ResolvedImage } from '@/shared/lib/media'

export type AdministrationCardViewModel = {
  id: string
  name: string
  position: string | null
  phone: string | null
  email: string | null
  photo: ResolvedImage | null
}

export type CommissionOption = {
  id: string
  name: string
  slug: string
}

export type TeacherCardViewModel = {
  id: string
  name: string
  href: string
  photo: ResolvedImage | null
  cycleCommission: CommissionOption
  subjects: string[]
}

export type TeacherProfileViewModel = {
  id: string
  name: string
  slug: string
  photo: ResolvedImage | null
  email: string | null
  phone: string | null
  position: string | null
  status: string | null
  additionalInformation: string | null
  printedWorks: string | null
  calendarId: string | null
  cycleCommission: CommissionOption
  subjects: string[]
}

export type PersonnelHeroViewModel = {
  slides: {
    id: string
    imageSrc: string
    imageAlt: string
    imageWidth: number
    imageHeight: number
  }[]
}
