"use client";

import React, { useState, useEffect } from "react";

interface HeaderProps {
  onOpenBooking?: () => void;
}

export default function Header({ onOpenBooking }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const checkScroll = (y?: number) => {
      const scrollPos = typeof y === "number" ? y : window.scrollY;
      setIsScrolled(scrollPos > 15);

      const heroEl = document.querySelector("#home");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // Hide past hero when bottom of hero reaches top header zone (80px)
        setIsPastHero(rect.bottom <= 80);
      } else {
        setIsPastHero(scrollPos > window.innerHeight);
      }
    };

    checkScroll();

    const handleScroll = () => checkScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Also sync with Lenis if initialized
    let cleanupLenis: (() => void) | undefined;
    const bindLenis = () => {
      if ((window as any).__lenis) {
        const onLenisScroll = ({ scroll }: { scroll: number }) => checkScroll(scroll);
        (window as any).__lenis.on("scroll", onLenisScroll);
        cleanupLenis = () => {
          (window as any).__lenis?.off("scroll", onLenisScroll);
        };
      }
    };
    bindLenis();
    const lenisTimer = setTimeout(bindLenis, 400);

    // Escape key listener to close mobile menu
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(lenisTimer);
      if (cleanupLenis) cleanupLenis();
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    closeMenu();

    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetEl as HTMLElement, {
        offset: -80,
        duration: 0.9,
      });
    } else {
      const top = targetEl.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleBookingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      const bookingEl = document.querySelector("#booking");
      if (bookingEl) {
        if (window.__lenis) {
          window.__lenis.scrollTo(bookingEl as HTMLElement, {
            offset: -80,
            duration: 0.9,
          });
        } else {
          const top = bookingEl.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <header
      className={`site-header ${isPastHero ? "header-past-hero" : "header-in-hero"} ${isScrolled ? "scrolled" : "at-top"
        }`}
    >
      <div className="container header-container">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="logo-area"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo.png"
            alt="Zeus Tattoo Logo"
            className="logo-img"
          />
          <span className="logo-text">Zeus Tattoo</span>
        </a>

        <nav className="nav-menu">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="nav-link"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, "#about")}
            className="nav-link"
          >
            About
          </a>
          <a
            href="#services"
            onClick={(e) => handleNavClick(e, "#services")}
            className="nav-link"
          >
            Services
          </a>
          <a
            href="#artists"
            onClick={(e) => handleNavClick(e, "#artists")}
            className="nav-link"
          >
            Artists
          </a>
          <a
            href="#gallery"
            onClick={(e) => handleNavClick(e, "#gallery")}
            className="nav-link"
          >
            Gallery
          </a>
          <a
            href="#studio"
            onClick={(e) => handleNavClick(e, "#studio")}
            className="nav-link"
          >
            Studio
          </a>
        </nav>

        <div className="header-cta">
          <a
            href="#booking"
            onClick={handleBookingClick}
            className="btn-primary header-cta-btn"
          >
            Book Free Consultation
          </a>
        </div>

        <button
          className="hamburger-btn"
          onClick={toggleMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>
      </div>

      {/* Full-screen Mobile Navigation Drawer */}
      <div
        className={`mobile-nav ${mobileMenuOpen ? "active" : ""}`}
        aria-hidden={!mobileMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        {/* Mobile Drawer Top Bar with Brand & Close Button */}
        <div className="mobile-nav-topbar">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="mobile-brand-link"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo.png"
              alt="Zeus Tattoo Logo"
              className="mobile-brand-img"
            />
            <span className="mobile-brand-name">Zeus Tattoo</span>
          </a>

          <button
            className="mobile-close-btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mobile-nav-inner">
          <a
            href="#home"
            className="mobile-nav-link"
            onClick={(e) => handleNavClick(e, "#home")}
          >
            Home
          </a>
          <a
            href="#about"
            className="mobile-nav-link"
            onClick={(e) => handleNavClick(e, "#about")}
          >
            About
          </a>
          <a
            href="#services"
            className="mobile-nav-link"
            onClick={(e) => handleNavClick(e, "#services")}
          >
            Services
          </a>
          <a
            href="#artists"
            className="mobile-nav-link"
            onClick={(e) => handleNavClick(e, "#artists")}
          >
            Artists
          </a>
          <a
            href="#gallery"
            className="mobile-nav-link"
            onClick={(e) => handleNavClick(e, "#gallery")}
          >
            Gallery
          </a>
          <a
            href="#studio"
            className="mobile-nav-link"
            onClick={(e) => handleNavClick(e, "#studio")}
          >
            Studio
          </a>

          <a
            href="#booking"
            className="btn-primary mobile-cta-btn"
            onClick={handleBookingClick}
          >
            Book Free Consultation
          </a>
        </div>
      </div>
    </header>
  );
}
