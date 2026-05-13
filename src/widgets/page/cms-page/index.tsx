import Image from "next/image";

import { cn } from "@/lib/utils";
import { resolveImage } from "@/shared/lib/media";
import { PageColumn } from "@/widgets/page/cms-page/components/page-column";
import {
  PAGE_LAYOUTS,
  filterBlocks,
  type CmsPageData,
} from "@/widgets/page/cms-page/model";

export { type CmsPageData } from "@/widgets/page/cms-page/model";

export function CmsPage({ page }: { page: CmsPageData }) {
  const layout = PAGE_LAYOUTS[page.layout] ?? PAGE_LAYOUTS.col_12;
  const hasLeftColumn = Boolean(layout.leftClassName);
  const hasRightColumn = Boolean(layout.rightClassName);
  const mainPhoto = resolveImage(page.main_photo, "hero", page.title);
  const pageDescription = page.SEO.description?.trim();
  const leftBlocks = filterBlocks(page.left_sidebar);
  const mainBlocks = filterBlocks(page.page_components);
  const rightBlocks = filterBlocks(page.right_sidebar);

  return (
    <section className="relative pb-20 pt-10 md:pb-24 md:pt-14">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="font-black text-foreground text-xl xs:text-2xl sm:text-3xl lg:text-4xl">
            {page.title}
          </h1>

          {pageDescription ? (
            <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-foreground/80">
              {pageDescription}
            </p>
          ) : null}
        </div>

        {mainPhoto ? (
          <div className="mt-8">
            <div className="overflow-hidden rounded-[2rem] border border-border/80 bg-white shadow-card">
              <Image
                priority
                src={mainPhoto.src}
                alt={mainPhoto.alt}
                width={mainPhoto.width}
                height={mainPhoto.height}
                className="max-h-[400px] w-full object-cover"
              />
            </div>
          </div>
        ) : null}

        <div className={cn("mt-8 gap-6", layout.columnLayoutClassName)}>
          {hasLeftColumn ? (
            <PageColumn
              isSidebar
              blocks={leftBlocks}
              className={layout.leftClassName}
            />
          ) : null}

          <div className={cn(layout.mainClassName)}>
            <PageColumn blocks={mainBlocks} />
          </div>

          {hasRightColumn ? (
            <PageColumn
              isSidebar
              blocks={rightBlocks}
              className={layout.rightClassName}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
