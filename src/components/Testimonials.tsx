"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Sparkles, Quote, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Testimonials() {
  const pinRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  // References for 3 client story content panels
  const story0Ref = useRef<HTMLDivElement>(null);
  const story1Ref = useRef<HTMLDivElement>(null);
  const story2Ref = useRef<HTMLDivElement>(null);

  // References for 3 visual artwork frames
  const visual0Ref = useRef<HTMLDivElement>(null);
  const visual1Ref = useRef<HTMLDivElement>(null);
  const visual2Ref = useRef<HTMLDivElement>(null);

  const [activeStory, setActiveStory] = useState(0);
  const [hoveredClient, setHoveredClient] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const clientStories = [
    {
      id: "01",
      name: "Anjali Sharma",
      location: "Kottayam",
      role: "Hyper-Realism Sleeve Client",
      quote: "RAHUL CREATED A REALISM SLEEVE THAT LITERALLY LEAVES PEOPLE SPEECHLESS. CLINICAL CLEANLINESS & LEGENDARY ARTWORK.",
      desc: "Zeus Tattoo Studio is on a whole different level. The attention to anatomical muscle flow and micro-shading is unmatched across South India.",
      rating: 5,
      avatar: "/images/testimonial_anjali.jpg",
      artwork: "/images/IMG_20260829_212716_292.jpg",
      tag: "REALISM STORY • ANJALI",
    },
    {
      id: "02",
      name: "Rohit Kapoor",
      location: "Kochi",
      role: "Fine Line Floral Client",
      quote: "MEERA'S FINE LINE WORK IS MICRO-PRECISION PERFECTION. BREATHTAKING SINGLE-NEEDLE FLORAL COMPOSITION.",
      desc: "She took my rough ideas and transformed them into delicate botanical art. Cleanest, most gentle studio experience I have ever had.",
      rating: 5,
      avatar: "/images/testimonial_rohit.jpg",
      artwork: "/images/IMG_20260829_212719_574.jpg",
      tag: "FINE LINE STORY • ROHIT",
    },
    {
      id: "03",
      name: "Neha Patel",
      location: "Bengaluru",
      role: "Geometric Cover-Up Client",
      quote: "THE COVER-UP WORK BY SAHANA WAS MAGIC. MY FADED TATTOO IS GONE, REPLACED BY A GEOMETRIC MANDALA MASTERPIECE.",
      desc: "Mind-blowing stipple detail and total visual concealment. Truly a world-class neoclassical body art sanctuary.",
      rating: 5,
      avatar: "/images/testimonial_neha.jpg",
      artwork: "/images/IMG_20260829_212734_480.jpg",
      tag: "COVER-UP STORY • NEHA",
    },
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const pinEl = pinRef.current;
    const containerEl = containerRef.current;
    if (!pinEl || !containerEl) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const prog = self.progress;
            if (progressFillRef.current) {
              progressFillRef.current.style.width = `${prog * 100}%`;
            }
            const current = Math.min(2, Math.floor(prog * 3));
            setActiveStory(current);
          },
        },
      });

      // 1. Entrance Heading
      tl.to(headingRef.current, { y: -10, duration: 0.5 });

      // 2. Story 01 -> Story 02 Transition
      tl.to(story0Ref.current, { opacity: 0, y: -30, duration: 1 })
        .to(visual0Ref.current, { opacity: 0, scale: 0.9, rotate: -2, duration: 1 }, "<")
        .fromTo(story1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "<+=0.3")
        .fromTo(
          visual1Ref.current,
          { opacity: 0, scale: 1.1, clipPath: "inset(100% 0% 0% 0%)" },
          { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power2.out" },
          "<"
        );

      // 3. Story 02 -> Story 03 Transition
      tl.to(story1Ref.current, { opacity: 0, y: -30, duration: 1 })
        .to(visual1Ref.current, { opacity: 0, scale: 0.9, duration: 1 }, "<")
        .fromTo(story2Ref.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.2 }, "<+=0.3")
        .fromTo(
          visual2Ref.current,
          { opacity: 0, scale: 1.2, rotate: 3 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1.2, ease: "power2.out" },
          "<"
        );

    }, containerEl);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="testimonials"
      onMouseMove={handleMouseMove}
      className="relative bg-[#0b0d12] text-white overflow-hidden"
    >
      {/* Dynamic Cursor-Following Client Avatar Preview (Desktop Only) */}
      <AnimatePresence>
        {hoveredClient !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: cursorPos.x + 25,
              y: cursorPos.y - 80,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="pointer-events-none absolute top-0 left-0 z-40 hidden lg:flex items-center gap-3 bg-[#121620]/95 backdrop-blur-md border border-[#e58c38] px-4 py-2.5 rounded-full shadow-[0_0_30px_rgba(229,140,56,0.3)]"
          >
            <img
              src={clientStories[hoveredClient].avatar}
              alt={clientStories[hoveredClient].name}
              className="w-8 h-8 rounded-full object-cover border border-[#e58c38]"
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white font-sans uppercase">
                {clientStories[hoveredClient].name}
              </span>
              <span className="text-[9px] font-sans text-[#e58c38] font-semibold uppercase">
                {clientStories[hoveredClient].location}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pinned Viewport Container */}
      <div ref={pinRef} className="h-screen w-full flex flex-col justify-between py-12 px-6 md:px-12 relative overflow-hidden border-b border-white/5">

        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#e58c38]/10 rounded-full blur-[150px] pointer-events-none" />

        {/* Top Header Bar & Progress Counter */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-20">
          <div ref={headingRef} className="flex flex-col">
            <span className="font-sans text-[10px] sm:text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase flex items-center gap-2 mb-1">
              <Sparkles size={12} />
              REAL PEOPLE • REAL STORIES • REAL INK
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl font-extrabold uppercase tracking-wide text-white">
              WHAT OUR CLIENTS SAY
            </h2>
          </div>

          {/* Progress Counter */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-2 font-sans font-extrabold text-sm sm:text-base tracking-widest text-[#e58c38]">
              <span>0{activeStory + 1}</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-400">03</span>
            </div>

            <div className="w-36 sm:w-48 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/10">
              <div
                ref={progressFillRef}
                style={{ width: `${(activeStory + 1) * 33.3}%` }}
                className="h-full bg-gradient-to-r from-[#e58c38] to-[#d97706] rounded-full transition-all duration-300 shadow-[0_0_10px_#e58c38]"
              />
            </div>
          </div>
        </div>

        {/* Center Canvas Layout: Left Oversized Quote Typography / Right Tattoo Artwork Frame */}
        <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-20">

          {/* Left Stack: 3 Client Quote Panels */}
          <div className="lg:col-span-7 relative h-[320px] sm:h-[360px] w-full flex items-center">

            {/* Story 01 Quote */}
            <div ref={story0Ref} className="absolute inset-0 flex flex-col justify-center items-start">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-[#e58c38] stroke-none" />
                ))}
                <span className="text-[10px] tracking-[0.25em] font-sans text-gray-400 uppercase font-bold ml-2">
                  VERIFIED CLIENT REVIEWS
                </span>
              </div>

              <blockquote className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white uppercase leading-snug mb-6">
                "{clientStories[0].quote}"
              </blockquote>

              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed tracking-wide mb-6 max-w-xl">
                {clientStories[0].desc}
              </p>

              <div className="flex items-center gap-4 border-t border-white/10 pt-4 w-full">
                <img
                  src={clientStories[0].avatar}
                  alt={clientStories[0].name}
                  className="w-11 h-11 rounded-full object-cover border border-[#e58c38]"
                />
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-extrabold text-white uppercase tracking-wider">
                    {clientStories[0].name}
                  </span>
                  <span className="text-[10px] tracking-widest text-[#e58c38] font-sans uppercase font-bold">
                    {clientStories[0].role} • {clientStories[0].location}
                  </span>
                </div>
              </div>
            </div>

            {/* Story 02 Quote */}
            <div ref={story1Ref} className="absolute inset-0 flex flex-col justify-center items-start opacity-0">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-[#e58c38] stroke-none" />
                ))}
                <span className="text-[10px] tracking-[0.25em] font-sans text-gray-400 uppercase font-bold ml-2">
                  VERIFIED CLIENT REVIEWS
                </span>
              </div>

              <blockquote className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white uppercase leading-snug mb-6">
                "{clientStories[1].quote}"
              </blockquote>

              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed tracking-wide mb-6 max-w-xl">
                {clientStories[1].desc}
              </p>

              <div className="flex items-center gap-4 border-t border-white/10 pt-4 w-full">
                <img
                  src={clientStories[1].avatar}
                  alt={clientStories[1].name}
                  className="w-11 h-11 rounded-full object-cover border border-[#e58c38]"
                />
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-extrabold text-white uppercase tracking-wider">
                    {clientStories[1].name}
                  </span>
                  <span className="text-[10px] tracking-widest text-[#e58c38] font-sans uppercase font-bold">
                    {clientStories[1].role} • {clientStories[1].location}
                  </span>
                </div>
              </div>
            </div>

            {/* Story 03 Quote */}
            <div ref={story2Ref} className="absolute inset-0 flex flex-col justify-center items-start opacity-0">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-[#e58c38] stroke-none" />
                ))}
                <span className="text-[10px] tracking-[0.25em] font-sans text-gray-400 uppercase font-bold ml-2">
                  VERIFIED CLIENT REVIEWS
                </span>
              </div>

              <blockquote className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white uppercase leading-snug mb-6">
                "{clientStories[2].quote}"
              </blockquote>

              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed tracking-wide mb-6 max-w-xl">
                {clientStories[2].desc}
              </p>

              <div className="flex items-center gap-4 border-t border-white/10 pt-4 w-full">
                <img
                  src={clientStories[2].avatar}
                  alt={clientStories[2].name}
                  className="w-11 h-11 rounded-full object-cover border border-[#e58c38]"
                />
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-extrabold text-white uppercase tracking-wider">
                    {clientStories[2].name}
                  </span>
                  <span className="text-[10px] tracking-widest text-[#e58c38] font-sans uppercase font-bold">
                    {clientStories[2].role} • {clientStories[2].location}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Stack: 3 Visual Artwork Frames */}
          <div className="lg:col-span-5 relative h-[280px] sm:h-[380px] lg:h-[420px] w-full flex items-center justify-center">

            {/* Visual 01 */}
            <div
              ref={visual0Ref}
              className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-[#e58c38] bg-[#121620] shadow-[0_0_45px_rgba(229,140,56,0.3)]"
            >
              <img src={clientStories[0].artwork} alt={clientStories[0].name} className="w-full h-full object-cover grayscale brightness-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12]/90 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-[10px] tracking-[0.25em] text-[#e58c38] font-sans uppercase font-extrabold bg-[#0b0d12]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#e58c38]/40">
                {clientStories[0].tag}
              </span>
            </div>

            {/* Visual 02 */}
            <div
              ref={visual1Ref}
              className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-[#e58c38] bg-[#121620] shadow-[0_0_45px_rgba(229,140,56,0.3)] opacity-0"
            >
              <img src={clientStories[1].artwork} alt={clientStories[1].name} className="w-full h-full object-cover grayscale brightness-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12]/90 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-[10px] tracking-[0.25em] text-[#e58c38] font-sans uppercase font-extrabold bg-[#0b0d12]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#e58c38]/40">
                {clientStories[1].tag}
              </span>
            </div>

            {/* Visual 03 */}
            <div
              ref={visual2Ref}
              className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-[#e58c38] bg-[#121620] shadow-[0_0_45px_rgba(229,140,56,0.3)] opacity-0"
            >
              <img src={clientStories[2].artwork} alt={clientStories[2].name} className="w-full h-full object-cover grayscale brightness-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12]/90 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-[10px] tracking-[0.25em] text-[#e58c38] font-sans uppercase font-extrabold bg-[#0b0d12]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#e58c38]/40">
                {clientStories[2].tag}
              </span>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Interactive Client Story Selector Pills */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-6 z-20 border-t border-white/10 pt-6">
          <div className="flex flex-wrap items-center gap-3">
            {clientStories.map((story, idx) => (
              <button
                key={story.id}
                onMouseEnter={() => setHoveredClient(idx)}
                onMouseLeave={() => setHoveredClient(null)}
                className={`px-4 py-2 rounded-full text-[10px] font-sans font-extrabold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer border ${activeStory === idx
                  ? "bg-[#e58c38] text-black border-[#e58c38] shadow-[0_0_15px_#e58c38]"
                  : "bg-[#121620] text-gray-300 border-white/10 hover:border-[#e58c38]/40 hover:text-white"
                  }`}
              >
                <span>{story.id}</span>
                <span>{story.name}</span>
              </button>
            ))}
          </div>

          <a
            href="#contact"
            className="group px-7 py-3 bg-gradient-to-r from-[#e58c38] to-[#d97706] hover:from-[#f39c12] hover:to-[#e67e22] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(229,140,56,0.35)]"
          >
            BECOME OUR NEXT STORY
          </a>
        </div>

      </div>
    </div>
  );
}
