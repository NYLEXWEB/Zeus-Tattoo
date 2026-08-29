"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUpRight, Clock, ShieldCheck, Sparkles } from "lucide-react";

interface ServicesProps {
  onOpenBooking: () => void;
}

export default function Services({ onOpenBooking }: ServicesProps) {
  const [activeService, setActiveService] = useState<number | null>(0);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  // Cursor tracking for floating preview
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      id: "01",
      title: "BESPOKE REALISM & PORTRAITS",
      subtitle: "Hyper-detailed anatomical portraiture & realism",
      desc: "Our signature discipline. Utilizing ultra-fine single needle techniques to translate high-resolution portraiture, wildlife, and classical sculptures onto living skin with photorealistic depth.",
      image: "/images/portfolio_lion_realism.jpg",
      duration: "4 - 8 Hours / Session",
      hygiene: "100% Single-Use Sterile Needle Cartridge",
      features: ["Custom Digital Composition", "3D Muscle Mapping", "Multi-Pass Shading"],
    },
    {
      id: "02",
      title: "BLACK & GREY FINE LINE",
      subtitle: "Micro-precision linework & delicate botanical art",
      desc: "Architectural precision linework engineered with zero bleeding. Delicate geometric motifs, ornate flora, and script typography designed with mathematical symmetry.",
      image: "/images/portfolio_floral_fineline.jpg",
      duration: "2 - 5 Hours / Session",
      hygiene: "EU Certified Heavy-Metal-Free Vegan Inks",
      features: ["Single-Needle Precision", "Zero Bleed Linework", "Custom Typography"],
    },
    {
      id: "03",
      title: "FULL SLEEVE COMPOSITIONS",
      subtitle: "Multi-session large scale body transformations",
      desc: "Comprehensive storytelling across full arms, backs, and torsos. We map continuous narratives that dynamically flow with joint articulation and muscle flex.",
      image: "/images/portfolio_sleeve_work.jpg",
      duration: "Multi-Session Project",
      hygiene: "Full Sterile Barrier Wrapping",
      features: ["Comprehensive Body Mapping", "Seamless Flow Design", "Priority Studio Scheduling"],
    },
    {
      id: "04",
      title: "CLINICAL PIERCING SANCTUARY",
      subtitle: "Implant-grade titanium body & facial piercing",
      desc: "Executed inside a hospital-grade sterile environment using exclusively ASTM F-136 Implant-Grade Titanium hardware. Gentle, precise, and fast healing guaranteed.",
      image: "/images/service_piercing.jpg",
      duration: "15 - 30 Minutes",
      hygiene: "Hospital Autoclave Sterilized Hardware",
      features: ["Internal Threaded Titanium", "Clinical Antiseptic Protocol", "30-Day Aftercare Support"],
    },
    {
      id: "05",
      title: "COVER-UPS & RESTORATION",
      subtitle: "Transform legacy tattoos into high-end art",
      desc: "Specialized pigment saturation techniques designed to completely conceal, rebuild, or elevate old tattoos into modern masterpieces without laser trauma.",
      image: "/images/about_story.jpg",
      duration: "Custom Project Basis",
      hygiene: "Medical-Grade Skin Preparation",
      features: ["Pigment Analysis Consultation", "Opaque Shading Technique", "Complete Visual Concealment"],
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

  return (
    <section
      id="services"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-[#0b0d12] py-28 md:py-36 border-b border-white/5 text-white overflow-hidden"
    >
      {/* Dynamic Cursor-Following Image Preview Frame (Desktop Only) */}
      <AnimatePresence>
        {hoveredService !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              x: cursorPos.x + 30,
              y: cursorPos.y - 120,
            }}
            exit={{ opacity: 0, scale: 0.8, rotate: 4 }}
            transition={{ type: "spring", stiffness: 250, damping: 22 }}
            className="pointer-events-none absolute top-0 left-0 z-30 hidden lg:block w-72 h-44 rounded-2xl overflow-hidden border-2 border-[#e58c38] shadow-[0_0_35px_rgba(229,140,56,0.3)] bg-[#121620]"
          >
            <img
              src={services[hoveredService].image}
              alt={services[hoveredService].title}
              className="w-full h-full object-cover grayscale brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12] via-transparent to-transparent" />
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
              <span className="text-[10px] tracking-[0.2em] font-sans font-extrabold text-[#e58c38] uppercase">
                {services[hoveredService].id} • PREVIEW
              </span>
              <span className="text-[9px] font-sans text-gray-300 font-semibold uppercase bg-[#0b0d12]/80 backdrop-blur-md px-2 py-0.5 rounded">
                ZEUS ARCHIVE
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-2 block flex items-center gap-2">
              <Sparkles size={13} />
              STUDIO SERVICES & DISCIPLINES
            </span>
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider uppercase text-white">
              CRAFTED DISCIPLINE.
            </h2>
            <div className="w-16 h-[3px] bg-[#e58c38] mt-3 rounded-full shadow-[0_0_10px_#e58c38]" />
          </div>

          <p className="text-gray-300 font-sans text-xs md:text-sm max-w-md leading-relaxed tracking-wide">
            Hover to inspect live project previews. Every service includes private sterile studio setup, anatomical mapping, and 30-day clinical aftercare support.
          </p>
        </div>

        {/* Services Expandable List */}
        <div className="flex flex-col border-t border-white/10">
          {services.map((service, index) => {
            const isOpen = activeService === index;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                className="border-b border-white/10 transition-colors duration-300"
              >
                {/* Header Row Trigger */}
                <button
                  onClick={() => setActiveService(isOpen ? null : index)}
                  className="w-full py-8 text-left flex items-center justify-between gap-6 group cursor-pointer"
                >
                  <div className="flex items-center gap-6 md:gap-10">
                    <span className="font-sans text-sm md:text-base font-extrabold text-[#e58c38] tracking-widest">
                      {service.id}
                    </span>
                    <div className="flex flex-col">
                      <h3 className="font-sans text-xl md:text-2xl lg:text-3xl font-bold tracking-wider text-white group-hover:text-[#e58c38] transition-colors duration-300 uppercase">
                        {service.title}
                      </h3>
                      <span className="text-xs text-gray-400 font-sans tracking-wide mt-1">
                        {service.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="hidden sm:block text-[11px] font-sans font-bold tracking-widest text-[#e58c38] uppercase border border-[#e58c38]/30 px-3 py-1 rounded-full bg-[#121620]">
                      {service.duration}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:border-[#e58c38] group-hover:text-[#e58c38] transition-all duration-300 ${isOpen ? "rotate-180 bg-[#e58c38]/10 border-[#e58c38]" : ""
                        }`}
                    >
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </button>

                {/* Expanded Content Panel */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-white/5">

                        {/* Image Preview Mobile & Fallback */}
                        <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 bg-[#121620] shadow-xl group">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12]/80 via-transparent to-transparent" />
                        </div>

                        {/* Specs & Description */}
                        <div className="lg:col-span-7 flex flex-col items-start justify-center">
                          <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed tracking-wide mb-6">
                            {service.desc}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
                            <div className="flex items-center gap-3 bg-[#121620] p-3.5 rounded-xl border border-white/10">
                              <Clock size={16} className="text-[#e58c38]" />
                              <div className="flex flex-col">
                                <span className="text-[10px] tracking-widest text-gray-400 font-sans uppercase">ESTIMATED TIME</span>
                                <span className="text-xs font-bold text-white font-sans">{service.duration}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 bg-[#121620] p-3.5 rounded-xl border border-white/10">
                              <ShieldCheck size={16} className="text-[#e58c38]" />
                              <div className="flex flex-col">
                                <span className="text-[10px] tracking-widest text-gray-400 font-sans uppercase">HYGIENE PROTOCOL</span>
                                <span className="text-xs font-bold text-white font-sans">{service.hygiene}</span>
                              </div>
                            </div>
                          </div>

                          {/* Features Tags */}
                          <div className="flex flex-wrap gap-2 mb-8">
                            {service.features.map((feat, fIdx) => (
                              <span
                                key={fIdx}
                                className="text-[10px] font-sans font-extrabold tracking-widest text-gray-300 uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                              >
                                ✓ {feat}
                              </span>
                            ))}
                          </div>

                          <button
                            onClick={onOpenBooking}
                            className="group px-7 py-3 bg-gradient-to-r from-[#e58c38] to-[#d97706] hover:from-[#f39c12] hover:to-[#e67e22] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(229,140,56,0.3)]"
                          >
                            BOOK {service.title.split(" ")[0]} CONSULTATION
                            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </button>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
