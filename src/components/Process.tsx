"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquare, Palette, ShieldCheck, Zap, ArrowRight, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProcessProps {
  onOpenBooking: () => void;
}

export default function Process({ onOpenBooking }: ProcessProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  // References for the 4 step cards
  const step0Ref = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  // References for the 4 image layers
  const img0Ref = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "CONSULTATION & VISION",
      subtitle: "Skeletal Placement & Concept Mapping",
      desc: "Connect online or inside our Koramangala sanctuary. We analyze reference imagery, skin tone, muscle movement, and anatomical placement to formulate your bespoke project.",
      icon: <MessageSquare size={18} className="text-[#e58c38]" />,
      image: "/images/about_story.jpg",
      tag: "PHASE 01 • INITIATION",
    },
    {
      num: "02",
      title: "BESPOKE 3D MAPPING",
      subtitle: "Anatomical Digital Rendering",
      desc: "Your master artist composes custom digital artwork sculpted directly over your body 3D geometry. We map linework flow so your tattoo dynamically flexes with muscle flex.",
      icon: <Palette size={18} className="text-[#e58c38]" />,
      image: "/images/IMG_20260829_212727_311.jpg",
      tag: "PHASE 02 • COMPOSITION",
    },
    {
      num: "03",
      title: "PRECISION INKING",
      subtitle: "120Hz Micro-Needle Saturation",
      desc: "Relax in our private sterile suite. Operating at 120 micro-vibrations per second with hospital-grade single-use needles, your piece is chiseled onto skin with zero bleed.",
      icon: <Zap size={18} className="text-[#e58c38]" />,
      image: "/images/IMG_20260829_212716_292.jpg",
      tag: "PHASE 03 • EXECUTION",
    },
    {
      num: "04",
      title: "CLINICAL AFTERCARE",
      subtitle: "Medical Barrier & 30-Day Support",
      desc: "Wrapped in breathable medical barrier film. Receive custom healing ointment and direct 30-day WhatsApp consultation with your master artist for flawless longevity.",
      icon: <ShieldCheck size={18} className="text-[#e58c38]" />,
      image: "/images/about_workspace.jpg",
      tag: "PHASE 04 • HEALING PROTOCOL",
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
            // Update progress bar fill width
            if (progressFillRef.current) {
              progressFillRef.current.style.width = `${prog * 100}%`;
            }
            // Update active step state
            const current = Math.min(3, Math.floor(prog * 4));
            setActiveStep(current);
          },
        },
      });

      // --- SCROLL TIMELINE SEQUENCE ---

      // 1. Initial Entry: Heading shifts
      tl.to(headingRef.current, {
        y: -10,
        duration: 0.5,
      });

      // 2. Transition Step 01 -> Step 02
      tl.to(step0Ref.current, { opacity: 0, y: -40, duration: 1 })
        .to(img0Ref.current, { opacity: 0, scale: 1.1, duration: 1 }, "<")
        .fromTo(step1Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, "<+=0.3")
        .fromTo(img1Ref.current, { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, "<");

      // 3. Transition Step 02 -> Step 03
      tl.to(step1Ref.current, { opacity: 0, y: -40, duration: 1 })
        .to(img1Ref.current, { opacity: 0, scale: 0.9, duration: 1 }, "<")
        .fromTo(step2Ref.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.2 }, "<+=0.3")
        .fromTo(
          img2Ref.current,
          { opacity: 0, scale: 1.2, rotate: -3 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1.2, ease: "power2.out" },
          "<"
        );

      // 4. Transition Step 03 -> Step 04
      tl.to(step2Ref.current, { opacity: 0, y: -40, duration: 1 })
        .to(img2Ref.current, { opacity: 0, scale: 1.1, duration: 1 }, "<")
        .fromTo(step3Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, "<+=0.3")
        .fromTo(img3Ref.current, { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, "<");

    }, containerEl);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id="process" className="relative bg-[#0b0d12] text-white">
      {/* Pinned Viewport Container */}
      <div ref={pinRef} className="h-screen w-full flex flex-col justify-between py-12 px-6 md:px-12 relative overflow-hidden border-b border-white/5">

        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#e58c38]/10 rounded-full blur-[150px] pointer-events-none" />

        {/* Top Bar: Section Title & Visual Progress Indicator */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-20">
          <div ref={headingRef} className="flex flex-col">
            <span className="font-sans text-[10px] sm:text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase flex items-center gap-2 mb-1">
              <Sparkles size={12} />
              THE CREATIVE PROCESS
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl font-extrabold uppercase tracking-wide text-white">
              HOW WE CREATE
            </h2>
          </div>

          {/* Step Number Counter & Progress Bar */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-2 font-sans font-extrabold text-sm sm:text-base tracking-widest text-[#e58c38]">
              <span>0{activeStep + 1}</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-400">04</span>
            </div>

            <div className="w-36 sm:w-48 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/10">
              <div
                ref={progressFillRef}
                style={{ width: `${(activeStep + 1) * 25}%` }}
                className="h-full bg-gradient-to-r from-[#e58c38] to-[#d97706] rounded-full transition-all duration-300 shadow-[0_0_10px_#e58c38]"
              />
            </div>
          </div>
        </div>

        {/* Center Canvas: Split Layout (Left Image Stack / Right Content Stack) */}
        <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-20">

          {/* Left Stack: 4 Morphing Image Layers */}
          <div className="lg:col-span-6 relative h-[300px] sm:h-[400px] lg:h-[460px] w-full flex items-center justify-center">

            {/* Image Layer 01 */}
            <div
              ref={img0Ref}
              className="absolute inset-0 rounded-2xl overflow-hidden border border-[#e58c38]/40 bg-[#121620] shadow-[0_0_40px_rgba(229,140,56,0.2)]"
            >
              <img src={steps[0].image} alt={steps[0].title} className="w-full h-full object-cover grayscale brightness-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12]/90 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-[10px] tracking-[0.25em] text-[#e58c38] font-sans uppercase font-extrabold bg-[#0b0d12]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#e58c38]/30">
                {steps[0].tag}
              </span>
            </div>

            {/* Image Layer 02 */}
            <div
              ref={img1Ref}
              className="absolute inset-0 rounded-2xl overflow-hidden border border-[#e58c38]/40 bg-[#121620] shadow-[0_0_40px_rgba(229,140,56,0.2)] opacity-0"
            >
              <img src={steps[1].image} alt={steps[1].title} className="w-full h-full object-cover grayscale brightness-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12]/90 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-[10px] tracking-[0.25em] text-[#e58c38] font-sans uppercase font-extrabold bg-[#0b0d12]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#e58c38]/30">
                {steps[1].tag}
              </span>
            </div>

            {/* Image Layer 03 */}
            <div
              ref={img2Ref}
              className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-[#e58c38] bg-[#121620] shadow-[0_0_50px_rgba(229,140,56,0.35)] opacity-0"
            >
              <img src={steps[2].image} alt={steps[2].title} className="w-full h-full object-cover grayscale brightness-100 hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12]/90 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-[10px] tracking-[0.25em] text-[#e58c38] font-sans uppercase font-extrabold bg-[#0b0d12]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#e58c38]/50 shadow-[0_0_15px_#e58c38]">
                {steps[2].tag}
              </span>
            </div>

            {/* Image Layer 04 */}
            <div
              ref={img3Ref}
              className="absolute inset-0 rounded-2xl overflow-hidden border border-[#e58c38]/40 bg-[#121620] shadow-[0_0_40px_rgba(229,140,56,0.2)] opacity-0"
            >
              <img src={steps[3].image} alt={steps[3].title} className="w-full h-full object-cover grayscale brightness-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12]/90 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-[10px] tracking-[0.25em] text-[#e58c38] font-sans uppercase font-extrabold bg-[#0b0d12]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#e58c38]/30">
                {steps[3].tag}
              </span>
            </div>

          </div>

          {/* Right Stack: 4 Morphing Copy Panels */}
          <div className="lg:col-span-6 relative h-[260px] sm:h-[300px] w-full flex items-center">

            {/* Step Copy 01 */}
            <div ref={step0Ref} className="absolute inset-0 flex flex-col justify-center items-start">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-sans text-3xl font-extrabold text-[#e58c38]">01</span>
                <span className="text-[10px] tracking-[0.3em] font-sans font-extrabold text-gray-400 uppercase">
                  {steps[0].subtitle}
                </span>
              </div>
              <h3 className="font-sans text-3xl sm:text-4xl font-extrabold uppercase text-white mb-4">
                {steps[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed tracking-wide mb-6">
                {steps[0].desc}
              </p>
            </div>

            {/* Step Copy 02 */}
            <div ref={step1Ref} className="absolute inset-0 flex flex-col justify-center items-start opacity-0">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-sans text-3xl font-extrabold text-[#e58c38]">02</span>
                <span className="text-[10px] tracking-[0.3em] font-sans font-extrabold text-gray-400 uppercase">
                  {steps[1].subtitle}
                </span>
              </div>
              <h3 className="font-sans text-3xl sm:text-4xl font-extrabold uppercase text-white mb-4">
                {steps[1].title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed tracking-wide mb-6">
                {steps[1].desc}
              </p>
            </div>

            {/* Step Copy 03 */}
            <div ref={step2Ref} className="absolute inset-0 flex flex-col justify-center items-start opacity-0">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-sans text-3xl font-extrabold text-[#e58c38]">03</span>
                <span className="text-[10px] tracking-[0.3em] font-sans font-extrabold text-gray-400 uppercase">
                  {steps[2].subtitle}
                </span>
              </div>
              <h3 className="font-sans text-3xl sm:text-4xl font-extrabold uppercase text-white mb-4">
                {steps[2].title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed tracking-wide mb-6">
                {steps[2].desc}
              </p>
            </div>

            {/* Step Copy 04 */}
            <div ref={step3Ref} className="absolute inset-0 flex flex-col justify-center items-start opacity-0">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-sans text-3xl font-extrabold text-[#e58c38]">04</span>
                <span className="text-[10px] tracking-[0.3em] font-sans font-extrabold text-gray-400 uppercase">
                  {steps[3].subtitle}
                </span>
              </div>
              <h3 className="font-sans text-3xl sm:text-4xl font-extrabold uppercase text-white mb-4">
                {steps[3].title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed tracking-wide mb-6">
                {steps[3].desc}
              </p>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Interactive Step Navigation Pills & CTA */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-6 z-20 border-t border-white/10 pt-6">
          <div className="flex flex-wrap items-center gap-2">
            {steps.map((s, idx) => (
              <div
                key={s.num}
                className={`px-3.5 py-1.5 rounded-full text-[10px] font-sans font-extrabold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 ${activeStep === idx
                  ? "bg-[#e58c38] text-black shadow-[0_0_15px_#e58c38]"
                  : "bg-[#121620] text-gray-400 border border-white/10"
                  }`}
              >
                <span>{s.num}</span>
                <span className="hidden md:inline">{s.title.split(" ")[0]}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onOpenBooking}
            className="group px-7 py-3 bg-gradient-to-r from-[#e58c38] to-[#d97706] hover:from-[#f39c12] hover:to-[#e67e22] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(229,140,56,0.35)]"
          >
            START YOUR PROCESS
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}
