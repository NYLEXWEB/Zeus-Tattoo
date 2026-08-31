"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

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
    <section id="hygiene" className="bg-[#0b0d12] py-24 md:py-36 overflow-hidden border-b border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">

          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 flex flex-col"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-2 block">
              INSIDE THE STUDIO
            </span>

            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-white mb-3 uppercase">
              PRECISION. HYGIENE. CRAFT.
            </h2>
            <div className="w-12 h-[3px] bg-[#e58c38] mb-6 rounded-full" />

            <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed tracking-wide mb-10 max-w-lg">
              Your health and safety are paramount. At Zeus Tattoo Studio, our sanctuary operates under strict clinical hygiene protocols, matching hospital standards while providing a high-end luxury studio atmosphere.
            </p>

            {/* Standards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {hygieneStandards.map((standard, index) => (
                <div key={index} className="flex gap-4 items-start bg-[#121620] border border-white/10 p-5 rounded-xl hover:border-[#e58c38]/30 transition-all duration-300">
                  <div className="w-7 h-7 rounded-full border border-[#e58c38]/40 bg-[#0b0d12] flex items-center justify-center text-[#e58c38] flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={15} />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-sans text-xs tracking-wider font-extrabold text-white uppercase">
                      {standard.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                      {standard.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Image Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/3] bg-[#121620] border border-white/15 overflow-hidden shadow-2xl rounded-2xl group">
              <img
                src="/images/about_workspace.jpg"
                alt="Zeus Tattoo Studio Sterile Station"
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12]/90 via-transparent to-transparent pointer-events-none" />

              {/* Floating Shield Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#0b0d12]/90 backdrop-blur-md border border-[#e58c38]/30 p-5 rounded-xl flex items-center gap-4 shadow-xl">
                <div className="w-10 h-10 rounded-full border border-[#e58c38] bg-[#121620] flex items-center justify-center text-[#e58c38] flex-shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-extrabold tracking-wider text-white uppercase">
                    100% Sterile Environment Guarantee
                  </span>
                  <span className="text-[10px] tracking-widest text-[#e58c38] font-sans uppercase mt-0.5 font-semibold">
                    Inspected & Approved Hospital Protocols
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
