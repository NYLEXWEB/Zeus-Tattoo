"use client";

import React, { useState } from "react";

interface AftercareProps {
  onOpenBooking?: () => void;
}

const aftercareData = [
  {
    id: 1,
    title: "Tattoo Aftercare",
    category: "tattoo",
    icon: "⚡",
    points: [
      {
        title: "Gentle Cleansing",
        desc: "Wash the tattoo with lukewarm water and mild, fragrance-free antibacterial soap. Pat dry with a clean paper towel—never rub.",
      },
      {
        title: "Minimal Hydration",
        desc: "Apply a sheer micro-layer of specialized tattoo lotion 2 to 3 times daily. Keep it breathable; never over-saturate.",
      },
      {
        title: "Healing Protection",
        desc: "Do not pick or scratch flaking skin. Avoid direct sunlight, soaking baths, swimming, and heavy workouts for 14 days.",
      },
    ],
  },
  {
    id: 2,
    title: "Body Piercing Care",
    category: "piercing",
    icon: "✨",
    points: [
      {
        title: "Saline Mists",
        desc: "Mist the piercing twice daily with sterile 0.9% saline spray for 10 seconds, then gently pat dry with sterile gauze.",
      },
      {
        title: "Zero Rotation (L.I.T.A.)",
        desc: "Leave it alone. Do not twist, turn, or play with jewelry. Twisting causes micro-tears in fragile healing tissue.",
      },
      {
        title: "Pressure Avoidance",
        desc: "Never touch with unwashed hands. Avoid sleeping directly on new piercings—use an ear-hole travel pillow.",
      },
    ],
  },
  {
    id: 3,
    title: "Microblading Care",
    category: "microblading",
    icon: "🌙",
    points: [
      {
        title: "Keep Dry (Days 1–10)",
        desc: "Keep brows completely dry for the first 10 days. Avoid splashing water, steam rooms, and sweat-inducing workouts.",
      },
      {
        title: "Micro-Balm Care",
        desc: "Starting Day 3, apply a rice-grain amount of post-care balm twice daily using a sterile cotton swab.",
      },
      {
        title: "Natural Flaking",
        desc: "Light itching and flaking are expected. Never scratch or pick flakes to ensure smooth, lifelong pigment clarity.",
      },
    ],
  },
];

