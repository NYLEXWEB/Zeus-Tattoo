"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Eye, Sparkles, X, Compass, ExternalLink } from "lucide-react";
import SectionFlourish from "./SectionFlourish";
import TornPaperDivider from "./TornPaperDivider";

export interface GalleryItemData {
  id: string | number;
  image: string;
  title: string;
  category: string;
  artist?: string;
  year?: string;
  details?: string;
}

export interface ArtistItemData {
  id: string | number;
  image: string;
  name: string;
  role: string;
  styles: string;
  experience?: string;
  description: string;
  awards?: string;
}

export interface ImmersiveScrollGalleryProps {
  id?: string;
  type: "gallery" | "artists";
  title: string;
  subtitle?: string;
  items: (GalleryItemData | ArtistItemData)[];
  onOpenBooking?: () => void;
  topDividerFill?: string;
  bottomDividerFill?: string;
}

const PLANE_SPACING = 5.2; // 3D distance between consecutive planes in world units
const CAMERA_START_Z = 4.2;

// Staggered photographic arrangement offsets
const STAGGER_X = [-1.3, 1.15, -0.85, 1.25, -0.55, 0.9, -1.2, 0.75];
const STAGGER_Y = [-0.22, 0.18, -0.15, 0.25, -0.1, 0.2, -0.22, 0.15];
const ROT_Y = [0.07, -0.06, 0.05, -0.07, 0.04, -0.05, 0.06, -0.04];
const ROT_Z = [-0.03, 0.025, -0.02, 0.03, -0.02, 0.025, -0.03, 0.02];

