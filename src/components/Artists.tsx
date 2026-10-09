"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Sparkles, ChevronLeft, ChevronRight, ArrowRight, Award } from "lucide-react";
import SectionFlourish from "./SectionFlourish";
import TornPaperDivider from "./TornPaperDivider";

export interface ArtistItemData {
  id: string;
  image: string;
  name: string;
  role: string;
  styles: string;
  experience?: string;
  description: string;
  awards?: string;
}

interface ArtistsProps {
  onOpenBooking?: () => void;
}

export const residentArtists: ArtistItemData[] = [
  {
    id: "artist-1",
    image: "/images/artist_arjun.jpg",
    name: "ARYAN 'ZEUS'",
    role: "FOUNDER & MASTER ARTIST",
    styles: "Realism • Mythology • Neoclassical Art",
    experience: "10+ Years Experience • Master Illustrator",
    description:
      "Internationally acclaimed realism specialist dedicated to rendering high-contrast portraiture, mythical iconography, and anatomically precise wildlife imagery chiseled with clinical precision.",
  },
  {
    id: "artist-2",
    image: "/images/artist_meera.jpg",
    name: "MEERA NAIR",
    role: "FINE LINE SPECIALIST",
    styles: "Single-Needle Micro • Botanical • Minimalist Geometry",
    experience: "8+ Years Experience • Single-Needle Pioneer",
    description:
      "Master of delicate single-needle micro-realism, fine botanical illustrations, and geometric minimalism. Meera crafts whisper-thin linework engineered for zero pigment bleed and lifelong healed clarity.",
  },
  {
    id: "artist-3",
    image: "/images/artist_rahul.jpg",
    name: "ARJUN VERMA",
    role: "BLACK & GREY SPECIALIST",
    styles: "Full Sleeves • Obsidian Wash • Dark Surrealism",
    experience: "10+ Years Experience • Master of Shading",
    description:
      "Specializing in large-scale multi-session sleeve compositions. Arjun combines dark surrealism, architectural flow, and obsidian gradient wash transitions that dynamically follow joint movement.",
  },
  {
    id: "artist-4",
    image: "/images/artist_sahana.jpg",
    name: "SAHANA RAO",
    role: "GEOMETRY & COVER-UPS",
    styles: "Sacred Mandalas • Stipple Dotwork • Restorations",
    experience: "9+ Years Experience • Stipple Dotwork Master",
    description:
      "Renowned for complex sacred geometry mandalas and transformative cover-ups. Sahana utilizes multi-layered stippling and dotwork to turn old tattoos into symmetrical masterpieces.",
  },
];

// Duplicate list to create a seamless 8-card 3D circular revolving ring (45 deg apart)
const ringCards = [
  ...residentArtists.map((a, i) => ({ ...a, ringKey: `${a.id}-a-${i}`, origIdx: i })),
  ...residentArtists.map((a, i) => ({ ...a, ringKey: `${a.id}-b-${i}`, origIdx: i })),
];

const CARD_COUNT = ringCards.length; // 8
const ANGLE_STEP = 360 / CARD_COUNT; // 45 degrees

