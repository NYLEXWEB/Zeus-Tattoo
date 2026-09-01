"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface PinnedStoryProps {
    onOpenBooking?: () => void;
}

export default function PinnedStorySection({ onOpenBooking }: PinnedStoryProps) {
    const pinRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const image1Ref = useRef<HTMLDivElement>(null);
    const image2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const pinEl = pinRef.current;
        const containerEl = containerRef.current;
        if (!pinEl || !containerEl) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: pinEl,
                    start: "top top",
                    end: "+=140%",
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                },
            });

            // 1. Scale Heading & Letter Spacing
            tl.to(headingRef.current, {
                scale: 1.05,
                letterSpacing: "0.15em",
                duration: 1,
            });

            // 2. Reveal Image 1 (Macro Drafting)
            tl.to(
                image1Ref.current,
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    scale: 1,
                    duration: 1.2,
                    ease: "power2.inOut",
                },
                "-=0.5"
            );

            // 3. Reveal Image 2 (Shading & Saturation)
            tl.to(
                image2Ref.current,
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    scale: 1,
                    rotate: 0,
                    duration: 1.2,
                    ease: "power2.inOut",
                },
                "-=0.6"
            );
        }, containerEl);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative bg-[#0b0d12] text-white z-20">
            {/* Pinned Viewport Container */}
            <div ref={pinRef} className="h-screen w-full flex items-center justify-center relative border-b border-white/5 overflow-hidden">

                {/* Glow backdrop */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#e58c38]/5 rounded-full blur-[160px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">

                    {/* Left Pinned Story Text */}
                    <div className="lg:col-span-6 flex flex-col items-start">
                        <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-4 flex items-center gap-2">
                            <Sparkles size={13} />
                            PINNED SCROLL EXPERIENCE
                        </span>

                        <h2
                            ref={headingRef}
                            className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide text-white leading-tight mb-6 origin-left transition-transform"
                        >
                            SACRED SKIN <br />
                            <span className="text-[#e58c38] italic font-serif">ARTICULATION</span>
                        </h2>
                        <div className="w-16 h-[3px] bg-gradient-to-r from-[#e58c38] to-[#d97706] mb-6 rounded-full shadow-[0_0_10px_#e58c38]" />

                        <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed tracking-wide max-w-lg mb-8">
                            Watch as your skin transforms. Through continuous scroll scrubbing, our master artists compose neoclassical linework that flows dynamically with your muscle geometry.
                        </p>

                        <button
                            onClick={onOpenBooking}
                            className="group px-7 py-3.5 bg-gradient-to-r from-[#e58c38] to-[#d97706] hover:from-[#f39c12] hover:to-[#e67e22] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(229,140,56,0.35)]"
                        >
                            START YOUR PIECE
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Right Transforming Images Stack */}
                    <div className="lg:col-span-6 relative h-[360px] sm:h-[460px] w-full flex items-center justify-center">

                        {/* Image 1 Frame */}
                        <div
                            ref={image1Ref}
                            style={{ clipPath: "inset(100% 0% 0% 0%)" }}
                            className="absolute inset-0 rounded-2xl overflow-hidden border border-[#e58c38]/40 bg-[#121620] shadow-[0_0_35px_rgba(229,140,56,0.2)] scale-90"
                        >
                            <img
                                src="/images/IMG_20260829_212801_249.jpg"
                                alt="Master Tattoo Articulation"
                                className="w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12]/80 via-transparent to-transparent" />
                            <span className="absolute bottom-4 left-4 text-[10px] tracking-[0.25em] text-[#e58c38] font-sans uppercase font-extrabold bg-[#0b0d12]/90 backdrop-blur-md border border-[#e58c38]/30 px-3 py-1 rounded-full">
                                STAGE 01 • MACRO DRAFTING
                            </span>
                        </div>

                        {/* Image 2 Frame Overlay */}
                        <div
                            ref={image2Ref}
                            style={{ clipPath: "inset(0% 100% 0% 0%)" }}
                            className="absolute inset-4 rounded-2xl overflow-hidden border border-white/20 bg-[#121620] shadow-[0_0_40px_rgba(0,0,0,0.8)] scale-90 z-20"
                        >
                            <img
                                src="/images/IMG_20260829_212809_269.jpg"
                                alt="Master Tattoo Linework"
                                className="w-full h-full object-cover brightness-90 hover:brightness-100 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12]/80 via-transparent to-transparent" />
                            <span className="absolute bottom-4 left-4 text-[10px] tracking-[0.25em] text-[#e58c38] font-sans uppercase font-extrabold bg-[#0b0d12]/90 backdrop-blur-md border border-[#e58c38]/30 px-3 py-1 rounded-full">
                                STAGE 02 • SHADING & SATURATION
                            </span>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
