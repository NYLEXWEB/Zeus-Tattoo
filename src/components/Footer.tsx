"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="logo-area">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo.png"
              alt="Zeus Tattoo Logo"
              className="logo-img"
            />
            <span className="logo-text">Zeus Tattoo</span>
          </div>
          <p className="footer-brand-text">
            Premier custom body illustration, microblading artistry, and
            precision clinical body piercing. We bring mythology and modern
            craftsmanship to skin in Kottayam, Kerala.
          </p>
          <div className="footer-socials">
            <a
              href="https://www.instagram.com/zeustattooin/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              aria-label="Follow us on Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://share.google/z7MMnqDGhYAFvmWkz"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              aria-label="Find us on Google Maps"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="footer-title">Explore</h4>
          <ul className="footer-links">
            <li>
              <a href="#home" className="footer-link">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="footer-link">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="footer-link">
                Services
              </a>
            </li>
            <li>
              <a href="#artists" className="footer-link">
                Artists
              </a>
            </li>
            <li>
              <a href="#gallery" className="footer-link">
                Gallery
              </a>
            </li>
            <li>
              <a href="#studio" className="footer-link">
                Studio
              </a>
            </li>
            <li>
              <a href="#moments" className="footer-link">
                Moments
              </a>
            </li>
            <li>
              <a href="#aftercare" className="footer-link">
                Aftercare Guidelines
              </a>
            </li>
            <li>
              <a href="#booking" className="footer-link">
                Book Appointment
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Services</h4>
          <ul className="footer-links">
            <li>
              <a href="#services" className="footer-link">
                Bespoke Tattoos
              </a>
            </li>
            <li>
              <a href="#services" className="footer-link">
                Clinical Piercings
              </a>
            </li>
            <li>
              <a href="#services" className="footer-link">
                Microblading Artistry
              </a>
            </li>
            <li>
              <a href="#services" className="footer-link">
                Lip Pigmentation
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Studio Location</h4>
          <div className="footer-text">
            <p style={{ fontWeight: 600, color: "var(--text-main)" }}>
              Zeus Tattoo Kottayam
            </p>
            <p>Eerayil Kadavu Road,</p>
            <p>Near Manorama Junction,</p>
            <p>Kottayam, Kerala 686001</p>
            <p
              style={{
                marginTop: "1rem",
                fontWeight: 600,
                color: "var(--text-main)",
              }}
            >
              Operating Hours
            </p>
            <p>Tue - Sun: 10:30 AM - 08:00 PM</p>
            <p style={{ color: "var(--accent-peach)" }}>Monday: Closed</p>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 Zeus Tattoo. All Rights Reserved.</p>
        <p>
          Designed for excellence •
          <a
            href="https://share.google/z7MMnqDGhYAFvmWkz"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent-peach)", marginLeft: "5px" }}
          >
            Get Directions
          </a>
        </p>
      </div>
    </footer>
  );
}
