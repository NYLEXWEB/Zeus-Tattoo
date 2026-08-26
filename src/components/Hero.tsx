"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
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
  
  // Cache of loaded image elements (keyed by frame index 1 to 300)
  const imagesCache = useRef<{ [key: number]: HTMLImageElement }>({});
  
  // Animation state refs (prevents triggering React re-renders)
  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);

  // Pad numbers with leading zeros (e.g. 1 -> "001")
  const getFramePath = (index: number) => {
    const pad = (num: number, size: number) => {
      let s = num.toString();
      while (s.length < size) s = "0" + s;
      return s;
    };
    return `/animations/ezgif-frame-${pad(index, 3)}.png`;
  };

  // Canvas drawing function
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Retrieve image from cache or find the closest loaded frame to avoid flickering
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

    // Handle high DPI screens
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const displayWidth = Math.round(rect.width * dpr);
    const displayHeight = Math.round(rect.height * dpr);

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate background cover dimensions (aspect ratio preservation)
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

  // Mathematical interpolation (lerp) helper for overlays
  const getStageStyles = (progress: number, start: number, peakStart: number, peakEnd: number, end: number) => {
    let opacity = 0;
    let y = 30; // Starts 30px lower
    
    if (progress >= start && progress <= end) {
      if (progress < peakStart) {
        // Fading and moving in
        const p = (progress - start) / (peakStart - start);
        opacity = p;
        y = 30 * (1 - p);
      } else if (progress > peakEnd) {
        // Fading and moving out (upwards)
        const p = (end - progress) / (end - peakEnd);
        opacity = p;
        y = -30 * (1 - p);
      } else {
        // Fully peak visible
        opacity = 1;
        y = 0;
      }
    } else if (progress > end) {
      y = -30; // Remained pushed up
    }
    
    return { opacity, y };
  };

  // Direct DOM styling engine (bypasses React loop for maximum performance)
  const updateStageDOM = (progress: number) => {
    const stage1 = stage1Ref.current;
    const stage2 = stage2Ref.current;
    const stage3 = stage3Ref.current;
    const scrollIndicator = scrollIndicatorRef.current;

    // Stage 1 (0% to 28% scroll progress)
    if (stage1) {
      const { opacity, y } = getStageStyles(progress, 0, 0.05, 0.18, 0.28);
      stage1.style.opacity = opacity.toString();
      stage1.style.transform = `translateY(${y}px)`;
      stage1.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
    }

    // Stage 2 (35% to 63% scroll progress)
    if (stage2) {
      const { opacity, y } = getStageStyles(progress, 0.35, 0.42, 0.55, 0.63);
      stage2.style.opacity = opacity.toString();
      stage2.style.transform = `translateY(${y}px)`;
      stage2.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
    }

    // Stage 3 (70% to 95% scroll progress)
    if (stage3) {
      const { opacity, y } = getStageStyles(progress, 0.70, 0.77, 0.88, 0.95);
      stage3.style.opacity = opacity.toString();
      stage3.style.transform = `translateY(${y}px)`;
      stage3.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
    }

    // Scroll Down indicator (fades out rapidly as user scrolls)
    if (scrollIndicator) {
      const opacity = Math.max(0, 1 - progress * 8);
      scrollIndicator.style.opacity = opacity.toString();
      scrollIndicator.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
    }
  };

  useEffect(() => {
    const criticalCount = 60; // Block the screen until first 60 frames load
    let loadedCritical = 0;

    // Image Loader with critical progress hook
    const loadFrame = (index: number, isCritical = false) => {
      if (imagesCache.current[index]) {
        if (isCritical) {
          loadedCritical++;
          setLoadingProgress(Math.round((loadedCritical / criticalCount) * 100));
        }
        return Promise.resolve(imagesCache.current[index]);
      }
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = getFramePath(index);
        img.onload = () => {
          imagesCache.current[index] = img;
          
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
          if (isCritical) {
            loadedCritical++;
            setLoadingProgress(Math.round((loadedCritical / criticalCount) * 100));
          }
          resolve(img);
        };
      });
    };

    // Load first frame immediately
    loadFrame(1, true).then(() => {
      // Load critical batch (2 to 60)
      const criticalBatch = Array.from({ length: criticalCount - 1 }, (_, i) => i + 2);
      Promise.all(criticalBatch.map(idx => loadFrame(idx, true))).then(() => {
        // Once the critical batch is cached, fade out the loading screen after a small delay
        setTimeout(() => {
          setIsLoading(false);
        }, 500);

        // Stream remaining frames asynchronously in background chunks
        const remainingFrames = Array.from({ length: totalFrames }, (_, i) => i + 1).filter(f => f > criticalCount);
        const loadRemainingChunks = async (frames: number[], chunkSize: number) => {
          for (let i = 0; i < frames.length; i += chunkSize) {
            const chunk = frames.slice(i, i + chunkSize);
            await Promise.all(chunk.map(idx => loadFrame(idx, false)));
          }
        };
        loadRemainingChunks(remainingFrames, 15);
      });
    });

    // Initialize layout DOM details at progress = 0
    updateStageDOM(0);

    // 2. Scroll Listener (maps scroll progress to target index)
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

    // 3. requestAnimationFrame render tick (smooth interpolation)
    let animId: number;
    const tick = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.15;
        const currentFrameRounded = Math.round(currentFrameRef.current);
        drawFrame(currentFrameRounded);
        
        // Calculate progress corresponding to currentFrameRef
        const interpolatedProgress = (currentFrameRef.current - 1) / (totalFrames - 1);
        updateStageDOM(interpolatedProgress);
      }

      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    // 4. Optimized Resize Handler (filters out mobile address-bar triggers)
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

  return (
    <div id="home" ref={containerRef} className="relative w-full h-[500vh] bg-brand-black">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* HTML5 Canvas Frame Renderer */}
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Ambient Dark Overlay to protect typography readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/95 via-brand-black/55 to-transparent z-1 pointer-events-none" />

        {/* Text Content Overlays */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative h-[60%] flex items-center">
            
            {/* Stage 1 (0% to 28% scroll progress) */}
            <div
              ref={stage1Ref}
              className="absolute max-w-xl flex flex-col"
              style={{ opacity: 1 }}
            >
              <span className="text-xs font-semibold tracking-[0.4em] text-brand-warm-cream uppercase mb-4">
                More than just a tattoo
              </span>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-brand-off-white mb-6 uppercase">
                Your Story.<br />
                <span className="italic font-light text-brand-warm-cream">Our Ink.</span>
              </h1>
              <p className="text-brand-off-white/70 font-sans text-xs md:text-sm leading-relaxed tracking-wide mb-10 max-w-md">
                At Zeus Tattoo Studio, we turn your ideas into art. Our artists, hygiene standards, and creative custom designs make every tattoo unique.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={onOpenBooking}
                  className="group px-6 py-3 bg-brand-off-white hover:bg-brand-warm-cream text-brand-black font-sans text-[10px] font-bold tracking-widest uppercase transition-colors pointer-events-auto cursor-pointer flex items-center gap-1.5"
                >
                  Book Session
                  <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-6 py-3 border border-brand-off-white/20 hover:border-brand-warm-cream text-brand-off-white hover:text-brand-warm-cream font-sans text-[10px] font-bold tracking-widest uppercase transition-colors pointer-events-auto cursor-pointer"
                >
                  View Works
                </button>
              </div>
            </div>

            {/* Stage 2 (35% to 63% scroll progress) */}
            <div
              ref={stage2Ref}
              className="absolute max-w-xl flex flex-col"
              style={{ opacity: 0, transform: "translateY(30px)" }}
            >
              <span className="text-xs font-semibold tracking-[0.4em] text-brand-warm-cream uppercase mb-4">
                Master Artistry
              </span>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-brand-off-white mb-6 uppercase">
                Creative<br />
                <span className="italic font-light text-brand-warm-cream">Precision.</span>
              </h2>
              <p className="text-brand-off-white/70 font-sans text-xs md:text-sm leading-relaxed tracking-wide mb-10 max-w-md">
                From photorealistic sleeve designs to elegant minimalist line work, our select specialists create unique custom illustrations tailored to your anatomy.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => document.getElementById("artists")?.scrollIntoView({ behavior: "smooth" })}
                  className="group px-6 py-3 bg-brand-off-white hover:bg-brand-warm-cream text-brand-black font-sans text-[10px] font-bold tracking-widest uppercase transition-colors pointer-events-auto cursor-pointer flex items-center gap-1.5"
                >
                  Meet Artists
                  <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Stage 3 (70% to 95% scroll progress) */}
            <div
              ref={stage3Ref}
              className="absolute max-w-xl flex flex-col"
              style={{ opacity: 0, transform: "translateY(30px)" }}
            >
              <span className="text-xs font-semibold tracking-[0.4em] text-brand-warm-cream uppercase mb-4">
                Hygiene & Safety
              </span>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-brand-off-white mb-6 uppercase">
                Your Comfort.<br />
                <span className="italic font-light text-brand-warm-cream">Secured.</span>
              </h2>
              <p className="text-brand-off-white/70 font-sans text-xs md:text-sm leading-relaxed tracking-wide mb-10 max-w-md">
                We employ autoclave sterilization, medical-grade environments, and organic pigments because your safety is our ultimate promise.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={onOpenBooking}
                  className="group px-6 py-3 bg-brand-off-white hover:bg-brand-warm-cream text-brand-black font-sans text-[10px] font-bold tracking-widest uppercase transition-colors pointer-events-auto cursor-pointer flex items-center gap-1.5"
                >
                  Book Appointment
                  <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => document.getElementById("styles")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-6 py-3 border border-brand-off-white/20 hover:border-brand-warm-cream text-brand-off-white hover:text-brand-warm-cream font-sans text-[10px] font-bold tracking-widest uppercase transition-colors pointer-events-auto cursor-pointer"
                >
                  Explore Styles
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Indicator (Fades out when user starts scrolling) */}
        <div
          ref={scrollIndicatorRef}
          className="absolute right-8 md:right-12 bottom-12 z-20 flex flex-col items-center gap-6"
          style={{ opacity: 1 }}
        >
          <span className="font-sans text-[10px] tracking-[0.3em] text-brand-off-white/40 uppercase rotate-90 origin-right translate-x-3 mt-4">
            Scroll Down
          </span>
          <div className="w-[1px] h-20 bg-brand-off-white/10 relative overflow-hidden mt-6">
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
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-50 bg-brand-black flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="flex flex-col items-center">
              {/* Rotating Logo Mark */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border border-brand-warm-cream/30 flex items-center justify-center mb-8"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8DFD1" strokeWidth="1">
                  <path d="M12 2L4 10H20L12 2Z" />
                  <path d="M12 22L4 14H20L12 22Z" />
                  <circle cx="12" cy="12" r="2" fill="#E8DFD1" />
                </svg>
              </motion.div>

              {/* Editorial Texts */}
              <span className="font-serif text-3xl md:text-4xl tracking-[0.25em] text-brand-off-white uppercase">
                ZEUS
              </span>
              <span className="text-[9px] tracking-[0.4em] text-brand-warm-cream/70 font-sans uppercase mt-2">
                Preloading Cinematic Artistry
              </span>

              {/* Progress Line */}
              <div className="w-56 h-[1px] bg-brand-off-white/10 mt-10 relative overflow-hidden">
                <div
                  className="h-full bg-brand-warm-cream transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>

              {/* Percent text */}
              <span className="font-serif italic text-lg text-brand-warm-cream/90 mt-4 tracking-widest">
                {loadingProgress}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
