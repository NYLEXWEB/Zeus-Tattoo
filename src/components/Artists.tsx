"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, X, ArrowUpRight, ShieldCheck, Award, CheckCircle2 } from "lucide-react";

interface ArtistWork {
  title: string;
  image: string;
  style: string;
}

interface Artist {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialization: string;
  signatureStyle: string;
  bio: string;
  image: string;
  instagram: string;
  specialties: string[];
  works: ArtistWork[];
}

interface ArtistsProps {
  onOpenBooking?: () => void;
}

export default function Artists({ onOpenBooking }: ArtistsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [lerpPos, setLerpPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const artists: Artist[] = [
    {
      id: "01",
      name: "Rahul Sharma",
      role: "Founder & Master Realism Artist",
      experience: "10+ Years",
      specialization: "Photorealism & Portraiture",
      signatureStyle: "Hyper-Contrast Realism",
      bio: "Internationally acclaimed realism specialist dedicated to rendering high-contrast human portraiture, mythical iconography, and anatomically precise wildlife imagery with lifelike depth.",
      image: "/images/artist_arjun.jpg",
      instagram: "https://instagram.com/zeustattoo",
      specialties: ["PHOTOREALISM", "PORTRAITURE", "BLACK & GREY", "ANATOMICAL MAPPING"],
      works: [
        { title: "Lion Realism Sleeve", image: "/images/IMG_20260829_212801_249.jpg", style: "Black & Grey" },
        { title: "Greek Mythos Chestpiece", image: "/images/IMG_20260829_212716_292.jpg", style: "Photorealism" },
        { title: "Chiaroscuro Portrait", image: "/images/IMG_20260829_212719_574.jpg", style: "Hyper Contrast" },
      ],
    },
    {
      id: "02",
      name: "Meera Nair",
      role: "Fine Line & Micro Specialist",
      experience: "7+ Years",
      specialization: "Single-Needle Botanicals & Micro-Realism",
      signatureStyle: "Whisper Linework",
      bio: "Pioneer in surgical single-needle micro-realism, creating delicate botanical compositions, minimal geometric abstractions, and feather-light wrist and collarbone accents.",
      image: "/images/artist_meera.jpg",
      instagram: "https://instagram.com/zeustattoo",
      specialties: ["SINGLE-NEEDLE", "BOTANICALS", "MICRO-REALISM", "MINIMALIST LINEWORK"],
      works: [
        { title: "Whisper Rose Needlework", image: "/images/IMG_20260829_212727_311.jpg", style: "Single-Needle" },
        { title: "Anatomical Heart Micro", image: "/images/IMG_20260829_212734_480.jpg", style: "Micro-Realism" },
        { title: "Floral Spine Continuum", image: "/images/IMG_20260829_212754_172.jpg", style: "Botanical" },
      ],
    },
    {
      id: "03",
      name: "Arjun Verma",
      role: "Black & Grey Sleeve Master",
      experience: "9+ Years",
      specialization: "Mythological & Custom Sleeves",
      signatureStyle: "Obsidian Gradient Wash",
      bio: "Specializing in multi-session arm and leg sleeve compositions that merge dark surrealism, architectural symmetry, and seamless obsidian gradient transitions.",
      image: "/images/artist_rahul.jpg",
      instagram: "https://instagram.com/zeustattoo",
      specialties: ["DARK SURREALISM", "CUSTOM SLEEVES", "MYTHOLOGICAL", "OBSIDIAN WASH"],
      works: [
        { title: "Zeus Temple Full Sleeve", image: "/images/IMG_20260829_212809_269.jpg", style: "Dark Wash" },
        { title: "Viking Runes Backpiece", image: "/images/IMG_20260829_212801_249.jpg", style: "Mythological" },
        { title: "Geometric Armor Leg Sleeve", image: "/images/IMG_20260829_212716_292.jpg", style: "Custom Sleeve" },
      ],
    },
    {
      id: "04",
      name: "Sahana Rao",
      role: "Custom & Cover-Up Artist",
      experience: "8+ Years",
      specialization: "Sacred Geometry & Cover-Ups",
      signatureStyle: "Dotwork & Stipple Symmetry",
      bio: "Master of structural cover-up transformations and complex sacred geometry, utilizing custom dotwork stippling to harmonize intricate mandala patterns with body movement.",
      image: "/images/artist_sahana.jpg",
      instagram: "https://instagram.com/zeustattoo",
      specialties: ["SACRED GEOMETRY", "DOTWORK STIPPLE", "COVER-UP MASTERY", "MANDALA SYMMETRY"],
      works: [
        { title: "Sacred Geometry Mandala", image: "/images/IMG_20260829_212719_574.jpg", style: "Dotwork" },
        { title: "Cover-Up Phoenix Back", image: "/images/IMG_20260829_212727_311.jpg", style: "Custom Coverup" },
        { title: "Stipple Symmetry Armlet", image: "/images/IMG_20260829_212734_480.jpg", style: "Sacred Geometry" },
      ],
    },
  ];

  // Smooth lerp movement for floating cursor portrait
  useEffect(() => {
    let currentX = lerpPos.x;
    let currentY = lerpPos.y;

    const updateLerp = () => {
      const targetX = cursorPos.x;
      const targetY = cursorPos.y;

      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      setLerpPos({ x: currentX, y: currentY });
      animationFrameRef.current = requestAnimationFrame(updateLerp);
    };

    animationFrameRef.current = requestAnimationFrame(updateLerp);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [cursorPos]);

  // Handle ESC key to close takeover modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedIndex !== null) {
        setSelectedIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const selectedArtist = selectedIndex !== null ? artists[selectedIndex] : null;

  return (
    <section
      id="artists"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bg-[#0b0d12] py-24 md:py-36 overflow-hidden border-b border-white/5 text-white relative min-h-screen flex flex-col justify-center"
    >
      {/* Background Ambient Glow & Kinetic Lines */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#e58c38]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#e58c38]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* FLOATING CURSOR ARTIST PORTRAIT (Desktop Interactive Hover) */}
      <AnimatePresence>
        {hoveredIndex !== null && selectedIndex === null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75, rotate: -4 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: (lerpPos.x % 10) - 5,
              x: lerpPos.x - 160,
              y: lerpPos.y - 200,
            }}
            exit={{ opacity: 0, scale: 0.7, rotate: 4 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="pointer-events-none absolute top-0 left-0 z-40 hidden lg:flex flex-col items-center shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
          >
            <div className="relative w-72 h-96 rounded-2xl overflow-hidden border-2 border-[#e58c38] bg-[#121620]">
              <img
                src={artists[hoveredIndex].image}
                alt={artists[hoveredIndex].name}
                className="w-full h-full object-cover grayscale brightness-95 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12] via-transparent to-transparent opacity-80" />

              {/* Floating Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0b0d12]/90 backdrop-blur-md border border-[#e58c38]/40 p-3 rounded-xl flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-[#e58c38] uppercase">
                    {artists[hoveredIndex].experience} MASTER
                  </span>
                  <span className="text-xs font-sans font-extrabold text-white uppercase">
                    {artists[hoveredIndex].signatureStyle}
                  </span>
                </div>
                <span className="text-[10px] font-sans font-extrabold text-[#e58c38] uppercase tracking-widest flex items-center gap-1">
                  VIEW <ArrowRight size={10} />
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">

        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col items-start"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-3 flex items-center gap-2">
              <Sparkles size={13} />
              THE MASTERS BEHIND THE CRAFT
            </span>
            <h2 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-none">
              RESIDENT ARTISTS
            </h2>
            <div className="w-24 h-[3px] bg-gradient-to-r from-[#e58c38] to-[#d97706] mt-4 rounded-full shadow-[0_0_12px_#e58c38]" />
          </motion.div>

          {/* Roster Index Counter & Subtitle */}
          <div className="flex flex-col items-start md:items-end">
            <div className="flex items-center gap-2 font-sans text-xl font-extrabold tracking-widest text-[#e58c38] mb-2">
              <span>{hoveredIndex !== null ? `0${hoveredIndex + 1}` : "01"}</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-400">04</span>
            </div>
            <p className="text-xs text-gray-400 font-sans tracking-widest uppercase font-semibold text-left md:text-right max-w-xs">
              EXCLUSIVE CREATIVE COLLECTIVE • NON-GENERIC PORTFOLIO ROSTER
            </p>
          </div>
        </div>

        {/* EDITORIAL ARTIST ROSTER (Names as Navigation) */}
        <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
          {artists.map((artist, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedIndex(idx)}
                tabIndex={0}
                role="button"
                aria-label={`View detailed profile for ${artist.name}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedIndex(idx);
                  }
                }}
                className={`group py-8 md:py-12 px-4 md:px-8 transition-all duration-500 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 relative ${isHovered ? "bg-[#121620]/60 translate-x-2" : "hover:bg-[#121620]/30"
                  }`}
              >
                {/* Left Row: Index + Large Kinetic Name */}
                <div className="flex items-center gap-6 md:gap-12">
                  <span className={`font-sans text-xl md:text-2xl font-extrabold tracking-widest transition-colors duration-300 ${isHovered ? "text-[#e58c38]" : "text-gray-500"
                    }`}>
                    {artist.id}
                  </span>

                  <div className="flex flex-col">
                    <h3 className={`font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight transition-all duration-500 ${isHovered ? "text-[#e58c38] translate-x-3" : "text-white"
                      }`}>
                      {artist.name}
                    </h3>
                    <span className="text-[10px] sm:text-xs font-sans font-extrabold tracking-[0.3em] text-gray-400 uppercase mt-1">
                      {artist.role}
                    </span>
                  </div>
                </div>

                {/* Right Row: Mobile Preview Thumbnail / Desktop Specialties */}
                <div className="flex items-center justify-between md:justify-end gap-6">

                  {/* Mobile Thumbnail Image (Visible on mobile/tablet) */}
                  <div className="lg:hidden w-16 h-20 rounded-lg overflow-hidden border border-[#e58c38]/40 flex-shrink-0 bg-[#121620]">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Specialties Pills Stack */}
                  <div className="hidden lg:flex items-center gap-2">
                    {artist.specialties.slice(0, 2).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`text-[9px] font-sans font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full border transition-all duration-300 ${isHovered
                          ? "bg-[#e58c38]/20 border-[#e58c38] text-[#e58c38]"
                          : "bg-[#0b0d12] border-white/10 text-gray-400"
                          }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Hover Arrow Indicator */}
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${isHovered
                    ? "border-[#e58c38] bg-[#e58c38] text-black rotate-45 scale-110 shadow-[0_0_20px_rgba(229,140,56,0.5)]"
                    : "border-white/10 text-gray-400"
                    }`}>
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                {/* Hover Underline Accent */}
                {isHovered && (
                  <motion.div
                    layoutId="activeRosterBorder"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#e58c38] via-[#f39c12] to-transparent shadow-[0_0_10px_#e58c38]"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* SHARED-ELEMENT ARTIST DETAIL TAKEOVER MODAL */}
      <AnimatePresence>
        {selectedArtist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-[#0b0d12]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="bg-[#121620] border border-[#e58c38]/40 rounded-3xl max-w-5xl w-full p-6 sm:p-10 lg:p-14 relative shadow-[0_0_80px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-6 right-6 p-3 bg-[#0b0d12] border border-[#e58c38]/50 text-[#e58c38] hover:text-white hover:bg-[#e58c38] hover:border-[#e58c38] transition-all rounded-full cursor-pointer z-20 shadow-lg"
                aria-label="Close Artist Details"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                {/* Left Shared Portrait Frame */}
                <div className="lg:col-span-5 relative w-full aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#e58c38] bg-[#0b0d12] shadow-[0_0_40px_rgba(229,140,56,0.3)]">
                  <img
                    src={selectedArtist.image}
                    alt={selectedArtist.name}
                    className="w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12] via-transparent to-transparent opacity-80" />

                  <span className="absolute top-4 left-4 bg-[#0b0d12]/90 border border-[#e58c38]/50 text-[#e58c38] text-[10px] tracking-[0.25em] font-sans font-extrabold px-3.5 py-1.5 rounded-full uppercase shadow-lg">
                    {selectedArtist.experience} EXPERIENCE
                  </span>
                </div>

                {/* Right Profile Details & Works */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    {/* Role & Title */}
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={14} className="text-[#e58c38]" />
                      <span className="text-xs font-sans font-extrabold tracking-[0.35em] text-[#e58c38] uppercase">
                        {selectedArtist.role}
                      </span>
                    </div>

                    <h2 className="font-sans text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight mb-4">
                      {selectedArtist.name}
                    </h2>

                    {/* Bio */}
                    <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed tracking-wide mb-6">
                      {selectedArtist.bio}
                    </p>

                    {/* Signature Style & Specialization */}
                    <div className="grid grid-cols-2 gap-4 bg-[#0b0d12] p-4 rounded-xl border border-white/10 mb-6">
                      <div>
                        <span className="text-[10px] font-sans font-bold tracking-widest text-gray-400 uppercase block mb-1">
                          Signature Style
                        </span>
                        <span className="text-xs font-sans font-extrabold text-[#e58c38] uppercase">
                          {selectedArtist.signatureStyle}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-sans font-bold tracking-widest text-gray-400 uppercase block mb-1">
                          Specialization
                        </span>
                        <span className="text-xs font-sans font-extrabold text-white uppercase">
                          {selectedArtist.specialization}
                        </span>
                      </div>
                    </div>

                    {/* Specialty Tags */}
                    <div className="mb-6">
                      <span className="text-[10px] font-sans font-bold tracking-widest text-gray-400 uppercase block mb-2">
                        Technical Disciplines
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedArtist.specialties.map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="bg-[#121620] border border-[#e58c38]/40 text-[#e58c38] text-[9px] font-sans font-extrabold tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1.5"
                          >
                            <CheckCircle2 size={11} />
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Artist Selected Works Preview */}
                    <div className="mb-8 border-t border-white/10 pt-6">
                      <span className="text-[10px] font-sans font-bold tracking-widest text-gray-400 uppercase block mb-3">
                        Selected Masterworks
                      </span>
                      <div className="grid grid-cols-3 gap-3">
                        {selectedArtist.works.map((work, wIdx) => (
                          <div key={wIdx} className="group/work relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-[#0b0d12]">
                            <img
                              src={work.image}
                              alt={work.title}
                              className="w-full h-full object-cover grayscale group-hover/work:grayscale-0 group-hover/work:scale-110 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/work:opacity-100 transition-opacity p-2 flex flex-col justify-end">
                              <span className="text-[8px] font-sans font-extrabold text-[#e58c38] uppercase">
                                {work.style}
                              </span>
                              <span className="text-[9px] font-sans font-bold text-white uppercase leading-tight line-clamp-1">
                                {work.title}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
                    <a
                      href={selectedArtist.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-sans font-extrabold text-gray-300 hover:text-[#e58c38] tracking-widest uppercase flex items-center gap-2 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#e58c38]">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      @ZEUSTATTOO
                    </a>

                    <button
                      onClick={() => {
                        setSelectedIndex(null);
                        if (onOpenBooking) onOpenBooking();
                      }}
                      className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#e58c38] to-[#d97706] hover:from-[#f39c12] hover:to-[#e67e22] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(229,140,56,0.35)]"
                    >
                      <Sparkles size={14} />
                      BOOK WITH {selectedArtist.name.split(" ")[0].toUpperCase()}
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
