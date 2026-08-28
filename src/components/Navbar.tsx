"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

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
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#portfolio" },
    { name: "Studio", href: "#studio" },
    { name: "Process", href: "#process" },
    { name: "Aftercare", href: "#aftercare" },
    { name: "Contact", href: "#contact" },
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-brand-black/85 backdrop-blur-md border-b border-brand-warm-cream/10 py-4 shadow-2xl"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group"
            onClick={(e) => handleLinkClick(e, "#home")}
          >
            <div className="relative w-9 h-9 flex items-center justify-center border border-brand-warm-cream/40 group-hover:border-brand-warm-cream bg-brand-black/40 transition-all duration-300">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-brand-off-white group-hover:text-brand-warm-cream transition-colors duration-300"
              >
                <path d="M12 2L4 10H20L12 2Z" />
                <path d="M12 22L4 14H20L12 22Z" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg tracking-[0.2em] font-semibold text-brand-off-white group-hover:text-brand-warm-cream transition-colors duration-300 uppercase">
                ZEUS
              </span>
              <span className="text-[8px] tracking-[0.4em] text-brand-warm-cream/70 font-sans uppercase mt-0.5">
                Tattoo Studio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans text-[11px] font-semibold tracking-[0.18em] text-brand-off-white/70 hover:text-brand-warm-cream uppercase transition-colors duration-300 relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-warm-cream transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={onOpenBooking}
              className="group px-5 py-2.5 bg-brand-off-white hover:bg-brand-warm-cream text-brand-black font-sans text-[11px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-lg hover:shadow-brand-warm-cream/10"
            >
              Book Appointment
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-brand-off-white hover:text-brand-warm-cream transition-colors p-2 cursor-pointer border border-brand-off-white/10"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-50 bg-brand-black flex flex-col justify-between p-8 pt-24"
          >
            {/* Top Close Row */}
            <div className="flex items-center justify-between border-b border-brand-off-white/10 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center border border-brand-warm-cream/40">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M12 2L4 10H20L12 2Z" />
                    <path d="M12 22L4 14H20L12 22Z" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                  </svg>
                </div>
                <span className="font-serif text-lg tracking-[0.2em] font-semibold text-brand-off-white uppercase">
                  ZEUS TATTOO
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-brand-off-white hover:text-brand-warm-cream cursor-pointer border border-brand-off-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Links Stack */}
            <div className="flex flex-col gap-5 items-center justify-center flex-1 py-8">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.4 }}
                  className="font-serif text-2xl md:text-3xl tracking-[0.15em] text-brand-off-white hover:text-brand-warm-cream uppercase transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Bottom Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col gap-4 items-center border-t border-brand-off-white/10 pt-6"
            >
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-4 bg-brand-off-white hover:bg-brand-warm-cream text-brand-black font-sans text-xs font-bold tracking-widest uppercase transition-colors text-center cursor-pointer flex items-center justify-center gap-2"
              >
                Book Appointment
                <ArrowRight size={12} />
              </button>
              <span className="text-[10px] tracking-widest text-brand-off-white/40 font-sans uppercase">
                BANGALORE, KORAMANGALA 5TH BLOCK
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
