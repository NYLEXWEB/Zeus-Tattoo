"use client";

import React, { useState } from "react";

interface ServicesProps {
  onOpenBooking?: () => void;
}

const servicesData = [
  {
    id: 1,
    title: "Bespoke Tattoos",
    subtitle: "Custom & Flash Artistry",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    description:
      "From micro-realism to large mythological backpieces, our resident artists compose digital mockups of custom designs, chiseled to fit your anatomy.",
    duration: "Depends on design complexity",
    bullets: [
      "100% sterile, single-use needle setups",
      "Neotraditional, Realism & Fine-line Art",
      "Complimentary touch-ups for 30 days",
      "Medical-grade protective healing wraps",
    ],
    image: "/assets/tattoo-ganesha.jpg",
  },
  {
    id: 2,
    title: "Clinical Piercings",
    subtitle: "Precision Body Articulation",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    ),
    description:
      "Expertly curated ear, facial, and body placement using hospital-grade sterilization, autoclave checks, and premium titanium and gold hardware.",
    duration: "15 - 30 minutes",
    bullets: [
      "Implant-grade ASTM F-136 Titanium",
      "Autoclave sterile-indicator pouches",
      "No piercing guns—needle-only precision",
      "Detailed custom anatomical curations",
    ],
    image: "/assets/piercing-2.jpg",
  },
  {
    id: 3,
    title: "Microblading",
    subtitle: "Semi-Permanent Brow Artistry",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    description:
      "Transform your brows with hyper-realistic, individual strokes mimicking natural hair growth or smooth ombre powder shading.",
    duration: "2 - 3 hours",
    bullets: [
      "Anatomy-based brow measurements",
      "Hypoallergenic organic pigment ranges",
      "Initial shaping consultation included",
      "Includes follow-up check in 6 weeks",
    ],
    image: "/assets/service-microblading.jpg",
  },
  {
    id: 4,
    title: "Lip Pigmentation",
    subtitle: "Blush & Color Correction",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      </svg>
    ),
    description:
      "Enhance your natural lip shape and color with permanent lip blushing, defining borders, correcting symmetry, and adding a lasting, healthy tint.",
    duration: "2 - 2.5 hours",
    bullets: [
      "Custom shade-matching pigment tests",
      "Symmetry mapping & correction mapping",
      "Hypoallergenic, organic lip pigments",
      "Quick healing process (~5 days)",
    ],
    image: "/assets/service-lip.jpg",
  },
];

