'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SkillColumn from './SkillColumn'
import { skills } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    gsap.from(headingRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
    })
  })

  return (
    <section id="skills" className="py-20 sm:py-32 px-6 max-w-6xl mx-auto w-full">
      <div className="border-t border-border pt-16">
        <h2
          ref={headingRef}
          className="font-sans font-bold text-[clamp(2rem,5vw,3.5rem)] leading-tight text-foreground mb-16"
        >
          Skills
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          {skills.map((group, i) => (
            <SkillColumn key={group.title} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
