"use client";

import React from "react";
import { motion } from "framer-motion";

interface TornPhotoCollageProps {
  topImage: string;
  bottomImage: string;
}

export default function TornPhotoCollage({ topImage, bottomImage }: TornPhotoCollageProps) {
  return (
    <div className="relative w-full max-w-lg mx-auto h-[380px] sm:h-[450px] md:h-[480px]">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#FFA028]/10 rounded-full blur-[90px] pointer-events-none" />

      {/* 1. Bottom / Back Photo Card (Offset Left & Rotated -4deg) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.03, rotate: -2, zIndex: 30 }}
        className="absolute top-0 left-0 sm:left-4 w-[68%] sm:w-[62%] aspect-[4/5] bg-white p-2.5 sm:p-3 shadow-2xl rounded-xs border border-gray-200 z-10 cursor-pointer group"
      >
        <div className="w-full h-full overflow-hidden relative bg-neutral-900">
          <img
            src={bottomImage}
            alt="Tattoo Atelier Workspace"
            className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
        </div>
        {/* Subtle Vintage Tape Accent on Top Left */}
        <div className="absolute -top-3 left-6 w-14 h-5 bg-[#e8dfd1]/80 backdrop-blur-xs rotate-[-12deg] shadow-sm pointer-events-none border border-black/5" />
      </motion.div>

      {/* 2. Top / Front Photo Card (Offset Right & Rotated +4deg) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: 8 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 4 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.04, rotate: 2, zIndex: 30 }}
        className="absolute bottom-2 sm:bottom-4 right-0 sm:right-4 w-[70%] sm:w-[65%] aspect-[4/5] bg-white p-2.5 sm:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.25)] rounded-xs border border-gray-200 z-20 cursor-pointer group"
      >
        <div className="w-full h-full overflow-hidden relative bg-neutral-900">
          <img
            src={topImage}
            alt="Master Tattoo Artist in Session"
            className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
        </div>
        {/* Subtle Vintage Tape Accent on Top Right */}
        <div className="absolute -top-3 right-8 w-14 h-5 bg-[#e8dfd1]/80 backdrop-blur-xs rotate-[10deg] shadow-sm pointer-events-none border border-black/5" />
      </motion.div>

      {/* Decorative Gold Accent Badge in Corner */}
      <div className="absolute -bottom-2 -left-2 z-25 bg-[#FFA028] text-[#0C0D12] font-display text-[10px] font-bold tracking-widest uppercase px-3 py-1 shadow-lg rounded-xs">
        EST. 2018
      </div>

    </div>
  );
}
