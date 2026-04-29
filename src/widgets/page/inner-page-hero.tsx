'use client'

import { useEffect, useState } from 'react'

import type { HeroSlide } from '@/widgets/home/hero/hero-utils'
import { HeroBackgroundSlider } from '@/widgets/home/hero/hero-background-slider'

type InnerPageHeroProps = {
  title: string
  slides: HeroSlide[]
}

export function InnerPageHero({ title, slides }: InnerPageHeroProps) {
  const [backgroundIndex, setBackgroundIndex] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) {
      return
    }

    const id = window.setInterval(() => {
      setBackgroundIndex((current) => (current + 1) % slides.length)
    }, 10000)

    return () => window.clearInterval(id)
  }, [slides.length])

  return (
    <section className="relative h-[400px] overflow-hidden">
      <HeroBackgroundSlider slides={slides} activeIndex={backgroundIndex} imageClassName="object-cover object-center" />

      <div className="absolute inset-0 bg-primary-deep/15" />
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary-glow/25 blur-3xl" />
      <div className="absolute -right-12 -bottom-28 h-80 w-80 rounded-full bg-accent-gold/15 blur-3xl" />

      <div className="relative container mx-auto flex h-full items-center justify-center px-4 pt-24 text-center md:px-6">
        <h1
          style={{ fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif', fontWeight: 900 }}
          className="max-w-5xl text-2xl leading-[1.05] tracking-tight text-primary-foreground sm:text-3xl lg:text-4xl xl:text-5xl"
        >
          {title}
        </h1>
        {/* 
        <h1
          style={{ fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif', fontWeight: 900 }}
          className="text-2xl leading-[1.05] tracking-tight text-primary-foreground sm:text-3xl lg:text-4xl xl:text-5xl"
        >
          Житомирський базовий{' '}
          <span className="block bg-gradient-to-r from-accent-gold to-white bg-clip-text text-transparent">
            фармацевтичний фаховий коледж
          </span>
        </h1>
        */}
      </div>
    </section>
  )
}
