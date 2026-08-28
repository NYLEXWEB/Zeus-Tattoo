"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  artist: string;
  description: string;
  image: string;
  sizeClass: string;
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters = [
    { label: "ALL", value: "ALL" },
    { label: "REALISM", value: "REALISM" },
    { label: "BLACK & GREY", value: "BLACK & GREY" },
    { label: "FINE LINE", value: "FINE LINE" },
    { label: "TRADITIONAL", value: "TRADITIONAL" },
    { label: "COVER UPS", value: "COVER UPS" },
  ];

  const items: PortfolioItem[] = [
    {
      id: 1,
      title: "Majestic Lion Realism",
      category: "REALISM",
      artist: "Rahul Sharma",
      description: "High-contrast lion portrait featuring micro-textural fur shading and sharp light catch in the eyes.",
      image: "/images/portfolio_lion_realism.jpg",
      sizeClass: "col-span-1 row-span-2 aspect-[3/4]",
    },
    {
      id: 2,
      title: "Botanical Fine Line",
      category: "FINE LINE",
      artist: "Meera Nair",
      description: "Single-needle wildflowers and delicate organic stemwork flowing seamlessly along the forearm.",
      image: "/images/portfolio_floral_fineline.jpg",
      sizeClass: "col-span-1 row-span-1 aspect-square",
    },
    {
      id: 3,
      title: "Dark Odyssey Sleeve",
      category: "BLACK & GREY",
      artist: "Arjun Verma",
      description: "Full outer arm sleeve work combining classical myth imagery and smooth grey-wash gradients.",
      image: "/images/portfolio_sleeve_work.jpg",
      sizeClass: "col-span-1 row-span-1 aspect-square",
    },
    {
      id: 4,
      title: "Sacred Geometry Mandala",
      category: "TRADITIONAL",
      artist: "Sahana Rao",
      description: "Pinpoint geometric symmetry and stipple shading forming a balanced centered backpiece.",
      image: "/images/portfolio_geometric_mandala.jpg",
      sizeClass: "col-span-1 row-span-2 aspect-[3/4]",
    },
    {
      id: 5,
      title: "Hyper-Realist Eye",
      category: "REALISM",
      artist: "Rahul Sharma",
      description: "Photorealistic macro eye study capturing iris reflections and tear duct highlights.",
      image: "/images/portfolio_realistic_eye.jpg",
      sizeClass: "col-span-1 row-span-1 aspect-square",
    },
    {
      id: 6,
      title: "Neo Dragon Concept",
      category: "COVER UPS",
      artist: "Arjun Verma",
      description: "Custom heavy-contrast Japanese dragon linework designed to conceal old shoulder script.",
      image: "/images/portfolio_japanese_dragon.jpg",
      sizeClass: "col-span-1 row-span-1 aspect-square",
    },
    {
      id: 7,
      title: "Monarch Butterfly Line",
      category: "FINE LINE",
      artist: "Meera Nair",
      description: "Whisper-thin wing symmetry with delicate dotted flight trailing across the collarbone.",
      image: "/images/portfolio_butterfly_fineline.jpg",
      sizeClass: "col-span-1 row-span-1 aspect-square",
    },
    {
      id: 8,
      title: "Monochrome Portrait",
      category: "BLACK & GREY",
      artist: "Rahul Sharma",
      description: "Cinematic human facial portraiture emphasizing shadow play, depth, and smooth skin tones.",
      image: "/images/portfolio_monochrome_portrait.jpg",
      sizeClass: "col-span-1 row-span-1 aspect-square",
    },
  ];

  const filteredItems = activeFilter === "ALL" 
    ? items 
    : items.filter(item => item.category === activeFilter);

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNextLightbox();
      if (e.key === "ArrowLeft") handlePrevLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const handleNextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const handlePrevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="portfolio" className="bg-brand-off-white py-28 md:py-36 overflow-hidden border-b border-brand-charcoal/5 text-brand-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.45em] text-brand-charcoal/60 uppercase mb-4">
              EDITORIAL GALLERY
            </span>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-brand-black uppercase">
              SELECTED<br />
              <span className="italic font-light text-brand-black">WORKS</span>
            </h2>
          </motion.div>

          {/* Right Category Filter list */}
          <div className="lg:col-span-7 flex flex-wrap gap-2 lg:justify-end">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 font-sans font-semibold cursor-pointer border ${
                  activeFilter === filter.value
                    ? "bg-brand-black text-brand-off-white border-brand-black shadow-md"
                    : "bg-transparent text-brand-charcoal/60 border-brand-charcoal/15 hover:text-brand-black hover:border-brand-black/40"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Asymmetric Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                onClick={() => setLightboxIndex(index)}
                className={`relative overflow-hidden group cursor-pointer bg-brand-black rounded-[3px] border border-brand-black/10 shadow-lg ${item.sizeClass}`}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale brightness-95 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                  loading="lazy"
                />

                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <div className="w-10 h-10 rounded-full border border-brand-off-white/30 flex items-center justify-center text-brand-off-white bg-brand-black/40 backdrop-blur-xs">
                      <Eye size={16} />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-sans text-[9px] tracking-[0.3em] font-semibold text-brand-warm-cream uppercase">
                      {item.category} • BY {item.artist}
                    </span>
                    <h3 className="font-serif text-xl text-brand-off-white uppercase mt-1">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {currentLightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="absolute inset-0 bg-brand-black/95 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="relative z-10 w-full max-w-5xl bg-brand-charcoal border border-brand-off-white/10 rounded-[4px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-brand-black/70 border border-brand-off-white/20 flex items-center justify-center text-brand-off-white hover:text-brand-warm-cream hover:border-brand-warm-cream transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X size={18} />
              </button>

              {/* Left Image Viewport */}
              <div className="lg:col-span-7 bg-brand-black relative flex items-center justify-center min-h-[350px] lg:min-h-[550px] overflow-hidden">
                <img
                  src={currentLightboxItem.image}
                  alt={currentLightboxItem.title}
                  className="w-full h-full object-contain max-h-[70vh]"
                />

                {/* Prev / Next Floating Arrows */}
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevLightbox(); }}
                  className="absolute left-4 w-10 h-10 rounded-full bg-brand-black/60 border border-brand-off-white/20 flex items-center justify-center text-brand-off-white hover:text-brand-warm-cream transition-colors cursor-pointer"
                  aria-label="Previous Work"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNextLightbox(); }}
                  className="absolute right-4 w-10 h-10 rounded-full bg-brand-black/60 border border-brand-off-white/20 flex items-center justify-center text-brand-off-white hover:text-brand-warm-cream transition-colors cursor-pointer"
                  aria-label="Next Work"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Right Content Details */}
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between text-brand-off-white bg-brand-charcoal overflow-y-auto">
                <div className="flex flex-col">
                  <span className="font-sans text-[10px] tracking-[0.4em] text-brand-warm-cream uppercase mb-2 flex items-center gap-1.5">
                    <Sparkles size={12} />
                    {currentLightboxItem.category}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl uppercase text-brand-off-white mb-4">
                    {currentLightboxItem.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-brand-off-white/60 font-sans uppercase tracking-widest pb-6 mb-6 border-b border-brand-off-white/10">
                    <span>Artist:</span>
                    <strong className="text-brand-warm-cream">{currentLightboxItem.artist}</strong>
                  </div>
                  <p className="text-xs md:text-sm text-brand-off-white/75 font-sans leading-relaxed tracking-wide mb-8">
                    {currentLightboxItem.description}
                  </p>
                </div>

                <div className="flex flex-col gap-4 border-t border-brand-off-white/10 pt-6">
                  <a
                    href="#contact"
                    onClick={() => setLightboxIndex(null)}
                    className="w-full py-4 bg-brand-off-white hover:bg-brand-warm-cream text-brand-black font-sans text-xs font-bold tracking-widest uppercase transition-colors text-center cursor-pointer shadow-lg"
                  >
                    Request Similar Tattoo
                  </a>
                  <span className="text-[10px] text-brand-off-white/40 font-sans tracking-widest text-center uppercase">
                    Zeus Tattoo Studio • Koramangala
                  </span>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
