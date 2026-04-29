// import type { LucideIcon } from 'lucide-react'
// import { Link, Calendar, CalendarRange, PhoneCall } from 'lucide-react'
// import type { StaticImageData } from 'next/image'
// import LCloud from '@/shared/assets/icons/header/lcloud.png'
// import Moodle from '@/shared/assets/icons/header/moodle.png'
// import Library from '@/shared/assets/icons/header/library.png'

// export type QuickLinkIcon = { kind: 'image'; src: StaticImageData } | { kind: 'icon'; icon: LucideIcon }

// const imageIcon = (src: StaticImageData): QuickLinkIcon => ({ kind: 'image', src })
// const lucideIcon = (icon: LucideIcon): QuickLinkIcon => ({ kind: 'icon', icon })

// export function getQuickLinkIcon(label: string): QuickLinkIcon {
//   const source = label.trim().toLowerCase()
//   if (source.includes('lcloud')) {
//     return imageIcon(LCloud)
//   }

//   if (source.includes('moodle')) {
//     return imageIcon(Moodle)
//   }

//   if (source.includes('бібліотека')) {
//     return imageIcon(Library)
//   }

//   if (source.includes('розклад') || source.includes('rozklad')) {
//     return lucideIcon(Calendar)
//   }

//   if (source.includes('граф') || source.includes('graf')) {
//     return lucideIcon(CalendarRange)
//   }

//   if (source.includes('ліні') || source.includes('line') || source.includes('hotline')) {
//     return lucideIcon(PhoneCall)
//   }

//   return lucideIcon(Link)
// }
