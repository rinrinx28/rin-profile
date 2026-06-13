'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { SkillGroup } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

interface SkillColumnProps {
  group: SkillGroup
  index: number
}

export default function SkillColumn({ group, index }: SkillColumnProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        delay: index * 0.08,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.from('.skill-title', { y: 18, opacity: 0, duration: 0.5, ease: 'power3.out' })
        .from('.skill-line', { scaleX: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .from(
          '.skill-item',
          { y: 12, opacity: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out' },
          '-=0.3',
        )
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className="space-y-5">
      <h3 className="skill-title font-mono text-xs font-semibold tracking-[0.2em] uppercase text-primary">
        {group.title}
      </h3>
      <div className="skill-line h-px origin-left bg-border" />
      <ul className="space-y-3">
        {group.items.map((item) => (
          <li
            key={item}
            className="skill-item group/item flex items-center gap-3 text-sm text-foreground transition-colors duration-200 hover:text-primary"
          >
            <span
              className="h-1 w-1 shrink-0 rounded-full bg-primary transition-transform duration-200 ease-out group-hover/item:scale-[1.8]"
              aria-hidden
            />
            <span className="transition-transform duration-200 ease-out group-hover/item:translate-x-1">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