export default function ImmersiveScrollGallery({
  id,
  type,
  title,
  subtitle = "IMMERSIVE EXPERIENCE",
  items,
  onOpenBooking,
  topDividerFill,
  bottomDividerFill,
}: ImmersiveScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const total = items.length;
  const isGallery = type === "gallery";

  // References for render loop (avoids stale closures & eliminates state re-renders during scroll)
  const activeIndexRef = useRef(0);
  const scrollProgressRef = useRef(0);
  const targetZRef = useRef(CAMERA_START_Z);
  const currentZRef = useRef(CAMERA_START_Z);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const hoveredMeshRef = useRef<THREE.Mesh | null>(null);

  // Jump to specific index programmatically
  const scrollToIndex = useCallback((idx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollableDistance = containerHeight - windowHeight;
    if (scrollableDistance <= 0) return;

    const targetProgress = total > 1 ? idx / (total - 1) : 0;
    const targetScrollY = containerTop + targetProgress * scrollableDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  }, [total]);

  const handleNext = () => scrollToIndex((activeIndex + 1) % total);
  const handlePrev = () => scrollToIndex((activeIndex - 1 + total) % total);

  // ----------------------------------------------------------------------
  // Three.js WebGL 3D Depth Corridor Engine
  // ----------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animationFrameId: number;
    let isDisposed = false;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0d12);
    // Atmospheric linear fog
    scene.fog = new THREE.Fog(0x0c0d12, 3, Math.max(16, total * PLANE_SPACING * 0.9));

    // 2. Camera setup
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    const isMobile = width < 768;
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 58 : 46,
      width / height,
      0.1,
      120
    );
    camera.position.set(0, 0, CAMERA_START_Z);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // 4. Ambient light & Floating Golden Dust Embers
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const corridorDepth = (total + 2) * PLANE_SPACING;

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 2] = -Math.random() * corridorDepth + 5;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xffa028,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 5. Plane Geometries and Texture Meshes
    const textureLoader = new THREE.TextureLoader();
    const meshes: THREE.Mesh[] = [];
    const materials: THREE.MeshBasicMaterial[] = [];
    const geometries: THREE.BufferGeometry[] = [];

    // Plane proportions (3:4 ratio standard tattoo photo)
    const planeW = isMobile ? 2.4 : 3.1;
    const planeH = isMobile ? 3.2 : 4.1;
    const planeGeo = new THREE.PlaneGeometry(planeW, planeH, 1, 1);
    geometries.push(planeGeo);

    // Frame backdrop geometry
    const frameGeo = new THREE.PlaneGeometry(planeW + 0.08, planeH + 0.08, 1, 1);
    geometries.push(frameGeo);

    let loadedCount = 0;

    items.forEach((item, index) => {
      const zPos = -index * PLANE_SPACING;
      const xMult = isMobile ? 0.35 : 1.0;
      const yMult = isMobile ? 0.35 : 1.0;
      const xPos = (STAGGER_X[index % STAGGER_X.length] || 0) * xMult;
      const yPos = (STAGGER_Y[index % STAGGER_Y.length] || 0) * yMult;
      const rY = ROT_Y[index % ROT_Y.length] || 0;
      const rZ = ROT_Z[index % ROT_Z.length] || 0;

      // Card Texture Material
      const texture = textureLoader.load(item.image, () => {
        loadedCount++;
        if (loadedCount >= items.length && !isDisposed) {
          setIsLoaded(true);
        }
      });
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;

      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 1,
      });
      materials.push(mat);

      const mesh = new THREE.Mesh(planeGeo, mat);
      mesh.position.set(xPos, yPos, zPos);
      mesh.rotation.set(0, rY, rZ);
      mesh.userData = { index, id: item.id, baseScale: 1, baseX: xPos, baseY: yPos };

      // Charcoal frame backplate
      const frameMat = new THREE.MeshBasicMaterial({
        color: 0x181a22,
        transparent: true,
        opacity: 0.9,
      });
      materials.push(frameMat);
      const frameMesh = new THREE.Mesh(frameGeo, frameMat);
      frameMesh.position.set(0, 0, -0.005);
      mesh.add(frameMesh);

      scene.add(mesh);
      meshes.push(mesh);
    });

    meshesRef.current = meshes;

    // 6. Raycasting for Interaction
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-999, -999);

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.set(x, y);

      // Smooth mouse parallax target
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onPointerDown = () => {
      if (hoveredMeshRef.current) {
        const clickedIdx = hoveredMeshRef.current.userData.index;
        if (clickedIdx === activeIndexRef.current) {
          if (isGallery) {
            setLightboxIndex(clickedIdx);
          } else if (onOpenBooking) {
            onOpenBooking();
          }
        } else {
          scrollToIndex(clickedIdx);
        }
      }
    };

    canvas.addEventListener("mousemove", onPointerMove, { passive: true });
    canvas.addEventListener("click", onPointerDown);

    // 7. Scroll Tracking
    const updateScrollProgress = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const containerTop = rect.top + scrollTop;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      const totalScrollable = containerHeight - windowHeight;

      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, (scrollTop - containerTop) / totalScrollable));
      scrollProgressRef.current = progress;

      // Target camera Z position in corridor
      const totalDistance = (total - 1) * PLANE_SPACING;
      targetZRef.current = CAMERA_START_Z - progress * totalDistance;
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();

    // 8. Resize Handler
    const onResize = () => {
      if (!canvas || !container) return;
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      const mobile = w < 768;

      camera.aspect = w / h;
      camera.fov = mobile ? 58 : 46;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      updateScrollProgress();
    };

    window.addEventListener("resize", onResize);

    // 9. Main High-FPS WebGL Render Loop
    const clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Buttery smooth exponential lerping for camera Z (Zero lag, 60-120 FPS)
      currentZRef.current += (targetZRef.current - currentZRef.current) * 0.095;
      camera.position.z = currentZRef.current;

      // Smooth mouse parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      camera.position.x = mouseRef.current.x * 0.45;
      camera.position.y = -mouseRef.current.y * 0.3;
      camera.rotation.y = -mouseRef.current.x * 0.035;
      camera.rotation.x = mouseRef.current.y * 0.025;

      // Determine active plane closest to focus point
      const focusTargetZ = camera.position.z - CAMERA_START_Z;
      let closestIdx = 0;
      let minDiff = Infinity;

      for (let i = 0; i < total; i++) {
        const meshZ = -i * PLANE_SPACING;
        const diff = Math.abs(meshZ - focusTargetZ);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = i;
        }
      }

      // Update state ONLY when index actually changes to prevent React re-render spikes
      if (closestIdx !== activeIndexRef.current) {
        activeIndexRef.current = closestIdx;
        setActiveIndex(closestIdx);
      }

      // Update mesh visibility, opacity, and gentle hover scale
      meshes.forEach((mesh) => {
        const distZ = mesh.position.z - camera.position.z;
        const mat = mesh.material as THREE.MeshBasicMaterial;

        // If mesh passes behind camera, smoothly fade out to eliminate hard clipping
        if (distZ > 0.4) {
          const fade = Math.max(0, 1 - (distZ - 0.4) * 1.8);
          mat.opacity = fade;
          mesh.visible = fade > 0.001;
        } else {
          mat.opacity = 1;
          mesh.visible = true;
        }

        // Floating ambient breathing micro-motion
        const index = mesh.userData.index;
        const subtleBob = Math.sin(elapsed * 1.2 + index) * 0.02;
        mesh.position.y = mesh.userData.baseY + subtleBob;
      });

      // Ambient particle gentle rotation & drift
      particleSystem.rotation.y = elapsed * 0.015;
      particleSystem.rotation.x = Math.sin(elapsed * 0.01) * 0.02;

      // Raycast hover test
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(meshes, false);

      if (intersects.length > 0) {
        const topMesh = intersects[0].object as THREE.Mesh;
        hoveredMeshRef.current = topMesh;
        canvas.style.cursor = "pointer";

        // Subtle hover scale
        topMesh.scale.lerp(new THREE.Vector3(1.035, 1.035, 1), 0.12);
      } else {
        hoveredMeshRef.current = null;
        canvas.style.cursor = "default";
        meshes.forEach((m) => {
          m.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onPointerMove);
      canvas.removeEventListener("click", onPointerDown);

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, [items, total, isGallery, scrollToIndex, onOpenBooking]);

  const activeItem = items[activeIndex];
  const galleryItem = activeItem as GalleryItemData;
  const artistItem = activeItem as ArtistItemData;

  return (
    <div
      id={id || type}
      ref={containerRef}
      className="relative bg-[#0C0D12] text-white select-none"
      style={{
        // Generous scroll height: ~110vh per item for silky pacing
        height: `${Math.max(260, total * 100 + 50)}vh`,
      }}
    >
      {/* Optional Top Torn Paper Edge */}
      {topDividerFill && (
        <div className="absolute top-0 left-0 right-0 w-full z-30 pointer-events-none">
          <TornPaperDivider fill={topDividerFill} position="top" variant={1} />
        </div>
      )}

      {/* Sticky Fullscreen 3D Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-12 md:py-16 px-5 md:px-12 z-20">
        
        {/* Fullscreen Three.js WebGL Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block touch-none z-0"
        />

        {/* Ambient Dark Radial Vignette Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(12,13,18,0.85)_100%)] z-10" />

        {/* ------------------------------------------------------------- */}
        {/* Top Header: Section Title & Flourish */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto pointer-events-none">
          <span className="font-display text-xs md:text-sm tracking-[0.35em] text-[#FFA028] uppercase font-bold mb-1 flex items-center gap-2">
            <Sparkles size={14} />
            {subtitle}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-white uppercase drop-shadow-lg">
            {title}
          </h2>
          <SectionFlourish color="#FFA028" className="mt-1" />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Middle Stage: Synchronized Floating Active Info Card (Right) */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 flex-1 w-full max-w-7xl mx-auto flex items-center justify-end pointer-events-none">
          <div className="w-full max-w-[340px] lg:max-w-[380px] hidden md:flex flex-col items-start pointer-events-auto mr-4 lg:mr-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem?.id || activeIndex}
                initial={{ opacity: 0, x: 30, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.96 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                className="bg-[#181A22]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.85)] w-full relative overflow-hidden"
              >
                {/* Accent Top Border Glow */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFA028] to-transparent" />

                {/* Index / Category Tag */}
                <div className="flex items-center justify-between w-full mb-3 pb-3 border-b border-white/10">
                  <span className="text-[10px] font-mono tracking-widest text-[#FFA028] uppercase font-bold flex items-center gap-1.5">
                    <Compass size={12} />
                    {isGallery ? "ARTWORK ARCHIVE" : "RESIDENT MASTER ARTIST"}
                  </span>
                  <span className="text-xs font-mono font-bold text-white/70">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </div>

                {isGallery ? (
                  <>
                    <h3 className="font-display text-2xl lg:text-3xl font-bold text-white uppercase tracking-wide leading-tight mb-2">
                      {galleryItem.title}
                    </h3>
                    <p className="text-xs font-display tracking-widest text-[#FFA028] uppercase mb-3">
                      {galleryItem.category}
                    </p>
                    <p className="text-gray-300 font-sans text-xs leading-relaxed mb-6">
                      {galleryItem.details ||
                        `Masterfully executed with organic obsidian shading and single-needle precision by artist ${galleryItem.artist || "Zeus Resident"}.`}
                    </p>
                    <button
                      onClick={() => setLightboxIndex(activeIndex)}
                      className="w-full py-3 bg-[#FFA028] hover:bg-[#E07D00] text-[#0C0D12] font-display text-xs font-bold tracking-widest uppercase rounded transition-all duration-300 shadow-[0_0_20px_rgba(255,160,40,0.3)] cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02]"
                    >
                      <Eye size={15} />
                      INSPECT HIGH RESOLUTION
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="font-display text-2xl lg:text-3xl font-bold text-white uppercase tracking-wide leading-tight mb-1">
                      {artistItem.name}
                    </h3>
                    <span className="text-xs font-display tracking-widest text-[#FFA028] uppercase block mb-1">
                      {artistItem.role}
                    </span>
                    <span className="text-[11px] font-sans text-gray-400 font-medium block mb-3">
                      {artistItem.styles}
                    </span>
                    <p className="text-gray-300 font-sans text-xs leading-relaxed mb-6">
                      {artistItem.description}
                    </p>
                    <button
                      onClick={onOpenBooking}
                      className="w-full py-3 bg-[#FFA028] hover:bg-[#E07D00] text-[#0C0D12] font-display text-xs font-bold tracking-widest uppercase rounded transition-all duration-300 shadow-[0_0_20px_rgba(255,160,40,0.3)] cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02]"
                    >
                      BOOK CONSULTATION WITH {artistItem.name.split(" ")[0]}
                      <ArrowRight size={15} />
                    </button>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Mobile Bottom Quick Badge & Action Button */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 md:hidden w-full max-w-sm mx-auto mb-3 bg-[#181A22]/90 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl pointer-events-auto">
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="font-display text-base font-bold text-white uppercase tracking-wide truncate">
              {isGallery ? galleryItem.title : artistItem.name}
            </h4>
            <span className="text-[11px] font-mono font-bold text-[#FFA028]">
              {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <p className="text-[11px] text-gray-300 font-sans mb-3 truncate">
            {isGallery ? galleryItem.category : artistItem.styles}
          </p>
          <button
            onClick={() => {
              if (isGallery) {
                setLightboxIndex(activeIndex);
              } else if (onOpenBooking) {
                onOpenBooking();
              }
            }}
            className="w-full py-2 bg-[#FFA028] text-[#0C0D12] font-display text-xs font-bold tracking-widest uppercase rounded flex items-center justify-center gap-1.5"
          >
            {isGallery ? (
              <>
                <Eye size={13} />
                VIEW HIGH RESOLUTION
              </>
            ) : (
              <>
                <ArrowRight size={13} />
                BOOK WITH {artistItem.name.split(" ")[0]}
              </>
            )}
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Bottom Interactive Navigation & Timeline Track */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 flex flex-row items-center justify-between gap-4 max-w-5xl mx-auto w-full pt-2 pointer-events-auto">
          
          {/* Timeline Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Jump to ${type} item ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? "w-8 sm:w-10 bg-[#FFA028] shadow-[0_0_12px_#FFA028]"
                    : "w-2 sm:w-3 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Scroll Hint Text */}
          <div className="hidden lg:flex items-center gap-2 text-gray-400 text-xs font-sans tracking-widest uppercase pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-[#FFA028] animate-pulse" />
            <span>Scroll or click cards to travel through 3D depth</span>
          </div>

          {/* Left/Right Jump Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous item"
              className="w-9 h-9 rounded-full bg-[#181A22] hover:bg-[#FFA028] text-white hover:text-[#0C0D12] border border-white/10 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next item"
              className="w-9 h-9 rounded-full bg-[#181A22] hover:bg-[#FFA028] text-white hover:text-[#0C0D12] border border-white/10 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Lightbox Modal for Gallery Fullscreen Preview */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isGallery && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close Lightbox"
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-[#FFA028] text-white hover:text-black rounded-full flex items-center justify-center transition-colors cursor-pointer z-50"
            >
              <X size={24} />
            </button>

            {/* Prev Image */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev !== null ? (prev - 1 + total) % total : null));
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-[#FFA028] text-white hover:text-black rounded-full flex items-center justify-center transition-colors cursor-pointer z-50"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Image */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev !== null ? (prev + 1) % total : null));
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-[#FFA028] text-white hover:text-black rounded-full flex items-center justify-center transition-colors cursor-pointer z-50"
            >
              <ChevronRight size={24} />
            </button>

            {/* Lightbox Image Preview */}
            <div
              className="max-w-4xl max-h-[88vh] flex flex-col items-center select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={items[lightboxIndex].image}
                alt={(items[lightboxIndex] as GalleryItemData).title}
                className="max-h-[72vh] w-auto object-contain rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/15"
              />
              <div className="mt-4 text-center">
                <h4 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-wider">
                  {(items[lightboxIndex] as GalleryItemData).title}
                </h4>
                <p className="text-xs text-[#FFA028] font-sans tracking-widest uppercase mt-1">
                  {(items[lightboxIndex] as GalleryItemData).category} • Master Artist:{" "}
                  {(items[lightboxIndex] as GalleryItemData).artist || "Zeus Atelier"}
                </p>
                <p className="text-gray-300 font-sans text-xs max-w-xl mx-auto mt-2 leading-relaxed">
                  {(items[lightboxIndex] as GalleryItemData).details}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional Bottom Torn Paper Edge */}
      {bottomDividerFill && (
        <div className="absolute bottom-0 left-0 right-0 w-full z-30 pointer-events-none">
          <TornPaperDivider fill={bottomDividerFill} position="bottom" variant={2} />
        </div>
      )}
    </div>
  );
}
