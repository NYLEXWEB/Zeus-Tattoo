"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    // Ultra-smooth, lag-free luxury studio Lenis instance
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
      syncTouch: false, // Ensures native 120Hz hardware momentum scrolling on mobile with zero lag
      touchMultiplier: 1.0,
      autoRaf: false, // Unified with GSAP ticker loop
    });

    window.__lenis = lenis;

    // Synchronize ScrollTrigger with Lenis scroll updates
    lenis.on("scroll", ScrollTrigger.update);

    // High precision unified ticker loop
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    // lagSmoothing(500, 33) cushions frame drops so scrolling never stutters or jumps
    gsap.ticker.lagSmoothing(500, 33);

    // Refresh on resize
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 120);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Ultra smooth anchor navigation with header offset (75px)
    const handleHashClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, {
            offset: -75,
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener("click", handleHashClick);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleHashClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return children ? <>{children}</> : null;
}
