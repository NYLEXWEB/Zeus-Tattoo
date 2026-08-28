"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export default function FinalCTA({ onOpenBooking }: FinalCTAProps) {
  return (
    <section className="relative py-28 md:py-36 bg-brand-black overflow-hidden flex items-center justify-center border-b border-brand-off-white/5">
      {/* Background overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center grayscale opacity-[0.06]"
          style={{
            backgroundImage: "url('/images/cta_bg.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col items-center"
        >
          {/* Label */}
          <span className="font-sans text-xs font-semibold tracking-[0.45em] text-brand-warm-cream uppercase mb-4 flex items-center gap-2">
            <Sparkles size={12} />
            READY TO GET INKED?
          </span>

          {/* Title */}
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-brand-off-white mb-6 uppercase">
            LET'S CREATE<br />
            <span className="italic font-light text-brand-warm-cream">SOMETHING PERMANENT.</span>
          </h2>

          {/* Description */}
          <p className="text-brand-off-white/75 font-sans text-xs md:text-sm leading-relaxed tracking-wide mb-10 max-w-lg">
            Consult with our award-winning Koramangala artists, customize your artwork, and secure your session today. Walk-ins welcome based on artist availability.
          </p>

          {/* CTA Button */}
          <button
            onClick={onOpenBooking}
            className="group px-10 py-5 bg-brand-off-white hover:bg-brand-warm-cream text-brand-black font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-xl hover:shadow-brand-warm-cream/10"
          >
            BOOK YOUR APPOINTMENT
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
