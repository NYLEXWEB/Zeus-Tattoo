"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  onOpenBooking?: () => void;
}

interface SingleWordSlide {
  eyebrow: string;
  word: string;
  buttonLabel: string;
  buttonTarget: string;
  isBooking?: boolean;
}

const HERO_SLIDES: SingleWordSlide[] = [
  {
    eyebrow: "BESPOKE TATTOO ARTISTRY",
    word: "ZEUS",
    buttonLabel: "Book Consultation",
    buttonTarget: "#booking",
    isBooking: true,
  },
  {
    eyebrow: "SURGICAL GRADE SANCTUARY",
    word: "PRECISION",
    buttonLabel: "Explore Artists",
    buttonTarget: "#artists",
  },
  {
    eyebrow: "PERMANENT MASTERPIECE",
    word: "IMMORTAL",
    buttonLabel: "Claim Your Session",
    buttonTarget: "#booking",
    isBooking: true,
  },
];

export default function Hero({ onOpenBooking }: HeroProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);

  // Progressive scroll animation references (Zero layout thrashing)
  const targetProgressRef = useRef<number>(0);
  const smoothProgressRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const pendingTimeRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Direct element references for 60-120 FPS hardware-accelerated transforms
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile((prev) => {
        if (prev !== mobile && videoRef.current) {
          // Re-arm video when switching view modes
          setTimeout(() => {
            videoRef.current?.load();
          }, 50);
        }
        return mobile;
      });
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleScrollTo = useCallback(
    (e: React.MouseEvent, targetId: string, isBooking?: boolean) => {
      e.preventDefault();
      if (isBooking && onOpenBooking) {
        onOpenBooking();
        return;
      }
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      if (window.__lenis) {
        window.__lenis.scrollTo(targetEl as HTMLElement, {
          offset: -80,
          duration: 1.0,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        const top =
          targetEl.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    [onOpenBooking]
  );

  // High-Precision Zero-Lag Video Scrubbing & Single-Word Transitions
  useEffect(() => {
    const track = trackRef.current;
    const video = videoRef.current;
    if (!track || !video) return;

    let activeInView = true;

    const viewObserver = new IntersectionObserver(
      ([entry]) => {
        activeInView = entry.isIntersecting;
        if (activeInView && !rafIdRef.current) {
          rafIdRef.current = requestAnimationFrame(updateLoop);
        }
      },
      { rootMargin: "120px" }
    );
    viewObserver.observe(track);

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: 0,
      onUpdate: (self) => {
        targetProgressRef.current = self.progress;
      },
    });

    const performSeek = (targetTime: number) => {
      if (!video || video.readyState < 1) return;

      if (isSeekingRef.current) {
        pendingTimeRef.current = targetTime;
        return;
      }

      // Slightly wider seek delta on mobile (0.018s vs 0.012s) to maximize battery and prevent mobile GPU stalls
      const minDiff = isMobile ? 0.018 : 0.012;
      const diff = Math.abs(video.currentTime - targetTime);

      if (diff > minDiff) {
        isSeekingRef.current = true;
        try {
          video.currentTime = targetTime;
        } catch {
          isSeekingRef.current = false;
        }
      }
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (pendingTimeRef.current !== null) {
        const nextTime = pendingTimeRef.current;
        pendingTimeRef.current = null;
        performSeek(nextTime);
      }
    };

    video.addEventListener("seeked", handleSeeked);

    if (video.readyState >= 1) {
      setVideoLoaded(true);
    }

    const updateLoop = () => {
      if (!activeInView) {
        rafIdRef.current = null;
        return;
      }

      const target = targetProgressRef.current;
      const current = smoothProgressRef.current;

      // Smooth progress lerp: slightly faster response on mobile touch
      const lerpFactor = isMobile ? 0.18 : 0.16;
      const smooth = current + (target - current) * lerpFactor;
      smoothProgressRef.current = smooth;

      // 1. Video scrubbing: High-precision native frames
      const duration =
        video.duration && !isNaN(video.duration) && video.duration > 0
          ? video.duration
          : 9.0;

      const targetTime = Math.max(
        0.01,
        Math.min(duration - 0.03, smooth * duration)
      );
      performSeek(targetTime);

      // 2. Single-Word Slide Transitions
      HERO_SLIDES.forEach((_, idx) => {
        const el = slideRefs.current[idx];
        if (!el) return;

        const m = computeSlideMetrics(smooth, idx);

        if (m.opacity <= 0.001) {
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
          el.style.visibility = "hidden";
        } else {
          el.style.visibility = "visible";
          el.style.opacity = m.opacity.toFixed(3);
          el.style.transform = `translate3d(0, ${m.translateY.toFixed(1)}px, 0) scale(${m.scale.toFixed(3)})`;
          el.style.pointerEvents = m.opacity > 0.4 ? "auto" : "none";
        }
      });

      // 3. Scroll Pill Fade Out on Initial Scroll
      if (scrollIndicatorRef.current) {
        const pillOpacity = Math.max(0, Math.min(1, 1 - smooth / 0.07));
        scrollIndicatorRef.current.style.opacity = pillOpacity.toFixed(2);
        scrollIndicatorRef.current.style.pointerEvents =
          pillOpacity < 0.1 ? "none" : "auto";
        scrollIndicatorRef.current.style.transform = `translateX(-50%) translate3d(0, ${(
          (1 - pillOpacity) *
          12
        ).toFixed(1)}px, 0)`;
      }

      rafIdRef.current = requestAnimationFrame(updateLoop);
    };

    rafIdRef.current = requestAnimationFrame(updateLoop);

    return () => {
      viewObserver.disconnect();
      trigger.kill();
      video.removeEventListener("seeked", handleSeeked);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isMobile]);

  const handleVideoLoadedData = useCallback(() => {
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0.01;
    }
  }, []);

  return (
    <section
      id="home"
      suppressHydrationWarning={true}
      className={`hero-main-container ${
        isMobile ? "mobile-scroll-mode" : "desktop-scroll-mode"
      }`}
      ref={trackRef}
    >
      <div className="hero-sticky-viewport">
        {/* Crystal-Clear 4K Native Video Presentation */}
        <div className="hero-video-wrapper">
          <video
            ref={videoRef}
            playsInline
            muted
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            onLoadedData={handleVideoLoadedData}
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

        {/* Sophisticated Cinema Lighting Scrims */}
        <div className="hero-cinema-aura" />
        <div className="hero-top-scrim" />
        <div className="hero-bottom-scrim" />

        {/* Minimal Single-Word Typography & Radiant Gold Button Stage */}
        <div className="hero-content-stage">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={idx}
              ref={(el) => {
                slideRefs.current[idx] = el;
              }}
              className="hero-slide-pane"
              style={{
                opacity: idx === 0 ? 1 : 0,
                transform: idx === 0 ? "translate3d(0, 0px, 0)" : "translate3d(0, 25px, 0)",
                visibility: idx === 0 ? "visible" : "hidden",
              }}
            >
              {/* Luxury Studio Eyebrow */}
              <span className="hero-eyebrow font-serif">{slide.eyebrow}</span>

              {/* Single Monumental Luxury Word */}
              <h1 className="hero-single-word font-serif">
                {slide.word}
              </h1>

              {/* Luminous Gold Luxury Button */}
              <div className="hero-button-wrap">
                <a
                  href={slide.buttonTarget}
                  onClick={(e) =>
                    handleScrollTo(e, slide.buttonTarget, slide.isBooking)
                  }
                  className="btn-luxury-gold font-serif"
                >
                  <span className="btn-shine-sweep" />
                  <span className="btn-label-text">{slide.buttonLabel}</span>
                  <span className="btn-arrow">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Refined Minimal Scroll Indicator */}
        <div className="scroll-indicator-container" ref={scrollIndicatorRef}>
          <div className="scroll-pill">
            <span className="scroll-pill-text font-serif">Scroll to explore</span>
            <span className="scroll-chevron">↓</span>
          </div>
        </div>
      </div>

      <style>{`
        .hero-main-container {
          position: relative;
          background-color: #07090e;
          width: 100%;
          max-width: 100vw;
          overflow-x: clip;
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
          min-height: 100dvh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #07090e;
          z-index: 2;
          box-sizing: border-box;
          padding-top: env(safe-area-inset-top, 0px);
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }

        /* 4K Crystal-Clear Video Wrapper with Cinema Contrast Calibration */
        .hero-video-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
          background-color: #05070a;
        }

        .hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          opacity: 1;
          filter: contrast(1.1) saturate(1.14) brightness(0.92);
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          will-change: transform;
        }

        /* Cinema Atmospheric Depth: Soft center spotlight & edge calibration */
        .hero-cinema-aura {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(7, 9, 14, 0.15) 0%,
            rgba(7, 9, 14, 0.45) 75%,
            rgba(7, 9, 14, 0.72) 100%
          );
        }

        .hero-top-scrim {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 130px;
          z-index: 3;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(7, 9, 14, 0.65) 0%,
            rgba(7, 9, 14, 0.2) 60%,
            transparent 100%
          );
        }

        .hero-bottom-scrim {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 130px;
          z-index: 3;
          pointer-events: none;
          background: linear-gradient(
            to top,
            rgba(7, 9, 14, 0.7) 0%,
            rgba(7, 9, 14, 0.2) 60%,
            transparent 100%
          );
        }

        /* Central Stage: Perfectly Centered with Optical Balance on Mobile */
        .hero-content-stage {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1200px;
          padding: 0 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .hero-content-stage {
            padding: 0 1rem;
            padding-top: 1.5rem;
          }
        }

        .hero-slide-pane {
          position: absolute;
          width: 100%;
          max-width: 960px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          will-change: transform, opacity;
          box-sizing: border-box;
          padding: 0 0.5rem;
        }

        /* Studio Eyebrow */
        .hero-eyebrow {
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 0.85rem;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.8);
          display: inline-block;
          max-width: 90vw;
        }

        @media (max-width: 768px) {
          .hero-eyebrow {
            font-size: 0.65rem;
            letter-spacing: 0.22em;
            margin-bottom: 0.6rem;
          }
        }

        @media (max-width: 420px) {
          .hero-eyebrow {
            font-size: 0.58rem;
            letter-spacing: 0.18em;
            margin-bottom: 0.45rem;
          }
        }

        /* Single Word Monumental Headline - Never Wraps, Perfectly Scaled */
        .hero-single-word {
          font-size: clamp(4.2rem, 13vw, 9.8rem);
          line-height: 0.95;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #ffffff;
          margin-bottom: 2.2rem;
          background: linear-gradient(180deg, #ffffff 45%, #e2e8f0 85%, #ffc285 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 4px 28px rgba(0, 0, 0, 0.75));
          white-space: nowrap;
          word-break: keep-all;
          max-width: 96vw;
        }

        @media (max-width: 768px) {
          .hero-single-word {
            font-size: clamp(2.6rem, 11vw, 4.2rem);
            letter-spacing: 0.08em;
            margin-bottom: 1.6rem;
          }
        }

        @media (max-width: 420px) {
          .hero-single-word {
            font-size: clamp(2.2rem, 10vw, 3.2rem);
            letter-spacing: 0.06em;
            margin-bottom: 1.4rem;
          }
        }

        @media (max-height: 680px) {
          .hero-single-word {
            font-size: clamp(2.2rem, 8.5vh, 3.4rem);
            margin-bottom: 1.1rem;
          }
        }

        /* Radiant Luminous Molten Gold Button */
        .hero-button-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .btn-luxury-gold {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, #ffd188 0%, #ffa852 50%, #d8812a 100%);
          color: #07090e;
          font-size: 0.88rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.55);
          box-shadow: 0 4px 25px rgba(255, 168, 82, 0.45),
            inset 0 1px 1px rgba(255, 255, 255, 0.6);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          max-width: 88vw;
        }

        .btn-luxury-gold:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 35px rgba(255, 168, 82, 0.65),
            inset 0 1px 1px rgba(255, 255, 255, 0.8);
        }

        .btn-luxury-gold:active {
          transform: translateY(1px) scale(0.97);
        }

        @media (max-width: 768px) {
          .btn-luxury-gold {
            padding: 0.85rem 2rem;
            font-size: 0.8rem;
            letter-spacing: 0.12em;
            gap: 0.6rem;
            min-height: 48px;
          }
        }

        @media (max-width: 420px) {
          .btn-luxury-gold {
            padding: 0.75rem 1.6rem;
            font-size: 0.75rem;
            letter-spacing: 0.1em;
          }
        }

        .btn-shine-sweep {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.45),
            transparent
          );
          transform: skewX(-20deg);
          animation: shineSweep 4.5s infinite ease-in-out;
        }

        @keyframes shineSweep {
          0%, 65% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }

        .btn-arrow {
          font-size: 1rem;
          font-weight: 900;
          transition: transform 0.25s ease;
        }

        .btn-luxury-gold:hover .btn-arrow {
          transform: translateX(4px);
        }

        /* Refined Minimal Scroll Indicator */
        .scroll-indicator-container {
          position: absolute;
          bottom: 2.2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 12;
          will-change: transform, opacity;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .scroll-indicator-container {
            bottom: clamp(1rem, 3.5vh, 1.8rem);
          }
        }

        @media (max-height: 680px) {
          .scroll-indicator-container {
            display: none;
          }
        }

        .scroll-pill {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.42rem 1.05rem;
          background: rgba(7, 9, 14, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 100px;
        }

        @media (max-width: 768px) {
          .scroll-pill {
            padding: 0.35rem 0.85rem;
            gap: 0.45rem;
          }
        }

        .scroll-pill-text {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.9);
        }

        @media (max-width: 768px) {
          .scroll-pill-text {
            font-size: 0.6rem;
            letter-spacing: 0.12em;
          }
        }

        .scroll-chevron {
          color: var(--accent-peach);
          font-size: 0.78rem;
          font-weight: 700;
          animation: bounceChevron 2s infinite ease-in-out;
        }

        @keyframes bounceChevron {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(3px);
          }
        }
      `}</style>
    </section>
  );
}

