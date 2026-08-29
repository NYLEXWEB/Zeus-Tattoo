"use client";

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#07090d] text-white pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col">
            <a href="#" className="font-sans text-2xl font-extrabold tracking-wider text-white uppercase mb-4 flex items-center gap-2">
              <span className="text-[#e58c38]">ZEUS</span> TATTOO
            </a>
            <p className="text-xs text-gray-400 font-sans leading-relaxed tracking-wide mb-6 max-w-sm">
              Neoclassical body art sanctuary in Kottayam. Dedicated to permanent collectibles, sterile clinical precision, and bespoke custom design.
            </p>
            <span className="text-[10px] tracking-[0.3em] font-sans font-extrabold text-[#e58c38] uppercase">
              EST. 2016 • KOTTAYAM, KERALA
            </span>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-col">
            <h4 className="font-sans text-xs font-extrabold tracking-[0.3em] text-[#e58c38] uppercase mb-4">
              NAVIGATION
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-400 font-sans">
              <li><a href="#about" onClick={(e) => handleLinkClick(e, "#about")} className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#services" onClick={(e) => handleLinkClick(e, "#services")} className="hover:text-white transition-colors">Studio Services</a></li>
              <li><a href="#portfolio" onClick={(e) => handleLinkClick(e, "#portfolio")} className="hover:text-white transition-colors">Selected Works</a></li>
              <li><a href="#artists" onClick={(e) => handleLinkClick(e, "#artists")} className="hover:text-white transition-colors">Resident Artists</a></li>
              <li><a href="#process" onClick={(e) => handleLinkClick(e, "#process")} className="hover:text-white transition-colors">Client Journey</a></li>
            </ul>
          </div>

          {/* Guidelines */}
          <div className="flex flex-col">
            <h4 className="font-sans text-xs font-extrabold tracking-[0.3em] text-[#e58c38] uppercase mb-4">
              GUIDELINES
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-400 font-sans">
              <li><a href="#pricing" onClick={(e) => handleLinkClick(e, "#pricing")} className="hover:text-white transition-colors">Pricing Structure</a></li>
              <li><a href="#aftercare" onClick={(e) => handleLinkClick(e, "#aftercare")} className="hover:text-white transition-colors">Aftercare Healing</a></li>
              <li><a href="#studio" onClick={(e) => handleLinkClick(e, "#studio")} className="hover:text-white transition-colors">Clinical Hygiene</a></li>
              <li><a href="#faq" onClick={(e) => handleLinkClick(e, "#faq")} className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, "#contact")} className="hover:text-white transition-colors">Studio Location</a></li>
            </ul>
          </div>

          {/* Studio Hours */}
          <div className="flex flex-col">
            <h4 className="font-sans text-xs font-extrabold tracking-[0.3em] text-[#e58c38] uppercase mb-4">
              SANCTUARY HOURS
            </h4>
            <div className="flex flex-col gap-2 text-xs text-gray-400 font-sans">
              <span>Tue – Sun: 11:00 AM – 8:30 PM</span>
              <span className="text-[#e58c38]">Monday: Closed (Sterilization)</span>
              <span className="mt-2 text-[10px] text-gray-400 uppercase tracking-widest">Phone: +91 98765 43210</span>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-400 font-sans tracking-widest uppercase">
          <span>© {new Date().getFullYear()} ZEUS TATTOO STUDIO. ALL RIGHTS RESERVED.</span>
          <span className="text-gray-300 italic">"CRAFTED WITH INTENTION. INKED FOR A LIFETIME."</span>
        </div>
      </div>
    </footer>
  );
}
