"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  const totalFrames = 300;
  
  // Preloading progress states
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Cache and queue refs
  const imagesCache = useRef<{ [key: number]: HTMLImageElement }>({});
  const loadingStatus = useRef<{ [key: number]: 'unloaded' | 'loading' | 'loaded' }>({});
  const loadQueue = useRef<number[]>([]);
  
  // Animation state refs
  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);

  // Pad numbers with leading zeros (e.g. 1 -> "0001")
  const getFramePath = (index: number) => {
    const pad = (num: number, size: number) => {
      let s = num.toString();
      while (s.length < size) s = "0" + s;
      return s;
    };
    return `/frames/desktop/frame-${pad(index, 4)}.webp`;
  };

  // Canvas drawing function
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesCache.current[frameIndex];
    if (!img) {
      for (let offset = 1; offset < totalFrames; offset++) {
        if (frameIndex - offset >= 1 && imagesCache.current[frameIndex - offset]) {
          img = imagesCache.current[frameIndex - offset];
          break;
        }
        if (frameIndex + offset <= totalFrames && imagesCache.current[frameIndex + offset]) {
          img = imagesCache.current[frameIndex + offset];
          break;
        }
      }
    }

    if (!img) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const displayWidth = Math.round(rect.width * dpr);
    const displayHeight = Math.round(rect.height * dpr);

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imageRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    
    let drawWidth, drawHeight, drawX, drawY;
    
    if (canvasRatio > imageRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imageRatio;
      drawX = 0;
      drawY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imageRatio;
      drawHeight = canvas.height;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  };

  // Mathematical interpolation helper for stages
  const getStageStyles = (progress: number, start: number, peakStart: number, peakEnd: number, end: number) => {
    let opacity = 0;
    let y = 30;
    
    if (progress >= start && progress <= end) {
      if (progress < peakStart) {
        const p = (progress - start) / (peakStart - start);
        opacity = p;
        y = 30 * (1 - p);
      } else if (progress > peakEnd) {
        const p = (end - progress) / (end - peakEnd);
        opacity = p;
        y = -30 * (1 - p);
      } else {
        opacity = 1;
        y = 0;
      }
    } else if (progress > end) {
      y = -30;
    }
    
    return { opacity, y };
  };

  const updateStageDOM = (progress: number) => {
    const stage1 = stage1Ref.current;
    const stage2 = stage2Ref.current;
    const stage3 = stage3Ref.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (stage1) {
      const { opacity, y } = getStageStyles(progress, 0, 0.05, 0.22, 0.32);
      stage1.style.opacity = opacity.toString();
      stage1.style.transform = `translateY(${y}px)`;
      stage1.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
    }

    if (stage2) {
      const { opacity, y } = getStageStyles(progress, 0.38, 0.45, 0.58, 0.68);
      stage2.style.opacity = opacity.toString();
      stage2.style.transform = `translateY(${y}px)`;
      stage2.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
    }

    if (stage3) {
      const { opacity, y } = getStageStyles(progress, 0.72, 0.78, 0.90, 0.98);
      stage3.style.opacity = opacity.toString();
      stage3.style.transform = `translateY(${y}px)`;
      stage3.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
    }

    if (scrollIndicator) {
      const opacity = Math.max(0, 1 - progress * 8);
      scrollIndicator.style.opacity = opacity.toString();
      scrollIndicator.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
    }
  };

  useEffect(() => {
    for (let i = 1; i <= totalFrames; i++) {
      loadingStatus.current[i] = 'unloaded';
    }

    const criticalCount = 30;
    let loadedCritical = 0;

    const loadFrame = (index: number, isCritical = false) => {
      if (loadingStatus.current[index] === 'loaded') {
        if (isCritical) {
          loadedCritical++;
          setLoadingProgress(Math.round((loadedCritical / criticalCount) * 100));
        }
        return Promise.resolve(imagesCache.current[index]);
      }
      
      if (loadingStatus.current[index] === 'loading') {
        return new Promise<HTMLImageElement>((resolve) => {
          const checkStatus = () => {
            if (loadingStatus.current[index] === 'loaded') {
              resolve(imagesCache.current[index]);
            } else {
              setTimeout(checkStatus, 50);
            }
          };
          checkStatus();
        });
      }

      loadingStatus.current[index] = 'loading';
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = getFramePath(index);
        img.onload = () => {
          imagesCache.current[index] = img;
          loadingStatus.current[index] = 'loaded';
          
          if (isCritical) {
            loadedCritical++;
            setLoadingProgress(Math.round((loadedCritical / criticalCount) * 100));
          }

          if (index === 1 || Math.round(currentFrameRef.current) === index) {
            drawFrame(index);
          }
          resolve(img);
        };
        img.onerror = () => {
          loadingStatus.current[index] = 'unloaded';
          if (isCritical) {
            loadedCritical++;
            setLoadingProgress(Math.round((loadedCritical / criticalCount) * 100));
          }
          resolve(img);
        };
      });
    };

    const prioritizeQueue = (currentFrameIndex: number) => {
      loadQueue.current.sort((a, b) => Math.abs(a - currentFrameIndex) - Math.abs(b - currentFrameIndex));
    };

    const runWorker = async () => {
      if (loadQueue.current.length === 0) return;
      const nextFrame = loadQueue.current.shift();
      if (nextFrame && loadingStatus.current[nextFrame] === 'unloaded') {
        await loadFrame(nextFrame, false);
      }
      setTimeout(runWorker, 10);
    };

    const startBackgroundWorkers = () => {
      for (let i = 0; i < 4; i++) {
        runWorker();
      }
    };

    loadFrame(1, true).then(() => {
      const criticalBatch = Array.from({ length: criticalCount - 1 }, (_, i) => i + 2);
      Promise.all(criticalBatch.map(idx => loadFrame(idx, true))).then(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 400);

        loadQueue.current = Array.from({ length: totalFrames - criticalCount }, (_, i) => i + criticalCount + 1);
        startBackgroundWorkers();
      });
    });

    updateStageDOM(0);

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      targetFrameRef.current = 1 + progress * (totalFrames - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let animId: number;
    let lastSortedFrame = -1;
    const tick = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.15;
        const currentFrameRounded = Math.round(currentFrameRef.current);
        drawFrame(currentFrameRounded);
        
        const interpolatedProgress = (currentFrameRef.current - 1) / (totalFrames - 1);
        updateStageDOM(interpolatedProgress);

        if (currentFrameRounded !== lastSortedFrame) {
          lastSortedFrame = currentFrameRounded;
          prioritizeQueue(currentFrameRounded);
        }
      }

      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        drawFrame(Math.round(currentFrameRef.current));
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Formatted counter 000% → 100%
  const formattedProgress = String(loadingProgress).padStart(3, "0");

  return (
    <div id="home" ref={containerRef} className="relative w-full h-[450vh] bg-brand-black">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* HTML5 Canvas Frame Renderer */}
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Dark Vignette Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/95 via-brand-black/60 to-transparent z-1 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/40 z-1 pointer-events-none" />

        {/* Text Content Overlays */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative h-[60%] flex items-center">
            
            {/* Stage 1 */}
            <div
              ref={stage1Ref}
              className="absolute max-w-2xl flex flex-col"
              style={{ opacity: 1 }}
            >
              <span className="font-sans text-[11px] font-semibold tracking-[0.45em] text-brand-warm-cream uppercase mb-4 flex items-center gap-2">
                <Sparkles size={12} className="text-brand-warm-cream" />
                PREMIUM CUSTOM TATTOO STUDIO
              </span>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-brand-off-white mb-6 uppercase">
                ART<br />
                <span className="italic font-light text-brand-warm-cream">ETCHED</span><br />
                INTO SKIN.
              </h1>
              <p className="text-brand-off-white/75 font-sans text-xs md:text-sm leading-relaxed tracking-wide mb-8 max-w-md">
                Zeus Tattoo Studio brings editorial custom skin art, sterile precision, and master craftsmanship to Koramangala, Bangalore.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={onOpenBooking}
                  className="group px-7 py-4 bg-brand-off-white hover:bg-brand-warm-cream text-brand-black font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 pointer-events-auto cursor-pointer flex items-center gap-2 shadow-xl hover:shadow-brand-warm-cream/10"
                >
                  BOOK A CONSULTATION
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-7 py-4 border border-brand-off-white/20 hover:border-brand-warm-cream text-brand-off-white hover:text-brand-warm-cream font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 pointer-events-auto cursor-pointer backdrop-blur-xs"
                >
                  VIEW PORTFOLIO
                </button>
              </div>
            </div>

            {/* Stage 2 */}
            <div
              ref={stage2Ref}
              className="absolute max-w-2xl flex flex-col"
              style={{ opacity: 0, transform: "translateY(30px)" }}
            >
              <span className="font-sans text-[11px] font-semibold tracking-[0.45em] text-brand-warm-cream uppercase mb-4">
                MASTER ARTISTRY & STYLES
              </span>
              <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-brand-off-white mb-6 uppercase">
                CREATIVE<br />
                <span className="italic font-light text-brand-warm-cream">PRECISION.</span>
              </h2>
              <p className="text-brand-off-white/75 font-sans text-xs md:text-sm leading-relaxed tracking-wide mb-8 max-w-md">
                From high-contrast photorealism to delicate fine line illustrations and custom sleeve artwork designed for your body flow.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => document.getElementById("artists")?.scrollIntoView({ behavior: "smooth" })}
                  className="group px-7 py-4 bg-brand-off-white hover:bg-brand-warm-cream text-brand-black font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 pointer-events-auto cursor-pointer flex items-center gap-2"
                >
                  MEET ARTISTS
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Stage 3 */}
            <div
              ref={stage3Ref}
              className="absolute max-w-2xl flex flex-col"
              style={{ opacity: 0, transform: "translateY(30px)" }}
            >
              <span className="font-sans text-[11px] font-semibold tracking-[0.45em] text-brand-warm-cream uppercase mb-4">
                HOSPITAL-GRADE STERILIZATION
              </span>
              <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-brand-off-white mb-6 uppercase">
                UNCOMPROMISED<br />
                <span className="italic font-light text-brand-warm-cream">SAFETY.</span>
              </h2>
              <p className="text-brand-off-white/75 font-sans text-xs md:text-sm leading-relaxed tracking-wide mb-8 max-w-md">
                Single-use blister pack needles, autoclave sterilization, and organic vegan inks ensure your comfort and peace of mind.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={onOpenBooking}
                  className="group px-7 py-4 bg-brand-off-white hover:bg-brand-warm-cream text-brand-black font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 pointer-events-auto cursor-pointer flex items-center gap-2"
                >
                  RESERVE YOUR SESSION
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute right-8 md:right-12 bottom-10 z-20 flex flex-col items-center gap-6"
          style={{ opacity: 1 }}
        >
          <span className="font-sans text-[10px] tracking-[0.35em] text-brand-off-white/40 uppercase rotate-90 origin-right translate-x-3 mt-4">
            SCROLL TO EXPLORE
          </span>
          <div className="w-[1px] h-16 bg-brand-off-white/10 relative overflow-hidden mt-6">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-warm-cream animate-bounce" />
          </div>
        </div>

      </div>

      {/* Cinematic Full-screen Loading Screen Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-50 bg-brand-black flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="flex flex-col items-center max-w-md px-6 text-center">
              {/* Rotating Logo Mark */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border border-brand-warm-cream/30 flex items-center justify-center mb-8 bg-brand-charcoal/50"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8DFD1" strokeWidth="1">
                  <path d="M12 2L4 10H20L12 2Z" />
                  <path d="M12 22L4 14H20L12 22Z" />
                  <circle cx="12" cy="12" r="2" fill="#E8DFD1" />
                </svg>
              </motion.div>

              {/* Studio Name */}
              <span className="font-serif text-3xl md:text-5xl tracking-[0.25em] text-brand-off-white uppercase font-medium">
                ZEUS TATTOO
              </span>
              <span className="text-[9px] tracking-[0.45em] text-brand-warm-cream/70 font-sans uppercase mt-3">
                PREMIUM CUSTOM STUDIO • BANGALORE
              </span>

              {/* Progress Line Bar */}
              <div className="w-64 h-[1px] bg-brand-off-white/10 mt-10 relative overflow-hidden">
                <div
                  className="h-full bg-brand-warm-cream transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>

              {/* Percentage Counter (000% → 100%) */}
              <span className="font-serif italic text-2xl text-brand-warm-cream mt-5 tracking-[0.2em] font-light">
                {formattedProgress}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
