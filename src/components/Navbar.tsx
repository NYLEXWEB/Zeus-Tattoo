"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, Search } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT", href: "#about" },
    { name: "SERVICES", href: "#services" },
    { name: "ARTISTS", href: "#artists" },
    { name: "GALLERY", href: "#gallery" },
    { name: "TESTIMONIALS", href: "#testimonials" },
    { name: "CONTACT", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0C0D12]/95 backdrop-blur-md py-3 shadow-xl border-b border-white/10"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Zeus Tattoo Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="flex items-center group cursor-pointer"
        >
          <img
            src="/images/zeus_logo_transparent.png"
            alt="Zeus Tattoo Studio"
            className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-display text-sm tracking-widest text-gray-200 hover:text-[#FFA028] transition-colors duration-200 uppercase font-semibold"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA / Call & Book Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:08714131748"
            className="px-4 py-2 border border-white/20 hover:border-[#FFA028] text-gray-200 hover:text-[#FFA028] font-display text-xs font-bold tracking-wider uppercase rounded transition-colors flex items-center gap-1.5"
          >
            <Phone size={13} className="text-[#FFA028]" />
            087141 31748
          </a>
          <button
            onClick={onOpenBooking}
            className="px-5 py-2 bg-[#FFA028] hover:bg-[#E07D00] text-[#0C0D12] font-display text-xs font-bold tracking-widest uppercase rounded shadow-[0_0_15px_rgba(255,160,40,0.3)] transition-all duration-200 cursor-pointer"
          >
            BOOK NOW
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-[#FFA028] transition-colors"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0C0D12]/98 border-b border-white/10 px-6 py-6 flex flex-col gap-4 shadow-2xl backdrop-blur-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-display text-base tracking-widest text-gray-200 hover:text-[#FFA028] py-2 border-b border-white/5 uppercase"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full py-3 mt-2 bg-[#FFA028] text-[#0C0D12] font-display text-sm font-bold tracking-widest uppercase rounded text-center shadow-lg"
          >
            BOOK APPOINTMENT
          </button>
        </div>
      )}
    </header>
  );
}
