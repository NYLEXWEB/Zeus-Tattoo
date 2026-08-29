"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SharedImageTransition() {
    const triggerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const title1Ref = useRef<HTMLHeadingElement>(null);
    const title2Ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const triggerEl = triggerRef.current;
        const imageEl = imageRef.current;
        if (!triggerEl || !imageEl) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerEl,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.2,
                },
            });

            // 1. Initial State -> Middle Viewport Transformation
            tl.fromTo(
                imageEl,
                {
                    scale: 0.65,
                    borderRadius: "40px",
                    rotate: -5,
                    y: -100,
                },
                {
                    scale: 1,
                    borderRadius: "16px",
                    rotate: 0,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                }
            );

            // 2. Title parallax shifts
            tl.to(
                title1Ref.current,
                {
                    xPercent: -20,
                    duration: 1,
                },
                0
            );

            tl.to(
                title2Ref.current,
                {
                    xPercent: 20,
                    duration: 1,
                },
                0
            );

            // 3. Exit Morphing into Next Section Frame
            tl.to(
                imageEl,
                {
                    scale: 1.05,
                    borderRadius: "0px",
                    y: 80,
                    duration: 1,
                    ease: "power2.in",
                },
                ">"
            );
        }, triggerEl);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={triggerRef} className="relative bg-[#0b0d12] py-20 overflow-hidden border-b border-white/5 text-white">
            {/* Background Kinetic Marquee Typography */}
            <div className="absolute inset-0 flex flex-col justify-center pointer-events-none opacity-10 select-none overflow-hidden">
                <h3
                    ref={title1Ref}
                    className="font-sans text-7xl sm:text-9xl font-extrabold text-white uppercase whitespace-nowrap tracking-widest"
                >
                    ZEUS TATTOO • BESPOKE CRAFT • KORAMANGALA
                </h3>
                <h3
                    ref={title2Ref}
                    className="font-sans text-7xl sm:text-9xl font-extrabold text-[#e58c38] uppercase whitespace-nowrap tracking-widest mt-4"
                >
                    CLINICAL PIERCING • SACRED SKIN ARTICULATION
                </h3>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center justify-center">

                {/* Section Label */}
                <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-4 flex items-center gap-2">
                    <Sparkles size={13} />
                    SHARED ELEMENT TRANSITION
                </span>

                {/* Morphing Traveling Image Frame */}
                <div
                    ref={imageRef}
                    className="w-full max-w-4xl aspect-[16/9] overflow-hidden border border-[#e58c38]/40 bg-[#121620] shadow-[0_0_50px_rgba(229,140,56,0.25)] relative group"
                >
                    <img
                        src="/images/portfolio_floral_fineline.jpg"
                        alt="Shared Element Tattoo Artwork Transition"
                        className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12] via-transparent to-[#0b0d12]/40" />

                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10 bg-[#0b0d12]/90 backdrop-blur-md border border-white/10 px-6 py-3 rounded-xl">
                        <span className="font-sans text-xs font-extrabold tracking-widest text-white uppercase">
                            GALLERY ➔ PIERCING SANCTUARY CONTINUITY
                        </span>
                        <span className="text-[10px] tracking-[0.25em] font-sans text-[#e58c38] uppercase font-bold">
                            100% STERILE
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}
