"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export default function FinalCTA({ onOpenBooking }: FinalCTAProps) {
  return (
    <section className="bg-[#0b0d12] py-24 md:py-36 relative overflow-hidden border-b border-white/5 text-white">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#e58c38]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col items-center"
        >
          <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-4 flex items-center gap-2">
            <Sparkles size={14} />
            YOUR SKIN IS A CANVAS
          </span>

          <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-wider text-white uppercase mb-6 leading-tight">
            READY TO CREATE <br className="hidden sm:block" />
            <span className="text-[#e58c38]">SOMETHING PERMANENT?</span>
          </h2>

          <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed tracking-wide max-w-xl mb-10">
            Book your custom consultation today. Our resident artists will help refine your ideas into custom digital renders chiseled specifically for your anatomy.
          </p>

          <button
            onClick={onOpenBooking}
            className="group px-10 py-4 bg-gradient-to-r from-[#e58c38] to-[#d97706] hover:from-[#f39c12] hover:to-[#e67e22] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-all duration-300 flex items-center gap-3 cursor-pointer shadow-[0_0_30px_rgba(229,140,56,0.4)] hover:shadow-[0_0_40px_rgba(229,140,56,0.7)]"
          >
            BOOK YOUR SESSION NOW
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
