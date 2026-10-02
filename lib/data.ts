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
  tagline: 'Full-Stack Developer & Technical Lead',
  bio: [
    "I'm Pham Minh Anh, a full-stack developer with 4+ years of experience building web, mobile and blockchain products end to end — from NestJS microservices and PostgreSQL tuning to Expo (React Native) clients and Solidity / Solana smart contracts.",
    'Currently technical lead at Vital, where I own the architecture, delivery and production operations of a cross-platform social and end-to-end encrypted messaging app for iOS, Android and Web.',
  ],
  stats: [
    { label: 'Years of experience', value: '4+' },
    { label: 'Projects shipped', value: '10+' },
    { label: 'Companies worked at', value: '5' },
  ],
}

export const skills: SkillGroup[] = [
  {
    title: 'Frontend',
    items: ['Next.js', 'React', 'React Native (Expo)', 'TypeScript', 'Tailwind CSS', 'iOS native modules (CallKit, PushKit)'],
  },
  {
    title: 'Backend',
    items: ['NestJS', 'Node.js', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'RabbitMQ', 'WebSocket'],
  },
  {
    title: 'DevOps',
    items: ['Linux', 'Docker', 'Nginx', 'PM2', 'LiveKit', 'CI/CD', 'Monitoring & backups', 'TestFlight / App Store'],
  },
  {
    title: 'Blockchain',
    items: ['Solidity', 'Ethereum / EVM', 'Solana / Anchor', 'Ethers.js', 'Hardhat', 'Smart Contracts', 'NFT / DeFi'],
  },
]

export const experience: WorkExperience[] = [
  {
    company: 'Vital',
    role: 'Technical Lead & Full-Stack Developer',
    period: '06/2025 — Present',
    description: [
      'Designed and led the architecture of a social and E2EE messaging app (iOS / Android / Web): NestJS microservices over RabbitMQ, backed by PostgreSQL, MongoDB and Redis.',
      'Raised API capacity from ~150 to ~500 requests/s (≈1,800 concurrently active users) by tuning hot queries and running the API as a PM2 cluster.',
      'Built end-to-end encrypted messaging, an offline-first SQLite data layer, and voice/video calling on self-hosted LiveKit with native iOS CallKit/PushKit.',
      'Ran production on Linux (Docker, Nginx, PM2) with monitoring and encrypted nightly backups; shipped iOS releases through TestFlight and App Store review.',
    ],
  },
  {
    company: 'Metagrit Việt Nam',
    role: 'Blockchain Developer',
    period: '03/2025 — 06/2025',
    description: [
      'Designed and developed smart contracts on Solana (Anchor) for a token launch platform — token creation, vesting, whitelist, allocation, claim, staking and reward distribution.',
      'Built Web3 UI integrating Solana wallets (Phantom, Solflare, Backpack): wallet connection, transaction signing, on-chain state sync.',
      'Worked with backend and frontend teams on on-chain/off-chain integration.',
    ],
  },
  {
    company: 'Sante Hospital',
    role: 'Full-Stack Developer',
    period: '04/2024 — 02/2025',
    description: [
      "Built and maintained the hospital's web applications end to end — Node.js APIs and React/Next.js interfaces.",
      'Turned business requirements into technical designs and improved performance and stability across the stack.',
    ],
  },
  {
    company: 'The Young Education',
    role: 'Full-Stack Developer',
    period: '12/2023 — 03/2024',
    description: [
      'Built an e-learning platform (React, Express.js, MySQL): course browsing, enrollment, payments and progress tracking.',
      'Protected course videos with HLS streaming; added real-time chat and notifications over WebSocket.',
    ],
  },
  {
    company: 'DB Lab',
    role: 'Full-Stack Developer',
    period: '03/2022 — 12/2023',
    description: [
      'Built a decentralized digital asset platform on Ethereum: React + ethers.js front end, Express.js/MySQL back end, Solidity contracts tested with Hardhat.',
      'Kaigan — wrote NFT minting and trading contracts and built the marketplace UI with a real-time server.',
    ],
  },
]

export const projects: Project[] = [
  {
    title: 'Lumi — POS & Inventory SaaS',
    description:
      'Multi-tenant point-of-sale and inventory SaaS for Vietnamese retail chains. Real-time stock across branches, VietQR payments, automatic bank-transfer reconciliation via SePay webhooks, debt tracking, receipt printing and role-based access enforced with Postgres row-level security.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    link: 'https://github.com/rinrinx28/rin-saas',
    featured: true,
  },
  {
    title: 'Avatar48 AI',
    description:
      'Token launch dApp on Solana. Designed and developed smart contracts for token creation, vesting, whitelist, allocation, claim, staking and reward distribution, and built the Web3 UI with Phantom, Solflare and Backpack wallets.',
    tech: ['Solana', 'Anchor', 'Next.js', 'TypeScript', 'Web3'],
    link: 'https://avatar48.ai/en',
    images: ['/assets/images/avatar48.png'],
    featured: true,
  },
  {
    title: 'FADE OS',
    description:
      'Point of sale and shift management for barbershops: checkout, cash drawer reconciliation, commission payouts per stylist, and revenue reports — with per-role data access.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'TanStack Query', 'GSAP'],
    link: 'https://github.com/rinrinx28/fade-os',
    featured: false,
  },
  {
    title: 'Gậy Lướt Thủ Đức',
    description:
      'Product catalog website for a billiard cue shop in Thủ Đức, built for fast browsing and direct contact via Zalo and Facebook, with an admin for products and images.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
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
