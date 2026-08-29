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
    <section id="artists" className="bg-[#0b0d12] py-24 md:py-36 overflow-hidden border-b border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-xl"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-2 block">
              THE MASTERS BEHIND THE CRAFT
            </span>
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-white uppercase">
              RESIDENT ARTISTS
            </h2>
            <div className="w-12 h-[3px] bg-[#e58c38] mt-3 rounded-full" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-gray-400 font-sans text-xs md:text-sm leading-relaxed tracking-wide max-w-md"
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
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="group flex flex-col bg-[#121620] border border-white/10 rounded-2xl overflow-hidden hover:border-[#e58c38]/40 hover:shadow-[0_0_30px_rgba(229,140,56,0.15)] transition-all duration-500 shadow-xl"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#0b0d12]">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121620] via-transparent to-transparent opacity-80" />
                
                {/* Experience Pill Badge */}
                <span className="absolute top-4 right-4 bg-[#0b0d12]/80 backdrop-blur-xs border border-[#e58c38]/40 text-[#e58c38] text-[9px] tracking-[0.2em] uppercase px-3 py-1 rounded-full font-sans font-extrabold">
                  {artist.experience}
                </span>
              </div>

              {/* Profile Details */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] tracking-[0.3em] font-sans font-extrabold text-[#e58c38] uppercase">
                    {artist.role}
                  </span>
                  <h3 className="font-sans text-2xl font-bold text-white uppercase mt-1 mb-3">
                    {artist.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed tracking-wide mb-6">
                    {artist.bio}
                  </p>
                </div>

                {/* Details Footer */}
                <div className="border-t border-white/10 pt-4 mt-auto flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10px] tracking-wider text-gray-400 font-sans uppercase">
                    <span>Style:</span>
                    <strong className="text-white">{artist.signatureStyle}</strong>
                  </div>

                  <a
                    href={artist.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 flex items-center justify-between text-xs font-sans font-extrabold tracking-widest text-[#e58c38] hover:text-white transition-colors group/link"
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
