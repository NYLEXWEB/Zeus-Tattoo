"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, MapPin, Sparkles, Clock, Compass } from "lucide-react";

export default function Footer() {
  const [istTime, setIstTime] = useState<string>("");
  const [isOpenToday, setIsOpenToday] = useState<boolean>(true);

  // Live Kerala/IST Clock & Studio Open Status
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format IST Time
      const timeStr = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setIstTime(timeStr);

      // Check day of week in IST (Monday is closed)
      const dayStr = now.toLocaleDateString("en-US", {
        timeZone: "Asia/Kolkata",
        weekday: "short",
      });
      setIsOpenToday(dayStr !== "Mon");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      {/* Top Animated Laser Beam Divider */}
      <div className="footer-laser-track" aria-hidden="true">
        <div className="footer-laser-beam" />
      </div>

      {/* Ambient background glow */}
      <div className="footer-ambient-glow" aria-hidden="true" />

      <div className="container footer-content-wrap">
        <div className="footer-grid">
          {/* Brand & Studio Philosophy Column */}
          <div className="footer-brand-col">
            <div className="brand-header">
              <div className="logo-halo-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/logo.png"
                  alt="Zeus Tattoo Logo"
                  className="brand-logo-img"
                />
                <span className="logo-halo" />
              </div>
              <span className="logo-text">Zeus Tattoo</span>
            </div>

            <p className="brand-narrative">
              Premier custom body illustration, microblading artistry, and
              hospital-grade clinical body piercing. We bring Greek mythology, sacred
              geometry, and modern fine-line mastery to skin in Kottayam, Kerala.
            </p>



            {/* Social & Fast Track Channels */}
            <div className="socials-container">
              <a
                href="https://www.instagram.com/zeustattooin/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn instagram-btn"
                aria-label="Follow Zeus Tattoo on Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
                <span>@zeustattooin</span>
              </a>

              <a
                href="https://share.google/z7MMnqDGhYAFvmWkz"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn maps-btn"
                aria-label="View Zeus Tattoo on Google Maps"
              >
                <MapPin size={16} />
                <span>Google Maps</span>
              </a>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="footer-links-col">
            <h4 className="column-title">
              <span className="title-bullet">✦</span> Explore
            </h4>
            <ul className="links-list">
              <li>
                <a href="#home" className="styled-link">
                  <span className="link-arrow">→</span>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#about" className="styled-link">
                  <span className="link-arrow">→</span>
                  <span>Our Story</span>
                </a>
              </li>
              <li>
                <a href="#services" className="styled-link">
                  <span className="link-arrow">→</span>
                  <span>Disciplines</span>
                </a>
              </li>
              <li>
                <a href="#artists" className="styled-link">
                  <span className="link-arrow">→</span>
                  <span>Resident Artists</span>
                </a>
              </li>
              <li>
                <a href="#gallery" className="styled-link">
                  <span className="link-arrow">→</span>
                  <span>Portfolio Works</span>
                </a>
              </li>
              <li>
                <a href="#studio" className="styled-link">
                  <span className="link-arrow">→</span>
                  <span>The Space</span>
                </a>
              </li>
              <li>
                <a href="#moments" className="styled-link">
                  <span className="link-arrow">→</span>
                  <span>Studio Moments</span>
                </a>
              </li>

            </ul>
          </div>

          {/* Disciplines Column */}
          <div className="footer-links-col">
            <h4 className="column-title">
              <span className="title-bullet">✦</span> Disciplines
            </h4>
            <ul className="links-list">
              <li>
                <a href="#services" className="styled-link">
                  <span className="link-arrow">→</span>
                  <span>Bespoke Mythological Ink</span>
                </a>
              </li>
              <li>
                <a href="#services" className="styled-link">
                  <span className="link-arrow">→</span>
                  <span>Sacred Geometry &amp; Fine-Line</span>
                </a>
              </li>
              <li>
                <a href="#services" className="styled-link">
                  <span className="link-arrow">→</span>
                  <span>Clinical Body Piercing</span>
                </a>
              </li>
              <li>
                <a href="#services" className="styled-link">
                  <span className="link-arrow">→</span>
                  <span>Microblading Eyebrows</span>
                </a>
              </li>
              <li>
                <a href="#services" className="styled-link">
                  <span className="link-arrow">→</span>
                  <span>Lip Pigmentation Art</span>
                </a>
              </li>
              <li>
                <a href="#booking" className="styled-link highlight-link">
                  <span className="link-arrow">→</span>
                  <span>Request Consultation</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Atelier Location & Hours Column */}
          <div className="footer-location-col">
            <h4 className="column-title">
              <span className="title-bullet">✦</span> The Sanctuary
            </h4>

            <div className="location-card">
              <p className="studio-name">Zeus Tattoo Kottayam</p>
              <address className="studio-address">
                Eerayil Kadavu Road,<br />
                Near Malayala Manorama Junction,<br />
                Kottayam, Kerala 686001
              </address>

              <div className="hours-divider" />

              <div className="hours-block">
                <span className="hours-label">Sanctuary Hours</span>
                <p className="hours-line">Tue – Sun: 10:30 AM – 08:00 PM</p>
                <p className="hours-closed">Monday: By Appointment Only</p>
              </div>

             
            </div>
          </div>
        </div>

        {/* Archival Monogram Watermark */}
        <div className="archival-watermark" aria-hidden="true">
          ZEUS TATTO
        </div>

        {/* Footer Bottom Bar with Back to Top */}
        <div className="footer-bottom-bar">
          <div className="copyright-info">
            <p className="copy-line">
              © {new Date().getFullYear()} Zeus Tattoo Sanctuary. All Rights Reserved.
            </p>
            <p className="provenance-line">
              Neoclassical Illustration • Hospital-Grade Clinical Sterility • Kottayam
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="back-to-top-btn"
            aria-label="Back to Sanctuary Top"
          >
            <span>Return to Top</span>
            <div className="arrow-circle">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          background-color: var(--bg-storm-medium);
          position: relative;
          padding: 5rem 0 2rem;
          overflow: hidden;
        }

        /* Top Running Laser Beam Divider */
        .footer-laser-track {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(255, 168, 82, 0.12);
          overflow: hidden;
        }
        .footer-laser-beam {
          position: absolute;
          top: 0;
          left: -35%;
          width: 35%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            var(--accent-peach),
            #ffffff,
            var(--accent-peach),
            transparent
          );
          box-shadow: 0 0 10px var(--accent-peach);
          animation: laserTravelFooter 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes laserTravelFooter {
          0% {
            left: -35%;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        /* Ambient Glow in background */
        .footer-ambient-glow {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 350px;
          background: radial-gradient(
            ellipse at bottom,
            rgba(255, 168, 82, 0.06) 0%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
        }

        .footer-content-wrap {
          position: relative;
          z-index: 1;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.35fr;
          gap: 3.5rem;
          margin-bottom: 3.5rem;
        }

        @media (max-width: 1200px) {
          .footer-grid {
            grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
            gap: 2.5rem;
          }
        }
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        /* Brand Column */
        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        .brand-header {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }

        .logo-halo-wrap {
          position: relative;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          position: relative;
          z-index: 2;
        }

        .logo-halo {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 168, 82, 0.3) 0%, transparent 70%);
          animation: haloPulse 4s ease-in-out infinite alternate;
        }

        @keyframes haloPulse {
          0% { transform: scale(0.9); opacity: 0.4; }
          100% { transform: scale(1.3); opacity: 0.9; }
        }

        .brand-logo-name {
          font-family: var(--font-headings);
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-main);
        }

        .brand-narrative {
          font-family: var(--font-desc);
          color: var(--text-muted);
          font-size: 0.88rem;
          line-height: 1.7;
        }

        /* Live Status & Clock Card */
        .sanctuary-status-card {
          background: rgba(7, 9, 14, 0.6);
          border: 1px solid rgba(255, 168, 82, 0.18);
          border-radius: 12px;
          padding: 0.85rem 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .status-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-desc);
          font-size: 0.72rem;
        }

        .status-pill {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          position: relative;
        }
        .status-dot.is-open {
          background: #4ade80;
          box-shadow: 0 0 8px #4ade80;
        }
        .status-dot.is-closed {
          background: #ef4444;
          box-shadow: 0 0 8px #ef4444;
        }

        .status-state-text {
          font-size: 0.72rem;
          letter-spacing: 0.04em;
        }

        .status-coords {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--text-muted);
          font-size: 0.68rem;
          font-family: monospace;
          letter-spacing: 0.04em;
        }

        .coords-icon {
          color: var(--accent-peach);
          opacity: 0.8;
        }

        .clock-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-desc);
          font-size: 0.72rem;
          color: var(--text-muted);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 0.45rem;
        }

        .clock-icon {
          color: var(--accent-peach);
        }

        .clock-label {
          color: var(--text-muted);
        }

        .clock-val {
          color: var(--accent-peach-bright);
          font-family: monospace;
          font-weight: 700;
          letter-spacing: 0.06em;
          margin-left: auto;
        }

        /* Social Buttons */
        .socials-container {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        .social-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1rem;
          border-radius: 999px;
          font-family: var(--font-desc);
          font-size: 0.78rem;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(255, 168, 82, 0.2);
          background: rgba(21, 29, 45, 0.4);
          color: var(--text-main);
          text-decoration: none;
        }

        .social-btn:hover {
          border-color: var(--accent-peach);
          background: rgba(255, 168, 82, 0.12);
          color: var(--accent-peach-bright);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
        }

        /* Link Columns */
        .footer-links-col {
          display: flex;
          flex-direction: column;
        }

        .column-title {
          font-family: var(--font-headings);
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-main);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .title-bullet {
          color: var(--accent-peach);
          font-size: 0.8rem;
        }

        .links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 0;
          margin: 0;
        }

        .styled-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-desc);
          font-size: 0.86rem;
          color: var(--text-muted);
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .link-arrow {
          font-size: 0.75rem;
          color: var(--accent-peach);
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.25s ease;
        }

        .styled-link:hover {
          color: var(--text-main);
          padding-left: 2px;
        }

        .styled-link:hover .link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .highlight-link {
          color: var(--accent-peach);
          font-weight: 600;
        }

        /* Location Card */
        .footer-location-col {
          display: flex;
          flex-direction: column;
        }

        .location-card {
          background: rgba(13, 17, 27, 0.55);
          border: 1px solid rgba(255, 168, 82, 0.14);
          border-radius: 14px;
          padding: 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .studio-name {
          font-family: var(--font-headings);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .studio-address {
          font-family: var(--font-desc);
          font-size: 0.82rem;
          line-height: 1.6;
          color: var(--text-muted);
          font-style: normal;
        }

        .hours-divider {
          height: 1px;
          background: rgba(255, 168, 82, 0.1);
          margin: 0.2rem 0;
        }

        .hours-block {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-family: var(--font-desc);
          font-size: 0.8rem;
        }

        .hours-label {
          font-family: var(--font-headings);
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-main);
          font-weight: 700;
        }

        .hours-line {
          color: var(--text-muted);
        }

        .hours-closed {
          color: var(--accent-peach);
          font-size: 0.78rem;
        }

        .directions-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 0.5rem;
          padding: 0.55rem 0.9rem;
          border-radius: 8px;
          background: rgba(255, 168, 82, 0.08);
          border: 1px solid rgba(255, 168, 82, 0.25);
          color: var(--accent-peach-bright);
          font-family: var(--font-desc);
          font-size: 0.78rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          justify-content: center;
        }

        .directions-link:hover {
          background: rgba(255, 168, 82, 0.18);
          border-color: var(--accent-peach);
          color: #ffffff;
        }

        .ext-icon {
          font-size: 0.85rem;
        }

        /* Archival Watermark */
        .archival-watermark {
          font-family: var(--font-headings);
          font-size: clamp(2.5rem, 8vw, 6.5rem);
          font-weight: 900;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-align: center;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 168, 82, 0.08);
          pointer-events: none;
          user-select: none;
          margin: 1.5rem 0 1rem;
          line-height: 1;
        }

        /* Bottom Bar */
        .footer-bottom-bar {
          border-top: 1px solid rgba(255, 168, 82, 0.12);
          padding-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .copyright-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-family: var(--font-desc);
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .copy-line {
          color: var(--text-main);
          font-weight: 500;
        }

        .provenance-line {
          color: var(--text-muted);
          font-size: 0.72rem;
          letter-spacing: 0.04em;
        }

        /* Return to Top Button */
        .back-to-top-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.55rem 1rem 0.55rem 1.15rem;
          border-radius: 999px;
          background: rgba(13, 17, 27, 0.8);
          border: 1px solid rgba(255, 168, 82, 0.25);
          color: var(--text-main);
          font-family: var(--font-headings);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .back-to-top-btn:hover {
          background: rgba(255, 168, 82, 0.12);
          border-color: var(--accent-peach);
          color: var(--accent-peach-bright);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
        }

        .arrow-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255, 168, 82, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-peach);
          transition: transform 0.3s ease;
        }

        .back-to-top-btn:hover .arrow-circle {
          transform: translateY(-2px);
          background: var(--accent-peach);
          color: var(--text-dark);
        }

        @media (max-width: 600px) {
          .footer-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
          }
          .back-to-top-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}
