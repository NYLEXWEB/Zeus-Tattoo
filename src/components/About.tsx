"use client";

import React from "react";

interface AboutProps {
  onOpenBooking?: () => void;
}

export default function About({ onOpenBooking }: AboutProps) {
  const handleBookingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      const el = document.querySelector("#booking");
      if (el) {
        if (window.__lenis) {
          window.__lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <section
      id="about"
      className="about-section"
      suppressHydrationWarning={true}
    >
      <div className="container">
        <div className="about-grid">
          {/* Left Visual Column - Clean Editorial Portrait */}
          <div className="about-visual">
            <div className="about-img-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/about-us.jpg"
                alt="Tattoo Artist at work in Zeus Tattoo Studio"
                className="about-img"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Narrative Column */}
          <div className="about-content">
            <span className="section-subtitle">The Sanctuary</span>
            <h2 className="section-title">Our Story</h2>

            <p className="about-lead">
              Founded by master artist Shaibin AS, our sanctuary in Kottayam
              bridges neoclassical illustration with hospital-grade clinical precision.
            </p>
            <p className="about-text">
              Every design is custom-chiseled to harmonize with your anatomical flow—uniting
              geometry, myth, and fine-line craftsmanship into permanent collectibles that endure.
            </p>

            {/* Clean Minimalist Stats Grid */}
            <div className="about-stats-grid">
              <div className="stat-card">
                <span className="stat-number">100%</span>
                <span className="stat-label">Clinical Sterility</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">5K+</span>
                <span className="stat-label">Custom Works</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">10+</span>
                <span className="stat-label">Years Mastery</span>
              </div>
            </div>

            <div className="about-action">
              <a
                href="#booking"
                onClick={handleBookingClick}
                className="btn-primary"
              >
                Request Consultation
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          background-color: #0d111b !important;
          background: #0d111b !important;
          padding: 6.5rem 0;
          position: relative;
          overflow: hidden;
        }

        .about-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          align-items: center;
          gap: 3rem;
        }

        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
            gap: 4.5rem;
          }
        }

        /* Left Visual Frame - Clean Minimal Editorial */
        .about-visual {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .about-img-frame {
          width: 100%;
          max-width: 520px;
          border-radius: 20px;
          overflow: hidden;
          background: #111622;
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
        }

        .about-img {
          width: 100%;
          height: auto;
          aspect-ratio: 4 / 4.6;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-img-frame:hover .about-img {
          transform: scale(1.025);
        }

        /* Right Content */
        .about-content {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .about-lead {
          font-family: var(--font-desc);
          color: var(--text-main);
          font-size: 1.12rem;
          line-height: 1.7;
          font-weight: 500;
        }

        .about-text {
          font-family: var(--font-desc);
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.75;
        }

        /* Stats Grid - Solid #111622, No Over-Shadows */
        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin: 1rem 0 0.5rem;
        }

        @media (max-width: 580px) {
          .about-stats-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
        }

        .stat-card {
          background: #111622;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1.15rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.35rem;
          transition: border-color 0.25s ease;
        }

        .stat-card:hover {
          border-color: rgba(255, 168, 82, 0.35);
        }

        .stat-number {
          font-family: var(--font-headings);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--accent-peach);
          line-height: 1;
        }

        .stat-label {
          font-family: var(--font-desc);
          font-size: 0.75rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 600;
        }

        .about-action {
          margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
          .about-section {
            padding: 4.5rem 0;
          }
          .about-lead {
            font-size: 1rem;
          }
          .about-text {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
}
