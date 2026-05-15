'use client'

import { Command, LoaderCircle, Search } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type SiteSearchDialogPanelComponent = typeof import('@/widgets/search/site-search-dialog').SiteSearchDialogPanel

const SEARCH_LABEL = 'Пошук'
const SEARCH_DIALOG_CONTENT_CLASS_NAME =
  'w-full max-w-[95vw] sm:!max-w-xl gap-0 overflow-hidden border border-[rgba(var(--border),0.7)] bg-white p-0 shadow-elegant'

let siteSearchDialogPromise: Promise<SiteSearchDialogPanelComponent> | null = null

function loadSiteSearchDialogPanel() {
  if (!siteSearchDialogPromise) {
    siteSearchDialogPromise = import('@/widgets/search/site-search-dialog').then((mod) => mod.SiteSearchDialogPanel)
  }

  return siteSearchDialogPromise
}

export function SiteSearchControl() {
  const mountedRef = useRef(true)
  const shouldOpenAfterLoadRef = useRef(false)
  const [dialogPanelComponent, setDialogPanelComponent] = useState<SiteSearchDialogPanelComponent | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const warmDialog = useCallback(async () => {
    if (dialogPanelComponent) {
      return dialogPanelComponent
    }

    const nextDialogPanelComponent = await loadSiteSearchDialogPanel()

    if (mountedRef.current) {
      setDialogPanelComponent(() => nextDialogPanelComponent)
    }

    return nextDialogPanelComponent
  }, [dialogPanelComponent])

  const openSearch = useCallback(async () => {
    shouldOpenAfterLoadRef.current = true
    setOpen(true)

    if (dialogPanelComponent) {
      return
    }

    setLoading(true)

    try {
      const nextDialogPanelComponent = await warmDialog()

      if (!mountedRef.current || !shouldOpenAfterLoadRef.current) {
        return
      }

      setDialogPanelComponent(() => nextDialogPanelComponent)
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, [dialogPanelComponent, warmDialog])

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

    if (!nextOpen) {
      setLoading(false)
    }

    setOpen(nextOpen)
  }

  const DialogPanelComponent = dialogPanelComponent

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
        <Search className="h-5 w-5" />
      </button>

      {open ? (
        <Dialog open={open} onOpenChange={handleDialogOpenChange}>
          <DialogContent className={SEARCH_DIALOG_CONTENT_CLASS_NAME}>
            {DialogPanelComponent && !loading ? (
              <DialogPanelComponent open={open} onOpenChange={handleDialogOpenChange} />
            ) : (
              <SiteSearchLoadingShell />
            )}
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  )
}

function SiteSearchLoadingShell() {
  return (
    <>
      <DialogHeader className="border-b border-[rgba(var(--border),0.7)] bg-gradient-soft px-5 py-4 text-left">
        <DialogTitle className="text-lg font-black text-foreground">Пошук по сайту</DialogTitle>
      </DialogHeader>

      <div className="border-b border-[rgba(var(--border),0.7)] px-4 py-3">
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-3 h-5 w-5 text-muted-foreground" />
          <div className="flex h-12 w-full items-center rounded-md bg-transparent pl-11 pr-28 text-base text-[rgba(var(--foreground),0.4)]">
            Введіть свій запит
          </div>

          <div className="absolute right-1.5 flex items-center gap-1.5">
            <LoaderCircle className="h-4 w-4 animate-spin text-primary" />
            <span className="hidden items-center gap-1 rounded-full border border-border bg-white px-2 py-1 text-[11px] font-semibold text-[rgba(var(--foreground),0.7)] sm:inline-flex">
              <Command className="h-3.5 w-3.5" />K
            </span>
          </div>
        </div>
      </div>

      <div className="max-h-[65vh] min-h-[18rem] overflow-y-auto p-2">
        <div className="flex h-full min-h-[17rem] items-center justify-center px-4 py-10 text-center">
          <div className="max-w-md">
            <p className="text-lg font-bold text-foreground">Завантажуємо пошук</p>
            <p className="mt-2 text-sm leading-6 text-[rgba(var(--foreground),0.65)]">
              Готуємо діалог пошуку по сайту.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
