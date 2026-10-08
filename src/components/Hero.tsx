"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import TornPaperDivider from "./TornPaperDivider";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative bg-[#0C0D12] text-white pt-28 sm:pt-36 md:pt-44 pb-20 md:pb-32 overflow-hidden"
    >
      {/* Background Graphic & Tattoo Machine Imagery */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 lg:opacity-55">
        <img
          src="/images/about_story.jpg"
          alt="Tattooing Master in Session"
          className="w-full h-full object-cover object-right grayscale brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0D12] via-[#0C0D12]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D12] via-transparent to-black/60" />
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl">
          {/* Trust Rating Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-[#FFA028]/40 rounded-full mb-6"
          >
            <span className="text-[#FFA028] text-xs font-bold font-sans uppercase tracking-widest flex items-center gap-1.5">
              ⭐ 5.0 RATED (210+ GOOGLE REVIEWS) • KOTTAYAM, KERALA
            </span>
          </motion.div>

          {/* Main Title with Vertical Gold Line */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-start gap-4 sm:gap-6 mb-6"
          >
            {/* Vertical Orange Accent Bar */}
            <div className="w-1 sm:w-1.5 h-24 sm:h-32 md:h-36 bg-[#FFA028] rounded-full flex-shrink-0 mt-2 shadow-[0_0_15px_rgba(255,160,40,0.5)]" />

            <div className="flex flex-col">
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white uppercase leading-[1.05]">
                ZEUS TATTOO <br />
                <span className="text-white">STUDIO </span>
                <span className="text-[#FFA028]">KOTTAYAM</span>
              </h1>
            </div>
          </motion.div>

          {/* Subtitle / Description Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-200 font-sans text-xs sm:text-sm md:text-base leading-relaxed tracking-wide mb-8 max-w-2xl pl-5 sm:pl-7"
          >
            Welcoming tattoo and piercing shop featuring professional artists and a clean, comfortable studio. Specializing in custom tattoos, fine line work, minimalist designs, and all types of piercings — nose, helix, bugadi, and ear.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap items-center gap-4 pl-5 sm:pl-7"
          >
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 bg-[#FFA028] hover:bg-[#E07D00] text-[#0C0D12] font-display text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,160,40,0.35)] cursor-pointer rounded"
            >
              BOOK CONSULTATION
            </button>
            <a
              href="tel:08714131748"
              className="px-6 py-3.5 border-2 border-white/60 hover:border-[#FFA028] text-white hover:text-[#FFA028] font-display text-sm font-bold tracking-widest uppercase transition-all duration-300 backdrop-blur-xs cursor-pointer rounded flex items-center gap-2"
            >
              CALL: 087141 31748
            </a>
            <button
              onClick={() => scrollToSection("about")}
              className="px-6 py-3.5 text-gray-300 hover:text-white font-display text-sm font-bold tracking-widest uppercase transition-colors cursor-pointer"
            >
              ABOUT STUDIO
            </button>
          </motion.div>
        </div>
      </div>

      {/* Torn Paper Edge at the Bottom transitioning to White About section */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-20">
        <TornPaperDivider fill="#FFFFFF" position="bottom" variant={1} />
      </div>
    </section>
  );
}
