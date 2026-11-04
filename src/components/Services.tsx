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
    description:
      "High-contrast realism, sacred geometry, and mythological compositions chiseled with single-use sterile precision.",
    tags: ["Realism & Fine-Line", "Custom Anatomy Fit", "Single-Use Sterile"],
    image: "/assets/tattoo-ganesha.jpg",
  },
  {
    id: 2,
    title: "Clinical Piercings",
    subtitle: "Precision Body Articulation",
    description:
      "Precision anatomical ear, facial, and body articulation utilizing implant-grade ASTM F-136 Titanium.",
    tags: ["Implant-Grade Titanium", "Needle-Only Precision", "Autoclave Sterilized"],
    image: "/assets/piercing-2.jpg",
  },
  {
    id: 3,
    title: "Microblading",
    subtitle: "Semi-Permanent Brow Artistry",
    description:
      "Hyper-realistic individual hair strokes and soft ombre shading tailored to your natural brow anatomy.",
    tags: ["Natural Hair Strokes", "Organic Pigments", "Custom Facial Mapping"],
    image: "/assets/service-microblading.jpg",
  },
  {
    id: 4,
    title: "Lip Pigmentation",
    subtitle: "Blush & Color Correction",
    description:
      "Semi-permanent lip blushing and border symmetry definition crafted with hypoallergenic mineral pigments.",
    tags: ["Custom Shade Matching", "Natural Lip Blush", "Hypoallergenic Minerals"],
    image: "/assets/service-lip.jpg",
  },
];

