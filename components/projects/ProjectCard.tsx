'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from(cardRef.current, {
        y: 36,
        opacity: 0,
        duration: 0.65,
        delay: (index % 2) * 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 88%', toggleActions: 'play none none reverse' },
      })
    },
    { scope: cardRef },
  )

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col gap-5 border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:bg-accent/20 transition-all duration-300"
    >
      {project.images?.[0] && (
        <div className="relative w-full h-48 overflow-hidden bg-secondary">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-background/60" />
        </div>
      )}

      <div className="flex flex-col gap-5 p-7 flex-1">
        {project.featured && (
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary">
            Featured
          </span>
        )}

        <h3 className="font-semibold text-foreground text-lg leading-snug group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border"
            >
              {t}
            </span>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4 mt-1 w-fit"
          >
            View project
            <span aria-hidden>→</span>
          </a>
        )}
      </div>
    </div>
  )
}
