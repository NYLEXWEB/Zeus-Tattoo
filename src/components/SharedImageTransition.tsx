"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowDown } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SharedImageTransition() {
    const pinRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageFrameRef = useRef<HTMLDivElement>(null);
    const marquee1Ref = useRef<HTMLHeadingElement>(null);
    const marquee2Ref = useRef<HTMLHeadingElement>(null);
    const labelARef = useRef<HTMLDivElement>(null);
    const labelBRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const pinEl = pinRef.current;
        const containerEl = containerRef.current;
        const imageEl = imageFrameRef.current;
        if (!pinEl || !containerEl || !imageEl) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: pinEl,
                    start: "top top",
                    end: "+=180%",
                    pin: true,
                    scrub: 1.2,
                    anticipatePin: 1,
                },
            });

            // 1. Initial State -> Travel & Scale across Viewport
            tl.to(imageEl, {
                scale: 1.15,
                borderRadius: "24px",
                rotate: 0,
                duration: 1,
                ease: "power2.out",
            });

            // 2. Marquee Text Parallax Shifts in Opposite Directions
            tl.to(
                marquee1Ref.current,
                {
                    xPercent: -25,
                    duration: 1.5,
                },
                0
            );

            tl.to(
                marquee2Ref.current,
                {
                    xPercent: 25,
                    duration: 1.5,
                },
                0
            );

            // 3. Label A fades out, Label B fades in
            tl.to(labelARef.current, { opacity: 0, y: -20, duration: 0.5 }, 0.5);
            tl.to(labelBRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.8);

            // 4. Final Morph & Settle into Section B (Services Header Anchor)
            tl.to(imageEl, {
                scale: 0.9,
                borderRadius: "40px",
                y: 60,
                duration: 1,
                ease: "power2.inOut",
            });
        }, containerEl);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative bg-[#0b0d12] text-white">
            {/* Pinned Shared Transition Viewport */}
            <div ref={pinRef} className="h-screen w-full flex items-center justify-center relative overflow-hidden border-b border-white/5">

                {/* Background Kinetic Marquee Typography */}
                <div className="absolute inset-0 flex flex-col justify-center pointer-events-none opacity-10 select-none overflow-hidden">
                    <h3
                        ref={marquee1Ref}
                        className="font-sans text-8xl sm:text-9xl font-extrabold text-white uppercase whitespace-nowrap tracking-widest"
                    >
                        ZEUS TATTOO • MASTERWORK ARTISTRY • BESPOKE REALISM
                    </h3>
                    <h3
                        ref={marquee2Ref}
                        className="font-sans text-8xl sm:text-9xl font-extrabold text-[#e58c38] uppercase whitespace-nowrap tracking-widest mt-4"
                    >
                        SACRED SKIN CONTINUITY • 100% STERILE CRAFT
                    </h3>
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center justify-center relative z-10">

                    {/* Section A Label */}
                    <div ref={labelARef} className="flex flex-col items-center text-center mb-6">
                        <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase flex items-center gap-2 mb-2">
                            <Sparkles size={13} />
                            SECTION A: THE STUDIO MASTERPIECE
                        </span>
                        <h2 className="font-sans text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-white">
                            CONTINUOUS ARTWORK STORYTELLING
                        </h2>
                    </div>

                    {/* THE MANDATORY SHARED IMAGE FRAME (Travels between Section A & Section B) */}
                    <div
                        ref={imageFrameRef}
                        style={{ borderRadius: "48px" }}
                        className="w-full max-w-3xl aspect-[16/9] overflow-hidden border-2 border-[#e58c38] bg-[#121620] shadow-[0_0_60px_rgba(229,140,56,0.3)] relative group cursor-pointer transition-shadow duration-500 scale-90 -rotate-2"
                    >
                        <img
                            src="/images/portfolio_lion_realism.jpg"
                            alt="Shared Artwork Continuum (Lion Realism)"
                            className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12]/90 via-transparent to-transparent pointer-events-none" />

                        {/* Inner Interactive Overlay Badge */}
                        <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between z-10 bg-[#0b0d12]/90 backdrop-blur-md border border-[#e58c38]/40 px-5 py-3 rounded-2xl shadow-xl">
                            <div className="flex items-center gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#e58c38] animate-ping" />
                                <span className="font-sans text-xs font-extrabold tracking-widest text-white uppercase">
                                    SHARED VISUAL ELEMENT CONTINUITY
                                </span>
                            </div>
                            <span className="text-[10px] tracking-[0.25em] font-sans text-[#e58c38] uppercase font-bold flex items-center gap-1">
                                SCROLL TO TRAVEL <ArrowDown size={12} />
                            </span>
                        </div>
                    </div>

                    {/* Section B Label (Fades in on scroll) */}
                    <div ref={labelBRef} className="flex flex-col items-center text-center mt-6 opacity-0 translate-y-4">
                        <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase flex items-center gap-2 mb-1">
                            SECTION B: BESPOKE REALISM DISCIPLINE
                        </span>
                        <p className="text-xs text-gray-300 font-sans tracking-widest uppercase font-semibold">
                            The centerpiece artwork settles into the Studio Services showcase frame
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
