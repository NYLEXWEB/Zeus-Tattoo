"use client";

import React, { useState } from "react";

export default function Moments() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="moments" className="moments-section">
      <div className="container">
        <div className="moments-grid">
          <div className="moments-info">
            <span className="section-subtitle">The Connection</span>
            <h2 className="section-title">Studio Moments</h2>
            <p className="moments-description">
              Behind the clinical precision and ink-filled cartridges lies a
              tapestry of human connection, quiet introspection, and shared
              milestones. Our space is more than a creative workshop—it is a
              canvas of trust, warmth, and family.
            </p>
            <p className="moments-description">
              Whether it is a client reflecting by our window lounges during a
              long forearm session or the artist sharing a laugh with their
              daughter at the workspace, these raw, unscripted fragments are what
              breathe life into the sanctuary.
            </p>
            <blockquote className="moments-quote-block">
              <p className="quote-text">
                “Every line chiseled onto skin is a physical manifestation of an
                internal chapter. We don&apos;t just draw; we listen.”
              </p>
              <cite className="quote-author">— Aryan “Zeus”</cite>
            </blockquote>
          </div>
          <div className="moments-visuals">
            <div className="staggered-moments-wrapper">
              <div
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`moment-card card-left ${
                  hoveredCard === 1 ? "focused" : ""
                } ${hoveredCard === 2 ? "dimmed" : ""}`}
              >
                <div className="moment-img-container card-glass">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/moment-1.jpg"
                    alt="Client reflecting by the studio glass window"
                    className="moment-img"
                  />
                  <div className="moment-vignette" />
                </div>
              </div>

              <div
                onMouseEnter={() => setHoveredCard(2)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`moment-card card-right ${
                  hoveredCard === 2 ? "focused" : ""
                } ${hoveredCard === 1 ? "dimmed" : ""}`}
              >
                <div className="moment-img-container card-glass">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/moment-2.jpg"
                    alt="Aryan Zeus sharing a smile with his daughter"
                    className="moment-img"
                  />
                  <div className="moment-vignette" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .moments-section {
          background: linear-gradient(
            180deg,
            var(--bg-storm-medium) 0%,
            var(--bg-storm-dark) 100%
          );
          padding: 8rem 0;
          position: relative;
          overflow: hidden;
        }
        .moments-grid {
          grid-template-columns: 1fr;
          align-items: center;
          gap: 5rem;
          display: grid;
        }
        @media (min-width: 992px) {
          .moments-grid {
            grid-template-columns: 1fr 1.15fr;
            gap: 4rem;
          }
        }
        .moments-info {
          z-index: 10;
        }
        .moments-description {
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          font-size: 1rem;
          line-height: 1.7;
        }
        .moments-quote-block {
          border-left: 2px solid var(--accent-peach);
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 2.5rem;
          padding-left: 1.5rem;
          display: flex;
        }
        .quote-text {
          font-family: var(--font-headings);
          color: var(--text-main);
          letter-spacing: 0.02em;
          font-size: 1.1rem;
          font-style: italic;
          line-height: 1.5;
        }
        .quote-author {
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent-peach);
          font-size: 0.75rem;
          font-weight: 700;
        }
        .moments-visuals {
          justify-content: center;
          align-items: center;
          width: 100%;
          display: flex;
          position: relative;
        }
        .staggered-moments-wrapper {
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          width: 100%;
          max-width: 600px;
          display: grid;
        }
        .moment-card {
          aspect-ratio: 2.7 / 4;
          will-change: transform, opacity, filter;
          width: 100%;
          transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
            filter 0.85s cubic-bezier(0.16, 1, 0.3, 1), z-index 0.85s;
          position: relative;
        }
        .card-left {
          z-index: 5;
          transform: translateY(-25px);
        }
        .card-right {
          z-index: 4;
          transform: translateY(25px);
        }
        .moment-card.focused {
          z-index: 10;
          opacity: 1;
        }
        .card-left.focused {
          transform: translateY(-30px) scale(1.05) rotate(-1deg);
        }
        .card-right.focused {
          transform: translateY(20px) scale(1.05) rotate(1deg);
        }
        .moment-card.dimmed {
          opacity: 0.45;
          filter: blur(2px) grayscale(0.2) brightness(0.7);
        }
        .moment-img-container {
          background: transparent;
          border: none;
          border-radius: 20px;
          width: 100%;
          height: 100%;
          display: flex;
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 40px #00000073;
        }
        .moment-img {
          object-fit: cover;
          border-radius: 20px;
          width: 100%;
          height: 100%;
          transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .moment-card.focused .moment-img {
          transform: scale(1.03);
        }
        .moment-vignette {
          pointer-events: none;
          background: linear-gradient(
            transparent 60%,
            #07090e80 100%
          );
          position: absolute;
          inset: 0;
        }
      `}</style>
    </section>
  );
}
