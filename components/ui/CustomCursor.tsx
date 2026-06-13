'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    const onMouseMove = (e: MouseEvent) => {
      if (!visible) setVisible(true)

      gsap.set(dot, { x: e.clientX, y: e.clientY })
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    const onMouseEnter = () => {
      gsap.to(ring, { scale: 1.8, duration: 0.25, ease: 'power2.out' })
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }

    const onMouseLeave = () => {
      gsap.to(ring, { scale: 1, duration: 0.25, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    window.addEventListener('mousemove', onMouseMove)

    const updateInteractives = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnter)
        el.addEventListener('mouseleave', onMouseLeave)
      })
    }

    updateInteractives()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.querySelectorAll('a, button').forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
      })
    }
  }, [visible])

  return (
    <>
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] w-8 h-8 rounded-full border border-primary -translate-x-1/2 -translate-y-1/2 hidden md:block transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2 hidden md:block transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  )
}
