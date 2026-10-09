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

        <div className="aftercare-layout">
          <div className="accordions-container">
            {aftercareData.map((item) => {
              const isOpen = activeAccordion === item.id;
              return (
                <div
                  key={item.id}
                  className={`accordion-card ${isOpen ? "active" : ""}`}
                >
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
              <div className="sidebar-icon">✦</div>
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
          padding: 6rem 0;
          position: relative;
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
          border: 1px solid #ffa8520f;
          border-radius: 12px;
          overflow: hidden;
        }
        .accordion-card.active {
          border-color: #ffa85233;
          box-shadow: 0 5px 25px #0000004d;
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
          border-top: 1px solid #ffa85208;
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
            #0d111bf2 0%,
            #151d2dd9 100%
          );
          border-color: #ffa8521f;
          padding: 2.5rem;
        }
        .sidebar-icon {
          color: var(--accent-peach);
          margin-bottom: 1rem;
          font-size: 1.6rem;
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
          margin-bottom: 2rem;
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
        .sidebar-footer {
          color: var(--text-muted);
          text-align: center;
          border-top: 1px solid #ffa85214;
          padding-top: 1.5rem;
          font-size: 0.85rem;
        }
        .sidebar-btn {
          border-color: #ffa85233;
          width: 100%;
          margin-top: 0.75rem;
          box-shadow: none !important;
        }
        .sidebar-btn:hover {
          background: #ffa8520d;
          border-color: var(--accent-peach);
          box-shadow: none !important;
        }
        @media (max-width: 1024px) {
          .aftercare-layout {
            grid-template-columns: 1fr;
            gap: 4rem;
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
