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
      sizeClass: "col-span-1 md:col-span-2 row-span-2 aspect-[4/5]",
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
      sizeClass: "col-span-1 md:col-span-2 row-span-2 aspect-[4/5]",
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
    <section id="portfolio" className="bg-[#0b0d12] py-24 md:py-36 overflow-hidden border-b border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col items-start"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-2 flex items-center gap-2">
              <Sparkles size={13} />
              EDITORIAL GALLERY
            </span>
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-white uppercase">
              SELECTED WORKS
            </h2>
            <div className="w-16 h-[3px] bg-gradient-to-r from-[#e58c38] to-[#d97706] mt-3 rounded-full shadow-[0_0_10px_#e58c38]" />
          </motion.div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2.5">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-5 py-2.5 rounded-full text-[10px] tracking-[0.2em] uppercase transition-all duration-300 font-sans font-extrabold cursor-pointer border ${activeFilter === filter.value
                    ? "bg-gradient-to-r from-[#e58c38] to-[#d97706] text-black border-[#e58c38] shadow-[0_0_20px_rgba(229,140,56,0.35)]"
                    : "bg-[#121620] text-gray-300 border-white/10 hover:text-white hover:border-[#e58c38]/40"
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                onClick={() => setLightboxIndex(index)}
                data-cursor="EXPLORE"
                className={`relative overflow-hidden group cursor-pointer bg-[#121620] rounded-2xl border border-white/10 hover:border-[#e58c38]/50 shadow-xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(229,140,56,0.2)] ${item.sizeClass}`}
              >
                {/* Artwork Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                  loading="lazy"
                />

                {/* Dark Amber Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12]/95 via-[#0b0d12]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <div className="w-10 h-10 rounded-full border border-[#e58c38]/50 flex items-center justify-center text-[#e58c38] bg-[#0b0d12]/80 backdrop-blur-xs shadow-[0_0_15px_#e58c38]">
                      <Eye size={18} />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-sans text-[9px] tracking-[0.3em] font-extrabold text-[#e58c38] uppercase">
                      {item.category} • BY {item.artist}
                    </span>
                    <h3 className="font-sans text-xl font-extrabold text-white uppercase mt-1">
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
              className="absolute inset-0 bg-[#0b0d12]/95 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="relative z-10 w-full max-w-5xl bg-[#121620] border border-[#e58c38]/40 rounded-2xl shadow-[0_0_50px_rgba(229,140,56,0.25)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#0b0d12]/80 border border-[#e58c38]/40 flex items-center justify-center text-white hover:text-[#e58c38] transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X size={18} />
              </button>

              {/* Left Viewport */}
              <div className="lg:col-span-7 bg-[#0b0d12] relative flex items-center justify-center min-h-[350px] lg:min-h-[550px] overflow-hidden">
                <img
                  src={currentLightboxItem.image}
                  alt={currentLightboxItem.title}
                  className="w-full h-full object-contain max-h-[70vh]"
                />

                {/* Arrows */}
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevLightbox(); }}
                  className="absolute left-4 w-10 h-10 rounded-full bg-[#0b0d12]/80 border border-white/20 flex items-center justify-center text-white hover:text-[#e58c38] hover:border-[#e58c38] transition-colors cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNextLightbox(); }}
                  className="absolute right-4 w-10 h-10 rounded-full bg-[#0b0d12]/80 border border-white/20 flex items-center justify-center text-white hover:text-[#e58c38] hover:border-[#e58c38] transition-colors cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between text-white bg-[#121620] overflow-y-auto">
                <div className="flex flex-col">
                  <span className="font-sans text-[10px] tracking-[0.4em] text-[#e58c38] uppercase mb-2 flex items-center gap-1.5 font-extrabold">
                    <Sparkles size={12} />
                    {currentLightboxItem.category}
                  </span>
                  <h3 className="font-sans text-3xl md:text-4xl font-extrabold uppercase text-white mb-4">
                    {currentLightboxItem.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-sans uppercase tracking-widest pb-6 mb-6 border-b border-white/10">
                    <span>Master Artist:</span>
                    <strong className="text-[#e58c38]">{currentLightboxItem.artist}</strong>
                  </div>
                  <p className="text-xs md:text-sm text-gray-300 font-sans leading-relaxed tracking-wide mb-8">
                    {currentLightboxItem.description}
                  </p>
                </div>

                <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
                  <a
                    href="#contact"
                    onClick={() => setLightboxIndex(null)}
                    className="w-full py-4 bg-gradient-to-r from-[#e58c38] to-[#d97706] hover:from-[#f39c12] hover:to-[#e67e22] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-all text-center cursor-pointer shadow-[0_0_20px_rgba(229,140,56,0.35)]"
                  >
                    REQUEST SIMILAR CUSTOM WORK
                  </a>
                  <span className="text-[10px] text-gray-400 font-sans tracking-widest text-center uppercase">
                    ZEUS TATTOO STUDIO • BANGALORE
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
