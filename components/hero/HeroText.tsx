'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface HeroTextProps {
	text: string;
	className?: string;
}

const SCATTER_THRESHOLD = 100; // px — khoảng cách để trigger vỡ

export default function HeroText({ text, className }: HeroTextProps) {
	const containerRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const chars = Array.from(
			containerRef.current?.querySelectorAll<HTMLElement>('.char') ?? [],
		);
		if (!chars.length) return;

		// Random scatter target cho mỗi ký tự — tính 1 lần
		const scatterTargets = chars.map(() => {
			const angle = Math.random() * Math.PI * 2;
			const dist = 90 + Math.random() * 130;
			return {
				x: Math.cos(angle) * dist,
				// bias upward: chữ bay nhiều về phía trên hơn
				y: Math.sin(angle) * dist - 50,
				rotation: (Math.random() - 0.5) * 180,
			};
		});

		const scattered = new Array<boolean>(chars.length).fill(false);

		// Entrance: wave từ dưới lên
		gsap.set(chars, { opacity: 0, y: 40 });
		const entrance = gsap.timeline({ delay: 0.15 });
		entrance.to(chars, {
			opacity: 1,
			y: 0,
			duration: 0.7,
			stagger: 0.055,
			ease: 'power3.out',
		});

		// Cache tâm gốc của từng ký tự (sau khi entrance xong)
		let charCenters: { x: number; y: number }[] = [];

		const cacheCenters = () => {
			charCenters = chars.map((c) => {
				const r = c.getBoundingClientRect();
				return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
			});
		};

		entrance.call(cacheCenters);
		window.addEventListener('resize', cacheCenters);

		// Cursor interaction
		const onMouseMove = (e: MouseEvent) => {
			if (!charCenters.length) return;

			chars.forEach((char, i) => {
				const dx = e.clientX - charCenters[i].x;
				const dy = e.clientY - charCenters[i].y;
				const dist = Math.sqrt(dx * dx + dy * dy);

				if (dist < SCATTER_THRESHOLD && !scattered[i]) {
					scattered[i] = true;
					gsap.to(char, {
						x: scatterTargets[i].x,
						y: scatterTargets[i].y,
						rotation: scatterTargets[i].rotation,
						opacity: 0,
						duration: 0.45,
						ease: 'power3.out',
						overwrite: true,
					});
				} else if (dist >= SCATTER_THRESHOLD && scattered[i]) {
					scattered[i] = false;
					gsap.to(char, {
						x: 0,
						y: 0,
						rotation: 0,
						opacity: 1,
						duration: 0.9,
						ease: 'elastic.out(1, 0.35)',
						overwrite: true,
					});
				}
			});
		};

		// Restore tất cả khi chuột rời khỏi viewport
		const onMouseLeave = () => {
			chars.forEach((_char, i) => {
				scattered[i] = false;
			});
			gsap.to(chars, {
				x: 0,
				y: 0,
				rotation: 0,
				opacity: 1,
				duration: 0.9,
				ease: 'elastic.out(1, 0.35)',
				stagger: 0.03,
				overwrite: true,
			});
		};

		window.addEventListener('mousemove', onMouseMove);
		document.documentElement.addEventListener('mouseleave', onMouseLeave);

		return () => {
			entrance.kill();
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('resize', cacheCenters);
			document.documentElement.removeEventListener('mouseleave', onMouseLeave);
		};
	}, []);

	return (
		<span ref={containerRef} className={className} aria-label={text}>
			{text.split('').map((char, i) => (
				<span key={i} className="char inline-block">
					{char === ' ' ? ' ' : char}
				</span>
			))}
		</span>
	);
}
