"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Navigation, MessageCircle, Sparkles, ArrowRight, ShieldCheck, Compass, Star, Globe, ExternalLink } from "lucide-react";
import SectionFlourish from "./SectionFlourish";
import TornPaperDivider from "./TornPaperDivider";

interface ContactLocationProps {
  onOpenBooking: () => void;
}

export default function ContactLocation({ onOpenBooking }: ContactLocationProps) {
  const [activeTab, setActiveTab] = useState<"MAP" | "STUDIO" | "SCHEDULE">("MAP");

  const studioImages = [
    { src: "/images/about_story.jpg", title: "MAIN CREATIVE SANCTUARY", desc: "Private sterile workstations & ergonomic tattoo suites" },
    { src: "/images/about_workspace.jpg", title: "AUTOCLAVE STERILIZATION LAB", desc: "Hospital-grade air filtration & clinical hygiene tech" },
  ];

  const googleMapsUrl = "https://www.google.com/search?q=Zeus+Tattoo+Kottayam";

  return (
    <section id="contact" className="relative bg-[#0b0d12] py-20 md:py-32 overflow-hidden text-white">

      {/* Subtle Background Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#FFA028]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#FFA028]/10 border border-[#FFA028]/30 rounded-full mb-3">
              <span className="text-[#FFA028] text-xs font-bold font-sans uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles size={12} />
                5.0 RATED • 210 GOOGLE REVIEWS
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-white uppercase">
              STUDIO & <br className="sm:hidden" />
              <span className="text-[#FFA028]">LOCATION</span>
            </h2>
            <SectionFlourish color="#FFA028" />
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={onOpenBooking}
              className="px-7 py-3.5 bg-[#FFA028] hover:bg-[#E07D00] text-[#0C0D12] font-display text-xs sm:text-sm font-bold tracking-widest uppercase rounded shadow-[0_0_20px_rgba(255,160,40,0.35)] transition-all cursor-pointer flex items-center gap-2"
            >
              BOOK CONSULTATION
              <ArrowRight size={14} />
            </button>
            <a
              href="https://wa.me/918714131748"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3.5 border border-white/20 hover:border-[#FFA028] text-white hover:text-[#FFA028] font-display text-xs sm:text-sm font-bold tracking-widest uppercase rounded transition-colors cursor-pointer flex items-center gap-2"
            >
              <MessageCircle size={14} className="text-[#FFA028]" />
              WHATSAPP DIRECT
            </a>
          </motion.div>
        </div>

        {/* View Switcher Pills */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => setActiveTab("MAP")}
            className={`px-6 py-2.5 rounded text-xs font-display font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer border ${activeTab === "MAP"
              ? "bg-[#FFA028] text-[#0C0D12] border-[#FFA028] shadow-[0_0_15px_rgba(255,160,40,0.4)]"
              : "bg-[#121620] text-gray-300 border-white/10 hover:border-[#FFA028]/40 hover:text-white"
              }`}
          >
            LOCATION & MAP DIRECTIONS
          </button>
          <button
            onClick={() => setActiveTab("STUDIO")}
            className={`px-6 py-2.5 rounded text-xs font-display font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer border ${activeTab === "STUDIO"
              ? "bg-[#FFA028] text-[#0C0D12] border-[#FFA028] shadow-[0_0_15px_rgba(255,160,40,0.4)]"
              : "bg-[#121620] text-gray-300 border-white/10 hover:border-[#FFA028]/40 hover:text-white"
              }`}
          >
            STUDIO SANCTUARY
          </button>
          <button
            onClick={() => setActiveTab("SCHEDULE")}
            className={`px-6 py-2.5 rounded text-xs font-display font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer border ${activeTab === "SCHEDULE"
              ? "bg-[#FFA028] text-[#0C0D12] border-[#FFA028] shadow-[0_0_15px_rgba(255,160,40,0.4)]"
              : "bg-[#121620] text-gray-300 border-white/10 hover:border-[#FFA028]/40 hover:text-white"
              }`}
          >
            CLINICAL HOURS & STERILIZATION
          </button>
        </div>

        {/* Content Canvas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Side: Address Details & Contact Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Main Address Card */}
            <div className="bg-[#121620] border border-[#FFA028]/40 p-8 rounded-xl flex flex-col gap-4 shadow-xl relative overflow-hidden group hover:border-[#FFA028] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-[0.2em] font-display font-bold text-[#FFA028] uppercase flex items-center gap-2">
                  <Compass size={14} />
                  KOTTAYAM SANCTUARY
                </span>
                <span className="text-[10px] font-sans font-bold tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full uppercase">
                  OPEN · CLOSES 8 PM
                </span>
              </div>

              <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-wide">
                Zeus Tattoo Kottayam
              </h3>

              <div className="text-xs md:text-sm text-gray-300 font-sans leading-relaxed tracking-wide space-y-1">
                <p className="font-bold text-white flex items-start gap-2">
                  <MapPin size={16} className="text-[#FFA028] shrink-0 mt-0.5" />
                  <span>2nd floor, Manorama Junction, roji&apos;s arch, Erayilkadavu Rd, Eerayil Kadavu, Kottayam, Kerala 686001</span>
                </p>
                <p className="text-[#FFA028] text-xs font-mono pt-1">Landmark: Manorama Junction, Kottayam</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs text-[#FFA028] hover:underline font-display font-bold tracking-wider uppercase group-hover:translate-x-1 transition-transform"
                >
                  <Navigation size={14} />
                  GET DIRECTIONS ON GOOGLE MAPS
                </a>
                <span className="text-[11px] text-gray-400 flex items-center gap-1 font-sans">
                  ★ 5.0 (210 Reviews)
                </span>
              </div>
            </div>

            {/* Operating Schedule Card */}
            <div className="bg-[#121620] border border-white/10 p-8 rounded-xl flex flex-col gap-4">
              <span className="text-xs tracking-[0.2em] font-display font-bold text-[#FFA028] uppercase flex items-center gap-2">
                <Clock size={14} />
                OPERATING HOURS
              </span>

              <div className="flex flex-col gap-3 text-xs font-sans">
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <span className="text-gray-300">Monday – Sunday (Daily)</span>
                  <strong className="text-white font-extrabold">Open · Closes 8:00 PM</strong>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <span className="text-gray-300">Piercing & Consultation</span>
                  <span className="text-[#FFA028] font-bold">Walk-ins & Appointments</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-gray-300">Custom Tattoo Sessions</span>
                  <span className="text-white font-medium">Prior Booking Advised</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#121620] border border-white/10 p-5 rounded-xl flex flex-col">
                <span className="text-xs text-[#FFA028] font-display font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
                  <Phone size={14} />
                  STUDIO PHONE
                </span>
                <a href="tel:08714131748" className="text-xs text-white hover:text-[#FFA028] transition-colors font-bold tracking-wide">
                  087141 31748
                </a>
              </div>

              <div className="bg-[#121620] border border-white/10 p-5 rounded-xl flex flex-col">
                <span className="text-xs text-[#FFA028] font-display font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
                  <Globe size={14} />
                  OFFICIAL WEBSITE
                </span>
                <a href="https://zeustattoo.in/" target="_blank" rel="noreferrer" className="text-xs text-white hover:text-[#FFA028] transition-colors font-bold tracking-wide flex items-center gap-1.5">
                  zeustattoo.in
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

          </div>

          {/* Right Side: Tabbed Dynamic Visual Stage (Map / Studio Sanctuary Photos) */}
          <div className="lg:col-span-7 h-full min-h-[480px] lg:min-h-[520px] rounded-xl overflow-hidden border border-[#FFA028]/40 shadow-2xl relative bg-[#0b0d12]">

            <AnimatePresence mode="wait">
              {activeTab === "MAP" && (
                <motion.div
                  key="map"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full relative min-h-[480px]"
                >
                  <iframe
                    title="Zeus Tattoo Kottayam Google Map"
                    src="https://maps.google.com/maps?q=Zeus%20Tattoo%20Kottayam,%20Manorama%20Junction,%20Erayilkadavu%20Rd,%20Kottayam,%20Kerala%20686001&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "480px", filter: "invert(90%) hue-rotate(180%) contrast(1.2) brightness(0.9)" }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  {/* Custom Studio Radar Marker Overlay */}
                  <div className="absolute bottom-6 left-6 z-10 bg-[#0b0d12]/95 backdrop-blur-md border border-[#FFA028] p-4 rounded-xl flex items-center gap-3 shadow-[0_0_30px_rgba(255,160,40,0.35)]">
                    <div className="relative flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-[#FFA028]" />
                      <div className="absolute w-8 h-8 rounded-full border border-[#FFA028] animate-ping" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-sm text-white uppercase tracking-wider">
                        ZEUS TATTOO KOTTAYAM
                      </span>
                      <span className="text-[10px] text-[#FFA028] font-sans tracking-widest uppercase font-semibold">
                        2nd Floor, Manorama Junction, Erayilkadavu Rd
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "STUDIO" && (
                <motion.div
                  key="studio"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full p-6 bg-[#121620] grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {studioImages.map((sImg, sIdx) => (
                    <div key={sIdx} className="relative rounded-xl overflow-hidden border border-white/10 group aspect-[4/3]">
                      <img src={sImg.src} alt={sImg.title} className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12]/90 via-transparent to-transparent p-4 flex flex-col justify-end">
                        <span className="text-xs font-display font-bold tracking-widest text-[#FFA028] uppercase">
                          {sImg.title}
                        </span>
                        <span className="text-xs text-gray-300 font-sans mt-0.5">
                          {sImg.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "SCHEDULE" && (
                <motion.div
                  key="schedule"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full p-8 bg-[#121620] flex flex-col justify-between min-h-[480px]"
                >
                  <div className="flex flex-col gap-4">
                    <span className="text-xs font-display font-bold text-[#FFA028] uppercase tracking-[0.2em]">
                      CLINICAL STERILIZATION & HYGIENE
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white uppercase">
                      100% STERILE HOSPITAL-GRADE STANDARDS
                    </h3>
                    <p className="text-xs text-gray-300 font-sans leading-relaxed">
                      At Zeus Tattoo Studio Kottayam, your health and safety come first. We maintain strict hygiene protocols with single-use sterile needle cartridges, medical autoclave sterilization, skin-safe antiseptic barriers, and EU-certified vegan tattoo inks.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-6">
                    <div className="bg-[#0b0d12] p-4 rounded-xl border border-white/5 flex items-center gap-3">
                      <ShieldCheck size={24} className="text-[#FFA028]" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white font-display uppercase">SINGLE-USE NEEDLES</span>
                        <span className="text-[10px] text-gray-400 font-sans">Sealed blister packs opened in front of you</span>
                      </div>
                    </div>
                    <div className="bg-[#0b0d12] p-4 rounded-xl border border-white/5 flex items-center gap-3">
                      <Sparkles size={24} className="text-[#FFA028]" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white font-display uppercase">PREMIUM INKS & JEWELRY</span>
                        <span className="text-[10px] text-gray-400 font-sans">ASTM F-136 Implant-Grade Titanium</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>

      {/* Torn Paper Edge at the Bottom transitioning into White Newsletter */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-20">
        <TornPaperDivider fill="#FFFFFF" position="bottom" variant={1} />
      </div>
    </section>
  );
}
