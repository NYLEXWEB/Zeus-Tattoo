"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export default function FinalCTA({ onOpenBooking }: FinalCTAProps) {
  return (
    <section className="relative py-28 md:py-36 bg-brand-black overflow-hidden flex items-center justify-center border-b border-brand-off-white/5">
      {/* Background with low opacity */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center grayscale opacity-[0.07]"
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
          {/* Small label */}
          <span className="font-sans text-xs font-semibold tracking-[0.4em] text-brand-warm-cream uppercase mb-4">
            Ready to get inked?
          </span>

          {/* Large Serif Title */}
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-tight text-brand-off-white mb-6 uppercase">
            Let's Create
            <br />
            <span className="italic font-light text-brand-warm-cream">Something Permanent.</span>
          </h2>

          {/* Supporting Text */}
          <p className="text-brand-off-white/70 font-sans text-sm md:text-base leading-relaxed tracking-wide mb-12 max-w-lg">
            Consult with our award-winning artists, customize your artwork, and secure your session today. Walks-ins are welcome based on availability, but bookings are highly recommended.
          </p>

          {/* Large Cream Button */}
          <button
            onClick={onOpenBooking}
            className="group px-10 py-5 bg-brand-off-white hover:bg-brand-warm-cream text-brand-black font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-xl hover:shadow-brand-warm-cream/10"
          >
            Book Your Appointment
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
