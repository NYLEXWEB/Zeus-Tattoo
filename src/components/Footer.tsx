"use client";

import { Star, MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0C0D12] text-white pt-16 pb-12 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        {/* Center Golden Logo */}
        <button
          onClick={scrollToTop}
          className="mb-6 group cursor-pointer flex flex-col items-center"
        >
          <img
            src="/images/zeus_logo_transparent.png"
            alt="Zeus Tattoo Studio Kottayam"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </button>

        {/* Rating Badge */}
        <div className="flex items-center gap-2 mb-8 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
          <div className="flex text-[#FFA028]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className="fill-[#FFA028]" />
            ))}
          </div>
          <span className="text-xs text-gray-300 font-sans font-medium">
            5.0 Rated (210 Google Reviews) • Kottayam, Kerala
          </span>
        </div>

        {/* Quick Studio Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left max-w-4xl w-full mb-10 py-6 border-y border-white/10 text-xs text-gray-300 font-sans">
          
          {/* Address */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-[#FFA028] font-display font-bold uppercase tracking-wider flex items-center gap-1.5">
              <MapPin size={13} />
              STUDIO LOCATION
            </span>
            <p className="text-gray-400 leading-relaxed">
              2nd floor, Manorama Junction, roji&apos;s arch, Erayilkadavu Rd, Eerayil Kadavu, Kottayam, Kerala 686001
            </p>
          </div>

          {/* Contact & Hours */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-[#FFA028] font-display font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Phone size={13} />
              DIRECT CONTACT
            </span>
            <a href="tel:08714131748" className="text-white hover:text-[#FFA028] transition-colors font-bold">
              087141 31748
            </a>
            <a href="https://zeustattoo.in/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
              zeustattoo.in
            </a>
          </div>

          {/* Clinical Hours */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-[#FFA028] font-display font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Clock size={13} />
              HOURS & STERILIZATION
            </span>
            <p className="text-gray-400">Open Daily · Closes 8:00 PM</p>
            <p className="text-gray-500 text-[11px]">Walk-ins & Consultations Welcome</p>
          </div>

        </div>

        {/* Bottom Bar: Copyright on Left, Social Icons on Right */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-gray-400 font-sans">
          <p className="text-center sm:text-left">
            Copyright © {new Date().getFullYear()} Zeus Tattoo Kottayam. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded border border-white/20 hover:border-[#FFA028] text-gray-300 hover:text-[#FFA028] flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded border border-white/20 hover:border-[#FFA028] text-gray-300 hover:text-[#FFA028] flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="w-8 h-8 rounded border border-white/20 hover:border-[#FFA028] text-gray-300 hover:text-[#FFA028] flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 rounded border border-white/20 hover:border-[#FFA028] text-gray-300 hover:text-[#FFA028] flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
