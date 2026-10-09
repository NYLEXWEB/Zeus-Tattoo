"use client";

import React from "react";

interface AboutProps {
  onOpenBooking?: () => void;
}

export default function About({ onOpenBooking }: AboutProps) {
  const handleBookingClick = (e: React.MouseEvent) => {
    if (onOpenBooking) {
      e.preventDefault();
      onOpenBooking();
    }
  };

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-visual">
            <div className="about-img-wrapper card-glass border-pulse">
              <div className="about-img-glow" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/about-us.jpg"
                alt="Tattoo Artist Aryan Zeus at work"
                className="about-img"
              />
              <div className="about-badge">
                <span className="badge-num">10+</span>
                <span className="badge-txt">Years Crafting</span>
              </div>
            </div>
          </div>
          <div className="about-content">
            <span className="section-subtitle">The Sanctuary</span>
            <h2 className="section-title">Our Story</h2>
            <p className="about-lead">
              Founded by master artist Aryan “Zeus”, our sanctuary in Kottayam
              bridges neoclassical illustration with hospital-grade clinical precision.
            </p>
            <p className="about-text">
              Every design is custom-chiseled to harmonize with your anatomical flow—uniting
              geometry, myth, and fine-line craftsmanship into permanent collectibles that endure.
            </p>
            <div className="about-stats">
              <div className="stat-box">
                <span className="stat-number">100%</span>
                <span className="stat-label">Clinical Sterility</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">5K+</span>
                <span className="stat-label">Custom Works</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">10+</span>
                <span className="stat-label">Years Mastery</span>
              </div>
            </div>
            <div className="about-action">
              <a
                href="#booking"
                onClick={handleBookingClick}
                className="btn-primary about-btn"
              >
                Request Consultation
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          background: linear-gradient(
            180deg,
            var(--bg-storm-dark) 0%,
            var(--bg-storm-medium) 100%
          );
          padding: 8rem 0;
          position: relative;
          overflow: hidden;
        }
        .about-grid {
          grid-template-columns: 1fr;
          align-items: center;
          gap: 5rem;
          display: grid;
        }
        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 1.1fr 1.2fr;
            gap: 5rem;
          }
        }
        .about-visual {
          justify-content: center;
          align-items: center;
          width: 100%;
          display: flex;
          position: relative;
        }
        .about-img-wrapper {
          aspect-ratio: 2.7 / 4;
          background: linear-gradient(135deg, #0d111bf2, #151d2dd9);
          border-color: #ffa85214;
          border-radius: 24px;
          width: 100%;
          max-width: 440px;
          padding: 0.75rem;
          transition: border-color 0.4s, box-shadow 0.4s;
          position: relative;
          overflow: hidden;
          box-shadow: 0 25px 60px #0000008c;
        }
        .about-img-wrapper:hover {
          border-color: #ffa85240;
          box-shadow: 0 30px 70px #000000a6, 0 0 30px #ffa8520a;
        }
        .about-img-glow {
          background: var(--accent-peach);
          filter: blur(100px);
          opacity: 0.1;
          pointer-events: none;
          z-index: 1;
          width: 250px;
          height: 250px;
          position: absolute;
          top: 20%;
          left: 20%;
        }
        .about-img {
          object-fit: cover;
          border-radius: 18px;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-img-wrapper:hover .about-img {
          transform: scale(1.03);
        }
        .about-badge {
          background: linear-gradient(
            135deg,
            var(--bg-storm-medium),
            var(--bg-storm-light)
          );
          z-index: 10;
          border: 1px solid #ffa85233;
          border-radius: 16px;
          flex-direction: column;
          align-items: center;
          padding: 1rem 1.4rem;
          transition: transform 0.4s;
          display: flex;
          position: absolute;
          bottom: 2rem;
          right: -1rem;
          box-shadow: 0 10px 30px #00000080;
        }
        .about-img-wrapper:hover .about-badge {
          transform: translateY(-5px);
        }
        @media (max-width: 480px) {
          .about-badge {
            bottom: 1.5rem;
            right: 1.5rem;
          }
        }
        .badge-num {
          font-family: var(--font-headings);
          color: var(--accent-peach);
          font-size: 1.6rem;
          font-weight: 800;
          line-height: 1;
        }
        .badge-txt {
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-top: 0.25rem;
          font-size: 0.65rem;
          font-weight: 700;
        }
        .about-content {
          z-index: 10;
        }
        .about-lead {
          font-family: var(--font-desc);
          color: var(--text-main);
          margin-bottom: 1.5rem;
          font-size: 1.15rem;
          font-weight: 500;
          line-height: 1.6;
        }
        .about-text {
          font-family: var(--font-desc);
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
          line-height: 1.7;
        }
        .about-stats {
          border-top: 1px solid #ffa85214;
          border-bottom: 1px solid #ffa85214;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin: 3rem 0;
          padding: 2.2rem 0;
          display: grid;
        }
        @media (max-width: 480px) {
          .about-stats {
            text-align: center;
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        .stat-box {
          flex-direction: column;
          gap: 0.4rem;
          display: flex;
        }
        .stat-number {
          font-family: var(--font-headings);
          color: var(--accent-peach);
          text-shadow: 0 0 10px #ffa8521a;
          font-size: 1.8rem;
          font-weight: 800;
          line-height: 1;
        }
        @media (min-width: 768px) {
          .stat-number {
            font-size: 2.2rem;
          }
        }
        .stat-label {
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 600;
        }
        .about-action {
          margin-top: 2rem;
        }
        .about-btn {
          text-align: center;
          justify-content: center;
          width: 100%;
        }
        @media (min-width: 768px) {
          .about-btn {
            width: auto;
          }
        }
      `}</style>
    </section>
  );
}
