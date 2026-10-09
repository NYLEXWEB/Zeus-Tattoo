"use client";

import React, { useState } from "react";

interface AftercareProps {
  onOpenBooking?: () => void;
}

const aftercareData = [
  {
    id: 1,
    title: "New Tattoo Aftercare Guidelines",
    category: "tattoo",
    icon: "⚡",
    points: [
      {
        title: "Initial Wrap Removal",
        desc: "Leave the medical healing wrap (SecondSkin) on for 2 to 4 days as instructed by your artist. If standard cling wrap was used, remove it after 2 to 4 hours.",
      },
      {
        title: "Gentle Cleaning",
        desc: "Wash the tattoo immediately after wrap removal using warm water and mild, fragrance-free antibacterial liquid soap. Use only clean hands—do not scrub with washcloths.",
      },
      {
        title: "Moisturizing Routine",
        desc: "Pat completely dry with a clean paper towel. Apply a micro-thin layer of unscented ointment (like Aquaphor) or specialized tattoo lotion 2 to 3 times daily. Avoid over-saturating.",
      },
      {
        title: "Critical Avoidance List",
        desc: "DO NOT pick, scratch, or peel scabbing skin. Avoid direct sunlight, swimming, saunas, hot tubs, and heavy gym sweating for at least 14 days.",
      },
    ],
  },
  {
    id: 2,
    title: "Precision Body Piercing Care",
    category: "piercing",
    icon: "✨",
    points: [
      {
        title: "Daily Saline Rinses",
        desc: "Clean the piercing area twice daily using sterile saline spray (0.9% sodium chloride). Spray directly on the entrance and exit holes for 10 seconds, then pat dry.",
      },
      {
        title: "Leave It Alone (L.I.T.A.)",
        desc: "Do not twist, rotate, or play with the jewelry. Moving the barbell/stud tears fragile healing tissue and introduces bacteria.",
      },
      {
        title: "Avoid Touching & Pressures",
        desc: "Never touch the piercing with unwashed hands. Avoid sleeping directly on new ear piercings—use a travel pillow to keep pressure off the area.",
      },
      {
        title: "Signs of Healing",
        desc: "Minor swelling, localized redness, and clear/white discharge (crusties) are normal. Do not pick crusties off dry—soak them off during saline washes.",
      },
    ],
  },
  {
    id: 3,
    title: "Microblading Brow Healing Process",
    category: "microblading",
    icon: "🌙",
    points: [
      {
        title: "Keep Brows Dry (Days 1-10)",
        desc: "Keep your eyebrows completely dry for the first 10 days. Avoid splashing water on your face during showers and skip heavy cardiovascular workouts that induce sweating.",
      },
      {
        title: "Ointment Application",
        desc: "Starting on Day 3, apply a rice-grain amount of the provided post-care balm to both brows twice daily using a clean cotton swab. Never apply with fingers.",
      },
      {
        title: "Do Not Scratch Flaking",
        desc: "As the brows heal, they will itch and flake. This is normal. Scratching or picking flakes will pull the organic pigment out of the skin, causing patchy spots.",
      },
      {
        title: "Avoid Makeup & Products",
        desc: "Do not apply any makeup, facial cleansers, oils, or anti-aging skin products on or around your eyebrows until they are completely healed (approx. 14 days).",
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
            <div className="card-glass border-pulse sidebar-card">
              <div className="sidebar-icon">⚠</div>
              <h3 className="sidebar-title">Warning Signs</h3>
              <p className="sidebar-desc">
                While swelling, warmth, redness, and mild throbbing are normal
                for initial healing, please contact us or a medical
                professional immediately if you experience:
              </p>
              <ul className="sidebar-bullets">
                <li>Excessive, expanding redness spreading from the site</li>
                <li>Pus, yellow/green discharge with a foul odor</li>
                <li>Severe, increasing pain or throbbing after 48 hours</li>
                <li>Fever or chills (signs of a systemic infection)</li>
              </ul>
              <div className="sidebar-footer">
                <p>Have questions during healing?</p>
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
          color: var(--text-muted);
          font-size: 0.85rem;
          line-height: 1.6;
        }
        .sidebar-card {
          background: linear-gradient(
            135deg,
            #1e0a0a40 0%,
            #0d111bb3 100%
          );
          border-color: #ff3c3c14;
          padding: 2.5rem;
        }
        .sidebar-card:after {
          border-color: #ff5a5a26 !important;
        }
        .sidebar-icon {
          color: #f55;
          text-shadow: 0 0 10px #ff55554d;
          margin-bottom: 1rem;
          font-size: 2rem;
        }
        .sidebar-title {
          text-transform: uppercase;
          color: var(--text-main);
          margin-bottom: 1rem;
          font-size: 1.25rem;
          font-weight: 800;
        }
        .sidebar-desc {
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
          color: var(--text-muted);
          padding-left: 1.2rem;
          font-size: 0.8rem;
          line-height: 1.5;
          position: relative;
        }
        .sidebar-bullets li:before {
          content: "!";
          color: #f55;
          font-weight: 800;
          position: absolute;
          left: 0;
        }
        .sidebar-footer {
          color: var(--text-muted);
          text-align: center;
          border-top: 1px solid #ff5a5a14;
          padding-top: 1.5rem;
          font-size: 0.85rem;
        }
        .sidebar-btn {
          border-color: #ff5a5a26;
          width: 100%;
          margin-top: 0.75rem;
        }
        .sidebar-btn:hover {
          background: #ff55550d;
          border-color: #f55;
          box-shadow: 0 0 15px #ff55551a;
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
