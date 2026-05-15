import { ChevronRight } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

import type { NavigationNode } from '@/shared/lib/navigation'
import { SmartLink } from '@/widgets/navigation/smart-link'

type MobileNavigationListProps = {
  items: NavigationNode[]
  isActive: boolean
  onClose: () => void
  stack: NavigationNode[]
  setStack: Dispatch<SetStateAction<NavigationNode[]>>
}

export function MobileNavigationList({ items, isActive, onClose, stack, setStack }: MobileNavigationListProps) {
  return (
    <ul className="flex flex-col gap-0.5 px-3 flex-1">
      {items.map((node) => {
        const hasChildren = node.children.length > 0

        return (
          <li key={node.id}>
            <div className="flex items-stretch gap-2">
              <SmartLink
                href={node.href}
                prefetch={false}
                onClick={onClose}
                className="min-w-0 flex-1 rounded-xl px-3 py-3 text-[15px] font-medium text-foreground transition-smooth hover:bg-accent"
              >
                <span className="block truncate">{node.label}</span>
              </SmartLink>
              {hasChildren ? (
                <button
                  type="button"
                  onClick={() => (isActive ? setStack((currentStack) => [...currentStack, node]) : undefined)}
                  aria-label={`Відкрити підменю ${node.label}`}
                  className="inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-[rgba(var(--accent),0.6)] text-muted-foreground transition-smooth hover:bg-accent active:bg-accent"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              ) : null}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
