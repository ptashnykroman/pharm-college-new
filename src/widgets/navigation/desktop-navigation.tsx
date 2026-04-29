"use client";

import { useRef, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import type { NavigationNode } from "@/shared/lib/navigation";
import { cn } from "@/shared/lib/utils";
import { SmartLink } from "@/widgets/navigation/smart-link";

type DesktopNavigationProps = {
  items: NavigationNode[];
  scrolled: boolean;
};

const VIEWPORT_PADDING = 16;
const SUBMENU_GAP = 8;

export function DesktopNavigation({
  items,
  scrolled,
}: DesktopNavigationProps) {
  return (
    <>
      {items.map((item) => (
        <DesktopNavigationItem key={item.id} item={item} scrolled={scrolled} />
      ))}
    </>
  );
}

function DesktopNavigationItem({
  item,
  scrolled,
}: {
  item: NavigationNode;
  scrolled: boolean;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [alignToEnd, setAlignToEnd] = useState(false);
  const hasChildren = item.children.length > 0;
  const linkClassName = cn(
    "inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium transition-smooth",
    scrolled
      ? "text-foreground hover:bg-accent/60"
      : "text-primary-foreground hover:bg-white/10",
  );

  const updatePlacement = () => {
    const itemElement = itemRef.current;
    const menuElement = menuRef.current;

    if (!itemElement || !menuElement) {
      return;
    }

    const itemRect = itemElement.getBoundingClientRect();
    const menuWidth = menuElement.offsetWidth;
    const viewportWidth = window.innerWidth;

    const overflowWhenStartAligned = Math.max(
      0,
      itemRect.left + menuWidth - (viewportWidth - VIEWPORT_PADDING),
    );
    const overflowWhenEndAligned = Math.max(
      0,
      VIEWPORT_PADDING - (itemRect.right - menuWidth),
    );

    setAlignToEnd(overflowWhenStartAligned > overflowWhenEndAligned);
  };

  if (!hasChildren) {
    return (
      <SmartLink href={item.href} className={linkClassName}>
        {item.label}
      </SmartLink>
    );
  }

  return (
    <div
      ref={itemRef}
      className="group relative"
      onMouseEnter={updatePlacement}
      onFocusCapture={updatePlacement}
    >
      <SmartLink href={item.href} className={linkClassName}>
        {item.label}
        <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:rotate-180" />
      </SmartLink>
      <div
        ref={menuRef}
        className={cn(
          "absolute top-full z-50 min-w-[300px] pt-2",
          alignToEnd ? "right-0" : "left-0",
          "invisible translate-y-1 opacity-0",
          "transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
        )}
      >
        <div className="rounded-xl border border-border bg-popover p-2 shadow-elegant">
          {item.children.map((child) => (
            <DesktopSubNavigationItem key={child.id} item={child} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopSubNavigationItem({ item }: { item: NavigationNode }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [openToLeft, setOpenToLeft] = useState(false);

  const updatePlacement = () => {
    const itemElement = itemRef.current;
    const menuElement = menuRef.current;

    if (!itemElement || !menuElement) {
      return;
    }

    const itemRect = itemElement.getBoundingClientRect();
    const menuWidth = menuElement.offsetWidth;
    const viewportWidth = window.innerWidth;

    const overflowWhenOpeningRight = Math.max(
      0,
      itemRect.right + SUBMENU_GAP + menuWidth - (viewportWidth - VIEWPORT_PADDING),
    );
    const overflowWhenOpeningLeft = Math.max(
      0,
      VIEWPORT_PADDING - (itemRect.left - SUBMENU_GAP - menuWidth),
    );

    setOpenToLeft(overflowWhenOpeningRight > overflowWhenOpeningLeft);
  };

  if (item.children.length === 0) {
    return (
      <SmartLink
        href={item.href}
        className="block rounded-lg px-3 py-2 transition-smooth hover:bg-accent"
      >
        <div className="text-sm font-medium text-foreground">{item.label}</div>
      </SmartLink>
    );
  }

  return (
    <div
      ref={itemRef}
      className="group/sub relative"
      onMouseEnter={updatePlacement}
      onFocusCapture={updatePlacement}
    >
      <SmartLink
        href={item.href}
        className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left transition-smooth hover:bg-accent"
      >
        <div className="text-sm font-medium text-foreground">{item.label}</div>
        <ChevronRight
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            openToLeft && "rotate-180",
          )}
        />
      </SmartLink>
      <div
        ref={menuRef}
        className={cn(
          "absolute top-0 min-w-[300px]",
          openToLeft ? "right-full pr-2" : "left-full pl-2",
          "invisible opacity-0 transition-all duration-200 group-hover/sub:visible group-hover/sub:translate-x-0 group-hover/sub:opacity-100",
          openToLeft ? "translate-x-1" : "-translate-x-1",
        )}
      >
        <div className="rounded-xl border border-border bg-popover p-2 shadow-elegant">
          {item.children.map((leaf) => (
            <SmartLink
              key={leaf.id}
              href={leaf.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-smooth hover:bg-accent"
            >
              {leaf.label}
            </SmartLink>
          ))}
        </div>
      </div>
    </div>
  );
}
