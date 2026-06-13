export type SkillGroup = {
  title: string
  items: string[]
}

export type Project = {
  title: string
  description: string
  tech: string[]
  link?: string
  images?: string[]
  featured?: boolean
}

export type WorkExperience = {
  company: string
  role: string
  period: string
  description: string[]
}

export type SocialLink = {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'facebook' | 'email'
}

export const siteConfig = {
  name: 'rinrinx28',
  tagline: 'Full-Stack Developer & DevOps Engineer',
  bio: [
    'Fullstack Developer with 3+ years of experience building scalable web and mobile applications across the full stack — from Next.js frontends to NestJS microservices, and from Linux server infrastructure to Solana smart contracts.',
    'I take ownership of the entire development lifecycle: architecture design, implementation, deployment, and maintenance. Currently leading engineering at Vital, shipping cross-platform products for iOS, Android, and Web.',
  ],
  stats: [
    { label: 'Years of experience', value: '3+' },
    { label: 'Projects shipped', value: '10+' },
    { label: 'Companies worked at', value: '4+' },
  ],
}

export const skills: SkillGroup[] = [
  {
    title: 'Frontend',
    items: ['Next.js', 'React', 'React Native (Expo)', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    items: ['NestJS', 'Node.js', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'RabbitMQ', 'WebSocket'],
  },
  {
    title: 'DevOps',
    items: ['Linux', 'Nginx', 'Docker', 'UFW / Firewall', 'CI/CD', 'GitHub Actions', 'Apple Developer'],
  },
  {
    title: 'Blockchain',
    items: ['Solidity', 'Ethereum / EVM', 'Solana / Anchor', 'Web3.js / Ethers.js', 'Hardhat', 'Smart Contracts', 'NFT / DeFi'],
  },
]

export const experience: WorkExperience[] = [
  {
    company: 'Vital',
    role: 'Fullstack Developer & Technical Lead',
    period: '06/2025 — Present',
    description: [
      'Architected and built a cross-platform product (iOS / Android / Web) with full ownership from design to deployment.',
      'Backend: NestJS microservices, PostgreSQL, Redis caching, RabbitMQ message queuing, WebSocket for real-time features.',
      'Frontend: Next.js web app + Expo (React Native) mobile — shared design system across platforms.',
      'Infrastructure: Docker, Nginx, CI/CD pipelines, Google OAuth, Apple Developer / TestFlight releases.',
    ],
  },
  {
    company: 'Metagrit Việt Nam',
    role: 'Blockchain Developer',
    period: '03/2025 — 06/2025',
    description: [
      'Designed and developed smart contracts on Solana (Anchor) for a Launch Token platform — token creation, vesting, whitelist, allocation, claim, staking, and reward distribution.',
      'Built Web3 UI integrating Solana wallets (Phantom, Solflare, Backpack): wallet connection, transaction signing, on-chain state sync.',
      'Collaborated with Backend and Frontend teams to ensure smooth on-chain/off-chain integration.',
    ],
  },
  {
    company: 'Sante Hospital',
    role: 'Full Stack Developer',
    period: '04/2024 — 02/2025',
    description: [
      'Built and maintained web application systems end-to-end — REST APIs with Node.js/NestJS, UI with React/Next.js.',
      'Optimized application performance, scalability, and stability across the full stack.',
      'Researched and applied new technologies to improve development efficiency and product quality.',
    ],
  },
]

export const projects: Project[] = [
  {
    title: 'Avatar48 AI',
    description:
      'Decentralized application built on Solana. Designed and developed smart contracts for token creation, vesting, whitelist, allocation, claim, staking, and reward distribution. Built Web3 UI integrating Solana wallets (Phantom, Solflare, Backpack).',
    tech: ['Solana', 'Anchor', 'Next.js', 'TypeScript', 'Web3'],
    link: 'https://avatar48.ai/en',
    images: ['/assets/images/avatar48.png'],
    featured: true,
  },
  {
    title: 'Gậy Lướt Thủ Đức',
    description:
      'E-commerce website for a billiard cue shop. Full product catalog, order management, and clean storefront UI built for a local business in Thủ Đức.',
    tech: ['Next.js', 'TypeScript', 'NestJS', 'PostgreSQL'],
    link: 'https://gayluotthuduc.store/',
    images: ['/assets/images/gayluotthuduc.png'],
    featured: false,
  },
]

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/rinrinx28', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rin-rin-aa2747169', icon: 'linkedin' },
  { label: 'Facebook', href: 'https://www.facebook.com/minhanhh28', icon: 'facebook' },
  { label: 'Email', href: 'mailto:minhanhpreeip@gmail.com', icon: 'email' },
]
