import type { ReactNode } from "react";
import Image from "next/image";

import { RichText } from "@/widgets/page/cms-page/components/rich-text";
import { NewsArchive } from "@/widgets/news/news-archive";
import { RecentNews } from "@/widgets/news/recent-news";
import type {
  NewsArchiveYear,
  NewsArticleViewModel,
  RecentNewsItem,
} from "@/widgets/news/model";

function ArticleMetaPill({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "accent";
}) {
  return (
    <span
      className={
        tone === "accent"
          ? "rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft"
          : "rounded-full bg-muted px-4 py-2 text-sm font-semibold text-muted-foreground"
      }
    >
      {children}
    </span>
  );
}

export function NewsArticlePageView({
  article,
  recentItems,
  archive,
}: {
  article: NewsArticleViewModel;
  recentItems: RecentNewsItem[];
  archive: NewsArchiveYear[];
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft pb-20 pt-10 md:pb-24 md:pt-14">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] xl:gap-10">
          <article className="overflow-hidden rounded-[2rem] border border-border/80 bg-white shadow-card">
            <div className="border-b border-border/70 px-6 py-6 md:px-8">
              <div className="flex flex-wrap gap-3">
                <ArticleMetaPill tone="accent">
                  {article.date.day} {article.date.monthLong} {article.date.year}
                </ArticleMetaPill>
                {article.tags.slice(0, 2).map((tag) => (
                  <ArticleMetaPill key={tag}>{tag}</ArticleMetaPill>
                ))}
              </div>

              <h1 className="mt-5 text-3xl font-black leading-tight text-foreground sm:text-4xl">
                {article.title}
              </h1>
            </div>

            {article.image ? (
              <div className="border-b border-border/70">
                <Image
                  priority
                  src={article.image.src}
                  alt={article.image.alt || article.title}
                  width={article.image.width}
                  height={article.image.height}
                  className="h-auto w-full object-cover"
                />
              </div>
            ) : null}

            <div className="px-6 py-8 md:px-8">
              <RichText html={article.bodyHtml} />

              {article.gallery.length ? (
                <section className="mt-10">
                  <h2 className="text-2xl font-black text-foreground">Фотогалерея</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {article.gallery.map((image) => (
                      <a
                        key={image.src}
                        href={image.src}
                        target="_blank"
                        rel="noreferrer"
                        className="group overflow-hidden rounded-[1.5rem] border border-border/70 bg-white shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-card"
                      >
                        <Image
                          src={image.src}
                          alt={image.alt || article.title}
                          width={image.width}
                          height={image.height}
                          className="aspect-[4/3] h-full w-full object-cover transition-bounce group-hover:scale-105"
                        />
                      </a>
                    ))}
                  </div>
                </section>
              ) : null}

              {article.videoEmbedUrl ? (
                <section className="mt-10">
                  <h2 className="text-2xl font-black text-foreground">Відео</h2>
                  <iframe
                    title={article.title}
                    className="mt-5 aspect-video w-full rounded-[1.75rem] border border-border/70 shadow-soft"
                    src={`${article.videoEmbedUrl}?autoplay=0&controls=2`}
                    allowFullScreen
                  />
                </section>
              ) : null}
            </div>
          </article>

          <aside className="space-y-8 lg:sticky lg:top-8 lg:self-start">
            <section>
              <h2 className="mb-4 text-center text-2xl font-black text-foreground">Останні новини</h2>
              <RecentNews items={recentItems} />
            </section>

            <section>
              <h2 className="mb-4 text-center text-2xl font-black text-foreground">Архів новин</h2>
              <NewsArchive items={archive} />
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}
