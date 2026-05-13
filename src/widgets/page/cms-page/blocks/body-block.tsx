import type { BodyBlock } from "@/widgets/page/cms-page/model";
import { RichText } from "@/widgets/page/cms-page/components/rich-text";

export function BodyPageBlock({ block }: { block: BodyBlock }) {
  return <RichText html={block.body} />;
}
