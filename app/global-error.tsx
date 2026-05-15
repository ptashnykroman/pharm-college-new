'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import { ArrowRight } from 'lucide-react'

import { AppButton } from '@/components/shared/app-button'

type GlobalErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="uk">
      <body className="min-h-screen bg-background text-foreground">
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-4 px-6 py-16 text-center">
          <h1 className="text-3xl font-semibold">Сталася критична помилка</h1>
          <p className="max-w-xl text-balance text-muted-foreground">
            Ми вже отримали звіт про збій. Спробуйте перезавантажити сторінку трохи пізніше.
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
        </main>
      </body>
    </html>
  )
}
