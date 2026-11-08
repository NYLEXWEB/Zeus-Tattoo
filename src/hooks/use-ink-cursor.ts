// Hook for WebGL GPGPU Fluid Ink Cursor Simulation
import { type RefObject, useEffect } from "react";
import { fsRender, fsUpdate, vsSource } from "../components/shaders/ink-shaders";
import { createFBO, createProgram, type FBOObject } from "../lib/webgl-utils";

export function useInkCursor(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  isActive: boolean = true
) {
  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check WebGL availability
    const gl =
      canvas.getContext("webgl", {
        alpha: true,
        premultipliedAlpha: false,
        depth: false,
        antialias: false,
        powerPreference: "high-performance",
      }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) return;

    const updateProg = createProgram(gl, vsSource, fsUpdate);
    const renderProg = createProgram(gl, vsSource, fsRender);
    if (!updateProg || !renderProg) return;

    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    // DPR Clamping (Technique 7 of Zero-Lag Guide)
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = Math.floor(window.innerWidth * dpr);
    let height = Math.floor(window.innerHeight * dpr);

    canvas.width = width;
    canvas.height = height;

    // Simulation runs at 0.5x resolution for silky 120 FPS fluid dynamics
    const simScale = 0.5;
    let simWidth = Math.max(128, Math.floor(width * simScale));
    let simHeight = Math.max(128, Math.floor(height * simScale));

    let fboA: FBOObject | null = createFBO(gl, simWidth, simHeight);
    let fboB: FBOObject | null = createFBO(gl, simWidth, simHeight);
    if (!fboA || !fboB) return;

    const updateLocs = {
      position: gl.getAttribLocation(updateProg, "position"),
      u_texture: gl.getUniformLocation(updateProg, "u_texture"),
      u_mouse: gl.getUniformLocation(updateProg, "u_mouse"),
      u_prevMouse: gl.getUniformLocation(updateProg, "u_prevMouse"),
      u_resolution: gl.getUniformLocation(updateProg, "u_resolution"),
      u_dt: gl.getUniformLocation(updateProg, "u_dt"),
      u_time: gl.getUniformLocation(updateProg, "u_time"),
      u_isMoved: gl.getUniformLocation(updateProg, "u_isMoved"),
    };

    const renderLocs = {
      position: gl.getAttribLocation(renderProg, "position"),
      u_texture: gl.getUniformLocation(renderProg, "u_texture"),
    };

    let targetMouse = { x: -2000, y: -2000 };
    let lastDrawnMouse = { x: -2000, y: -2000 };
    let hasMoved = false;
    let isMoving = false;
    let moveTimeout: ReturnType<typeof setTimeout>;

    const startTime = performance.now();
    let lastTime = performance.now();
    let animationFrameId: number | null = null;
    let isRunning = true;

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Map to simulation coordinates
      const x = (clientX / rect.width) * simWidth;
      const y = (1.0 - clientY / rect.height) * simHeight;

      targetMouse = { x, y };
      if (!hasMoved) {
        lastDrawnMouse = { x, y };
        hasMoved = true;
      }
      isMoving = true;
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        isMoving = false;
      }, 100);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newDpr = Math.min(window.devicePixelRatio || 1, 1.5);
        width = Math.floor(window.innerWidth * newDpr);
        height = Math.floor(window.innerHeight * newDpr);
        canvas.width = width;
        canvas.height = height;

        simWidth = Math.max(128, Math.floor(width * simScale));
        simHeight = Math.max(128, Math.floor(height * simScale));

        if (fboA) {
          gl.deleteFramebuffer(fboA.fbo);
          gl.deleteTexture(fboA.texture);
        }
        if (fboB) {
          gl.deleteFramebuffer(fboB.fbo);
          gl.deleteTexture(fboB.texture);
        }
        fboA = createFBO(gl, simWidth, simHeight);
        fboB = createFBO(gl, simWidth, simHeight);
      }, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const draw = () => {
      if (!isRunning || !fboA || !fboB) return;

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000.0, 0.05);
      const time = (now - startTime) / 1000.0;
      lastTime = now;

      const moved =
        hasMoved &&
        isMoving &&
        (Math.abs(lastDrawnMouse.x - targetMouse.x) > 0.5 ||
          Math.abs(lastDrawnMouse.y - targetMouse.y) > 0.5);

      // 1. Simulation Update Pass
      gl.bindFramebuffer(gl.FRAMEBUFFER, fboB.fbo);
      gl.viewport(0, 0, simWidth, simHeight);
      gl.useProgram(updateProg);

      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.enableVertexAttribArray(updateLocs.position);
      gl.vertexAttribPointer(updateLocs.position, 2, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, fboA.texture);
      gl.uniform1i(updateLocs.u_texture, 0);

      gl.uniform2f(updateLocs.u_mouse, targetMouse.x, targetMouse.y);
      gl.uniform2f(updateLocs.u_prevMouse, lastDrawnMouse.x, lastDrawnMouse.y);
      gl.uniform2f(updateLocs.u_resolution, simWidth, simHeight);
      gl.uniform1f(updateLocs.u_dt, dt);
      gl.uniform1f(updateLocs.u_time, time);
      gl.uniform1i(updateLocs.u_isMoved, moved ? 1 : 0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (moved) {
        lastDrawnMouse = { ...targetMouse };
      }

      // 2. Ping-Pong Swap
      const temp = fboA;
      fboA = fboB;
      fboB = temp;

      // 3. Screen Render Pass
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, width, height);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(renderProg);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.enableVertexAttribArray(renderLocs.position);
      gl.vertexAttribPointer(renderLocs.position, 2, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, fboA.texture);
      gl.uniform1i(renderLocs.u_texture, 0);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.disable(gl.BLEND);

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      isRunning = false;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      clearTimeout(moveTimeout);

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      if (fboA) {
        gl.deleteFramebuffer(fboA.fbo);
        gl.deleteTexture(fboA.texture);
      }
      if (fboB) {
        gl.deleteFramebuffer(fboB.fbo);
        gl.deleteTexture(fboB.texture);
      }
      gl.deleteProgram(updateProg);
      gl.deleteProgram(renderProg);
      gl.deleteBuffer(quadBuffer);
    };
  }, [canvasRef, isActive]);
}

