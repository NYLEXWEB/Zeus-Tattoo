"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export default function StudioHygiene() {
  const hygieneStandards = [
    {
      title: "100% Single-Use Needles",
      desc: "Every cartridge needle is sterile, single-use, and opened directly in front of your eyes prior to your session.",
    },
    {
      title: "Hospital Autoclave Sterilization",
      desc: "All reusable grip hardware undergoes hospital-grade ultrasonic cleaning and pressure autoclave sterilization.",
    },
    {
      title: "Medical-Grade Skin Preparation",
      desc: "We utilize medical skin antiseptics, barrier film protection, and sterile field wrapping across all workstations.",
    },
    {
      title: "Vegan & Organic Pigments",
      desc: "We exclusively use EU-certified, heavy-metal-free, organic vegan tattoo inks for vibrant, long-lasting safety.",
    },
  ];

  return (
    <section id="studio" className="bg-brand-charcoal py-28 md:py-36 overflow-hidden border-b border-brand-off-white/5 text-brand-off-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 flex flex-col"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.45em] text-brand-warm-cream uppercase mb-4 block">
              INSIDE THE STUDIO
            </span>

            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-brand-off-white mb-6 uppercase">
              PRECISION.<br />
              HYGIENE.<br />
              <span className="italic font-light text-brand-warm-cream">CRAFT.</span>
            </h2>

            <p className="text-brand-off-white/75 font-sans text-xs md:text-sm leading-relaxed tracking-wide mb-10 max-w-lg">
              Your health and safety are paramount. At Zeus Tattoo Studio, our Koramangala sanctuary operates under strict clinical hygiene protocols, matching hospital standards while providing a high-end luxury studio ambience.
            </p>

            {/* Standards Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {hygieneStandards.map((standard, index) => (
                <div key={index} className="flex gap-4 items-start bg-brand-black/40 border border-brand-off-white/10 p-5 rounded-[3px]">
                  <div className="w-7 h-7 rounded-full border border-brand-warm-cream/30 flex items-center justify-center text-brand-warm-cream flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={15} />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-sans text-xs tracking-wider font-semibold text-brand-off-white uppercase">
                      {standard.title}
                    </h4>
                    <p className="text-[11px] text-brand-off-white/50 mt-1 leading-relaxed">
                      {standard.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Image Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/3] bg-brand-black border border-brand-off-white/10 overflow-hidden shadow-2xl rounded-[3px] group">
              <img
                src="/images/safety_sterilization.jpg"
                alt="Zeus Tattoo Studio Sterile Station in Koramangala Bangalore"
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Shield Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-brand-black/80 backdrop-blur-md border border-brand-off-white/15 p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-brand-warm-cream flex items-center justify-center text-brand-warm-cream flex-shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-semibold tracking-wider text-brand-off-white uppercase">
                    100% Sterile Environment Guarantee
                  </span>
                  <span className="text-[10px] tracking-widest text-brand-off-white/60 font-sans uppercase mt-0.5">
                    Inspected & Approved Hygiene Protocols • Bengaluru
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
