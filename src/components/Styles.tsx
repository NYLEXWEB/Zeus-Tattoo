"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface StyleCard {
  id: number;
  name: string;
  image: string;
}

export default function Styles() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const stylesList: StyleCard[] = [
    {
      id: 1,
      name: "Realism",
      image: "/images/style_realism.jpg",
    },
    {
      id: 2,
      name: "Black & Grey",
      image: "/images/style_blackgrey.jpg",
    },
    {
      id: 3,
      name: "Fine Line",
      image: "/images/style_fineline.jpg",
    },
    {
      id: 4,
      name: "Japanese",
      image: "/images/style_japanese.jpg",
    },
    {
      id: 5,
      name: "Geometric",
      image: "/images/style_geometric.jpg",
    },
    {
      id: 6,
      name: "Minimalist",
      image: "/images/style_minimalist.jpg",
    },
  ];

  return (
    <section id="styles" className="bg-brand-off-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Side Header Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-4 pr-0 lg:pr-8 flex flex-col items-start"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.4em] text-brand-charcoal/60 uppercase mb-4">
              Tattoo Styles
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-brand-black mb-6 uppercase">
              Find Your
              <br />
              <span className="italic font-light text-brand-black">Style</span>
            </h2>
            <p className="text-brand-charcoal/80 font-sans text-sm md:text-base leading-relaxed tracking-wide mb-10 max-w-sm">
              From bold and intricate to minimal and subtle, we offer a wide range of tattoo styles to match your vision.
            </p>
            <button className="group px-6 py-3.5 border border-brand-black hover:bg-brand-black text-brand-black hover:text-brand-off-white font-sans text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer">
              Explore All Styles
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Right Side Horizontal Scrollable Cards */}
          <div className="lg:col-span-8 overflow-hidden select-none cursor-grab active:cursor-grabbing">
            <motion.div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-8 pt-4 no-scrollbar snap-x scroll-smooth"
              drag="x"
              dragConstraints={{ left: -800, right: 0 }} // dynamic constraints for touch
              whileTap={{ cursor: "grabbing" }}
            >
              {stylesList.map((style, index) => (
                <motion.div
                  key={style.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                  whileHover={{ y: -8 }}
                  className="flex-shrink-0 w-[240px] md:w-[280px] aspect-[3/4] relative overflow-hidden bg-brand-black group cursor-pointer snap-start"
                >
                  {/* Card Image */}
                  <img
                    src={style.image}
                    alt={style.name}
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                    loading="lazy"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Text Details & Interactive Arrow */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
                    <h3 className="font-serif text-xl md:text-2xl text-brand-off-white font-medium uppercase tracking-wide">
                      {style.name}
                    </h3>
                    <div className="w-8 h-8 rounded-full border border-brand-off-white/20 flex items-center justify-center text-brand-off-white opacity-0 group-hover:opacity-100 group-hover:border-brand-warm-cream group-hover:text-brand-warm-cream transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
