import type { Metadata } from 'next'

import { SentrySourceMapTestButton } from '@/widgets/sentry/sentry-source-map-test-button'

export const metadata: Metadata = {
  title: 'Sentry Source Map Test',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SentryTestPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Sentry smoke test</p>
        <h1 className="text-4xl font-semibold text-foreground">Перевірка source maps у Sentry</h1>
        <p className="max-w-2xl text-balance text-muted-foreground">
          Натисни кнопку нижче на проді. Вона навмисно кине client-side помилку, щоб у Sentry можна було
          перевірити точний файл і рядок у stack trace.
        </p>
      </div>

      <SentrySourceMapTestButton />

      <p className="max-w-xl text-sm text-muted-foreground">
        Після кліку відкрий подію в Sentry і перевір, що стек веде в оригінальний `.tsx` файл, а не в
        мінімізований чанк.
      </p>
    </main>
  )
}
