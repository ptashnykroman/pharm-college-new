'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

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
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Sentry capture</p>
          <h1 className="text-3xl font-semibold">Сталася критична помилка</h1>
          <p className="max-w-xl text-balance text-muted-foreground">
            Ми вже отримали звіт про збій. Спробуйте перезавантажити сторінку трохи пізніше.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Спробувати ще раз
          </button>
        </main>
      </body>
    </html>
  )
}
