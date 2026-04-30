import type {
  CycleCommissionLeftSidebarDynamicZone,
  CycleCommissionPageComponentsDynamicZone,
  CycleCommissionRightSidebarDynamicZone,
  Enum_Cyclecommission_Layout,
} from '@/shared/api/graphql/generated'
import type { ResolvedImage } from '@/shared/lib/media'

type CycleCommissionBlock = NonNullable<
  | NonNullable<NonNullable<CycleCommissionLeftSidebarDynamicZone>[]>
  | NonNullable<NonNullable<CycleCommissionPageComponentsDynamicZone>[]>
  | NonNullable<NonNullable<CycleCommissionRightSidebarDynamicZone>[]>
>[number]

export type RenderableCycleCommissionBlock = Extract<CycleCommissionBlock, { id: string; component_type: string }>

export type CycleCommissionCardViewModel = {
  id: string
  title: string
  href: string
  image: ResolvedImage | null
}

export type CycleCommissionTeacherViewModel = {
  id: string
  name: string
  slug: string
  href: string
  photo: ResolvedImage | null
  position: string | null
  phone: string | null
  email: string | null
  subjects: string[]
}

export type CycleCommissionPageViewModel = {
  id: string
  title: string
  slug: string
  layout: Enum_Cyclecommission_Layout
  seoTitle: string | null
  seoDescription: string | null
  seoMeta: readonly ({ id: string; name: string; content: string } | null)[] | null
  mainPhotos: ResolvedImage[]
  leftBlocks: readonly RenderableCycleCommissionBlock[]
  mainBlocks: readonly RenderableCycleCommissionBlock[]
  rightBlocks: readonly RenderableCycleCommissionBlock[]
  head: CycleCommissionTeacherViewModel | null
  teachers: CycleCommissionTeacherViewModel[]
}

export type CycleCommissionLayoutConfig = {
  columnLayoutClassName: string
  leftClassName?: string
  mainClassName: string
  rightClassName?: string
  peoplePlacement: 'main' | 'right' | null
}

export const CYCLE_COMMISSION_LAYOUTS: Record<Enum_Cyclecommission_Layout, CycleCommissionLayoutConfig> = {
  col_1_8_3: {
    columnLayoutClassName:
      'xl:grid xl:grid-cols-[minmax(0,1.15fr)_minmax(0,7fr)_minmax(260px,3fr)] xl:items-start',
    leftClassName: 'space-y-6',
    mainClassName: 'space-y-8',
    rightClassName: 'space-y-6',
    peoplePlacement: 'main',
  },
  col_2_7_3: {
    columnLayoutClassName:
      'xl:grid xl:grid-cols-[minmax(220px,2fr)_minmax(0,7fr)_minmax(260px,3fr)] xl:items-start',
    leftClassName: 'space-y-6',
    mainClassName: 'space-y-8',
    rightClassName: 'space-y-6',
    peoplePlacement: 'right',
  },
  col_8_4: {
    columnLayoutClassName: 'xl:grid xl:grid-cols-[minmax(0,8fr)_minmax(280px,4fr)] xl:items-start',
    mainClassName: 'space-y-8',
    rightClassName: 'space-y-6',
    peoplePlacement: 'right',
  },
  col_9_3: {
    columnLayoutClassName: 'xl:grid xl:grid-cols-[minmax(0,9fr)_minmax(280px,3fr)] xl:items-start',
    mainClassName: 'space-y-8',
    rightClassName: 'space-y-6',
    peoplePlacement: 'right',
  },
  col_12: {
    columnLayoutClassName: '',
    mainClassName: 'space-y-8',
    peoplePlacement: null,
  },
}

export function filterCycleCommissionBlocks(
  blocks:
    | readonly (CycleCommissionLeftSidebarDynamicZone | null)[]
    | readonly (CycleCommissionPageComponentsDynamicZone | null)[]
    | readonly (CycleCommissionRightSidebarDynamicZone | null)[]
    | null
    | undefined,
) {
  return (blocks ?? []).filter(
    (block): block is RenderableCycleCommissionBlock =>
      Boolean(block && 'id' in block && typeof block.id === 'string' && 'component_type' in block),
  )
}
