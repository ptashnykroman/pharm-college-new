import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button [&_span]:relative [&_span]:z-10 cursor-pointer inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-[rgba(var(--ring),0.5)] active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-[rgba(var(--destructive),0.2)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-primary font-semibold text-primary-foreground shadow-soft hover:scale-[1.02] hover:text-primary-foreground",
        outline: "border-border bg-transparent font-semibold hover:bg-accent",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[rgba(var(--secondary),0.8)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "bg-[rgba(var(--destructive),0.1)] text-destructive hover:bg-[rgba(var(--destructive),0.2)] focus-visible:border-[rgba(var(--destructive),0.4)] focus-visible:ring-[rgba(var(--destructive),0.2)]",
        link: "text-primary underline-offset-4 hover:underline",
        glass:
          "text-base border-[rgba(255,255,255,0.25)] bg-[rgba(255,255,255,0.1)] font-semibold text-white backdrop-blur-md hover:scale-105 hover:bg-accent-gold hover:text-accent-gold-foreground",
        // surface:
        //   "border-[rgba(var(--primary),0.2)] bg-card font-semibold text-primary shadow-soft hover:-translate-y-0.5 hover:border-transparent hover:[background-image:var(--gradient-primary)] hover:text-primary-foreground",
        surface:
          "relative overflow-hidden border-[rgba(var(--primary),0.2)] bg-card font-semibold text-primary shadow-soft hover:-translate-y-0.5 hover:border-transparent before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 before:[background-image:var(--gradient-primary)] before:content-[''] before:z-0 hover:before:opacity-100 hover:text-primary-foreground",
      },
      size: {
        default:
          "min-h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "min-h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "min-h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
        lg: "min-h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-9",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  // return (
  //   <Comp
  //     data-slot="button"
  //     data-variant={variant}
  //     data-size={size}
  //     style={
  //       variant === "surface" ? { transition: "all 0.3s ease-in-out" } : {}
  //     }
  //     className={cn(buttonVariants({ variant, size, className }))}
  //     {...props}
  //   />
  // );
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {asChild ? (
        props.children
      ) : (
        <span className="relative z-10 flex gap-2 items-center">{props.children}</span>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
