"use client";

import { motion } from "framer-motion";
import SectionFlourish from "./SectionFlourish";
import TornPaperDivider from "./TornPaperDivider";
import TornPhotoCollage from "./TornPhotoCollage";

interface AboutProps {
  onOpenBooking?: () => void;
}

export default function About({ onOpenBooking }: AboutProps) {
  return (
    <section id="about" className="relative bg-white text-[#0C0D12] pt-12 pb-24 md:pb-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider text-[#0C0D12] uppercase"
          >
            ABOUT US
          </motion.h2>
          <SectionFlourish color="#FFA028" />
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Torn-paper Collage of Photos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative flex flex-col items-center"
          >
            <TornPhotoCollage
              topImage="/images/about_story.jpg"
              bottomImage="/images/about_workspace.jpg"
            />
          </motion.div>

          {/* Right Column: Heading, Narrative & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <div className="flex items-center gap-2 px-3 py-1 bg-[#FFA028]/15 border border-[#FFA028]/40 rounded-full mb-4">
              <span className="text-[#0C0D12] text-xs font-bold font-sans uppercase tracking-wider flex items-center gap-1.5">
                ★ 5.0 RATED ON GOOGLE (210+ REVIEWS)
              </span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0C0D12] uppercase leading-tight mb-6">
              PERFECTION THAT IS FOREVER
            </h3>

            <p className="text-gray-800 font-sans text-sm sm:text-base leading-relaxed mb-4">
              At <strong className="text-[#0C0D12]">Zeus Tattoo Studio Kottayam</strong>, we transform your ideas into art that lasts a lifetime. Our skilled tattoo artists and professional piercers specialize in custom tattoos, fine line work, minimalist designs, and all types of piercings — nose, helix, bugadi, and ear.
            </p>

            <p className="text-gray-600 font-sans text-xs sm:text-sm leading-relaxed mb-6">
              Known as one of the best tattoo studios in Kottayam, we maintain the highest hygiene standards, use premium inks, and ensure a comfortable, safe, and creative experience. Whether you’re getting your first tattoo or a new piercing, Zeus Tattoo is your trusted space for self-expression and precision artistry.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-3 mb-8 w-full">
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="block text-xs font-bold text-[#0C0D12] uppercase font-display">CUSTOM TATTOOS</span>
                <span className="text-[11px] text-gray-500 font-sans">Fine line, minimalist & realism</span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="block text-xs font-bold text-[#0C0D12] uppercase font-display">EXPERT PIERCINGS</span>
                <span className="text-[11px] text-gray-500 font-sans">Nose, helix, bugadi & ear</span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="block text-xs font-bold text-[#0C0D12] uppercase font-display">HOSPITAL HYGIENE</span>
                <span className="text-[11px] text-gray-500 font-sans">100% sterile single-use gear</span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="block text-xs font-bold text-[#0C0D12] uppercase font-display">KOTTAYAM LOCATION</span>
                <span className="text-[11px] text-gray-500 font-sans">Manorama Junction, 2nd Flr</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full border-t border-gray-200 pt-6">
              <button
                onClick={onOpenBooking}
                className="px-8 py-3.5 bg-[#0C0D12] hover:bg-[#FFA028] text-white hover:text-[#0C0D12] font-display text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-lg cursor-pointer rounded"
              >
                DISCOVER MORE
              </button>
              <a
                href="https://zeustattoo.in/"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 border border-gray-300 hover:border-[#0C0D12] text-gray-700 hover:text-[#0C0D12] font-display text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded"
              >
                OFFICIAL WEBSITE
              </a>
            </div>

          </motion.div>
        </div>
      </div>

      {/* Torn Paper Edge at the Bottom transitioning to Orange Services Section */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-20">
        <TornPaperDivider fill="#FFA028" position="bottom" variant={2} />
      </div>
    </section>
  );
}
