import type { AccordionBlock } from "@/widgets/page/cms-page/model";
import { RichText } from "@/widgets/page/cms-page/components/rich-text";

export function AccordionPageBlock({ block }: { block: AccordionBlock }) {
  return (
    <details
      open={block.default_open}
      className="group rounded-[2rem] border border-border/80 bg-white shadow-soft"
    >
      <summary className="cursor-pointer list-none px-5 py-4 text-lg font-bold text-foreground marker:hidden md:px-6">
        <span className="flex items-center justify-between gap-4">
          <span>{block.title}</span>
          <span className="text-2xl text-primary transition-transform group-open:rotate-45">+</span>
        </span>
      </summary>
      <div className="border-t border-border/70 px-5 py-5 md:px-6">
        <RichText html={block.body} className="text-base leading-7" />
      </div>
    </details>
  );
}
