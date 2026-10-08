"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionFlourish from "./SectionFlourish";
import TornPaperDivider from "./TornPaperDivider";

interface ServicesProps {
  onOpenBooking: () => void;
}

export default function Services({ onOpenBooking }: ServicesProps) {
  const [selectedService, setSelectedService] = useState(0);

  const servicesList = [
    {
      id: "01",
      name: "Custom Tattoo",
      title: "CUSTOM TATTOOS",
      desc: "Bespoke custom designs, high-contrast photorealism, and portraiture crafted with micro-needle precision and premium inks. From lifelike wildlife and mythology to heirloom custom concepts tailored to your body contours.",
      image: "/images/IMG_20260829_212716_292.jpg",
      icon: "/images/IMG_20260829_212801_249.jpg",
    },
    {
      id: "02",
      name: "Fine Line / Minimalist",
      title: "FINE LINE & MINIMALIST",
      desc: "Delicate single-needle linework, minimalist designs, calligraphy scripts, and botanical art. Whisper-thin execution with zero pigment bleed and razor-sharp clarity that lasts a lifetime.",
      image: "/images/IMG_20260829_212719_574.jpg",
      icon: "/images/IMG_20260829_212754_172.jpg",
    },
    {
      id: "03",
      name: "Ear & Helix Piercing",
      title: "EAR & HELIX PIERCING",
      desc: "Expert clinical piercing for earlobes, helix, tragus, conch, and curated ear stacks. Performed with sterile single-use needles and ASTM F-136 Implant-Grade Titanium jewelry.",
      image: "/images/piercing/IMG_20260829_213245_583.jpg",
      icon: "/images/piercing/IMG_20260829_213245_633.jpg",
    },
    {
      id: "04",
      name: "Nose & Bugadi",
      title: "NOSE & BUGADI PIERCING",
      desc: "Specialized nose, nostril studs, septum, and traditional bugadi piercings with precision anatomical alignment and gentle, rapid-healing techniques.",
      image: "/images/piercing/IMG_20260829_213245_714.jpg",
      icon: "/images/piercing/IMG_20260829_213245_723.jpg",
    },
    {
      id: "05",
      name: "Tribal & Blackwork",
      title: "TRIBAL & GEOMETRIC",
      desc: "Sacred geometry, Polynesian patterns, and bold blackwork designed to flow with anatomical posture. Deep pigment saturation and sharp geometric edges.",
      image: "/images/IMG_20260829_212727_311.jpg",
      icon: "/images/IMG_20260829_212727_311.jpg",
    },
    {
      id: "06",
      name: "Cover-Up Tattoo",
      title: "CUSTOM COVER-UPS",
      desc: "Advanced pigment restructuring and layered shading to completely transform faded, unwanted tattoos into stunning modern masterworks without laser scarring.",
      image: "/images/IMG_20260829_212734_480.jpg",
      icon: "/images/about_story.jpg",
    },
  ];

  const current = servicesList[selectedService];

  const handleNext = () => {
    setSelectedService((prev) => (prev + 1) % servicesList.length);
  };

  const handlePrev = () => {
    setSelectedService((prev) => (prev - 1 + servicesList.length) % servicesList.length);
  };

  return (
    <section id="services" className="relative bg-[#FFA028] text-[#0C0D12] pt-12 pb-24 md:pb-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider text-[#0C0D12] uppercase"
          >
            OUR SERVICES
          </motion.h2>
          <SectionFlourish color="#0C0D12" />
        </div>

        {/* Top 6 Thumbnail Pills Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-14 max-w-5xl mx-auto">
          {servicesList.map((service, idx) => (
            <button
              key={service.id}
              onClick={() => setSelectedService(idx)}
              className={`flex flex-col items-center gap-2 p-2 sm:p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                selectedService === idx
                  ? "bg-[#0C0D12] text-white shadow-2xl scale-105"
                  : "bg-white/40 hover:bg-white/70 text-[#0C0D12] border border-[#0C0D12]/15"
              }`}
            >
              <div className="w-full aspect-[4/3] rounded overflow-hidden bg-black/20">
                <img
                  src={service.icon}
                  alt={service.name}
                  className="w-full h-full object-cover grayscale contrast-125"
                />
              </div>
              <span className="font-display text-xs sm:text-sm font-bold tracking-wide uppercase text-center">
                {service.name}
              </span>
            </button>
          ))}
        </div>

        {/* Center Featured Showcase Card with Slider Arrows */}
        <div className="relative max-w-3xl mx-auto">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous Service"
            className="absolute -left-4 sm:-left-12 top-1/3 -translate-y-1/2 z-20 w-10 h-10 bg-[#0C0D12] hover:bg-white text-white hover:text-[#0C0D12] flex items-center justify-center rounded-full shadow-xl transition-all cursor-pointer"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next Service"
            className="absolute -right-4 sm:-right-12 top-1/3 -translate-y-1/2 z-20 w-10 h-10 bg-[#0C0D12] hover:bg-white text-white hover:text-[#0C0D12] flex items-center justify-center rounded-full shadow-xl transition-all cursor-pointer"
          >
            <ChevronRight size={22} />
          </button>

          {/* Card Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center"
            >
              {/* White Framed Showcase Photo */}
              <div className="w-full max-w-xl aspect-[16/10] bg-white p-3 sm:p-4 rounded shadow-2xl overflow-hidden mb-8 border-4 border-white">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover contrast-110"
                />
              </div>

              {/* Title & Description */}
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-[#0C0D12] uppercase mb-4">
                {current.title}
              </h3>

              <p className="text-[#0C0D12]/80 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mb-8">
                {current.desc}
              </p>

              {/* Read More Button */}
              <button
                onClick={onOpenBooking}
                className="px-8 py-3 bg-[#0C0D12] hover:bg-white text-white hover:text-[#0C0D12] font-display text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-xl cursor-pointer"
              >
                READ MORE
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Torn Paper Edge at the Bottom transitioning to White Artists Section */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-20">
        <TornPaperDivider fill="#FFFFFF" position="bottom" variant={3} />
      </div>
    </section>
  );
}
