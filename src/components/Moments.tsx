"use client";

import React, { useRef } from "react";

export default function Moments() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="moments"
      className="moments-section"
      suppressHydrationWarning={true}
    >
      {/* Ambient aura glow */}
      <div className="ambient-aura" aria-hidden="true" />

      <div className="container">
        <div className="moments-grid">
          {/* Left Narrative Column */}
          <div className="moments-info">
            <div className="badge-pill">
              <span>The Connection</span>
            </div>

            <h2 className="moments-section-title">
              Studio <span className="title-highlight">Moments</span>
            </h2>

            <p className="moments-description">
              Behind the clinical precision lies a space of quiet introspection, trust,
              and shared milestones. These unscripted fragments between artist, client,
              and family breathe life into our sanctuary.
            </p>

            <div className="moments-quote-block">
              <div className="quote-accent-bar" />
              <div className="quote-content">
                <p className="quote-text">
                  “Every line chiseled onto skin is a physical manifestation of
                  an internal chapter. We don&apos;t just draw; we listen.”
                </p>
                <cite className="quote-author">
                  <span>Shaibin AS</span>
                  <span className="quote-location">Sanctuary Founder</span>
                </cite>
              </div>
            </div>
          </div>

          {/* Right Visuals Column */}
          <div className="moments-visuals">
            {/* 35mm Filmstrip Ticker */}
            <div className="filmstrip-ticker-banner" aria-hidden="true">
              <div className="filmstrip-ticker-track">
                {Array.from({ length: 2 }).map((_, repeatIdx) => (
                  <div key={repeatIdx} className="ticker-group">
                    <span className="sprocket-holes">▪ ▪ ▪ ▪ ▪</span>
                    <span className="ticker-text">KODAK TRI-X 400</span>
                    <span className="ticker-sep">/</span>
                    <span className="ticker-text">FRAME 01 : THE REFLECTION</span>
                    <span className="ticker-sep">/</span>
                    <span className="ticker-text">35MM LEICA ARCHIVE</span>
                    <span className="ticker-sep">/</span>
                    <span className="ticker-text">FRAME 02 : SACRED BOND</span>
                    <span className="ticker-sep">/</span>
                    <span className="ticker-text">UNSCRIPTED REALITY</span>
                    <span className="sprocket-holes">▪ ▪ ▪ ▪ ▪</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="moments-cards-track">
              {/* Card 1 */}
              <div className="moment-card card-first">
                <div className="card-motion-wrapper float-drift-a">
                  <div className="card-inner">
                    <div className="card-pill-tag">
                      <span className="tag-number">01</span>
                      <span className="tag-sep">/</span>
                      <span className="tag-title">Quiet Reflection</span>
                    </div>

                    <div className="img-frame">
                      <span className="viewfinder-corner corner-tl" />
                      <span className="viewfinder-corner corner-tr" />
                      <span className="viewfinder-corner corner-bl" />
                      <span className="viewfinder-corner corner-br" />

                      <div className="film-light-leak leak-a" aria-hidden="true" />

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/assets/moment-1.jpg"
                        alt="Client reflecting by the studio glass window"
                        className="moment-img"
                        loading="lazy"
                      />
                      <div className="frame-overlay" />
                    </div>

                    <div className="card-footer-caption">
                      <span className="caption-label">The Lounge Still</span>
                      <span className="caption-sub">Internal chapters before the ink</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="moment-card card-second">
                <div className="card-motion-wrapper float-drift-b">
                  <div className="card-inner">
                    <div className="card-pill-tag">
                      <span className="tag-number">02</span>
                      <span className="tag-sep">/</span>
                      <span className="tag-title">Sacred Bond</span>
                    </div>

                    <div className="img-frame">
                      <span className="viewfinder-corner corner-tl" />
                      <span className="viewfinder-corner corner-tr" />
                      <span className="viewfinder-corner corner-bl" />
                      <span className="viewfinder-corner corner-br" />

                      <div className="film-light-leak leak-b" aria-hidden="true" />

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/assets/moment-2.jpg"
                        alt="Artist sharing a joyful moment"
                        className="moment-img"
                        loading="lazy"
                      />
                      <div className="frame-overlay" />
                    </div>

                    <div className="card-footer-caption">
                      <span className="caption-label">Sanctuary Warmth</span>
                      <span className="caption-sub">Genuine joy &amp; family connection</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .moments-section {
          background: linear-gradient(
            180deg,
            var(--bg-storm-medium) 0%,
            var(--bg-storm-dark) 50%,
            var(--bg-storm-medium) 100%
          );
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
          width: 100%;
          max-width: 100%;
        }

        @media (max-width: 768px) {
          .moments-section {
            padding: 4rem 0 3rem;
          }
        }

        .ambient-aura {
          position: absolute;
          right: 0;
          top: 20%;
          width: 380px;
          height: 380px;
          max-width: 80vw;
          background: radial-gradient(
            circle,
            rgba(255, 168, 82, 0.1) 0%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 1;
        }

        .moments-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 2.5rem;
          align-items: center;
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 100%;
        }

        @media (min-width: 992px) {
          .moments-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
            gap: 4.5rem;
          }
        }

        .moments-info {
          position: relative;
          z-index: 5;
          min-width: 0;
          max-width: 100%;
          width: 100%;
        }

        .badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          background: rgba(255, 168, 82, 0.08);
          border: 1px solid rgba(255, 168, 82, 0.22);
          border-radius: 999px;
          font-family: var(--font-desc);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent-peach-bright);
          margin-bottom: 1.15rem;
        }

        .moments-section-title {
          font-family: var(--font-headings);
          font-size: clamp(1.75rem, 5vw, 3rem);
          font-weight: 800;
          line-height: 1.18;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: var(--text-main);
          margin-bottom: 1.25rem;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        @media (max-width: 480px) {
          .moments-section-title {
            font-size: 1.7rem;
            letter-spacing: 0.02em;
          }
        }

        .title-highlight {
          color: var(--accent-peach);
          background: linear-gradient(135deg, #ffa852 20%, #ffd09e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .moments-description {
          font-family: var(--font-desc);
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 1.25rem;
          letter-spacing: 0.01em;
          word-break: break-word;
        }

        .moments-quote-block {
          display: flex;
          gap: 1rem;
          margin: 1.5rem 0 1rem;
          padding: 1.1rem 1.2rem;
          background: rgba(21, 29, 45, 0.45);
          border: 1px solid rgba(255, 168, 82, 0.14);
          border-radius: 14px;
          position: relative;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 480px) {
          .moments-quote-block {
            padding: 1rem;
            gap: 0.8rem;
          }
        }

        .quote-accent-bar {
          width: 3px;
          background: linear-gradient(
            180deg,
            var(--accent-peach) 0%,
            rgba(255, 168, 82, 0.2) 100%
          );
          border-radius: 4px;
          flex-shrink: 0;
        }

        .quote-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 0;
          flex-grow: 1;
        }

        .quote-text {
          font-family: var(--font-headings);
          font-size: clamp(0.85rem, 2.6vw, 0.95rem);
          font-style: italic;
          color: var(--text-main);
          line-height: 1.55;
          letter-spacing: 0.02em;
          word-break: break-word;
        }

        .quote-author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-peach);
          font-weight: 700;
          font-style: normal;
          flex-wrap: wrap;
        }

        .quote-location {
          color: var(--text-muted);
          font-weight: 400;
          letter-spacing: 0.08em;
          border-left: 1px solid rgba(255, 255, 255, 0.15);
          padding-left: 0.75rem;
        }

        @media (max-width: 480px) {
          .quote-location {
            border-left: none;
            padding-left: 0;
          }
        }

        /* Right Column */
        .moments-visuals {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          position: relative;
        }

        .filmstrip-ticker-banner {
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          padding: 0.4rem 0;
          margin-bottom: 0.5rem;
          border-top: 1px solid rgba(255, 168, 82, 0.12);
          border-bottom: 1px solid rgba(255, 168, 82, 0.12);
          background: rgba(7, 9, 14, 0.5);
          position: relative;
        }

        .filmstrip-ticker-track {
          display: flex;
          width: max-content;
          animation: filmScroll 24s linear infinite;
          will-change: transform;
        }

        @keyframes filmScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .ticker-group {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding-right: 0.85rem;
          font-family: monospace;
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          color: var(--text-muted);
          white-space: nowrap;
        }

        .sprocket-holes {
          color: rgba(255, 168, 82, 0.45);
          font-size: 0.7rem;
        }

        .ticker-text {
          color: rgba(255, 168, 82, 0.85);
          font-weight: 600;
        }

        .ticker-sep {
          opacity: 0.3;
        }

        .moments-cards-track {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.25rem;
          width: 100%;
          max-width: 600px;
          position: relative;
          padding: 1.25rem 0 1.5rem;
          box-sizing: border-box;
        }

        @media (max-width: 640px) {
          .moments-cards-track {
            grid-template-columns: minmax(0, 1fr);
            gap: 1.5rem;
            width: 100%;
            max-width: 330px;
            margin: 0 auto;
          }
        }

        .moment-card {
          position: relative;
          min-width: 0;
        }

        .card-first {
          z-index: 4;
        }

        .card-second {
          z-index: 5;
        }

        @media (min-width: 641px) {
          .card-first {
            margin-top: 0;
          }
          .card-second {
            margin-top: 3rem;
          }
        }

        .card-motion-wrapper {
          width: 100%;
        }

        .card-inner {
          position: relative;
          border-radius: 16px;
          padding: 0.6rem;
          background: rgba(13, 17, 27, 0.88);
          border: 1px solid rgba(255, 168, 82, 0.18);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.55);
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .card-inner:hover {
          border-color: rgba(255, 168, 82, 0.45);
        }

        .card-pill-tag {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.15rem 0.3rem;
          font-family: var(--font-desc);
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .tag-number {
          color: var(--accent-peach);
          font-weight: 700;
        }

        .tag-sep {
          opacity: 0.35;
        }

        .tag-title {
          letter-spacing: 0.08em;
          color: var(--text-main);
          font-size: 0.68rem;
        }

        .img-frame {
          position: relative;
          aspect-ratio: 2.7 / 3.7;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          background: #07090e;
        }

        .viewfinder-corner {
          position: absolute;
          width: 10px;
          height: 10px;
          pointer-events: none;
          z-index: 6;
          border-color: rgba(255, 255, 255, 0.4);
          border-style: solid;
        }
        .corner-tl {
          top: 8px;
          left: 8px;
          border-width: 1.5px 0 0 1.5px;
        }
        .corner-tr {
          top: 8px;
          right: 8px;
          border-width: 1.5px 1.5px 0 0;
        }
        .corner-bl {
          bottom: 8px;
          left: 8px;
          border-width: 0 0 1.5px 1.5px;
        }
        .corner-br {
          bottom: 8px;
          right: 8px;
          border-width: 0 1.5px 1.5px 0;
        }

        .film-light-leak {
          position: absolute;
          inset: -30%;
          border-radius: 50%;
          pointer-events: none;
          z-index: 4;
        }

        .leak-a {
          background: radial-gradient(
            ellipse at center,
            rgba(255, 168, 82, 0.25) 0%,
            transparent 70%
          );
        }

        .leak-b {
          background: radial-gradient(
            ellipse at center,
            rgba(76, 163, 255, 0.18) 0%,
            transparent 70%
          );
        }

        .moment-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .frame-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 60%,
            rgba(7, 9, 14, 0.7) 100%
          );
          pointer-events: none;
        }

        .card-footer-caption {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          padding: 0.2rem 0.3rem 0.1rem;
        }

        .caption-label {
          font-family: var(--font-headings);
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--text-main);
          letter-spacing: 0.04em;
        }

        .caption-sub {
          font-family: var(--font-desc);
          font-size: 0.65rem;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
