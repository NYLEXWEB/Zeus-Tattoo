"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface HeroProps {
  onOpenBooking?: () => void;
}

export default function Hero(_props: HeroProps = {}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const targetTimeRef = useRef(0);
  const targetProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Performance-optimized scroll-driven video scrubbing
  useEffect(() => {
    let isHeroInView = true;
    let lastSeekTime = 0;
    let prevProgress = -1;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroInView = entry.isIntersecting;
        if (isHeroInView && !rafIdRef.current) {
          rafIdRef.current = requestAnimationFrame(updateLoop);
        }
      },
      { rootMargin: "80px" }
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

    // Throttled seeking to prevent video decoder hardware stalls
    const updateLoop = () => {
      if (!isHeroInView) {
        rafIdRef.current = null;
        return;
      }

      const video = videoRef.current;
      const targetTime = targetTimeRef.current;
      const progress = targetProgressRef.current;
      const now = performance.now();

      // With All-Intra 9:16 mobile portrait video, seeks decode instantly in <1ms
      const seekInterval = isMobile ? 25 : 33;
      const minDiff = isMobile ? 0.02 : 0.025;

      if (
        video &&
        video.readyState >= 1 &&
        !video.seeking &&
        now - lastSeekTime > seekInterval
      ) {
        const diff = Math.abs(video.currentTime - targetTime);
        if (diff > minDiff) {
          lastSeekTime = now;
          try {
            if ("fastSeek" in video && typeof (video as any).fastSeek === "function") {
              (video as any).fastSeek(targetTime);
            } else {
              video.currentTime = targetTime;
            }
          } catch {
            // Ignore transient seek errors
          }
        }
      }

      // Scroll hint pill fades out
      if (
        scrollIndicatorRef.current &&
        (prevProgress <= 0.12 || progress <= 0.12)
      ) {
        const cueOpacity = Math.max(0, Math.min(1, 1 - progress / 0.08));
        scrollIndicatorRef.current.style.opacity = cueOpacity.toFixed(2);
        scrollIndicatorRef.current.style.pointerEvents =
          cueOpacity < 0.08 ? "none" : "auto";
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

  const handleVideoCanPlay = useCallback(() => {
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTimeRef.current;
    }
  }, []);

  return (
    <section
      id="home"
      suppressHydrationWarning={true}
      className={`hero-main-container ${isMobile ? "mobile-scroll-mode" : "desktop-scroll-mode"
        }`}
      ref={trackRef}
    >
      <div className="hero-sticky-viewport">
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
            poster={
              isMobile
                ? "/scrolling-video/mobile/poster-portrait.webp"
                : "/scrolling-video/desktop/poster.webp"
            }
            className={`hero-video ${videoLoaded ? "loaded" : ""}`}
            src={
              isMobile
                ? "/scrolling-video/mobile/hero-mobile-portrait.mp4"
                : "/scrolling-video/desktop/hero-desktop.mp4"
            }
          />
        </div>

        {/* Clean subtle edge vignette */}
        <div className="hero-vignette-scrim" />

        {/* Subtle Scroll Hint */}
        <div className="scroll-indicator-container" ref={scrollIndicatorRef}>
          <div className="scroll-pill">
            <span className="scroll-pill-text">Scroll to explore</span>
            <div className="scroll-chevron-track">
              <span className="scroll-chevron">↓</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-main-container {
          position: relative;
          background-color: #07090e;
          width: 100%;
          max-width: 100%;
        }

        .desktop-scroll-mode {
          height: 300vh;
        }

        .mobile-scroll-mode {
          height: 220vh;
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
          z-index: 2;
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
          opacity: 1;
        }

        .scroll-indicator-container {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 12;
          will-change: opacity;
        }

        @media (max-width: 640px) {
          .scroll-indicator-container {
            bottom: 1.2rem;
          }
        }

        .scroll-pill {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.42rem 1rem;
          background: rgba(7, 9, 14, 0.88);
          border: 1px solid rgba(255, 168, 82, 0.25);
          border-radius: 100px;
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
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(4px);
          }
        }
      `}</style>
    </section>
  );
}
