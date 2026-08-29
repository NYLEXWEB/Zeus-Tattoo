"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const cursorData = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursorData) {
        setCursorText(cursorData);
        setIsHovered(true);
        return;
      }

      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      ) {
        setCursorText("");
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    window.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const hasText = cursorText.length > 0;

  return (
    <>
      {/* Inner Glowing Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#e58c38] rounded-full pointer-events-none z-50 shadow-[0_0_10px_#e58c38]"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: hasText ? 0 : isHovered ? 2 : 1,
          opacity: hasText ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 900, damping: 35, mass: 0.1 }}
      />
      {/* Outer Luxury Ring / Pill with Text */}
      <motion.div
        className="fixed top-0 left-0 border border-[#e58c38]/60 bg-[#0b0d12]/80 backdrop-blur-xs rounded-full pointer-events-none z-50 flex items-center justify-center text-[10px] font-sans font-bold tracking-widest text-[#e58c38] uppercase shadow-[0_0_20px_rgba(229,140,56,0.2)] overflow-hidden"
        animate={{
          x: mousePosition.x - (hasText ? 36 : 18),
          y: mousePosition.y - (hasText ? 36 : 18),
          width: hasText ? 72 : 36,
          height: hasText ? 72 : 36,
          scale: isHovered && !hasText ? 1.6 : 1,
          borderColor: isHovered ? "rgba(229, 140, 56, 0.9)" : "rgba(229, 140, 56, 0.35)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26, mass: 0.4 }}
      >
        {hasText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-2 text-center leading-none"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
