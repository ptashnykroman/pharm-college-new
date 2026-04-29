import type {
  AccordionBlock,
  BodyBlock,
  ButtonImagesBlock,
  ButtonLinkBlock,
  EducationBooksBlock,
  FrameBlock,
  FullSizePersonBlock,
  PageCardsBlock,
  PanoramasBlock,
  PartnersBlock,
  PersonBlock,
  PhotosGalleryBlock,
  RenderablePageBlock,
  TwoColumnWithImageBlock,
} from "@/widgets/page/cms-page/model";
import { AccordionPageBlock } from "@/widgets/page/cms-page/blocks/accordion-block";
import { BodyPageBlock } from "@/widgets/page/cms-page/blocks/body-block";
import { ButtonImagesPageBlock } from "@/widgets/page/cms-page/blocks/button-images-block";
import { ButtonLinkPageBlock } from "@/widgets/page/cms-page/blocks/button-link-block";
import { EducationBooksPageBlock } from "@/widgets/page/cms-page/blocks/education-books-block";
import { FramePageBlock } from "@/widgets/page/cms-page/blocks/frame-block";
import { FullSizePersonPageBlock } from "@/widgets/page/cms-page/blocks/full-size-person-block";
import { PageCardsPageBlock } from "@/widgets/page/cms-page/blocks/page-cards-block";
import { PanoramasPageBlock } from "@/widgets/page/cms-page/blocks/panoramas-block";
import { PartnersPageBlock } from "@/widgets/page/cms-page/blocks/partners-block";
import { PersonPageBlock } from "@/widgets/page/cms-page/blocks/person-block";
import { PhotosGalleryPageBlock } from "@/widgets/page/cms-page/blocks/photos-gallery-block";
import { TwoColumnWithImagePageBlock } from "@/widgets/page/cms-page/blocks/two-column-with-image-block";

export function PageBlockRenderer({
  block,
  isSidebar,
}: {
  block: RenderablePageBlock;
  isSidebar: boolean;
}) {
  switch (block.component_type) {
    case "body":
      return <BodyPageBlock block={block as BodyBlock} isSidebar={isSidebar} />;
    case "accordion":
      return <AccordionPageBlock block={block as AccordionBlock} />;
    case "button_link":
      return <ButtonLinkPageBlock block={block as ButtonLinkBlock} isSidebar={isSidebar} />;
    case "photos_gallery":
      return <PhotosGalleryPageBlock block={block as PhotosGalleryBlock} />;
    case "two_col_with_image":
      return <TwoColumnWithImagePageBlock block={block as TwoColumnWithImageBlock} />;
    case "person":
      return <PersonPageBlock block={block as PersonBlock} />;
    case "page_cards":
      return <PageCardsPageBlock block={block as PageCardsBlock} />;
    case "partners":
      return <PartnersPageBlock block={block as PartnersBlock} />;
    case "education_books":
      return <EducationBooksPageBlock block={block as EducationBooksBlock} />;
    case "full-size-person":
      return <FullSizePersonPageBlock block={block as FullSizePersonBlock} />;
    case "button_images":
      return <ButtonImagesPageBlock block={block as ButtonImagesBlock} />;
    case "panoramas":
      return <PanoramasPageBlock block={block as PanoramasBlock} />;
    case "frame":
      return <FramePageBlock block={block as FrameBlock} />;
    default:
      return null;
  }
}
