'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import HeroText from './HeroText'
import MagneticButton from '@/components/ui/MagneticButton'
import { siteConfig } from '@/lib/data'

export default function Hero() {
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // chars finish at ≈ 0.15 + 8*0.045 + 0.85 = 1.36s
    const tl = gsap.timeline({ delay: 0.9 })

    tl.from(taglineRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
      .from(
        ctaRef.current,
        { y: 16, opacity: 0, duration: 0.55, ease: 'power3.out' },
        '-=0.35',
      )
      .from(
        indicatorRef.current,
        { opacity: 0, duration: 0.5 },
        '-=0.2',
      )
      .from(
        decorRef.current,
        { opacity: 0, duration: 0.8 },
        '<',
      )
  })

  return (
    <section
      id="hero"
      className="relative min-h-svh flex flex-col justify-center pt-16 px-6 max-w-6xl mx-auto w-full"
    >
      {/* Decorative grid dot top-right */}
      <div
        ref={decorRef}
        className="absolute top-24 right-0 w-48 h-48 opacity-[0.04] pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(oklch(0.42 0.145 258) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="flex flex-col gap-8">
        {/* Eyebrow */}
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-primary">
          Portfolio
        </span>

        {/* Main heading — char split animation */}
        <h1 className="font-mono font-bold uppercase tracking-tight leading-[0.9] text-[clamp(3.5rem,13vw,11rem)] text-foreground">
          <HeroText text="rinrinx28" />
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="font-sans text-base md:text-lg text-muted-foreground max-w-sm leading-relaxed"
        >
          {siteConfig.tagline}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-3">
          <MagneticButton>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium text-sm rounded-full hover:opacity-90 transition-opacity"
            >
              View Work
              <span aria-hidden>↓</span>
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium text-sm rounded-full hover:border-primary hover:text-primary hover:bg-accent transition-all duration-200"
            >
              Contact
              <span aria-hidden>→</span>
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={indicatorRef}
        className="absolute bottom-10 left-6 flex items-center gap-3 text-muted-foreground"
      >
        <div className="h-10 w-px bg-border" />
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase">scroll</span>
      </div>
    </section>
  )
}
