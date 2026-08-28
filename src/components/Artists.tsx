"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Artist {
  name: string;
  role: string;
  experience: string;
  specialization: string;
  signatureStyle: string;
  bio: string;
  image: string;
  instagram: string;
}

export default function Artists() {
  const artists: Artist[] = [
    {
      name: "Rahul Sharma",
      role: "Founder & Master Realism Artist",
      experience: "10+ Years",
      specialization: "Photorealism & Portraiture",
      signatureStyle: "Hyper-Contrast Realism",
      bio: "Internationally acclaimed artist known for capturing lifelike human portraits and wildlife depth with anatomical accuracy.",
      image: "/images/artist_arjun.jpg",
      instagram: "https://instagram.com/zeustattoo",
    },
    {
      name: "Meera Nair",
      role: "Fine Line & Micro Specialist",
      experience: "7+ Years",
      specialization: "Single-Needle Botanicals & Micro-Realism",
      signatureStyle: "Whisper Linework",
      bio: "Master of delicate single-needle techniques, combining organic floral movement with surgical linework precision.",
      image: "/images/artist_meera.jpg",
      instagram: "https://instagram.com/zeustattoo",
    },
    {
      name: "Arjun Verma",
      role: "Black & Grey Sleeve Master",
      experience: "9+ Years",
      specialization: "Mythological & Custom Sleeves",
      signatureStyle: "Obsidian Gradient Wash",
      bio: "Specializes in multi-session arm & leg sleeves blending classical Greek mythology, dark surrealism, and dramatic contrast.",
      image: "/images/artist_rahul.jpg",
      instagram: "https://instagram.com/zeustattoo",
    },
    {
      name: "Sahana Rao",
      role: "Custom & Cover-Up Artist",
      experience: "8+ Years",
      specialization: "Sacred Geometry & Cover-Ups",
      signatureStyle: "Dotwork & Stipple Symmetry",
      bio: "Expert in complex cover-up re-imagining and geometric dotwork precision tailored specifically for body contours.",
      image: "/images/artist_sahana.jpg",
      instagram: "https://instagram.com/zeustattoo",
    },
  ];

  return (
    <section id="artists" className="bg-brand-black py-28 md:py-36 overflow-hidden border-b border-brand-off-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-xl"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.45em] text-brand-warm-cream uppercase mb-4 block">
              THE MASTERS BEHIND THE CRAFT
            </span>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-brand-off-white uppercase">
              RESIDENT<br />
              <span className="italic font-light text-brand-warm-cream">ARTISTS</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="text-brand-off-white/70 font-sans text-xs md:text-sm leading-relaxed tracking-wide max-w-md"
          >
            Our resident artists bring decades of collective artistic mastery, specializing in distinct genres to deliver unrivaled skin artwork.
          </motion.p>
        </div>

        {/* Artist Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="group flex flex-col bg-brand-charcoal border border-brand-off-white/10 rounded-[3px] overflow-hidden hover:border-brand-warm-cream/40 transition-all duration-500 shadow-xl"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] overflow-hidden bg-brand-black">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent opacity-80" />
                
                {/* Experience Badge */}
                <span className="absolute top-4 right-4 bg-brand-black/80 backdrop-blur-xs border border-brand-off-white/20 text-brand-warm-cream text-[9px] tracking-[0.2em] uppercase px-3 py-1 font-sans">
                  {artist.experience}
                </span>
              </div>

              {/* Profile Copy */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] tracking-[0.3em] text-brand-warm-cream uppercase font-sans font-semibold">
                    {artist.role}
                  </span>
                  <h3 className="font-serif text-2xl text-brand-off-white uppercase mt-1 mb-3">
                    {artist.name}
                  </h3>
                  <p className="text-xs text-brand-off-white/60 font-sans leading-relaxed tracking-wide mb-6">
                    {artist.bio}
                  </p>
                </div>

                {/* Details Footer */}
                <div className="border-t border-brand-off-white/10 pt-4 mt-auto flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10px] tracking-wider text-brand-off-white/50 font-sans uppercase">
                    <span>Style:</span>
                    <strong className="text-brand-off-white">{artist.signatureStyle}</strong>
                  </div>

                  <a
                    href={artist.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 flex items-center justify-between text-xs font-sans font-semibold tracking-widest text-brand-warm-cream hover:text-brand-off-white transition-colors group/link"
                  >
                    <span className="flex items-center gap-1.5 uppercase text-[10px]">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      @zeustattoo
                    </span>
                    <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
