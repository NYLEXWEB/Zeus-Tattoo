"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isFaqPage, setIsFaqPage] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsFaqPage(window.location.pathname === "/faq");
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (window.location.pathname === "/faq") {
        setActiveSection("faq");
        return;
      }

      const sections = ["home", "about", "services", "portfolio", "aftercare", "piercing", "artists", "hygiene", "process", "testimonials", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Sanctuary", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#portfolio" },
    { name: "Aftercare", href: "#aftercare" },
    { name: "Piercing", href: "#piercing" },
    { name: "Artists", href: "#artists" },
    { name: "Hygiene", href: "#hygiene" },
    { name: "Process", href: "#process" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);

    if (href === "/faq") {
      if (typeof window !== "undefined" && window.location.pathname === "/faq") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // Anchor links starting with #
    if (href.startsWith("#")) {
      e.preventDefault();
      if (typeof window !== "undefined" && window.location.pathname !== "/") {
        window.location.href = "/" + href;
        return;
      }

      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${isScrolled
          ? "bg-[#0b0d12]/85 backdrop-blur-xl border-b border-[#e58c38]/15 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Logo Mark & Title */}
          <a
            href="/#home"
            className="flex items-center gap-3.5 group"
            onClick={(e) => handleLinkClick(e, "#home")}
          >
            <div className="relative w-10 h-10 flex items-center justify-center border border-[#e58c38]/40 group-hover:border-[#e58c38] bg-[#121620]/60 backdrop-blur-xs transition-all duration-500 rounded-sm shadow-[0_0_15px_rgba(229,140,56,0.1)] group-hover:shadow-[0_0_20px_rgba(229,140,56,0.3)]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-[#e58c38] transition-transform duration-500 group-hover:scale-110"
              >
                <path d="M12 2L4 10H20L12 2Z" />
                <path d="M12 22L4 14H20L12 22Z" />
                <circle cx="12" cy="12" r="2" fill="#e58c38" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-xl tracking-[0.25em] font-semibold text-white group-hover:text-[#e58c38] transition-colors duration-300 uppercase">
                ZEUS
              </span>
              <span className="text-[8px] tracking-[0.45em] text-[#e58c38]/80 font-sans uppercase mt-1">
                TATTOO STUDIO
              </span>
            </div>
          </a>

          {/* Desktop Links Stack */}
          <div className="hidden xl:flex items-center gap-5 bg-[#121620]/40 backdrop-blur-md px-6 py-2 border border-white/5 rounded-full shadow-lg">
            {navLinks.map((link) => {
              const isFaqLink = link.href === "/faq";
              const sectionId = link.href.replace("#", "");
              const isActive = isFaqPage ? isFaqLink : activeSection === sectionId;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`font-sans text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-300 relative py-1 px-1.5 ${isActive ? "text-[#e58c38]" : "text-gray-300 hover:text-white"
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#e58c38] to-[#f39c12] rounded-full shadow-[0_0_8px_#e58c38]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Action Trigger */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="group px-6 py-3 bg-gradient-to-r from-[#e58c38] to-[#d97706] hover:from-[#f39c12] hover:to-[#e67e22] text-black font-sans text-[11px] font-extrabold tracking-[0.2em] uppercase rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(229,140,56,0.25)] hover:shadow-[0_0_30px_rgba(229,140,56,0.5)]"
            >
              <Sparkles size={13} className="text-black" />
              BOOK SESSION
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2.5 text-white hover:text-[#e58c38] transition-colors cursor-pointer border border-[#e58c38]/30 rounded-lg bg-[#121620]/60 backdrop-blur-xs"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={22} className="text-[#e58c38]" /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 90% 10%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 90% 10%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 90% 10%)" }}
            transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-50 bg-[#0b0d12] flex flex-col justify-between p-8 pt-24 border-b border-[#e58c38]/20"
          >
            {/* Header Close Row */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center border border-[#e58c38]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e58c38" strokeWidth="1.5">
                    <path d="M12 2L4 10H20L12 2Z" />
                    <path d="M12 22L4 14H20L12 22Z" />
                    <circle cx="12" cy="12" r="2" fill="#e58c38" />
                  </svg>
                </div>
                <span className="font-serif text-xl tracking-[0.2em] font-semibold text-white uppercase">
                  ZEUS TATTOO
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#e58c38] border border-[#e58c38]/40 rounded-md"
              >
                <X size={22} />
              </button>
            </div>

            {/* Links Stack */}
            <div className="flex flex-col gap-4 items-center justify-center flex-1 py-8 overflow-y-auto">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 + 0.1, duration: 0.4 }}
                  className="font-serif text-2xl sm:text-3xl tracking-[0.18em] text-gray-200 hover:text-[#e58c38] uppercase transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Bottom Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4 items-center border-t border-white/10 pt-6"
            >
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-4 bg-gradient-to-r from-[#e58c38] to-[#d97706] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-all text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(229,140,56,0.35)]"
              >
                BOOK CONSULTATION
                <ArrowRight size={14} />
              </button>
              <span className="text-[10px] tracking-[0.25em] text-gray-400 font-sans uppercase">
                BANGALORE • KORAMANGALA 5TH BLOCK
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
