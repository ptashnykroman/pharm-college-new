'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Command, CornerDownLeft, LoaderCircle, Search } from 'lucide-react'
import { startTransition, useEffect, useState, type ChangeEvent, type KeyboardEvent } from 'react'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { searchSite } from '@/shared/api/search/client'
import type { SearchResult, SearchResultType } from '@/shared/api/search/types'
import { Dialog, DialogContent,  DialogHeader, DialogTitle } from '@/components/ui/dialog'

const COPY = {
  title: 'Пошук по сайту',
  description: 'Шукає по сторінках, новинах, структурі коледжу, працівниках і вкладених контентних блоках.',
  placeholder: 'Введіть свій запит',
  startTitle: 'Почніть пошук',
  startDescription: 'Введіть назву сторінки, новини, підрозділу, викладача або текст із контентних блоків.',
  shortTitle: 'Запит надто короткий',
  loadingTitle: 'Шукаємо...',
  loadingDescription: 'Перевіряю сторінки, новини, структуру та профілі працівників.',
  errorTitle: 'Не вдалося виконати пошук',
  errorDescription: 'Спробуйте ще раз або перезавантажте сторінку.',
  emptyTitle: 'Нічого не знайдено',
  emptyDescription: 'Спробуйте змінити формулювання або використати коротший запит.',
  openResultLabel: 'Перейти до результату',
} as const

const TYPE_LABELS: Record<SearchResultType, string> = {
  page: 'Сторінка',
  novina: 'Новина',
  'cycle-commission': 'ЦМК',
  subdivision: 'Підрозділ',
  vidilenya: 'Відділення',
  worker: 'Працівник',
  'home-page-about': 'Головна',
}

const MIN_QUERY_LENGTH = 2
const SEARCH_DEBOUNCE_MS = 250
const SEARCH_RESULT_LIMIT = 12

type SearchStatus = 'idle' | 'loading' | 'ready' | 'error'

export function SiteSearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [status, setStatus] = useState<SearchStatus>('idle')

  const trimmedQuery = query.trim()
  const hasEnoughChars = trimmedQuery.length >= MIN_QUERY_LENGTH

  useEffect(() => {
    if (!open || !trimmedQuery || !hasEnoughChars) {
      return
    }

    const abortController = new AbortController()
    const timer = window.setTimeout(async () => {
      try {
        setStatus('loading')

        const response = await searchSite(trimmedQuery, {
          limit: SEARCH_RESULT_LIMIT,
          signal: abortController.signal,
        })

        startTransition(() => {
          setResults(response.results)
          setStatus('ready')
        })
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return
        }

        setResults([])
        setStatus('error')
      }
    }, SEARCH_DEBOUNCE_MS)

    return () => {
      abortController.abort()
      window.clearTimeout(timer)
    }
  }, [hasEnoughChars, open, trimmedQuery])

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setQuery('')
      setResults([])
      setStatus('idle')
    }

    onOpenChange(nextOpen)
  }

  function closeDialog() {
    handleOpenChange(false)
  }

  function openResult(url: string) {
    closeDialog()
    router.push(url)
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter' || !results[0]) {
      return
    }

    event.preventDefault()
    openResult(results[0].url)
  }

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    const nextQuery = event.target.value

    setQuery(nextQuery)

    if (nextQuery.trim().length < MIN_QUERY_LENGTH) {
      setResults([])
      setStatus('idle')
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        // max-w-[min(56rem,calc(100%-1.5rem))]
        className="w-full max-w-[95vw] sm:!max-w-xl gap-0 overflow-hidden border border-border/70 bg-white p-0 shadow-elegant"
      >
        <DialogHeader className="border-b border-border/70 bg-gradient-soft px-5 py-4 text-left">
          <DialogTitle className="text-lg font-black text-foreground">{COPY.title}</DialogTitle>
          {/* <DialogDescription className="text-sm leading-6 text-foreground/65">{COPY.description}</DialogDescription> */}
        </DialogHeader>

        <div className="border-b border-border/70 px-4 py-3">
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3 h-5 w-5 text-muted-foreground" />
            <Input
              autoFocus={open}
              value={query}
              onChange={handleQueryChange}
              onKeyDown={handleInputKeyDown}
              placeholder={COPY.placeholder}
              className="h-12 border-transparent bg-transparent pl-11 pr-28 text-base shadow-none focus-visible:border-transparent focus-visible:ring-0"
            />

            <div className="absolute right-1.5 flex items-center gap-1.5">
              {status === 'loading' ? (
                <LoaderCircle className="h-4 w-4 animate-spin text-primary" />
              ) : results[0] ? (
                <span className="hidden items-center gap-1 rounded-full border border-border bg-white px-2 py-1 text-[11px] font-semibold text-foreground/70 sm:inline-flex">
                  <CornerDownLeft className="h-3.5 w-3.5" />
                  Enter
                </span>
              ) : null}

              <span className="hidden items-center gap-1 rounded-full border border-border bg-white px-2 py-1 text-[11px] font-semibold text-foreground/70 sm:inline-flex">
                <Command className="h-3.5 w-3.5" />K
              </span>
            </div>
          </div>
        </div>

        <div className="max-h-[65vh] min-h-[18rem] overflow-y-auto p-2">
          {!trimmedQuery ? (
            <SearchState title={COPY.startTitle} description={COPY.startDescription} />
          ) : !hasEnoughChars ? (
            <SearchState title={COPY.shortTitle} description={`Введіть щонайменше ${MIN_QUERY_LENGTH} символи.`} />
          ) : status === 'loading' ? (
            <SearchState title={COPY.loadingTitle} description={COPY.loadingDescription} />
          ) : status === 'error' ? (
            <SearchState title={COPY.errorTitle} description={COPY.errorDescription} />
          ) : results.length === 0 ? (
            <SearchState title={COPY.emptyTitle} description={COPY.emptyDescription} />
          ) : (
            <div className="space-y-2">
              {results.map((result, index) => (
                <Link
                  key={`${result.type}-${result.id}-${index}`}
                  href={result.url}
                  onClick={() => closeDialog()}
                  className={cn(
                    'group block rounded-[1.5rem] border border-transparent bg-white px-4 py-3 transition-smooth hover:border-primary/20 hover:bg-gradient-soft hover:shadow-soft',
                    index === 0 && 'border-border/70',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-primary/8 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                          {TYPE_LABELS[result.type]}
                        </span>
                        <span className="text-xs text-foreground/45">{result.url}</span>
                      </div>
                      <h3 className="mt-2 text-base font-bold text-foreground transition-colors group-hover:text-primary">
                        {result.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-foreground/70">{result.excerpt}</p>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="hidden sm:blockshrink-0 opacity-0 transition group-hover:opacity-100"
                      onClick={(event) => {
                        event.preventDefault()
                        openResult(result.url)
                      }}
                      aria-label={`${COPY.openResultLabel} ${result.title}`}
                    >
                      <CornerDownLeft className="h-4 w-4" />
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function SearchState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex h-full min-h-[17rem] items-center justify-center px-4 py-10 text-center">
      <div className="max-w-md">
        <p className="text-lg font-bold text-foreground">{title}</p>
        <p className="mt-2 text-sm leading-6 text-foreground/65">{description}</p>
      </div>
    </div>
  )
}
