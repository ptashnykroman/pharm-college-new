import { ArrowRight } from 'lucide-react'

import { normalizeHref } from '@/shared/lib/navigation'
import { AppButton } from '@/components/shared/app-button'
import type { ButtonLinkBlock } from '@/widgets/page/cms-page/model'

export function ButtonLinkPageBlock({ block, isSidebar }: { block: ButtonLinkBlock; isSidebar: boolean }) {
  return (
    <AppButton
      href={normalizeHref(block.link)}
      icon={ArrowRight}
      iconPosition="right"
      shape="rounded"
      variant="surface"
      width="full"
    >
      {block.text}
    </AppButton>
  )
}
