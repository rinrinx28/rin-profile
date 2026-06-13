'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const SIZE = 52;
const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CX = SIZE / 2;
const CY = SIZE / 2;

export default function ScrollProgress() {
	const circleRef = useRef<SVGCircleElement>(null);
	const containerRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		// Drive progress via ScrollTrigger so it stays in sync with ScrollSmoother
		const st = ScrollTrigger.create({
			start: 0,
			end: 'max',
			onUpdate: (self) => {
				const progress = Math.min(1, Math.max(0, self.progress));
				if (circleRef.current) {
					circleRef.current.style.strokeDashoffset = String(
						CIRCUMFERENCE * (1 - progress),
					);
				}
				if (containerRef.current) {
					containerRef.current.style.opacity = progress > 0.01 ? '1' : '0';
				}
			},
		});

		return () => st.kill();
	}, []);

	const scrollToTop = () => {
		gsap.to(window, { scrollTo: 0, duration: 1.4, ease: 'power3.inOut' });
	};

	return (
		<button
			ref={containerRef}
			onClick={scrollToTop}
			className="group fixed bottom-20 right-6 z-50 grid place-items-center rounded-full border border-foreground/10 bg-background/70 shadow-lg shadow-black/10 backdrop-blur-md opacity-0 transition-[opacity,transform] duration-300 cursor-none hover:scale-110"
			style={{ width: SIZE, height: SIZE }}
			aria-label="Scroll to top">
			{/* Progress ring — rotated -90° so it fills from 12 o'clock.
          h-full/w-full so it matches the bordered content box (no 1px offset). */}
			<svg
				viewBox={`0 0 ${SIZE} ${SIZE}`}
				className="absolute inset-0 h-full w-full -rotate-90">
				<circle
					cx={CX}
					cy={CY}
					r={RADIUS}
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					className="text-foreground/10"
				/>
				<circle
					ref={circleRef}
					cx={CX}
					cy={CY}
					r={RADIUS}
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeDasharray={CIRCUMFERENCE}
					strokeDashoffset={CIRCUMFERENCE}
					className="text-foreground/80"
				/>
			</svg>

			{/* Arrow up — lifts on hover */}
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={1.75}
				className="relative h-4 w-4 text-foreground/70 transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:text-foreground"
				aria-hidden>
				<path
					d="M12 19V5M5 12l7-7 7 7"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</button>
	);
}
