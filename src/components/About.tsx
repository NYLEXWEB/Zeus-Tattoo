"use client";

import React, { useState, useRef } from "react";

interface AboutProps {
  onOpenBooking?: () => void;
}

export default function About({ onOpenBooking }: AboutProps) {
  const visualRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth <= 1024) return;
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    if (typeof window !== "undefined" && window.innerWidth > 1024) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="about"
      className="about-section"
      suppressHydrationWarning={true}
    >
      {/* Ambient background atmosphere glow */}
      <div className="about-ambient-glow glow-top" aria-hidden="true" />
      <div className="about-ambient-glow glow-bottom" aria-hidden="true" />
      <div className="ambient-particles" aria-hidden="true">
        <span className="particle p1" />
        <span className="particle p2" />
        <span className="particle p3" />
        <span className="particle p4" />
        <span className="particle p5" />
        <span className="particle p6" />
      </div>

      <div className="container">
        <div className="about-grid">
          {/* Left Visual Column */}
          <div
            className="about-visual"
            ref={visualRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Sacred Geometry Astrolabe & Circular Rotating Rings */}
            <div className="astrolabe-orbit-wrapper" aria-hidden="true">
              {/* Outer Celestial Astrolabe Ring */}
              <div className="astrolabe-ring astrolabe-outer-spin">
                <svg viewBox="0 0 540 540" className="astrolabe-svg">
                  <defs>
                    <path
                      id="aboutTextPath"
                      d="M 270, 270 m -215, 0 a 215,215 0 1,1 430,0 a 215,215 0 1,1 -430,0"
                    />
                  </defs>
                  <circle cx="270" cy="270" r="260" className="svg-ring-dashed" />
                  <circle cx="270" cy="270" r="240" className="svg-ring-thin" />
                  <line x1="270" y1="2" x2="270" y2="24" className="svg-crosshair" />
                  <line x1="270" y1="516" x2="270" y2="538" className="svg-crosshair" />
                  <line x1="2" y1="270" x2="24" y2="270" className="svg-crosshair" />
                  <line x1="516" y1="270" x2="538" y2="270" className="svg-crosshair" />
                  <text className="svg-orbital-text">
                    <textPath href="#aboutTextPath" startOffset="0%">
                      • ZEUS TATTOO SANCTUARY • KOTTAYAM • SACRED GEOMETRY • FOUNDER SHAIBIN •
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Inner Sacred Geometry Ring */}
              <div className="astrolabe-ring astrolabe-inner-spin">
                <span className="orbital-node node-1" />
                <span className="orbital-node node-2" />
                <span className="orbital-node node-3" />
                <span className="orbital-node node-4" />
                <svg viewBox="0 0 420 420" className="astrolabe-svg">
                  <circle cx="210" cy="210" r="200" className="svg-ring-dotted" />
                  <circle cx="210" cy="210" r="165" className="svg-ring-subtle" />
                  <polygon
                    points="210,45 352,290 68,290"
                    className="svg-sacred-triangle"
                  />
                </svg>
              </div>
            </div>

            {/* Floating Artwork Card */}
            <div
              className={`about-img-container ${isHovered ? "is-hovered" : "is-floating"}`}
              style={{
                transform: isHovered
                  ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
                  : undefined,
              }}
            >
              <div className="about-img-wrapper card-glass border-pulse">
                <div className="about-img-glow" />
                <div className="image-sheen-beam" aria-hidden="true" />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/about-us.jpg"
                  alt="Tattoo Artist at work in Zeus Tattoo Studio"
                  className="about-img"
                />

                {/* Bottom-Right Floating Badge */}
                <div className="about-badge badge-bottom-right">
                  <span className="badge-num">10+</span>
                  <span className="badge-txt">Years Crafting</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Narrative Column */}
          <div className="about-content">
            <div className="subtitle-container">
              <span className="section-subtitle">The Sanctuary</span>
            </div>

            <h2 className="section-title">Our Story</h2>

            <p className="about-lead">
              Founded by master artist Shaibin AS, our sanctuary in Kottayam
              bridges neoclassical illustration with hospital-grade clinical precision.
            </p>
            <p className="about-text">
              Every design is custom-chiseled to harmonize with your anatomical flow—uniting
              geometry, myth, and fine-line craftsmanship into permanent collectibles that endure.
            </p>

            {/* Living Stats with Travelling Laser Light Sweep */}
            <div className="about-stats">
              <div className="stats-laser-beam top-laser" aria-hidden="true" />
              <div className="stat-box">
                <span className="stat-number">100%</span>
                <span className="stat-label">Clinical Sterility</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">5K+</span>
                <span className="stat-label">Custom Works</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">10+</span>
                <span className="stat-label">Years Mastery</span>
              </div>
              <div className="stats-laser-beam bottom-laser" aria-hidden="true" />
            </div>

            <div className="about-action">
              <a
                href="#booking"
                onClick={handleBookingClick}
                className="btn-primary about-btn"
              >
                Request Consultation
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          background: linear-gradient(
            180deg,
            var(--bg-storm-dark) 0%,
            var(--bg-storm-medium) 100%
          );
          padding: 7rem 0;
          position: relative;
          overflow: hidden;
        }

        /* Ambient Lighting */
        .about-ambient-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
          z-index: 0;
        }
        .glow-top {
          top: 10%;
          left: -5%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(255, 168, 82, 0.14) 0%, transparent 70%);
          animation: ambientAuraFloat 18s ease-in-out infinite alternate;
        }
        .glow-bottom {
          bottom: 5%;
          right: -5%;
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, rgba(76, 163, 255, 0.1) 0%, transparent 70%);
          animation: ambientAuraFloat 22s ease-in-out infinite alternate-reverse;
        }

        /* Ink Dust Particles */
        .ambient-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }
        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--accent-peach);
          box-shadow: 0 0 8px var(--accent-peach);
          opacity: 0;
          animation: particleDrift 14s infinite linear;
        }
        .p1 { top: 20%; left: 15%; animation-delay: 0s; }
        .p2 { top: 65%; left: 25%; animation-delay: 3s; width: 2px; height: 2px; }
        .p3 { top: 40%; left: 45%; animation-delay: 6s; }
        .p4 { top: 80%; left: 70%; animation-delay: 1.5s; width: 4px; height: 4px; }
        .p5 { top: 15%; left: 85%; animation-delay: 8s; width: 2px; height: 2px; }
        .p6 { top: 50%; left: 90%; animation-delay: 4.5s; }

        @keyframes particleDrift {
          0% {
            transform: translateY(0) translateX(0) scale(0.8);
            opacity: 0;
          }
          20% {
            opacity: 0.7;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-80px) translateX(25px) scale(1.2);
            opacity: 0;
          }
        }

        .about-grid {
          grid-template-columns: minmax(0, 1fr);
          align-items: center;
          gap: 3.5rem;
          display: grid;
          position: relative;
          z-index: 2;
        }
        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.15fr);
            gap: 5rem;
          }
        }

        /* Left Visual Container */
        .about-visual {
          justify-content: center;
          align-items: center;
          width: 100%;
          display: flex;
          position: relative;
          perspective: 1000px;
        }

        /* Astrolabe & Sacred Geometry Rotating Orbit Rings */
        .astrolabe-orbit-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 520px;
          height: 520px;
          max-width: 90%;
          max-height: 90%;
          pointer-events: none;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 768px) {
          .astrolabe-orbit-wrapper {
            width: 360px;
            height: 360px;
            max-width: 88%;
            max-height: 88%;
          }
        }
        @media (max-width: 480px) {
          .astrolabe-orbit-wrapper {
            width: 280px;
            height: 280px;
            max-width: 85%;
            max-height: 85%;
          }
        }

        .astrolabe-ring {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform;
        }

        .astrolabe-outer-spin {
          animation: spinAstrolabe 48s linear infinite;
        }
        .astrolabe-inner-spin {
          animation: spinAstrolabeRev 34s linear infinite;
          width: 78%;
          height: 78%;
          margin: auto;
        }

        @keyframes spinAstrolabe {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinAstrolabeRev {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        .astrolabe-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .svg-ring-dashed {
          fill: none;
          stroke: #ffa852;
          stroke-width: 1px;
          stroke-dasharray: 4 9;
          opacity: 0.28;
        }
        .svg-ring-thin {
          fill: none;
          stroke: #ffa852;
          stroke-width: 0.75px;
          opacity: 0.18;
        }
        .svg-ring-dotted {
          fill: none;
          stroke: #4ca3ff;
          stroke-width: 1px;
          stroke-dasharray: 2 6;
          opacity: 0.22;
        }
        .svg-ring-subtle {
          fill: none;
          stroke: #ffa852;
          stroke-width: 0.5px;
          opacity: 0.14;
        }
        .svg-sacred-triangle {
          fill: none;
          stroke: #ffa852;
          stroke-width: 0.65px;
          opacity: 0.12;
        }
        .svg-crosshair {
          stroke: #ffa852;
          stroke-width: 1.5px;
          opacity: 0.45;
        }
        .svg-orbital-text {
          fill: #ffa852;
          font-family: var(--font-headings);
          font-size: 8.5px;
          letter-spacing: 0.28em;
          opacity: 0.32;
          font-weight: 600;
          text-transform: uppercase;
        }

        .orbital-node {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ffa852;
          box-shadow: 0 0 10px #ffa852, 0 0 20px rgba(255, 168, 82, 0.5);
        }
        .node-1 { top: 0%; left: 50%; transform: translate(-50%, -50%); }
        .node-2 { bottom: 0%; left: 50%; transform: translate(-50%, 50%); }
        .node-3 { top: 50%; left: 0%; transform: translate(-50%, -50%); background: #4ca3ff; box-shadow: 0 0 10px #4ca3ff; }
        .node-4 { top: 50%; right: 0%; transform: translate(50%, -50%); background: #4ca3ff; box-shadow: 0 0 10px #4ca3ff; }

        /* Floating Image Container */
        .about-img-container {
          width: 100%;
          max-width: 440px;
          position: relative;
          z-index: 5;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-img-container.is-floating {
          animation: organicFloat 6.5s ease-in-out infinite;
        }

        @keyframes organicFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(0.3deg);
          }
        }

        .about-img-wrapper {
          aspect-ratio: 2.7 / 4;
          background: linear-gradient(135deg, rgba(13, 17, 27, 0.95), rgba(21, 29, 45, 0.85));
          border: 1px solid rgba(255, 168, 82, 0.22);
          border-radius: 24px;
          width: 100%;
          padding: 0.75rem;
          transition: border-color 0.4s, box-shadow 0.4s;
          position: relative;
          overflow: visible;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
        }

        .about-img-glow {
          background: var(--accent-peach);
          filter: blur(100px);
          opacity: 0.12;
          pointer-events: none;
          z-index: 1;
          width: 240px;
          height: 240px;
          position: absolute;
          top: 20%;
          left: 20%;
        }

        .about-img {
          object-fit: cover;
          border-radius: 18px;
          width: 100%;
          height: 100%;
          display: block;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-img-wrapper:hover .about-img {
          transform: scale(1.03);
        }

        /* Diagonal Traveling Sheen */
        .image-sheen-beam {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          overflow: hidden;
          pointer-events: none;
          z-index: 3;
        }
        .image-sheen-beam::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -120%;
          width: 80%;
          height: 200%;
          background: linear-gradient(
            115deg,
            transparent 0%,
            rgba(255, 168, 82, 0) 30%,
            rgba(255, 168, 82, 0.1) 45%,
            rgba(255, 255, 255, 0.18) 50%,
            rgba(255, 168, 82, 0.1) 55%,
            rgba(255, 168, 82, 0) 70%,
            transparent 100%
          );
          transform: rotate(20deg);
          animation: sheenSlide 6.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes sheenSlide {
          0% {
            left: -120%;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          45% {
            left: 160%;
            opacity: 0;
          }
          100% {
            left: 160%;
            opacity: 0;
          }
        }

        /* Bottom-Right Floating Badge */
        .about-badge {
          background: linear-gradient(
            135deg,
            rgba(13, 17, 27, 0.95),
            rgba(21, 29, 45, 0.95)
          );
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          z-index: 10;
          border: 1px solid rgba(255, 168, 82, 0.35);
          border-radius: 18px;
          flex-direction: column;
          align-items: center;
          padding: 0.9rem 1.3rem;
          display: flex;
          position: absolute;
          bottom: 2rem;
          right: -1rem;
          box-shadow: 0 16px 35px rgba(0, 0, 0, 0.7);
        }

        @media (max-width: 768px) {
          .about-badge {
            bottom: 1.2rem;
            right: 0.5rem;
            padding: 0.75rem 1rem;
          }
        }

        .badge-num {
          font-family: var(--font-headings);
          color: var(--accent-peach);
          font-size: 1.5rem;
          font-weight: 800;
          line-height: 1;
        }
        .badge-txt {
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-top: 0.25rem;
          font-size: 0.62rem;
          font-weight: 700;
        }

        /* Right Narrative Column */
        .about-content {
          z-index: 10;
        }

        .subtitle-container {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.75rem;
        }

        .about-lead {
          font-family: var(--font-desc);
          color: var(--text-main);
          margin-bottom: 1.4rem;
          font-size: clamp(1rem, 1.3vw, 1.15rem);
          font-weight: 500;
          line-height: 1.6;
        }
        .about-text {
          font-family: var(--font-desc);
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          font-size: clamp(0.88rem, 1.1vw, 0.96rem);
          line-height: 1.7;
        }

        /* Stats with Running Laser Beam */
        .about-stats {
          position: relative;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin: 2.5rem 0;
          padding: 2rem 0;
          display: grid;
        }

        .stats-laser-beam {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(255, 168, 82, 0.15);
          overflow: hidden;
        }
        .top-laser {
          top: 0;
        }
        .bottom-laser {
          bottom: 0;
        }
        .stats-laser-beam::after {
          content: "";
          position: absolute;
          top: 0;
          left: -40%;
          width: 40%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            var(--accent-peach),
            #ffffff,
            var(--accent-peach),
            transparent
          );
          box-shadow: 0 0 8px var(--accent-peach);
          animation: laserTravel 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .bottom-laser::after {
          animation-delay: 2.25s;
        }

        @keyframes laserTravel {
          0% {
            left: -40%;
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

        @media (max-width: 480px) {
          .about-stats {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
