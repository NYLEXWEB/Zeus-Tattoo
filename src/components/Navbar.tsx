"use client";

import React, { useState, useEffect } from "react";

interface HeaderProps {
  onOpenBooking?: () => void;
}

export default function Header({ onOpenBooking }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inHero, setInHero] = useState(true);

  useEffect(() => {
    let heroHeight = 450;

    const updateHeroHeight = () => {
      const heroEl = document.getElementById("home");
      heroHeight = heroEl ? heroEl.offsetHeight - 120 : 450;
    };

    const handleScroll = () => {
      if (window.scrollY > heroHeight) {
        setInHero(false);
      } else {
        setInHero(true);
      }
    };

    updateHeroHeight();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateHeroHeight, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeroHeight);
    };
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  const handleBookingClick = (e: React.MouseEvent) => {
    if (onOpenBooking) {
      e.preventDefault();
      onOpenBooking();
      closeMenu();
    }
  };

  return (
    <header className={`site-header ${!inHero ? "hidden-nav" : ""}`}>
      <div className="container header-container">
        <a href="#home" className="logo-area">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo.png"
            alt="Zeus Tattoo Logo"
            className="logo-img"
          />
          <span className="logo-text">Zeus Tattoo</span>
        </a>

        <nav className="nav-menu">
          <a href="#home" className="nav-link">
            Home
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#services" className="nav-link">
            Services
          </a>
          <a href="#artists" className="nav-link">
            Artists
          </a>
          <a href="#gallery" className="nav-link">
            Gallery
          </a>
          <a href="#studio" className="nav-link">
            Studio
          </a>
          <a href="#moments" className="nav-link">
            Moments
          </a>
          <a href="#aftercare" className="nav-link">
            Aftercare
          </a>
          <a href="#booking" className="nav-link">
            Booking
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
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </div>

      <div className={`mobile-nav ${mobileMenuOpen ? "active" : ""}`}>
        <a href="#home" className="nav-link" onClick={closeMenu}>
          Home
        </a>
        <a href="#about" className="nav-link" onClick={closeMenu}>
          About
        </a>
        <a href="#services" className="nav-link" onClick={closeMenu}>
          Services
        </a>
        <a href="#artists" className="nav-link" onClick={closeMenu}>
          Artists
        </a>
        <a href="#gallery" className="nav-link" onClick={closeMenu}>
          Gallery
        </a>
        <a href="#studio" className="nav-link" onClick={closeMenu}>
          Studio
        </a>
        <a href="#moments" className="nav-link" onClick={closeMenu}>
          Moments
        </a>
        <a href="#aftercare" className="nav-link" onClick={closeMenu}>
          Aftercare
        </a>
        <a href="#booking" className="nav-link" onClick={closeMenu}>
          Booking
        </a>
        <a
          href="#booking"
          className="btn-primary"
          style={{ marginTop: "2rem" }}
          onClick={(e) => {
            closeMenu();
            if (onOpenBooking) {
              e.preventDefault();
              onOpenBooking();
            }
          }}
        >
          Book Consultation
        </a>
      </div>
    </header>
  );
}
