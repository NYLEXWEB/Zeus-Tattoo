"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Sparkles, Heart, Compass, Volume2 } from "lucide-react";

export default function Moments() {
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll position relative to the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Physics spring for buttery scroll parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    mass: 0.6,
  });

  // Parallax translation for the two cards on scroll
  const yCard1 = useTransform(smoothProgress, [0, 1], [60, -60]);
  const yCard2 = useTransform(smoothProgress, [0, 1], [-25, 80]);

  // Subtle rotation tied to scroll
  const rotCard1 = useTransform(smoothProgress, [0, 0.5, 1], [-2, -0.5, 1.2]);
  const rotCard2 = useTransform(smoothProgress, [0, 0.5, 1], [1.5, 0.2, -1.8]);

  // Ambient aura glow
  const glowY = useTransform(smoothProgress, [0, 1], [-50, 50]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.35, 0.65, 0.35]);

  // Audio equalizer bars data
  const eqBars = [
    { height: 12, dur: 0.9, delay: 0.1 },
    { height: 22, dur: 1.3, delay: 0.4 },
    { height: 16, dur: 0.7, delay: 0.2 },
    { height: 26, dur: 1.1, delay: 0.6 },
    { height: 14, dur: 0.8, delay: 0.15 },
    { height: 28, dur: 1.4, delay: 0.5 },
    { height: 18, dur: 1.0, delay: 0.3 },
    { height: 24, dur: 1.2, delay: 0.7 },
    { height: 10, dur: 0.75, delay: 0.25 },
    { height: 20, dur: 1.15, delay: 0.45 },
    { height: 27, dur: 1.35, delay: 0.1 },
    { height: 15, dur: 0.85, delay: 0.55 },
    { height: 23, dur: 1.05, delay: 0.35 },
    { height: 19, dur: 1.25, delay: 0.65 },
    { height: 11, dur: 0.7, delay: 0.2 },
    { height: 25, dur: 1.4, delay: 0.5 },
    { height: 17, dur: 0.95, delay: 0.15 },
    { height: 22, dur: 1.2, delay: 0.4 },
    { height: 13, dur: 0.8, delay: 0.3 },
    { height: 8, dur: 0.65, delay: 0.1 },
  ];

  return (
    <section ref={sectionRef} id="moments" className="moments-section">
      {/* Dynamic ambient background glow */}
      <motion.div
        className="ambient-aura"
        style={{
          y: glowY,
          opacity: glowOpacity,
        }}
        aria-hidden="true"
      />

      <div className="container">
        <div className="moments-grid">
          {/* Left: Narrative, Philosophy & Live Studio Soundscape */}
          <motion.div
            className="moments-info"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="badge-pill">
              <span>The Connection</span>
            </div>

            <h2 className="section-title">
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
                  <span>Aryan “Zeus”</span>
                  <span className="quote-location">Sanctuary Founder</span>
                </cite>
              </div>
            </div>



            {/* Aesthetic coordinates indicator */}
           
          </motion.div>

          {/* Right: Living Filmstrip Archive & Candid Cinema Cards */}
          <div className="moments-visuals">
            {/* Continuous Horizontal 35mm Filmstrip Ticker */}
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
              {/* Card 1 - Client Reflection (Ken-Burns Camera Drift + Staggered Zero-G Float) */}
              <motion.div
                className="moment-card card-first"
                style={{
                  y: yCard1,
                  rotateZ: rotCard1,
                }}
                initial={{ opacity: 0, y: 60, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="card-motion-wrapper float-drift-a">
                  <div className="card-inner">


                    <div className="card-pill-tag">
                      <span className="tag-number">01</span>
                      <span className="tag-sep">/</span>
                      <span className="tag-title">Quiet Reflection</span>
                    </div>

                    <div className="img-frame">
                      {/* Viewfinder Corner Reticles */}
                      <span className="viewfinder-corner corner-tl" />
                      <span className="viewfinder-corner corner-tr" />
                      <span className="viewfinder-corner corner-bl" />
                      <span className="viewfinder-corner corner-br" />

                      {/* Continuous Photographic Light Leak / Flare */}
                      <div className="film-light-leak leak-a" aria-hidden="true" />

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/assets/moment-1.jpg"
                        alt="Client reflecting by the studio glass window"
                        className="moment-img ken-burns-a"
                      />
                      <div className="frame-overlay" />
                      <div className="frame-border-glow" />
                    </div>

                    <div className="card-footer-caption">
                      <span className="caption-label">The Lounge Still</span>
                      <span className="caption-sub">Internal chapters before the ink</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 - Family Bond (Ken-Burns Counter-Drift + Counter-Phase Float) */}
              <motion.div
                className="moment-card card-second"
                style={{
                  y: yCard2,
                  rotateZ: rotCard2,
                }}
                initial={{ opacity: 0, y: 80, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="card-motion-wrapper float-drift-b">
                  <div className="card-inner">


                    <div className="card-pill-tag">
                      <span className="tag-number">02</span>
                      <span className="tag-sep">/</span>
                      <span className="tag-title">Sacred Bond</span>
                    </div>

                    <div className="img-frame">
                      {/* Viewfinder Corner Reticles */}
                      <span className="viewfinder-corner corner-tl" />
                      <span className="viewfinder-corner corner-tr" />
                      <span className="viewfinder-corner corner-bl" />
                      <span className="viewfinder-corner corner-br" />

                      {/* Continuous Photographic Light Leak / Flare */}
                      <div className="film-light-leak leak-b" aria-hidden="true" />

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/assets/moment-2.jpg"
                        alt="Aryan Zeus sharing a smile with his daughter"
                        className="moment-img ken-burns-b"
                      />
                      <div className="frame-overlay" />
                      <div className="frame-border-glow" />
                    </div>

                    <div className="card-footer-caption">
                      <span className="caption-label">Sanctuary Warmth</span>
                      <span className="caption-sub">Aryan &amp; daughter sharing joy</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .moments-section {
          background: linear-gradient(
            180deg,
            var(--bg-storm-medium) 0%,
            var(--bg-storm-dark) 50%,
            var(--bg-storm-medium) 100%
          );
          padding: 8.5rem 0;
          position: relative;
          overflow: hidden;
        }

        /* Ambient glowing background aura */
        .ambient-aura {
          position: absolute;
          right: 5%;
          top: 25%;
          width: 550px;
          height: 550px;
          background: radial-gradient(
            circle,
            rgba(255, 168, 82, 0.14) 0%,
            rgba(76, 163, 255, 0.04) 45%,
            transparent 70%
          );
          filter: blur(60px);
          pointer-events: none;
          z-index: 1;
        }

        .moments-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        @media (min-width: 992px) {
          .moments-grid {
            grid-template-columns: 1fr 1.15fr;
            gap: 4.5rem;
          }
        }

        /* Information / Left Column */
        .moments-info {
          position: relative;
          z-index: 5;
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
          margin-bottom: 1.25rem;
          backdrop-filter: blur(8px);
        }

        .badge-icon {
          color: var(--accent-peach);
        }

        .section-title {
          font-family: var(--font-headings);
          font-size: clamp(2.2rem, 3.8vw, 3.2rem);
          line-height: 1.15;
          letter-spacing: 0.04em;
          color: var(--text-main);
          margin-bottom: 1.75rem;
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
          font-size: 0.98rem;
          line-height: 1.75;
          margin-bottom: 1.25rem;
          letter-spacing: 0.01em;
        }

        .moments-quote-block {
          display: flex;
          gap: 1.25rem;
          margin: 2.2rem 0 1.5rem;
          padding: 1.4rem 1.6rem;
          background: rgba(21, 29, 45, 0.45);
          border: 1px solid rgba(255, 168, 82, 0.14);
          border-radius: 14px;
          backdrop-filter: blur(12px);
          position: relative;
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
          gap: 0.65rem;
        }

        .quote-text {
          font-family: var(--font-headings);
          font-size: 1.05rem;
          font-style: italic;
          color: var(--text-main);
          line-height: 1.6;
          letter-spacing: 0.02em;
        }

        .quote-author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-peach);
          font-weight: 700;
          font-style: normal;
        }

        .quote-location {
          color: var(--text-muted);
          font-weight: 400;
          letter-spacing: 0.08em;
          border-left: 1px solid rgba(255, 255, 255, 0.15);
          padding-left: 0.75rem;
        }

        /* Living Studio Soundscape Equalizer Widget */
        .soundscape-widget {
          margin: 1.5rem 0 2rem;
          padding: 1rem 1.25rem;
          background: rgba(13, 17, 27, 0.6);
          border: 1px solid rgba(255, 168, 82, 0.16);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .soundscape-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          font-family: var(--font-desc);
        }

        .soundscape-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          color: var(--text-main);
          font-weight: 600;
        }

        .soundscape-icon {
          color: var(--accent-peach);
        }

        .soundscape-live-badge {
          font-size: 0.62rem;
          padding: 0.15rem 0.45rem;
          border-radius: 999px;
          background: rgba(255, 168, 82, 0.12);
          border: 1px solid rgba(255, 168, 82, 0.3);
          color: var(--accent-peach-bright);
          letter-spacing: 0.08em;
        }

        .soundscape-bpm {
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        .equalizer-strip {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          height: 28px;
          padding-top: 2px;
        }

        .eq-bar {
          flex: 1;
          min-width: 3px;
          border-radius: 2px 2px 0 0;
          background: linear-gradient(180deg, var(--accent-peach) 0%, rgba(255, 168, 82, 0.3) 100%);
          animation: eqDance ease-in-out infinite alternate;
          transform-origin: bottom;
        }

        @keyframes eqDance {
          0% {
            height: 4px;
            opacity: 0.4;
          }
          50% {
            opacity: 0.85;
          }
          100% {
            height: 100%;
            opacity: 1;
          }
        }

        .moments-meta {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          padding-top: 0.25rem;
          font-family: var(--font-desc);
          font-size: 0.75rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .meta-icon {
          color: var(--accent-peach);
          opacity: 0.8;
        }

        .meta-divider {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 168, 82, 0.4);
        }

        /* Right Column - Visuals & Filmstrip */
        .moments-visuals {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          position: relative;
        }

        /* Continuous Horizontal 35mm Filmstrip Ticker */
        .filmstrip-ticker-banner {
          width: 100%;
          max-width: 620px;
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
        }

        @keyframes filmScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
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
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          width: 100%;
          max-width: 620px;
          position: relative;
          padding: 1.5rem 0 2.5rem;
        }

        @media (max-width: 640px) {
          .moments-cards-track {
            grid-template-columns: 1fr;
            gap: 2rem;
            max-width: 360px;
          }
        }

        .moment-card {
          position: relative;
          will-change: transform;
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
            margin-top: 3.5rem;
          }
        }

        /* Continuous Staggered Zero-G Darkroom Floating Motion */
        .card-motion-wrapper {
          width: 100%;
          will-change: transform;
        }

        .float-drift-a {
          animation: driftMotionA 7.2s ease-in-out infinite alternate;
        }

        .float-drift-b {
          animation: driftMotionB 8.6s ease-in-out infinite alternate;
        }

        @keyframes driftMotionA {
          0% {
            transform: translateY(0px) rotate(-0.5deg);
          }
          100% {
            transform: translateY(-13px) rotate(-1.5deg);
          }
        }

        @keyframes driftMotionB {
          0% {
            transform: translateY(0px) rotate(0.6deg);
          }
          100% {
            transform: translateY(14px) rotate(1.6deg);
          }
        }

        .card-inner {
          position: relative;
          border-radius: 20px;
          padding: 0.7rem;
          background: rgba(13, 17, 27, 0.8);
          border: 1px solid rgba(255, 168, 82, 0.18);
          backdrop-filter: blur(16px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.03);
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .card-inner:hover {
          border-color: rgba(255, 168, 82, 0.45);
          box-shadow: 0 28px 65px rgba(0, 0, 0, 0.75),
            0 0 28px rgba(255, 168, 82, 0.2);
        }

        /* Camera Viewfinder Header */
        .card-film-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.2rem 0.4rem;
          font-family: monospace;
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        .rec-badge {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .rec-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ef4444;
          box-shadow: 0 0 8px #ef4444;
          animation: recBlink 1.4s ease-in-out infinite;
        }

        @keyframes recBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }

        .rec-label {
          color: #ef4444;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .rec-time {
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 0.05em;
        }

        .lens-spec {
          color: var(--accent-peach);
          letter-spacing: 0.05em;
        }

        .card-pill-tag {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.15rem 0.4rem;
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
          font-size: 0.7rem;
        }

        .img-frame {
          position: relative;
          aspect-ratio: 2.7 / 3.9;
          width: 100%;
          border-radius: 14px;
          overflow: hidden;
          background: #07090e;
        }

        /* Viewfinder Corner Reticles */
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

        /* Organic Anamorphic Photographic Light Leak */
        .film-light-leak {
          position: absolute;
          inset: -30%;
          border-radius: 50%;
          pointer-events: none;
          z-index: 4;
          mix-blend-mode: screen;
          filter: blur(28px);
        }

        .leak-a {
          background: radial-gradient(
            ellipse at center,
            rgba(255, 168, 82, 0.32) 0%,
            rgba(255, 120, 60, 0.12) 40%,
            transparent 70%
          );
          animation: leakMoveA 9.5s ease-in-out infinite alternate;
        }

        .leak-b {
          background: radial-gradient(
            ellipse at center,
            rgba(255, 185, 100, 0.3) 0%,
            rgba(76, 163, 255, 0.14) 40%,
            transparent 70%
          );
          animation: leakMoveB 11s ease-in-out infinite alternate;
        }

        @keyframes leakMoveA {
          0% {
            transform: translate(-15%, -15%) scale(0.9);
            opacity: 0.35;
          }
          50% {
            transform: translate(12%, 18%) scale(1.3);
            opacity: 0.7;
          }
          100% {
            transform: translate(-5%, 22%) scale(1.05);
            opacity: 0.45;
          }
        }

        @keyframes leakMoveB {
          0% {
            transform: translate(15%, 15%) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(-10%, -12%) scale(1.35);
            opacity: 0.75;
          }
          100% {
            transform: translate(8%, -18%) scale(0.9);
            opacity: 0.35;
          }
        }

        /* Living Ken-Burns Camera Drift */
        .moment-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          will-change: transform;
        }

        .ken-burns-a {
          animation: kenBurnsOne 15s ease-in-out infinite alternate;
        }

        .ken-burns-b {
          animation: kenBurnsTwo 17s ease-in-out infinite alternate;
        }

        @keyframes kenBurnsOne {
          0% {
            transform: scale(1.05) translate(0%, 0%);
          }
          50% {
            transform: scale(1.15) translate(-2.5%, -1.8%);
          }
          100% {
            transform: scale(1.08) translate(1.5%, -2.2%);
          }
        }

        @keyframes kenBurnsTwo {
          0% {
            transform: scale(1.08) translate(0%, 0%);
          }
          50% {
            transform: scale(1.16) translate(2.2%, 1.8%);
          }
          100% {
            transform: scale(1.06) translate(-1.8%, 1.5%);
          }
        }

        .frame-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 50%,
            rgba(7, 9, 14, 0.4) 80%,
            rgba(7, 9, 14, 0.75) 100%
          );
          pointer-events: none;
          z-index: 3;
        }

        .frame-border-glow {
          position: absolute;
          inset: 0;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          pointer-events: none;
          z-index: 5;
        }

        .card-footer-caption {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          padding: 0.2rem 0.4rem 0.3rem;
        }

        .caption-label {
          font-family: var(--font-headings);
          font-size: 0.82rem;
          letter-spacing: 0.06em;
          color: var(--text-main);
        }

        .caption-sub {
          font-family: var(--font-desc);
          font-size: 0.72rem;
          color: var(--text-muted);
          letter-spacing: 0.02em;
        }
      `}</style>
    </section>
  );
}
