import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

import { replaceCmsMediaUrls } from '@/shared/lib/rich-text'
import type { HomePageViewModel } from '@/widgets/home/model'
import buildingImg from '@/shared/assets/images/homepage/college_photo2.webp'

const aboutFeatures = [
  'Сучасна навчально-матеріальна база',
  'Висококваліфікований викладацький склад',
  'Практика в провідних мережах аптек',
]

export function AboutSection({ about }: { about: HomePageViewModel['about'] }) {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-up relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl shadow-elegant">
              <Image
                src={about.image?.src || buildingImg}
                alt={about.image?.alt || about.title}
                width={about.image?.width || buildingImg.width}
                height={about.image?.height || buildingImg.height}
                quality={80}
                className="aspect-[5/4] w-full object-cover transition-bounce hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden flex-col items-center justify-center rounded-2xl border border-border bg-card px-6 py-4 shadow-card md:flex">
              <div className="text-3xl font-black text-gradient-primary">1936</div>
              <div className="text-xs text-muted-foreground">рік заснування</div>
            </div>
          </div>

          <div>
            <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl lg:text-5xl">{about.title}</h2>

            <div
              className="rich-text mt-5 text-lg text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: replaceCmsMediaUrls(about.bodyHtml) }}
            />

            <ul className="mt-8 space-y-3">
              {aboutFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-1.5 xs:gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-[rgba(var(--foreground),0.9)] !text-[14px] !xs:text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href={about.buttonHref}
              className="mt-8 inline-flex items-center rounded-md bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-bounce hover:scale-[1.02]"
            >
              {about.buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
