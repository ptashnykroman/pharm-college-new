import type {
  Enum_Subdivision_Layout,
  Enum_Vidilenya_Layout,
  SubdivisionLeftSidebarDynamicZone,
  SubdivisionPageComponentsDynamicZone,
  SubdivisionRightSidebarDynamicZone,
  VidilenyaLeftSidebarDynamicZone,
  VidilenyaPageComponentsDynamicZone,
  VidilenyaRightSidebarDynamicZone,
} from '@/shared/api/graphql/generated'
import type { ResolvedImage } from '@/shared/lib/media'

type StructureSectionBlock = NonNullable<
  | NonNullable<SubdivisionLeftSidebarDynamicZone>
  | NonNullable<SubdivisionPageComponentsDynamicZone>
  | NonNullable<SubdivisionRightSidebarDynamicZone>
  | NonNullable<VidilenyaLeftSidebarDynamicZone>
  | NonNullable<VidilenyaPageComponentsDynamicZone>
  | NonNullable<VidilenyaRightSidebarDynamicZone>
>

export type RenderableStructureSectionBlock = Extract<
  StructureSectionBlock,
  { id: string; component_type: string }
>

export type StructureSectionCardViewModel = {
  id: string
  title: string
  href: string
  image: ResolvedImage | null
}

export type StructureSectionPageViewModel = {
  id: string
  title: string
  slug: string
  layout: Enum_Subdivision_Layout | Enum_Vidilenya_Layout
  seoTitle: string | null
  seoDescription: string | null
  seoMeta: readonly ({ id: string; name: string; content: string } | null)[] | null
  mainPhotos: ResolvedImage[]
  leftBlocks: readonly RenderableStructureSectionBlock[]
  mainBlocks: readonly RenderableStructureSectionBlock[]
  rightBlocks: readonly RenderableStructureSectionBlock[]
}

export type StructureSectionLayoutConfig = {
  columnLayoutClassName: string
  leftClassName?: string
  mainClassName: string
  rightClassName?: string
}

export const STRUCTURE_SECTION_LAYOUTS: Record<string, StructureSectionLayoutConfig> = {
  col_1_8_3: {
    columnLayoutClassName:
      'xl:grid xl:grid-cols-[minmax(0,1.15fr)_minmax(0,7fr)_minmax(260px,3fr)] xl:items-start',
    leftClassName: 'space-y-6',
    mainClassName: 'space-y-8',
    rightClassName: 'space-y-6',
  },
  col_2_7_3: {
    columnLayoutClassName:
      'xl:grid xl:grid-cols-[minmax(220px,2fr)_minmax(0,7fr)_minmax(260px,3fr)] xl:items-start',
    leftClassName: 'space-y-6',
    mainClassName: 'space-y-8',
    rightClassName: 'space-y-6',
  },
  col_8_4: {
    columnLayoutClassName: 'xl:grid xl:grid-cols-[minmax(0,8fr)_minmax(280px,4fr)] xl:items-start',
    mainClassName: 'space-y-8',
    rightClassName: 'space-y-6',
  },
  col_9_3: {
    columnLayoutClassName: 'xl:grid xl:grid-cols-[minmax(0,9fr)_minmax(280px,3fr)] xl:items-start',
    mainClassName: 'space-y-8',
    rightClassName: 'space-y-6',
  },
  col_12: {
    columnLayoutClassName: '',
    mainClassName: 'space-y-8',
  },
}

export function filterStructureSectionBlocks(
  blocks:
    | readonly (SubdivisionLeftSidebarDynamicZone | null)[]
    | readonly (SubdivisionPageComponentsDynamicZone | null)[]
    | readonly (SubdivisionRightSidebarDynamicZone | null)[]
    | readonly (VidilenyaLeftSidebarDynamicZone | null)[]
    | readonly (VidilenyaPageComponentsDynamicZone | null)[]
    | readonly (VidilenyaRightSidebarDynamicZone | null)[]
    | null
    | undefined,
) {
  return (blocks ?? []).filter(
    (block): block is RenderableStructureSectionBlock =>
      Boolean(block && 'id' in block && typeof block.id === 'string' && 'component_type' in block),
  )
}
