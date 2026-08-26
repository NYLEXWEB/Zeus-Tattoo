"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Heart, Sparkles, ClipboardCheck } from "lucide-react";

interface SafetyProps {
  onOpenBooking: () => void;
}

export default function Safety({ onOpenBooking }: SafetyProps) {
  const safetyPoints = [
    {
      icon: <ShieldCheck size={18} />,
      title: "100% Sterile Environment",
      desc: "Autoclave sterilization and hospital-grade surface disinfectants applied before and after every session.",
    },
    {
      icon: <Heart size={18} />,
      title: "Single-Use Needles",
      desc: "All needles are opened in front of you from sterile blister packs and disposed of in sharps containers immediately.",
    },
    {
      icon: <Sparkles size={18} />,
      title: "Premium Equipment",
      desc: "We use top-tier rotary machines and organic, vegan-friendly, EU-compliant ink pigments.",
    },
    {
      icon: <ClipboardCheck size={18} />,
      title: "Professional Aftercare",
      desc: "Detailed written guidance and healing ointments are provided to ensure your art heals flawlessly.",
    },
  ];

  return (
    <section id="safety" className="relative py-28 md:py-36 bg-brand-black overflow-hidden border-b border-brand-off-white/5">
      {/* Background image of artist working */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center grayscale opacity-25 scale-102"
          style={{
            backgroundImage: "url('/images/safety_bg.jpg')",
          }}
        />
        {/* Extreme dark vignette to ensure text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/95 to-brand-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Safety Headers & Grid Details */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-7 flex flex-col"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.4em] text-brand-warm-cream uppercase mb-4">
              Why Choose Zeus
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-brand-off-white mb-6 uppercase">
              Your Safety.
              <br />
              <span className="italic font-light text-brand-warm-cream">Our Commitment.</span>
            </h2>
            <p className="text-brand-off-white/70 font-sans text-sm md:text-base leading-relaxed tracking-wide mb-12 max-w-xl">
              We follow strict hygiene protocols, use premium quality inks and equipment, and ensure a comfortable, clean experience — from professional consultation to aftercare guidance.
            </p>

            {/* Safety Guidelines Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {safetyPoints.map((point, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-9 h-9 rounded-full border border-brand-warm-cream/30 bg-brand-charcoal flex items-center justify-center flex-shrink-0 text-brand-warm-cream mt-0.5">
                    {point.icon}
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-sans text-xs tracking-wider font-semibold text-brand-off-white uppercase">
                      {point.title}
                    </h4>
                    <p className="text-xs text-brand-off-white/50 mt-1 leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: CTA & Handwritten tagline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center text-center lg:text-right"
          >
            <div className="bg-brand-charcoal/40 backdrop-blur-sm border border-brand-off-white/5 p-8 md:p-12 w-full max-w-sm flex flex-col items-center lg:items-end gap-8">
              <span className="font-sans text-[10px] tracking-[0.3em] text-brand-off-white/40 uppercase">
                Reserve a Slot
              </span>
              
              <button
                onClick={onOpenBooking}
                className="group w-full py-4 bg-brand-off-white hover:bg-brand-warm-cream text-brand-black font-sans text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-brand-warm-cream/10"
              >
                Book Your Tattoo
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex flex-col items-center lg:items-end gap-1.5 mt-2">
                <span className="font-serif italic text-xl tracking-wide text-brand-warm-cream/90 font-light">
                  "Let's create something permanent."
                </span>
                <span className="font-sans text-[9px] tracking-widest text-brand-off-white/30 uppercase mt-0.5">
                  - Zeus Artists
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
