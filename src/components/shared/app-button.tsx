import Link from 'next/link'
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { isExternalHref, normalizeHref } from '@/shared/lib/navigation'

const appButtonVariants = cva('', {
  variants: {
    variant: {
      default: 'transition-bounce',
      outline: 'transition-smooth',
      secondary: '',
      ghost: '',
      destructive: '',
      link: '',
      glass: 'transition-bounce',
      surface: 'transition-bounce',
    },
    size: {
      default: 'h-12 px-6 has-data-[icon=inline-start]:pl-6 has-data-[icon=inline-end]:pr-5',
      sm: 'h-10 px-5 has-data-[icon=inline-start]:pl-5 has-data-[icon=inline-end]:pr-4',
      icon: 'size-9 hover:scale-110',
    },
    width: {
      content: 'w-fit',
      full: 'w-full',
    },
    shape: {
      default: 'rounded-md',
      rounded: 'rounded-full',
    },
  },
  compoundVariants: [
    {
      variant: 'link',
      className: 'h-auto px-0',
    },
  ],
  defaultVariants: {
    size: 'default',
    width: 'content',
    shape: 'default',
  },
})

type ButtonVariant = NonNullable<React.ComponentProps<typeof Button>['variant']>
type AppButtonIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>

type AppButtonSharedProps = VariantProps<typeof appButtonVariants> & {
  children: React.ReactNode
  className?: string
  href?: string
  icon?: AppButtonIcon
  iconPosition?: 'left' | 'right'
  variant?: ButtonVariant
}

type AppButtonAsButtonProps = AppButtonSharedProps &
  Omit<React.ComponentPropsWithoutRef<'button'>, 'children' | 'className'>

type AppButtonAsLinkProps = AppButtonSharedProps &
  Omit<React.ComponentPropsWithoutRef<'a'>, 'children' | 'className' | 'href'> & {
    href: string
  }

type AppButtonProps = AppButtonAsButtonProps | AppButtonAsLinkProps

function AppButton({
  children,
  className,
  href,
  icon: Icon,
  iconPosition = 'left',
  shape = 'default',
  size = 'default',
  variant = 'default',
  width = 'content',
  ...props
}: AppButtonProps) {
  const content = (
    <>
      {Icon && iconPosition === 'left' ? <Icon data-icon="inline-start" className="transition-bounce" /> : null}
      <span className="min-w-0 truncate">{children}</span>
      {Icon && iconPosition === 'right' ? (
        <Icon
          data-icon="inline-end"
          className={cn('transition-bounce', variant === 'surface' && 'group-hover/button:translate-x-1')}
        />
      ) : null}
    </>
  )

  const resolvedClassName = cn(appButtonVariants({ shape, size, variant, width }), className)

  if (href) {
    const linkProps = props as Omit<React.ComponentPropsWithoutRef<'a'>, 'children' | 'className' | 'href'>

    if (isExternalHref(href)) {
      return (
        <Button asChild className={resolvedClassName} variant={variant}>
          <a
            href={href}
            {...linkProps}
            rel={linkProps.target === '_blank' ? (linkProps.rel ?? 'noreferrer') : linkProps.rel}
          >
            {content}
          </a>
        </Button>
      )
    }

    return (
      <Button asChild className={resolvedClassName} variant={variant}>
        <Link href={normalizeHref(href)} {...linkProps}>
          {content}
        </Link>
      </Button>
    )
  }

  const buttonProps = props as Omit<React.ComponentPropsWithoutRef<'button'>, 'children' | 'className'>

  return (
    <Button className={resolvedClassName} variant={variant} {...buttonProps}>
      {content}
    </Button>
  )
}

export { AppButton }
export type { AppButtonProps, ButtonVariant as AppButtonVariant }
