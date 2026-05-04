import * as React from 'react'
import { Accordion as AccordionPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'
import { PlusIcon } from 'lucide-react'

function Accordion({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root data-slot="accordion" className={cn('flex w-full flex-col gap-4', className)} {...props} />
  )
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('overflow-hidden rounded-[2rem] border border-border/80 bg-white shadow-soft', className)}
      {...props}
    />
  )
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group/accordion-trigger flex flex-1 items-center justify-between gap-4 cursor-pointer px-5 py-4 text-left text-lg font-bold text-foreground transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 md:px-6',
          className,
        )}
        {...props}
      >
        {children}
        <PlusIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 text-primary transition-transform duration-400 group-data-[state=open]/accordion-trigger:rotate-45"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden border-t border-border/70 text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div className={cn('h-(--radix-accordion-content-height) px-5 py-5 md:px-6', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
