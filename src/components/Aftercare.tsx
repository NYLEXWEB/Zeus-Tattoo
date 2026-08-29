"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Droplets, Heart, Sun, MessageCircle, Sparkles, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Aftercare() {
    const pinRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const progressFillRef = useRef<HTMLDivElement>(null);

    // References for 4 content panels
    const panel0Ref = useRef<HTMLDivElement>(null);
    const panel1Ref = useRef<HTMLDivElement>(null);
    const panel2Ref = useRef<HTMLDivElement>(null);
    const panel3Ref = useRef<HTMLDivElement>(null);

    // References for artwork visual layers
    const artFrameRef = useRef<HTMLDivElement>(null);
    const wrapOverlayRef = useRef<HTMLDivElement>(null);
    const textureOverlayRef = useRef<HTMLDivElement>(null);
    const healedGlowRef = useRef<HTMLDivElement>(null);

    const [activeStage, setActiveStage] = useState(0);

    const stages = [
        {
            num: "01",
            title: "FIRST 24 - 48 HOURS",
            subtitle: "Protective Dermal Barrier Wrap",
            desc: "Leave your clinical dermal barrier film on for 24-48 hours. It protects raw skin from external bacteria while locking in natural healing fluids.",
            icon: <ShieldCheck size={18} className="text-[#e58c38]" />,
            tag: "STAGE 01 • DERMAL BARRIER",
        },
        {
            num: "02",
            title: "DAYS 2 - 7",
            subtitle: "Sterile Cleansing & Micro-Hydration",
            desc: "Wash gently with lukewarm water and fragrance-free antibacterial wash. Apply a whisper-thin layer of organic salve 2-3 times daily to preserve line sharpness.",
            icon: <Droplets size={18} className="text-[#e58c38]" />,
            tag: "STAGE 02 • MICRO-CLEANSING",
        },
        {
            num: "03",
            title: "DAYS 8 - 14",
            subtitle: "Natural Peeling & Epidermal Shedding",
            desc: "Allow peeling skin to shed naturally without picking or scratching. Maintain light hydration to keep linework supple and prevent scab cracking.",
            icon: <Heart size={18} className="text-[#e58c38]" />,
            tag: "STAGE 03 • EPIDERMAL SHEDDING",
        },
        {
            num: "04",
            title: "DAY 30+",
            subtitle: "Fully Healed Permanent Masterpiece",
            desc: "Your tattoo is now fully integrated into the dermal layer. Apply SPF 50 sunscreen when exposed to direct sunlight to preserve lifetime contrast.",
            icon: <Sun size={18} className="text-[#e58c38]" />,
            tag: "STAGE 04 • PERMANENT SATURATION",
        },
    ];

    useEffect(() => {
        const pinEl = pinRef.current;
        const containerEl = containerRef.current;
        if (!pinEl || !containerEl) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: pinEl,
                    start: "top top",
                    end: "+=320%",
                    pin: true,
                    scrub: 1.2,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        const prog = self.progress;
                        if (progressFillRef.current) {
                            progressFillRef.current.style.width = `${prog * 100}%`;
                        }
                        const current = Math.min(3, Math.floor(prog * 4));
                        setActiveStage(current);
                    },
                },
            });

            // 1. Initial State -> Stage 01
            tl.to(headingRef.current, { y: -10, duration: 0.5 });

            // 2. Transition Stage 01 -> Stage 02
            tl.to(panel0Ref.current, { opacity: 0, y: -30, duration: 1 })
                .to(wrapOverlayRef.current, { opacity: 0, duration: 1 }, "<")
                .fromTo(panel1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "<+=0.3")
                .to(artFrameRef.current, { scale: 1.03, rotate: 1, duration: 1 }, "<");

            // 3. Transition Stage 02 -> Stage 03 (Peeling Texture Reveal)
            tl.to(panel1Ref.current, { opacity: 0, y: -30, duration: 1 })
                .fromTo(textureOverlayRef.current, { opacity: 0 }, { opacity: 0.4, duration: 1 }, "<")
                .fromTo(panel2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "<+=0.3")
                .to(artFrameRef.current, { scale: 1.06, rotate: -1, duration: 1 }, "<");

            // 4. Transition Stage 03 -> Stage 04 (Fully Healed Crystal Glow Reveal)
            tl.to(panel2Ref.current, { opacity: 0, y: -30, duration: 1 })
                .to(textureOverlayRef.current, { opacity: 0, duration: 1 }, "<")
                .fromTo(healedGlowRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.2 }, "<")
                .fromTo(panel3Ref.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.2 }, "<+=0.3")
                .to(artFrameRef.current, { scale: 1, rotate: 0, duration: 1 }, "<");

        }, containerEl);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} id="aftercare" className="relative bg-[#0b0d12] text-white">
            {/* Pinned Viewport Container */}
            <div ref={pinRef} className="h-screen w-full flex flex-col justify-between py-12 px-6 md:px-12 relative overflow-hidden border-b border-white/5">

                {/* Ambient Glow Backdrop */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#e58c38]/10 rounded-full blur-[150px] pointer-events-none" />

                {/* Top Header Bar & Stage Progress Counter */}
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-20">
                    <div ref={headingRef} className="flex flex-col">
                        <span className="font-sans text-[10px] sm:text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase flex items-center gap-2 mb-1">
                            <Sparkles size={12} />
                            THE HEALING JOURNEY
                        </span>
                        <h2 className="font-sans text-2xl sm:text-4xl font-extrabold uppercase tracking-wide text-white">
                            TATTOO AFTERCARE & HEALING
                        </h2>
                    </div>

                    {/* Stage Progress Indicator */}
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2 mb-2 font-sans font-extrabold text-sm sm:text-base tracking-widest text-[#e58c38]">
                            <span>0{activeStage + 1}</span>
                            <span className="text-gray-500">/</span>
                            <span className="text-gray-400">04</span>
                        </div>

                        <div className="w-36 sm:w-48 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/10">
                            <div
                                ref={progressFillRef}
                                style={{ width: `${(activeStage + 1) * 25}%` }}
                                className="h-full bg-gradient-to-r from-[#e58c38] to-[#d97706] rounded-full transition-all duration-300 shadow-[0_0_10px_#e58c38]"
                            />
                        </div>
                    </div>
                </div>

                {/* Center Viewport Layout: Left Artwork Transformation / Right Stage Content */}
                <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-20">

                    {/* Left Single Shared Artwork Frame (Transforms through all 4 healing stages) */}
                    <div className="lg:col-span-6 relative h-[300px] sm:h-[400px] lg:h-[460px] w-full flex items-center justify-center">

                        <div
                            ref={artFrameRef}
                            className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#e58c38] bg-[#121620] shadow-[0_0_45px_rgba(229,140,56,0.25)] transition-all duration-700"
                        >
                            {/* Master Artwork Image */}
                            <img
                                src="/images/portfolio_lion_realism.jpg"
                                alt="Continuous Tattoo Artwork Healing Transformation"
                                className="w-full h-full object-cover grayscale brightness-95"
                            />

                            {/* Stage 01: Dermal Wrap Film Overlay */}
                            <div
                                ref={wrapOverlayRef}
                                className="absolute inset-0 bg-[#38bdf8]/15 backdrop-blur-[2px] border-4 border-dashed border-[#38bdf8]/40 flex items-center justify-center pointer-events-none transition-opacity duration-500"
                            >
                                <span className="bg-[#0b0d12]/90 border border-[#38bdf8] text-[#38bdf8] font-sans text-[10px] tracking-[0.25em] font-extrabold px-3 py-1.5 rounded-full uppercase">
                                    STERILE DERMAL BARRIER FILM ATTACHED
                                </span>
                            </div>

                            {/* Stage 03: Peeling Texture Overlay */}
                            <div
                                ref={textureOverlayRef}
                                className="absolute inset-0 bg-black/40 mix-blend-overlay opacity-0 pointer-events-none transition-opacity duration-500"
                            />

                            {/* Stage 04: Healed Gold Glow Frame */}
                            <div
                                ref={healedGlowRef}
                                className="absolute inset-0 bg-gradient-to-t from-[#0b0d12]/90 via-transparent to-transparent opacity-0 pointer-events-none transition-opacity duration-500"
                            />

                            {/* Dynamic Stage Tag Badge */}
                            <div className="absolute bottom-4 left-4 z-10 bg-[#0b0d12]/90 backdrop-blur-md border border-[#e58c38]/40 px-3.5 py-1 rounded-full text-[10px] tracking-[0.25em] font-sans text-[#e58c38] uppercase font-extrabold">
                                {stages[activeStage].tag}
                            </div>
                        </div>

                    </div>

                    {/* Right Panel Stack (Content morphs per stage) */}
                    <div className="lg:col-span-6 relative h-[260px] sm:h-[300px] w-full flex items-center">

                        {/* Stage 01 Copy */}
                        <div ref={panel0Ref} className="absolute inset-0 flex flex-col justify-center items-start">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="font-sans text-3xl font-extrabold text-[#e58c38]">01</span>
                                <span className="text-[10px] tracking-[0.3em] font-sans font-extrabold text-gray-400 uppercase">
                                    {stages[0].subtitle}
                                </span>
                            </div>
                            <h3 className="font-sans text-3xl sm:text-4xl font-extrabold uppercase text-white mb-4">
                                {stages[0].title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed tracking-wide mb-6">
                                {stages[0].desc}
                            </p>
                        </div>

                        {/* Stage 02 Copy */}
                        <div ref={panel1Ref} className="absolute inset-0 flex flex-col justify-center items-start opacity-0">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="font-sans text-3xl font-extrabold text-[#e58c38]">02</span>
                                <span className="text-[10px] tracking-[0.3em] font-sans font-extrabold text-gray-400 uppercase">
                                    {stages[1].subtitle}
                                </span>
                            </div>
                            <h3 className="font-sans text-3xl sm:text-4xl font-extrabold uppercase text-white mb-4">
                                {stages[1].title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed tracking-wide mb-6">
                                {stages[1].desc}
                            </p>
                        </div>

                        {/* Stage 03 Copy */}
                        <div ref={panel2Ref} className="absolute inset-0 flex flex-col justify-center items-start opacity-0">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="font-sans text-3xl font-extrabold text-[#e58c38]">03</span>
                                <span className="text-[10px] tracking-[0.3em] font-sans font-extrabold text-gray-400 uppercase">
                                    {stages[2].subtitle}
                                </span>
                            </div>
                            <h3 className="font-sans text-3xl sm:text-4xl font-extrabold uppercase text-white mb-4">
                                {stages[2].title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed tracking-wide mb-6">
                                {stages[2].desc}
                            </p>
                        </div>

                        {/* Stage 04 Copy */}
                        <div ref={panel3Ref} className="absolute inset-0 flex flex-col justify-center items-start opacity-0">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="font-sans text-3xl font-extrabold text-[#e58c38]">04</span>
                                <span className="text-[10px] tracking-[0.3em] font-sans font-extrabold text-gray-400 uppercase">
                                    {stages[3].subtitle}
                                </span>
                            </div>
                            <h3 className="font-sans text-3xl sm:text-4xl font-extrabold uppercase text-white mb-4">
                                {stages[3].title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed tracking-wide mb-6">
                                {stages[3].desc}
                            </p>
                        </div>

                    </div>

                </div>

                {/* Bottom Bar: Direct WhatsApp Consultation & Stage Pills */}
                <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-6 z-20 border-t border-white/10 pt-6">
                    <div className="flex flex-wrap items-center gap-2">
                        {stages.map((s, idx) => (
                            <div
                                key={s.num}
                                className={`px-3.5 py-1.5 rounded-full text-[10px] font-sans font-extrabold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 ${activeStage === idx
                                        ? "bg-[#e58c38] text-black shadow-[0_0_15px_#e58c38]"
                                        : "bg-[#121620] text-gray-400 border border-white/10"
                                    }`}
                            >
                                <span>{s.num}</span>
                                <span className="hidden md:inline">{s.title.split(" ")[0]}</span>
                            </div>
                        ))}
                    </div>

                    <a
                        href="https://wa.me/919876543210"
                        target="_blank"
                        rel="noreferrer"
                        className="group px-7 py-3 bg-gradient-to-r from-[#e58c38] to-[#d97706] hover:from-[#f39c12] hover:to-[#e67e22] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(229,140,56,0.35)]"
                    >
                        <MessageCircle size={15} />
                        WHATSAPP AFTERCARE TEAM
                    </a>
                </div>

            </div>
        </div>
    );
}
