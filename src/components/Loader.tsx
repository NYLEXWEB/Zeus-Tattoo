"use client";

import React, { useEffect, useState, useRef } from "react";

const CRITICAL_ASSETS = [
  "/assets/logo.png",
  "/assets/hero-bg.jpg",
  "/scrolling-video/desktop/poster.webp",
  "/assets/about-us.jpg",
  "/assets/tattoo-ganesha.jpg",
  "/assets/tattoo-jesus.png",
  "/assets/tattoo-boat.png",
  "/assets/tattoo-flowers.png",
  "/assets/tattoo-date.png",
  "/assets/piercing-1.jpg",
  "/assets/piercing-2.jpg",
  "/assets/piercing-3.jpg",
  "/assets/piercing-4.jpg",
  "/assets/piercing-5.jpg",
  "/assets/studio-1.jpg",
  "/assets/studio-2.jpg",
  "/assets/studio-3.jpg",
  "/assets/studio-4.jpg",
  "/assets/studio-5.jpg",
  "/assets/moment-1.jpg",
  "/assets/moment-2.jpg",
  "/assets/service-microblading.jpg",
  "/assets/service-lip.jpg",
  "/images/artist_arjun.jpg",
  "/images/artist_meera.jpg",
  "/images/artist_rahul.jpg",
  "/images/artist_sahana.jpg",
];

export default function Loader() {
  const [displayPercent, setDisplayPercent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const targetPercentRef = useRef(0);
  const currentPercentRef = useRef(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let isMounted = true;
    let loadedCount = 0;
    const isDesktop = typeof window !== "undefined" && window.innerWidth > 1024;
    const totalAssets = CRITICAL_ASSETS.length + (isDesktop ? 1 : 0);

    // Smooth counter animation loop synced with real progress
    const animInterval = setInterval(() => {
      if (currentPercentRef.current < targetPercentRef.current) {
        currentPercentRef.current = Math.min(
          targetPercentRef.current,
          currentPercentRef.current + Math.max(1, Math.ceil((targetPercentRef.current - currentPercentRef.current) * 0.25))
        );
        setDisplayPercent(currentPercentRef.current);
      }

      if (currentPercentRef.current >= 100 && targetPercentRef.current >= 100) {
        clearInterval(animInterval);
        setTimeout(() => {
          if (!isMounted) return;
          setFadeOut(true);
          document.body.style.overflow = "unset";
          setTimeout(() => {
            if (isMounted) setVisible(false);
          }, 750);
        }, 300);
      }
    }, 25);

    const updateRealProgress = () => {
      loadedCount++;
      const realP = Math.min(100, Math.floor((loadedCount / totalAssets) * 100));
      targetPercentRef.current = realP;
    };

    // 1. Preload each critical image asset
    CRITICAL_ASSETS.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.complete) {
        updateRealProgress();
      } else {
        img.onload = updateRealProgress;
        img.onerror = updateRealProgress;
      }
    });

    // 2. Preload desktop hero video buffer on desktop screens
    if (isDesktop) {
      const testVid = document.createElement("video");
      testVid.preload = "auto";
      testVid.src = "/scrolling-video/desktop/hero-desktop.mp4";
      testVid.onloadeddata = updateRealProgress;
      testVid.oncanplay = updateRealProgress;
      testVid.onerror = updateRealProgress;
    }

    // 3. Wait for web fonts & DOM ready state
    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (targetPercentRef.current < 40 && loadedCount > 0) {
          targetPercentRef.current = Math.max(targetPercentRef.current, 45);
        }
      });
    }

    // Safety timeout in case of slow network
    const safetyTimeout = setTimeout(() => {
      targetPercentRef.current = 100;
    }, 3800);

    return () => {
      isMounted = false;
      clearInterval(animInterval);
      clearTimeout(safetyTimeout);
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`loader-wrapper ${fadeOut ? "fade-out" : ""}`}>
      <div className="loader-content">
        <div className="loader-logo-container">
          <div className="loader-logo-glow" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo.png"
            alt="Zeus Tattoo Logo Loader"
            className="loader-logo"
          />
        </div>
        <h2 className="loader-brand-title">Zeus Tattoo</h2>
        <div className="loader-counter">
          <span className="counter-num">
            {displayPercent.toString().padStart(3, "0")}
          </span>
          <span className="counter-percent">%</span>
        </div>
        <div className="loader-progress-track">
          <div
            style={{ width: `${displayPercent}%` }}
            className="loader-progress-bar"
          />
        </div>
        <div className="loader-footer-label">
          Olympian Craftsmanship • Kottayam
        </div>
      </div>

      <style jsx>{`
        .loader-wrapper {
          z-index: 99999;
          opacity: 1;
          visibility: visible;
          background-color: #07090e;
          justify-content: center;
          align-items: center;
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            visibility 0.75s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          position: fixed;
          inset: 0;
        }
        .loader-wrapper.fade-out {
          opacity: 0;
          visibility: hidden;
        }
        .loader-content {
          user-select: none;
          flex-direction: column;
          align-items: center;
          display: flex;
        }
        .loader-logo-container {
          justify-content: center;
          align-items: center;
          width: 140px;
          height: 140px;
          margin-bottom: 2rem;
          display: flex;
          position: relative;
        }
        .loader-logo {
          object-fit: contain;
          z-index: 2;
          filter: drop-shadow(0 0 20px #ffa8524d);
          width: 100px;
          height: 100px;
          animation: 2.5s ease-in-out infinite logoPulse;
          position: relative;
        }
        .loader-logo-glow {
          background-color: var(--accent-peach-glow);
          filter: blur(35px);
          z-index: 1;
          border-radius: 50%;
          width: 110px;
          height: 110px;
          animation: 2.5s ease-in-out infinite alternate glowPulse;
          position: absolute;
        }
        .loader-brand-title {
          font-family: var(--font-headings);
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 3.5rem;
          margin-left: 0.4em;
          font-size: 1rem;
          font-weight: 800;
          animation: 2.5s ease-in-out infinite textOpacityPulse;
        }
        .loader-counter {
          align-items: flex-end;
          margin-bottom: 1.5rem;
          font-family: monospace;
          display: flex;
        }
        .counter-num {
          color: var(--text-main);
          letter-spacing: 0.05em;
          font-size: 3.2rem;
          font-weight: 300;
          line-height: 1;
        }
        .counter-percent {
          color: var(--accent-peach);
          margin-bottom: 0.4rem;
          margin-left: 0.2rem;
          font-size: 1.2rem;
        }
        .loader-progress-track {
          background: #ffa85214;
          border-radius: 100px;
          width: 180px;
          height: 1px;
          margin-bottom: 5rem;
          overflow: hidden;
        }
        .loader-progress-bar {
          background: linear-gradient(
            to right,
            transparent,
            var(--accent-peach),
            var(--accent-peach-bright)
          );
          border-radius: inherit;
          height: 100%;
          transition: width 0.15s ease-out;
          box-shadow: 0 0 10px #ffa85299;
        }
        .loader-footer-label {
          text-transform: uppercase;
          letter-spacing: 0.5em;
          color: #f8fafc40;
          margin-left: 0.5em;
          font-size: 0.6rem;
          font-weight: 600;
        }
        @keyframes logoPulse {
          0% {
            transform: scale(0.95);
          }
          50% {
            transform: scale(1.03);
          }
          to {
            transform: scale(0.95);
          }
        }
        @keyframes glowPulse {
          0% {
            opacity: 0.4;
            transform: scale(0.8);
          }
          to {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
        @keyframes textOpacityPulse {
          0% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.85;
          }
          to {
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}
