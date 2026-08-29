"use client";

import { Sparkles, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0b0d12] text-white pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[250px] bg-[#e58c38]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">

          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col">
            <a href="#home" onClick={(e) => handleLinkClick(e, "#home")} className="font-serif text-2xl font-extrabold tracking-widest text-white uppercase mb-4 flex items-center gap-2 group">
              <span className="text-[#e58c38] group-hover:text-white transition-colors">ZEUS</span> TATTOO
            </a>
            <p className="text-xs text-gray-300 font-sans leading-relaxed tracking-wide mb-6 max-w-sm">
              Neoclassical body art sanctuary in Koramangala, Bangalore. Dedicated to permanent collectibles, sterile clinical precision, and bespoke custom design.
            </p>
            <span className="text-[10px] tracking-[0.35em] font-sans font-extrabold text-[#e58c38] uppercase flex items-center gap-1.5">
              <Sparkles size={12} />
              EST. 2016 • KORAMANGALA, BANGALORE
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col">
            <h4 className="font-sans text-xs font-extrabold tracking-[0.3em] text-[#e58c38] uppercase mb-4">
              SANCTUARY
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-300 font-sans font-medium">
              <li><a href="#about" onClick={(e) => handleLinkClick(e, "#about")} className="hover:text-[#e58c38] transition-colors">Our Story</a></li>
              <li><a href="#services" onClick={(e) => handleLinkClick(e, "#services")} className="hover:text-[#e58c38] transition-colors">Studio Services</a></li>
              <li><a href="#portfolio" onClick={(e) => handleLinkClick(e, "#portfolio")} className="hover:text-[#e58c38] transition-colors">Selected Works</a></li>
              <li><a href="#piercing" onClick={(e) => handleLinkClick(e, "#piercing")} className="hover:text-[#e58c38] transition-colors">Piercing Sanctuary</a></li>
              <li><a href="#artists" onClick={(e) => handleLinkClick(e, "#artists")} className="hover:text-[#e58c38] transition-colors">Resident Artists</a></li>
            </ul>
          </div>

          {/* Guidelines Links */}
          <div className="flex flex-col">
            <h4 className="font-sans text-xs font-extrabold tracking-[0.3em] text-[#e58c38] uppercase mb-4">
              GUIDELINES
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-300 font-sans font-medium">
              <li><a href="#hygiene" onClick={(e) => handleLinkClick(e, "#hygiene")} className="hover:text-[#e58c38] transition-colors">Clinical Hygiene</a></li>
              <li><a href="#process" onClick={(e) => handleLinkClick(e, "#process")} className="hover:text-[#e58c38] transition-colors">3-Step Process</a></li>
              <li><a href="#aftercare" onClick={(e) => handleLinkClick(e, "#aftercare")} className="hover:text-[#e58c38] transition-colors">Healing Aftercare</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, "#contact")} className="hover:text-[#e58c38] transition-colors">Studio Location</a></li>
            </ul>
          </div>

          {/* Hours & Contact */}
          <div className="flex flex-col">
            <h4 className="font-sans text-xs font-extrabold tracking-[0.3em] text-[#e58c38] uppercase mb-4">
              SANCTUARY HOURS
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-gray-300 font-sans">
              <span>Tue – Sun: 11:00 AM – 8:30 PM</span>
              <span className="text-[#e58c38] font-bold">Monday: Closed (Sterilization)</span>
              <div className="mt-3 flex flex-col gap-1.5 text-[11px] text-gray-400">
                <span className="flex items-center gap-2"><MapPin size={13} className="text-[#e58c38]" /> Koramangala 5th Block, Bangalore</span>
                <span className="flex items-center gap-2"><Phone size={13} className="text-[#e58c38]" /> +91 98765 43210</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-400 font-sans tracking-widest uppercase font-semibold">
          <span>© {new Date().getFullYear()} ZEUS TATTOO STUDIO. ALL RIGHTS RESERVED.</span>
          <span className="text-[#e58c38] italic font-serif text-sm">"CRAFTED WITH INTENTION. INKED FOR A LIFETIME."</span>
        </div>
      </div>
    </footer>
  );
}
