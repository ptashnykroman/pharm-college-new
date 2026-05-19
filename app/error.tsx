'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import { ArrowRight } from 'lucide-react'

import { AppButton } from '@/components/shared/app-button'
import { InnerPageHero } from '@/widgets/page/inner-page-hero'

const ERROR_BREADCRUMBS = [{ label: 'Головна', href: '/', current: false }] as const

type AppErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AppError({ error, reset }: AppErrorProps) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <>
      <InnerPageHero breadcrumbs={ERROR_BREADCRUMBS} />

      <div className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <h1 className="text-3xl font-black text-foreground">Сталася помилка</h1>
        <p className="max-w-xl text-balance text-muted-foreground">
          Ми вже зафіксували цю проблему. Спробуйте оновити сторінку або повторити дію ще раз.
        </p>
        <AppButton
          onClick={() => reset()}
          icon={ArrowRight}
          iconPosition="right"
          shape="rounded"
          variant="surface"
          width="content"
          type="button"
        >
          Спробувати ще раз
        </AppButton>
      </div>
    </>
  )
}
