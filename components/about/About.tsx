'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const statsRef = useRef<HTMLDivElement>(null);

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
			});

			gsap.from(
				textRef.current?.children ? Array.from(textRef.current.children) : [],
				{
					y: 24,
					opacity: 0,
					duration: 0.6,
					stagger: 0.15,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: textRef.current,
						start: 'top 85%',
						toggleActions: 'play none none reverse',
					},
				},
			);

			// Stat rows reveal
			gsap.from(
				gsap.utils.toArray<HTMLElement>('.stat-row', statsRef.current),
				{
					y: 24,
					opacity: 0,
					duration: 0.6,
					stagger: 0.12,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: statsRef.current,
						start: 'top 82%',
						toggleActions: 'play none none reverse',
					},
				},
			);

			// Count-up numbers (0 → value) when scrolled into view
			gsap.utils
				.toArray<HTMLElement>('.stat-number', statsRef.current)
				.forEach((el) => {
					const target = Number(el.dataset.value ?? 0);
					const suffix = el.dataset.suffix ?? '';
					el.textContent = `0${suffix}`;
					const counter = { v: 0 };
					gsap.to(counter, {
						v: target,
						duration: 1.4,
						ease: 'power2.out',
						snap: { v: 1 },
						scrollTrigger: {
							trigger: statsRef.current,
							start: 'top 80%',
							toggleActions: 'play none none reverse',
						},
						onUpdate: () => {
							el.textContent = `${Math.round(counter.v)}${suffix}`;
						},
					});
				});
		},
		{ scope: sectionRef },
	);

	return (
		<section
			id="about"
			ref={sectionRef}
			className="py-20 sm:py-32 px-6 max-w-6xl mx-auto w-full">
			<div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
				{/* Left — text */}
				<div>
					<h2
						ref={headingRef}
						className="font-sans font-bold text-[clamp(2rem,5vw,3.5rem)] leading-tight text-foreground mb-8">
						About
					</h2>
					<div
						ref={textRef}
						className="space-y-5">
						{siteConfig.bio.map((paragraph, i) => (
							<p
								key={i}
								className="text-muted-foreground leading-relaxed">
								{paragraph}
							</p>
						))}
					</div>
				</div>

				{/* Right — stats (editorial list with count-up) */}
				<div
					ref={statsRef}
					className="flex flex-col md:pt-16">
					{siteConfig.stats.map((stat, i) => {
						const target = parseInt(stat.value, 10);
						const suffix = stat.value.replace(/[0-9]/g, '');
						return (
							<div
								key={stat.label}
								className={`stat-row group flex items-baseline justify-between gap-6 border-t border-border py-7 ${
									i === siteConfig.stats.length - 1 ? 'border-b' : ''
								}`}>
								<span
									className="stat-number font-mono font-bold leading-none tabular-nums text-foreground transition-colors duration-300 group-hover:text-primary"
									style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
									data-value={target}
									data-suffix={suffix}>
									{stat.value}
								</span>
								<span className="max-w-36 text-right text-sm text-muted-foreground transition-transform duration-300 ease-out group-hover:-translate-x-1">
									{stat.label}
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
