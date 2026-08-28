"use client";

import { motion } from "framer-motion";

interface AboutProps {
  onOpenBooking?: () => void;
}

export default function About({ onOpenBooking }: AboutProps) {
  return (
    <section id="about" className="relative bg-[#0b0d12] py-24 md:py-36 overflow-hidden border-b border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Image Card with Bottom-Right Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden border border-white/15 bg-[#121620] shadow-2xl group">
              <img
                src="/images/about_story.jpg"
                alt="Zeus Tattoo Master Artist Tattooing Client"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              {/* Bottom Right Floating Badge */}
              <div className="absolute bottom-5 right-5 z-10 bg-[#12151e]/90 backdrop-blur-md border border-white/10 rounded-xl p-3 px-5 flex flex-col items-center justify-center shadow-xl">
                <span className="font-sans text-2xl md:text-3xl font-extrabold text-[#e58c38] tracking-tight leading-none">
                  10+
                </span>
                <span className="text-[9px] tracking-[0.2em] text-gray-300 font-sans uppercase font-medium mt-1">
                  YEARS CRAFTING
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Story Copy, Stats & Glowing CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Top Eyebrow */}
            <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-2 block">
              THE SANCTUARY
            </span>

            {/* Main Headline */}
            <div className="relative mb-6">
              <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-white uppercase">
                OUR STORY
              </h2>
              {/* Subtle underline accent */}
              <div className="w-12 h-[3px] bg-[#e58c38] mt-2 rounded-full" />
            </div>

            {/* Paragraph 1 */}
            <p className="text-gray-300 font-sans text-sm md:text-base leading-relaxed tracking-wide mb-5">
              Founded by master illustrator Aryan "Zeus" in Kottayam, Zeus Tattoo is a neoclassical body art sanctuary dedicated to permanent collectibles.
            </p>

            {/* Paragraph 2 */}
            <p className="text-gray-400 font-sans text-xs md:text-sm leading-relaxed tracking-wide mb-5">
              We believe that body articulation is more than a service—it is a spiritual integration of geometry, myth, and anatomy. Each custom design is chiseled specifically to fit your posture and skeletal flow, rendering visual expressions that stand the test of time.
            </p>

            {/* Paragraph 3 */}
            <p className="text-gray-400 font-sans text-xs md:text-sm leading-relaxed tracking-wide mb-10">
              Our studio operates under strict clinical guidelines, maintaining a sterile environment that exceeds hospital standards. Whether you are collecting a large neotraditional sleeve, curating an anatomical ear piercing, or seeking microbladed cosmetic enhancements, our sanctuary is designed to make your journey comfortable and memorable.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 sm:gap-10 border-t border-white/10 pt-8 mb-10 w-full">
              <div className="flex flex-col">
                <span className="font-sans text-3xl md:text-4xl font-extrabold text-[#e58c38] tracking-tight">
                  100%
                </span>
                <span className="text-[10px] tracking-[0.2em] text-gray-400 font-sans uppercase font-semibold mt-1">
                  AUTOCLAVE STERILE
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-sans text-3xl md:text-4xl font-extrabold text-[#e58c38] tracking-tight">
                  5k+
                </span>
                <span className="text-[10px] tracking-[0.2em] text-gray-400 font-sans uppercase font-semibold mt-1">
                  SKINS ILLUSTRATED
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-sans text-3xl md:text-4xl font-extrabold text-[#e58c38] tracking-tight">
                  15+
                </span>
                <span className="text-[10px] tracking-[0.2em] text-gray-400 font-sans uppercase font-semibold mt-1">
                  DESIGN AWARDS
                </span>
              </div>
            </div>

            {/* Glowing CTA Button */}
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 bg-gradient-to-r from-[#e58c38] to-[#d97706] hover:from-[#f39c12] hover:to-[#e67e22] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(229,140,56,0.35)] hover:shadow-[0_0_30px_rgba(229,140,56,0.6)] cursor-pointer"
            >
              REQUEST CONSULTATION
            </button>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
