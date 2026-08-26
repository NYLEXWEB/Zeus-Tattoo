"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Artist {
  id: number;
  name: string;
  specialty: string;
  image: string;
}

export default function Artists() {
  const artists: Artist[] = [
    {
      id: 1,
      name: "Arjun",
      specialty: "Realism / Black & Grey",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Meera",
      specialty: "Fine Line / Minimalist",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Rahul",
      specialty: "Japanese / Neo-Traditional",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Sahana",
      specialty: "Geometric / Custom",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const handleScrollToPortfolio = () => {
    const portfolioSection = document.querySelector("#portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="artists" className="bg-brand-black py-24 md:py-32 overflow-hidden border-b border-brand-off-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-xl"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.4em] text-brand-warm-cream uppercase mb-4 block">
              Our Artists
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-brand-off-white uppercase">
              Meet the
              <br />
              <span className="italic font-light text-brand-warm-cream">Creative Minds</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="text-brand-off-white/70 font-sans text-sm md:text-base leading-relaxed tracking-wide max-w-sm"
          >
            Each artist brings a unique style, perspective and passion to the studio. Find the one who matches your vision.
          </motion.p>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.25, 1, 0.5, 1] }}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col bg-brand-charcoal overflow-hidden border border-brand-off-white/5"
            >
              {/* Aspect-Ratio Box for portrait image */}
              <div className="aspect-[3/4] overflow-hidden relative bg-brand-black">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-102 group-hover:brightness-100 transition-all duration-700"
                  loading="lazy"
                />

                {/* Overlay details appearing on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* View Portfolio Hover Action overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <button
                    onClick={handleScrollToPortfolio}
                    className="px-5 py-2.5 bg-brand-off-white text-brand-black font-sans text-[10px] font-bold tracking-widest uppercase hover:bg-brand-warm-cream transition-colors duration-300 flex items-center gap-1.5 cursor-pointer shadow-lg"
                  >
                    View Portfolio
                    <ArrowRight size={10} />
                  </button>
                </div>
              </div>

              {/* Name & Specialty */}
              <div className="p-6 flex flex-col border-t border-brand-off-white/5 relative z-10 bg-brand-charcoal">
                <h3 className="font-serif text-xl text-brand-off-white font-medium uppercase tracking-wide">
                  {artist.name}
                </h3>
                <span className="text-[10px] tracking-widest text-brand-warm-cream/80 font-sans uppercase mt-1">
                  {artist.specialty}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Artists Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <button
            onClick={handleScrollToPortfolio}
            className="group px-8 py-3.5 border border-brand-off-white/10 hover:border-brand-warm-cream text-brand-off-white hover:text-brand-warm-cream font-sans text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            View All Artists
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
