"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Navigation, MessageCircle, Sparkles, ArrowRight, ShieldCheck, Compass } from "lucide-react";

interface ContactLocationProps {
  onOpenBooking: () => void;
}

export default function ContactLocation({ onOpenBooking }: ContactLocationProps) {
  const [activeTab, setActiveTab] = useState<"MAP" | "STUDIO" | "SCHEDULE">("MAP");

  const studioImages = [
    { src: "/images/about_story.jpg", title: "MAIN CREATIVE SANCTUARY", desc: "Private sterile workstations & ergonomic tattoo suites" },
    { src: "/images/about_workspace.jpg", title: "AUTOCLAVE STERILIZATION LAB", desc: "Hospital-grade air filtration & clinical hygiene tech" },
  ];

  return (
    <section id="contact" className="bg-[#0b0d12] py-24 md:py-36 overflow-hidden border-b border-white/5 text-white relative">

      {/* Subtle Background Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#e58c38]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col items-start"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-2 flex items-center gap-2">
              <Sparkles size={13} />
              FIND THE PLACE • ENTER THE STUDIO
            </span>
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-white uppercase">
              STUDIO LOCATION
            </h2>
            <div className="w-16 h-[3px] bg-gradient-to-r from-[#e58c38] to-[#d97706] mt-3 rounded-full shadow-[0_0_10px_#e58c38]" />
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={onOpenBooking}
              className="px-7 py-3.5 bg-gradient-to-r from-[#e58c38] to-[#d97706] hover:from-[#f39c12] hover:to-[#e67e22] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-all cursor-pointer shadow-[0_0_20px_rgba(229,140,56,0.35)] flex items-center gap-2"
            >
              BOOK CONSULTATION
              <ArrowRight size={14} />
            </button>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3.5 border border-white/20 hover:border-[#e58c38] text-white hover:text-[#e58c38] font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-colors cursor-pointer flex items-center gap-2"
            >
              <MessageCircle size={14} className="text-[#e58c38]" />
              WHATSAPP DIRECT
            </a>
          </motion.div>
        </div>

        {/* View Switcher Pills */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => setActiveTab("MAP")}
            className={`px-6 py-2.5 rounded-full text-[10px] font-sans font-extrabold tracking-widest uppercase transition-all duration-300 cursor-pointer border ${activeTab === "MAP"
              ? "bg-gradient-to-r from-[#e58c38] to-[#d97706] text-black border-[#e58c38] shadow-[0_0_15px_#e58c38]"
              : "bg-[#121620] text-gray-300 border-white/10 hover:border-[#e58c38]/40 hover:text-white"
              }`}
          >
            SATELLITE MAP & NAVIGATION
          </button>
          <button
            onClick={() => setActiveTab("STUDIO")}
            className={`px-6 py-2.5 rounded-full text-[10px] font-sans font-extrabold tracking-widest uppercase transition-all duration-300 cursor-pointer border ${activeTab === "STUDIO"
              ? "bg-gradient-to-r from-[#e58c38] to-[#d97706] text-black border-[#e58c38] shadow-[0_0_15px_#e58c38]"
              : "bg-[#121620] text-gray-300 border-white/10 hover:border-[#e58c38]/40 hover:text-white"
              }`}
          >
            STUDIO SANCTUARY PREVIEW
          </button>
          <button
            onClick={() => setActiveTab("SCHEDULE")}
            className={`px-6 py-2.5 rounded-full text-[10px] font-sans font-extrabold tracking-widest uppercase transition-all duration-300 cursor-pointer border ${activeTab === "SCHEDULE"
              ? "bg-gradient-to-r from-[#e58c38] to-[#d97706] text-black border-[#e58c38] shadow-[0_0_15px_#e58c38]"
              : "bg-[#121620] text-gray-300 border-white/10 hover:border-[#e58c38]/40 hover:text-white"
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
            <div className="bg-[#121620] border border-[#e58c38]/40 p-8 rounded-2xl flex flex-col gap-4 shadow-xl relative overflow-hidden group hover:border-[#e58c38] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.3em] font-sans font-extrabold text-[#e58c38] uppercase flex items-center gap-2">
                  <Compass size={14} />
                  KOTTAYAM SANCTUARY
                </span>
                <span className="text-[9px] font-sans font-bold tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full uppercase">
                  OPEN TODAY
                </span>
              </div>

              <h3 className="font-sans text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight">
                Zeus Tattoo Studio
              </h3>

              <div className="text-xs md:text-sm text-gray-300 font-sans leading-relaxed tracking-wide space-y-1">
                <p className="font-bold text-white">Main Temple Road, Near Central Square</p>
                <p>Kottayam, Kerala 686001</p>
                <p className="text-[#e58c38] text-[11px] font-mono pt-1">GPS: 9.5916° N, 76.5222° E</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href="https://maps.google.com/?q=Zeus+Tattoo+Studio+Kottayam+Kerala"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs text-[#e58c38] hover:underline font-sans font-extrabold tracking-wider uppercase group-hover:translate-x-1 transition-transform"
                >
                  <Navigation size={14} />
                  GET DIRECTIONS ON GOOGLE MAPS
                </a>
              </div>
            </div>

            {/* Operating Schedule Card */}
            <div className="bg-[#121620] border border-white/10 p-8 rounded-2xl flex flex-col gap-4">
              <span className="text-[10px] tracking-[0.3em] font-sans font-extrabold text-[#e58c38] uppercase flex items-center gap-2">
                <Clock size={14} />
                CLINICAL OPERATING HOURS
              </span>

              <div className="flex flex-col gap-3 text-xs font-sans">
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <span className="text-gray-300">Tuesday – Sunday</span>
                  <strong className="text-white font-extrabold">11:00 AM – 8:30 PM</strong>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <span className="text-gray-300">Monday</span>
                  <span className="text-[#e58c38] font-bold uppercase tracking-wider text-[10px] bg-[#0b0d12] px-2.5 py-1 rounded border border-[#e58c38]/30">
                    Closed for Sterilization
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-gray-300">Consultation Slots</span>
                  <span className="text-white font-medium">By Prior Appointment</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#121620] border border-white/10 p-5 rounded-2xl flex flex-col">
                <span className="text-[10px] text-[#e58c38] font-sans font-extrabold uppercase tracking-widest flex items-center gap-2 mb-2">
                  <Phone size={14} />
                  STUDIO LINE
                </span>
                <a href="tel:+919876543210" className="text-xs text-white hover:text-[#e58c38] transition-colors font-bold tracking-wide">
                  +91 98765 43210
                </a>
              </div>

              <div className="bg-[#121620] border border-white/10 p-5 rounded-2xl flex flex-col">
                <span className="text-[10px] text-[#e58c38] font-sans font-extrabold uppercase tracking-widest flex items-center gap-2 mb-2">
                  <Mail size={14} />
                  EMAIL DESK
                </span>
                <a href="mailto:contact@zeustattoo.com" className="text-xs text-white hover:text-[#e58c38] transition-colors font-bold tracking-wide">
                  contact@zeustattoo.com
                </a>
              </div>
            </div>

          </div>

          {/* Right Side: Tabbed Dynamic Visual Stage (Map / Studio Sanctuary Photos) */}
          <div className="lg:col-span-7 h-full min-h-[480px] lg:min-h-[520px] rounded-2xl overflow-hidden border border-[#e58c38]/40 shadow-2xl relative bg-[#0b0d12]">

            <AnimatePresence mode="wait">
              {activeTab === "MAP" && (
                <motion.div
                  key="map"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full relative"
                >
                  <iframe
                    title="Zeus Tattoo Studio Kottayam Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62916.14081699708!2d76.5057038!3d9.5915668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062ba16c6b435f%3A0xbe2b02e68f8f483b!2sKottayam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "480px", filter: "invert(90%) hue-rotate(180%) contrast(1.2) brightness(0.9)" }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  {/* Custom Studio Radar Marker Overlay */}
                  <div className="absolute bottom-6 left-6 z-10 bg-[#0b0d12]/95 backdrop-blur-md border border-[#e58c38] p-4 rounded-xl flex items-center gap-3 shadow-[0_0_30px_rgba(229,140,56,0.35)]">
                    <div className="relative flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-[#e58c38]" />
                      <div className="absolute w-8 h-8 rounded-full border border-[#e58c38] animate-ping" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sans font-extrabold text-sm text-white uppercase tracking-wider">
                        ZEUS TATTOO SANCTUARY
                      </span>
                      <span className="text-[9px] text-[#e58c38] font-sans tracking-widest uppercase font-semibold">
                        Kottayam • Central Square Junction
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
                        <span className="text-[10px] font-sans font-extrabold tracking-widest text-[#e58c38] uppercase">
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
                  className="w-full h-full p-8 bg-[#121620] flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-4">
                    <span className="text-xs font-sans font-extrabold text-[#e58c38] uppercase tracking-[0.3em]">
                      CLINICAL STERILIZATION & SAFETY PROTOCOL
                    </span>
                    <h3 className="font-sans text-2xl font-extrabold text-white uppercase">
                      HOSPITAL-GRADE SANITATION STANDARDS
                    </h3>
                    <p className="text-xs text-gray-300 font-sans leading-relaxed">
                      Every Monday, Zeus Tattoo Studio undergoes a complete 12-hour deep sterilization protocol. All autoclave pressure logs, spore tests, and needle single-use serials are registered before doors open on Tuesday.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-6">
                    <div className="bg-[#0b0d12] p-4 rounded-xl border border-white/5 flex items-center gap-3">
                      <ShieldCheck size={24} className="text-[#e58c38]" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white font-sans uppercase">SINGLE-USE NEEDLES</span>
                        <span className="text-[10px] text-gray-400 font-sans">Sealed blister packs opened in front of you</span>
                      </div>
                    </div>
                    <div className="bg-[#0b0d12] p-4 rounded-xl border border-white/5 flex items-center gap-3">
                      <Sparkles size={24} className="text-[#e58c38]" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white font-sans uppercase">AUTOCLAVE CERTIFIED</span>
                        <span className="text-[10px] text-gray-400 font-sans">Class-B medical steam sterilizers</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
