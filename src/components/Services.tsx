"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

interface ServicesProps {
  onOpenBooking?: () => void;
}

interface ServiceCard {
  id: string;
  subTag: string;
  title: string;
  description: string;
  duration: string;
  bullets: string[];
  image: string;
}

export default function Services({ onOpenBooking }: ServicesProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const services: ServiceCard[] = [
    {
      id: "01",
      subTag: "CUSTOM & FLASH ARTISTRY",
      title: "Bespoke Tattoos",
      description: "From micro-realism to large mythological backpieces, our resident artists compose digital mockups of custom designs, chiseled to fit your anatomy.",
      duration: "Depends on design complexity",
      bullets: [
        "100% sterile, single-use needle setups",
        "Neotraditional, Realism & Fine-line Art",
        "Complimentary touch-ups for 30 days",
        "Medical-grade protective healing wraps",
      ],
      image: "/images/portfolio_sleeve_work.jpg",
    },
    {
      id: "02",
      subTag: "PRECISION BODY ARTICULATION",
      title: "Clinical Piercings",
      description: "Expertly curated ear, facial, and body placement using hospital-grade sterilization, autoclave checks, and premium titanium and gold hardware.",
      duration: "15 - 30 minutes",
      bullets: [
        "Implant-grade ASTM F-136 Titanium",
        "Autoclave sterile-indicator pouches",
        "No piercing guns—needle-only precision",
        "Detailed custom anatomical curations",
      ],
      image: "/images/service_piercing.jpg",
    },
    {
      id: "03",
      subTag: "SEMI-PERMANENT COSMETICS",
      title: "Microblading",
      description: "Natural feather-stroke eyebrow shading and micro-pigmentation engineered to match facial symmetry and skin undertones.",
      duration: "2 - 3 hours",
      bullets: [
        "Bespoke brow mapping & golden ratio stencil",
        "Hypoallergenic organic pigment formulation",
        "Pain-free topical anesthetic application",
        "Includes secondary touch-up session",
      ],
      image: "/images/service_microblading.jpg",
    },
    {
      id: "04",
      subTag: "COSMETIC COLOR ENHANCEMENT",
      title: "Lip Pigmentation",
      description: "Subtle lip blush and contour correction designed to revitalize natural lip tone, symmetry, and youthful definition.",
      duration: "1.5 - 2.5 hours",
      bullets: [
        "Custom lip blush color blending",
        "Corrects dark tone spots & uneven borders",
        "Long-lasting 2-3 year wearability",
        "Sterile micro-cartridge precision",
      ],
      image: "/images/service_lip.jpg",
    },
  ];

  return (
    <section id="services" className="bg-[#0b0d12] py-24 md:py-36 overflow-hidden border-b border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-2 block">
            OUR EXPERTISE
          </span>
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-white uppercase">
            STUDIO SERVICES
          </h2>
          <div className="w-12 h-[3px] bg-[#e58c38] mt-3 rounded-full mx-auto" />
        </div>

        {/* Expandable Accordion Grid */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[540px] items-stretch">
          {services.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={item.id}
                layout
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className={`relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "flex-[3.5] bg-[#121620] border-[#e58c38]/40 shadow-[0_0_30px_rgba(229,140,56,0.15)]"
                    : "flex-1 bg-[#0f121a] border-white/10 hover:border-white/20 hover:bg-[#141824]"
                }`}
              >
                {/* Background Image with Dark Overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isActive ? "scale-105 opacity-30 grayscale-0" : "scale-100 opacity-20 grayscale brightness-75"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12] via-[#0b0d12]/80 to-[#0b0d12]/40" />
                </div>

                {/* Collapsed State View (Vertical Ribbon Pillar) */}
                {!isActive && (
                  <div className="relative z-10 w-full h-full p-6 flex flex-col items-center justify-between min-h-[360px] lg:min-h-full">
                    <span className="font-sans text-xl font-extrabold text-[#e58c38] tracking-tight">
                      {item.id}
                    </span>
                    <div className="writing-mode-vertical rotate-180 font-sans text-xs md:text-sm font-extrabold text-gray-300 tracking-[0.25em] uppercase whitespace-nowrap my-auto">
                      {item.title}
                    </div>
                  </div>
                )}

                {/* Expanded State View (Full Details Content) */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10 p-8 md:p-12 flex flex-col justify-between h-full"
                  >
                    <div>
                      {/* Sub-tag & Title */}
                      <span className="font-sans text-[10px] tracking-[0.3em] font-extrabold text-[#e58c38] uppercase mb-1 block">
                        {item.subTag}
                      </span>
                      <h3 className="font-sans text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight mb-4">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed tracking-wide mb-6 max-w-xl">
                        {item.description}
                      </p>

                      {/* Estimated Duration */}
                      <div className="flex items-center gap-2 text-[#e58c38] text-xs font-sans font-semibold tracking-wide mb-6">
                        <Clock size={14} className="flex-shrink-0" />
                        <span>Estimated Duration: <strong className="text-white">{item.duration}</strong></span>
                      </div>

                      {/* Bullet Points List */}
                      <ul className="flex flex-col gap-2.5 mb-8">
                        {item.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-xs md:text-sm text-gray-300 font-sans tracking-wide">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#e58c38] flex-shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Booking CTA Button */}
                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenBooking) onOpenBooking();
                        }}
                        className="px-7 py-3.5 bg-gradient-to-r from-[#e58c38] to-[#d97706] hover:from-[#f39c12] hover:to-[#e67e22] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(229,140,56,0.35)] hover:shadow-[0_0_30px_rgba(229,140,56,0.6)] cursor-pointer"
                      >
                        BOOK CONSULTATION
                      </button>
                    </div>

                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
