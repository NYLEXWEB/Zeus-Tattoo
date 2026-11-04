"use client";

import React, { useState, useRef, useEffect } from "react";

const studioImages = [
  { id: 1, src: "/assets/studio-1.jpg", alt: "Studio Waiting Corner" },
  { id: 2, src: "/assets/studio-3.jpg", alt: "Consultation Lounge" },
  { id: 3, src: "/assets/studio-4.jpg", alt: "Tattoo Workstation" },
  { id: 4, src: "/assets/studio-2.jpg", alt: "Sterilized Equipment" },
  { id: 5, src: "/assets/studio-5.jpg", alt: "Studio Room Overview" },
];

export default function Studio() {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const touchStartX = useRef<number>(0);

  // Viewport observer
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "100px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const startAutoPlay = () => {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % studioImages.length);
    }, 4500);
  };

  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (isInView && !isHovered) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isInView, isHovered]);

  const handlePrev = () => {
    stopAutoPlay();
    setCurrentIndex(
      (prev) => (prev - 1 + studioImages.length) % studioImages.length
    );
    if (isInView && !isHovered) startAutoPlay();
  };

  const handleNext = () => {
    stopAutoPlay();
    setCurrentIndex((prev) => (prev + 1) % studioImages.length);
    if (isInView && !isHovered) startAutoPlay();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <section
      id="studio"
      ref={sectionRef}
      className="studio-section"
      suppressHydrationWarning={true}
    >
      <div className="container">
        <div className="studio-grid">
          <div className="studio-info">
            <span className="section-subtitle">The Space</span>
            <h2 className="section-title">Our Studio</h2>
            <p className="studio-description">
              Located in the heart of Kottayam, our studio balances a luxury
              neoclassical aesthetic with absolute clinical sterility. Designed
              for comfort, focus, and uncompromising safety.
            </p>
            <div className="studio-features-list">
              <div className="feature-item">
                <span className="feature-dot" />
                <span>Hospital-Grade Autoclave Sterilization</span>
              </div>
              <div className="feature-item">
                <span className="feature-dot" />
                <span>Private &amp; Hygienic Procedure Suites</span>
              </div>
              <div className="feature-item">
                <span className="feature-dot" />
                <span>Ergonomic Leather Lounges &amp; Ambient Lighting</span>
              </div>
            </div>
            <div className="studio-controls">
              <button
                onClick={handlePrev}
                aria-label="Previous image"
                className="control-btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                aria-label="Next image"
                className="control-btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <span className="control-counter">
                0{currentIndex + 1} / 0{studioImages.length}
              </span>
            </div>
          </div>

          <div
            onMouseEnter={() => {
              setIsHovered(true);
              stopAutoPlay();
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setHoveredCard(null);
              startAutoPlay();
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="studio-carousel-viewport"
          >
            <div className="fan-deck-container">
              {studioImages.map((img, idx) => {
                const offset = idx - currentIndex;
                const absOffset = Math.abs(offset);
                const isActive = offset === 0;
                let transY = 14 * absOffset;
                let rotZ = 7.5 * offset;
                let scaleVal = 1 - 0.085 * absOffset;
                let zIdx = 10 - absOffset;
                let opac = isActive ? 1 : 1 - 0.22 * absOffset;
                let blurAmount = 0;
                const isThisHovered = hoveredCard === idx;

                if (hoveredCard !== null) {
                  if (isThisHovered) {
                    transY -= 26;
                    scaleVal += 0.06;
                    rotZ *= 0.25;
                    opac = 1;
                    zIdx = 20;
                  } else {
                    opac *= 0.42;
                    blurAmount = absOffset === 1 ? 1.5 : 2.5;
                  }
                }

                return (
                  <div
                    key={img.id}
                    onClick={() => {
                      stopAutoPlay();
                      setCurrentIndex(idx);
                      startAutoPlay();
                    }}
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      transform: `translateX(${offset * (isHovered ? 80 : 44)
                        }px) translateY(${transY}px) rotate(${rotZ}deg) scale(${scaleVal})`,
                      zIndex: zIdx,
                      opacity: opac,
                      filter:
                        blurAmount > 0
                          ? `blur(${blurAmount}px) brightness(0.8)`
                          : "none",
                    }}
                    className={`fan-card ${isActive ? "active" : ""}`}
                  >
                    <div className="fan-card-inner">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="fan-card-img"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .studio-section {
          background: linear-gradient(
            180deg,
            var(--bg-storm-medium) 0%,
            var(--bg-storm-dark) 100%
          );
          padding: 7rem 0;
          position: relative;
          overflow: hidden;
        }
        .studio-grid {
          grid-template-columns: minmax(0, 1fr);
          align-items: center;
          gap: 3.5rem;
          display: grid;
        }
        @media (min-width: 992px) {
          .studio-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
            gap: 4rem;
          }
        }
        .studio-info {
          z-index: 10;
        }
        .studio-description {
          font-family: var(--font-desc);
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          font-size: 1rem;
          line-height: 1.7;
        }
        .studio-features-list {
          flex-direction: column;
          gap: 0.8rem;
          margin: 2.2rem 0;
          display: flex;
        }
        .feature-item {
          font-family: var(--font-desc);
          color: var(--text-main);
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          font-weight: 500;
          display: flex;
        }
        .feature-dot {
          background-color: var(--accent-peach);
          width: 5px;
          height: 5px;
          box-shadow: 0 0 6px var(--accent-peach);
          border-radius: 50%;
        }
        .studio-controls {
          align-items: center;
          gap: 1.5rem;
          margin-top: 2.5rem;
          display: flex;
        }
        .control-btn {
          width: 46px;
          height: 46px;
          color: var(--text-main);
          cursor: pointer;
          transition: var(--transition-smooth);
          background: #0d111b99;
          border: 1px solid rgba(255, 168, 82, 0.25);
          border-radius: 50%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        .control-btn:hover {
          border-color: var(--accent-peach);
          color: var(--accent-peach);
          background: rgba(255, 168, 82, 0.12);
          transform: scale(1.05);
        }
        .control-counter {
          letter-spacing: 0.1em;
          color: var(--accent-peach);
          font-family: monospace;
          font-size: 0.9rem;
          font-weight: 600;
        }
        .studio-carousel-viewport {
          z-index: 10;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 420px;
          display: flex;
          position: relative;
          touch-action: pan-y;
          user-select: none;
        }
        @media (min-width: 640px) {
          .studio-carousel-viewport {
            height: 480px;
          }
        }
        @media (min-width: 992px) {
          .studio-carousel-viewport {
            height: 540px;
          }
        }
        .fan-deck-container {
          perspective: 1300px;
          width: 240px;
          height: 360px;
          position: relative;
        }
        @media (max-width: 480px) {
          .fan-deck-container {
            width: 200px;
            height: 310px;
          }
          .studio-carousel-viewport {
            height: 360px;
          }
        }
        @media (min-width: 640px) {
          .fan-deck-container {
            width: 280px;
            height: 420px;
          }
        }
        @media (min-width: 992px) {
          .fan-deck-container {
            width: 320px;
            height: 480px;
          }
        }
        .fan-card {
          cursor: pointer;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            filter 0.8s cubic-bezier(0.16, 1, 0.3, 1), z-index 0.8s;
          position: absolute;
          top: 0;
          left: 0;
        }
        .fan-card-inner {
          background: transparent;
          border: none;
          border-radius: 16px;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.8s;
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
        }
        .fan-card.active .fan-card-inner {
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8),
            0 0 35px rgba(255, 168, 82, 0.15);
        }
        .fan-card-img {
          object-fit: cover;
          border-radius: 16px;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fan-card:hover .fan-card-img {
          transform: scale(1.03);
        }
      `}</style>
    </section>
  );
}
