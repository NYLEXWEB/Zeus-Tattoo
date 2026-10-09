"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Sparkles, Heart, Compass } from "lucide-react";

export default function Moments() {
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll position relative to the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth out scroll progress with physics spring for ultra-buttery parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    mass: 0.6,
  });

  // Parallax translation for the two images
  const yCard1 = useTransform(smoothProgress, [0, 1], [70, -70]);
  const yCard2 = useTransform(smoothProgress, [0, 1], [-30, 90]);

  // Subtle rotation tied to scroll
  const rotCard1 = useTransform(smoothProgress, [0, 0.5, 1], [-2.5, -0.5, 1.5]);
  const rotCard2 = useTransform(smoothProgress, [0, 0.5, 1], [2, 0.2, -2]);

  // Internal image pan for depth/window effect
  const imgShift1 = useTransform(smoothProgress, [0, 1], [-25, 25]);
  const imgShift2 = useTransform(smoothProgress, [0, 1], [25, -25]);

  // Ambient aura glow
  const glowY = useTransform(smoothProgress, [0, 1], [-60, 60]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.35, 0.7, 0.35]);

  return (
    <section ref={sectionRef} id="moments" className="moments-section">
      {/* Dynamic ambient background glow that responds to scroll */}
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
          {/* Left: Narrative & Philosophy */}
          <motion.div
            className="moments-info"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="badge-pill">
              <Sparkles className="badge-icon" size={13} />
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

            {/* Minimal aesthetic coordinates indicator */}
            <div className="moments-meta">
              <div className="meta-item">
                <Compass size={13} className="meta-icon" />
                <span>Kottayam Sanctuary • 09°35′ N</span>
              </div>
              <div className="meta-divider" />
              <div className="meta-item">
                <Heart size={13} className="meta-icon" />
                <span>Unscripted Archive</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Scroll-Animated Image Composition */}
          <div className="moments-visuals">
            <div className="moments-cards-track">
              {/* Card 1 - Client Reflection (Parallax Upward) */}
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
                <div className="card-inner">
                  <div className="card-pill-tag">
                    <span className="tag-number">01</span>
                    <span className="tag-sep">/</span>
                    <span className="tag-title">Quiet Reflection</span>
                  </div>

                  <div className="img-frame">
                    <motion.img
                      src="/assets/moment-1.jpg"
                      alt="Client reflecting by the studio glass window"
                      className="moment-img"
                      style={{
                        y: imgShift1,
                        scale: 1.08,
                      }}
                    />
                    <div className="frame-overlay" />
                    <div className="frame-border-glow" />
                  </div>

                  <div className="card-footer-caption">
                    <span className="caption-label">The Lounge Still</span>
                    <span className="caption-sub">Internal chapters before the ink</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 - Family Bond (Parallax Staggered Downward) */}
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
                <div className="card-inner">
                  <div className="card-pill-tag">
                    <span className="tag-number">02</span>
                    <span className="tag-sep">/</span>
                    <span className="tag-title">Sacred Bond</span>
                  </div>

                  <div className="img-frame">
                    <motion.img
                      src="/assets/moment-2.jpg"
                      alt="Aryan Zeus sharing a smile with his daughter"
                      className="moment-img"
                      style={{
                        y: imgShift2,
                        scale: 1.08,
                      }}
                    />
                    <div className="frame-overlay" />
                    <div className="frame-border-glow" />
                  </div>

                  <div className="card-footer-caption">
                    <span className="caption-label">Sanctuary Warmth</span>
                    <span className="caption-sub">Aryan &amp; daughter sharing joy</span>
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
          margin: 2.2rem 0;
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

        .moments-meta {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          padding-top: 0.5rem;
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

        /* Right Column - Visuals & Cards */
        .moments-visuals {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          position: relative;
        }

        .moments-cards-track {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          width: 100%;
          max-width: 620px;
          position: relative;
          padding: 2.5rem 0;
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

        .card-inner {
          position: relative;
          border-radius: 20px;
          padding: 0.6rem;
          background: rgba(13, 17, 27, 0.75);
          border: 1px solid rgba(255, 168, 82, 0.16);
          backdrop-filter: blur(16px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55),
            0 0 0 1px rgba(255, 255, 255, 0.03);
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .card-inner:hover {
          border-color: rgba(255, 168, 82, 0.4);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.65),
            0 0 24px rgba(255, 168, 82, 0.15);
        }

        .card-pill-tag {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.65rem;
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

        .moment-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          will-change: transform;
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
        }

        .frame-border-glow {
          position: absolute;
          inset: 0;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          pointer-events: none;
        }

        .card-footer-caption {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          padding: 0.35rem 0.65rem 0.45rem;
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
