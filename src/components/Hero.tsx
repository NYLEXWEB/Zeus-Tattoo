"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface HeroProps {
  onOpenBooking?: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentOverlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const targetTimeRef = useRef(0);
  const targetProgressRef = useRef(0);
  const isSeekingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  // Responsive device check: <= 1024px uses the classic static hero with background image
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll-Driven Video Scrub Engine (Active on both desktop & mobile)
  useEffect(() => {
    let isHeroInView = true;
    let lastSeekTime = 0;
    let prevProgress = -1;

    // Observe hero visibility to completely shut off RAF & decoding when scrolled away
    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroInView = entry.isIntersecting;
        if (isHeroInView && !rafIdRef.current) {
          rafIdRef.current = requestAnimationFrame(updateLoop);
        }
      },
      { rootMargin: "100px" }
    );

    if (trackRef.current) {
      observer.observe(trackRef.current);
    }

    const handleScroll = () => {
      if (!trackRef.current || !isHeroInView) return;
      const rect = trackRef.current.getBoundingClientRect();
      const trackHeight = rect.height - window.innerHeight;
      if (trackHeight <= 0) return;

      const scrolled = -rect.top;
      // Clamp progress precisely between 0 and 1
      const progress = Math.max(0, Math.min(1, scrolled / trackHeight));
      targetProgressRef.current = progress;
      
      const video = videoRef.current;
      const duration =
        video && video.duration && !isNaN(video.duration) && video.duration > 0
          ? video.duration
          : 9.0;
      targetTimeRef.current = progress * duration;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    // High-performance, throttled requestAnimationFrame scrub loop
    const updateLoop = () => {
      if (!isHeroInView) {
        rafIdRef.current = null;
        return;
      }

      const video = videoRef.current;
      const targetTime = targetTimeRef.current;
      const progress = targetProgressRef.current;
      const now = performance.now();

      // Hardware-friendly video seek throttled to 30fps max (32ms) to prevent GPU decode bottlenecks
      const isSeekingLocked = isSeekingRef.current && (now - lastSeekTime < 50);
      if (video && video.readyState >= 1 && !isSeekingLocked && now - lastSeekTime > 30) {
        const diff = Math.abs(video.currentTime - targetTime);
        if (diff > 0.02) {
          lastSeekTime = now;
          try {
            video.currentTime = targetTime;
          } catch {
            // Ignore transient seek errors
          }
        }
      }

      // Smooth hero content fade & translation during initial scroll (0% -> 22%)
      if (contentOverlayRef.current && (prevProgress <= 0.25 || progress <= 0.25)) {
        const opacity = Math.max(0, Math.min(1, 1 - progress / 0.18));
        const translateY = -(progress * 120);
        contentOverlayRef.current.style.opacity = opacity.toString();
        contentOverlayRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
        contentOverlayRef.current.style.pointerEvents = opacity < 0.08 ? "none" : "auto";
      }

      // Scroll hint pill fades out swiftly (0% -> 10%)
      if (scrollIndicatorRef.current && (prevProgress <= 0.12 || progress <= 0.12)) {
        const cueOpacity = Math.max(0, Math.min(1, 1 - progress / 0.08));
        scrollIndicatorRef.current.style.opacity = cueOpacity.toString();
        scrollIndicatorRef.current.style.pointerEvents = cueOpacity < 0.08 ? "none" : "auto";
      }

      prevProgress = progress;
      rafIdRef.current = requestAnimationFrame(updateLoop);
    };

    rafIdRef.current = requestAnimationFrame(updateLoop);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isMobile]);

  const handleBookingClick = (e: React.MouseEvent) => {
    if (onOpenBooking) {
      e.preventDefault();
      onOpenBooking();
    }
  };

  const handleVideoCanPlay = useCallback(() => {
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTimeRef.current;
    }
  }, []);

  return (
    <section
      id="home"
      className={`hero-main-container ${isMobile ? "mobile-scroll-mode" : "desktop-scroll-mode"}`}
      ref={trackRef}
    >
      <div className="hero-sticky-viewport">
        {/* Background Ambient Glow */}
        <div className="hero-ambient-glow" />

        {/* Video Canvas */}
        <div className="hero-video-wrapper">
          <video
            ref={videoRef}
            playsInline
            muted
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            onCanPlay={handleVideoCanPlay}
            onSeeking={() => {
              isSeekingRef.current = true;
            }}
            onSeeked={() => {
              isSeekingRef.current = false;
            }}
            poster={isMobile ? undefined : "/scrolling-video/desktop/poster.webp"}
            className={`hero-video ${videoLoaded ? "loaded" : ""}`}
            key={isMobile ? "hero-vid-mobile" : "hero-vid-desktop"}
          >
            {isMobile ? (
              <source
                src="/scrolling-video/mobile/flow-1a1f07c4-bc50-446a-bce2-.mp4"
                type="video/mp4"
              />
            ) : (
              <>
                <source
                  src="/scrolling-video/desktop/hero-desktop.mp4"
                  type="video/mp4"
                />
                <source
                  src="/scrolling-video/desktop/hero-desktop.webm"
                  type="video/webm"
                />
              </>
            )}
          </video>
          {/* Cinematic Vignette Overlay */}
          <div className="hero-vignette" />
        </div>

        {/* Hero Content Layer */}
        <div className="hero-content-layer" ref={contentOverlayRef}>
          {!isMobile ? (
            <div className="container hero-container-grid">
              <div className="hero-content">
                <h1 className="hero-title">
                  Chiseled by <span className="lightning-text">Lightning</span>,
                  <br />
                  Inked for Eternity
                </h1>

                <div className="hero-actions">
                  <a
                    href="#booking"
                    onClick={handleBookingClick}
                    className="btn-primary"
                  >
                    Book Free Consultation
                  </a>
                  <a href="#services" className="btn-secondary">
                    Explore Offerings
                  </a>
                </div>
                <div className="hero-stats">
                  <div className="stat-item">
                    <span className="stat-number">5.0</span>
                    <span className="stat-label">Google Rating</span>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat-item">
                    <span className="stat-number">150+</span>
                    <span className="stat-label">Verified Reviews</span>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat-item">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">Sterility Rate</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="container hero-mobile-container">
              <div className="hero-content">
                <h1 className="hero-title">
                  Chiseled by <span className="lightning-text">Lightning</span>,
                  <br />
                  Inked for Eternity
                </h1>
              
                <div className="hero-actions">
                  <a
                    href="#booking"
                    onClick={handleBookingClick}
                    className="btn-primary"
                  >
                    Book Free Consultation
                  </a>
                  <a href="#services" className="btn-secondary">
                    Explore Offerings
                  </a>
                </div>
                <div className="hero-stats">
                  <div className="stat-item">
                    <span className="stat-number">5.0</span>
                    <span className="stat-label">Google Rating</span>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat-item">
                    <span className="stat-number">150+</span>
                    <span className="stat-label">Verified Reviews</span>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat-item">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">Sterility Rate</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>


      </div>

      <style jsx>{`
        /* Desktop & Mobile Scroll Track */
        .hero-main-container,
        .desktop-scroll-mode,
        .mobile-scroll-mode {
          position: relative;
          height: 350vh;
          background-color: #07090e;
        }

        .hero-sticky-viewport {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          display: flex;
          align-items: center;
          background-color: #07090e;
        }

        .hero-ambient-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(
            circle,
            rgba(255, 168, 82, 0.12) 0%,
            rgba(255, 168, 82, 0) 70%
          );
          top: 20%;
          left: 10%;
          filter: blur(60px);
          pointer-events: none;
          z-index: 1;
        }

        .hero-video-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 2;
          background-color: #000;
        }

        .hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          opacity: 0.95;
          transition: opacity 0.4s ease;
        }

        .hero-video.loaded {
          opacity: 1;
        }

        .hero-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(7, 9, 14, 0.92) 0%,
            rgba(7, 9, 14, 0.78) 38%,
            rgba(7, 9, 14, 0.35) 68%,
            rgba(7, 9, 14, 0.15) 100%
          ),
          radial-gradient(
            ellipse at center,
            transparent 50%,
            rgba(7, 9, 14, 0.65) 100%
          );
          pointer-events: none;
          z-index: 3;
        }

        .hero-content-layer {
          position: relative;
          z-index: 10;
          width: 100%;
          will-change: opacity, transform;
          transition: transform 0.05s linear;
        }

        .hero-container-grid {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          align-items: center;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero-badge {
          font-family: var(--font-headings);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--accent-peach);
          background: #ffa8520d;
          border: 1px solid #ffa85226;
          border-radius: 100px;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          padding: 0.45rem 1.1rem;
          font-size: 0.72rem;
          font-weight: 700;
          display: inline-flex;
          width: fit-content;
          backdrop-filter: blur(8px);
        }

        .hero-title {
          font-family: var(--font-headings);
          text-transform: uppercase;
          letter-spacing: 0.02em;
          margin-bottom: 1rem;
          font-size: clamp(2.3rem, 3.8vw, 3.6rem);
          font-weight: 900;
          line-height: 1.12;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
        }

        .hero-description {
          font-family: var(--font-desc);
          color: #cbd5e1;
          max-width: 540px;
          margin-bottom: 1.8rem;
          font-size: clamp(0.9rem, 1.1vw, 1.02rem);
          line-height: 1.6;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
        }

        .hero-actions {
          flex-wrap: wrap;
          gap: 1.25rem;
          margin-bottom: 2.2rem;
          display: flex;
          align-items: center;
        }

        .hero-stats {
          align-items: center;
          gap: 1.8rem;
          display: flex;
        }

        .stat-item {
          flex-direction: column;
          display: flex;
        }

        .stat-number {
          font-family: var(--font-headings);
          color: var(--accent-peach);
          text-shadow: 0 0 15px #ffa85233;
          font-size: clamp(1.6rem, 2.2vw, 1.95rem);
          font-weight: 800;
          line-height: 1;
        }

        .stat-label {
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #94a3b8;
          font-size: 0.7rem;
          margin-top: 0.25rem;
        }

        .stat-divider {
          background-color: #ffa85226;
          width: 1px;
          height: 30px;
        }

        .scroll-indicator-container {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 12;
          will-change: opacity;
          transition: opacity 0.2s ease;
        }

        .scroll-pill {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.45rem 1rem;
          background: rgba(7, 9, 14, 0.75);
          border: 1px solid rgba(255, 168, 82, 0.25);
          border-radius: 100px;
          backdrop-filter: blur(10px);
        }

        .scroll-pill-text {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent-peach);
        }

        .scroll-chevron-track {
          display: flex;
          align-items: center;
          animation: bounceChevron 2s infinite ease-in-out;
        }

        .scroll-chevron {
          color: var(--accent-peach);
          font-size: 0.8rem;
          font-weight: 900;
        }

        @keyframes bounceChevron {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(4px);
          }
        }

        /* MOBILE SCROLL MODE: Portrait Video & Cinematic Layout */
        .mobile-scroll-mode .hero-vignette {
          background: linear-gradient(
            180deg,
            rgba(7, 9, 14, 0.88) 0%,
            rgba(7, 9, 14, 0.45) 25%,
            rgba(7, 9, 14, 0.40) 70%,
            rgba(7, 9, 14, 0.92) 100%
          ),
          radial-gradient(
            ellipse at center,
            rgba(7, 9, 14, 0.15) 0%,
            rgba(7, 9, 14, 0.65) 100%
          );
        }

        .mobile-scroll-mode .hero-ambient-glow {
          width: 320px;
          height: 320px;
          top: 15%;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0.18;
        }

        .mobile-scroll-mode .scroll-indicator-container {
          bottom: 1.25rem;
        }

        .hero-mobile-container {
          text-align: center;
          padding: 0 1.25rem;
          max-width: 580px;
          margin: 0 auto;
        }

        .hero-mobile-container .hero-badge {
          margin-left: auto;
          margin-right: auto;
        }

        .hero-mobile-container .hero-description {
          margin-left: auto;
          margin-right: auto;
          font-size: clamp(0.82rem, 2.5vw, 0.92rem);
          line-height: 1.5;
          margin-bottom: 1.2rem;
          color: #cbd5e1;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
        }

        .hero-mobile-container .hero-title {
          font-size: clamp(1.85rem, 6.2vw, 2.45rem);
          margin-bottom: 0.75rem;
        }

        .hero-mobile-container .hero-actions {
          justify-content: center;
          margin-bottom: 1.4rem;
          gap: 0.75rem;
        }

        .hero-mobile-container .hero-stats {
          justify-content: center;
          gap: 1.1rem;
        }

        .hero-mobile-container .stat-number {
          font-size: 1.35rem;
        }

        .hero-mobile-container .stat-label {
          font-size: 0.62rem;
        }

        /* Accessibility: Respect Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .desktop-scroll-mode,
          .mobile-scroll-mode {
            height: 100vh;
          }
          .scroll-indicator-container {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
