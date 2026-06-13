'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      const dots = Array.from(
        timelineRef.current?.querySelectorAll<HTMLElement>('.timeline-dot') ?? [],
      )

      // Start all dots hidden
      gsap.set(dots, { opacity: 0, scale: 0 })

      // Pre-calculate each dot's position ratio along the line.
      // Measured as (dotTop - lineTop) / lineLayoutHeight.
      // getBoundingClientRect difference is scroll-invariant; offsetHeight gives layout height.
      let dotRatios: number[] = []

      const measureRatios = () => {
        if (!lineRef.current || !dots.length) return
        const lineTop = lineRef.current.getBoundingClientRect().top
        const lineH = lineRef.current.offsetHeight
        dotRatios = dots.map((dot) => {
          const dotTop = dot.getBoundingClientRect().top
          return Math.max(0, Math.min(1, (dotTop - lineTop) / lineH))
        })
      }

      // Track which dots are currently active to animate only on state change
      const activated = new Array<boolean>(dots.length).fill(false)

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 72%',
            end: 'bottom 28%',
            scrub: 1.2,
            onRefresh: measureRatios,
            onUpdate(self) {
              if (!dotRatios.length) measureRatios()
              dots.forEach((dot, i) => {
                const reached = self.progress >= (dotRatios[i] ?? 0)
                if (reached && !activated[i]) {
                  activated[i] = true
                  gsap.to(dot, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.45,
                    ease: 'back.out(2)',
                    overwrite: 'auto',
                  })
                } else if (!reached && activated[i]) {
                  activated[i] = false
                  gsap.to(dot, {
                    opacity: 0,
                    scale: 0,
                    duration: 0.25,
                    ease: 'power2.in',
                    overwrite: 'auto',
                  })
                }
              })
            },
          },
        },
      )

      // Each item fades in when it enters viewport
      const items = Array.from(timelineRef.current?.children ?? [])
      items.forEach((item) => {
        gsap.from(item, {
          x: -20,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 87%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    },
    { scope: sectionRef },
  )

  const chronological = [...experience].reverse()

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 sm:py-32 px-6 max-w-6xl mx-auto w-full"
    >
      <div className="border-t border-border pt-16">
        <h2
          ref={headingRef}
          className="font-sans font-bold text-[clamp(2rem,5vw,3.5rem)] leading-tight text-foreground mb-16"
        >
          Experience
        </h2>

        <div className="relative">
          <div
            ref={lineRef}
            className="absolute left-0 top-2 bottom-2 w-px bg-border"
          />

          <div ref={timelineRef} className="space-y-14">
            {chronological.map((item, i) => (
              <div key={i} className="pl-8 relative">
                {/* Dot — lights up when the line reaches it */}
                <div className="timeline-dot absolute left-0 top-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-background translate-x-[-3.5px]" />

                <div className="space-y-3">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-semibold text-foreground">{item.role}</h3>
                    <span className="font-mono text-xs text-muted-foreground tracking-wide">
                      {item.period}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-primary">{item.company}</p>
                  <ul className="mt-4 space-y-2">
                    {item.description.map((desc, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="mt-1.75 w-1 h-1 rounded-full bg-border shrink-0" aria-hidden />
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
