'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { siteConfig } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Footer() {
	const footerRef = useRef<HTMLElement>(null);
	const nameRef = useRef<HTMLSpanElement>(null);
	const baselineRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			gsap.from(nameRef.current, {
				yPercent: 25,
				opacity: 0,
				duration: 1.2,
				ease: 'expo.out',
				scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
			});

			gsap.from(
				baselineRef.current?.children
					? Array.from(baselineRef.current.children)
					: [],
				{
					y: 16,
					opacity: 0,
					duration: 0.7,
					stagger: 0.12,
					ease: 'power3.out',
					scrollTrigger: { trigger: baselineRef.current, start: 'top 95%' },
				},
			);
		},
		{ scope: footerRef },
	);

	const scrollToTop = () => {
		gsap.to(window, { scrollTo: 0, duration: 1.4, ease: 'power3.inOut' });
	};

	return (
		<footer
			ref={footerRef}
			className="relative overflow-hidden bg-[#04091a] text-white">
			{/* Baseline meta row */}
			<div className="relative z-10 max-w-6xl mx-auto w-full px-6 pt-20">
				<div
					ref={baselineRef}
					className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-8">
					<p className="font-mono text-xs text-white/40">
						© 2026 {siteConfig.name} — {siteConfig.tagline}
					</p>
					<button
						onClick={scrollToTop}
						className="group inline-flex items-center gap-2 font-mono text-xs text-white/50 transition-colors duration-300 hover:text-blue-400"
						aria-label="Back to top">
						<span className="tracking-[0.25em] uppercase">Back to top</span>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth={1.5}
							className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-1"
							aria-hidden>
							<path
								d="M12 19V5M5 12l7-7 7 7"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</div>

			{/* Oversized name, fading into the void */}
			<div className="relative mt-10 overflow-hidden">
				<span
					ref={nameRef}
					className="block text-center font-bold leading-[0.8] tracking-tighter select-none bg-linear-to-b from-white/15 to-white/0 bg-clip-text text-transparent"
					style={{ fontSize: 'clamp(4rem, 21vw, 19rem)' }}>
					{siteConfig.name}
				</span>
			</div>
		</footer>
	);
}
