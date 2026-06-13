'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/lib/data';
import type { Project } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

type Slide = {
	project: Project;
	image: string | null;
	projectIndex: number;
	imageIndex: number;
	totalInProject: number;
};

function buildSlides(list: Project[]): Slide[] {
	const slides: Slide[] = [];
	list.forEach((project, pi) => {
		const imgs: (string | null)[] = project.images?.length
			? project.images
			: [null];
		imgs.forEach((img, ii) => {
			slides.push({
				project,
				image: img,
				projectIndex: pi,
				imageIndex: ii,
				totalInProject: imgs.length,
			});
		});
	});
	return slides;
}

// Scroll distance per stage. Stages = intro + each stacked image (see useGSAP).
const SCROLL_PER_STAGE = 700;

export default function Projects() {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const coverRef = useRef<HTMLDivElement>(null);
	const galleryRef = useRef<HTMLDivElement>(null);
	const infoRefs = useRef<(HTMLDivElement | null)[]>([]);
	const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

	const slides = buildSlides(projects);

	useGSAP(
		() => {
			// ── ONE unified scroll: cover → first project → every stacked image ──
			// Single timeline + single ScrollTrigger so snapping spans the whole
			// section. Each "stage" is one scroll unit:
			//   stage 0  = cover fully shown (gallery waiting below)
			//   stage 1  = gallery (terrain + first project) stacked over cover
			//   stage k  = k-th image stacked over the previous
			//
			// Cover (navy + label) is LOCKED — it never moves; the gallery rises over it.
			gsap.set(galleryRef.current, { yPercent: 100 });
			gsap.set(infoRefs.current[0] ?? null, { opacity: 1 });
			slideRefs.current.forEach((el, i) => {
				if (!el) return;
				gsap.set(el, { yPercent: i === 0 ? 0 : 100 });
			});
			infoRefs.current.forEach((el, i) => {
				if (!el || i === 0) return;
				gsap.set(el, { opacity: 0, y: 60 });
			});

			const tl = gsap.timeline();

			// Stage 0→1: intro — gallery (terrain wave + first project) rises over the cover
			tl.to(
				galleryRef.current,
				{ yPercent: 0, duration: 1, ease: 'power2.inOut' },
				0,
			);

			// Stage k→k+1: each next image stacks up over the previous (offset by the intro unit)
			slides.forEach((slide, i) => {
				if (i === 0) return;
				const prev = slides[i - 1];
				const at = i; // intro occupies [0,1]; slide i transition lives at [i, i+1]

				tl.to(
					slideRefs.current[i],
					{ yPercent: 0, duration: 1, ease: 'power2.inOut' },
					at,
				);

				if (slide.projectIndex !== prev.projectIndex) {
					tl.to(
						infoRefs.current[prev.projectIndex],
						{ opacity: 0, y: -60, duration: 0.35 },
						at + 0.15,
					);
					tl.to(
						infoRefs.current[slide.projectIndex],
						{ opacity: 1, y: 0, duration: 0.45 },
						at + 0.5,
					);
				}
			});

			// Total stages = intro (1) + remaining image transitions (slides.length - 1) = slides.length
			const stages = slides.length;
			const snapPoints = Array.from(
				{ length: stages + 1 },
				(_, i) => i / stages,
			);

			ScrollTrigger.create({
				trigger: wrapperRef.current,
				start: 'top top',
				end: `+=${stages * SCROLL_PER_STAGE}`,
				pin: true,
				anticipatePin: 1,
				scrub: 1,
				animation: tl,
				snap: {
					snapTo: snapPoints,
					// Nearest-point snap → if you don't scroll past the midpoint,
					// it rolls back to the point you came from.
					directional: false,
					duration: { min: 0.25, max: 0.7 },
					delay: 0.05,
					ease: 'power2.inOut',
				},
			});
		},
		{ scope: wrapperRef },
	);

	return (
		<section
			id="projects"
			data-projects-wrapper
			aria-label="Projects"
			className="bg-[#04091a]">
			<div
				ref={wrapperRef}
				className="relative h-svh overflow-hidden bg-[#04091a]">
				{/* ── Cover — LOCKED back layer: navy + static label (never moves) ── */}
				<div
					ref={coverRef}
					className="absolute inset-0 z-10 overflow-hidden"
					aria-hidden>
					<div
						className="absolute inset-0"
						style={{ background: '#04091a' }}
					/>
					<div className="absolute inset-0 flex flex-col items-center justify-center gap-5 select-none">
						<p className="font-mono text-[11px] tracking-[0.55em] uppercase text-white/30">
							featured work
						</p>
						<h2
							className="font-bold text-white/90 leading-none text-center"
							style={{ fontSize: 'clamp(4.5rem, 13vw, 10rem)' }}>
							Projects
						</h2>
						<div className="flex items-center gap-4 mt-2">
							<div className="w-8 h-px bg-white/15" />
							<span className="font-mono text-[10px] text-white/20 tracking-[0.45em] uppercase">
								scroll
							</span>
							<div className="w-8 h-px bg-white/15" />
						</div>
					</div>
				</div>

				{/* ── Gallery panel — terrain wave (top edge) + slides, slide UP together ── */}
				<div
					ref={galleryRef}
					className="absolute inset-0 z-20 bg-[#04091a]">
					{/* Terrain wave — leading edge, sits just above the gallery, rises with it */}
					<svg
						className="absolute left-0 right-0 -mb-2 bottom-full w-full h-[22vh] sm:h-[38vh]"
						viewBox="0 0 1440 360"
						preserveAspectRatio="none"
						xmlns="http://www.w3.org/2000/svg">
						<defs>
							<linearGradient
								id="mg1"
								x1="0"
								y1="0"
								x2="0"
								y2="1">
								<stop
									offset="0%"
									stopColor="#93C5FD"
									stopOpacity="0.55"
								/>
								<stop
									offset="100%"
									stopColor="#2563EB"
									stopOpacity="0.85"
								/>
							</linearGradient>
							<linearGradient
								id="mg2"
								x1="0"
								y1="0"
								x2="0"
								y2="1">
								<stop
									offset="0%"
									stopColor="#3B82F6"
									stopOpacity="0.8"
								/>
								<stop
									offset="100%"
									stopColor="#1D4ED8"
									stopOpacity="1"
								/>
							</linearGradient>
							<linearGradient
								id="mg3"
								x1="0"
								y1="0"
								x2="0"
								y2="1">
								<stop
									offset="0%"
									stopColor="#1E40AF"
									stopOpacity="0.95"
								/>
								<stop
									offset="100%"
									stopColor="#04091a"
									stopOpacity="1"
								/>
							</linearGradient>
						</defs>
						<path
							className="morph-terrain-1"
							d="M 0,120 C 80,98 160,110 240,120 C 320,130 400,100 480,86 C 560,72 640,96 720,120 C 800,144 880,128 960,104 C 1040,80 1120,98 1200,120 C 1280,142 1360,130 1440,120 L 1440,360 L 0,360 Z"
							fill="url(#mg1)"
						/>
						<path
							className="morph-terrain-2"
							d="M 0,180 C 80,158 160,170 240,180 C 320,190 400,160 480,146 C 560,132 640,156 720,180 C 800,204 880,188 960,164 C 1040,140 1120,158 1200,180 C 1280,202 1360,190 1440,180 L 1440,360 L 0,360 Z"
							fill="url(#mg2)"
						/>
						<path
							className="morph-terrain-3"
							d="M 0,240 C 80,220 160,232 240,240 C 320,248 400,224 480,212 C 560,200 640,222 720,240 C 800,258 880,244 960,226 C 1040,208 1120,222 1200,240 C 1280,258 1360,248 1440,240 L 1440,360 L 0,360 Z"
							fill="url(#mg3)"
						/>
					</svg>

					{/* Solid gallery base so the rising panel is opaque */}
					<div className="absolute inset-0 bg-[#04091a] -z-10" />

					{/* ── Image slides ── */}
					{slides.map((slide, i) => (
						<div
							key={i}
							ref={(el) => {
								slideRefs.current[i] = el;
							}}
							className="absolute inset-0 bg-[#04091a]">
							{slide.image ? (
								<Image
									src={slide.image}
									alt={`${slide.project.title} preview`}
									fill
									className="object-contain object-center"
									sizes="100vw"
									loading="eager"
									priority={i === 0}
								/>
							) : (
								<div className="absolute inset-0 bg-white/5" />
							)}
							<div
								className="absolute inset-0"
								style={{
									background:
										'linear-gradient(to top, #04091a 0%, color-mix(in srgb, #04091a 55%, transparent) 45%, color-mix(in srgb, #04091a 10%, transparent) 100%)',
								}}
							/>
							{slide.totalInProject > 1 && (
								<span className="absolute top-8 right-8 font-mono text-[11px] text-white/40 z-20">
									{slide.imageIndex + 1} / {slide.totalInProject}
								</span>
							)}
						</div>
					))}

					{/* ── Per-project info overlay ── */}
					{projects.map((project, pi) => (
						<div
							key={project.title}
							ref={(el) => {
								infoRefs.current[pi] = el;
							}}
							className="absolute inset-0 flex flex-col justify-between px-6 pt-8 pb-12 sm:px-14 sm:pt-10 sm:pb-14 pointer-events-none">
							<div className="flex items-center justify-between">
								<span className="font-mono text-xs tracking-[0.2em] uppercase text-white/30">
									Projects
								</span>
								<span className="font-mono text-xs text-white/30">
									{String(pi + 1).padStart(2, '0')} /{' '}
									{String(projects.length).padStart(2, '0')}
								</span>
							</div>

							<div className="flex flex-col gap-5 max-w-2xl">
								<h3 className="font-bold text-[clamp(2rem,5vw,3.75rem)] text-white leading-[1.05]">
									{project.title}
								</h3>
								<p className="text-sm text-white/50 leading-relaxed max-w-md">
									{project.description}
								</p>
								<div className="flex flex-wrap items-center gap-2 pointer-events-auto">
									{project.tech.map((t) => (
										<span
											key={t}
											className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-white/10 text-white/75 border border-white/10 backdrop-blur-sm">
											{t}
										</span>
									))}
									{project.link && (
										<a
											href={project.link}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:opacity-60 transition-opacity ml-1">
											View project <span aria-hidden>→</span>
										</a>
									)}
								</div>
								<div className="flex gap-2 pt-1">
									{projects.map((_, di) => (
										<div
											key={di}
											className={`h-px w-8 transition-colors duration-300 ${di === pi ? 'bg-white' : 'bg-white/20'}`}
										/>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
				{/* ── End gallery panel ── */}
			</div>
		</section>
	);
}