// Bulletproof slide metrics: Slide 0 is 100% VISIBLE AT PROGRESS 0!
function computeSlideMetrics(progress: number, slideIdx: number) {
  if (slideIdx === 0) {
    // Slide 0 (ZEUS): Fully visible at 0.0 -> 0.25, fades out 0.25 -> 0.35
    if (progress <= 0.25) {
      return { opacity: 1, translateY: 0, scale: 1 };
    }
    if (progress > 0.25 && progress < 0.35) {
      const t = (progress - 0.25) / 0.10;
      const ease = t * t * (3 - 2 * t);
      return { opacity: 1 - ease, translateY: -ease * 25, scale: 1 - ease * 0.03 };
    }
    return { opacity: 0, translateY: -25, scale: 0.97 };
  }

  if (slideIdx === 1) {
    // Slide 1 (PRECISION): Fades in 0.30 -> 0.38, active 0.38 -> 0.60, fades out 0.60 -> 0.70
    if (progress < 0.30) {
      return { opacity: 0, translateY: 25, scale: 0.97 };
    }
    if (progress >= 0.30 && progress < 0.38) {
      const t = (progress - 0.30) / 0.08;
      const ease = t * t * (3 - 2 * t);
      return { opacity: ease, translateY: (1 - ease) * 25, scale: 0.97 + ease * 0.03 };
    }
    if (progress >= 0.38 && progress <= 0.60) {
      return { opacity: 1, translateY: 0, scale: 1 };
    }
    if (progress > 0.60 && progress < 0.70) {
      const t = (progress - 0.60) / 0.10;
      const ease = t * t * (3 - 2 * t);
      return { opacity: 1 - ease, translateY: -ease * 25, scale: 1 - ease * 0.03 };
    }
    return { opacity: 0, translateY: -25, scale: 0.97 };
  }

  if (slideIdx === 2) {
    // Slide 2 (IMMORTAL): Fades in 0.68 -> 0.76, active 0.76 -> 0.90, fades out 0.90 -> 1.00
    if (progress < 0.68) {
      return { opacity: 0, translateY: 25, scale: 0.97 };
    }
    if (progress >= 0.68 && progress < 0.76) {
      const t = (progress - 0.68) / 0.08;
      const ease = t * t * (3 - 2 * t);
      return { opacity: ease, translateY: (1 - ease) * 25, scale: 0.97 + ease * 0.03 };
    }
    if (progress >= 0.76 && progress <= 0.90) {
      return { opacity: 1, translateY: 0, scale: 1 };
    }
    if (progress > 0.90 && progress <= 1.0) {
      const t = (progress - 0.90) / 0.10;
      const ease = t * t * (3 - 2 * t);
      return { opacity: 1 - ease, translateY: -ease * 25, scale: 1 - ease * 0.03 };
    }
    return { opacity: 0, translateY: -25, scale: 0.97 };
  }

  return { opacity: 0, translateY: 0, scale: 1 };
}
