"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  category: string; // matches filter keys
  image: string;
  sizeClass: string; // for asymmetrical layout variations
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filters = [
    { label: "ALL", value: "ALL" },
    { label: "REALISM", value: "REALISM" },
    { label: "BLACK & GREY", value: "BLACK & GREY" },
    { label: "FINE LINE", value: "FINE LINE" },
    { label: "JAPANESE", value: "JAPANESE" },
    { label: "GEOMETRIC", value: "GEOMETRIC" },
  ];

  const items: PortfolioItem[] = [
    {
      id: 1,
      title: "Lion Realism",
      category: "REALISM",
      image: "/images/portfolio_lion_realism.jpg",
      sizeClass: "col-span-1 row-span-2 aspect-[3/4]",
    },
    {
      id: 2,
      title: "Floral Fine Line",
      category: "FINE LINE",
      image: "/images/portfolio_floral_fineline.jpg",
      sizeClass: "col-span-1 row-span-1 aspect-square",
    },
    {
      id: 3,
      title: "Sleeve Work",
      category: "BLACK & GREY",
      image: "/images/portfolio_sleeve_work.jpg",
      sizeClass: "col-span-1 row-span-1 aspect-square",
    },
    {
      id: 4,
      title: "Geometric Mandala",
      category: "GEOMETRIC",
      image: "/images/portfolio_geometric_mandala.jpg",
      sizeClass: "col-span-1 row-span-2 aspect-[3/4]",
    },
    {
      id: 5,
      title: "Realistic Eye Detail",
      category: "REALISM",
      image: "/images/portfolio_realistic_eye.jpg",
      sizeClass: "col-span-1 row-span-1 aspect-square",
    },
    {
      id: 6,
      title: "Japanese Dragon Outline",
      category: "JAPANESE",
      image: "/images/portfolio_japanese_dragon.jpg",
      sizeClass: "col-span-1 row-span-1 aspect-square",
    },
    {
      id: 7,
      title: "Butterfly Fine Line",
      category: "FINE LINE",
      image: "/images/portfolio_butterfly_fineline.jpg",
      sizeClass: "col-span-1 row-span-1 aspect-square",
    },
    {
      id: 8,
      title: "Monochrome Portrait",
      category: "BLACK & GREY",
      image: "/images/portfolio_monochrome_portrait.jpg",
      sizeClass: "col-span-1 row-span-1 aspect-square",
    },
  ];

  const filteredItems = activeFilter === "ALL" 
    ? items 
    : items.filter(item => item.category === activeFilter);

  return (
    <section id="portfolio" className="bg-brand-off-white py-24 md:py-32 overflow-hidden border-b border-brand-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-12">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-4 flex flex-col items-start"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.4em] text-brand-charcoal/60 uppercase mb-4">
              Portfolio
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-brand-black mb-6 uppercase">
              Our Latest
              <br />
              <span className="italic font-light text-brand-black">Works</span>
            </h2>
            <p className="text-brand-charcoal/80 font-sans text-sm md:text-base leading-relaxed tracking-wide mb-8 max-w-sm">
              A glimpse of the art, passion and precision we bring to every tattoo.
            </p>
            <button className="group px-6 py-3.5 border border-brand-black hover:bg-brand-black text-brand-black hover:text-brand-off-white font-sans text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer">
              View Full Gallery
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Right Category Filter list */}
          <div className="lg:col-span-8 flex flex-wrap gap-2 lg:justify-end">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 text-[10px] tracking-widest uppercase transition-all duration-300 font-sans font-semibold cursor-pointer border ${
                  activeFilter === filter.value
                    ? "bg-brand-black text-brand-off-white border-brand-black"
                    : "bg-transparent text-brand-charcoal/60 border-brand-charcoal/10 hover:text-brand-black hover:border-brand-charcoal/30"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid (with smooth animation transitions) */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`relative overflow-hidden group cursor-pointer bg-brand-charcoal rounded-[3px] ${item.sizeClass}`}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale brightness-95 group-hover:scale-103 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                  loading="lazy"
                />

                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col items-center justify-center gap-2" >
                  <div className="w-10 h-10 rounded-full border border-brand-off-white/40 flex items-center justify-center text-brand-off-white bg-brand-black/30 scale-75 group-hover:scale-100 transition-transform duration-400">
                    <Eye size={16} />
                  </div>
                  <span className="font-sans text-[10px] tracking-[0.2em] font-semibold text-brand-off-white uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                    View Work
                  </span>
                  <span className="font-serif text-sm italic text-brand-warm-cream/90 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
