import Image from "next/image";

import { cn } from "@/lib/utils";
import { resolveImage } from "@/shared/lib/media";
import { PageColumn } from "@/widgets/page/cms-page/components/page-column";
import { PAGE_LAYOUTS, filterBlocks, type CmsPageData } from "@/widgets/page/cms-page/model";

export { type CmsPageData } from "@/widgets/page/cms-page/model";

export function CmsPage({ page }: { page: CmsPageData }) {
  const layout = PAGE_LAYOUTS[page.layout] ?? PAGE_LAYOUTS.col_12;
  const mainPhoto = resolveImage(page.main_photo, "hero", page.title);
  const pageDescription = page.SEO.description?.trim();
  const leftBlocks = filterBlocks(page.left_sidebar);
  const mainBlocks = filterBlocks(page.page_components);
  const rightBlocks = filterBlocks(page.right_sidebar);

  return (
    <section className="relative pb-20 pt-10 md:pb-24 md:pt-14">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-5xl text-center">
          {/* <h1 className="text-3xl font-black text-foreground sm:text-4xl lg:text-5xl">{page.title}</h1> */}

          {pageDescription ? (
            <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-foreground/80">{pageDescription}</p>
          ) : null}
        </div>

        {mainPhoto ? (
          <div className="mt-8">
            <div className="overflow-hidden rounded-[2rem] border border-border/80 bg-white shadow-card">
              <Image
                src={mainPhoto.src}
                alt={mainPhoto.alt}
                width={mainPhoto.width}
                height={mainPhoto.height}
                className="max-h-[400px] w-full object-cover"
                priority
              />
            </div>
          </div>
        ) : null}

        <div className={cn("mt-8 gap-6", layout.columnLayoutClassName)}>
          <PageColumn blocks={leftBlocks} className={layout.leftClassName} isSidebar />

          <div className={cn(layout.mainClassName)}>
            <PageColumn blocks={mainBlocks} />
          </div>
          
          <PageColumn blocks={rightBlocks} className={layout.rightClassName} isSidebar />
        </div>
      </div>
    </section>
  );
}
