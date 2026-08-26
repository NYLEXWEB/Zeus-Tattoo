"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isInHero, setIsInHero] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById("home");
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        // The hero element is in view as long as its bottom boundary is greater than 80px (navbar height)
        setIsInHero(rect.bottom > 80);
      } else {
        // Fallback to 500vh (5 * viewport height)
        setIsInHero(window.scrollY < window.innerHeight * 5 - 80);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Artists", href: "#artists" },
    { name: "Styles", href: "#styles" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Pricing", href: "#pricing" },
    { name: "Aftercare", href: "#aftercare" },
    { name: "FAQ", href: "#faq" },
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
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isInHero ? 0 : -100,
          opacity: isInHero ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent py-6 ${
          isInHero ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group" onClick={(e) => handleLinkClick(e, "#home")}>
            <div className="relative w-8 h-8 flex items-center justify-center border border-brand-off-white/40 group-hover:border-brand-warm-cream transition-colors duration-300">
              {/* Minimal SVG Logo Mark */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
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
              <span className="text-[8px] tracking-[0.4em] text-brand-off-white/60 font-sans uppercase mt-0.5">
                Tattoo Studio
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans text-xs tracking-widest text-brand-off-white/70 hover:text-brand-warm-cream uppercase transition-colors duration-300 relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-warm-cream transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Book Now Button (Desktop) */}
          <div className="hidden lg:block">
            <button
              onClick={onOpenBooking}
              className="px-6 py-2.5 bg-brand-off-white hover:bg-brand-warm-cream text-brand-black font-sans text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-brand-warm-cream/10 cursor-pointer"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-brand-off-white hover:text-brand-warm-cream transition-colors p-1 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-brand-black flex flex-col justify-between p-8 pt-28 lg:hidden"
          >
            <div className="flex flex-col gap-6 items-center justify-center flex-1">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="font-serif text-3xl tracking-widest text-brand-off-white hover:text-brand-warm-cream uppercase transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-4 items-center"
            >
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full max-w-xs py-4 bg-brand-off-white hover:bg-brand-warm-cream text-brand-black font-sans text-sm font-semibold tracking-widest uppercase transition-colors text-center cursor-pointer"
              >
                Book Now
              </button>
              <span className="text-[10px] tracking-widest text-brand-off-white/40 font-sans uppercase">
                © 2026 ZEUS TATTOO STUDIO
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
