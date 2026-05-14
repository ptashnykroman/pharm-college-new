'use client'

function throwSentrySourceMapTestError() {
  // Intentionally throws to validate Sentry source maps against the original source file.
  throw new Error('Sentry source map smoke test: client button click')
}

export function SentrySourceMapTestButton() {
  return (
    <button
      type="button"
      onClick={throwSentrySourceMapTestError}
      className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
    >
      Кинути тестову помилку
    </button>
  )
}