export default function Artists({ onOpenBooking }: ArtistsProps) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);

  const angleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Drag tracking
  const dragStartX = useRef<number>(0);
  const dragStartAngle = useRef<number>(0);
  const isPointerDown = useRef<boolean>(false);
  const dragMoved = useRef<boolean>(false);

  // Track responsive radii
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive 3D circle radii
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const radiusX = isMobile ? 260 : isTablet ? 380 : 490;
  const radiusZ = isMobile ? 180 : isTablet ? 240 : 310;

  // Viewport intersection observer to completely halt RAF when not in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "150px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // High performance smooth 60fps/120fps rotation animation loop
  useEffect(() => {
    if (!isInView) {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      return;
    }

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      // Automatically revolve right-to-left at smooth speed (~14 sec per full turn)
      // When hovered or dragged, pause auto-advance and smoothly lerp to target
      if (!isHovered && !isPointerDown.current) {
        // Continuous right-to-left rotation (decreasing angle moves cards from +X right to -X left)
        const autoSpeed = 16.0; // degrees per second
        angleRef.current -= autoSpeed * delta;
        targetAngleRef.current = angleRef.current;
      } else {
        // Smoothly lerp towards target angle during drag / click navigation
        angleRef.current += (targetAngleRef.current - angleRef.current) * 0.12;
      }

      setRotationAngle(angleRef.current);
      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      lastTimeRef.current = 0;
    };
  }, [isInView, isHovered]);

  // Navigate to previous card (curves right-to-left)
  const handlePrev = useCallback(() => {
    const currentRounded = Math.round(targetAngleRef.current / ANGLE_STEP) * ANGLE_STEP;
    targetAngleRef.current = currentRounded + ANGLE_STEP;
  }, []);

  // Navigate to next card
  const handleNext = useCallback(() => {
    const currentRounded = Math.round(targetAngleRef.current / ANGLE_STEP) * ANGLE_STEP;
    targetAngleRef.current = currentRounded - ANGLE_STEP;
  }, []);

  // Rotate specific card to center front on click
  const handleCardClick = (normAngle: number, e: React.MouseEvent) => {
    if (dragMoved.current) return;

    // If card is already in front center (|normAngle| < 12 deg), trigger booking
    if (Math.abs(normAngle) < 14) {
      return;
    }

    // Bring this clicked card directly to the front center
    e.preventDefault();
    targetAngleRef.current = angleRef.current - normAngle;
  };

  // Pointer / Touch drag controls
  const handlePointerDown = (clientX: number) => {
    isPointerDown.current = true;
    dragMoved.current = false;
    dragStartX.current = clientX;
    dragStartAngle.current = targetAngleRef.current;
  };

  const handlePointerMove = (clientX: number) => {
    if (!isPointerDown.current) return;
    const diff = clientX - dragStartX.current;
    if (Math.abs(diff) > 5) {
      dragMoved.current = true;
      setIsDragging(true);
    }
    // Map horizontal drag distance to rotation angle
    const sensitivity = isMobile ? 0.28 : 0.22;
    targetAngleRef.current = dragStartAngle.current + diff * sensitivity;
    angleRef.current = targetAngleRef.current;
  };

  const handlePointerUp = () => {
    if (isPointerDown.current) {
      isPointerDown.current = false;
      setTimeout(() => {
        setIsDragging(false);
        dragMoved.current = false;
      }, 50);
    }
  };

  // Identify currently active front-most artist for indicator pills
  let closestNorm = Infinity;
  let activeArtistIndex = 0;

  ringCards.forEach((item, index) => {
    const cardBaseAngle = (rotationAngle + index * ANGLE_STEP) % 360;
    const norm = ((((cardBaseAngle + 180) % 360) + 360) % 360) - 180;
    if (Math.abs(norm) < closestNorm) {
      closestNorm = Math.abs(norm);
      activeArtistIndex = item.origIdx;
    }
  });

  return (
    <section id="artists" ref={sectionRef} className="artists-revolving-section">
      {/* Top Seamless Torn Paper Divider */}
      <TornPaperDivider position="top" fill="var(--bg-storm-medium)" variant={2} />

      <div className="container artists-header-container">
        {/* Section Header */}
        <div className="section-title-wrapper">
          <span className="section-subtitle">
            <Sparkles size={14} className="sparkle-gold" />
            MASTERS OF THE CRAFT
          </span>
          <h2 className="section-title">MEET OUR ARTISTS</h2>
          <SectionFlourish color="#ffa852" className="mt-2" />
        </div>
      </div>

      {/* 3D Circular Revolving Carousel Stage */}
      <div
        className="carousel-3d-stage"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handlePointerUp();
        }}
        onMouseDown={(e) => handlePointerDown(e.clientX)}
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onMouseUp={handlePointerUp}
        onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
        onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
        onTouchEnd={handlePointerUp}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {/* Ambient Center Glow */}
        <div className="carousel-ambient-spotlight" />

        {/* 3D Circular Turntable */}
        <div className="carousel-3d-turntable">
          {ringCards.map((artist, index) => {
            // Normalized angle in range [-180, 180] deg
            const rawAngle = (rotationAngle + index * ANGLE_STEP) % 360;
            const normAngle = ((((rawAngle + 180) % 360) + 360) % 360) - 180;
            const rad = (normAngle * Math.PI) / 180;

            // 3D elliptical coordinates: right (+X) to left (-X) revolving cylinder
            const x = Math.sin(rad) * radiusX;
            const z = (Math.cos(rad) - 1) * radiusZ;
            const y = (1 - Math.cos(rad)) * (isMobile ? 8 : 14);

            // Dynamic 3D rotation, scaling, and depth fog
            const cosNorm = (Math.cos(rad) + 1) / 2; // 1 at front (0 deg), 0 at back (180 deg)
            const scale = isMobile
              ? 0.74 + 0.3 * cosNorm
              : 0.76 + 0.32 * cosNorm;
            const opacity = 0.28 + 0.72 * Math.pow(cosNorm, 1.4);
            const zIndex = Math.round(cosNorm * 30);
            const rotateY = -Math.sin(rad) * 26; // degrees curved inward facing viewer

            const isFrontCard = Math.abs(normAngle) < 22.5;

            return (
              <div
                key={artist.ringKey}
                onClick={(e) => handleCardClick(normAngle, e)}
                style={{
                  transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
                className={`artist-3d-card ${isFrontCard ? "is-front-center" : "is-revolving-side"}`}
              >
                {/* Artwork Framing */}
                <div className="artist-card-inner">
                  {/* Image Container */}
                  <div className="artist-image-box">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="artist-portrait-img"
                      loading="eager"
                      draggable={false}
                    />
                    <div className="artist-img-vignette" />

                    {/* Master Badge */}
                    <div className="artist-pill-badge">
                      <Award size={12} className="text-[#ffa852]" />
                      <span>{artist.role.includes("FOUNDER") ? "RESIDENT FOUNDER" : "RESIDENT ARTIST"}</span>
                    </div>
                  </div>

                  {/* Information Panel */}
                  <div className="artist-details-box">
                    <span className="artist-role-label">{artist.role}</span>
                    <h3 className="artist-name-title">{artist.name}</h3>

                    <div className="artist-style-pill">
                      <span>{artist.styles}</span>
                    </div>

                    <p className="artist-bio-text">{artist.description}</p>

                    <div className="artist-card-action">
                      <a
                        href="#booking"
                        onClick={(e) => {
                          if (onOpenBooking) {
                            e.preventDefault();
                            e.stopPropagation();
                            onOpenBooking();
                          }
                        }}
                        className={`artist-consult-btn ${isFrontCard ? "btn-active-front" : ""}`}
                      >
                        <span>Book With {artist.name.split(" ")[0]}</span>
                        <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls & Artist Dots */}
      <div className="carousel-controls-bar">
        <button
          onClick={handlePrev}
          aria-label="Previous artist"
          className="carousel-nav-btn prev-btn"
        >
          <ChevronLeft size={20} />
        </button>

        {/* 4 Artist Indicator Dots */}
        <div className="artist-dots-container">
          {residentArtists.map((artist, idx) => {
            const isActive = idx === activeArtistIndex;
            return (
              <button
                key={artist.id}
                onClick={() => {
                  // Find ring card matching this index and snap towards it
                  const targetCard = ringCards.findIndex((c) => c.origIdx === idx);
                  if (targetCard !== -1) {
                    const rawAngle = (targetAngleRef.current + targetCard * ANGLE_STEP) % 360;
                    const norm = ((((rawAngle + 180) % 360) + 360) % 360) - 180;
                    targetAngleRef.current -= norm;
                  }
                }}
                className={`artist-dot-pill ${isActive ? "dot-active" : ""}`}
                title={artist.name}
              >
                <span className="dot-text">{artist.name.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next artist"
          className="carousel-nav-btn next-btn"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Bottom Seamless Torn Paper Divider */}
      <TornPaperDivider position="bottom" fill="#07090e" variant={1} />

      <style jsx>{`
        .artists-revolving-section {
          background-color: var(--bg-storm-dark);
          padding: 6rem 0 7rem;
          position: relative;
          overflow: hidden;
        }

        .artists-header-container {
          position: relative;
          z-index: 20;
          margin-bottom: 2rem;
          text-align: center;
        }

        .sparkle-gold {
          color: var(--accent-peach);
          margin-right: 0.4rem;
          display: inline-block;
        }

        /* 3D Perspective Stage */
        .carousel-3d-stage {
          position: relative;
          width: 100%;
          min-height: 560px;
          height: 600px;
          perspective: 1300px;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          touch-action: pan-y;
          overflow: visible;
        }

        @media (max-width: 768px) {
          .carousel-3d-stage {
            min-height: 500px;
            height: 530px;
            perspective: 900px;
          }
        }

        .carousel-ambient-spotlight {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 168, 82, 0.12) 0%,
            rgba(255, 168, 82, 0.03) 45%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Revolving Turntable Ring */
        .carousel-3d-turntable {
          position: relative;
          width: 0;
          height: 0;
          transform-style: preserve-3d;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* 3D Artist Card */
        .artist-3d-card {
          position: absolute;
          width: 320px;
          height: 485px;
          margin-left: -160px;
          margin-top: -242px;
          transform-style: preserve-3d;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
          border-radius: 18px;
          will-change: transform, opacity;
        }

        @media (max-width: 640px) {
          .artist-3d-card {
            width: 270px;
            height: 440px;
            margin-left: -135px;
            margin-top: -220px;
          }
        }

        .artist-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 18px;
          overflow: hidden;
          background: linear-gradient(165deg, rgba(21, 29, 45, 0.85) 0%, rgba(7, 9, 14, 0.98) 100%);
          border: 1px solid rgba(255, 168, 82, 0.18);
          display: flex;
          flex-direction: column;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        /* Front Center Card Highlight */
        .artist-3d-card.is-front-center .artist-card-inner {
          border-color: rgba(255, 168, 82, 0.55);
          box-shadow: 0 0 35px rgba(255, 168, 82, 0.25), 0 25px 60px rgba(0, 0, 0, 0.85);
        }

        .artist-3d-card.is-revolving-side .artist-card-inner {
          filter: brightness(0.85);
        }

        .artist-3d-card.is-revolving-side:hover .artist-card-inner {
          border-color: rgba(255, 168, 82, 0.35);
          filter: brightness(1);
        }

        /* Image Box */
        .artist-image-box {
          position: relative;
          width: 100%;
          height: 52%;
          overflow: hidden;
          background: #0d111b;
        }

        .artist-portrait-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 15%;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .artist-3d-card.is-front-center:hover .artist-portrait-img {
          transform: scale(1.05);
        }

        .artist-img-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(7, 9, 14, 0.1) 0%,
            rgba(7, 9, 14, 0.5) 60%,
            rgba(7, 9, 14, 0.95) 100%
          );
        }

        .artist-pill-badge {
          position: absolute;
          top: 0.9rem;
          left: 0.9rem;
          background: rgba(7, 9, 14, 0.85);
          border: 1px solid rgba(255, 168, 82, 0.35);
          border-radius: 100px;
          padding: 0.3rem 0.75rem;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-headings);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--accent-peach);
          backdrop-filter: blur(8px);
        }

        /* Details Box */
        .artist-details-box {
          position: relative;
          padding: 1.1rem 1.4rem 1.4rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: space-between;
        }

        @media (max-width: 640px) {
          .artist-details-box {
            padding: 0.9rem 1.1rem 1.1rem;
          }
        }

        .artist-role-label {
          font-family: var(--font-headings);
          text-transform: uppercase;
          color: var(--accent-peach);
          letter-spacing: 0.12em;
          font-size: 0.66rem;
          font-weight: 700;
          display: block;
          margin-bottom: 0.2rem;
        }

        .artist-name-title {
          font-family: var(--font-headings);
          color: var(--text-main);
          font-size: 1.35rem;
          font-weight: 900;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 0.45rem;
          line-height: 1.15;
        }

        @media (max-width: 640px) {
          .artist-name-title {
            font-size: 1.2rem;
          }
        }

        .artist-style-pill {
          color: var(--accent-peach-bright);
          font-family: var(--font-desc);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          margin-bottom: 0.6rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .artist-bio-text {
          font-family: var(--font-desc);
          color: #94a3b8;
          font-size: 0.78rem;
          line-height: 1.5;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .artist-card-action {
          margin-top: auto;
        }

        .artist-consult-btn {
          width: 100%;
          padding: 0.65rem 1rem;
          border-radius: 100px;
          background: rgba(255, 168, 82, 0.1);
          border: 1px solid rgba(255, 168, 82, 0.3);
          color: var(--accent-peach);
          font-family: var(--font-headings);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
        }

        .artist-consult-btn:hover,
        .artist-consult-btn.btn-active-front {
          background: linear-gradient(135deg, var(--accent-peach), #e08e3e);
          color: var(--text-dark);
          border-color: transparent;
          box-shadow: 0 4px 20px rgba(255, 168, 82, 0.35);
        }

        .artist-consult-btn:hover {
          transform: translateY(-2px);
        }

        /* Controls Bar */
        .carousel-controls-bar {
          position: relative;
          z-index: 25;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          margin-top: 1.5rem;
        }

        .carousel-nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(13, 17, 27, 0.9);
          border: 1px solid rgba(255, 168, 82, 0.25);
          color: var(--accent-peach);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        }

        .carousel-nav-btn:hover {
          background: rgba(255, 168, 82, 0.18);
          border-color: var(--accent-peach);
          color: #fff;
          transform: scale(1.08);
          box-shadow: 0 0 20px rgba(255, 168, 82, 0.3);
        }

        .artist-dots-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(13, 17, 27, 0.85);
          border: 1px solid rgba(255, 168, 82, 0.15);
          border-radius: 100px;
          padding: 0.35rem 0.6rem;
          backdrop-filter: blur(8px);
        }

        .artist-dot-pill {
          background: transparent;
          border: 1px solid transparent;
          border-radius: 100px;
          padding: 0.35rem 0.85rem;
          cursor: pointer;
          font-family: var(--font-headings);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          transition: all 0.25s ease;
        }

        .artist-dot-pill:hover {
          color: var(--accent-peach);
        }

        .artist-dot-pill.dot-active {
          background: rgba(255, 168, 82, 0.16);
          border-color: rgba(255, 168, 82, 0.4);
          color: var(--accent-peach);
        }
      `}</style>
    </section>
  );
}
