'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { socials } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

const EMAIL = 'minhanhpreeip@gmail.com';

const ICONS = {
	github: (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			className="w-4 h-4"
			aria-hidden>
			<path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.57v-2.01c-3.34.73-4.03-1.6-4.03-1.6-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .31.21.69.82.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
		</svg>
	),
	linkedin: (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			className="w-4 h-4"
			aria-hidden>
			<path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.25 2.36 4.25 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.23 0z" />
		</svg>
	),
	facebook: (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			className="w-4 h-4"
			aria-hidden>
			<path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z" />
		</svg>
	),
	email: (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			className="w-4 h-4"
			aria-hidden>
			<rect
				width="20"
				height="16"
				x="2"
				y="4"
				rx="2"
			/>
			<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
		</svg>
	),
};

export default function Contact() {
	const sectionRef = useRef<HTMLElement>(null);
	const transitionRef = useRef<HTMLDivElement>(null);
	const terrainRef = useRef<SVGSVGElement>(null);
	const eyebrowRef = useRef<HTMLDivElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const rotatorRef = useRef<HTMLSpanElement>(null);
	const emailRef = useRef<HTMLAnchorElement>(null);
	const socialsRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			// ── Page transition: white terrain rises out of the dark as you scroll in ──
			gsap.fromTo(
				terrainRef.current,
				{ yPercent: 45 },
				{
					yPercent: 0,
					ease: 'none',
					scrollTrigger: {
						trigger: transitionRef.current,
						start: 'top bottom',
						end: 'bottom bottom',
						scrub: true,
					},
				},
			);

			// ── Rotating word: "great." → bold. → fast. → scalable. → real. → … ──
			let rotatorStarted = false;
			const startRotator = () => {
				if (rotatorStarted || !rotatorRef.current) return;
				rotatorStarted = true;
				if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
					return;

				const el = rotatorRef.current;
				const cycle = ['bold.', 'fast.', 'scalable.', 'real.', 'great.'];
				const wordTl = gsap.timeline({ repeat: -1 });
				cycle.forEach((word) => {
					wordTl
						.to(
							el,
							{ yPercent: -135, opacity: 0, duration: 0.45, ease: 'power2.in' },
							'+=1.6',
						)
						.set(el, { textContent: word, yPercent: 135 })
						.to(el, {
							yPercent: 0,
							opacity: 1,
							duration: 0.55,
							ease: 'power3.out',
						});
				});
			};

			// ── Content reveal ──
			const lines =
				headingRef.current?.querySelectorAll<HTMLElement>('.finale-line');

			gsap.from(eyebrowRef.current, {
				y: 24,
				opacity: 0,
				duration: 0.7,
				ease: 'power3.out',
				scrollTrigger: { trigger: eyebrowRef.current, start: 'top 88%' },
			});

			if (lines?.length) {
				gsap.from(lines, {
					yPercent: 115,
					duration: 1,
					stagger: 0.12,
					ease: 'expo.out',
					scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
					onComplete: startRotator,
				});
			} else {
				startRotator();
			}

			gsap.from([emailRef.current, socialsRef.current], {
				y: 32,
				opacity: 0,
				duration: 0.9,
				stagger: 0.15,
				ease: 'power3.out',
				scrollTrigger: { trigger: emailRef.current, start: 'top 90%' },
			});
		},
		{ scope: sectionRef },
	);

	return (
		<section
			id="contact"
			ref={sectionRef}
			className="relative -mt-px bg-[#04091a] text-foreground">
			{/* ── Page transition: dark (from Projects) → white terrain reveal ── */}
			<div
				ref={transitionRef}
				className="relative h-[55vh] w-full overflow-hidden bg-[#04091a]"
				aria-hidden>
				<svg
					ref={terrainRef}
					className="absolute inset-x-0 -bottom-px w-full h-[44%] sm:h-[68%]"
					viewBox="0 0 1440 360"
					preserveAspectRatio="none"
					xmlns="http://www.w3.org/2000/svg">
					<defs>
						<linearGradient
							id="cg1"
							x1="0"
							y1="0"
							x2="0"
							y2="1">
							<stop
								offset="0%"
								stopColor="#60A5FA"
								stopOpacity="0.45"
							/>
							<stop
								offset="100%"
								stopColor="#BFDBFE"
								stopOpacity="0.9"
							/>
						</linearGradient>
						<linearGradient
							id="cg2"
							x1="0"
							y1="0"
							x2="0"
							y2="1">
							<stop
								offset="0%"
								stopColor="#BFDBFE"
								stopOpacity="0.85"
							/>
							<stop
								offset="100%"
								stopColor="#E0ECFF"
								stopOpacity="1"
							/>
						</linearGradient>
					</defs>
					<path
						className="morph-terrain-1"
						d="M 0,120 C 80,98 160,110 240,120 C 320,130 400,100 480,86 C 560,72 640,96 720,120 C 800,144 880,128 960,104 C 1040,80 1120,98 1200,120 C 1280,142 1360,130 1440,120 L 1440,360 L 0,360 Z"
						fill="url(#cg1)"
					/>
					<path
						className="morph-terrain-2"
						d="M 0,180 C 80,158 160,170 240,180 C 320,190 400,160 480,146 C 560,132 640,156 720,180 C 800,204 880,188 960,164 C 1040,140 1120,158 1200,180 C 1280,202 1360,190 1440,180 L 1440,360 L 0,360 Z"
						fill="url(#cg2)"
					/>
					<path
						className="morph-terrain-3"
						d="M 0,240 C 80,220 160,232 240,240 C 320,248 400,224 480,212 C 560,200 640,222 720,240 C 800,258 880,244 960,226 C 1040,208 1120,222 1200,240 C 1280,258 1360,248 1440,240 L 1440,360 L 0,360 Z"
						fill="#fff"
					/>
				</svg>
			</div>

			{/* ── White finale content ── */}
			<div className="relative -mt-px overflow-hidden bg-white px-6 pt-20 pb-40">
				{/* faint blue glow for a touch of atmosphere on white */}
				<div
					className="absolute -top-32 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] pointer-events-none"
					style={{
						background:
							'radial-gradient(ellipse at center, oklch(0.62 0.16 250 / 0.10), transparent 70%)',
					}}
					aria-hidden
				/>

				<div className="relative z-10 max-w-6xl mx-auto w-full">
					{/* Availability status */}
					<div
						ref={eyebrowRef}
						className="flex items-center gap-3 mb-10">
						<span className="relative flex h-2 w-2">
							<span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 animate-ping" />
							<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
						</span>
						<span className="font-mono text-[11px] tracking-[0.4em] uppercase text-muted-foreground">
							Available for work
						</span>
					</div>

					{/* Headline — line-by-line reveal */}
					<h2
						ref={headingRef}
						className="font-bold leading-[1.05] tracking-tight text-foreground"
						style={{ fontSize: 'clamp(2.75rem, 8.5vw, 7rem)' }}>
						<span className="block overflow-hidden pb-[0.3em] mb-[-0.3em]">
							<span className="finale-line block">Let&apos;s build</span>
						</span>
						<span className="block overflow-hidden pb-[0.3em] mb-[-0.3em]">
							<span className="finale-line block">something</span>
						</span>
						{/* Rotating word on its OWN line so its width never reflows the others */}
						<span className="block overflow-hidden pb-[0.3em] mb-[-0.3em]">
							<span className="finale-line block">
								<span
									ref={rotatorRef}
									className="inline-block bg-linear-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
									great.
								</span>
							</span>
						</span>
					</h2>

					{/* Giant email CTA */}
					<a
						ref={emailRef}
						href={`mailto:${EMAIL}`}
						className="group block w-fit max-w-full mt-14">
						<span
							className="relative flex flex-wrap items-center gap-x-4 gap-y-1 font-medium text-foreground transition-colors duration-300 group-hover:text-primary"
							style={{ fontSize: 'clamp(1.15rem, 5vw, 3.25rem)' }}>
							<span className="break-all">{EMAIL}</span>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={1.5}
								className="w-[0.8em] h-[0.8em] shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:-translate-y-2"
								aria-hidden>
								<path
									d="M7 17 17 7M7 7h10v10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</span>
						<span className="mt-2 block h-px w-full origin-left scale-x-0 bg-linear-to-r from-primary via-primary/50 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />
					</a>

					{/* Socials */}
					<div
						ref={socialsRef}
						className="flex flex-wrap gap-3 mt-16">
						{socials.map((social) => (
							<a
								key={social.label}
								href={social.href}
								target={social.icon !== 'email' ? '_blank' : undefined}
								rel="noopener noreferrer"
								className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border text-sm font-medium text-foreground transition-colors duration-300 hover:border-primary">
								<span className="text-muted-foreground transition-all duration-300 ease-out group-hover:text-primary group-hover:-translate-y-px">
									{ICONS[social.icon]}
								</span>
								{/* Label: clean vertical slide-up swap on hover */}
								<span className="relative grid h-5 overflow-hidden">
									<span className="col-start-1 row-start-1 leading-5 transition-transform duration-300 ease-out group-hover:-translate-y-full">
										{social.label}
									</span>
									<span
										aria-hidden
										className="col-start-1 row-start-1 leading-5 translate-y-full text-primary transition-transform duration-300 ease-out group-hover:translate-y-0">
										{social.label}
									</span>
								</span>
							</a>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