export default function Services({ onOpenBooking }: ServicesProps) {
  const [activePanel, setActivePanel] = useState(1);

  const handleBookingClick = (e: React.MouseEvent) => {
    if (onOpenBooking) {
      e.preventDefault();
      onOpenBooking();
    }
  };

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">Our Expertise</span>
          <h2 className="section-title">Studio Services</h2>
        </div>
        <div className="services-panels-container">
          {servicesData.map((item) => {
            const isExpanded = activePanel === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActivePanel(item.id)}
                onClick={() => setActivePanel(item.id)}
                className={`service-panel ${isExpanded ? "expanded" : ""}`}
              >
                <div
                  style={{ backgroundImage: `url(${item.image})` }}
                  className="panel-bg"
                />
                <div className="panel-overlay-dark" />
                <div className="panel-overlay-glow" />
                <div className="panel-content">
                  <div className="panel-collapsed-header">
                    <span className="panel-num">0{item.id}</span>
                    <h3 className="panel-vertical-title">{item.title}</h3>
                  </div>
                  <div className="panel-body">
                    <span className="panel-subtitle-label">
                      {item.subtitle}
                    </span>
                    <h3 className="panel-title-expanded">{item.title}</h3>
                    <p className="panel-desc">{item.description}</p>
                    <div className="panel-duration">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          color: "var(--accent-peach)",
                          marginRight: "0.5rem",
                        }}
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>Estimated Duration: {item.duration}</span>
                    </div>
                    <ul className="panel-bullets-list">
                      {item.bullets.map((bullet, idx) => (
                        <li key={idx} className="panel-bullet-item">
                          <span className="panel-bullet-dot" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="panel-action">
                      <a
                        href="#booking"
                        onClick={handleBookingClick}
                        className="btn-primary panel-booking-btn"
                      >
                        Book Consultation
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .services-section {
          background: linear-gradient(
            180deg,
            var(--bg-storm-dark) 0%,
            var(--bg-storm-medium) 100%
          );
          padding: 8rem 0;
          position: relative;
        }
        .services-panels-container {
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
          margin-top: 4rem;
          display: flex;
        }
        @media (min-width: 992px) {
          .services-panels-container {
            flex-direction: row;
            gap: 1rem;
            height: 550px;
          }
        }
        .service-panel {
          cursor: pointer;
          will-change: flex-grow;
          border: 1px solid #ffa8520d;
          border-radius: 20px;
          flex-direction: column;
          width: 100%;
          transition: flex-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.4s, box-shadow 0.4s;
          display: flex;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 992px) {
          .service-panel {
            flex: 1;
            height: 100%;
          }
          .service-panel.expanded {
            border-color: #ffa85240;
            flex-grow: 4.2;
            box-shadow: 0 20px 45px #0000008c, 0 0 25px #ffa8520a;
          }
        }
        .panel-bg {
          filter: grayscale(0.15) brightness(0.55);
          will-change: transform, filter;
          background-position: 50%;
          background-size: cover;
          width: 100%;
          height: 200px;
          transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),
            filter 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (min-width: 992px) {
          .panel-bg {
            filter: grayscale(0.4) brightness(0.32);
            height: 100%;
            position: absolute;
            inset: 0;
          }
          .service-panel.expanded .panel-bg {
            filter: grayscale(0) brightness(0.48);
            transform: scale(1.05);
          }
        }
        .panel-overlay-dark {
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(#07090e4d 0%, #07090ed9 100%);
          position: absolute;
          inset: 0;
        }
        .panel-overlay-glow {
          z-index: 2;
          pointer-events: none;
          opacity: 0;
          background: radial-gradient(
            circle at 50% 100%,
            #ffa85208,
            transparent 70%
          );
          transition: opacity 0.8s;
          position: absolute;
          inset: 0;
        }
        .service-panel.expanded .panel-overlay-glow {
          opacity: 1;
        }
        .panel-content {
          z-index: 10;
          flex-direction: column;
          flex-grow: 1;
          justify-content: flex-end;
          padding: 2.2rem 1.8rem;
          display: flex;
          position: relative;
        }
        @media (min-width: 992px) {
          .panel-content {
            padding: 2.8rem;
            position: absolute;
            inset: 0;
          }
        }
        .panel-collapsed-header {
          display: none;
        }
        @media (min-width: 992px) {
          .panel-collapsed-header {
            pointer-events: none;
            opacity: 1;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
            margin: 0 auto;
            transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            position: absolute;
            top: 2.8rem;
            left: 0;
            right: 0;
          }
          .service-panel.expanded .panel-collapsed-header {
            opacity: 0;
          }
        }
        .panel-num {
          font-family: var(--font-headings);
          color: var(--accent-peach);
          letter-spacing: 0.05em;
          text-shadow: 0 0 10px #ffa85233;
          font-size: 1.4rem;
          font-weight: 400;
        }
        .panel-vertical-title {
          writing-mode: vertical-rl;
          font-family: var(--font-headings);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          white-space: nowrap;
          font-size: 1.25rem;
          font-weight: 700;
          transform: rotate(180deg);
        }
        .panel-body {
          opacity: 1;
          pointer-events: auto;
          flex-direction: column;
          display: flex;
          transform: none;
        }
        @media (min-width: 992px) {
          .panel-body {
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.32s,
              transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.32s;
            transform: translateY(18px);
          }
          .service-panel.expanded .panel-body {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
          }
        }
        .panel-subtitle-label {
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-peach);
          margin-bottom: 0.4rem;
          font-size: 0.65rem;
          font-weight: 700;
          display: block;
        }
        .panel-title-expanded {
          font-family: var(--font-headings);
          color: var(--text-main);
          letter-spacing: 0.02em;
          margin-bottom: 1.2rem;
          font-size: 1.8rem;
          font-weight: 800;
          line-height: 1.2;
        }
        @media (min-width: 768px) {
          .panel-title-expanded {
            font-size: 2.2rem;
          }
        }
        .panel-desc {
          color: var(--text-muted);
          max-width: 500px;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .panel-duration {
          color: var(--text-main);
          align-items: center;
          margin-bottom: 1.5rem;
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
        }
        .panel-bullets-list {
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 2rem;
          display: flex;
        }
        .panel-bullet-item {
          color: var(--text-muted);
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          display: flex;
        }
        .panel-bullet-dot {
          background-color: var(--accent-peach);
          width: 5px;
          height: 5px;
          box-shadow: 0 0 6px var(--accent-peach);
          border-radius: 50%;
          flex-shrink: 0;
        }
        .panel-action {
          padding-top: 0.5rem;
        }
        .panel-booking-btn {
          text-align: center;
          justify-content: center;
          width: 100%;
        }
        @media (min-width: 768px) {
          .panel-booking-btn {
            width: auto;
          }
        }
      `}</style>
    </section>
  );
}
