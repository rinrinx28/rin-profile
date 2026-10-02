# rin-profile

Personal portfolio site for Pham Minh Anh (rinrinx28): full-stack developer and technical lead.

It is a single-page site with hero, about, experience, projects, skills and contact sections. Scrolling is driven by GSAP: sections reveal as they enter, a progress bar tracks the scroll, the cursor is custom and buttons follow the pointer slightly.

## Stack

- Next.js 16 (App Router), React, TypeScript
- Tailwind CSS v4, shadcn / Base UI components
- GSAP (`@gsap/react`) for scroll and motion

## Getting started

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
```

## Structure

```
app/          # layout, page, global styles
components/   # one folder per section: hero, about, experience, projects, skills, contact, nav, footer
components/ui # shared UI: button, custom cursor, magnetic button, scroll progress, smooth scroll
lib/          # helpers
```
