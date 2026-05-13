import type {
  Enum_Page_Layout,
  GetPageByPathQuery,
} from "@/shared/api/graphql/generated";

type PageEntry = NonNullable<
  NonNullable<GetPageByPathQuery["pages"]>["data"][number]
>;

export type CmsPageData = NonNullable<PageEntry["attributes"]>;

type PageBlock = NonNullable<
  | NonNullable<CmsPageData["left_sidebar"]>[number]
  | NonNullable<CmsPageData["page_components"]>[number]
  | NonNullable<CmsPageData["right_sidebar"]>[number]
>;

export type RenderablePageBlock = Extract<
  PageBlock,
  { id: string; component_type: string }
>;
export type BodyBlock = Extract<
  RenderablePageBlock,
  { __typename?: "ComponentPageBlocksBody" }
>;
export type AccordionBlock = Extract<
  RenderablePageBlock,
  { __typename?: "ComponentPageBlocksAccordion" }
>;
export type ButtonLinkBlock = Extract<
  RenderablePageBlock,
  { __typename?: "ComponentPageBlocksButtonLink" }
>;
export type PhotosGalleryBlock = Extract<
  RenderablePageBlock,
  { __typename?: "ComponentPageBlocksPhotosGallery" }
>;
export type TwoColumnWithImageBlock = Extract<
  RenderablePageBlock,
  { __typename?: "ComponentPageBlocksTwoColumnWithImage" }
>;
export type PersonBlock = Extract<
  RenderablePageBlock,
  { __typename?: "ComponentPageBlocksPerson" }
>;
export type PageCardsBlock = Extract<
  RenderablePageBlock,
  { __typename?: "ComponentPageBlocksPageCards" }
>;
export type PartnersBlock = Extract<
  RenderablePageBlock,
  { __typename?: "ComponentPageBlocksPartnersBlock" }
>;
export type EducationBooksBlock = Extract<
  RenderablePageBlock,
  { __typename?: "ComponentPageBlocksEducationBooks" }
>;
export type FullSizePersonBlock = Extract<
  RenderablePageBlock,
  { __typename?: "ComponentPageBlocksFullSizePerson" }
>;
export type ButtonImagesBlock = Extract<
  RenderablePageBlock,
  { __typename?: "ComponentPageBlocksButtonImages" }
>;
export type PanoramasBlock = Extract<
  RenderablePageBlock,
  { __typename?: "ComponentPageBlocksPanorams" }
>;
export type FrameBlock = Extract<
  RenderablePageBlock,
  { __typename?: "ComponentPageBlocksFrame" }
>;

export type LayoutConfig = {
  columnLayoutClassName: string;
  leftClassName?: string;
  mainClassName: string;
  rightClassName?: string;
};

export const PAGE_LAYOUTS: Record<Enum_Page_Layout, LayoutConfig> = {
  col_1_8_3: {
    columnLayoutClassName:
      "xl:grid xl:grid-cols-[minmax(0,1.15fr)_minmax(0,7fr)_minmax(260px,3fr)] xl:items-start",
    leftClassName: "space-y-6",
    mainClassName: "space-y-6 my-8 lg:my-0",
    rightClassName: "space-y-6",
  },
  col_2_7_3: {
    columnLayoutClassName:
      "xl:grid xl:grid-cols-[minmax(220px,2fr)_minmax(0,7fr)_minmax(260px,3fr)] xl:items-start",
    leftClassName: "space-y-6",
    mainClassName: "space-y-6 my-8 lg:my-0",
    rightClassName: "space-y-6",
  },
  col_2_8_2: {
    columnLayoutClassName:
      "xl:grid xl:grid-cols-[minmax(220px,2fr)_minmax(0,8fr)_minmax(220px,2fr)] xl:items-start",
    leftClassName: "space-y-6",
    mainClassName: "space-y-6 my-8 lg:my-0",
    rightClassName: "space-y-6",
  },
  col_6_6: {
    columnLayoutClassName: "xl:grid xl:grid-cols-2 xl:items-start",
    mainClassName: "space-y-6 mb-8 lg:mb-0",
    rightClassName: "space-y-6",
  },
  col_8_4: {
    columnLayoutClassName:
      "lg:grid lg:grid-cols-[minmax(0,8fr)_minmax(280px,4fr)] lg:items-start",
    mainClassName: "space-y-6 mb-8 lg:mb-0",
    rightClassName: "space-y-4",
  },
  col_9_3: {
    columnLayoutClassName:
      "lg:grid lg:grid-cols-[minmax(0,9fr)_minmax(280px,3fr)] lg:items-start",
    mainClassName: "space-y-6 mb-8 lg:mb-0",
    rightClassName: "space-y-4",
  },
  col_12: {
    columnLayoutClassName: "",
    mainClassName: "space-y-6",
  },
  col_12_container: {
    columnLayoutClassName: "",
    mainClassName: "space-y-6",
  },
};

export function filterBlocks(
  blocks:
    | CmsPageData["page_components"]
    | CmsPageData["left_sidebar"]
    | CmsPageData["right_sidebar"],
) {
  return (blocks ?? []).filter((block): block is RenderablePageBlock =>
    Boolean(block && "id" in block && "component_type" in block),
  );
}
