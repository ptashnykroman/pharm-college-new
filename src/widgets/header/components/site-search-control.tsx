'use client'

import { LoaderCircle, Search } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

type SiteSearchDialogComponent = typeof import('@/widgets/search/site-search-dialog').SiteSearchDialog

const SEARCH_LABEL = 'Пошук'
const SEARCH_LOADING_TITLE = 'Завантажуємо пошук'
const SEARCH_LOADING_DESCRIPTION = 'Готуємо діалог пошуку по сайту.'

let siteSearchDialogPromise: Promise<SiteSearchDialogComponent> | null = null

function loadSiteSearchDialog() {
  if (!siteSearchDialogPromise) {
    siteSearchDialogPromise = import('@/widgets/search/site-search-dialog').then((mod) => mod.SiteSearchDialog)
  }

  return siteSearchDialogPromise
}

export function SiteSearchControl() {
  const mountedRef = useRef(true)
  const shouldOpenAfterLoadRef = useRef(false)
  const [dialogComponent, setDialogComponent] = useState<SiteSearchDialogComponent | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const warmDialog = useCallback(async () => {
    if (dialogComponent) {
      return dialogComponent
    }

    const nextDialogComponent = await loadSiteSearchDialog()

    if (mountedRef.current) {
      setDialogComponent(() => nextDialogComponent)
    }

    return nextDialogComponent
  }, [dialogComponent])

  const openSearch = useCallback(async () => {
    shouldOpenAfterLoadRef.current = true

    if (dialogComponent) {
      setOpen(true)
      return
    }

    setLoading(true)

    try {
      const nextDialogComponent = await warmDialog()

      if (!mountedRef.current || !shouldOpenAfterLoadRef.current) {
        return
      }

      setDialogComponent(() => nextDialogComponent)
      setOpen(true)
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, [dialogComponent, warmDialog])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'k') {
        return
      }

      event.preventDefault()
      void openSearch()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [openSearch])

  const handleDialogOpenChange = (nextOpen: boolean) => {
    shouldOpenAfterLoadRef.current = nextOpen
    setOpen(nextOpen)
  }

  const DialogComponent = dialogComponent

  return (
    <>
      <button
        type="button"
        onClick={() => void openSearch()}
        onMouseEnter={() => void warmDialog()}
        onFocus={() => void warmDialog()}
        onTouchStart={() => void warmDialog()}
        className="header-action-button inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg"
        aria-label={SEARCH_LABEL}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {loading && !open ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
      </button>

      {!dialogComponent && loading ? (
        <div className="fixed inset-0 z-[70] flex items-start justify-center bg-[rgba(var(--foreground),0.32)] px-4 pt-24 backdrop-blur-sm">
          <div
            role="status"
            aria-live="polite"
            className="w-full max-w-xl overflow-hidden rounded-[1.75rem] border border-[rgba(var(--border),0.7)] bg-white shadow-elegant"
          >
            <div className="border-b border-[rgba(var(--border),0.7)] bg-gradient-soft px-5 py-4 text-left">
              <p className="text-lg font-black text-foreground">{SEARCH_LOADING_TITLE}</p>
            </div>
            <div className="flex min-h-[18rem] items-center justify-center px-6 py-10 text-center">
              <div>
                <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-primary" />
                <p className="mt-4 text-sm leading-6 text-[rgba(var(--foreground),0.68)]">
                  {SEARCH_LOADING_DESCRIPTION}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {DialogComponent ? <DialogComponent open={open} onOpenChange={handleDialogOpenChange} /> : null}
    </>
  )
}