export default function Aftercare({ onOpenBooking }: AftercareProps) {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(1);

  const toggleAccordion = (id: number) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const handleBookingClick = (e: React.MouseEvent) => {
    if (onOpenBooking) {
      e.preventDefault();
      onOpenBooking();
    }
  };

  return (
    <section id="aftercare" className="aftercare-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">Long-term Healing</span>
          <h2 className="section-title">Aftercare Guidelines</h2>
        </div>

        {/* Simple & Elegant: 14-Day Cellular Healing Cycle Tracker */}
        <div className="healing-cycle-tracker" aria-hidden="true">
          <div className="tracker-top">
            <div className="tracker-badge">
              <span className="tracker-pulse-dot" />
              <span>14-Day Cellular Recovery Journey</span>
            </div>
            <span className="tracker-subtitle">Clinical Pigment &amp; Tissue Preservation</span>
          </div>

          <div className="tracker-rail-container">
            <div className="tracker-rail-line">
              <div className="tracker-beam" />
            </div>

            <div className="tracker-milestones">
              <div className="milestone-item">
                <span className="milestone-dot dot-1" />
                <span className="milestone-days">Day 01–03</span>
                <span className="milestone-name">Sterile Shield</span>
              </div>
              <div className="milestone-item">
                <span className="milestone-dot dot-2" />
                <span className="milestone-days">Day 04–07</span>
                <span className="milestone-name">Micro-Hydration</span>
              </div>
              <div className="milestone-item">
                <span className="milestone-dot dot-3" />
                <span className="milestone-days">Day 08–13</span>
                <span className="milestone-name">Cellular Renewal</span>
              </div>
              <div className="milestone-item">
                <span className="milestone-dot dot-4" />
                <span className="milestone-days">Day 14+</span>
                <span className="milestone-name">Lifelong Lock</span>
              </div>
            </div>
          </div>
        </div>

        <div className="aftercare-layout">
          <div className="accordions-container">
            {aftercareData.map((item) => {
              const isOpen = activeAccordion === item.id;
              return (
                <div
                  key={item.id}
                  className={`accordion-card ${isOpen ? "active" : ""}`}
                >
                  {/* Subtle active traveling border indicator */}
                  {isOpen && <div className="card-active-glow-bar" />}

                  <button
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={isOpen}
                    className="accordion-header"
                  >
                    <div className="accordion-title-box">
                      <span className="accordion-icon">{item.icon}</span>
                      <span className="accordion-header-text">
                        {item.title}
                      </span>
                    </div>
                    <span
                      className={`accordion-arrow ${isOpen ? "rotate" : ""}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="arrow-svg"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`accordion-content ${isOpen ? "open" : ""}`}
                  >
                    <div className="accordion-content-inner">
                      <div className="care-points-grid">
                        {item.points.map((point, pIdx) => (
                          <div key={pIdx} className="care-point-card">
                            <h4 className="care-point-title">
                              <span className="point-bullet">•</span>{" "}
                              {point.title}
                            </h4>
                            <p className="care-point-desc">{point.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="aftercare-sidebar">
            <div className="card-glass sidebar-card">
              <div className="sidebar-icon-wrap">
                <span className="sidebar-icon">✦</span>
                <span className="sidebar-icon-halo" />
              </div>

              <h3 className="sidebar-title">Healing Support</h3>
              <p className="sidebar-desc">
                Every skin heals uniquely. If you ever have questions regarding
                your healing progress, our resident artists provide direct ongoing care.
              </p>
              <ul className="sidebar-bullets">
                <li>Complimentary 30-day healed touch-ups</li>
                <li>Direct artist WhatsApp communication</li>
                <li>Clinical guidance on sterile jewelry down-sizing</li>
              </ul>

              {/* Live Artist Support Availability Indicator */}
              <div className="artist-live-status">
                <div className="live-dot-wrap">
                  <span className="live-dot" />
                  <span className="live-dot-wave" />
                </div>
                <span>Resident Care Desk Active • WhatsApp Support</span>
              </div>

              <div className="sidebar-footer">
                <p>Need aftercare guidance?</p>
                <a
                  href="#booking"
                  onClick={handleBookingClick}
                  className="btn-secondary sidebar-btn"
                >
                  Message Your Artist
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .aftercare-section {
          background: linear-gradient(
            180deg,
            var(--bg-storm-dark) 0%,
            var(--bg-storm-medium) 100%
          );
          padding: 6.5rem 0;
          position: relative;
        }

        /* 14-Day Cellular Healing Cycle Tracker */
        .healing-cycle-tracker {
          background: rgba(13, 17, 27, 0.7);
          border: 1px solid rgba(255, 168, 82, 0.16);
          border-radius: 16px;
          padding: 1.25rem 1.75rem;
          margin-bottom: 3.5rem;
          backdrop-filter: blur(12px);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          position: relative;
          overflow: hidden;
        }

        .tracker-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .tracker-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-headings);
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-main);
          font-weight: 700;
        }

        .tracker-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-peach);
          box-shadow: 0 0 10px var(--accent-peach);
          animation: pulseDot 2s infinite ease-in-out;
        }

        @keyframes pulseDot {
          0%, 100% {
            transform: scale(0.9);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
            box-shadow: 0 0 14px var(--accent-peach);
          }
        }

        .tracker-subtitle {
          font-family: var(--font-desc);
          font-size: 0.75rem;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }

        .tracker-rail-container {
          position: relative;
          padding: 0.5rem 0 0.25rem;
        }

        /* Moving laser beam along the timeline rail */
        .tracker-rail-line {
          position: absolute;
          top: 10px;
          left: 1rem;
          right: 1rem;
          height: 2px;
          background: rgba(255, 168, 82, 0.15);
          overflow: hidden;
          z-index: 1;
        }

        .tracker-beam {
          position: absolute;
          top: 0;
          left: -25%;
          width: 25%;
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
          animation: laserBeamRun 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes laserBeamRun {
          0% {
            left: -25%;
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

        .tracker-milestones {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          position: relative;
          z-index: 2;
        }

        .milestone-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.45rem;
        }

        .milestone-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--bg-storm-medium);
          border: 2px solid rgba(255, 168, 82, 0.5);
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.8);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .dot-1 {
          border-color: var(--accent-peach);
          background: var(--accent-peach);
          box-shadow: 0 0 10px var(--accent-peach);
          animation: dotBreathe 3s ease-in-out infinite;
        }
        .dot-2 {
          animation: dotBreathe 3s ease-in-out infinite 0.75s;
        }
        .dot-3 {
          animation: dotBreathe 3s ease-in-out infinite 1.5s;
        }
        .dot-4 {
          animation: dotBreathe 3s ease-in-out infinite 2.25s;
        }

        @keyframes dotBreathe {
          0%, 100% {
            border-color: rgba(255, 168, 82, 0.4);
            transform: scale(1);
          }
          50% {
            border-color: var(--accent-peach);
            box-shadow: 0 0 12px rgba(255, 168, 82, 0.6);
            transform: scale(1.25);
          }
        }

        .milestone-days {
          font-family: var(--font-headings);
          font-size: 0.75rem;
          color: var(--accent-peach);
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        .milestone-name {
          font-family: var(--font-desc);
          font-size: 0.72rem;
          color: var(--text-muted);
          letter-spacing: 0.02em;
        }

        @media (max-width: 600px) {
          .tracker-milestones {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem 0.5rem;
          }
          .tracker-rail-line {
            display: none;
          }
          .milestone-item {
            align-items: flex-start;
            text-align: left;
            padding-left: 0.5rem;
          }
        }

        .aftercare-layout {
          grid-template-columns: 1.3fr 0.7fr;
          align-items: flex-start;
          gap: 4rem;
          display: grid;
        }

        .accordions-container {
          flex-direction: column;
          gap: 1.5rem;
          display: flex;
        }

        .accordion-card {
          background: var(--bg-storm-medium);
          transition: var(--transition-smooth);
          border: 1px solid rgba(255, 168, 82, 0.08);
          border-radius: 14px;
          overflow: hidden;
          position: relative;
        }

        .accordion-card.active {
          border-color: rgba(255, 168, 82, 0.35);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.55);
        }

        /* Subtle running light glow on active card */
        .card-active-glow-bar {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 3px;
          background: linear-gradient(
            180deg,
            transparent 0%,
            var(--accent-peach) 50%,
            transparent 100%
          );
          animation: activeBarFlow 3.5s ease-in-out infinite alternate;
        }

        @keyframes activeBarFlow {
          0% {
            opacity: 0.5;
            transform: scaleY(0.7);
          }
          100% {
            opacity: 1;
            transform: scaleY(1);
          }
        }

        .accordion-header {
          width: 100%;
          color: var(--text-main);
          font-family: var(--font-body);
          cursor: pointer;
          text-align: left;
          background: transparent;
          border: none;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          display: flex;
        }

        .accordion-title-box {
          align-items: center;
          gap: 1rem;
          display: flex;
        }

        .accordion-icon {
          color: var(--accent-peach);
          font-size: 1.25rem;
          transition: transform 0.3s ease;
        }

        .accordion-card.active .accordion-icon {
          transform: scale(1.15);
        }

        .accordion-header-text {
          font-family: var(--font-headings);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-size: 1.15rem;
          font-weight: 700;
        }

        .accordion-arrow {
          color: var(--text-muted);
          transition: var(--transition-smooth);
          align-items: center;
          display: flex;
        }

        .accordion-arrow.rotate {
          color: var(--accent-peach);
          transform: rotate(180deg);
        }

        .accordion-content {
          max-height: 0;
          transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .accordion-content.open {
          max-height: 1000px;
        }

        .accordion-content-inner {
          border-top: 1px solid rgba(255, 168, 82, 0.08);
          padding: 0 2rem 2.5rem;
        }

        .care-points-grid {
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          padding-top: 1.5rem;
          display: grid;
        }

        .care-point-card {
          flex-direction: column;
          gap: 0.5rem;
          display: flex;
        }

        .care-point-title {
          color: var(--text-main);
          text-transform: capitalize;
          font-size: 0.95rem;
          font-weight: 700;
        }

        .point-bullet {
          color: var(--accent-peach);
          margin-right: 0.25rem;
        }

        .care-point-desc {
          font-family: var(--font-desc);
          color: var(--text-muted);
          font-size: 0.85rem;
          line-height: 1.6;
        }

        .sidebar-card {
          background: linear-gradient(
            135deg,
            rgba(13, 17, 27, 0.95) 0%,
            rgba(21, 29, 45, 0.85) 100%
          );
          border: 1px solid rgba(255, 168, 82, 0.2);
          border-radius: 18px;
          padding: 2.25rem;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.55);
        }

        .sidebar-icon-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          margin-bottom: 1.25rem;
        }

        .sidebar-icon {
          color: var(--accent-peach);
          font-size: 1.5rem;
          position: relative;
          z-index: 2;
        }

        .sidebar-icon-halo {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 168, 82, 0.3) 0%, transparent 70%);
          animation: haloBreathe 3.5s ease-in-out infinite alternate;
        }

        @keyframes haloBreathe {
          0% { transform: scale(0.85); opacity: 0.3; }
          100% { transform: scale(1.35); opacity: 0.8; }
        }

        .sidebar-title {
          font-family: var(--font-headings);
          text-transform: uppercase;
          color: var(--text-main);
          margin-bottom: 1rem;
          font-size: 1.25rem;
          font-weight: 800;
        }

        .sidebar-desc {
          font-family: var(--font-desc);
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          font-size: 0.85rem;
          line-height: 1.6;
        }

        .sidebar-bullets {
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          list-style: none;
          display: flex;
        }

        .sidebar-bullets li {
          font-family: var(--font-desc);
          color: var(--text-muted);
          padding-left: 1.2rem;
          font-size: 0.8rem;
          line-height: 1.5;
          position: relative;
        }

        .sidebar-bullets li:before {
          content: "✦";
          color: var(--accent-peach);
          font-size: 0.7rem;
          position: absolute;
          left: 0;
          top: 1px;
        }

        /* Live Artist Availability Indicator */
        .artist-live-status {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.65rem 0.9rem;
          background: rgba(13, 17, 27, 0.7);
          border: 1px solid rgba(74, 222, 128, 0.25);
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-family: var(--font-desc);
          font-size: 0.72rem;
          color: var(--text-main);
        }

        .live-dot-wrap {
          position: relative;
          width: 8px;
          height: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 6px #4ade80;
        }

        .live-dot-wave {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 1px solid #4ade80;
          animation: greenRadar 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }

        @keyframes greenRadar {
          0% { transform: scale(0.6); opacity: 1; }
          100% { transform: scale(2.4); opacity: 0; }
        }

        .sidebar-footer {
          color: var(--text-muted);
          text-align: center;
          border-top: 1px solid rgba(255, 168, 82, 0.12);
          padding-top: 1.5rem;
          font-size: 0.85rem;
        }

        .sidebar-btn {
          border-color: rgba(255, 168, 82, 0.3);
          width: 100%;
          margin-top: 0.75rem;
          box-shadow: none !important;
        }

        .sidebar-btn:hover {
          background: rgba(255, 168, 82, 0.08);
          border-color: var(--accent-peach);
          box-shadow: none !important;
        }

        @media (max-width: 1024px) {
          .aftercare-layout {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
        }

        @media (max-width: 768px) {
          .accordion-header {
            padding: 1.25rem 1.5rem;
          }
          .accordion-header-text {
            font-size: 0.95rem;
          }
          .accordion-content-inner {
            padding: 0 1.5rem 2rem;
          }
          .care-points-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
