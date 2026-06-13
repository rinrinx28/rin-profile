'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { siteConfig } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useGSAP(
    () => {
      gsap.from(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })

    },
    { scope: navRef },
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Always hide the nav while the Projects section is on screen.
  // Run after full page mount so [data-projects-wrapper] exists in DOM.
  useEffect(() => {
    const nav = navRef.current
    const wrapper = document.querySelector('[data-projects-wrapper]')
    if (!nav || !wrapper) return

    // onToggle fires whenever the section enters/leaves (any direction),
    // keeping the hidden state in sync no matter where you scroll from.
    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom top',
      onToggle: (self) =>
        gsap.to(nav, {
          yPercent: self.isActive ? -110 : 0,
          duration: self.isActive ? 0.45 : 0.55,
          ease: self.isActive ? 'power3.in' : 'power3.out',
          overwrite: 'auto',
        }),
    })

    // Apply the correct state immediately on mount (e.g. reload inside Projects)
    gsap.set(nav, { yPercent: st.isActive ? -110 : 0 })

    return () => st.kill()
  }, [])

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border'
          : ''
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-mono text-sm font-semibold tracking-wider text-foreground hover:text-primary transition-colors"
        >
          {siteConfig.name}
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-px w-5 bg-foreground transition-all duration-200 ${
              menuOpen ? 'rotate-45 translate-y-[5px]' : ''
            }`}
          />
          <span
            className={`block h-px w-5 bg-foreground transition-opacity duration-200 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-px w-5 bg-foreground transition-all duration-200 ${
              menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-64 border-b border-border' : 'max-h-0'
        } bg-background/95 backdrop-blur-md`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
