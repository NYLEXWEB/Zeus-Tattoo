"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInkCursor } from "../hooks/use-ink-cursor";

interface InkCursorProps {
  inView?: boolean;
}

export default function InkCursor({ inView = true }: InkCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Disable on touch devices to conserve battery & prevent touch gesture contention
    const hasTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (!hasTouch) {
      setIsSupported(true);
    }
  }, []);

  useInkCursor(canvasRef, isSupported && inView);

  if (!isSupported || !inView) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 5,
        mixBlendMode: "screen",
        opacity: 0.9,
      }}
    />
  );
}

