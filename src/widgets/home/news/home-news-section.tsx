import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { NEWS_INDEX_PATH } from '@/shared/lib/site-config'
import { NewsCard } from '@/widgets/home/news/news-card'
import type { HomePageViewModel } from '@/widgets/home/model'
import { HOME_NEWS_SECTION_ITEMS } from '@/widgets/home/section-limits'

export function HomeNewsSection({ items }: { items: HomePageViewModel['news'] }) {
  const visibleItems = items.slice(0, HOME_NEWS_SECTION_ITEMS)

  return (
    <section id="news" className="relative overflow-hidden bg-gradient-soft py-20 md:py-28">
      {/* <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--primary),0.2)] to-transparent" /> */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 id="home-news-heading" className="text-3xl font-black sm:text-4xl lg:text-5xl" style={{ scrollMarginTop: '7rem' }}>
              Новини коледжу
            </h2>
            <p className="mt-3 text-muted-foreground">Стежте за подіями, конкурсами та можливостями нашого закладу.</p>
          </div>

          <Link
            href={NEWS_INDEX_PATH}
            className="group flex max-w-[140px] items-center gap-2 truncate rounded-full border border-[rgba(var(--primary),0.2)] bg-card px-5 py-2.5 text-sm font-semibold text-primary shadow-soft transition-bounce hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
          >
            Усі новини
            <ArrowRight className="h-4 w-4 transition-bounce group-hover:translate-x-1" />
          </Link>
        </div>

        {visibleItems.length ? (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {visibleItems.map((item, index) => (
              <NewsCard key={item.id} item={item} index={index} page={0} isHomePage />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-[2rem] border border-dashed border-[rgba(var(--border),0.8)] bg-[rgba(255,255,255,0.7)] p-10 text-center shadow-soft">
            <h2 className="text-2xl font-black text-foreground">РќРѕРІРёРЅ РїРѕРєРё РЅРµРјР°С”</h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Р”Р»СЏ С†СЊРѕРіРѕ РїРµСЂС–РѕРґСѓ С‰Рµ РЅРµ Р·РЅР°Р№РґРµРЅРѕ Р¶РѕРґРЅРѕС— РїСѓР±Р»С–РєР°С†С–С—.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
