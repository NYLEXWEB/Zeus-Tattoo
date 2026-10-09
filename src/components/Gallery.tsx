"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  image: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Lord Ganesha Spiritual Portrait",
    image: "/assets/tattoo-ganesha.jpg",
  },
  {
    id: 2,
    title: "Jesus Christ Realism Portrait",
    image: "/assets/tattoo-jesus.png",
  },
  {
    id: 3,
    title: "Watercolor Paper Boat",
    image: "/assets/tattoo-boat.png",
  },
  {
    id: 4,
    title: "Fine-line Floral & Butterfly",
    image: "/assets/tattoo-flowers.png",
  },
  {
    id: 5,
    title: "Minimalist Roman Numerals",
    image: "/assets/tattoo-date.png",
  },
  {
    id: 6,
    title: "Minimal Helix & Lobe Curation",
    image: "/assets/piercing-1.jpg",
  },
  {
    id: 7,
    title: "Emerald & Gold Ear Curation",
    image: "/assets/piercing-2.jpg",
  },
  {
    id: 8,
    title: "Marquise Cluster & Crescent Moon",
    image: "/assets/piercing-3.jpg",
  },
  {
    id: 9,
    title: "Minimalist Cartilage Articulation",
    image: "/assets/piercing-4.jpg",
  },
  {
    id: 10,
    title: "Crystal Helix & Heart Lobe Curation",
    image: "/assets/piercing-5.jpg",
  },
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [screenWidth, setScreenWidth] = useState(1200);

  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Responsive screen listener
  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Viewport intersection observer to avoid CPU cycles when offscreen
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

  // Advance next: active image transitions to left, right image comes to center
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % portfolioItems.length);
  }, []);

  // Previous
  const handlePrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length
    );
  }, []);

  // Auto-advance every 3 seconds only when in viewport and not hovered
  useEffect(() => {
    if (!isInView || isHovered) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [isInView, isHovered, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // 3D positioning logic
  const getCardStyle = (index: number) => {
    const total = portfolioItems.length;
    let diff = index - currentIndex;
    while (diff > total / 2) diff -= total;
    while (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);

    const isMobile = screenWidth < 640;
    const isTablet = screenWidth >= 640 && screenWidth < 1024;

    // Wider horizontal step spacing for larger cards
    const step1X = isMobile ? 140 : isTablet ? 260 : 370;
    const step2X = isMobile ? 250 : isTablet ? 470 : 660;
    const step3X = isMobile ? 350 : isTablet ? 630 : 890;

    // Beyond visible range: hide behind
    if (absDiff > 3) {
      const exitDir = diff > 0 ? 1 : -1;
      return {
        transform: `translateX(${exitDir * (step3X + 120)}px) translateZ(-400px) scale(0.4) rotateY(${exitDir * -50
          }deg)`,
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none" as const,
        visibility: "hidden" as const,
      };
    }

    // Active Center Front Card: Largest, sharp, no shadow
    if (diff === 0) {
      return {
        transform: "translateX(0px) translateY(0px) translateZ(120px) scale(1) rotateY(0deg)",
        zIndex: 35,
        opacity: 1,
        pointerEvents: "auto" as const,
        cursor: "default",
        visibility: "visible" as const,
      };
    }

    // Step 1: Layered directly behind center on left or right
    if (absDiff === 1) {
      const isRight = diff > 0;
      return {
        transform: `translateX(${isRight ? step1X : -step1X
          }px) translateY(${isMobile ? 12 : 10}px) translateZ(-70px) scale(${isMobile ? 0.78 : 0.83
          }) rotateY(${isRight ? -25 : 25}deg)`,
        zIndex: 22,
        opacity: isMobile ? 0.45 : 0.65,
        pointerEvents: "auto" as const,
        cursor: "pointer",
        visibility: "visible" as const,
      };
    }

    // Step 2: Layered further behind
    if (absDiff === 2) {
      const isRight = diff > 0;
      return {
        transform: `translateX(${isRight ? step2X : -step2X
          }px) translateY(${isMobile ? 22 : 18}px) translateZ(-180px) scale(${isMobile ? 0.6 : 0.68
          }) rotateY(${isRight ? -36 : 36}deg)`,
        zIndex: 14,
        opacity: isMobile ? 0.15 : 0.35,
        pointerEvents: "auto" as const,
        cursor: "pointer",
        visibility: "visible" as const,
      };
    }

    // Step 3: Layered farthest behind
    const isRight = diff > 0;
    return {
      transform: `translateX(${isRight ? step3X : -step3X
        }px) translateY(26px) translateZ(-280px) scale(0.52) rotateY(${isRight ? -46 : 46
        }deg)`,
      zIndex: 6,
      opacity: isMobile ? 0 : 0.15,
      pointerEvents: isMobile ? ("none" as const) : ("auto" as const),
      cursor: "pointer",
      visibility: isMobile ? ("hidden" as const) : ("visible" as const),
    };
  };

  return (
    <section id="gallery" ref={sectionRef} className="gallery-section">
      <div className="container">
        {/* Clean Centered Header */}
        <div className="gallery-header-wrapper">
          <span className="gallery-subtitle">
            OUR ARTISTRY
          </span>
          <h2 className="gallery-main-title">
            THE PORTFOLIO <br />
            <span className="serif-italic-peach">OF PERMANENT</span> COLLECTIVES
          </h2>
        </div>

        {/* 3D Single Row Stage Carousel */}
        <div
          className="stage-carousel-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Subtle edge fades */}
          <div className="stage-vignette stage-vignette-left" />
          <div className="stage-vignette stage-vignette-right" />

          {/* 3D Perspective Track */}
          <div className="stage-viewport-3d">
            <div className="cards-stage-deck">
              {portfolioItems.map((item, idx) => {
                const style = getCardStyle(idx);
                const isActive = idx === currentIndex;

                return (
                  <div
                    key={item.id}
                    style={style}
                    onClick={() => {
                      if (!isActive) setCurrentIndex(idx);
                    }}
                    className={`coverflow-card ${isActive ? "active-center" : "layered-side"
                      }`}
                  >
                    <div className="card-media-wrapper">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="card-artwork-img"
                        loading={idx <= 2 ? "eager" : "lazy"}
                      />

                      {/* Behind scrim for non-center cards for natural depth perception */}
                      {!isActive && <div className="card-side-scrim" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="carousel-nav-btn nav-btn-left"
            aria-label="Previous image"
          >
            <ChevronLeft size={26} />
          </button>

          <button
            onClick={handleNext}
            className="carousel-nav-btn nav-btn-right"
            aria-label="Next image"
          >
            <ChevronRight size={26} />
          </button>
        </div>

        {/* Minimal Indicators */}
        <div className="dots-navigation-strip">
          {portfolioItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`nav-dot ${idx === currentIndex ? "active" : ""}`}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <span className="dot-inner" />
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .gallery-section {
          background-color: var(--bg-storm-dark);
          padding: 7rem 0 6rem;
          position: relative;
          overflow: hidden;
          padding-top:2px;
        }

        /* Centered Clean Header */
        .gallery-header-wrapper {
          text-align: center;
          margin-bottom: 2.5rem;
          position: relative;
          z-index: 10;
        }
        .gallery-subtitle {
          font-family: var(--font-body);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent-peach);
          font-size: 0.78rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .sparkle-icon {
          color: var(--accent-peach);
        }
        .gallery-main-title {
          font-family: var(--font-headings);
          color: var(--text-main);
          letter-spacing: -0.02em;
          text-transform: uppercase;
          font-size: 2.2rem;
          font-weight: 800;
          line-height: 1.15;
        }
        @media (min-width: 768px) {
          .gallery-main-title {
            font-size: 3.2rem;
          }
        }
        .serif-italic-peach {
          font-family: var(--font-headings);
          color: var(--accent-peach);
          text-transform: uppercase;
          font-style: italic;
          font-weight: 400;
        }

        /* 3D Stage Carousel Viewport */
        .stage-carousel-container {
          position: relative;
          width: 100%;
          min-height: 520px;
          margin: 1.5rem 0 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1200px;
          user-select: none;
          z-index: 10;
        }
        @media (min-width: 640px) {
          .stage-carousel-container {
            min-height: 600px;
          }
        }
        @media (min-width: 1024px) {
          .stage-carousel-container {
            min-height: 720px;
          }
        }

        /* Edge Vignettes */
        .stage-vignette {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 60px;
          pointer-events: none;
          z-index: 40;
        }
        @media (min-width: 768px) {
          .stage-vignette {
            width: 140px;
          }
        }
        .stage-vignette-left {
          left: 0;
          background: linear-gradient(
            to right,
            var(--bg-storm-dark) 0%,
            transparent 100%
          );
        }
        .stage-vignette-right {
          right: 0;
          background: linear-gradient(
            to left,
            var(--bg-storm-dark) 0%,
            transparent 100%
          );
        }

        .stage-viewport-3d {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
        }

        .cards-stage-deck {
          position: relative;
          width: 100%;
          height: 440px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
        }
        @media (min-width: 640px) {
          .cards-stage-deck {
            height: 530px;
          }
        }
        @media (min-width: 1024px) {
          .cards-stage-deck {
            height: 660px;
          }
        }

        /* Coverflow Card - Much larger dimensions */
        .coverflow-card {
          position: absolute;
          width: 290px;
          height: 400px;
          border-radius: 18px;
          transform-style: preserve-3d;
          transition: transform 0.75s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity;
          box-shadow: none !important;
        }
        @media (min-width: 640px) {
          .coverflow-card {
            width: 370px;
            height: 500px;
            border-radius: 20px;
          }
        }
        @media (min-width: 1024px) {
          .coverflow-card {
            width: 470px;
            height: 630px;
            border-radius: 24px;
          }
        }

        /* Media wrapper - NO SHADOWS as requested */
        .card-media-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          overflow: hidden;
          background: #0d111b;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: none !important;
          transition: border-color 0.4s ease;
        }

        /* Active Center Card styling - crisp border, NO shadow */
        .coverflow-card.active-center .card-media-wrapper {
          border: 1.5px solid rgba(255, 168, 82, 0.75);
          box-shadow: none !important;
        }

        .coverflow-card.layered-side:hover .card-media-wrapper {
          border-color: rgba(255, 168, 82, 0.4);
        }

        /* Pure Image Artwork - No text or badges */
        .card-artwork-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          box-shadow: none !important;
          border-radius: inherit;
        }

        /* Scrim on background side cards for natural depth */
        .card-side-scrim {
          position: absolute;
          inset: 0;
          background: rgba(7, 9, 14, 0.45);
          transition: background 0.4s ease;
        }
        .coverflow-card.layered-side:hover .card-side-scrim {
          background: rgba(7, 9, 14, 0.2);
        }

        /* Navigation Arrows */
        .carousel-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(13, 17, 27, 0.85);
          border: 1px solid rgba(255, 168, 82, 0.3);
          color: var(--accent-peach);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
          z-index: 50;
          box-shadow: none !important;
        }
        @media (min-width: 768px) {
          .carousel-nav-btn {
            width: 56px;
            height: 56px;
          }
        }
        .nav-btn-left {
          left: 12px;
        }
        @media (min-width: 1024px) {
          .nav-btn-left {
            left: 28px;
          }
        }
        .nav-btn-right {
          right: 12px;
        }
        @media (min-width: 1024px) {
          .nav-btn-right {
            right: 28px;
          }
        }
        .carousel-nav-btn:hover {
          background: var(--accent-peach);
          color: var(--text-dark);
          border-color: var(--accent-peach);
          transform: translateY(-50%) scale(1.08);
        }

        /* Minimal Dots Navigation */
        .dots-navigation-strip {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.55rem;
          position: relative;
          z-index: 10;
          margin-top: 1rem;
        }
        .nav-dot {
          background: transparent;
          border: none;
          padding: 0.35rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dot-inner {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(255, 168, 82, 0.25);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-dot:hover .dot-inner {
          background: rgba(255, 168, 82, 0.6);
        }
        .nav-dot.active .dot-inner {
          width: 24px;
          border-radius: 8px;
          background: var(--accent-peach);
        }
      `}</style>
    </section>
  );
}
