'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

type AppErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AppError({ error, reset }: AppErrorProps) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 px-6 py-16 text-center">
Sentry capture      <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Sentry capture</p>
      <h1 className="text-3xl font-semibold text-foreground">Сталася помилка</h1>
      <p className="max-w-xl text-balance text-muted-foreground">
        Ми вже зафіксували цю проблему. Спробуйте оновити сторінку або повторити дію ще раз.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        Спробувати ще раз
      </button>
    </div>
  )
}
