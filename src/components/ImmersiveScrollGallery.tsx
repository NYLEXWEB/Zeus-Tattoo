"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, X, ArrowRight } from "lucide-react";
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

const PLANE_SPACING = 6.2;
const CAMERA_START_Z = 6.2;

const STAGGER_X = [-0.85, 0.8, -0.65, 0.85, -0.45, 0.7, -0.8, 0.55];
const STAGGER_Y = [-0.1, 0.08, -0.06, 0.1, -0.05, 0.08, -0.1, 0.06];
const ROT_Y = [0.06, -0.05, 0.04, -0.06, 0.03, -0.04, 0.05, -0.03];
const ROT_Z = [-0.02, 0.02, -0.015, 0.02, -0.015, 0.02, -0.02, 0.015];

export default function ImmersiveScrollGallery({
  id,
  type,
  title,
  subtitle = "MASTERS OF THE CRAFT",
  items,
  onOpenBooking,
  topDividerFill,
  bottomDividerFill,
}: ImmersiveScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const total = items.length;
  const isGallery = type === "gallery";

  const activeIndexRef = useRef(0);
  const scrollProgressRef = useRef(0);
  const targetZRef = useRef(CAMERA_START_Z);
  const currentZRef = useRef(CAMERA_START_Z);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, moved: false });
  const isVisibleRef = useRef(false);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const hoveredMeshRef = useRef<THREE.Mesh | null>(null);

  // Jump to specific index programmatically
  const scrollToIndex = useCallback(
    (idx: number) => {
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
    },
    [total]
  );

  const handleNext = () => scrollToIndex((activeIndex + 1) % total);
  const handlePrev = () => scrollToIndex((activeIndex - 1 + total) % total);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animationFrameId: number;
    let isDisposed = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { rootMargin: "200px" }
    );
    observer.observe(container);

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07090e);
    scene.fog = new THREE.Fog(
      0x07090e,
      4,
      Math.max(20, total * PLANE_SPACING * 0.95)
    );

    // 2. Camera setup
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    const isMobile = width < 768;
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 52 : 42,
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // 4. Ambient light & Floating Dust
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const corridorDepth = (total + 2) * PLANE_SPACING;

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 2] = -Math.random() * corridorDepth + 5;
    }
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0xffa852,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 5. Plane Geometries - offset slightly to the left on desktop to leave room for attractive right-side artist name
    const textureLoader = new THREE.TextureLoader();
    const meshes: THREE.Mesh[] = [];
    const materials: THREE.MeshBasicMaterial[] = [];
    const geometries: THREE.BufferGeometry[] = [];

    const planeW = isMobile ? 1.9 : 2.2;
    const planeH = isMobile ? 2.5 : 2.9;
    const planeGeo = new THREE.PlaneGeometry(planeW, planeH, 1, 1);
    geometries.push(planeGeo);

    const frameGeo = new THREE.PlaneGeometry(planeW + 0.06, planeH + 0.06, 1, 1);
    geometries.push(frameGeo);

    items.forEach((item, index) => {
      const zPos = -index * PLANE_SPACING;
      // Slight left shift on desktop (-0.35) so the center portrait and side name balance beautifully
      const centerOffsetX = isMobile ? 0 : -0.35;
      const xMult = isMobile ? 0.25 : 0.65;
      const xPos = centerOffsetX + (STAGGER_X[index % STAGGER_X.length] || 0) * xMult;
      const yPos =
        -0.38 + (STAGGER_Y[index % STAGGER_Y.length] || 0) * (isMobile ? 0.2 : 0.5);
      const rY = ROT_Y[index % ROT_Y.length] || 0;
      const rZ = ROT_Z[index % ROT_Z.length] || 0;

      const texture = textureLoader.load(item.image);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 1,
      });
      materials.push(mat);

      const mesh = new THREE.Mesh(planeGeo, mat);
      mesh.position.set(xPos, yPos, zPos);
      mesh.rotation.set(0, rY, rZ);
      mesh.userData = {
        index,
        id: item.id,
        baseScale: 1,
        baseX: xPos,
        baseY: yPos,
      };

      const frameMat = new THREE.MeshBasicMaterial({
        color: 0x0d111b,
        transparent: true,
        opacity: 0.95,
      });
      materials.push(frameMat);
      const frameMesh = new THREE.Mesh(frameGeo, frameMat);
      frameMesh.position.set(0, 0, -0.004);
      mesh.add(frameMesh);

      scene.add(mesh);
      meshes.push(mesh);
    });

    meshesRef.current = meshes;

    // 6. Pointer parallax & interaction
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-999, -999);

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.set(x, y);

      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current.moved = true;
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

      const progress = Math.max(
        0,
        Math.min(1, (scrollTop - containerTop) / totalScrollable)
      );
      scrollProgressRef.current = progress;

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
      camera.fov = mobile ? 52 : 42;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h, false);
      updateScrollProgress();
    };

    window.addEventListener("resize", onResize, { passive: true });

    // 9. Ultra-Smooth Render Loop
    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      currentZRef.current += (targetZRef.current - currentZRef.current) * 0.12;
      camera.position.z = currentZRef.current;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      camera.position.x = mouseRef.current.x * 0.35;
      camera.position.y = -mouseRef.current.y * 0.25;
      camera.rotation.y = -mouseRef.current.x * 0.025;
      camera.rotation.x = mouseRef.current.y * 0.018;

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

      if (closestIdx !== activeIndexRef.current) {
        activeIndexRef.current = closestIdx;
        setActiveIndex(closestIdx);
      }

      meshes.forEach((mesh) => {
        const distZ = mesh.position.z - camera.position.z;
        const mat = mesh.material as THREE.MeshBasicMaterial;

        if (distZ > 0.4) {
          const fade = Math.max(0, 1 - (distZ - 0.4) * 1.8);
          mat.opacity = fade;
          mesh.visible = fade > 0.001;
        } else {
          mat.opacity = 1;
          mesh.visible = true;
        }
      });

      if (mouseRef.current.moved) {
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(meshes, false);

        if (intersects.length > 0) {
          const topMesh = intersects[0].object as THREE.Mesh;
          hoveredMeshRef.current = topMesh;
          canvas.style.cursor = "pointer";
          topMesh.scale.lerp(new THREE.Vector3(1.025, 1.025, 1), 0.15);
        } else {
          hoveredMeshRef.current = null;
          canvas.style.cursor = "default";
          meshes.forEach((m) => {
            m.scale.lerp(new THREE.Vector3(1, 1, 1), 0.12);
          });
        }
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
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
  const artistItem = activeItem as ArtistItemData;
  const galleryItem = activeItem as GalleryItemData;

  return (
    <div
      id={id || type}
      ref={containerRef}
      className="relative bg-[#07090e] text-white select-none"
      style={{
        height: `${Math.max(260, total * 90 + 50)}vh`,
      }}
    >
      {topDividerFill && (
        <div className="absolute top-0 left-0 right-0 w-full z-30 pointer-events-none">
          <TornPaperDivider fill={topDividerFill} position="top" variant={1} />
        </div>
      )}

      {/* Sticky Fullscreen 3D Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-8 pb-7 px-6 md:px-14 z-20">
        {/* Fullscreen Three.js WebGL Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block touch-none z-0"
        />

        {/* Ambient Dark Radial Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(7,9,14,0.9)_100%)] z-10" />

        {/* 1. Top Header: Perfectly Center-Aligned */}
        <div className="relative z-20 w-full flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-xs md:text-sm tracking-[0.35em] text-[#ffa852] uppercase font-bold mb-1.5 flex items-center justify-center gap-2">
            <Sparkles size={14} />
            {subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-white uppercase drop-shadow-md text-center">
            {title}
          </h2>
          <SectionFlourish color="#ffa852" className="mt-1" />
        </div>

        {/* 2. Middle Stage: Attractive Floating Side Name Display */}
        <div className="relative z-20 flex-1 w-full max-w-7xl mx-auto flex items-center justify-end pointer-events-none px-4 md:px-8">
          <div className="hidden md:flex flex-col items-start text-left pointer-events-auto max-w-xs lg:max-w-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem?.id || activeIndex}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col items-start"
              >
                {/* Accent mini indicator */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-[2px] bg-[#ffa852]" />
                  <span className="text-[11px] font-mono tracking-widest text-[#ffa852] uppercase font-bold">
                    0{activeIndex + 1} / 0{total}
                  </span>
                </div>

                {/* Large Bold Name */}
                <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-wide uppercase leading-tight drop-shadow-lg mb-1.5">
                  {isGallery ? galleryItem.title : artistItem.name}
                </h3>

                {/* Role / Category */}
                <span className="text-xs lg:text-sm font-semibold tracking-widest text-[#ffa852] uppercase mb-2">
                  {isGallery ? galleryItem.category : artistItem.role}
                </span>

                {/* Subtext */}
                <p className="text-xs text-gray-300 font-sans tracking-wide leading-relaxed max-w-[280px]">
                  {isGallery
                    ? galleryItem.details
                    : artistItem.styles}
                </p>

                {onOpenBooking && (
                  <button
                    onClick={onOpenBooking}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#ffa852] hover:text-[#ffbe7d] uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    <span>Book With {artistItem.name ? artistItem.name.split(" ")[0] : "Artist"}</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 3. Mobile Name Badge (Visible on small screens) */}
        <div className="relative z-20 md:hidden flex flex-col items-center text-center w-full mb-2 pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem?.id || activeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-center"
            >
              <h4 className="text-lg font-bold text-white tracking-wider uppercase">
                {isGallery ? galleryItem.title : artistItem.name}
              </h4>
              <span className="text-[11px] text-[#ffa852] font-semibold tracking-widest uppercase">
                {isGallery ? galleryItem.category : artistItem.role}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 4. Bottom Navigation & Timeline Track: Clean & Centered */}
        <div className="relative z-20 flex flex-row items-center justify-between gap-6 max-w-xl mx-auto w-full pointer-events-auto">
          {/* Timeline Pills */}
          <div className="flex items-center gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Jump to item ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? "w-8 sm:w-10 bg-[#ffa852]"
                    : "w-2.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <span className="text-xs font-mono font-bold text-[#ffa852]">
            0{activeIndex + 1} / 0{total}
          </span>

          {/* Left/Right Jump Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous item"
              className="w-8 h-8 rounded-full bg-[#0d111b] hover:bg-[#ffa852] text-white hover:text-[#07090e] border border-[#ffa85226] flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next item"
              className="w-8 h-8 rounded-full bg-[#0d111b] hover:bg-[#ffa852] text-white hover:text-[#07090e] border border-[#ffa85226] flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox for Gallery */}
      <AnimatePresence>
        {isGallery && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close Lightbox"
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-[#ffa852] text-white hover:text-black rounded-full flex items-center justify-center transition-colors cursor-pointer z-50"
            >
              <X size={24} />
            </button>

            <div
              className="max-w-4xl max-h-[88vh] flex flex-col items-center select-none"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={items[lightboxIndex].image}
                alt={(items[lightboxIndex] as GalleryItemData).title}
                className="max-h-[72vh] w-auto object-contain rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/15"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {bottomDividerFill && (
        <div className="absolute bottom-0 left-0 right-0 w-full z-30 pointer-events-none">
          <TornPaperDivider
            fill={bottomDividerFill}
            position="bottom"
            variant={2}
          />
        </div>
      )}
    </div>
  );
}
