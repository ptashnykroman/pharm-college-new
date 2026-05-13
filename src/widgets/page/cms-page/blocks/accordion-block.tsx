import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { AccordionBlock } from "@/widgets/page/cms-page/model";
import { RichText } from "@/widgets/page/cms-page/components/rich-text";

export function AccordionPageBlock({ block }: { block: AccordionBlock }) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={block.default_open ? block.id : undefined}
      className="gap-0"
    >
      <AccordionItem value={block.id}>
        <AccordionTrigger>{block.title}</AccordionTrigger>
        <AccordionContent>
          <RichText html={block.body} className="!text-sm sm:!text-base leading-6" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
