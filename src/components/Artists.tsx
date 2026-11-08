"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";

const ChevronLeftIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const ArrowRightIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export interface ArtistItemData {
  id: string;
  image: string;
  name: string;
  role: string;
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
    image: "/images/IMG_20261103_134519.jpg",
    name: "SHAIBIN AS",
    role: "FOUNDER OF ZEUS & PIERCING ARTIST",
    experience: "FOUNDER OF ZEUS",
    description:
      "Founder of Zeus, passionate about body art and dedicated to providing professional piercing services.",
  },
  {
    id: "artist-2",
    image: "/images/IMG_20261103_134832.jpg",
    name: "JINS GEORGE",
    role: "SENIOR TATTOO ARTIST",
    experience: "10+ YEARS EXPERIENCE",
    description:
      "An experienced tattoo artist specializing in creating detailed, creative, and high-quality tattoo designs.",
  },
  {
    id: "artist-3",
    image: "/images/IMG_20261103_134938.jpg",
    name: "JYOTHIKA",
    role: "PIERCING ARTIST",
    experience: "",
    description:
      "A professional piercing artist focused on precision, hygiene, and delivering a comfortable piercing experience.",
  },
  {
    id: "artist-4",
    image: "/images/IMG_20261103_135021.jpg",
    name: "BIBIN GEORGE",
    role: "TATTOO ARTIST",
    experience: "5 YEARS EXPERIENCE",
    description:
      "A skilled tattoo artist with a passion for creative designs and quality tattoo craftsmanship.",
  },
  {
    id: "artist-5",
    image: "/images/IMG_20261103_134639.jpg",
    name: "SHAHALYA SHERIN",
    role: "TATTOO ARTIST",
    experience: "3 YEARS EXPERIENCE",
    description:
      "A creative tattoo artist dedicated to bringing unique ideas to life through detailed and expressive artwork.",
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
  const [isInView, setIsInView] = useState(true);
  const [windowWidth, setWindowWidth] = useState(1200);

  const angleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Synchronous status refs for zero-jitter continuous RAF loop
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isInViewRef = useRef(true);

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

  // Responsive 3D circle radii with balanced symmetrical margins
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const radiusX = isMobile
    ? Math.min(windowWidth * 0.38, 160)
    : isTablet
      ? Math.min(windowWidth * 0.33, 340)
      : Math.min(windowWidth * 0.31, 440);
  const radiusZ = isMobile ? 130 : isTablet ? 190 : 230;

  // Viewport intersection observer to track visibility
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        isInViewRef.current = entry.isIntersecting;
      },
      { rootMargin: "150px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // High performance continuous smooth slow auto-scroll to the left
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const isPaused =
        isHoveredRef.current ||
        isDraggingRef.current ||
        isPointerDown.current ||
        !isInViewRef.current;

      if (!isPaused) {
        // Continuous, gentle, slow glide to the left (~7.5 deg/sec, no interval stops)
        const ROTATION_SPEED = 7.5;
        targetAngleRef.current -= ROTATION_SPEED * dt;
        angleRef.current = targetAngleRef.current;
        setRotationAngle(angleRef.current);
      } else {
        // When hovered, dragged, or stepped via controls, smoothly lerp to target
        const diff = targetAngleRef.current - angleRef.current;
        if (Math.abs(diff) > 0.02) {
          angleRef.current += diff * 0.12;
          setRotationAngle(angleRef.current);
        } else if (angleRef.current !== targetAngleRef.current) {
          angleRef.current = targetAngleRef.current;
          setRotationAngle(angleRef.current);
        }
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  // Navigate to previous card (centers previous card)
  const handlePrev = useCallback(() => {
    const currentRounded = Math.round(targetAngleRef.current / ANGLE_STEP) * ANGLE_STEP;
    targetAngleRef.current = currentRounded + ANGLE_STEP;
  }, []);

  // Navigate to next card (centers next card)
  const handleNext = useCallback(() => {
    const currentRounded = Math.round(targetAngleRef.current / ANGLE_STEP) * ANGLE_STEP;
    targetAngleRef.current = currentRounded - ANGLE_STEP;
  }, []);

  // Direct artist selection to center front
  const handleSelectArtist = useCallback((targetIdx: number) => {
    let bestTarget = targetAngleRef.current;
    let minDiff = Infinity;
    ringCards.forEach((c, i) => {
      if (c.origIdx === targetIdx) {
        const cardCenterAngle = -i * ANGLE_STEP;
        const k = Math.round((targetAngleRef.current - cardCenterAngle) / 360);
        const candidateAngle = cardCenterAngle + k * 360;
        const diff = Math.abs(candidateAngle - targetAngleRef.current);
        if (diff < minDiff) {
          minDiff = diff;
          bestTarget = candidateAngle;
        }
      }
    });
    targetAngleRef.current = bestTarget;
  }, []);

  // Rotate specific card directly to front center on click
  const handleCardClick = (normAngle: number, e: React.MouseEvent) => {
    if (dragMoved.current) return;

    if (Math.abs(normAngle) < 14) {
      return;
    }

    e.preventDefault();
    const currentRounded = Math.round(targetAngleRef.current / ANGLE_STEP) * ANGLE_STEP;
    const snapOffset = Math.round(normAngle / ANGLE_STEP) * ANGLE_STEP;
    targetAngleRef.current = currentRounded - snapOffset;
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
      isDraggingRef.current = true;
      setIsDragging(true);
    }
    const sensitivity = isMobile ? 0.32 : 0.24;
    targetAngleRef.current = dragStartAngle.current + diff * sensitivity;
  };

  const handlePointerUp = () => {
    if (isPointerDown.current) {
      isPointerDown.current = false;
      isDraggingRef.current = false;
      setIsDragging(false);
      dragMoved.current = false;
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


      <div className="container ">
        {/* Section Header */}
        <div className="section-title-wrapper">
          <span className="section-subtitle">
            MASTERS OF THE CRAFT
          </span>
          <h2 className="section-title">MEET OUR ARTISTS</h2>
          <br />

        </div>
      </div>

      {/* 3D Circular Revolving Carousel Stage */}
      <div
        className="carousel-3d-stage"
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
        style={{ cursor: isDragging ? "grabbing" : "default" }}
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
                onMouseEnter={() => {
                  isHoveredRef.current = true;
                  setIsHovered(true);
                }}
                onMouseLeave={() => {
                  isHoveredRef.current = false;
                  setIsHovered(false);
                }}
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


                  </div>

                  {/* Information Panel */}
                  <div className="artist-details-box">
                    <span className="artist-role-label">{artist.role}</span>
                    <h3 className="artist-name-title">{artist.name}</h3>

                    <div className="artist-style-pill">
                      <span>{artist.experience}</span>
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
                        <ArrowRightIcon size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls: Arrows & Artist Pills */}
      <div className="carousel-controls-bar">
        <button
          className="artist-nav-btn nav-btn-left"
          onClick={handlePrev}
          aria-label="Previous Artist"
        >
          <ChevronLeftIcon size={20} />
        </button>

        <div className="artist-dots-container">
          {residentArtists.map((artist, idx) => (
            <button
              key={artist.id}
              onClick={() => handleSelectArtist(idx)}
              className={`artist-dot-pill ${activeArtistIndex === idx ? "dot-active" : ""}`}
            >
              {artist.name.split(" ")[0]}
            </button>
          ))}
        </div>

        <button
          className="artist-nav-btn nav-btn-right"
          onClick={handleNext}
          aria-label="Next Artist"
        >
          <ChevronRightIcon size={20} />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .artists-revolving-section {
          background-color: var(--bg-storm-dark);
          padding: 6rem 0 7rem;
          position: relative;
          overflow: hidden;
          padding-bottom: 2px;
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
          perspective: 1200px;
          perspective-origin: 50% 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          touch-action: pan-y;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .carousel-3d-stage {
            min-height: 520px;
            height: 540px;
            perspective: 900px;
            perspective-origin: 50% 50%;
          }
        }

        .carousel-ambient-spotlight {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 480px;
          height: 480px;
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

        /* Revolving Turntable Ring - Pinned strictly to viewport horizontal & vertical 50% center */
        .carousel-3d-turntable {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          transform-style: preserve-3d;
          display: block;
        }

        /* 3D Artist Card - Exact geometric center anchor */
        .artist-3d-card {
          position: absolute;
          top: 0;
          left: 0;
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
            width: 280px;
            height: 450px;
            margin-left: -140px;
            margin-top: -225px;
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
        .artist-3d-card.is-front-center {
          z-index: 45 !important;
          opacity: 1 !important;
        }

        .artist-3d-card.is-front-center .artist-card-inner {
          border-color: rgba(255, 168, 82, 0.65);
          box-shadow: 0 0 30px rgba(255, 168, 82, 0.2), 0 20px 45px rgba(0, 0, 0, 0.9);
        }

        .artist-3d-card.is-revolving-side .artist-card-inner {
          filter: brightness(0.7);
        }

        .artist-3d-card.is-revolving-side:hover .artist-card-inner {
          border-color: rgba(255, 168, 82, 0.35);
          filter: brightness(1);
        }

        @media (max-width: 640px) {
          .artist-3d-card.is-revolving-side {
            opacity: 0.28 !important;
            filter: brightness(0.6) blur(0.5px);
          }
        }

        /* Image Box */
        .artist-image-box {
          position: relative;
          width: 100%;
          height: 52%;
          overflow: hidden;

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

        .artist-nav-btn {
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

        .artist-nav-btn:hover {
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
      ` }} />
    </section>
  );
}
