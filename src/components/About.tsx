"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface AboutProps {
  onOpenBooking?: () => void;
}

export default function About({ onOpenBooking }: AboutProps) {
  return (
    <section id="about" className="relative bg-[#0b0d12] py-24 md:py-36 overflow-hidden border-b border-white/5 text-white">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#e58c38]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden border border-[#e58c38]/30 bg-[#121620] shadow-[0_0_40px_rgba(229,140,56,0.15)] group">
              <img
                src="/images/about_story.jpg"
                alt="Zeus Tattoo Master Artist Tattooing Client"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 grayscale brightness-90 group-hover:grayscale-0"
                loading="lazy"
              />

              {/* Bottom Badge */}
              <div className="absolute bottom-5 right-5 z-10 bg-[#0b0d12]/90 backdrop-blur-md border border-[#e58c38]/40 rounded-xl p-4 flex flex-col items-center justify-center shadow-xl">
                <span className="font-sans text-3xl font-extrabold text-[#e58c38] tracking-tight leading-none">
                  10+
                </span>
                <span className="text-[9px] tracking-[0.2em] text-gray-300 font-sans uppercase font-extrabold mt-1">
                  YEARS CRAFTING
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Narrative Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-3 flex items-center gap-2">
              <Sparkles size={13} />
              THE SANCTUARY
            </span>

            <div className="relative mb-6">
              <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-white uppercase">
                OUR STORY & CRAFT
              </h2>
              <div className="w-16 h-[3px] bg-gradient-to-r from-[#e58c38] to-[#d97706] mt-3 rounded-full shadow-[0_0_10px_#e58c38]" />
            </div>

            <p className="text-gray-200 font-sans text-sm md:text-base leading-relaxed tracking-wide mb-5">
              Founded by master illustrator Rahul "Zeus" Sharma, Zeus Tattoo Studio is a neoclassical body art sanctuary in Koramangala, Bangalore, dedicated to permanent collectibles and bespoke custom skin art.
            </p>

            <p className="text-gray-400 font-sans text-xs md:text-sm leading-relaxed tracking-wide mb-5">
              We believe body articulation is more than a service—it is a spiritual integration of geometry, myth, and anatomy. Each custom design is chiseled specifically to fit your posture and skeletal flow.
            </p>

            <p className="text-gray-400 font-sans text-xs md:text-sm leading-relaxed tracking-wide mb-10">
              Operating under strict clinical guidelines, our studio maintains a sterile environment that exceeds hospital standards. Whether collecting a large neotraditional sleeve or curating an anatomical ear piercing, our sanctuary makes your journey unforgettable.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 sm:gap-10 border-t border-white/10 pt-8 mb-10 w-full">
              <div className="flex flex-col">
                <span className="font-sans text-3xl md:text-4xl font-extrabold text-[#e58c38] tracking-tight">
                  100%
                </span>
                <span className="text-[10px] tracking-[0.2em] text-gray-400 font-sans uppercase font-bold mt-1">
                  AUTOCLAVE STERILE
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-sans text-3xl md:text-4xl font-extrabold text-[#e58c38] tracking-tight">
                  5k+
                </span>
                <span className="text-[10px] tracking-[0.2em] text-gray-400 font-sans uppercase font-bold mt-1">
                  SKINS ILLUSTRATED
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-sans text-3xl md:text-4xl font-extrabold text-[#e58c38] tracking-tight">
                  15+
                </span>
                <span className="text-[10px] tracking-[0.2em] text-gray-400 font-sans uppercase font-bold mt-1">
                  DESIGN AWARDS
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onOpenBooking}
              className="group px-8 py-4 bg-gradient-to-r from-[#e58c38] to-[#d97706] hover:from-[#f39c12] hover:to-[#e67e22] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(229,140,56,0.35)] hover:shadow-[0_0_30px_rgba(229,140,56,0.6)] cursor-pointer flex items-center gap-2"
            >
              REQUEST CONSULTATION
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