export default function Services({ onOpenBooking }: ServicesProps) {
  const [activePanel, setActivePanel] = useState(1);

  const handlePanelHover = (id: number) => {
    if (activePanel !== id) {
      setActivePanel(id);
    }
  };

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
      id="services"
      className="services-section"
      suppressHydrationWarning={true}
    >
      {/* Ambient background atmosphere glow */}
      <div className="ambient-fog-orb gold" style={{ top: "10%", right: "-10%", width: "450px", height: "450px" }} aria-hidden="true" />
      <div className="ambient-fog-orb blue" style={{ bottom: "5%", left: "-10%", width: "400px", height: "400px" }} aria-hidden="true" />
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
                onMouseEnter={() => handlePanelHover(item.id)}
                onClick={() => handlePanelHover(item.id)}
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
                    <div className="panel-tags">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="panel-tag-chip">
                          {tag}
                        </span>
                      ))}
                    </div>
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

      <style>{`
        .services-section {
          background: linear-gradient(
            180deg,
            var(--bg-storm-dark) 0%,
            var(--bg-storm-medium) 100%
          );
          padding: 7rem 0;
          position: relative;
        }
        .services-panels-container {
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
          margin-top: 3.5rem;
          display: flex;
        }

        .service-panel {
          cursor: pointer;
          border: 1px solid rgba(255, 168, 82, 0.12);
          border-radius: 20px;
          flex-direction: column;
          width: 100%;
          display: flex;
          position: relative;
          overflow: hidden;
          transition: border-color 0.35s ease, box-shadow 0.4s ease;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Mobile Sticky Stacking Cards Effect (Deck Stacking) */
        @media (max-width: 991px) {
          .services-panels-container {
            display: flex !important;
            flex-direction: column !important;
            position: relative !important;
            gap: 0 !important;
            padding-bottom: 3.5rem !important;
          }

          .service-panel {
            position: sticky !important;
            width: 100% !important;
            border-radius: 24px !important;
            margin-bottom: 3.5rem !important;
            background: linear-gradient(170deg, #141c2c 0%, #07090e 100%) !important;
            border: 1px solid rgba(255, 168, 82, 0.35) !important;
            box-shadow: 0 -8px 25px rgba(0, 0, 0, 0.8), 0 16px 45px rgba(0, 0, 0, 0.95) !important;
            overflow: hidden !important;
            transform: translateZ(0) !important;
            will-change: transform !important;
          }

          .service-panel:nth-child(1) {
            top: 85px !important;
            z-index: 10 !important;
          }

          .service-panel:nth-child(2) {
            top: 105px !important;
            z-index: 11 !important;
          }

          .service-panel:nth-child(3) {
            top: 125px !important;
            z-index: 12 !important;
          }

          .service-panel:nth-child(4) {
            top: 145px !important;
            z-index: 13 !important;
          }

          .panel-bg {
            height: 200px !important;
            width: 100% !important;
          }

          .panel-content {
            padding: 1.5rem 1.4rem 1.8rem !important;
          }

          .panel-title-expanded {
            font-size: 1.5rem !important;
            margin-bottom: 0.75rem !important;
          }

          .panel-desc {
            font-size: 0.88rem !important;
            line-height: 1.5 !important;
            margin-bottom: 1.1rem !important;
          }

          .panel-tags {
            margin-bottom: 1.25rem !important;
          }
        }

        @media (min-width: 992px) {
          .services-panels-container {
            flex-direction: row;
            gap: 1rem;
            height: 550px;
          }

          .service-panel {
            flex: 1 1 0%;
            min-width: 0;
            height: 100%;
            transition: flex 0.65s cubic-bezier(0.22, 1, 0.36, 1),
              border-color 0.35s ease,
              box-shadow 0.4s ease;
          }

          .service-panel.expanded {
            flex: 3.6 1 0%;
            border-color: rgba(255, 168, 82, 0.5);
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
          }
        }
        .panel-bg {
          background-position: center;
          background-size: cover;
          width: 100%;
          height: 220px;
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: transform;
          transition: transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @media (min-width: 992px) {
          .panel-bg {
            height: 100%;
            position: absolute;
            inset: 0;
          }
          .service-panel.expanded .panel-bg {
            transform: scale(1.06);
          }
        }
        .panel-overlay-dark {
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(
            rgba(7, 9, 14, 0.4) 0%,
            rgba(7, 9, 14, 0.95) 100%
          );
          position: absolute;
          inset: 0;
          opacity: 0.85;
          transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .service-panel.expanded .panel-overlay-dark {
          opacity: 0.55;
        }
        .panel-overlay-glow {
          z-index: 2;
          pointer-events: none;
          opacity: 0;
          background: radial-gradient(
            circle at 50% 100%,
            rgba(255, 168, 82, 0.15),
            transparent 70%
          );
          transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1);
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
          padding: 2rem 1.6rem;
          display: flex;
          position: relative;
          min-width: 0;
        }
        @media (min-width: 992px) {
          .panel-content {
            padding: 2.8rem;
            position: absolute;
            inset: 0;
            overflow: hidden;
          }
        }
        .panel-collapsed-header {
          display: none;
        }
        @media (min-width: 992px) {
          .panel-collapsed-header {
            pointer-events: none;
            opacity: 1;
            transform: translateY(0);
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
            margin: 0 auto;
            transition: opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            display: flex;
            position: absolute;
            top: 2.8rem;
            left: 0;
            right: 0;
          }
          .service-panel.expanded .panel-collapsed-header {
            opacity: 0;
            transform: translateY(-8px);
          }
        }
        .panel-num {
          font-family: var(--font-headings);
          color: var(--accent-peach);
          letter-spacing: 0.05em;
          text-shadow: 0 0 10px rgba(255, 168, 82, 0.3);
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
            transform: translateY(14px);
            transition: opacity 0.22s ease-out, transform 0.22s ease-out;
            min-width: 320px;
          }
          .service-panel.expanded .panel-body {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
            transition: opacity 0.38s cubic-bezier(0.22, 1, 0.36, 1) 0.12s,
              transform 0.42s cubic-bezier(0.22, 1, 0.36, 1) 0.12s;
          }
        }
        .panel-subtitle-label {
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-peach);
          margin-bottom: 0.4rem;
          font-size: 0.68rem;
          font-weight: 700;
          display: block;
        }
        .panel-title-expanded {
          font-family: var(--font-headings);
          color: var(--text-main);
          letter-spacing: 0.02em;
          margin-bottom: 1.1rem;
          font-size: 1.75rem;
          font-weight: 800;
          line-height: 1.2;
        }
        @media (min-width: 768px) {
          .panel-title-expanded {
            font-size: 2.2rem;
          }
        }
        .panel-desc {
          font-family: var(--font-desc);
          color: var(--text-muted);
          max-width: 500px;
          margin-bottom: 1.4rem;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .panel-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.6rem;
        }
        .panel-tag-chip {
          display: inline-flex;
          align-items: center;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--accent-peach-bright);
          background: rgba(255, 168, 82, 0.08);
          border: 1px solid rgba(255, 168, 82, 0.2);
          border-radius: 100px;
          padding: 0.3rem 0.8rem;
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
